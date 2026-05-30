import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { db } from "../config/firebase";
import {
	type Activity,
	ActivityType,
	AuditAction,
	type AuditLog,
	type Deal,
	DealStage,
} from "../models";

const SA = process.env.FIREBASE_SERVICE_ACCOUNT!;


/**
 * onDealCreated - Trigger when a new deal is created
 * - Sets initial probability based on stage
 * - Creates activity log
 * - Logs audit
 */
export const onDealCreated = functions.runWith({ serviceAccount: SA }).firestore
	.document("deals/{dealId}")
	.onCreate(async (snap, context) => {
		const deal = snap.data() as Deal;
		const batch = db.batch();

		functions.logger.info(`New deal created: ${deal.title}`, {
			dealId: context.params.dealId,
		});

		const updates: Partial<Deal> = {};

		// Set probability based on initial stage
		if (deal.probability === undefined || deal.probability === 0) {
			const stageProbabilities: Record<string, number> = {
				[DealStage.Lead]: 10,
				[DealStage.Proposal]: 50,
				[DealStage.Negotiation]: 75,
				[DealStage.Won]: 100,
				[DealStage.Lost]: 0,
			};
			updates.probability = stageProbabilities[deal.stage] || 0;
		}

		// Set currency default if not provided
		if (!deal.currency) {
			updates.currency = "USD";
		}

		// Create activity for deal creation
		const createActivity: Partial<Activity> = {
			type: ActivityType.Note,
			dealId: context.params.dealId,
			contactId: deal.contactId,
			companyId: deal.companyId,
			description: `Deal "${deal.title}" creado con valor ${deal.currency} ${deal.value}`,
			ownerId: deal.ownerId,
			createdAt: Timestamp.now(),
		};

		const activityRef = db.collection("activities").doc();
		batch.set(activityRef, createActivity);

		// Create audit log
		const auditLog: Partial<AuditLog> = {
			userId: "system",
			action: AuditAction.Create,
			collection: "deals",
			documentId: context.params.dealId,
			changes: { deal: { before: null, after: deal } },
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
 * onDealStageChanged - Trigger when deal stage changes
 * - Updates probability automatically
 * - Creates stage change activity
 * - Updates contact lead score if won/lost
 * - Logs audit
 */
export const onDealStageChanged = functions.runWith({ serviceAccount: SA }).firestore
	.document("deals/{dealId}")
	.onUpdate(async (change, context) => {
		const before = change.before.data() as Deal;
		const after = change.after.data() as Deal;
		const batch = db.batch();

		// Only proceed if stage actually changed
		if (before.stage === after.stage) {
			return null;
		}

		functions.logger.info(
			`Deal ${context.params.dealId} stage changed: ${before.stage} -> ${after.stage}`,
		);

		const updates: Partial<Deal> = {};

		// Update probability based on new stage
		const stageProbabilities: Record<string, number> = {
			[DealStage.Lead]: 10,
			[DealStage.Proposal]: 50,
			[DealStage.Negotiation]: 75,
			[DealStage.Won]: 100,
			[DealStage.Lost]: 0,
		};
		updates.probability = stageProbabilities[after.stage] || 0;

		// Record lost reason if moving to Lost
		if (after.stage === DealStage.Lost && !after.lostReason) {
			functions.logger.info(`Deal ${context.params.dealId} marked as Lost`);
		}

		// Create stage change activity
		const stageActivity: Partial<Activity> = {
			type: ActivityType.Note,
			dealId: context.params.dealId,
			contactId: after.contactId,
			companyId: after.companyId,
			description: `Deal movido de "${before.stage}" a "${after.stage}"`,
			ownerId: after.ownerId,
			createdAt: Timestamp.now(),
		};

		const activityRef = db.collection("activities").doc();
		batch.set(activityRef, stageActivity);

		// Update contact lifecycle if deal is Won or Lost
		if (
			after.contactId &&
			(after.stage === DealStage.Won || after.stage === DealStage.Lost)
		) {
			const contactRef = db.collection("contacts").doc(after.contactId);
			const contactUpdate: Partial<{
				lifecycleStage: string;
				leadScore: number;
			}> = {
				lifecycleStage: after.stage === DealStage.Won ? "customer" : "lost",
			};
			if (after.stage === DealStage.Won) {
				contactUpdate.leadScore = 100;
			}
			batch.update(contactRef, contactUpdate);
		}

		// Create audit log
		const auditLog: Partial<AuditLog> = {
			userId: "system",
			action: AuditAction.Update,
			collection: "deals",
			documentId: context.params.dealId,
			changes: {
				stage: { before: before.stage, after: after.stage },
				probability: { before: before.probability, after: updates.probability },
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
 * onDealUpdated - General update trigger for deals
 * - Logs changes to audit
 */
export const onDealUpdated = functions.runWith({ serviceAccount: SA }).firestore
	.document("deals/{dealId}")
	.onUpdate(async (change, context) => {
		const before = change.before.data() as Deal;
		const after = change.after.data() as Deal;

		// Skip if stage changed (handled by onDealStageChanged)
		if (before.stage !== after.stage) {
			return null;
		}

		const changes: Record<string, { before: unknown; after: unknown }> = {};
		const fieldsToTrack: (keyof Deal)[] = [
			"title",
			"value",
			"probability",
			"expectedCloseDate",
			"ownerId",
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
				collection: "deals",
				documentId: context.params.dealId,
				changes,
				timestamp: Timestamp.now(),
			};

			return db.collection("auditLog").add(auditLog);
		}

		return null;
	});
