(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	25629,
	(e) => {
		var t = e.i(43513),
			r = e.i(65237),
			n = e.i(28075);
		const a = (e) => {
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
			i = async () => {
				const e = await a(),
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
			s = (e) => {
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
			o = async () => {
				const e = await s(),
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
					deals: () => a(),
					dealsStats: () => i(),
					tickets: () => s(),
					ticketsStats: () => o(),
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
	60826,
	(e, t, r) => {
		var n = e.r(41787),
			a =
				"function" == typeof Object.is
					? Object.is
					: (e, t) =>
							(e === t && (0 !== e || 1 / e == 1 / t)) || (e != e && t != t),
			i = n.useState,
			s = n.useEffect,
			o = n.useLayoutEffect,
			l = n.useDebugValue;
		function c(e) {
			var t = e.getSnapshot;
			e = e.value;
			try {
				var r = t();
				return !a(e, r);
			} catch (e) {
				return !0;
			}
		}
		var u =
			"u" < typeof window ||
			void 0 === window.document ||
			void 0 === window.document.createElement
				? (e, t) => t()
				: (e, t) => {
						var r = t(),
							n = i({ inst: { value: r, getSnapshot: t } }),
							a = n[0].inst,
							u = n[1];
						return (
							o(() => {
								(a.value = r), (a.getSnapshot = t), c(a) && u({ inst: a });
							}, [e, r, t]),
							s(
								() => (
									c(a) && u({ inst: a }),
									e(() => {
										c(a) && u({ inst: a });
									})
								),
								[e],
							),
							l(r),
							r
						);
					};
		r.useSyncExternalStore =
			void 0 !== n.useSyncExternalStore ? n.useSyncExternalStore : u;
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
		var a = Object.prototype.hasOwnProperty;
		let i = new WeakMap(),
			s = () => {},
			o = s(),
			l = Object,
			c = (e) => e === o,
			u = (e, t) => ({ ...e, ...t }),
			d = {},
			f = {},
			h = "undefined",
			g = typeof window != h,
			p = typeof document != h,
			v = g && "Deno" in window,
			y = (e, t) => {
				const r = i.get(e);
				return [
					() => (!c(t) && e.get(t)) || d,
					(n) => {
						if (!c(t)) {
							const a = e.get(t);
							t in f || (f[t] = a), r[5](t, u(a, n), a || d);
						}
					},
					r[6],
					() => (!c(t) && t in f ? f[t] : (!c(t) && e.get(t)) || d),
				];
			},
			m = !0,
			[w, S] =
				g && window.addEventListener
					? [
							window.addEventListener.bind(window),
							window.removeEventListener.bind(window),
						]
					: [s, s],
			b = {
				initFocus: (e) => (
					p && document.addEventListener("visibilitychange", e),
					w("focus", e),
					() => {
						p && document.removeEventListener("visibilitychange", e),
							S("focus", e);
					}
				),
				initReconnect: (e) => {
					const t = () => {
							(m = !0), e();
						},
						r = () => {
							m = !1;
						};
					return (
						w("online", t),
						w("offline", r),
						() => {
							S("online", t), S("offline", r);
						}
					);
				},
			},
			E = !r.default.useId,
			T = !g || v,
			j = T ? r.useEffect : r.useLayoutEffect,
			k = "u" > typeof navigator && navigator.connection,
			x =
				!T && k && (["slow-2g", "2g"].includes(k.effectiveType) || k.saveData),
			O = new WeakMap(),
			R = (e, t) => e === `[object ${t}]`,
			C = 0,
			L = (e) => {
				let t,
					r,
					n = typeof e,
					a = l.prototype.toString.call(e),
					i = R(a, "Date"),
					s = R(a, "RegExp"),
					o = R(a, "Object");
				if (l(e) !== e || i || s)
					t = i
						? e.toJSON()
						: "symbol" == n
							? e.toString()
							: "string" == n
								? JSON.stringify(e)
								: "" + e;
				else {
					if ((t = O.get(e))) return t;
					if (((t = ++C + "~"), O.set(e, t), Array.isArray(e))) {
						for (r = 0, t = "@"; r < e.length; r++) t += L(e[r]) + ",";
						O.set(e, t);
					}
					if (o) {
						t = "#";
						const n = l.keys(e).sort();
						for (; !c((r = n.pop())); )
							c(e[r]) || (t += r + ":" + L(e[r]) + ",");
						O.set(e, t);
					}
				}
				return t;
			},
			V = (e) => {
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
								? L(e)
								: ""),
					t,
				];
			},
			_ = 0,
			D = () => ++_;
		async function A(...e) {
			let [t, r, n, a] = e,
				s = u(
					{ populateCache: !0, throwOnError: !0 },
					"boolean" == typeof a ? { revalidate: a } : a || {},
				),
				l = s.populateCache,
				d = s.rollbackOnError,
				f = s.optimisticData,
				h = s.throwOnError;
			if ("function" == typeof r) {
				const e = [];
				for (const n of t.keys())
					!/^\$(inf|sub)\$/.test(n) && r(t.get(n)._k) && e.push(n);
				return Promise.all(e.map(g));
			}
			return g(r);
			async function g(r) {
				let a,
					[u] = V(r);
				if (!u) return;
				const [g, p] = y(t, u),
					[v, m, w, S] = i.get(t),
					b = () => {
						const e = v[u];
						return ("function" == typeof s.revalidate
							? s.revalidate(g().data, r)
							: !1 !== s.revalidate) && (delete w[u], delete S[u], e && e[0])
							? e[0](2).then(() => g().data)
							: g().data;
					};
				if (e.length < 3) return b();
				let E = n,
					T = !1,
					j = D();
				m[u] = [j, 0];
				const k = !c(f),
					x = g(),
					O = x.data,
					R = x._c,
					C = c(R) ? O : R;
				if (
					(k && p({ data: (f = "function" == typeof f ? f(C, O) : f), _c: C }),
					"function" == typeof E)
				)
					try {
						E = E(C);
					} catch (e) {
						(a = e), (T = !0);
					}
				if (E && "function" == typeof E.then) {
					let e;
					if (
						((E = await E.catch((e) => {
							(a = e), (T = !0);
						})),
						j !== m[u][0])
					) {
						if (T) throw a;
						return E;
					}
					T &&
						k &&
						((e = a), "function" == typeof d ? d(e) : !1 !== d) &&
						((l = !0), p({ data: C, _c: o }));
				}
				if (
					(l &&
						!T &&
						("function" == typeof l
							? p({ data: l(E, C), error: o, _c: o })
							: p({ data: E, error: o, _c: o })),
					(m[u][1] = D()),
					Promise.resolve(b()).then(() => {
						p({ _c: o });
					}),
					T)
				) {
					if (h) throw a;
					return;
				}
				return E;
			}
		}
		const I = (e, t) => {
				for (const r in e) e[r][0] && e[r][0](t);
			},
			N = (e, t) => {
				if (!i.has(e)) {
					let r = u(b, t),
						n = Object.create(null),
						a = A.bind(o, e),
						l = s,
						c = Object.create(null),
						d = (e, t) => {
							const r = c[e] || [];
							return (c[e] = r), r.push(t), () => r.splice(r.indexOf(t), 1);
						},
						f = (t, r, n) => {
							e.set(t, r);
							const a = c[t];
							if (a) for (const e of a) e(r, n);
						},
						h = () => {
							if (
								!i.has(e) &&
								(i.set(e, [
									n,
									Object.create(null),
									Object.create(null),
									Object.create(null),
									a,
									f,
									d,
								]),
								!T)
							) {
								const t = r.initFocus(setTimeout.bind(o, I.bind(o, n, 0))),
									a = r.initReconnect(setTimeout.bind(o, I.bind(o, n, 1)));
								l = () => {
									t && t(), a && a(), i.delete(e);
								};
							}
						};
					return h(), [e, a, h, l];
				}
				return [e, i.get(e)[4]];
			},
			[M, P] = N(new Map()),
			W = u(
				{
					onLoadingSlow: s,
					onSuccess: s,
					onError: s,
					onErrorRetry: (e, t, r, n, a) => {
						const i = r.errorRetryCount,
							s = a.retryCount,
							o =
								~~((Math.random() + 0.5) * (1 << (s < 8 ? s : 8))) *
								r.errorRetryInterval;
						(c(i) || !(s > i)) && setTimeout(n, o, a);
					},
					onDiscarded: s,
					revalidateOnFocus: !0,
					revalidateOnReconnect: !0,
					revalidateIfStale: !0,
					shouldRetryOnError: !0,
					errorRetryInterval: x ? 1e4 : 5e3,
					focusThrottleInterval: 5e3,
					dedupingInterval: 2e3,
					loadingTimeout: x ? 5e3 : 3e3,
					compare: function e(t, r) {
						var n, i;
						if (t === r) return !0;
						if (t && r && (n = t.constructor) === r.constructor) {
							if (n === Date) return t.getTime() === r.getTime();
							if (n === RegExp) return t.toString() === r.toString();
							if (n === Array) {
								if ((i = t.length) === r.length) for (; i-- && e(t[i], r[i]); );
								return -1 === i;
							}
							if (!n || "object" == typeof t) {
								for (n in ((i = 0), t))
									if (
										(a.call(t, n) && ++i && !a.call(r, n)) ||
										!(n in r) ||
										!e(t[n], r[n])
									)
										return !1;
								return Object.keys(r).length === i;
							}
						}
						return t != t && r != r;
					},
					isPaused: () => !1,
					cache: M,
					mutate: P,
					fallback: {},
				},
				{
					isOnline: () => m,
					isVisible: () => {
						const e = p && document.visibilityState;
						return c(e) || "hidden" !== e;
					},
				},
			),
			F = (e, t) => {
				const r = u(e, t);
				if (t) {
					const { use: n, fallback: a } = e,
						{ use: i, fallback: s } = t;
					n && i && (r.use = n.concat(i)), a && s && (r.fallback = u(a, s));
				}
				return r;
			},
			B = (0, r.createContext)({});
		var U = e.i(29498);
		const $ = g && window.__SWR_DEVTOOLS_USE__,
			q = ($ ? window.__SWR_DEVTOOLS_USE__ : []).concat((e) => (t, r, n) => {
				const a =
					r &&
					((...e) => {
						const [n] = V(t),
							[, , , a] = i.get(M);
						if (n.startsWith("$inf$")) return r(...e);
						const s = a[n];
						return c(s) ? r(...e) : (delete a[n], s);
					});
				return e(t, a, n);
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
			Q = Promise.resolve(o),
			X = () => s;
		l.defineProperty(
			(e) => {
				const { value: t } = e,
					n = (0, r.useContext)(B),
					a = "function" == typeof t,
					i = (0, r.useMemo)(() => (a ? t(n) : t), [a, n, t]),
					s = (0, r.useMemo)(() => (a ? i : F(n, i)), [a, n, i]),
					l = i && i.provider,
					c = (0, r.useRef)(o);
				l && !c.current && (c.current = N(l(s.cache || M), i));
				const d = c.current;
				return (
					d && ((s.cache = d[0]), (s.mutate = d[1])),
					j(() => {
						if (d) return d[2] && d[2](), d[3];
					}, []),
					(0, r.createElement)(B.Provider, u(e, { value: s }))
				);
			},
			"defaultValue",
			{ value: W },
		);
		const Y =
			((t = (e, t, a) => {
				const {
						cache: s,
						compare: l,
						suspense: d,
						fallbackData: f,
						revalidateOnMount: p,
						revalidateIfStale: v,
						refreshInterval: m,
						refreshWhenHidden: w,
						refreshWhenOffline: S,
						keepPreviousData: b,
						strictServerPrefetchWarning: k,
					} = a,
					[x, O, R, C] = i.get(s),
					[L, _] = V(e),
					I = (0, r.useRef)(!1),
					N = (0, r.useRef)(!1),
					M = (0, r.useRef)(L),
					P = (0, r.useRef)(t),
					W = (0, r.useRef)(a),
					F = () => W.current.isVisible() && W.current.isOnline(),
					[B, $, q, z] = y(s, L),
					H = (0, r.useRef)({}).current,
					Y = c(f) ? (c(a.fallback) ? o : a.fallback[L]) : f,
					G = (e, t) => {
						for (const r in H)
							if ("data" === r) {
								if (!l(e[r], t[r]) && (!c(e[r]) || !l(eo, t[r]))) return !1;
							} else if (t[r] !== e[r]) return !1;
						return !0;
					},
					Z = !I.current,
					ee = (0, r.useMemo)(() => {
						let e = B(),
							r = z(),
							n = (e) => {
								const r = u(e);
								return (delete r._k,
								(() => {
									if (!L || !t || W.current.isPaused()) return !1;
									if (Z && !c(p)) return p;
									const e = c(Y) ? r.data : Y;
									return c(e) || v;
								})())
									? { isValidating: !0, isLoading: !0, ...r }
									: r;
							},
							a = n(e),
							i = e === r ? a : n(r),
							s = a;
						return [
							() => {
								const e = n(B());
								return G(e, s)
									? ((s.data = e.data),
										(s.isLoading = e.isLoading),
										(s.isValidating = e.isValidating),
										(s.error = e.error),
										s)
									: ((s = e), e);
							},
							() => i,
						];
					}, [s, L]),
					et = (0, n.useSyncExternalStore)(
						(0, r.useCallback)(
							(e) =>
								q(L, (t, r) => {
									G(r, t) || e();
								}),
							[s, L],
						),
						ee[0],
						ee[1],
					),
					er = x[L] && x[L].length > 0,
					en = et.data,
					ea = c(en) ? (Y && "function" == typeof Y.then ? K(Y) : Y) : en,
					ei = et.error,
					es = (0, r.useRef)(ea),
					eo = b ? (c(en) ? (c(es.current) ? ea : es.current) : en) : ea,
					el = L && c(ea),
					ec = (0, r.useRef)(null);
				T ||
					(0, n.useSyncExternalStore)(
						X,
						() => ((ec.current = !1), ec),
						() => ((ec.current = !0), ec),
					);
				const eu = ec.current;
				k &&
					eu &&
					!d &&
					el &&
					console.warn(
						`Missing pre-initiated data for serialized key "${L}" during server-side rendering. Data fetching should be initiated on the server and provided to SWR via fallback data. You can set "strictServerPrefetchWarning: false" to disable this warning.`,
					);
				const ed =
						!(!L || !t || W.current.isPaused()) &&
						(!er || !!c(ei)) &&
						(Z && !c(p) ? p : d ? !c(ea) && v : c(ea) || v),
					ef = Z && ed,
					eh = c(et.isValidating) ? ef : et.isValidating,
					eg = c(et.isLoading) ? ef : et.isLoading,
					ep = (0, r.useCallback)(
						async (e) => {
							let t,
								r,
								n = P.current;
							if (!L || !n || N.current || W.current.isPaused()) return !1;
							let i = !0,
								s = e || {},
								u = !R[L] || !s.dedupe,
								d = () =>
									E
										? !N.current && L === M.current && I.current
										: L === M.current,
								f = { isValidating: !1, isLoading: !1 },
								h = () => {
									$(f);
								},
								g = () => {
									const e = R[L];
									e && e[1] === r && delete R[L];
								},
								p = { isValidating: !0 };
							c(B().data) && (p.isLoading = !0);
							try {
								if (
									(u &&
										($(p),
										a.loadingTimeout &&
											c(B().data) &&
											setTimeout(() => {
												i && d() && W.current.onLoadingSlow(L, a);
											}, a.loadingTimeout),
										(R[L] = [n(_), D()])),
									([t, r] = R[L]),
									(t = await t),
									u && setTimeout(g, a.dedupingInterval),
									!R[L] || R[L][1] !== r)
								)
									return u && d() && W.current.onDiscarded(L), !1;
								f.error = o;
								const e = O[L];
								if (!c(e) && (r <= e[0] || r <= e[1] || 0 === e[1]))
									return h(), u && d() && W.current.onDiscarded(L), !1;
								const s = B().data;
								(f.data = l(s, t) ? s : t),
									u && d() && W.current.onSuccess(t, L, a);
							} catch (r) {
								g();
								const e = W.current,
									{ shouldRetryOnError: t } = e;
								!e.isPaused() &&
									((f.error = r), u && d()) &&
									(e.onError(r, L, e),
									(!0 === t || ("function" == typeof t && t(r))) &&
										(!W.current.revalidateOnFocus ||
											!W.current.revalidateOnReconnect ||
											F()) &&
										e.onErrorRetry(
											r,
											L,
											e,
											(e) => {
												const t = x[L];
												t && t[0] && t[0](U.ERROR_REVALIDATE_EVENT, e);
											},
											{ retryCount: (s.retryCount || 0) + 1, dedupe: !0 },
										));
							}
							return (i = !1), h(), !0;
						},
						[L, s],
					),
					ev = (0, r.useCallback)((...e) => A(s, M.current, ...e), []);
				if (
					(j(() => {
						(P.current = t), (W.current = a), c(en) || (es.current = en);
					}),
					j(() => {
						var e;
						let t;
						if (!L) return;
						let r = ep.bind(o, J),
							n = 0;
						W.current.revalidateOnFocus &&
							(n = Date.now() + W.current.focusThrottleInterval);
						const a =
							((e = (e, t = {}) => {
								if (e == U.FOCUS_EVENT) {
									const e = Date.now();
									W.current.revalidateOnFocus &&
										e > n &&
										F() &&
										((n = e + W.current.focusThrottleInterval), r());
								} else if (e == U.RECONNECT_EVENT)
									W.current.revalidateOnReconnect && F() && r();
								else if (e == U.MUTATE_EVENT) return ep();
								else if (e == U.ERROR_REVALIDATE_EVENT) return ep(t);
							}),
							(t = x[L] || (x[L] = [])).push(e),
							() => {
								const r = t.indexOf(e);
								r >= 0 && ((t[r] = t[t.length - 1]), t.pop());
							});
						if (
							((N.current = !1),
							(M.current = L),
							(I.current = !0),
							$({ _k: _ }),
							ed && !R[L])
						)
							if (c(ea) || T) r();
							else
								g && typeof window.requestAnimationFrame != h
									? window.requestAnimationFrame(r)
									: setTimeout(r, 1);
						return () => {
							(N.current = !0), a();
						};
					}, [L]),
					j(() => {
						let e;
						function t() {
							const t = "function" == typeof m ? m(B().data) : m;
							t && -1 !== e && (e = setTimeout(r, t));
						}
						function r() {
							!B().error &&
							(w || W.current.isVisible()) &&
							(S || W.current.isOnline())
								? ep(J).then(t)
								: t();
						}
						return (
							t(),
							() => {
								e && (clearTimeout(e), (e = -1));
							}
						);
					}, [m, w, S, L]),
					(0, r.useDebugValue)(eo),
					d)
				) {
					if (!E && T && el)
						throw Error(
							"Fallback data is required when using Suspense in SSR.",
						);
					el && ((P.current = t), (W.current = a), (N.current = !1));
					const e = C[L];
					if ((K(!c(e) && el ? ev(e) : Q), !c(ei) && el)) throw ei;
					const r = el ? ep(J) : Q;
					!c(eo) && el && ((r.status = "fulfilled"), (r.value = !0)), K(r);
				}
				return {
					mutate: ev,
					get data() {
						return (H.data = !0), eo;
					},
					get error() {
						return (H.error = !0), ei;
					},
					get isValidating() {
						return (H.isValidating = !0), eh;
					},
					get isLoading() {
						return (H.isLoading = !0), eg;
					},
				};
			}),
			(...e) => {
				let n,
					a = ((n = (0, r.useContext)(B)), (0, r.useMemo)(() => u(W, n), [n])),
					[i, s, o] =
						"function" == typeof e[1]
							? [e[0], e[1], e[2] || {}]
							: [e[0], null, (null === e[1] ? e[2] : e[1]) || {}],
					l = F(a, o),
					c = t,
					{ use: d } = l,
					f = (d || []).concat(q);
				for (let e = f.length; e--; ) c = f[e](c);
				return c(i, s || l.fetcher || null, l);
			});
		e.s(["default", () => Y], 75307);
	},
	43513,
	(e) => {
		var t,
			r,
			n,
			a,
			i,
			s,
			o =
				(((t = {}).Lead = "Lead"),
				(t.Proposal = "Proposal"),
				(t.Negotiation = "Negotiation"),
				(t.Won = "Won"),
				(t.Lost = "Lost"),
				t),
			l =
				(((r = {}).Low = "Low"),
				(r.Medium = "Medium"),
				(r.High = "High"),
				(r.Critical = "Critical"),
				r),
			c =
				(((n = {}).Open = "Open"),
				(n.InProgress = "InProgress"),
				(n.Resolved = "Resolved"),
				(n.Closed = "Closed"),
				n),
			u =
				(((a = {}).Call = "Call"),
				(a.Email = "Email"),
				(a.Meeting = "Meeting"),
				(a.Note = "Note"),
				(a.Task = "Task"),
				a),
			d =
				(((i = {}).Admin = "admin"),
				(i.Manager = "manager"),
				(i.Sales = "sales"),
				(i.Support = "support"),
				(i.Viewer = "viewer"),
				i),
			f =
				(((s = {}).Subscriber = "subscriber"),
				(s.Lead = "lead"),
				(s.MQL = "mql"),
				(s.SQL = "sql"),
				(s.Opportunity = "opportunity"),
				(s.Customer = "customer"),
				(s.Lost = "lost"),
				s);
		e.s([
			"ActivityType",
			() => u,
			"DealStage",
			() => o,
			"LifecycleStage",
			() => f,
			"TicketPriority",
			() => l,
			"TicketStatus",
			() => c,
			"UserRole",
			() => d,
		]);
	},
	24182,
	(e) => {
		var t = e.i(11173),
			r = e.i(41787);
		function n({
			label: e,
			value: n,
			prefix: a = "",
			suffix: i = "",
			icon: s,
			trend: o,
			variant: l = "blue",
			animate: c = !0,
		}) {
			const [u, d] = (0, r.useState)(c ? 0 : n),
				f = "number" == typeof n ? n : parseFloat(String(n)) || 0;
			return (
				(0, r.useEffect)(() => {
					if (!c || "number" != typeof n) return void d(n);
					let e = f / 30,
						t = 0,
						r = setInterval(() => {
							d(Math.min(Math.round(e * ++t), f)),
								t >= 30 && (clearInterval(r), d(f));
						}, 1e3 / 30);
					return () => clearInterval(r);
				}, [n, c, f]),
				(0, t.jsxs)("div", {
					className: `stat-card ${l}`,
					children: [
						(0, t.jsxs)("div", {
							className: "stat-header",
							children: [
								(0, t.jsx)("div", { className: "stat-icon", children: s }),
								o &&
									(0, t.jsxs)("div", {
										className: `stat-trend ${o.direction}`,
										children: [
											"up" === o.direction ? "↑" : "↓",
											" ",
											Math.abs(o.value),
											"%",
										],
									}),
							],
						}),
						(0, t.jsxs)("div", {
							className: "stat-value",
							children: [a, "number" == typeof u ? u.toLocaleString() : u, i],
						}),
						(0, t.jsx)("div", { className: "stat-label", children: e }),
					],
				})
			);
		}
		function a({
			data: e,
			columns: n,
			searchPlaceholder: a = "Buscar...",
			filterOptions: i,
			onSearch: s,
			onFilter: o,
			emptyMessage: l = "No hay datos disponibles",
		}) {
			const [c, u] = (0, r.useState)(""),
				[d, f] = (0, r.useState)(""),
				[h, g] = (0, r.useState)(null),
				[p, v] = (0, r.useState)("asc"),
				y = e.filter((e) => {
					const t =
							"" === c ||
							Object.values(e).some((e) =>
								String(e).toLowerCase().includes(c.toLowerCase()),
							),
						r = "" === d || Object.values(e).some((e) => String(e) === d);
					return t && r;
				}),
				m = h
					? [...y].sort((e, t) => {
							const r = e[h],
								n = t[h],
								a = String(r).localeCompare(String(n));
							return "asc" === p ? a : -a;
						})
					: y;
			return (0, t.jsxs)("div", {
				className: "card",
				children: [
					(s || i) &&
						(0, t.jsxs)("div", {
							className: "card-header",
							children: [
								(0, t.jsx)("div", {
									className: "table-filters",
									children:
										i &&
										(0, t.jsxs)("select", {
											className: "filter-select",
											value: d,
											onChange: (e) => {
												var t;
												f((t = e.target.value)), o?.(t);
											},
											children: [
												(0, t.jsx)("option", { value: "", children: "Todos" }),
												i.map((e) =>
													(0, t.jsx)(
														"option",
														{ value: e.value, children: e.label },
														e.value,
													),
												),
											],
										}),
								}),
								s &&
									(0, t.jsxs)("div", {
										className: "table-search",
										children: [
											(0, t.jsxs)("svg", {
												width: "16",
												height: "16",
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
											(0, t.jsx)("input", {
												type: "text",
												placeholder: a,
												value: c,
												onChange: (e) => {
													var t;
													u((t = e.target.value)), s?.(t);
												},
											}),
										],
									}),
							],
						}),
					(0, t.jsx)("div", {
						style: { overflowX: "auto" },
						children: (0, t.jsxs)("table", {
							className: "data-table",
							children: [
								(0, t.jsx)("thead", {
									children: (0, t.jsx)("tr", {
										children: n.map((e) =>
											(0, t.jsxs)(
												"th",
												{
													className: h === String(e.key) ? "sorted" : "",
													onClick: () => {
														var t;
														return (
															e.sortable &&
															void (h === (t = String(e.key))
																? v("asc" === p ? "desc" : "asc")
																: (g(t), v("asc")))
														);
													},
													children: [
														e.label,
														e.sortable &&
															(0, t.jsx)("span", {
																className: "sort-icon",
																children:
																	h === String(e.key)
																		? "asc" === p
																			? " ↑"
																			: " ↓"
																		: " ↕",
															}),
													],
												},
												String(e.key),
											),
										),
									}),
								}),
								(0, t.jsx)("tbody", {
									children:
										0 === m.length
											? (0, t.jsx)("tr", {
													children: (0, t.jsx)("td", {
														colSpan: n.length,
														children: (0, t.jsxs)("div", {
															className: "empty-state",
															children: [
																(0, t.jsxs)("svg", {
																	width: "48",
																	height: "48",
																	viewBox: "0 0 24 24",
																	fill: "none",
																	stroke: "currentColor",
																	strokeWidth: "1.5",
																	"aria-hidden": "true",
																	children: [
																		(0, t.jsx)("path", {
																			d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
																		}),
																		(0, t.jsx)("path", { d: "M14 2v6h6" }),
																		(0, t.jsx)("path", { d: "M12 18v-6" }),
																		(0, t.jsx)("path", { d: "M9 15h6" }),
																	],
																}),
																(0, t.jsx)("h4", { children: "Sin datos" }),
																(0, t.jsx)("p", { children: l }),
															],
														}),
													}),
												})
											: m.map((e) =>
													(0, t.jsx)(
														"tr",
														{
															children: n.map((r) =>
																(0, t.jsx)(
																	"td",
																	{
																		children: r.render
																			? r.render(e)
																			: String(e[String(r.key)] ?? ""),
																	},
																	String(r.key),
																),
															),
														},
														e.id,
													),
												),
								}),
							],
						}),
					}),
				],
			});
		}
		e.s(["DataTable", () => a, "default", () => n]);
	},
]);
