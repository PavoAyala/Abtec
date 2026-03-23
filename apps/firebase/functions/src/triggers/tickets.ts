import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Ticket } from '../models/Ticket';
import { TicketStatus } from '../models/types';

export const onTicketCreated = functions.firestore
  .document('tickets/{ticketId}')
  .onCreate(async (snap, context) => {
    const ticket = snap.data() as Ticket;
    const updates: Partial<Ticket> = {};

    // Initial SLA deadline calculation (e.g., +24 hours)
    if (!ticket.slaDeadline) {
      const deadline = new Date();
      deadline.setHours(deadline.getHours() + 24);
      updates.slaDeadline = admin.firestore.Timestamp.fromDate(deadline);
    }

    if (!ticket.status) {
      updates.status = TicketStatus.Open;
    }

    if (Object.keys(updates).length > 0) {
      return snap.ref.update(updates);
    }
    return null;
  });
