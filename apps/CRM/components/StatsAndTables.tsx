"use client";

import { type ReactNode, useEffect, useState } from "react";

interface StatCardProps {
	label: string;
	value: number | string;
	prefix?: string;
	suffix?: string;
	icon: ReactNode;
	trend?: {
		value: number;
		direction: "up" | "down";
	};
	variant?: "blue" | "green" | "yellow" | "red";
	animate?: boolean;
}

export default function StatCard({
	label,
	value,
	prefix = "",
	suffix = "",
	icon,
	trend,
	variant = "blue",
	animate = true,
}: StatCardProps) {
	const [displayValue, setDisplayValue] = useState(animate ? 0 : value);
	const numericValue =
		typeof value === "number" ? value : parseFloat(String(value)) || 0;

	useEffect(() => {
		if (!animate || typeof value !== "number") {
			setDisplayValue(value);
			return;
		}

		const duration = 1000;
		const steps = 30;
		const increment = numericValue / steps;
		let current = 0;
		let step = 0;

		const timer = setInterval(() => {
			step++;
			current = Math.min(Math.round(increment * step), numericValue);
			setDisplayValue(current);

			if (step >= steps) {
				clearInterval(timer);
				setDisplayValue(numericValue);
			}
		}, duration / steps);

		return () => clearInterval(timer);
	}, [value, animate, numericValue]);

	return (
		<div className={`stat-card ${variant}`}>
			<div className="stat-header">
				<div className="stat-icon">{icon}</div>
				{trend && (
					<div className={`stat-trend ${trend.direction}`}>
						{trend.direction === "up" ? "↑" : "↓"} {Math.abs(trend.value)}%
					</div>
				)}
			</div>
			<div className="stat-value">
				{prefix}
				{typeof displayValue === "number"
					? displayValue.toLocaleString()
					: displayValue}
				{suffix}
			</div>
			<div className="stat-label">{label}</div>
		</div>
	);
}

interface DataTableProps<T> {
	data: T[];
	columns: {
		key: keyof T | string;
		label: string;
		sortable?: boolean;
		render?: (item: T) => ReactNode;
	}[];
	searchPlaceholder?: string;
	filterOptions?: {
		label: string;
		value: string;
	}[];
	onSearch?: (query: string) => void;
	onFilter?: (value: string) => void;
	filterFn?: (item: T, filterValue: string) => boolean;
	emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
	data,
	columns,
	searchPlaceholder = "Buscar...",
	filterOptions,
	onSearch,
	onFilter,
	filterFn,
	emptyMessage = "No hay datos disponibles",
}: DataTableProps<T>) {
	const [search, setSearch] = useState("");
	const [debouncedSearch, setDebouncedSearch] = useState("");
	const [filter, setFilter] = useState("");
	const [sortKey, setSortKey] = useState<string | null>(null);
	const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(search);
			onSearch?.(search);
		}, 3000);
		return () => clearTimeout(timer);
	}, [search, onSearch]);

	const handleSearch = (value: string) => {
		setSearch(value);
	};

	const handleFilter = (value: string) => {
		setFilter(value);
		onFilter?.(value);
	};

	const handleSort = (key: string) => {
		if (sortKey === key) {
			setSortDir(sortDir === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortDir("asc");
		}
	};

	const filteredData = data.filter((item) => {
		const matchesSearch =
			debouncedSearch === "" ||
			Object.values(item as Record<string, unknown>).some((val) =>
				String(val).toLowerCase().includes(debouncedSearch.toLowerCase()),
			);
			
		let matchesFilter = true;
		if (filter !== "") {
			if (filterFn) {
				matchesFilter = filterFn(item, filter);
			} else {
				matchesFilter = Object.values(item as Record<string, unknown>).some(
					(val) => {
						if (Array.isArray(val)) {
							return val.some((v) => String(v) === filter);
						}
						return String(val) === filter;
					}
				);
			}
		}

		return matchesSearch && matchesFilter;
	});

	const sortedData = sortKey
		? [...filteredData].sort((a, b) => {
				const aVal = (a as Record<string, unknown>)[sortKey];
				const bVal = (b as Record<string, unknown>)[sortKey];
				const comparison = String(aVal).localeCompare(String(bVal));
				return sortDir === "asc" ? comparison : -comparison;
			})
		: filteredData;

	return (
		<div className="card">
			{(onSearch || filterOptions) && (
				<div className="card-header">
					<div className="table-filters">
						{filterOptions && (
							<select
								className="filter-select"
								value={filter}
								onChange={(e) => handleFilter(e.target.value)}
							>
								<option value="">Todos</option>
								{filterOptions.map((opt) => (
									<option key={opt.value} value={opt.value}>
										{opt.label}
									</option>
								))}
							</select>
						)}
					</div>
					{onSearch && (
						<div className="table-search">
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								aria-hidden="true"
							>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
							</svg>
							<input
								type="text"
								placeholder={searchPlaceholder}
								value={search}
								onChange={(e) => handleSearch(e.target.value)}
							/>
						</div>
					)}
				</div>
			)}
			<div style={{ overflowX: "auto" }}>
				<table className="data-table">
					<thead>
						<tr>
							{columns.map((col) => (
								<th
									key={String(col.key)}
									className={sortKey === String(col.key) ? "sorted" : ""}
									onClick={() => col.sortable && handleSort(String(col.key))}
								>
									{col.label}
									{col.sortable && (
										<span className="sort-icon">
											{sortKey === String(col.key)
												? sortDir === "asc"
													? " ↑"
													: " ↓"
												: " ↕"}
										</span>
									)}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.length === 0 ? (
							<tr>
								<td colSpan={columns.length}>
									<div className="empty-state">
										<svg
											width="48"
											height="48"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											aria-hidden="true"
										>
											<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
											<path d="M14 2v6h6" />
											<path d="M12 18v-6" />
											<path d="M9 15h6" />
										</svg>
										<h4>Sin datos</h4>
										<p>{emptyMessage}</p>
									</div>
								</td>
							</tr>
						) : (
							sortedData.map((item) => (
								<tr key={item.id}>
									{columns.map((col) => (
										<td key={String(col.key)}>
											{col.render
												? col.render(item)
												: String(
														(item as Record<string, unknown>)[
															String(col.key)
														] ?? "",
													)}
										</td>
									))}
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}
