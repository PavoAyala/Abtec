import { Timestamp } from "firebase-admin/firestore";

export enum AuditAction {
	Create = "create",
	Update = "update",
	Delete = "delete",
}

export interface AuditLog {
	id?: string;
	userId: string;
	action: AuditAction;
	collection: string;
	documentId: string;
	changes: Record<string, { before: any; after: any }>;
	timestamp: Timestamp;
}
