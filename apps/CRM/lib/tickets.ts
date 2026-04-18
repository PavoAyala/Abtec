// Funciones CRUD para Tickets

import { type Ticket, TicketPriority, TicketStatus } from "@/types";
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

export const getTickets = (filters?: {
	assigneeId?: string;
	contactId?: string;
	companyId?: string;
	status?: TicketStatus;
	priority?: TicketPriority;
}) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];

	if (filters?.assigneeId) {
		constraints.unshift(where("assigneeId", "==", filters.assigneeId));
	}
	if (filters?.contactId) {
		constraints.unshift(where("contactId", "==", filters.contactId));
	}
	if (filters?.companyId) {
		constraints.unshift(where("companyId", "==", filters.companyId));
	}
	if (filters?.status) {
		constraints.unshift(where("status", "==", filters.status));
	}
	if (filters?.priority) {
		constraints.unshift(where("priority", "==", filters.priority));
	}

	return getCollection<Ticket>("tickets", ...constraints);
};

export const getTicket = (id: string) => getDocument<Ticket>("tickets", id);

export const createTicket = async (data: Partial<Ticket>) => {
	const ticketData = {
		title: data.title || "",
		description: data.description || "",
		status: data.status || TicketStatus.Open,
		priority: data.priority || TicketPriority.Medium,
		category: data.category || "General",
		contactId: data.contactId || null,
		companyId: data.companyId || null,
		assigneeId: data.assigneeId || null,
		satisfactionRating: null,
	};
	return createDocument("tickets", ticketData);
};

export const updateTicket = (id: string, data: Partial<Ticket>) =>
	updateDocument("tickets", id, data);

export const deleteTicket = (id: string) => deleteDocument("tickets", id);

export const subscribeToTickets = (
	callback: (tickets: Ticket[]) => void,
	filters?: { assigneeId?: string; status?: TicketStatus },
) => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	if (filters?.assigneeId) {
		constraints.unshift(where("assigneeId", "==", filters.assigneeId));
	}
	if (filters?.status) {
		constraints.unshift(where("status", "==", filters.status));
	}

	return subscribeToCollection<Ticket>("tickets", callback, ...constraints);
};

export const getTicketsByStatus = async (): Promise<
	Record<TicketStatus, Ticket[]>
> => {
	const allTickets = await getTickets();
	const byStatus: Record<TicketStatus, Ticket[]> = {
		[TicketStatus.Open]: [],
		[TicketStatus.InProgress]: [],
		[TicketStatus.Resolved]: [],
		[TicketStatus.Closed]: [],
	};

	allTickets.forEach((ticket) => {
		byStatus[ticket.status].push(ticket);
	});

	return byStatus;
};

export const getTicketStats = async () => {
	const allTickets = await getTickets();
	const stats = {
		total: allTickets.length,
		open: 0,
		inProgress: 0,
		resolved: 0,
		closed: 0,
		critical: 0,
		high: 0,
		avgResolutionTime: 0,
	};

	const resolutionTimes: number[] = [];

	allTickets.forEach((ticket) => {
		switch (ticket.status) {
			case TicketStatus.Open:
				stats.open++;
				break;
			case TicketStatus.InProgress:
				stats.inProgress++;
				break;
			case TicketStatus.Resolved:
				stats.resolved++;
				break;
			case TicketStatus.Closed:
				stats.closed++;
				break;
		}

		if (ticket.priority === TicketPriority.Critical) stats.critical++;
		if (ticket.priority === TicketPriority.High) stats.high++;

		if (ticket.resolvedAt && ticket.createdAt) {
			const created = new Date(ticket.createdAt).getTime();
			const resolved = new Date(ticket.resolvedAt).getTime();
			const hours = (resolved - created) / (1000 * 60 * 60);
			resolutionTimes.push(hours);
		}
	});

	if (resolutionTimes.length > 0) {
		stats.avgResolutionTime =
			resolutionTimes.reduce((a, b) => a + b, 0) / resolutionTimes.length;
	}

	return stats;
};
