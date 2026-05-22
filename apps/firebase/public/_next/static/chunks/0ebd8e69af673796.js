(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	16116,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "warnOnce", { enumerable: !0, get: () => n });
		const n = (e) => {};
	},
	37133,
	(e, t, r) => {
		t.exports = e.r(40182);
	},
	52624,
	(e) => {
		var t = e.i(11173),
			r = e.i(51099),
			n = e.i(37133),
			i = e.i(41787),
			a = e.i(65237);
		const s = ["admin", "manager", "sales", "support"],
			o = (0, i.createContext)({
				user: null,
				loading: !0,
				isStaff: !1,
				staffRole: null,
				signOut: async () => {},
			});
		async function l(e) {
			const { claims: t } = await e.getIdTokenResult(!0),
				r = t.staff;
			return s.includes(r) ? r : null;
		}
		function u({ children: e }) {
			const [s, u] = (0, i.useState)(null),
				[c, d] = (0, i.useState)(!0),
				[h, f] = (0, i.useState)(!1),
				[p, m] = (0, i.useState)(null),
				g = (0, n.useRouter)(),
				x = (0, n.usePathname)(),
				v = (0, i.useCallback)(async (e = !1) => {
					e && (await (0, r.signOut)(a.auth)), u(null), f(!1), m(null);
				}, []);
			(0, i.useEffect)(() => {
				const e = (0, r.onAuthStateChanged)(a.auth, async (e) => {
					if (!e) {
						await v(), "/login" !== x && g.push("/login"), d(!1);
						return;
					}
					try {
						const t = await l(e);
						t
							? (u(e), f(!0), m(t), "/login" === x && g.push("/"))
							: (await v(!0),
								"/login" !== x && g.push("/login?error=not_staff"));
					} catch (e) {
						console.error("Error verifying staff claim:", e), await v(!0);
					}
					d(!1);
				});
				return () => e();
			}, [x, g, v]);
			const j = (0, i.useCallback)(async () => {
					await (0, r.signOut)(a.auth), g.push("/login");
				}, [g]),
				y = (0, i.useMemo)(
					() => ({ user: s, loading: c, isStaff: h, staffRole: p, signOut: j }),
					[s, c, h, p, j],
				);
			return c
				? (0, t.jsx)("div", {
						className:
							"min-h-screen flex items-center justify-center bg-gray-50",
						children: (0, t.jsx)("div", {
							className:
								"w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin",
						}),
					})
				: (!h && "/login" !== x) || (h && "/login" === x)
					? null
					: (0, t.jsx)(o.Provider, { value: y, children: e });
		}
		e.s(["AuthProvider", () => u, "useAuth", 0, () => (0, i.useContext)(o)]);
	},
	8128,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "useMergedRef", {
				enumerable: !0,
				get: () => i,
			});
		const n = e.r(41787);
		function i(e, t) {
			const r = (0, n.useRef)(null),
				i = (0, n.useRef)(null);
			return (0, n.useCallback)(
				(n) => {
					if (null === n) {
						const e = r.current;
						e && ((r.current = null), e());
						const t = i.current;
						t && ((i.current = null), t());
					} else e && (r.current = a(e, n)), t && (i.current = a(t, n));
				},
				[e, t],
			);
		}
		function a(e, t) {
			if ("function" != typeof e)
				return (
					(e.current = t),
					() => {
						e.current = null;
					}
				);
			{
				const r = e(t);
				return "function" == typeof r ? r : () => e(null);
			}
		}
		("function" == typeof r.default ||
			("object" == typeof r.default && null !== r.default)) &&
			void 0 === r.default.__esModule &&
			(Object.defineProperty(r.default, "__esModule", { value: !0 }),
			Object.assign(r.default, r),
			(t.exports = r.default));
	},
	13622,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = {
			assign: () => l,
			searchParamsToUrlQuery: () => a,
			urlQueryToSearchParams: () => o,
		};
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		function a(e) {
			const t = {};
			for (const [r, n] of e.entries()) {
				const e = t[r];
				void 0 === e
					? (t[r] = n)
					: Array.isArray(e)
						? e.push(n)
						: (t[r] = [e, n]);
			}
			return t;
		}
		function s(e) {
			return "string" == typeof e
				? e
				: ("number" != typeof e || isNaN(e)) && "boolean" != typeof e
					? ""
					: String(e);
		}
		function o(e) {
			const t = new URLSearchParams();
			for (const [r, n] of Object.entries(e))
				if (Array.isArray(n)) for (const e of n) t.append(r, s(e));
				else t.set(r, s(n));
			return t;
		}
		function l(e, ...t) {
			for (const r of t) {
				for (const t of r.keys()) e.delete(t);
				for (const [t, n] of r.entries()) e.append(t, n);
			}
			return e;
		}
	},
	81651,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = {
			formatUrl: () => o,
			formatWithValidation: () => u,
			urlObjectKeys: () => l,
		};
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = e.r(44066)._(e.r(13622)),
			s = /https?|ftp|gopher|file/;
		function o(e) {
			let { auth: t, hostname: r } = e,
				n = e.protocol || "",
				i = e.pathname || "",
				o = e.hash || "",
				l = e.query || "",
				u = !1;
			(t = t ? encodeURIComponent(t).replace(/%3A/i, ":") + "@" : ""),
				e.host
					? (u = t + e.host)
					: r &&
						((u = t + (~r.indexOf(":") ? `[${r}]` : r)),
						e.port && (u += ":" + e.port)),
				l && "object" == typeof l && (l = String(a.urlQueryToSearchParams(l)));
			let c = e.search || (l && `?${l}`) || "";
			return (
				n && !n.endsWith(":") && (n += ":"),
				e.slashes || ((!n || s.test(n)) && !1 !== u)
					? ((u = "//" + (u || "")), i && "/" !== i[0] && (i = "/" + i))
					: u || (u = ""),
				o && "#" !== o[0] && (o = "#" + o),
				c && "?" !== c[0] && (c = "?" + c),
				(i = i.replace(/[?#]/g, encodeURIComponent)),
				(c = c.replace("#", "%23")),
				`${n}${u}${i}${c}${o}`
			);
		}
		const l = [
			"auth",
			"hash",
			"host",
			"hostname",
			"href",
			"path",
			"pathname",
			"port",
			"protocol",
			"query",
			"search",
			"slashes",
		];
		function u(e) {
			return o(e);
		}
	},
	30593,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = {
			DecodeError: () => x,
			MiddlewareNotFoundError: () => b,
			MissingStaticPage: () => y,
			NormalizeError: () => v,
			PageNotFoundError: () => j,
			SP: () => m,
			ST: () => g,
			WEB_VITALS: () => a,
			execOnce: () => s,
			getDisplayName: () => d,
			getLocationOrigin: () => u,
			getURL: () => c,
			isAbsoluteUrl: () => l,
			isResSent: () => h,
			loadGetInitialProps: () => p,
			normalizeRepeatedSlashes: () => f,
			stringifyError: () => w,
		};
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = ["CLS", "FCP", "FID", "INP", "LCP", "TTFB"];
		function s(e) {
			let t,
				r = !1;
			return (...n) => (r || ((r = !0), (t = e(...n))), t);
		}
		const o = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
			l = (e) => o.test(e);
		function u() {
			const { protocol: e, hostname: t, port: r } = window.location;
			return `${e}//${t}${r ? ":" + r : ""}`;
		}
		function c() {
			const { href: e } = window.location,
				t = u();
			return e.substring(t.length);
		}
		function d(e) {
			return "string" == typeof e ? e : e.displayName || e.name || "Unknown";
		}
		function h(e) {
			return e.finished || e.headersSent;
		}
		function f(e) {
			const t = e.split("?");
			return (
				t[0].replace(/\\/g, "/").replace(/\/\/+/g, "/") +
				(t[1] ? `?${t.slice(1).join("?")}` : "")
			);
		}
		async function p(e, t) {
			const r = t.res || (t.ctx && t.ctx.res);
			if (!e.getInitialProps)
				return t.ctx && t.Component
					? { pageProps: await p(t.Component, t.ctx) }
					: {};
			const n = await e.getInitialProps(t);
			if (r && h(r)) return n;
			if (!n)
				throw Object.defineProperty(
					Error(
						`"${d(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`,
					),
					"__NEXT_ERROR_CODE",
					{ value: "E394", enumerable: !1, configurable: !0 },
				);
			return n;
		}
		const m = "u" > typeof performance,
			g =
				m &&
				["mark", "measure", "getEntriesByName"].every(
					(e) => "function" == typeof performance[e],
				);
		class x extends Error {}
		class v extends Error {}
		class j extends Error {
			constructor(e) {
				super(),
					(this.code = "ENOENT"),
					(this.name = "PageNotFoundError"),
					(this.message = `Cannot find module for page: ${e}`);
			}
		}
		class y extends Error {
			constructor(e, t) {
				super(),
					(this.message = `Failed to load static file for page: ${e} ${t}`);
			}
		}
		class b extends Error {
			constructor() {
				super(),
					(this.code = "ENOENT"),
					(this.message = "Cannot find the middleware module");
			}
		}
		function w(e) {
			return JSON.stringify({ message: e.message, stack: e.stack });
		}
	},
	89600,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "isLocalURL", { enumerable: !0, get: () => a });
		const n = e.r(30593),
			i = e.r(2946);
		function a(e) {
			if (!(0, n.isAbsoluteUrl)(e)) return !0;
			try {
				const t = (0, n.getLocationOrigin)(),
					r = new URL(e, t);
				return r.origin === t && (0, i.hasBasePath)(r.pathname);
			} catch (e) {
				return !1;
			}
		}
	},
	44356,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "errorOnce", { enumerable: !0, get: () => n });
		const n = (e) => {};
	},
	54679,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = { default: () => x, useLinkStatus: () => j };
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = e.r(44066),
			s = e.r(11173),
			o = a._(e.r(41787)),
			l = e.r(81651),
			u = e.r(24303),
			c = e.r(8128),
			d = e.r(30593),
			h = e.r(39938);
		e.r(16116);
		const f = e.r(76716),
			p = e.r(89600),
			m = e.r(22486);
		function g(e) {
			return "string" == typeof e ? e : (0, l.formatUrl)(e);
		}
		function x(t) {
			var r;
			let n,
				i,
				a,
				[l, x] = (0, o.useOptimistic)(f.IDLE_LINK_STATUS),
				j = (0, o.useRef)(null),
				{
					href: y,
					as: b,
					children: w,
					prefetch: _ = null,
					passHref: k,
					replace: C,
					shallow: P,
					scroll: E,
					onClick: O,
					onMouseEnter: S,
					onTouchStart: M,
					legacyBehavior: N = !1,
					onNavigate: R,
					ref: L,
					unstable_dynamicOnHover: A,
					...I
				} = t;
			(n = w),
				N &&
					("string" == typeof n || "number" == typeof n) &&
					(n = (0, s.jsx)("a", { children: n }));
			const T = o.default.useContext(u.AppRouterContext),
				$ = !1 !== _,
				z =
					!1 !== _
						? null === (r = _) || "auto" === r
							? m.FetchStrategy.PPR
							: m.FetchStrategy.Full
						: m.FetchStrategy.PPR,
				{ href: B, as: D } = o.default.useMemo(() => {
					const e = g(y);
					return { href: e, as: b ? g(b) : e };
				}, [y, b]);
			if (N) {
				if (n?.$$typeof === Symbol.for("react.lazy"))
					throw Object.defineProperty(
						Error(
							"`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag.",
						),
						"__NEXT_ERROR_CODE",
						{ value: "E863", enumerable: !1, configurable: !0 },
					);
				i = o.default.Children.only(n);
			}
			const U = N ? i && "object" == typeof i && i.ref : L,
				W = o.default.useCallback(
					(e) => (
						null !== T &&
							(j.current = (0, f.mountLinkInstance)(e, B, T, z, $, x)),
						() => {
							j.current &&
								((0, f.unmountLinkForCurrentNavigation)(j.current),
								(j.current = null)),
								(0, f.unmountPrefetchableInstance)(e);
						}
					),
					[$, B, T, z, x],
				),
				F = {
					ref: (0, c.useMergedRef)(W, U),
					onClick(t) {
						N || "function" != typeof O || O(t),
							N &&
								i.props &&
								"function" == typeof i.props.onClick &&
								i.props.onClick(t),
							!T ||
								t.defaultPrevented ||
								((t, r, n, i, a, s, l) => {
									if ("u" > typeof window) {
										let u,
											{ nodeName: c } = t.currentTarget;
										if (
											("A" === c.toUpperCase() &&
												(((u = t.currentTarget.getAttribute("target")) &&
													"_self" !== u) ||
													t.metaKey ||
													t.ctrlKey ||
													t.shiftKey ||
													t.altKey ||
													(t.nativeEvent && 2 === t.nativeEvent.which))) ||
											t.currentTarget.hasAttribute("download")
										)
											return;
										if (!(0, p.isLocalURL)(r)) {
											a && (t.preventDefault(), location.replace(r));
											return;
										}
										if ((t.preventDefault(), l)) {
											let e = !1;
											if (
												(l({
													preventDefault: () => {
														e = !0;
													},
												}),
												e)
											)
												return;
										}
										const { dispatchNavigateAction: d } = e.r(78659);
										o.default.startTransition(() => {
											d(n || r, a ? "replace" : "push", s ?? !0, i.current);
										});
									}
								})(t, B, D, j, C, E, R);
					},
					onMouseEnter(e) {
						N || "function" != typeof S || S(e),
							N &&
								i.props &&
								"function" == typeof i.props.onMouseEnter &&
								i.props.onMouseEnter(e),
							T && $ && (0, f.onNavigationIntent)(e.currentTarget, !0 === A);
					},
					onTouchStart: (e) => {
						N || "function" != typeof M || M(e),
							N &&
								i.props &&
								"function" == typeof i.props.onTouchStart &&
								i.props.onTouchStart(e),
							T && $ && (0, f.onNavigationIntent)(e.currentTarget, !0 === A);
					},
				};
			return (
				(0, d.isAbsoluteUrl)(D)
					? (F.href = D)
					: (N && !k && ("a" !== i.type || "href" in i.props)) ||
						(F.href = (0, h.addBasePath)(D)),
				(a = N
					? o.default.cloneElement(i, F)
					: (0, s.jsx)("a", { ...I, ...F, children: n })),
				(0, s.jsx)(v.Provider, { value: l, children: a })
			);
		}
		e.r(44356);
		const v = (0, o.createContext)(f.IDLE_LINK_STATUS),
			j = () => (0, o.useContext)(v);
		("function" == typeof r.default ||
			("object" == typeof r.default && null !== r.default)) &&
			void 0 === r.default.__esModule &&
			(Object.defineProperty(r.default, "__esModule", { value: !0 }),
			Object.assign(r.default, r),
			(t.exports = r.default));
	},
	62222,
	(e, t, r) => {
		function n({
			widthInt: e,
			heightInt: t,
			blurWidth: r,
			blurHeight: n,
			blurDataURL: i,
			objectFit: a,
		}) {
			const s = r ? 40 * r : e,
				o = n ? 40 * n : t,
				l = s && o ? `viewBox='0 0 ${s} ${o}'` : "";
			return `%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l ? "none" : "contain" === a ? "xMidYMid" : "cover" === a ? "xMidYMid slice" : "none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`;
		}
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "getImageBlurSvg", {
				enumerable: !0,
				get: () => n,
			});
	},
	79010,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = { VALID_LOADERS: () => a, imageConfigDefault: () => s };
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = ["default", "imgix", "cloudinary", "akamai", "custom"],
			s = {
				deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
				imageSizes: [32, 48, 64, 96, 128, 256, 384],
				path: "/_next/image",
				loader: "default",
				loaderFile: "",
				domains: [],
				disableStaticImages: !1,
				minimumCacheTTL: 14400,
				formats: ["image/webp"],
				maximumRedirects: 3,
				maximumResponseBody: 5e7,
				dangerouslyAllowLocalIP: !1,
				dangerouslyAllowSVG: !1,
				contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;",
				contentDispositionType: "attachment",
				localPatterns: void 0,
				remotePatterns: [],
				qualities: [75],
				unoptimized: !1,
			};
	},
	15670,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "getImgProps", { enumerable: !0, get: () => u }),
			e.r(16116);
		const n = e.r(44995),
			i = e.r(62222),
			a = e.r(79010),
			s = ["-moz-initial", "fill", "none", "scale-down", void 0];
		function o(e) {
			return void 0 !== e.default;
		}
		function l(e) {
			return void 0 === e
				? e
				: "number" == typeof e
					? Number.isFinite(e)
						? e
						: NaN
					: "string" == typeof e && /^[0-9]+$/.test(e)
						? parseInt(e, 10)
						: NaN;
		}
		function u(
			{
				src: e,
				sizes: t,
				unoptimized: r = !1,
				priority: u = !1,
				preload: c = !1,
				loading: d,
				className: h,
				quality: f,
				width: p,
				height: m,
				fill: g = !1,
				style: x,
				overrideSrc: v,
				onLoad: j,
				onLoadingComplete: y,
				placeholder: b = "empty",
				blurDataURL: w,
				fetchPriority: _,
				decoding: k = "async",
				layout: C,
				objectFit: P,
				objectPosition: E,
				lazyBoundary: O,
				lazyRoot: S,
				...M
			},
			N,
		) {
			var R;
			let L,
				A,
				I,
				{ imgConf: T, showAltText: $, blurComplete: z, defaultLoader: B } = N,
				D = T || a.imageConfigDefault;
			if ("allSizes" in D) L = D;
			else {
				const e = [...D.deviceSizes, ...D.imageSizes].sort((e, t) => e - t),
					t = D.deviceSizes.sort((e, t) => e - t),
					r = D.qualities?.sort((e, t) => e - t);
				L = { ...D, allSizes: e, deviceSizes: t, qualities: r };
			}
			if (void 0 === B)
				throw Object.defineProperty(
					Error(
						"images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config",
					),
					"__NEXT_ERROR_CODE",
					{ value: "E163", enumerable: !1, configurable: !0 },
				);
			let U = M.loader || B;
			delete M.loader, delete M.srcSet;
			const W = "__next_img_default" in U;
			if (W) {
				if ("custom" === L.loader)
					throw Object.defineProperty(
						Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),
						"__NEXT_ERROR_CODE",
						{ value: "E252", enumerable: !1, configurable: !0 },
					);
			} else {
				const e = U;
				U = (t) => {
					const { config: r, ...n } = t;
					return e(n);
				};
			}
			if (C) {
				"fill" === C && (g = !0);
				const e = {
					intrinsic: { maxWidth: "100%", height: "auto" },
					responsive: { width: "100%", height: "auto" },
				}[C];
				e && (x = { ...x, ...e });
				const r = { responsive: "100vw", fill: "100vw" }[C];
				r && !t && (t = r);
			}
			let F = "",
				V = l(p),
				q = l(m);
			if ((R = e) && "object" == typeof R && (o(R) || void 0 !== R.src)) {
				const t = o(e) ? e.default : e;
				if (!t.src)
					throw Object.defineProperty(
						Error(
							`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`,
						),
						"__NEXT_ERROR_CODE",
						{ value: "E460", enumerable: !1, configurable: !0 },
					);
				if (!t.height || !t.width)
					throw Object.defineProperty(
						Error(
							`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`,
						),
						"__NEXT_ERROR_CODE",
						{ value: "E48", enumerable: !1, configurable: !0 },
					);
				if (
					((A = t.blurWidth),
					(I = t.blurHeight),
					(w = w || t.blurDataURL),
					(F = t.src),
					!g)
				)
					if (V || q) {
						if (V && !q) {
							const e = V / t.width;
							q = Math.round(t.height * e);
						} else if (!V && q) {
							const e = q / t.height;
							V = Math.round(t.width * e);
						}
					} else (V = t.width), (q = t.height);
			}
			let G = !u && !c && ("lazy" === d || void 0 === d);
			(!(e = "string" == typeof e ? e : F) ||
				e.startsWith("data:") ||
				e.startsWith("blob:")) &&
				((r = !0), (G = !1)),
				L.unoptimized && (r = !0),
				W &&
					!L.dangerouslyAllowSVG &&
					e.split("?", 1)[0].endsWith(".svg") &&
					(r = !0);
			const K = l(f),
				H = Object.assign(
					g
						? {
								position: "absolute",
								height: "100%",
								width: "100%",
								left: 0,
								top: 0,
								right: 0,
								bottom: 0,
								objectFit: P,
								objectPosition: E,
							}
						: {},
					$ ? {} : { color: "transparent" },
					x,
				),
				X =
					z || "empty" === b
						? null
						: "blur" === b
							? `url("data:image/svg+xml;charset=utf-8,${(0, i.getImageBlurSvg)({ widthInt: V, heightInt: q, blurWidth: A, blurHeight: I, blurDataURL: w || "", objectFit: H.objectFit })}")`
							: `url("${b}")`,
				Q = s.includes(H.objectFit)
					? "fill" === H.objectFit
						? "100% 100%"
						: "cover"
					: H.objectFit,
				J = X
					? {
							backgroundSize: Q,
							backgroundPosition: H.objectPosition || "50% 50%",
							backgroundRepeat: "no-repeat",
							backgroundImage: X,
						}
					: {},
				Y = (({
					config: e,
					src: t,
					unoptimized: r,
					width: i,
					quality: a,
					sizes: s,
					loader: o,
				}) => {
					if (r) {
						const e = (0, n.getDeploymentId)();
						if (t.startsWith("/") && !t.startsWith("//") && e) {
							const r = t.includes("?") ? "&" : "?";
							t = `${t}${r}dpl=${e}`;
						}
						return { src: t, srcSet: void 0, sizes: void 0 };
					}
					const { widths: l, kind: u } = ((
							{ deviceSizes: e, allSizes: t },
							r,
							n,
						) => {
							if (n) {
								const r = /(^|\s)(1?\d?\d)vw/g,
									i = [];
								for (let e; (e = r.exec(n)); ) i.push(parseInt(e[2]));
								if (i.length) {
									const r = 0.01 * Math.min(...i);
									return { widths: t.filter((t) => t >= e[0] * r), kind: "w" };
								}
								return { widths: t, kind: "w" };
							}
							return "number" != typeof r
								? { widths: e, kind: "w" }
								: {
										widths: [
											...new Set(
												[r, 2 * r].map(
													(e) => t.find((t) => t >= e) || t[t.length - 1],
												),
											),
										],
										kind: "x",
									};
						})(e, i, s),
						c = l.length - 1;
					return {
						sizes: s || "w" !== u ? s : "100vw",
						srcSet: l
							.map(
								(r, n) =>
									`${o({ config: e, src: t, quality: a, width: r })} ${"w" === u ? r : n + 1}${u}`,
							)
							.join(", "),
						src: o({ config: e, src: t, quality: a, width: l[c] }),
					};
				})({
					config: L,
					src: e,
					unoptimized: r,
					width: V,
					quality: K,
					sizes: t,
					loader: U,
				}),
				Z = G ? "lazy" : d;
			return {
				props: {
					...M,
					loading: Z,
					fetchPriority: _,
					width: V,
					height: q,
					decoding: k,
					className: h,
					style: { ...H, ...J },
					sizes: Y.sizes,
					srcSet: Y.srcSet,
					src: v || Y.src,
				},
				meta: { unoptimized: r, preload: c || u, placeholder: b, fill: g },
			};
		}
	},
	53206,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "default", { enumerable: !0, get: () => o });
		const n = e.r(41787),
			i = "u" < typeof window,
			a = i ? () => {} : n.useLayoutEffect,
			s = i ? () => {} : n.useEffect;
		function o(e) {
			const { headManager: t, reduceComponentsToState: r } = e;
			function o() {
				if (t && t.mountedInstances) {
					const e = n.Children.toArray(
						Array.from(t.mountedInstances).filter(Boolean),
					);
					t.updateHead(r(e));
				}
			}
			return (
				i && (t?.mountedInstances?.add(e.children), o()),
				a(
					() => (
						t?.mountedInstances?.add(e.children),
						() => {
							t?.mountedInstances?.delete(e.children);
						}
					),
				),
				a(
					() => (
						t && (t._pendingUpdate = o),
						() => {
							t && (t._pendingUpdate = o);
						}
					),
				),
				s(
					() => (
						t &&
							t._pendingUpdate &&
							(t._pendingUpdate(), (t._pendingUpdate = null)),
						() => {
							t &&
								t._pendingUpdate &&
								(t._pendingUpdate(), (t._pendingUpdate = null));
						}
					),
				),
				null
			);
		}
	},
	52149,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = { default: () => m, defaultHead: () => d };
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = e.r(81258),
			s = e.r(44066),
			o = e.r(11173),
			l = s._(e.r(41787)),
			u = a._(e.r(53206)),
			c = e.r(80246);
		function d() {
			return [
				(0, o.jsx)("meta", { charSet: "utf-8" }, "charset"),
				(0, o.jsx)(
					"meta",
					{ name: "viewport", content: "width=device-width" },
					"viewport",
				),
			];
		}
		function h(e, t) {
			return "string" == typeof t || "number" == typeof t
				? e
				: t.type === l.default.Fragment
					? e.concat(
							l.default.Children.toArray(t.props.children).reduce(
								(e, t) =>
									"string" == typeof t || "number" == typeof t
										? e
										: e.concat(t),
								[],
							),
						)
					: e.concat(t);
		}
		e.r(16116);
		const f = ["name", "httpEquiv", "charSet", "itemProp"];
		function p(e) {
			let t, r, n, i;
			return e
				.reduce(h, [])
				.reverse()
				.concat(d().reverse())
				.filter(
					((t = new Set()),
					(r = new Set()),
					(n = new Set()),
					(i = {}),
					(e) => {
						let a = !0,
							s = !1;
						if (e.key && "number" != typeof e.key && e.key.indexOf("$") > 0) {
							s = !0;
							const r = e.key.slice(e.key.indexOf("$") + 1);
							t.has(r) ? (a = !1) : t.add(r);
						}
						switch (e.type) {
							case "title":
							case "base":
								r.has(e.type) ? (a = !1) : r.add(e.type);
								break;
							case "meta":
								for (let t = 0, r = f.length; t < r; t++) {
									const r = f[t];
									if (Object.hasOwn(e.props, r))
										if ("charSet" === r) n.has(r) ? (a = !1) : n.add(r);
										else {
											const t = e.props[r],
												n = i[r] || new Set();
											("name" !== r || !s) && n.has(t)
												? (a = !1)
												: (n.add(t), (i[r] = n));
										}
								}
						}
						return a;
					}),
				)
				.reverse()
				.map((e, t) => {
					const r = e.key || t;
					return l.default.cloneElement(e, { key: r });
				});
		}
		const m = ({ children: e }) => {
			const t = (0, l.useContext)(c.HeadManagerContext);
			return (0, o.jsx)(u.default, {
				reduceComponentsToState: p,
				headManager: t,
				children: e,
			});
		};
		("function" == typeof r.default ||
			("object" == typeof r.default && null !== r.default)) &&
			void 0 === r.default.__esModule &&
			(Object.defineProperty(r.default, "__esModule", { value: !0 }),
			Object.assign(r.default, r),
			(t.exports = r.default));
	},
	48176,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "ImageConfigContext", {
				enumerable: !0,
				get: () => a,
			});
		const n = e.r(81258)._(e.r(41787)),
			i = e.r(79010),
			a = n.default.createContext(i.imageConfigDefault);
	},
	88342,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "RouterContext", {
				enumerable: !0,
				get: () => n,
			});
		const n = e.r(81258)._(e.r(41787)).default.createContext(null);
	},
	4756,
	(e, t, r) => {
		function n(e, t) {
			const r = e || 75;
			return t?.qualities?.length
				? t.qualities.reduce(
						(e, t) => (Math.abs(t - r) < Math.abs(e - r) ? t : e),
						0,
					)
				: r;
		}
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "findClosestQuality", {
				enumerable: !0,
				get: () => n,
			});
	},
	62198,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "default", { enumerable: !0, get: () => s });
		const n = e.r(4756),
			i = e.r(44995);
		function a({ config: e, src: t, width: r, quality: a }) {
			if (
				t.startsWith("/") &&
				t.includes("?") &&
				e.localPatterns?.length === 1 &&
				"**" === e.localPatterns[0].pathname &&
				"" === e.localPatterns[0].search
			)
				throw Object.defineProperty(
					Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),
					"__NEXT_ERROR_CODE",
					{ value: "E871", enumerable: !1, configurable: !0 },
				);
			const s = (0, n.findClosestQuality)(a, e),
				o = (0, i.getDeploymentId)();
			return `${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${s}${t.startsWith("/") && o ? `&dpl=${o}` : ""}`;
		}
		a.__next_img_default = !0;
		const s = a;
	},
	40776,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 }),
			Object.defineProperty(r, "Image", { enumerable: !0, get: () => y });
		const n = e.r(81258),
			i = e.r(44066),
			a = e.r(11173),
			s = i._(e.r(41787)),
			o = n._(e.r(14732)),
			l = n._(e.r(52149)),
			u = e.r(15670),
			c = e.r(79010),
			d = e.r(48176);
		e.r(16116);
		const h = e.r(88342),
			f = n._(e.r(62198)),
			p = e.r(8128),
			m = {
				deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
				imageSizes: [32, 48, 64, 96, 128, 256, 384],
				qualities: [75],
				path: "/_next/image",
				loader: "default",
				dangerouslyAllowSVG: !1,
				unoptimized: !1,
			};
		function g(e, t, r, n, i, a, s) {
			const o = e?.src;
			e &&
				e["data-loaded-src"] !== o &&
				((e["data-loaded-src"] = o),
				("decode" in e ? e.decode() : Promise.resolve())
					.catch(() => {})
					.then(() => {
						if (e.parentElement && e.isConnected) {
							if (("empty" !== t && i(!0), r?.current)) {
								const t = new Event("load");
								Object.defineProperty(t, "target", { writable: !1, value: e });
								let n = !1,
									i = !1;
								r.current({
									...t,
									nativeEvent: t,
									currentTarget: e,
									target: e,
									isDefaultPrevented: () => n,
									isPropagationStopped: () => i,
									persist: () => {},
									preventDefault: () => {
										(n = !0), t.preventDefault();
									},
									stopPropagation: () => {
										(i = !0), t.stopPropagation();
									},
								});
							}
							n?.current && n.current(e);
						}
					}));
		}
		function x(e) {
			return s.use ? { fetchPriority: e } : { fetchpriority: e };
		}
		"u" < typeof window && (globalThis.__NEXT_IMAGE_IMPORTED = !0);
		const v = (0, s.forwardRef)(
			(
				{
					src: e,
					srcSet: t,
					sizes: r,
					height: n,
					width: i,
					decoding: o,
					className: l,
					style: u,
					fetchPriority: c,
					placeholder: d,
					loading: h,
					unoptimized: f,
					fill: m,
					onLoadRef: v,
					onLoadingCompleteRef: j,
					setBlurComplete: y,
					setShowAltText: b,
					sizesInput: w,
					onLoad: _,
					onError: k,
					...C
				},
				P,
			) => {
				const E = (0, s.useCallback)(
						(e) => {
							e && (k && (e.src = e.src), e.complete && g(e, d, v, j, y, f, w));
						},
						[e, d, v, j, y, k, f, w],
					),
					O = (0, p.useMergedRef)(P, E);
				return (0, a.jsx)("img", {
					...C,
					...x(c),
					loading: h,
					width: i,
					height: n,
					decoding: o,
					"data-nimg": m ? "fill" : "1",
					className: l,
					style: u,
					sizes: r,
					srcSet: t,
					src: e,
					ref: O,
					onLoad: (e) => {
						g(e.currentTarget, d, v, j, y, f, w);
					},
					onError: (e) => {
						b(!0), "empty" !== d && y(!0), k && k(e);
					},
				});
			},
		);
		function j({ isAppRouter: e, imgAttributes: t }) {
			const r = {
				as: "image",
				imageSrcSet: t.srcSet,
				imageSizes: t.sizes,
				crossOrigin: t.crossOrigin,
				referrerPolicy: t.referrerPolicy,
				...x(t.fetchPriority),
			};
			return e && o.default.preload
				? (o.default.preload(t.src, r), null)
				: (0, a.jsx)(l.default, {
						children: (0, a.jsx)(
							"link",
							{ rel: "preload", href: t.srcSet ? void 0 : t.src, ...r },
							"__nimg-" + t.src + t.srcSet + t.sizes,
						),
					});
		}
		const y = (0, s.forwardRef)((e, t) => {
			const r = (0, s.useContext)(h.RouterContext),
				n = (0, s.useContext)(d.ImageConfigContext),
				i = (0, s.useMemo)(() => {
					const e = m || n || c.imageConfigDefault,
						t = [...e.deviceSizes, ...e.imageSizes].sort((e, t) => e - t),
						r = e.deviceSizes.sort((e, t) => e - t),
						i = e.qualities?.sort((e, t) => e - t);
					return {
						...e,
						allSizes: t,
						deviceSizes: r,
						qualities: i,
						localPatterns:
							"u" < typeof window ? n?.localPatterns : e.localPatterns,
					};
				}, [n]),
				{ onLoad: o, onLoadingComplete: l } = e,
				p = (0, s.useRef)(o);
			(0, s.useEffect)(() => {
				p.current = o;
			}, [o]);
			const g = (0, s.useRef)(l);
			(0, s.useEffect)(() => {
				g.current = l;
			}, [l]);
			const [x, y] = (0, s.useState)(!1),
				[b, w] = (0, s.useState)(!1),
				{ props: _, meta: k } = (0, u.getImgProps)(e, {
					defaultLoader: f.default,
					imgConf: i,
					blurComplete: x,
					showAltText: b,
				});
			return (0, a.jsxs)(a.Fragment, {
				children: [
					(0, a.jsx)(v, {
						..._,
						unoptimized: k.unoptimized,
						placeholder: k.placeholder,
						fill: k.fill,
						onLoadRef: p,
						onLoadingCompleteRef: g,
						setBlurComplete: y,
						setShowAltText: w,
						sizesInput: e.sizes,
						ref: t,
					}),
					k.preload
						? (0, a.jsx)(j, { isAppRouter: !r, imgAttributes: _ })
						: null,
				],
			});
		});
		("function" == typeof r.default ||
			("object" == typeof r.default && null !== r.default)) &&
			void 0 === r.default.__esModule &&
			(Object.defineProperty(r.default, "__esModule", { value: !0 }),
			Object.assign(r.default, r),
			(t.exports = r.default));
	},
	32898,
	(e, t, r) => {
		Object.defineProperty(r, "__esModule", { value: !0 });
		var n = { default: () => c, getImageProps: () => u };
		for (var i in n) Object.defineProperty(r, i, { enumerable: !0, get: n[i] });
		const a = e.r(81258),
			s = e.r(15670),
			o = e.r(40776),
			l = a._(e.r(62198));
		function u(e) {
			const { props: t } = (0, s.getImgProps)(e, {
				defaultLoader: l.default,
				imgConf: {
					deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
					imageSizes: [32, 48, 64, 96, 128, 256, 384],
					qualities: [75],
					path: "/_next/image",
					loader: "default",
					dangerouslyAllowSVG: !1,
					unoptimized: !1,
				},
			});
			for (const [e, r] of Object.entries(t)) void 0 === r && delete t[e];
			return { props: t };
		}
		const c = o.Image;
	},
	64280,
	(e, t, r) => {
		t.exports = e.r(32898);
	},
	60701,
	(e) => {
		var t = e.i(11173),
			r = e.i(37133),
			n = e.i(41787);
		const i = [
			{
				id: "1",
				title: "Dashboard",
				subtitle: "Ir al dashboard principal",
				icon: "dashboard",
				href: "/",
				category: "Navegación",
			},
			{
				id: "2",
				title: "Contactos",
				subtitle: "Gestionar contactos y leads",
				icon: "people",
				href: "/contacts",
				category: "Navegación",
			},
			{
				id: "3",
				title: "Empresas",
				subtitle: "Administrar empresas",
				icon: "business",
				href: "/companies",
				category: "Navegación",
			},
			{
				id: "4",
				title: "Pipeline",
				subtitle: "Ver oportunidades de venta",
				icon: "handshake",
				href: "/deals",
				category: "Navegación",
			},
			{
				id: "5",
				title: "Tickets",
				subtitle: "Sistema de soporte",
				icon: "support",
				href: "/tickets",
				category: "Navegación",
			},
			{
				id: "6",
				title: "Actividades",
				subtitle: "Tareas y seguimiento",
				icon: "event",
				href: "/activities",
				category: "Navegación",
			},
			{
				id: "7",
				title: "Configuración",
				subtitle: "Ajustes del sistema",
				icon: "settings",
				href: "/settings",
				category: "Sistema",
			},
		];
		function a({ name: e, size: r = 18 }) {
			return (
				{
					dashboard: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("rect", {
								x: "3",
								y: "3",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "14",
								y: "3",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "14",
								y: "14",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "3",
								y: "14",
								width: "7",
								height: "7",
								rx: "1",
							}),
						],
					}),
					people: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
							}),
							(0, t.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
							(0, t.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
							(0, t.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }),
						],
					}),
					business: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", { d: "M3 21h18" }),
							(0, t.jsx)("path", { d: "M5 21V7l8-4v18" }),
							(0, t.jsx)("path", { d: "M19 21V11l-6-4" }),
						],
					}),
					handshake: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", { d: "m11 17 2 2a1 1 0 1 0 3-3" }),
							(0, t.jsx)("path", { d: "m14 14 2.5 2.5a1 1 0 1 0 3-3" }),
						],
					}),
					support: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0",
							}),
							(0, t.jsx)("circle", { cx: "12", cy: "17", r: "5" }),
						],
					}),
					event: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("rect", {
								width: "18",
								height: "18",
								x: "3",
								y: "4",
								rx: "2",
							}),
							(0, t.jsx)("path", { d: "M16 2v4" }),
							(0, t.jsx)("path", { d: "M8 2v4" }),
							(0, t.jsx)("path", { d: "M3 10h18" }),
						],
					}),
					settings: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
							(0, t.jsx)("path", {
								d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z",
							}),
						],
					}),
					search: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
							(0, t.jsx)("path", { d: "m21 21-4.3-4.3" }),
						],
					}),
				}[e] || null
			);
		}
		function s({ isOpen: e, onClose: s }) {
			const [o, l] = (0, n.useState)(""),
				[u, c] = (0, n.useState)(0),
				d = (0, n.useRef)(null),
				h = (0, r.useRouter)(),
				f = i
					.filter(
						(e) =>
							e.title.toLowerCase().includes(o.toLowerCase()) ||
							e.subtitle?.toLowerCase().includes(o.toLowerCase()),
					)
					.reduce(
						(e, t) => (
							e[t.category] || (e[t.category] = []), e[t.category].push(t), e
						),
						{},
					),
				p = Object.values(f).flat(),
				m = (0, n.useCallback)(
					(e) => {
						h.push(e), s(), l("");
					},
					[h, s],
				);
			return ((0, n.useEffect)(() => {
				const t = (e) => {
					"Escape" === e.key
						? s()
						: "ArrowDown" === e.key
							? (e.preventDefault(), c((e) => Math.min(e + 1, p.length - 1)))
							: "ArrowUp" === e.key
								? (e.preventDefault(), c((e) => Math.max(e - 1, 0)))
								: "Enter" === e.key && p[u] && m(p[u].href);
				};
				return (
					e && (document.addEventListener("keydown", t), d.current?.focus()),
					() => document.removeEventListener("keydown", t)
				);
			}, [e, s, p, u, m]),
			(0, n.useEffect)(() => {
				c(0);
			}, []),
			e)
				? (0, t.jsxs)("div", {
						className: "command-palette-overlay",
						children: [
							(0, t.jsx)("button", {
								type: "button",
								className: "command-palette-backdrop",
								onClick: s,
								"aria-label": "Cerrar comando",
							}),
							(0, t.jsxs)("dialog", {
								className: "command-palette",
								open: !0,
								"aria-modal": "true",
								"aria-label": "Paleta de comandos",
								children: [
									(0, t.jsxs)("div", {
										className: "command-input-wrapper",
										children: [
											(0, t.jsx)(a, { name: "search" }),
											(0, t.jsx)("input", {
												ref: d,
												type: "text",
												className: "command-input",
												placeholder: "Buscar módulos, contactos, empresas...",
												value: o,
												onChange: (e) => l(e.target.value),
											}),
											(0, t.jsx)("span", {
												className: "command-shortcut",
												children: "ESC",
											}),
										],
									}),
									(0, t.jsx)("div", {
										className: "command-results",
										children:
											0 === p.length
												? (0, t.jsx)("div", {
														style: {
															padding: "24px",
															textAlign: "center",
															color: "var(--text-muted)",
														},
														children: "No se encontraron resultados",
													})
												: Object.entries(f).map(([e, r]) =>
														(0, t.jsxs)(
															"div",
															{
																children: [
																	(0, t.jsx)("div", {
																		className: "command-group-title",
																		children: e,
																	}),
																	r.map((e) => {
																		const r = p.findIndex((t) => t.id === e.id);
																		return (0, t.jsxs)(
																			"button",
																			{
																				type: "button",
																				className: `command-item ${r === u ? "selected" : ""}`,
																				onClick: () => m(e.href),
																				onMouseEnter: () => c(r),
																				children: [
																					(0, t.jsx)("div", {
																						className: "command-item-icon",
																						children: (0, t.jsx)(a, {
																							name: e.icon,
																						}),
																					}),
																					(0, t.jsxs)("div", {
																						className: "command-item-content",
																						children: [
																							(0, t.jsx)("div", {
																								className: "command-item-title",
																								children: e.title,
																							}),
																							e.subtitle &&
																								(0, t.jsx)("div", {
																									className:
																										"command-item-subtitle",
																									children: e.subtitle,
																								}),
																						],
																					}),
																				],
																			},
																			e.id,
																		);
																	}),
																],
															},
															e,
														),
													),
									}),
								],
							}),
						],
					})
				: null;
		}
		var o = e.i(64280),
			l = e.i(54679),
			u = e.i(52624);
		const c = (0, n.createContext)({ collapsed: !1, setCollapsed: () => {} }),
			d = [
				{ href: "/", label: "Dashboard", icon: "dashboard" },
				{ href: "/contacts", label: "Contactos", icon: "people", badge: "12" },
				{ href: "/companies", label: "Empresas", icon: "business" },
				{ href: "/deals", label: "Pipeline", icon: "handshake" },
				{ href: "/tickets", label: "Tickets", icon: "support", badge: "5" },
				{ href: "/activities", label: "Actividades", icon: "event" },
			],
			h = [{ href: "/settings", label: "Configuración", icon: "settings" }];
		function f({ name: e, size: r = 20 }) {
			return (
				{
					dashboard: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("rect", {
								x: "3",
								y: "3",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "14",
								y: "3",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "14",
								y: "14",
								width: "7",
								height: "7",
								rx: "1",
							}),
							(0, t.jsx)("rect", {
								x: "3",
								y: "14",
								width: "7",
								height: "7",
								rx: "1",
							}),
						],
					}),
					people: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
							}),
							(0, t.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
							(0, t.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
							(0, t.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" }),
						],
					}),
					business: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", { d: "M3 21h18" }),
							(0, t.jsx)("path", { d: "M5 21V7l8-4v18" }),
							(0, t.jsx)("path", { d: "M19 21V11l-6-4" }),
							(0, t.jsx)("path", { d: "M9 9v.01" }),
							(0, t.jsx)("path", { d: "M9 12v.01" }),
							(0, t.jsx)("path", { d: "M9 15v.01" }),
							(0, t.jsx)("path", { d: "M9 18v.01" }),
						],
					}),
					handshake: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", { d: "m11 17 2 2a1 1 0 1 0 3-3" }),
							(0, t.jsx)("path", {
								d: "m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4",
							}),
							(0, t.jsx)("path", { d: "m21 3 1 11h-2" }),
							(0, t.jsx)("path", { d: "M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" }),
							(0, t.jsx)("path", { d: "M3 4h8" }),
						],
					}),
					support: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M18 8c0 4.5-6 9-6 9s-6-4.5-6-9a6 6 0 0 1 12 0",
							}),
							(0, t.jsx)("circle", { cx: "12", cy: "17", r: "5" }),
							(0, t.jsx)("path", { d: "M12 14v3" }),
						],
					}),
					event: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", { d: "M8 2v4" }),
							(0, t.jsx)("path", { d: "M16 2v4" }),
							(0, t.jsx)("rect", {
								width: "18",
								height: "18",
								x: "3",
								y: "4",
								rx: "2",
							}),
							(0, t.jsx)("path", { d: "M3 10h18" }),
							(0, t.jsx)("path", { d: "m9 16 2 2 4-4" }),
						],
					}),
					settings: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
							}),
							(0, t.jsx)("circle", { cx: "12", cy: "12", r: "3" }),
						],
					}),
					usersShield: (0, t.jsxs)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: [
							(0, t.jsx)("path", {
								d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2",
							}),
							(0, t.jsx)("circle", { cx: "9", cy: "7", r: "4" }),
							(0, t.jsx)("path", { d: "M23 11l-4 4-2-2" }),
							(0, t.jsx)("path", { d: "M20 7v4" }),
						],
					}),
					chevronLeft: (0, t.jsx)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: (0, t.jsx)("path", { d: "m15 18-6-6 6-6" }),
					}),
					chevronRight: (0, t.jsx)("svg", {
						width: r,
						height: r,
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						strokeWidth: "2",
						strokeLinecap: "round",
						strokeLinejoin: "round",
						"aria-hidden": "true",
						children: (0, t.jsx)("path", { d: "m9 18 6-6-6-6" }),
					}),
				}[e] || null
			);
		}
		function p({ children: e }) {
			const [i, a] = (0, n.useState)(!1),
				s = (0, r.usePathname)(),
				{ staffRole: p } = (0, u.useAuth)(),
				m = (e) => ("/" === e ? "/" === s : s.startsWith(e)),
				g = (0, n.useMemo)(() => ({ collapsed: i, setCollapsed: a }), [i]);
			return (0, t.jsx)(c.Provider, {
				value: g,
				children: (0, t.jsxs)("div", {
					className: "app-layout",
					children: [
						(0, t.jsxs)("aside", {
							className: `sidebar ${i ? "collapsed" : ""}`,
							children: [
								(0, t.jsxs)("div", {
									className: "sidebar-header",
									children: [
										(0, t.jsx)("div", {
											className: "sidebar-logo",
											children: (0, t.jsx)(o.default, {
												src: "/logo.png",
												alt: "Abtec",
												width: 24,
												height: 24,
												style: { borderRadius: 4 },
											}),
										}),
										(0, t.jsx)("span", {
											className: "sidebar-brand",
											children: "Abtec CRM",
										}),
									],
								}),
								(0, t.jsxs)("nav", {
									className: "sidebar-nav",
									children: [
										(0, t.jsxs)("div", {
											className: "nav-section",
											children: [
												(0, t.jsx)("div", {
													className: "nav-section-title",
													children: "Menú",
												}),
												d.map((e) =>
													(0, t.jsxs)(
														l.default,
														{
															href: e.href,
															className: `nav-item ${m(e.href) ? "active" : ""}`,
															children: [
																(0, t.jsx)("span", {
																	className: "nav-item-icon",
																	children: (0, t.jsx)(f, { name: e.icon }),
																}),
																(0, t.jsx)("span", {
																	className: "nav-item-text",
																	children: e.label,
																}),
																e.badge &&
																	(0, t.jsx)("span", {
																		className: "nav-item-badge",
																		children: e.badge,
																	}),
															],
														},
														e.href,
													),
												),
											],
										}),
										(0, t.jsxs)("div", {
											className: "nav-section",
											children: [
												(0, t.jsx)("div", {
													className: "nav-section-title",
													children: "Sistema",
												}),
												h.map((e) =>
													(0, t.jsxs)(
														l.default,
														{
															href: e.href,
															className: `nav-item ${m(e.href) ? "active" : ""}`,
															children: [
																(0, t.jsx)("span", {
																	className: "nav-item-icon",
																	children: (0, t.jsx)(f, { name: e.icon }),
																}),
																(0, t.jsx)("span", {
																	className: "nav-item-text",
																	children: e.label,
																}),
															],
														},
														e.href,
													),
												),
												"admin" === p &&
													(0, t.jsxs)(l.default, {
														href: "/staff",
														className: `nav-item ${m("/staff") ? "active" : ""}`,
														children: [
															(0, t.jsx)("span", {
																className: "nav-item-icon",
																children: (0, t.jsx)(f, {
																	name: "usersShield",
																}),
															}),
															(0, t.jsx)("span", {
																className: "nav-item-text",
																children: "Usuarios Staff",
															}),
														],
													}),
											],
										}),
									],
								}),
								(0, t.jsx)("div", {
									className: "sidebar-footer",
									children: (0, t.jsxs)("button", {
										type: "button",
										className: "sidebar-toggle",
										onClick: () => a(!i),
										children: [
											(0, t.jsx)(f, {
												name: i ? "chevronRight" : "chevronLeft",
												size: 16,
											}),
											!i && (0, t.jsx)("span", { children: "Colapsar" }),
										],
									}),
								}),
							],
						}),
						(0, t.jsx)("main", { className: "main-content", children: e }),
					],
				}),
			});
		}
		function m({ children: e }) {
			const n = (0, r.usePathname)();
			return (0, t.jsxs)("html", {
				lang: "es",
				children: [
					(0, t.jsxs)("head", {
						children: [
							(0, t.jsx)("title", { children: "Abtec CRM" }),
							(0, t.jsx)("link", {
								rel: "preconnect",
								href: "https://fonts.googleapis.com",
							}),
							(0, t.jsx)("link", {
								rel: "preconnect",
								href: "https://fonts.gstatic.com",
								crossOrigin: "anonymous",
							}),
							(0, t.jsx)("link", {
								href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&display=swap",
								rel: "stylesheet",
							}),
						],
					}),
					(0, t.jsx)("body", {
						children: (0, t.jsx)(u.AuthProvider, {
							children:
								"/login" === n
									? e
									: (0, t.jsx)(g, { children: (0, t.jsx)(p, { children: e }) }),
						}),
					}),
				],
			});
		}
		function g({ children: e }) {
			const { isOpen: r, setIsOpen: i } = (() => {
				const [e, t] = (0, n.useState)(!1);
				return (
					(0, n.useEffect)(() => {
						const e = (e) => {
							(e.metaKey || e.ctrlKey) &&
								"k" === e.key &&
								(e.preventDefault(), t(!0));
						};
						return (
							document.addEventListener("keydown", e),
							() => document.removeEventListener("keydown", e)
						);
					}, []),
					{ isOpen: e, setIsOpen: t }
				);
			})();
			return (0, t.jsxs)(t.Fragment, {
				children: [
					e,
					(0, t.jsx)(s, { isOpen: r, onClose: () => i(!1) }),
					(0, t.jsx)("button", {
						type: "button",
						onClick: () => i(!0),
						style: {
							position: "fixed",
							bottom: "24px",
							right: "24px",
							width: "48px",
							height: "48px",
							borderRadius: "50%",
							background: "var(--accent)",
							color: "white",
							border: "none",
							cursor: "pointer",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							boxShadow: "var(--shadow-lg)",
							zIndex: 40,
							transition: "transform 0.2s",
						},
						title: "Buscar (Cmd+K)",
						children: (0, t.jsxs)("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							"aria-hidden": "true",
							children: [
								(0, t.jsx)("circle", { cx: "11", cy: "11", r: "8" }),
								(0, t.jsx)("path", { d: "m21 21-4.3-4.3" }),
							],
						}),
					}),
				],
			});
		}
		e.s(["default", () => m], 60701);
	},
]);
