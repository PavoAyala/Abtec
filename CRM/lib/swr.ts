import { getContacts } from './contacts';
import { getCompanies } from './companies';
import { getDeals, getPipelineStats } from './deals';
import { getTickets, getTicketStats } from './tickets';
import { getActivities } from './activities';

// SWR Fetcher para Firestore
export const fetcher = {
  contacts: () => getContacts(),
  companies: () => getCompanies(),
  deals: () => getDeals(),
  dealsStats: () => getPipelineStats(),
  tickets: () => getTickets(),
  ticketsStats: () => getTicketStats(),
  activities: () => getActivities(),
};

// Keys para SWR
export const SWRKeys = {
  contacts: 'contacts',
  companies: 'companies',
  deals: 'deals',
  dealsStats: 'deals-stats',
  tickets: 'tickets',
  ticketsStats: 'tickets-stats',
  activities: 'activities',
};
