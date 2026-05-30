import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

const SA = process.env.FIREBASE_SERVICE_ACCOUNT ?? "compute-fallback@abtec-8f31e.iam.gserviceaccount.com";


const STAFF_ROLES = ["admin", "manager", "sales", "support", "publisher"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

export const onUserWritten = functions.runWith({ serviceAccount: SA }).firestore
	.document("users/{userId}")
	.onWrite(async (change, context) => {
		const userId = context.params.userId;
		const afterData = change.after.exists ? change.after.data() : null;

		if (!afterData) {
			// User document deleted - revoke claims
			try {
				await admin.auth().setCustomUserClaims(userId, {});
				functions.logger.info(`Claims revoked for deleted user: ${userId}`);
			} catch (err) {
				functions.logger.error(`Error revoking claims for deleted user ${userId}:`, err);
			}
			return;
		}

		// Document created or updated
		const roles: StaffRole[] = [];
		if (Array.isArray(afterData.roles)) {
			for (const r of afterData.roles) {
				if (STAFF_ROLES.includes(r as StaffRole)) {
					roles.push(r as StaffRole);
				}
			}
		} else if (typeof afterData.role === "string" && STAFF_ROLES.includes(afterData.role as StaffRole)) {
			// Backward compatibility fallback
			roles.push(afterData.role as StaffRole);
		}

		const isActive = afterData.isActive !== false && afterData.status === "active";
		const staffRoles = isActive ? roles : [];

		try {
			const newClaims = staffRoles.length > 0 ? { staff: staffRoles } : {};
			await admin.auth().setCustomUserClaims(userId, newClaims);
			functions.logger.info(`Claims updated for user ${userId}:`, { staff: staffRoles });
		} catch (err) {
			functions.logger.error(`Error updating claims for user ${userId}:`, err);
		}
	});
