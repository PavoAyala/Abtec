// Funciones CRUD para Contacts
import {
	getCollection,
	getDocument,
	createDocument,
	updateDocument,
	deleteDocument,
	query,
	where,
	orderBy,
	subscribeToCollection,
	QueryConstraint,
} from "./firebase";
import { Contact, LifecycleStage } from "@/types";

export const getContacts = (filters?: {
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

	return getCollection<Contact>("contacts", ...constraints).then((data) =>
		data.map((doc) => ({
			...doc,
			createdAt:
				doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
			updatedAt:
				doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
		})),
	);
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
