import { Timestamp } from "firebase-admin/firestore";
import * as functions from "firebase-functions";
import { db } from "../config/firebase";
import { AuditAction, type AuditLog, type Company } from "../models";

/**
 * onCompanyCreated - Trigger when a new company is created
 * - Logs audit
 */
export const onCompanyCreated = functions.firestore
	.document("companies/{companyId}")
	.onCreate(async (snap, context) => {
		const company = snap.data() as Company;

		functions.logger.info(`New company created: ${company.name}`, {
			companyId: context.params.companyId,
		});

		// Create audit log
		const auditLog: Partial<AuditLog> = {
			userId: "system",
			action: AuditAction.Create,
			collection: "companies",
			documentId: context.params.companyId,
			changes: { company: { before: null, after: company } },
			timestamp: Timestamp.now(),
		};

		return db.collection("auditLog").add(auditLog);
	});

/**
 * onCompanyUpdated - Trigger when a company is updated
 * - Logs changes to audit
 */
export const onCompanyUpdated = functions.firestore
	.document("companies/{companyId}")
	.onUpdate(async (change, context) => {
		const before = change.before.data() as Company;
		const after = change.after.data() as Company;

		const changes: Record<string, { before: unknown; after: unknown }> = {};
		const fieldsToTrack: (keyof Company)[] = [
			"name",
			"industry",
			"size",
			"website",
		];

		fieldsToTrack.forEach((field) => {
			if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
				changes[field] = { before: before[field], after: after[field] };
			}
		});

		if (Object.keys(changes).length > 0) {
			functions.logger.info(`Company ${context.params.companyId} updated`, {
				changes,
			});

			const auditLog: Partial<AuditLog> = {
				userId: "system",
				action: AuditAction.Update,
				collection: "companies",
				documentId: context.params.companyId,
				changes,
				timestamp: Timestamp.now(),
			};

			return db.collection("auditLog").add(auditLog);
		}

		return null;
	});
