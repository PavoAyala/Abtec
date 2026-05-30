import type { Timestamp } from "firebase-admin/firestore";

export enum UserRole {
	Admin = "admin",
	Manager = "manager",
	Sales = "sales",
	Support = "support",
	Viewer = "viewer",
}

export interface User {
	id?: string;
	name: string;
	email: string;
	roles: UserRole[];
	isActive: boolean;
	createdAt: Timestamp;
	updatedAt: Timestamp;
}
