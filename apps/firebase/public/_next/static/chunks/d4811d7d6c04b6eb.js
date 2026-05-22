(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	57133,
	(e) => {
		var a = e.i(11173),
			n = e.i(41787);
		function t() {
			const [e, t] = (0, n.useState)({
				companyName: "Abtec",
				email: "contacto@abtec.com",
				timezone: "America/Mexico_City",
			});
			return (0, a.jsxs)("div", {
				className: "container",
				children: [
					(0, a.jsx)("div", {
						className: "page-header",
						children: (0, a.jsx)("h2", { children: "Configuración" }),
					}),
					(0, a.jsx)("div", {
						className: "card",
						children: (0, a.jsxs)("form", {
							onSubmit: (e) => {
								e.preventDefault(), alert("Configuración guardada (demo)");
							},
							children: [
								(0, a.jsxs)("div", {
									className: "form-group",
									children: [
										(0, a.jsx)("label", {
											htmlFor: "company-name",
											children: "Nombre de la Empresa",
										}),
										(0, a.jsx)("input", {
											id: "company-name",
											type: "text",
											value: e.companyName,
											onChange: (a) => t({ ...e, companyName: a.target.value }),
										}),
									],
								}),
								(0, a.jsxs)("div", {
									className: "form-group",
									children: [
										(0, a.jsx)("label", {
											htmlFor: "contact-email",
											children: "Email de Contacto",
										}),
										(0, a.jsx)("input", {
											id: "contact-email",
											type: "email",
											value: e.email,
											onChange: (a) => t({ ...e, email: a.target.value }),
										}),
									],
								}),
								(0, a.jsxs)("div", {
									className: "form-group",
									children: [
										(0, a.jsx)("label", {
											htmlFor: "timezone-select",
											children: "Zona Horaria",
										}),
										(0, a.jsxs)("select", {
											id: "timezone-select",
											value: e.timezone,
											onChange: (a) => t({ ...e, timezone: a.target.value }),
											children: [
												(0, a.jsx)("option", {
													value: "America/Mexico_City",
													children: "Ciudad de México",
												}),
												(0, a.jsx)("option", {
													value: "America/Bogota",
													children: "Bogotá",
												}),
												(0, a.jsx)("option", {
													value: "America/Buenos_Aires",
													children: "Buenos Aires",
												}),
												(0, a.jsx)("option", {
													value: "America/New_York",
													children: "Nueva York",
												}),
											],
										}),
									],
								}),
								(0, a.jsx)("button", {
									type: "submit",
									className: "btn btn-primary",
									children: "Guardar",
								}),
							],
						}),
					}),
					(0, a.jsxs)("div", {
						className: "card",
						style: { marginTop: "20px" },
						children: [
							(0, a.jsx)("h3", { children: "Integraciones" }),
							(0, a.jsx)("p", {
								style: { color: "#666", marginTop: "10px" },
								children: "Conecta tu CRM con otras herramientas:",
							}),
							(0, a.jsxs)("div", {
								style: { marginTop: "15px" },
								children: [
									(0, a.jsx)("button", {
										type: "button",
										className: "btn btn-secondary",
										style: { marginRight: "10px" },
										children: "Firebase",
									}),
									(0, a.jsx)("button", {
										type: "button",
										className: "btn btn-secondary",
										style: { marginRight: "10px" },
										children: "Slack",
									}),
									(0, a.jsx)("button", {
										type: "button",
										className: "btn btn-secondary",
										children: "WhatsApp",
									}),
								],
							}),
						],
					}),
					(0, a.jsxs)("div", {
						className: "card",
						style: { marginTop: "20px" },
						children: [
							(0, a.jsx)("h3", { children: "Información del Sistema" }),
							(0, a.jsxs)("p", {
								style: { marginTop: "10px" },
								children: [
									(0, a.jsx)("strong", { children: "Versión:" }),
									" 1.0.0",
									(0, a.jsx)("br", {}),
									(0, a.jsx)("strong", { children: "Firebase Project:" }),
									" abtec-8f31e",
									(0, a.jsx)("br", {}),
									(0, a.jsx)("strong", { children: "Entorno:" }),
									" Desarrollo",
								],
							}),
						],
					}),
				],
			});
		}
		e.s(["default", () => t]);
	},
]);
