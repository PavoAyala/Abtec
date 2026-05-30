// Funciones CRUD para Companies

import type { Company } from "@/types";
import {
	createDocument,
	deleteDocument,
	getCollection,
	getDocument,
	QueryConstraint,
	orderBy,
	subscribeToCollection,
	updateDocument,
	where,
} from "./firebase";
import { LifecycleStage } from "@/types";

export const getCompanies = (filters?: { search?: string; lifecycleStage?: LifecycleStage }) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	if (filters?.lifecycleStage) {
		constraints.unshift(where("lifecycleStage", "==", filters.lifecycleStage));
	}
	return getCollection<Company>("companies", ...constraints);
};

export const getCompany = (id: string) => getDocument<Company>("companies", id);

export const createCompany = async (data: Partial<Company>) => {
	const companyData = {
		name: data.name || "",
		industry: data.industry || "",
		size: data.size || "",
		website: data.website || null,
		lifecycleStage: data.lifecycleStage || LifecycleStage.Lead,
	};
	return createDocument("companies", companyData);
};

export const updateCompany = (id: string, data: Partial<Company>) =>
	updateDocument("companies", id, data);

export const deleteCompany = (id: string) => deleteDocument("companies", id);

export const subscribeToCompanies = (
	callback: (companies: Company[]) => void,
) => {
	return subscribeToCollection<Company>(
		"companies",
		callback,
		orderBy("createdAt", "desc"),
	);
};

export const searchCompanies = async (
	searchTerm: string,
): Promise<Company[]> => {
	const allCompanies = await getCompanies();
	const term = searchTerm.toLowerCase();
	return allCompanies.filter(
		(c) =>
			c.name.toLowerCase().includes(term) ||
			c.industry.toLowerCase().includes(term) ||
			c.website?.toLowerCase().includes(term),
	);
};
