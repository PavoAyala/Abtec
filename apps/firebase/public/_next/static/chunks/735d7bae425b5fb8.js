(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	26396,
	(e) => {
		var t = e.i(11173),
			a = e.i(75307),
			s = e.i(24182),
			i = e.i(25629),
			r = e.i(43513);
		const d = {
				[r.TicketStatus.Open]: "badge-yellow",
				[r.TicketStatus.InProgress]: "badge-blue",
				[r.TicketStatus.Resolved]: "badge-green",
				[r.TicketStatus.Closed]: "badge-gray",
			},
			l = {
				[r.TicketPriority.Low]: "badge-gray",
				[r.TicketPriority.Medium]: "badge-yellow",
				[r.TicketPriority.High]: "badge-red",
				[r.TicketPriority.Critical]: "badge-red",
			};
		function c() {
			const { data: e } = (0, a.default)(i.SWRKeys.tickets, i.fetcher.tickets, {
					revalidateOnFocus: !1,
					revalidateOnReconnect: !1,
					dedupingInterval: 6e4,
				}),
				r = [
					{ key: "title", label: "Título", sortable: !0 },
					{
						key: "status",
						label: "Estado",
						render: (e) =>
							(0, t.jsx)("span", {
								className: `badge ${d[e.status] || "badge-gray"}`,
								children: e.status,
							}),
					},
					{
						key: "priority",
						label: "Prioridad",
						render: (e) =>
							(0, t.jsx)("span", {
								className: `badge ${l[e.priority] || "badge-gray"}`,
								children: e.priority,
							}),
					},
					{ key: "category", label: "Categoría", sortable: !0 },
				];
			return (0, t.jsxs)("div", {
				className: "page-container",
				children: [
					(0, t.jsxs)("div", {
						className: "page-header",
						children: [
							(0, t.jsxs)("div", {
								className: "page-header-content",
								children: [
									(0, t.jsx)("h2", { children: "Tickets de Soporte" }),
									(0, t.jsx)("p", { children: "Sistema de soporte postventa" }),
								],
							}),
							(0, t.jsx)("div", {
								className: "page-actions",
								children: (0, t.jsxs)("button", {
									type: "button",
									className: "btn btn-primary",
									children: [
										(0, t.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"aria-hidden": "true",
											children: (0, t.jsx)("path", { d: "M12 5v14M5 12h14" }),
										}),
										"Nuevo Ticket",
									],
								}),
							}),
						],
					}),
					(0, t.jsx)(s.DataTable, {
						data: e || [],
						columns: r,
						searchPlaceholder: "Buscar tickets...",
						emptyMessage: "No hay tickets. El sistema está tranquilo.",
					}),
				],
			});
		}
		e.s(["default", () => c]);
	},
]);
