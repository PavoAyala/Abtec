// Funciones CRUD para Contacts

import { type Contact, LifecycleStage } from "@/types";
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

export const getContacts = async (filters?: {
	ownerId?: string;
	companyId?: string;
	lifecycleStage?: LifecycleStage;
	search?: string;
}) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}
	if (filters?.companyId) {
		constraints.unshift(where("companyId", "==", filters.companyId));
	}
	if (filters?.lifecycleStage) {
		constraints.unshift(where("lifecycleStage", "==", filters.lifecycleStage));
	}

	const rawContacts = await getCollection<Contact>("contacts", ...constraints);
	let contacts = rawContacts.map((doc) => ({
		...doc,
		createdAt:
			doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
		updatedAt:
			doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
	}));

	// Fetch registered web users
	try {
		const webUsers = await getCollection<any>("users", where("role", "==", "customer"));
		
		const webContacts: Contact[] = webUsers.map((u) => ({
			id: u.id,
			name: u.name || u.displayName || `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email,
			email: u.email,
			phone: u.phone || "",
			tags: ["Web Registered"],
			customFields: {},
			lifecycleStage: LifecycleStage.Subscriber,
			leadScore: 10,
			createdAt: u.createdAt?.toDate ? u.createdAt.toDate() : new Date(u.createdAt || Date.now()),
			updatedAt: u.updatedAt?.toDate ? u.updatedAt.toDate() : new Date(u.updatedAt || Date.now()),
		}));

		const contactIds = new Set(contacts.map(c => c.id));
		const uniqueWebContacts = webContacts.filter(c => !contactIds.has(c.id));

		contacts = [...contacts, ...uniqueWebContacts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

		if (filters?.lifecycleStage) {
			contacts = contacts.filter(c => c.lifecycleStage === filters.lifecycleStage);
		}
	} catch (err) {
		console.warn("Error fetching web users:", err);
	}

	return contacts;
};

export const getContact = (id: string) =>
	getDocument<Contact>("contacts", id).then((doc) => {
		if (!doc) return null;
		return {
			...doc,
			createdAt:
				doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
			updatedAt:
				doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
		};
	});

export const createContact = async (data: Partial<Contact>) => {
	const contactData = {
		name: data.name || "",
		email: data.email || "",
		phone: data.phone || "",
		companyId: data.companyId || null,
		tags: data.tags || [],
		customFields: data.customFields || {},
		lifecycleStage: data.lifecycleStage || LifecycleStage.Subscriber,
		leadScore: data.leadScore ?? 10,
		ownerId: data.ownerId || null,
	};
	return createDocument("contacts", contactData);
};

export const updateContact = (id: string, data: Partial<Contact>) =>
	updateDocument("contacts", id, data);

export const deleteContact = (id: string) => deleteDocument("contacts", id);

export const subscribeToContacts = (
	callback: (contacts: Contact[]) => void,
	filters?: { ownerId?: string },
) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}

	return subscribeToCollection<Contact>("contacts", callback, ...constraints);
};

export const searchContacts = async (
	searchTerm: string,
): Promise<Contact[]> => {
	const allContacts = await getContacts();
	const term = searchTerm.toLowerCase();
	return allContacts.filter(
		(c) =>
			c.name.toLowerCase().includes(term) ||
			c.email.toLowerCase().includes(term) ||
			c.phone?.toLowerCase().includes(term),
	);
};
