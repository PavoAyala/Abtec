(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	53354,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "default", { enumerable: !0, get: () => s });
		const o = e.r(11173),
			n = e.r(98273),
			l = {
				fontFamily:
					'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
				height: "100vh",
				textAlign: "center",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			},
			i = {
				fontSize: "14px",
				fontWeight: 400,
				lineHeight: "28px",
				margin: "0 8px",
			},
			s = ({ error: e }) => {
				const t = e?.digest;
				return (0, o.jsxs)("html", {
					id: "__next_error__",
					children: [
						(0, o.jsx)("head", {}),
						(0, o.jsxs)("body", {
							children: [
								(0, o.jsx)(n.HandleISRError, { error: e }),
								(0, o.jsx)("div", {
									style: l,
									children: (0, o.jsxs)("div", {
										children: [
											(0, o.jsxs)("h2", {
												style: i,
												children: [
													"Application error: a ",
													t ? "server" : "client",
													"-side exception has occurred while loading ",
													window.location.hostname,
													" (see the",
													" ",
													t ? "server logs" : "browser console",
													" for more information).",
												],
											}),
											t
												? (0, o.jsx)("p", {
														style: i,
														children: `Digest: ${t}`,
													})
												: null,
										],
									}),
								}),
							],
						}),
					],
				});
			};
		("function" == typeof r.default ||
			("object" == typeof r.default && null !== r.default)) &&
			void 0 === r.default.__esModule &&
			(Object.defineProperty(r.default, "__esModule", { value: !0 }),
			Object.assign(r.default, r),
			(t.exports = r.default));
	},
	80246,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "HeadManagerContext", {
				enumerable: !0,
				get: () => o,
			});
		const o = e.r(81258)._(e.r(41787)).default.createContext({});
	},
]);
