"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onCompanyUpdated = exports.onCompanyCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const models_1 = require("../models");
const firebase_1 = require("../config/firebase");
/**
 * onCompanyCreated - Trigger when a new company is created
 * - Logs audit
 */
exports.onCompanyCreated = functions.firestore
    .document('companies/{companyId}')
    .onCreate(async (snap, context) => {
    const company = snap.data();
    functions.logger.info(`New company created: ${company.name}`, {
        companyId: context.params.companyId,
    });
    // Create audit log
    const auditLog = {
        userId: 'system',
        action: models_1.AuditAction.Create,
        collection: 'companies',
        documentId: context.params.companyId,
        changes: { company: { before: null, after: company } },
        timestamp: admin.firestore.Timestamp.now(),
    };
    return firebase_1.db.collection('auditLog').add(auditLog);
});
/**
 * onCompanyUpdated - Trigger when a company is updated
 * - Logs changes to audit
 */
exports.onCompanyUpdated = functions.firestore
    .document('companies/{companyId}')
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const changes = {};
    const fieldsToTrack = ['name', 'industry', 'size', 'website'];
    fieldsToTrack.forEach((field) => {
        if (JSON.stringify(before[field]) !== JSON.stringify(after[field])) {
            changes[field] = { before: before[field], after: after[field] };
        }
    });
    if (Object.keys(changes).length > 0) {
        functions.logger.info(`Company ${context.params.companyId} updated`, { changes });
        const auditLog = {
            userId: 'system',
            action: models_1.AuditAction.Update,
            collection: 'companies',
            documentId: context.params.companyId,
            changes,
            timestamp: admin.firestore.Timestamp.now(),
        };
        return firebase_1.db.collection('auditLog').add(auditLog);
    }
    return null;
});
//# sourceMappingURL=companies.js.map