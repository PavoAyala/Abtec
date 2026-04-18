// Funciones CRUD para Deals

import { type Deal, DealStage } from "@/types";
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

export const getDeals = (filters?: {
	ownerId?: string;
	contactId?: string;
	companyId?: string;
	stage?: DealStage;
}) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}
	if (filters?.contactId) {
		constraints.unshift(where("contactId", "==", filters.contactId));
	}
	if (filters?.companyId) {
		constraints.unshift(where("companyId", "==", filters.companyId));
	}
	if (filters?.stage) {
		constraints.unshift(where("stage", "==", filters.stage));
	}

	return getCollection<Deal>("deals", ...constraints);
};

export const getDeal = (id: string) => getDocument<Deal>("deals", id);

export const createDeal = async (data: Partial<Deal>) => {
	const dealData = {
		title: data.title || "",
		value: data.value ?? 0,
		currency: data.currency || "USD",
		stage: data.stage || DealStage.Lead,
		probability: data.probability ?? 10,
		contactId: data.contactId || null,
		companyId: data.companyId || null,
		ownerId: data.ownerId || null,
		expectedCloseDate: data.expectedCloseDate || null,
		lostReason: data.lostReason || null,
	};
	return createDocument("deals", dealData);
};

export const updateDeal = (id: string, data: Partial<Deal>) =>
	updateDocument("deals", id, data);

export const deleteDeal = (id: string) => deleteDocument("deals", id);

export const subscribeToDeals = (
	callback: (deals: Deal[]) => void,
	filters?: { ownerId?: string; stage?: DealStage },
) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	if (filters?.ownerId) {
		constraints.unshift(where("ownerId", "==", filters.ownerId));
	}
	if (filters?.stage) {
		constraints.unshift(where("stage", "==", filters.stage));
	}

	return subscribeToCollection<Deal>("deals", callback, ...constraints);
};

export const getDealsByStage = async (): Promise<Record<DealStage, Deal[]>> => {
	const allDeals = await getDeals();
	const byStage: Record<DealStage, Deal[]> = {
		[DealStage.Lead]: [],
		[DealStage.Proposal]: [],
		[DealStage.Negotiation]: [],
		[DealStage.Won]: [],
		[DealStage.Lost]: [],
	};

	allDeals.forEach((deal) => {
		byStage[deal.stage].push(deal);
	});

	return byStage;
};

export const getPipelineStats = async () => {
	const allDeals = await getDeals();
	const stats = {
		totalValue: 0,
		totalDeals: allDeals.length,
		wonValue: 0,
		wonDeals: 0,
		lostValue: 0,
		lostDeals: 0,
		avgDealSize: 0,
	};

	allDeals.forEach((deal) => {
		stats.totalValue += deal.value;
		if (deal.stage === DealStage.Won) {
			stats.wonValue += deal.value;
			stats.wonDeals++;
		} else if (deal.stage === DealStage.Lost) {
			stats.lostValue += deal.value;
			stats.lostDeals++;
		}
	});

	stats.avgDealSize =
		stats.totalDeals > 0 ? stats.totalValue / stats.totalDeals : 0;
	return stats;
};
