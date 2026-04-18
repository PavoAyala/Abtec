// Funciones CRUD para Activities

import { type Activity, ActivityType } from "@/types";
import {
	createDocument,
	deleteDocument,
	getCollection,
	getDocument,
	orderBy,
	type QueryConstraint,
	subscribeToCollection,
	updateDocument,
	where,
} from "./firebase";

export const getActivities = (filters?: {
	ownerId?: string;
	contactId?: string;
	dealId?: string;
	companyId?: string;
	ticketId?: string;
	type?: ActivityType;
}) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}
	if (filters?.contactId) {
		constraints.unshift(where("contactId", "==", filters.contactId));
	}
	if (filters?.dealId) {
		constraints.unshift(where("dealId", "==", filters.dealId));
	}
	if (filters?.companyId) {
		constraints.unshift(where("companyId", "==", filters.companyId));
	}
	if (filters?.ticketId) {
		constraints.unshift(where("ticketId", "==", filters.ticketId));
	}
	if (filters?.type) {
		constraints.unshift(where("type", "==", filters.type));
	}

	return getCollection<Activity>("activities", ...constraints);
};

export const getActivity = (id: string) =>
	getDocument<Activity>("activities", id);

export const createActivity = async (data: Partial<Activity>) => {
	const activityData = {
		type: data.type || ActivityType.Note,
		contactId: data.contactId || null,
		dealId: data.dealId || null,
		companyId: data.companyId || null,
		ticketId: data.ticketId || null,
		description: data.description || "",
		dueDate: data.dueDate || null,
		completedAt: data.completedAt || null,
		ownerId: data.ownerId || null,
	};
	return createDocument("activities", activityData);
};

export const updateActivity = (id: string, data: Partial<Activity>) =>
	updateDocument("activities", id, data);

export const deleteActivity = (id: string) => deleteDocument("activities", id);

export const completeActivity = async (id: string) => {
	await updateDocument("activities", id, {
		completedAt: new Date(),
	});
};

export const subscribeToActivities = (
	callback: (activities: Activity[]) => void,
	filters?: { ownerId?: string; contactId?: string; dealId?: string },
) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}
	if (filters?.contactId) {
		constraints.unshift(where("contactId", "==", filters.contactId));
	}
	if (filters?.dealId) {
		constraints.unshift(where("dealId", "==", filters.dealId));
	}

	return subscribeToCollection<Activity>(
		"activities",
		callback,
		...constraints,
	);
};

export const getUpcomingTasks = async (
	ownerId?: string,
): Promise<Activity[]> => {
	const constraints: QueryConstraint[] = [
		where("type", "==", ActivityType.Task),
		where("completedAt", "==", null),
		orderBy("dueDate", "asc"),
	];

	if (ownerId) {
		constraints.unshift(where("ownerId", "==", ownerId));
	}

	return getCollection<Activity>("activities", ...constraints);
};

export const getTodaysTasks = async (ownerId?: string): Promise<Activity[]> => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const constraints: QueryConstraint[] = [
		where("type", "==", ActivityType.Task),
		where("completedAt", "==", null),
		where("dueDate", ">=", today),
		where("dueDate", "<", tomorrow),
		orderBy("dueDate", "asc"),
	];

	if (ownerId) {
		constraints.unshift(where("ownerId", "==", ownerId));
	}

	return getCollection<Activity>("activities", ...constraints);
};
