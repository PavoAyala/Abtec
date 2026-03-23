"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onContactCreated = void 0;
const functions = require("firebase-functions");
exports.onContactCreated = functions.firestore
    .document('contacts/{contactId}')
    .onCreate(async (snap, context) => {
    const contact = snap.data();
    // Auto-assign owner and setup logic here.
    const updates = {};
    if (!contact.ownerId) {
        // Logic for round-robin assigning or default owner
        updates.ownerId = 'unassigned';
    }
    if (!contact.leadScore) {
        updates.leadScore = 10; // default initial score
    }
    if (Object.keys(updates).length > 0) {
        return snap.ref.update(updates);
    }
    return null;
});
//# sourceMappingURL=contacts.js.map