"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDealUpdated = exports.onDealStageChanged = exports.onDealCreated = void 0;
const firestore_1 = require("firebase-admin/firestore");
const functions = require("firebase-functions");
const firebase_1 = require("../config/firebase");
const models_1 = require("../models");
/**
 * onDealCreated - Trigger when a new deal is created
 * - Sets initial probability based on stage
 * - Creates activity log
 * - Logs audit
 */
exports.onDealCreated = functions.firestore
    .document("deals/{dealId}")
    .onCreate(async (snap, context) => {
    const deal = snap.data();
    const batch = firebase_1.db.batch();
    functions.logger.info(`New deal created: ${deal.title}`, {
        dealId: context.params.dealId,
    });
    const updates = {};
    // Set probability based on initial stage
    if (deal.probability === undefined || deal.probability === 0) {
        const stageProbabilities = {
            [models_1.DealStage.Lead]: 10,
            [models_1.DealStage.Proposal]: 50,
            [models_1.DealStage.Negotiation]: 75,
            [models_1.DealStage.Won]: 100,
            [models_1.DealStage.Lost]: 0,
        };
        updates.probability = stageProbabilities[deal.stage] || 0;
    }
    // Set currency default if not provided
    if (!deal.currency) {
        updates.currency = "USD";
    }
    // Create activity for deal creation
    const createActivity = {
        type: models_1.ActivityType.Note,
        dealId: context.params.dealId,
        contactId: deal.contactId,
        companyId: deal.companyId,
        description: `Deal "${deal.title}" creado con valor ${deal.currency} ${deal.value}`,
        ownerId: deal.ownerId,
        createdAt: firestore_1.Timestamp.now(),
    };
    const activityRef = firebase_1.db.collection("activities").doc();
    batch.set(activityRef, createActivity);
    // Create audit log
    const auditLog = {
        userId: "system",
        action: models_1.AuditAction.Create,
        collection: "deals",
        documentId: context.params.dealId,
        changes: { deal: { before: null, after: deal } },
        timestamp: firestore_1.Timestamp.now(),
    };
    const auditRef = firebase_1.db.collection("auditLog").doc();
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
exports.onDealStageChanged = functions.firestore
    .document("deals/{dealId}")
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const batch = firebase_1.db.batch();
    // Only proceed if stage actually changed
    if (before.stage === after.stage) {
        return null;
    }
    functions.logger.info(`Deal ${context.params.dealId} stage changed: ${before.stage} -> ${after.stage}`);
    const updates = {};
    // Update probability based on new stage
    const stageProbabilities = {
        [models_1.DealStage.Lead]: 10,
        [models_1.DealStage.Proposal]: 50,
        [models_1.DealStage.Negotiation]: 75,
        [models_1.DealStage.Won]: 100,
        [models_1.DealStage.Lost]: 0,
    };
    updates.probability = stageProbabilities[after.stage] || 0;
    // Record lost reason if moving to Lost
    if (after.stage === models_1.DealStage.Lost && !after.lostReason) {
        functions.logger.info(`Deal ${context.params.dealId} marked as Lost`);
    }
    // Create stage change activity
    const stageActivity = {
        type: models_1.ActivityType.Note,
        dealId: context.params.dealId,
        contactId: after.contactId,
        companyId: after.companyId,
        description: `Deal movido de "${before.stage}" a "${after.stage}"`,
        ownerId: after.ownerId,
        createdAt: firestore_1.Timestamp.now(),
    };
    const activityRef = firebase_1.db.collection("activities").doc();
    batch.set(activityRef, stageActivity);
    // Update contact lifecycle if deal is Won or Lost
    if (after.contactId &&
        (after.stage === models_1.DealStage.Won || after.stage === models_1.DealStage.Lost)) {
        const contactRef = firebase_1.db.collection("contacts").doc(after.contactId);
        const contactUpdate = {
            lifecycleStage: after.stage === models_1.DealStage.Won ? "customer" : "lost",
        };
        if (after.stage === models_1.DealStage.Won) {
            contactUpdate.leadScore = 100;
        }
        batch.update(contactRef, contactUpdate);
    }
    // Create audit log
    const auditLog = {
        userId: "system",
        action: models_1.AuditAction.Update,
        collection: "deals",
        documentId: context.params.dealId,
        changes: {
            stage: { before: before.stage, after: after.stage },
            probability: { before: before.probability, after: updates.probability },
        },
        timestamp: firestore_1.Timestamp.now(),
    };
    const auditRef = firebase_1.db.collection("auditLog").doc();
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
exports.onDealUpdated = functions.firestore
    .document("deals/{dealId}")
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    // Skip if stage changed (handled by onDealStageChanged)
    if (before.stage !== after.stage) {
        return null;
    }
    const changes = {};
    const fieldsToTrack = [
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
        const auditLog = {
            userId: "system",
            action: models_1.AuditAction.Update,
            collection: "deals",
            documentId: context.params.dealId,
            changes,
            timestamp: firestore_1.Timestamp.now(),
        };
        return firebase_1.db.collection("auditLog").add(auditLog);
    }
    return null;
});
//# sourceMappingURL=deals.js.map