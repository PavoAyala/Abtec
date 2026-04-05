import { Timestamp } from 'firebase-admin/firestore';
import { TicketPriority, TicketStatus } from './types';

export interface Ticket {
  id?: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  contactId?: string;
  companyId?: string;
  assigneeId?: string;
  slaDeadline?: Timestamp;
  resolvedAt?: Timestamp;
  satisfactionRating?: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
