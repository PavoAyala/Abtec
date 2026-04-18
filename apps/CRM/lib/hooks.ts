"use client";

import useSWR from "swr";
import { fetcher, SWRKeys } from "./swr";

export function useContacts() {
	const { data, error, isLoading, mutate } = useSWR(
		SWRKeys.contacts,
		fetcher.contacts,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000, // 1 minute
		},
	);

	return { contacts: data || [], isLoading, error, mutate };
}

export function useCompanies() {
	const { data, error, isLoading, mutate } = useSWR(
		SWRKeys.companies,
		fetcher.companies,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { companies: data || [], isLoading, error, mutate };
}

export function useDeals() {
	const { data, error, isLoading, mutate } = useSWR(
		SWRKeys.deals,
		fetcher.deals,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { deals: data || [], isLoading, error, mutate };
}

export function useDealsStats() {
	const { data, error, isLoading } = useSWR(
		SWRKeys.dealsStats,
		fetcher.dealsStats,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { stats: data, isLoading, error };
}

export function useTickets() {
	const { data, error, isLoading, mutate } = useSWR(
		SWRKeys.tickets,
		fetcher.tickets,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { tickets: data || [], isLoading, error, mutate };
}

export function useTicketsStats() {
	const { data, error, isLoading } = useSWR(
		SWRKeys.ticketsStats,
		fetcher.ticketsStats,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { stats: data, isLoading, error };
}

export function useActivities() {
	const { data, error, isLoading, mutate } = useSWR(
		SWRKeys.activities,
		fetcher.activities,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 60000,
		},
	);

	return { activities: data || [], isLoading, error, mutate };
}
