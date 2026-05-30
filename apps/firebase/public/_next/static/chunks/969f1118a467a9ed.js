(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	62693,
	(e) => {
		var a = e.i(11173),
			s = e.i(75307),
			r = e.i(24182),
			t = e.i(25629);
		function n() {
			const { data: e } = (0, s.default)(
					t.SWRKeys.companies,
					t.fetcher.companies,
					{
						revalidateOnFocus: !1,
						revalidateOnReconnect: !1,
						dedupingInterval: 6e4,
					},
				),
				n = [
					{ key: "name", label: "Nombre", sortable: !0 },
					{ key: "industry", label: "Industria", sortable: !0 },
					{ key: "size", label: "Tamaño", sortable: !0 },
					{
						key: "website",
						label: "Website",
						render: (e) =>
							e.website
								? (0, a.jsx)("a", {
										href: e.website,
										target: "_blank",
										rel: "noopener noreferrer",
										style: { color: "var(--accent)", textDecoration: "none" },
										children: e.website,
									})
								: "-",
					},
				];
			return (0, a.jsxs)("div", {
				className: "page-container",
				children: [
					(0, a.jsxs)("div", {
						className: "page-header",
						children: [
							(0, a.jsxs)("div", {
								className: "page-header-content",
								children: [
									(0, a.jsx)("h2", { children: "Empresas" }),
									(0, a.jsx)("p", {
										children: "Administra empresas y cuentas",
									}),
								],
							}),
							(0, a.jsx)("div", {
								className: "page-actions",
								children: (0, a.jsxs)("button", {
									type: "button",
									className: "btn btn-primary",
									children: [
										(0, a.jsx)("svg", {
											width: "16",
											height: "16",
											viewBox: "0 0 24 24",
											fill: "none",
											stroke: "currentColor",
											strokeWidth: "2",
											"aria-hidden": "true",
											children: (0, a.jsx)("path", { d: "M12 5v14M5 12h14" }),
										}),
										"Nueva Empresa",
									],
								}),
							}),
						],
					}),
					(0, a.jsx)(r.DataTable, {
						data: e || [],
						columns: n,
						searchPlaceholder: "Buscar empresas...",
						emptyMessage: "No hay empresas. Añade una nueva para comenzar.",
					}),
				],
			});
		}
		e.s(["default", () => n]);
	},
]);
