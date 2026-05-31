import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions/v1";
import { db } from "../config/firebase";
import {
	type Activity,
	ActivityType,
	AuditAction,
	type AuditLog,
	type Ticket,
	TicketPriority,
	TicketStatus,
} from "../models";




// SLA deadlines by priority (in hours)
const SLA_HOURS: Record<string, number> = {
	[TicketPriority.Low]: 72,
	[TicketPriority.Medium]: 48,
	[TicketPriority.High]: 24,
	[TicketPriority.Critical]: 4,
};

/**
 * onTicketCreated - Trigger when a new ticket is created
 * - Calculates SLA deadline based on priority
 * - Assigns using round-robin
 * - Creates activity
 * - Logs audit
 */
export const onTicketCreated = functions.firestore
	.document("tickets/{ticketId}")
	.onCreate(async (snap, context) => {
		const ticket = snap.data() as Ticket;
		const batch = db.batch();

		functions.logger.info(`New ticket created: ${ticket.title}`, {
			ticketId: context.params.ticketId,
		});

		const updates: Partial<Ticket> = {};

		// Calculate SLA deadline based on priority
		if (!ticket.slaDeadline) {
			const slaHours =
				SLA_HOURS[ticket.priority] || SLA_HOURS[TicketPriority.Medium];
			const deadline = new Date();
			deadline.setHours(deadline.getHours() + slaHours);
			updates.slaDeadline = Timestamp.fromDate(deadline);
			functions.logger.info(
				`SLA deadline set: ${deadline.toISOString()} for priority ${ticket.priority}`,
			);
		}

		// Set default status if not provided
		if (!ticket.status) {
			updates.status = TicketStatus.Open;
		}

		// Round-robin assignee if not assigned
		if (!ticket.assigneeId) {
			const assigneeId = await getNextAssignee();
			if (assigneeId) {
				updates.assigneeId = assigneeId;
				functions.logger.info(
					`Assigned ticket ${context.params.ticketId} to ${assigneeId}`,
				);
			}
		}

		// Create ticket creation activity
		const createActivity: Partial<Activity> = {
			type: ActivityType.Note,
			ticketId: context.params.ticketId,
			contactId: ticket.contactId,
			companyId: ticket.companyId,
			description: `Ticket "${ticket.title}" creado con prioridad ${ticket.priority}`,
			ownerId: ticket.assigneeId || (updates.assigneeId as string),
			createdAt: Timestamp.now(),
		};

		const activityRef = db.collection("activities").doc();
		batch.set(activityRef, createActivity);

		// Create audit log
		const auditLog: Partial<AuditLog> = {
			userId: "system",
			action: AuditAction.Create,
			collection: "tickets",
			documentId: context.params.ticketId,
			changes: { ticket: { before: null, after: ticket } },
			timestamp: Timestamp.now(),
		};

		const auditRef = db.collection("auditLog").doc();
		batch.set(auditRef, auditLog);

		if (Object.keys(updates).length > 0) {
			batch.update(snap.ref, updates);
		}

		return batch.commit();
	});

/**
 * onTicketStatusChanged - Trigger when ticket status changes
 * - Sets resolvedAt when status becomes Resolved
 * - Creates activity for status change
 */
export const onTicketStatusChanged = functions.firestore
	.document("tickets/{ticketId}")
	.onUpdate(async (change, context) => {
		const before = change.before.data() as Ticket;
		const after = change.after.data() as Ticket;
		const batch = db.batch();

		// Only proceed if status changed
		if (before.status === after.status) {
			return null;
		}

		functions.logger.info(
			`Ticket ${context.params.ticketId} status changed: ${before.status} -> ${after.status}`,
		);

		const updates: Partial<Ticket> = {};

		// Set resolvedAt when resolved
		if (after.status === TicketStatus.Resolved && !after.resolvedAt) {
			updates.resolvedAt = Timestamp.now();

			const createdAt = after.createdAt.toDate();
			const resolvedAt = new Date();
			const resolutionHours =
				(resolvedAt.getTime() - createdAt.getTime()) / (1000 * 60 * 60);
			functions.logger.info(
				`Ticket ${context.params.ticketId} resolved in ${resolutionHours.toFixed(2)} hours`,
			);
		}

		// Create status change activity
		const statusActivity: Partial<Activity> = {
			type: ActivityType.Note,
			ticketId: context.params.ticketId,
			contactId: after.contactId,
			companyId: after.companyId,
			description: `Ticket movido de "${before.status}" a "${after.status}"`,
			ownerId: after.assigneeId,
			createdAt: Timestamp.now(),
		};

		const activityRef = db.collection("activities").doc();
		batch.set(activityRef, statusActivity);

		// Create audit log
		const auditLog: Partial<AuditLog> = {
			userId: "system",
			action: AuditAction.Update,
			collection: "tickets",
			documentId: context.params.ticketId,
			changes: {
				status: { before: before.status, after: after.status },
				resolvedAt: { before: before.resolvedAt, after: updates.resolvedAt },
			},
			timestamp: Timestamp.now(),
		};

		const auditRef = db.collection("auditLog").doc();
		batch.set(auditRef, auditLog);

		if (Object.keys(updates).length > 0) {
			batch.update(change.after.ref, updates);
		}

		return batch.commit();
	});

/**
 * onTicketUpdated - General update trigger for tickets
 * - Logs changes to audit
 */
export const onTicketUpdated = functions.firestore
	.document("tickets/{ticketId}")
	.onUpdate(async (change, context) => {
		const before = change.before.data() as Ticket;
		const after = change.after.data() as Ticket;

		// Skip if status changed (handled by onTicketStatusChanged)
		if (before.status !== after.status) {
			return null;
		}

		const changes: Record<string, { before: unknown; after: unknown }> = {};
		const fieldsToTrack: (keyof Ticket)[] = [
			"title",
			"description",
			"priority",
			"assigneeId",
			"category",
		];

		fieldsToTrack.forEach((field) => {
			if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
				changes[field] = { before: before[field], after: after[field] };
			}
		});

		if (Object.keys(changes).length > 0) {
			const auditLog: Partial<AuditLog> = {
				userId: "system",
				action: AuditAction.Update,
				collection: "tickets",
				documentId: context.params.ticketId,
				changes,
				timestamp: Timestamp.now(),
			};

			return db.collection("auditLog").add(auditLog);
		}

		return null;
	});

/**
 * getNextAssignee - Gets the next available support agent using round-robin
 */
async function getNextAssignee(): Promise<string | null> {
	const usersRef = db.collection("users");
	const usersQuery = usersRef
		.where("isActive", "==", true)
		.where("roles", "array-contains-any", ["support", "manager", "admin"]);

	const users = await usersQuery.get();

	if (users.empty) {
		return null;
	}

	const userIds = users.docs.map((doc) => doc.id);

	const ticketCounts: Record<string, number> = {};
	userIds.forEach((id) => {
		ticketCounts[id] = 0;
	});

	const ticketsQuery = await db
		.collection("tickets")
		.where("assigneeId", "in", userIds)
		.where("status", "in", [TicketStatus.Open, TicketStatus.InProgress])
		.get();

	ticketsQuery.forEach((doc) => {
		const assigneeId = doc.data().assigneeId;
		if (assigneeId && ticketCounts[assigneeId] !== undefined) {
			ticketCounts[assigneeId]++;
		}
	});

	let minAssignee = userIds[0];
	let minCount = ticketCounts[minAssignee];

	Object.entries(ticketCounts).forEach(([userId, count]) => {
		if (count < minCount) {
			minCount = count;
			minAssignee = userId;
		}
	});

	return minAssignee;
}
