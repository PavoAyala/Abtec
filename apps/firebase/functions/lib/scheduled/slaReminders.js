"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOverdueTasks = exports.checkSlaDeadlines = void 0;
const firestore_1 = require("firebase-admin/firestore");
const functions = require("firebase-functions/v2");
const firebase_1 = require("../config/firebase");
const models_1 = require("../models");
/**
 * checkSlaDeadlines - Runs every 15 minutes
 * Checks for tickets approaching SLA deadline and logs warnings
 */
exports.checkSlaDeadlines = functions.scheduler.onSchedule({
    schedule: "every 15 minutes",
}, async () => {
    functions.logger.info("Running SLA deadline check");
    const now = firestore_1.Timestamp.now();
    const atRiskQuery = firebase_1.db
        .collection("tickets")
        .where("status", "in", [models_1.TicketStatus.Open, models_1.TicketStatus.InProgress])
        .where("slaDeadline", "<=", firestore_1.Timestamp.fromDate(new Date(now.toDate().getTime() + 60 * 60 * 1000)));
    const atRiskTickets = await atRiskQuery.get();
    if (atRiskTickets.empty) {
        functions.logger.info("No tickets at risk of SLA breach");
        return;
    }
    functions.logger.warn(`Found ${atRiskTickets.size} tickets at risk of SLA breach`);
    atRiskTickets.forEach((doc) => {
        const ticket = doc.data();
        const deadline = ticket.slaDeadline.toDate();
        const timeRemaining = deadline.getTime() - now.toDate().getTime();
        const minutesRemaining = Math.floor(timeRemaining / (1000 * 60));
        functions.logger.warn(`Ticket ${doc.id} (${ticket.title}) - SLA deadline in ${minutesRemaining} minutes`, {
            ticketId: doc.id,
            priority: ticket.priority,
            assigneeId: ticket.assigneeId,
            slaDeadline: deadline.toISOString(),
        });
    });
});
/**
 * checkOverdueTasks - Runs every hour
 * Checks for activities with due dates that have passed
 */
exports.checkOverdueTasks = functions.scheduler.onSchedule({
    schedule: "every 60 minutes",
}, async () => {
    functions.logger.info("Running overdue tasks check");
    const now = firestore_1.Timestamp.now();
    const overdueQuery = firebase_1.db
        .collection("activities")
        .where("type", "==", "Task")
        .where("dueDate", "<=", now)
        .where("completedAt", "==", null);
    const overdueTasks = await overdueQuery.get();
    if (overdueTasks.empty) {
        functions.logger.info("No overdue tasks found");
        return;
    }
    functions.logger.warn(`Found ${overdueTasks.size} overdue tasks`);
    overdueTasks.forEach((doc) => {
        const task = doc.data();
        functions.logger.warn(`Overdue task: ${doc.id}`, {
            description: task.description,
            ownerId: task.ownerId,
            dueDate: task.dueDate.toDate().toISOString(),
        });
    });
});
//# sourceMappingURL=slaReminders.js.map