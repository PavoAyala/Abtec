import { Timestamp } from "firebase-admin/firestore";

export interface Company {
	id?: string;
	name: string;
	industry: string;
	size: string;
	website?: string;
	createdAt: Timestamp;
}
