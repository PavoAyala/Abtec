// Funciones CRUD para Companies
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
} from "./firebase";
import { Company } from "@/types";

export const getCompanies = (filters?: { search?: string }) => {
	const constraints = [orderBy("createdAt", "desc")];
	return getCollection<Company>("companies", ...constraints);
};

export const getCompany = (id: string) => getDocument<Company>("companies", id);

export const createCompany = async (data: Partial<Company>) => {
	const companyData = {
		name: data.name || "",
		industry: data.industry || "",
		size: data.size || "",
		website: data.website || null,
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
