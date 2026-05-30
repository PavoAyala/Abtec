import { getActivities } from "./activities";
import { getBlogPosts } from "./blog";
import { getCompanies } from "./companies";
import { getContacts } from "./contacts";
import { getDeals, getPipelineStats } from "./deals";
import { getTicketStats, getTickets } from "./tickets";

// SWR Fetcher para Firestore
export const fetcher = {
	contacts: () => getContacts(),
	companies: () => getCompanies(),
	deals: () => getDeals(),
	dealsStats: () => getPipelineStats(),
	tickets: () => getTickets(),
	ticketsStats: () => getTicketStats(),
	activities: () => getActivities(),
	blogPosts: () => getBlogPosts(),
};

// Keys para SWR
export const SWRKeys = {
	contacts: "contacts",
	companies: "companies",
	deals: "deals",
	dealsStats: "deals-stats",
	tickets: "tickets",
	ticketsStats: "tickets-stats",
	activities: "activities",
	blogPosts: "blog_posts",
};
