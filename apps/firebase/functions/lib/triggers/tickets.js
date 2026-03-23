"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onTicketCreated = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const types_1 = require("../models/types");
exports.onTicketCreated = functions.firestore
    .document('tickets/{ticketId}')
    .onCreate(async (snap, context) => {
    const ticket = snap.data();
    const updates = {};
    // Initial SLA deadline calculation (e.g., +24 hours)
    if (!ticket.slaDeadline) {
        const deadline = new Date();
        deadline.setHours(deadline.getHours() + 24);
        updates.slaDeadline = admin.firestore.Timestamp.fromDate(deadline);
    }
    if (!ticket.status) {
        updates.status = types_1.TicketStatus.Open;
    }
    if (Object.keys(updates).length > 0) {
        return snap.ref.update(updates);
    }
    return null;
});
//# sourceMappingURL=tickets.js.map