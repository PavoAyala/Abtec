"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserWritten = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
const STAFF_ROLES = ["admin", "manager", "sales", "support", "publisher"];
exports.onUserWritten = functions.firestore
    .document("users/{userId}")
    .onWrite(async (change, context) => {
    const userId = context.params.userId;
    const afterData = change.after.exists ? change.after.data() : null;
    if (!afterData) {
        // User document deleted - revoke claims
        try {
            await admin.auth().setCustomUserClaims(userId, {});
            functions.logger.info(`Claims revoked for deleted user: ${userId}`);
        }
        catch (err) {
            functions.logger.error(`Error revoking claims for deleted user ${userId}:`, err);
        }
        return;
    }
    // Document created or updated
    const roles = [];
    if (Array.isArray(afterData.roles)) {
        for (const r of afterData.roles) {
            if (STAFF_ROLES.includes(r)) {
                roles.push(r);
            }
        }
    }
    else if (typeof afterData.role === "string" && STAFF_ROLES.includes(afterData.role)) {
        // Backward compatibility fallback
        roles.push(afterData.role);
    }
    const isActive = afterData.isActive !== false && afterData.status === "active";
    const staffRoles = isActive ? roles : [];
    try {
        const newClaims = staffRoles.length > 0 ? { staff: staffRoles } : {};
        await admin.auth().setCustomUserClaims(userId, newClaims);
        functions.logger.info(`Claims updated for user ${userId}:`, { staff: staffRoles });
    }
    catch (err) {
        functions.logger.error(`Error updating claims for user ${userId}:`, err);
    }
});
//# sourceMappingURL=users.js.map