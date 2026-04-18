import type { Timestamp } from "firebase-admin/firestore";
import type { DealStage } from "./types";

export interface Deal {
	id?: string;
	title: string;
	value: number;
	currency: string;
	stage: DealStage;
	probability: number;
	contactId?: string;
	companyId?: string;
	ownerId?: string;
	expectedCloseDate?: Timestamp;
	lostReason?: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
