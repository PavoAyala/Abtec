import type { Timestamp } from "firebase-admin/firestore";

export interface Contact {
	id?: string;
	name: string;
	email: string;
	phone?: string;
	companyId?: string;
	tags: string[];
	customFields: Record<string, unknown>;
	lifecycleStage: string;
	leadScore: number;
	ownerId?: string;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
