import type { Timestamp } from "firebase-admin/firestore";
import type { ActivityType } from "./types";

export interface Activity {
	id?: string;
	type: ActivityType;
	contactId?: string;
	dealId?: string;
	companyId?: string;
	ticketId?: string;
	description: string;
	dueDate?: Timestamp;
	completedAt?: Timestamp;
	ownerId?: string;
	createdAt: Timestamp;
}
