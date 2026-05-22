(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	60826,
	(e, t, r) => {
		var n = e.r(41787),
			i =
				"function" == typeof Object.is
					? Object.is
					: (e, t) =>
							(e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t),
			a = n.useState,
			o = n.useEffect,
			s = n.useLayoutEffect,
			u = n.useDebugValue;
		function l(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var r = t();
				return !i(e, r);
			} catch (e) {
				return !0;
			}
		}
		var c =
			"u" < typeof window ||
			void 0 === window.document ||
			void 0 === window.document.createElement
				? (e, t) => t()
				: (e, t) => {
						var r = t(),
							n = a({ inst: { value: r, getSnapshot: t } }),
							i = n[0].inst,
							c = n[1];
						return (
							s(() => {
								(i.value = r), (i.getSnapshot = t), l(i) && c({ inst: i });
							}, [e, r, t]),
							o(
								() => (
									l(i) && c({ inst: i }),
									e(() => {
										l(i) && c({ inst: i });
									})
								),
								[e],
							),
							u(r),
							r
						);
					};
		r.useSyncExternalStore =
			void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : c;
	},
	36379,
	(e, t, r) => {
		t.exports = e.r(60826);
	},
	75307,
	(e) => {
		let t;
		var r = e.i(41787),
			n = e.i(36379);
		e.s(
			[
				"ERROR_REVALIDATE_EVENT",
				() => 3,
				"FOCUS_EVENT",
				() => 0,
				"MUTATE_EVENT",
				() => 2,
				"RECONNECT_EVENT",
				() => 1,
			],
			29498,
		);
		var i = Object.prototype.hasOwnProperty;
		let a = new WeakMap(),
			o = () => {},
			s = o(),
			u = Object,
			l = (e) => e === s,
			c = (e, t) => ({ ...e, ...t }),
			d = {},
			f = {},
			g = "undefined",
			p = typeof window != g,
			h = typeof document != g,
			y = p && "Deno" in window,
			v = (e, t) => {
				const r = a.get(e);
				return [
					() => (!l(t) && e.get(t)) || d,
					(n) => {
						if (!l(t)) {
							const i = e.get(t);
							t in f || (f[t] = i), r[5](t, c(i, n), i || d);
						}
					},
					r[6],
					() => (!l(t) && t in f ? f[t] : (!l(t) && e.get(t)) || d),
				];
			},
			w = !0,
			[E, m] =
				p && window.addEventListener
					? [
							window.addEventListener.bind(window),
							window.removeEventListener.bind(window),
						]
					: [o, o],
			S = {
				initFocus: (e) => (
					h && document.addEventListener("visibilitychange", e),
					E("focus", e),
					() => {
						h && document.removeEventListener("visibilitychange", e),
							m("focus", e);
					}
				),
				initReconnect: (e) => {
					const t = () => {
							(w = !0), e();
						},
						r = () => {
							w = !1;
						};
					return (
						E("online", t),
						E("offline", r),
						() => {
							m("online", t), m("offline", r);
						}
					);
				},
			},
			T = !r.default.useId,
			b = !p || y,
			R = b ? r.useEffect : r.useLayoutEffect,
			O = "u" > typeof navigator && navigator.connection,
			k =
				!b && O && (["slow-2g", "2g"].includes(O.effectiveType) || O.saveData),
			_ = new WeakMap(),
			V = (e, t) => e === `[object ${t}]`,
			A = 0,
			D = (e) => {
				let t,
					r,
					n = typeof e,
					i = u.prototype.toString.call(e),
					a = V(i, "Date"),
					o = V(i, "RegExp"),
					s = V(i, "Object");
				if (u(e) !== e || a || o)
					t = a
						? e.toJSON()
						: "symbol" == n
							? e.toString()
							: "string" == n
								? JSON.stringify(e)
								: "" + e;
				else {
					if ((t = _.get(e))) return t;
					if (((t = ++A + "~"), _.set(e, t), Array.isArray(e))) {
						for (r = 0, t = "@"; r < e.length; r++) t += D(e[r]) + ",";
						_.set(e, t);
					}
					if (s) {
						t = "#";
						const n = u.keys(e).sort();
						for (; !l((r = n.pop())); )
							l(e[r]) || (t += r + ":" + D(e[r]) + ",");
						_.set(e, t);
					}
				}
				return t;
			},
			L = (e) => {
				if ("function" == typeof e)
					try {
						e = e();
					} catch (t) {
						e = "";
					}
				const t = e;
				return [
					(e =
						"string" == typeof e
							? e
							: (Array.isArray(e) ? e.length : e)
								? D(e)
								: ""),
					t,
				];
			},
			C = 0,
			I = () => ++C;
		async function P(...e) {
			let [t, r, n, i] = e,
				o = c(
					{ populateCache: !0, throwOnError: !0 },
					"boolean" == typeof i ? { revalidate: i } : i || {},
				),
				u = o.populateCache,
				d = o.rollbackOnError,
				f = o.optimisticData,
				g = o.throwOnError;
			if ("function" == typeof r) {
				const e = [];
				for (const n of t.keys())
					!/^\$(inf|sub)\$/.test(n) && r(t.get(n)._k) && e.push(n);
				return Promise.all(e.map(p));
			}
			return p(r);
			async function p(r) {
				let i,
					[c] = L(r);
				if (!c) return;
				const [p, h] = v(t, c),
					[y, w, E, m] = a.get(t),
					S = () => {
						const e = y[c];
						return ("function" == typeof o.revalidate
							? o.revalidate(p().data, r)
							: !1 !== o.revalidate) && (delete E[c], delete m[c], e && e[0])
							? e[0](2).then(() => p().data)
							: p().data;
					};
				if (e.length < 3) return S();
				let T = n,
					b = !1,
					R = I();
				w[c] = [R, 0];
				const O = !l(f),
					k = p(),
					_ = k.data,
					V = k._c,
					A = l(V) ? _ : V;
				if (
					(O && h({ data: (f = "function" == typeof f ? f(A, _) : f), _c: A }),
					"function" == typeof T)
				)
					try {
						T = T(A);
					} catch (e) {
						(i = e), (b = !0);
					}
				if (T && "function" == typeof T.then) {
					let e;
					if (
						((T = await T.catch((e) => {
							(i = e), (b = !0);
						})),
						R !== w[c][0])
					) {
						if (b) throw i;
						return T;
					}
					b &&
						O &&
						((e = i), "function" == typeof d ? d(e) : !1 !== d) &&
						((u = !0), h({ data: A, _c: s }));
				}
				if (
					(u &&
						!b &&
						("function" == typeof u
							? h({ data: u(T, A), error: s, _c: s })
							: h({ data: T, error: s, _c: s })),
					(w[c][1] = I()),
					Promise.resolve(S()).then(() => {
						h({ _c: s });
					}),
					b)
				) {
					if (g) throw i;
					return;
				}
				return T;
			}
		}
		const N = (e, t) => {
				for (const r in e) e[r][0] && e[r][0](t);
			},
			M = (e, t) => {
				if (!a.has(e)) {
					let r = c(S, t),
						n = Object.create(null),
						i = P.bind(s, e),
						u = o,
						l = Object.create(null),
						d = (e, t) => {
							const r = l[e] || [];
							return (l[e] = r), r.push(t), () => r.splice(r.indexOf(t), 1);
						},
						f = (t, r, n) => {
							e.set(t, r);
							const i = l[t];
							if (i) for (const e of i) e(r, n);
						},
						g = () => {
							if (
								!a.has(e) &&
								(a.set(e, [
									n,
									Object.create(null),
									Object.create(null),
									Object.create(null),
									i,
									f,
									d,
								]),
								!b)
							) {
								const t = r.initFocus(setTimeout.bind(s, N.bind(s, n, 0))),
									i = r.initReconnect(setTimeout.bind(s, N.bind(s, n, 1)));
								u = () => {
									t && t(), i && i(), a.delete(e);
								};
							}
						};
					return g(), [e, i, g, u];
				}
				return [e, a.get(e)[4]];
			},
			[j, x] = M(new Map()),
			W = c(
				{
					onLoadingSlow: o,
					onSuccess: o,
					onError: o,
					onErrorRetry: (e, t, r, n, i) => {
						const a = r.errorRetryCount,
							o = i.retryCount,
							s =
								~~((Math.random() + 0.5) * (1 << (o < 8 ? o : 8))) *
								r.errorRetryInterval;
						(l(a) || !(o > a)) && setTimeout(n, s, i);
					},
					onDiscarded: o,
					revalidateOnFocus: !0,
					revalidateOnReconnect: !0,
					revalidateIfStale: !0,
					shouldRetryOnError: !0,
					errorRetryInterval: k ? 1e4 : 5e3,
					focusThrottleInterval: 5e3,
					dedupingInterval: 2e3,
					loadingTimeout: k ? 5e3 : 3e3,
					compare: function e(t, r) {
						var n, a;
						if (t === r) return !0;
						if (t && r && (n = t.constructor) === r.constructor) {
							if (n === Date) return t.getTime() === r.getTime();
							if (n === RegExp) return t.toString() === r.toString();
							if (n === Array) {
								if ((a = t.length) === r.length) for (; a-- && e(t[a], r[a]); );
								return -1 === a;
							}
							if (!n || "object" == typeof t) {
								for (n in ((a = 0), t))
									if (
										(i.call(t, n) && ++a && !i.call(r, n)) ||
										!(n in r) ||
										!e(t[n], r[n])
									)
										return !1;
								return Object.keys(r).length === a;
							}
						}
						return t != t && r != r;
					},
					isPaused: () => !1,
					cache: j,
					mutate: x,
					fallback: {},
				},
				{
					isOnline: () => w,
					isVisible: () => {
						const e = h && document.visibilityState;
						return l(e) || "hidden" !== e;
					},
				},
			),
			F = (e, t) => {
				const r = c(e, t);
				if (t) {
					const { use: n, fallback: i } = e,
						{ use: a, fallback: o } = t;
					n && a && (r.use = n.concat(a)), i && o && (r.fallback = c(i, o));
				}
				return r;
			},
			U = (0, r.createContext)({});
		var B = e.i(29498);
		const $ = p && window.__SWR_DEVTOOLS_USE__,
			q = ($ ? window.__SWR_DEVTOOLS_USE__ : []).concat((e) => (t, r, n) => {
				const i =
					r &&
					((...e) => {
						const [n] = L(t),
							[, , , i] = a.get(j);
						if (n.startsWith("$inf$")) return r(...e);
						const o = i[n];
						return l(o) ? r(...e) : (delete i[n], o);
					});
				return e(t, i, n);
			});
		$ && (window.__SWR_DEVTOOLS_REACT__ = r.default);
		const z = () => {},
			H = z(),
			K =
				(new WeakMap(),
				r.default.use ||
					((e) => {
						switch (e.status) {
							case "pending":
								throw e;
							case "fulfilled":
								return e.value;
							case "rejected":
								throw e.reason;
							default:
								throw (
									((e.status = "pending"),
									e.then(
										(t) => {
											(e.status = "fulfilled"), (e.value = t);
										},
										(t) => {
											(e.status = "rejected"), (e.reason = t);
										},
									),
									e)
								);
						}
					})),
			J = { dedupe: !0 },
			Q = Promise.resolve(s),
			Y = () => o;
		u.defineProperty(
			(e) => {
				const { value: t } = e,
					n = (0, r.useContext)(U),
					i = "function" == typeof t,
					a = (0, r.useMemo)(() => (i ? t(n) : t), [i, n, t]),
					o = (0, r.useMemo)(() => (i ? a : F(n, a)), [i, n, a]),
					u = a && a.provider,
					l = (0, r.useRef)(s);
				u && !l.current && (l.current = M(u(o.cache || j), a));
				const d = l.current;
				return (
					d && ((o.cache = d[0]), (o.mutate = d[1])),
					R(() => {
						if (d) return d[2] && d[2](), d[3];
					}, []),
					(0, r.createElement)(U.Provider, c(e, { value: o }))
				);
			},
			"defaultValue",
			{ value: W },
		);
		const G =
			((t = (e, t, i) => {
				const {
						cache: o,
						compare: u,
						suspense: d,
						fallbackData: f,
						revalidateOnMount: h,
						revalidateIfStale: y,
						refreshInterval: w,
						refreshWhenHidden: E,
						refreshWhenOffline: m,
						keepPreviousData: S,
						strictServerPrefetchWarning: O,
					} = i,
					[k, _, V, A] = a.get(o),
					[D, C] = L(e),
					N = (0, r.useRef)(!1),
					M = (0, r.useRef)(!1),
					j = (0, r.useRef)(D),
					x = (0, r.useRef)(t),
					W = (0, r.useRef)(i),
					F = () => W.current.isVisible() && W.current.isOnline(),
					[U, $, q, z] = v(o, D),
					H = (0, r.useRef)({}).current,
					G = l(f) ? (l(i.fallback) ? s : i.fallback[D]) : f,
					X = (e, t) => {
						for (const r in H)
							if ("data" === r) {
								if (!u(e[r], t[r]) && (!l(e[r]) || !u(es, t[r]))) return !1;
							} else if (t[r] !== e[r]) return !1;
						return !0;
					},
					Z = !N.current,
					ee = (0, r.useMemo)(() => {
						let e = U(),
							r = z(),
							n = (e) => {
								const r = c(e);
								return (delete r._k,
								(() => {
									if (!D || !t || W.current.isPaused()) return !1;
									if (Z && !l(h)) return h;
									const e = l(G) ? r.data : G;
									return l(e) || y;
								})())
									? { isValidating: !0, isLoading: !0, ...r }
									: r;
							},
							i = n(e),
							a = e === r ? i : n(r),
							o = i;
						return [
							() => {
								const e = n(U());
								return X(e, o)
									? ((o.data = e.data),
										(o.isLoading = e.isLoading),
										(o.isValidating = e.isValidating),
										(o.error = e.error),
										o)
									: ((o = e), e);
							},
							() => a,
						];
					}, [o, D]),
					et = (0, n.useSyncExternalStore)(
						(0, r.useCallback)(
							(e) =>
								q(D, (t, r) => {
									X(r, t) || e();
								}),
							[o, D],
						),
						ee[0],
						ee[1],
					),
					er = k[D] && k[D].length > 0,
					en = et.data,
					ei = l(en) ? (G && "function" == typeof G.then ? K(G) : G) : en,
					ea = et.error,
					eo = (0, r.useRef)(ei),
					es = S ? (l(en) ? (l(eo.current) ? ei : eo.current) : en) : ei,
					eu = D && l(ei),
					el = (0, r.useRef)(null);
				b ||
					(0, n.useSyncExternalStore)(
						Y,
						() => ((el.current = !1), el),
						() => ((el.current = !0), el),
					);
				const ec = el.current;
				O &&
					ec &&
					!d &&
					eu &&
					console.warn(
						`Missing pre-initiated data for serialized key "${D}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`,
					);
				const ed =
						!(!D || !t || W.current.isPaused()) &&
						(!er || !!l(ea)) &&
						(Z && !l(h) ? h : d ? !l(ei) && y : l(ei) || y),
					ef = Z && ed,
					eg = l(et.isValidating) ? ef : et.isValidating,
					ep = l(et.isLoading) ? ef : et.isLoading,
					eh = (0, r.useCallback)(
						async (e) => {
							let t,
								r,
								n = x.current;
							if (!D || !n || M.current || W.current.isPaused()) return !1;
							let a = !0,
								o = e || {},
								c = !V[D] || !o.dedupe,
								d = () =>
									T
										? !M.current && D === j.current && N.current
										: D === j.current,
								f = { isValidating: !1, isLoading: !1 },
								g = () => {
									$(f);
								},
								p = () => {
									const e = V[D];
									e && e[1] === r && delete V[D];
								},
								h = { isValidating: !0 };
							l(U().data) && (h.isLoading = !0);
							try {
								if (
									(c &&
										($(h),
										i.loadingTimeout &&
											l(U().data) &&
											setTimeout(() => {
												a && d() && W.current.onLoadingSlow(D, i);
											}, i.loadingTimeout),
										(V[D] = [n(C), I()])),
									([t, r] = V[D]),
									(t = await t),
									c && setTimeout(p, i.dedupingInterval),
									!V[D] || V[D][1] !== r)
								)
									return c && d() && W.current.onDiscarded(D), !1;
								f.error = s;
								const e = _[D];
								if (!l(e) && (r <= e[0] || r <= e[1] || 0 === e[1]))
									return g(), c && d() && W.current.onDiscarded(D), !1;
								const o = U().data;
								(f.data = u(o, t) ? o : t),
									c && d() && W.current.onSuccess(t, D, i);
							} catch (r) {
								p();
								const e = W.current,
									{ shouldRetryOnError: t } = e;
								!e.isPaused() &&
									((f.error = r), c && d()) &&
									(e.onError(r, D, e),
									(!0 === t || ("function" == typeof t && t(r))) &&
										(!W.current.revalidateOnFocus ||
											!W.current.revalidateOnReconnect ||
											F()) &&
										e.onErrorRetry(
											r,
											D,
											e,
											(e) => {
												const t = k[D];
												t && t[0] && t[0](B.ERROR_REVALIDATE_EVENT, e);
											},
											{ retryCount: (o.retryCount || 0) + 1, dedupe: !0 },
										));
							}
							return (a = !1), g(), !0;
						},
						[D, o],
					),
					ey = (0, r.useCallback)((...e) => P(o, j.current, ...e), []);
				if (
					(R(() => {
						(x.current = t), (W.current = i), l(en) || (eo.current = en);
					}),
					R(() => {
						var e;
						let t;
						if (!D) return;
						let r = eh.bind(s, J),
							n = 0;
						W.current.revalidateOnFocus &&
							(n = Date.now() + W.current.focusThrottleInterval);
						const i =
							((e = (e, t = {}) => {
								if (e == B.FOCUS_EVENT) {
									const e = Date.now();
									W.current.revalidateOnFocus &&
										e > n &&
										F() &&
										((n = e + W.current.focusThrottleInterval), r());
								} else if (e == B.RECONNECT_EVENT)
									W.current.revalidateOnReconnect && F() && r();
								else if (e == B.MUTATE_EVENT) return eh();
								else if (e == B.ERROR_REVALIDATE_EVENT) return eh(t);
							}),
							(t = k[D] || (k[D] = [])).push(e),
							() => {
								const r = t.indexOf(e);
								r >= 0 && ((t[r] = t[t.length - 1]), t.pop());
							});
						if (
							((M.current = !1),
							(j.current = D),
							(N.current = !0),
							$({ _k: C }),
							ed && !V[D])
						)
							if (l(ei) || b) r();
							else
								p && typeof window.requestAnimationFrame != g
									? window.requestAnimationFrame(r)
									: setTimeout(r, 1);
						return () => {
							(M.current = !0), i();
						};
					}, [D]),
					R(() => {
						let e;
						function t() {
							const t = "function" == typeof w ? w(U().data) : w;
							t && -1 !== e && (e = setTimeout(r, t));
						}
						function r() {
							!U().error &&
							(E || W.current.isVisible()) &&
							(m || W.current.isOnline())
								? eh(J).then(t)
								: t();
						}
						return (
							t(),
							() => {
								e && (clearTimeout(e), (e = -1));
							}
						);
					}, [w, E, m, D]),
					(0, r.useDebugValue)(es),
					d)
				) {
					if (!T && b && eu)
						throw Error(
							"Fallback data is required when using Suspense in SSR.",
						);
					eu && ((x.current = t), (W.current = i), (M.current = !1));
					const e = A[D];
					if ((K(!l(e) && eu ? ey(e) : Q), !l(ea) && eu)) throw ea;
					const r = eu ? eh(J) : Q;
					!l(es) && eu && ((r.status = "fulfilled"), (r.value = !0)), K(r);
				}
				return {
					mutate: ey,
					get data() {
						return (H.data = !0), es;
					},
					get error() {
						return (H.error = !0), ea;
					},
					get isValidating() {
						return (H.isValidating = !0), eg;
					},
					get isLoading() {
						return (H.isLoading = !0), ep;
					},
				};
			}),
			(...e) => {
				let n,
					i = ((n = (0, r.useContext)(U)), (0, r.useMemo)(() => c(W, n), [n])),
					[a, o, s] =
						"function" == typeof e[1]
							? [e[0], e[1], e[2] || {}]
							: [e[0], null, (null === e[1] ? e[2] : e[1]) || {}],
					u = F(i, s),
					l = t,
					{ use: d } = u,
					f = (d || []).concat(q);
				for (let e = f.length; e--; ) l = f[e](l);
				return l(a, o || u.fetcher || null, u);
			});
		e.s(["default", () => G], 75307);
	},
	43513,
	(e) => {
		var t,
			r,
			n,
			i,
			a,
			o,
			s =
				(((t = {}).Lead = "Lead"),
				(t.Proposal = "Proposal"),
				(t.Negotiation = "Negotiation"),
				(t.Won = "Won"),
				(t.Lost = "Lost"),
				t),
			u =
				(((r = {}).Low = "Low"),
				(r.Medium = "Medium"),
				(r.High = "High"),
				(r.Critical = "Critical"),
				r),
			l =
				(((n = {}).Open = "Open"),
				(n.InProgress = "InProgress"),
				(n.Resolved = "Resolved"),
				(n.Closed = "Closed"),
				n),
			c =
				(((i = {}).Call = "Call"),
				(i.Email = "Email"),
				(i.Meeting = "Meeting"),
				(i.Note = "Note"),
				(i.Task = "Task"),
				i),
			d =
				(((a = {}).Admin = "admin"),
				(a.Manager = "manager"),
				(a.Sales = "sales"),
				(a.Support = "support"),
				(a.Viewer = "viewer"),
				a),
			f =
				(((o = {}).Subscriber = "subscriber"),
				(o.Lead = "lead"),
				(o.MQL = "mql"),
				(o.SQL = "sql"),
				(o.Opportunity = "opportunity"),
				(o.Customer = "customer"),
				(o.Lost = "lost"),
				o);
		e.s([
			"ActivityType",
			() => c,
			"DealStage",
			() => s,
			"LifecycleStage",
			() => f,
			"TicketPriority",
			() => u,
			"TicketStatus",
			() => l,
			"UserRole",
			() => d,
		]);
	},
	25629,
	(e) => {
		var t = e.i(43513),
			r = e.i(65237),
			n = e.i(28075);
		const i = (e) => {
				const t = [(0, n.orderBy)("createdAt", "desc")];
				return (
					e?.ownerId && t.unshift((0, n.where)("ownerId", "==", e.ownerId)),
					e?.contactId &&
						t.unshift((0, n.where)("contactId", "==", e.contactId)),
					e?.companyId &&
						t.unshift((0, n.where)("companyId", "==", e.companyId)),
					e?.stage && t.unshift((0, n.where)("stage", "==", e.stage)),
					(0, r.getCollection)("deals", ...t)
				);
			},
			a = async () => {
				const e = await i(),
					r = {
						totalValue: 0,
						totalDeals: e.length,
						wonValue: 0,
						wonDeals: 0,
						lostValue: 0,
						lostDeals: 0,
						avgDealSize: 0,
					};
				return (
					e.forEach((e) => {
						(r.totalValue += e.value),
							e.stage === t.DealStage.Won
								? ((r.wonValue += e.value), r.wonDeals++)
								: e.stage === t.DealStage.Lost &&
									((r.lostValue += e.value), r.lostDeals++);
					}),
					(r.avgDealSize = r.totalDeals > 0 ? r.totalValue / r.totalDeals : 0),
					r
				);
			},
			o = (e) => {
				const t = [(0, n.orderBy)("createdAt", "desc")];
				return (
					e?.assigneeId &&
						t.unshift((0, n.where)("assigneeId", "==", e.assigneeId)),
					e?.contactId &&
						t.unshift((0, n.where)("contactId", "==", e.contactId)),
					e?.companyId &&
						t.unshift((0, n.where)("companyId", "==", e.companyId)),
					e?.status && t.unshift((0, n.where)("status", "==", e.status)),
					e?.priority && t.unshift((0, n.where)("priority", "==", e.priority)),
					(0, r.getCollection)("tickets", ...t)
				);
			},
			s = async () => {
				const e = await o(),
					r = {
						total: e.length,
						open: 0,
						inProgress: 0,
						resolved: 0,
						closed: 0,
						critical: 0,
						high: 0,
						avgResolutionTime: 0,
					},
					n = [];
				return (
					e.forEach((e) => {
						switch (e.status) {
							case t.TicketStatus.Open:
								r.open++;
								break;
							case t.TicketStatus.InProgress:
								r.inProgress++;
								break;
							case t.TicketStatus.Resolved:
								r.resolved++;
								break;
							case t.TicketStatus.Closed:
								r.closed++;
						}
						if (
							(e.priority === t.TicketPriority.Critical && r.critical++,
							e.priority === t.TicketPriority.High && r.high++,
							e.resolvedAt && e.createdAt)
						) {
							const t = new Date(e.createdAt).getTime(),
								r = new Date(e.resolvedAt).getTime();
							n.push((r - t) / 36e5);
						}
					}),
					n.length > 0 &&
						(r.avgResolutionTime = n.reduce((e, t) => e + t, 0) / n.length),
					r
				);
			};
		e.s(
			[
				"SWRKeys",
				0,
				{
					contacts: "contacts",
					companies: "companies",
					deals: "deals",
					dealsStats: "deals-stats",
					tickets: "tickets",
					ticketsStats: "tickets-stats",
					activities: "activities",
				},
				"fetcher",
				0,
				{
					contacts: () => {
						let e;
						return (
							(e = [(0, n.orderBy)("createdAt", "desc")]),
							(0, r.getCollection)("contacts", ...e).then((e) =>
								e.map((e) => ({
									...e,
									createdAt:
										e.createdAt instanceof Date
											? e.createdAt
											: new Date(e.createdAt),
									updatedAt:
										e.updatedAt instanceof Date
											? e.updatedAt
											: new Date(e.updatedAt),
								})),
							)
						);
					},
					companies: () => {
						let e;
						return (
							(e = [(0, n.orderBy)("createdAt", "desc")]),
							(0, r.getCollection)("companies", ...e)
						);
					},
					deals: () => i(),
					dealsStats: () => a(),
					tickets: () => o(),
					ticketsStats: () => s(),
					activities: () => {
						let e;
						return (
							(e = [(0, n.orderBy)("createdAt", "desc")]),
							(0, r.getCollection)("activities", ...e)
						);
					},
				},
			],
			25629,
		);
	},
]);
