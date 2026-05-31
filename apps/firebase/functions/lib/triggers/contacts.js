"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onContactUpdated = exports.onContactCreated = void 0;
const firestore_1 = require("firebase-admin/firestore");
const functions = require("firebase-functions/v1");
const firebase_1 = require("../config/firebase");
const models_1 = require("../models");
/**
 * onContactCreated - Trigger when a new contact is created
 * - Assigns owner (round-robin)
 * - Sets initial lead score
 * - Creates welcome activity
 * - Logs audit
 */
exports.onContactCreated = functions.firestore
    .document("contacts/{contactId}")
    .onCreate(async (snap, context) => {
    const contact = snap.data();
    const updates = {};
    const batch = firebase_1.db.batch();
    functions.logger.info(`New contact created: ${contact.email}`, {
        contactId: context.params.contactId,
    });
    // Auto-assign owner using round-robin
    if (!contact.ownerId) {
        const ownerId = await getNextOwner();
        updates.ownerId = ownerId;
        functions.logger.info(`Assigned owner ${ownerId} to contact ${context.params.contactId}`);
    }
    // Set initial lead score
    if (contact.leadScore === undefined || contact.leadScore === null) {
        updates.leadScore = 10;
    }
    // Set lifecycle stage if not provided
    if (!contact.lifecycleStage) {
        updates.lifecycleStage = "subscriber";
    }
    // Create welcome activity
    const welcomeActivity = {
        type: models_1.ActivityType.Note,
        contactId: context.params.contactId,
        description: "Contacto creado en el sistema",
        ownerId: contact.ownerId || updates.ownerId,
        createdAt: firestore_1.Timestamp.now(),
    };
    const activityRef = firebase_1.db.collection("activities").doc();
    batch.set(activityRef, welcomeActivity);
    // Create audit log
    const auditLog = {
        userId: "system",
        action: models_1.AuditAction.Create,
        collection: "contacts",
        documentId: context.params.contactId,
        changes: { contact: { before: null, after: contact } },
        timestamp: firestore_1.Timestamp.now(),
    };
    const auditRef = firebase_1.db.collection("auditLog").doc();
    batch.set(auditRef, auditLog);
    // Apply updates
    if (Object.keys(updates).length > 0) {
        batch.update(snap.ref, updates);
    }
    return batch.commit();
});
/**
 * onContactUpdated - Trigger when a contact is updated
 * - Logs changes
 * - Updates lead score based on stage changes
 */
exports.onContactUpdated = functions.firestore
    .document("contacts/{contactId}")
    .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const batch = firebase_1.db.batch();
    functions.logger.info(`Contact updated: ${context.params.contactId}`);
    // Track lifecycle stage changes
    if (before.lifecycleStage !== after.lifecycleStage) {
        functions.logger.info(`Contact ${context.params.contactId} lifecycle stage changed: ${before.lifecycleStage} -> ${after.lifecycleStage}`);
        // Update lead score based on new stage
        const stageScores = {
            subscriber: 10,
            lead: 25,
            mql: 50,
            sql: 75,
            opportunity: 90,
            customer: 100,
        };
        const newScore = stageScores[after.lifecycleStage] || after.leadScore;
        batch.update(change.after.ref, { leadScore: newScore });
    }
    // Create audit log
    const changes = {};
    const fieldsToTrack = [
        "name",
        "email",
        "phone",
        "lifecycleStage",
        "leadScore",
        "ownerId",
        "tags",
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
            collection: "contacts",
            documentId: context.params.contactId,
            changes,
            timestamp: firestore_1.Timestamp.now(),
        };
        const auditRef = firebase_1.db.collection("auditLog").doc();
        batch.set(auditRef, auditLog);
    }
    return batch.commit();
});
/**
 * getNextOwner - Gets the next available owner using round-robin
 */
async function getNextOwner() {
    const usersRef = firebase_1.db.collection("users");
    const usersQuery = usersRef
        .where("isActive", "==", true)
        .where("roles", "array-contains-any", ["sales", "manager", "admin"])
        .limit(10);
    const users = await usersQuery.get();
    if (users.empty) {
        return "unassigned";
    }
    // Simple round-robin: get user with least contacts assigned
    const ownerCounts = {};
    users.forEach((user) => {
        ownerCounts[user.id] = 0;
    });
    const contactsQuery = await firebase_1.db
        .collection("contacts")
        .where("ownerId", "in", Object.keys(ownerCounts))
        .get();
    contactsQuery.forEach((doc) => {
        const ownerId = doc.data().ownerId;
        if (ownerId && ownerCounts[ownerId] !== undefined) {
            ownerCounts[ownerId]++;
        }
    });
    let minOwner = Object.keys(ownerCounts)[0];
    let minCount = ownerCounts[minOwner];
    Object.entries(ownerCounts).forEach(([ownerId, count]) => {
        if (count < minCount) {
            minCount = count;
            minOwner = ownerId;
        }
    });
    return minOwner;
}
//# sourceMappingURL=contacts.js.map