(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([
	"object" == typeof document ? document.currentScript : void 0,
	18044,
	81673,
	81879,
	63971,
	(e) => {
		let t, r, n;
		var i,
			s,
			a = e.i(86697);
		const o = (e) => {
				let t = [],
					r = 0;
				for (let n = 0; n < e.length; n++) {
					let i = e.charCodeAt(n);
					i < 128
						? (t[r++] = i)
						: (i < 2048
								? (t[r++] = (i >> 6) | 192)
								: ((64512 & i) == 55296 &&
									n + 1 < e.length &&
									(64512 & e.charCodeAt(n + 1)) == 56320
										? ((i =
												65536 +
												((1023 & i) << 10) +
												(1023 & e.charCodeAt(++n))),
											(t[r++] = (i >> 18) | 240),
											(t[r++] = ((i >> 12) & 63) | 128))
										: (t[r++] = (i >> 12) | 224),
									(t[r++] = ((i >> 6) & 63) | 128)),
							(t[r++] = (63 & i) | 128));
				}
				return t;
			},
			l = (e) => {
				let t = [],
					r = 0,
					n = 0;
				for (; r < e.length; ) {
					const i = e[r++];
					if (i < 128) t[n++] = String.fromCharCode(i);
					else if (i > 191 && i < 224) {
						const s = e[r++];
						t[n++] = String.fromCharCode(((31 & i) << 6) | (63 & s));
					} else if (i > 239 && i < 365) {
						const s =
							(((7 & i) << 18) |
								((63 & e[r++]) << 12) |
								((63 & e[r++]) << 6) |
								(63 & e[r++])) -
							65536;
						(t[n++] = String.fromCharCode(55296 + (s >> 10))),
							(t[n++] = String.fromCharCode(56320 + (1023 & s)));
					} else {
						const s = e[r++],
							a = e[r++];
						t[n++] = String.fromCharCode(
							((15 & i) << 12) | ((63 & s) << 6) | (63 & a),
						);
					}
				}
				return t.join("");
			},
			u = {
				byteToCharMap_: null,
				charToByteMap_: null,
				byteToCharMapWebSafe_: null,
				charToByteMapWebSafe_: null,
				ENCODED_VALS_BASE:
					"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
				get ENCODED_VALS() {
					return this.ENCODED_VALS_BASE + "+/=";
				},
				get ENCODED_VALS_WEBSAFE() {
					return this.ENCODED_VALS_BASE + "-_.";
				},
				HAS_NATIVE_SUPPORT: "function" == typeof atob,
				encodeByteArray(e, t) {
					if (!Array.isArray(e))
						throw Error("encodeByteArray takes an array as a parameter");
					this.init_();
					const r = t ? this.byteToCharMapWebSafe_ : this.byteToCharMap_,
						n = [];
					for (let t = 0; t < e.length; t += 3) {
						let i = e[t],
							s = t + 1 < e.length,
							a = s ? e[t + 1] : 0,
							o = t + 2 < e.length,
							l = o ? e[t + 2] : 0,
							u = i >> 2,
							h = ((3 & i) << 4) | (a >> 4),
							c = ((15 & a) << 2) | (l >> 6),
							d = 63 & l;
						!o && ((d = 64), s || (c = 64)), n.push(r[u], r[h], r[c], r[d]);
					}
					return n.join("");
				},
				encodeString(e, t) {
					return this.HAS_NATIVE_SUPPORT && !t
						? btoa(e)
						: this.encodeByteArray(o(e), t);
				},
				decodeString(e, t) {
					return this.HAS_NATIVE_SUPPORT && !t
						? atob(e)
						: l(this.decodeStringToByteArray(e, t));
				},
				decodeStringToByteArray(e, t) {
					this.init_();
					const r = t ? this.charToByteMapWebSafe_ : this.charToByteMap_,
						n = [];
					for (let t = 0; t < e.length; ) {
						const i = r[e.charAt(t++)],
							s = t < e.length ? r[e.charAt(t)] : 0,
							a = ++t < e.length ? r[e.charAt(t)] : 64,
							o = ++t < e.length ? r[e.charAt(t)] : 64;
						if ((++t, null == i || null == s || null == a || null == o))
							throw new h();
						const l = (i << 2) | (s >> 4);
						if ((n.push(l), 64 !== a)) {
							const e = ((s << 4) & 240) | (a >> 2);
							if ((n.push(e), 64 !== o)) {
								const e = ((a << 6) & 192) | o;
								n.push(e);
							}
						}
					}
					return n;
				},
				init_() {
					if (!this.byteToCharMap_) {
						(this.byteToCharMap_ = {}),
							(this.charToByteMap_ = {}),
							(this.byteToCharMapWebSafe_ = {}),
							(this.charToByteMapWebSafe_ = {});
						for (let e = 0; e < this.ENCODED_VALS.length; e++)
							(this.byteToCharMap_[e] = this.ENCODED_VALS.charAt(e)),
								(this.charToByteMap_[this.byteToCharMap_[e]] = e),
								(this.byteToCharMapWebSafe_[e] =
									this.ENCODED_VALS_WEBSAFE.charAt(e)),
								(this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[e]] = e),
								e >= this.ENCODED_VALS_BASE.length &&
									((this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(e)] =
										e),
									(this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(e)] =
										e));
					}
				},
			};
		class h extends Error {
			constructor() {
				super(...arguments), (this.name = "DecodeBase64StringError");
			}
		}
		const c = (e) => {
				const t = o(e);
				return u.encodeByteArray(t, !0);
			},
			d = (e) => c(e).replace(/\./g, ""),
			f = (e) => {
				try {
					return u.decodeString(e, !0);
				} catch (e) {
					console.error("base64Decode failed: ", e);
				}
				return null;
			};
		function p() {
			return "u" > typeof self ? self : "u" > typeof window ? window : e.g;
		}
		const g = () => {
				try {
					return (
						p().__FIREBASE_DEFAULTS__ ||
						(() => {
							if (void 0 === a.default || void 0 === a.default.env) return;
							const e = a.default.env.__FIREBASE_DEFAULTS__;
							if (e) return JSON.parse(e);
						})() ||
						(() => {
							let e;
							if ("u" < typeof document) return;
							try {
								e = document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/);
							} catch (e) {
								return;
							}
							const t = e && f(e[1]);
							return t && JSON.parse(t);
						})()
					);
				} catch (e) {
					console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${e}`);
					return;
				}
			},
			m = (e) => {
				var t, r;
				return null == (r = null == (t = g()) ? void 0 : t.emulatorHosts)
					? void 0
					: r[e];
			},
			y = (e) => {
				const t = m(e);
				if (!t) return;
				const r = t.lastIndexOf(":");
				if (r <= 0 || r + 1 === t.length)
					throw Error(`Invalid host ${t} with no separate hostname and port!`);
				const n = parseInt(t.substring(r + 1), 10);
				return "[" === t[0]
					? [t.substring(1, r - 1), n]
					: [t.substring(0, r), n];
			},
			v = () => {
				var e;
				return null == (e = g()) ? void 0 : e.config;
			},
			w = (e) => {
				var t;
				return null == (t = g()) ? void 0 : t[`_${e}`];
			};
		class _ {
			constructor() {
				(this.reject = () => {}),
					(this.resolve = () => {}),
					(this.promise = new Promise((e, t) => {
						(this.resolve = e), (this.reject = t);
					}));
			}
			wrapCallback(e) {
				return (t, r) => {
					t ? this.reject(t) : this.resolve(r),
						"function" == typeof e &&
							(this.promise.catch(() => {}), 1 === e.length ? e(t) : e(t, r));
				};
			}
		}
		function E(e) {
			try {
				return (
					e.startsWith("http://") || e.startsWith("https://")
						? new URL(e).hostname
						: e
				).endsWith(".cloudworkstations.dev");
			} catch (e) {
				return !1;
			}
		}
		async function b(e) {
			return (await fetch(e, { credentials: "include" })).ok;
		}
		function I(e, t) {
			if (e.uid)
				throw Error(
					'The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.',
				);
			const r = t || "demo-project",
				n = e.iat || 0,
				i = e.sub || e.user_id;
			if (!i)
				throw Error("mockUserToken must contain 'sub' or 'user_id' field!");
			const s = Object.assign(
				{
					iss: `https://securetoken.google.com/${r}`,
					aud: r,
					iat: n,
					exp: n + 3600,
					auth_time: n,
					sub: i,
					user_id: i,
					firebase: { sign_in_provider: "custom", identities: {} },
				},
				e,
			);
			return [
				d(JSON.stringify({ alg: "none", type: "JWT" })),
				d(JSON.stringify(s)),
				"",
			].join(".");
		}
		let T = {},
			S = !1;
		function C(e, t) {
			if (
				"u" < typeof window ||
				"u" < typeof document ||
				!E(window.location.host) ||
				T[e] === t ||
				T[e] ||
				S
			)
				return;
			function r(e) {
				return `__firebase__banner__${e}`;
			}
			T[e] = t;
			const n = "__firebase__banner",
				i =
					(() => {
						const e = { prod: [], emulator: [] };
						for (const t of Object.keys(T))
							T[t] ? e.emulator.push(t) : e.prod.push(t);
						return e;
					})().prod.length > 0;
			function s() {
				let e,
					t,
					s =
						((e = document.getElementById(n)),
						(t = !1),
						e ||
							((e = document.createElement("div")).setAttribute("id", n),
							(t = !0)),
						{ created: t, element: e }),
					a = r("text"),
					o = document.getElementById(a) || document.createElement("span"),
					l = r("learnmore"),
					u = document.getElementById(l) || document.createElement("a"),
					h = r("preprendIcon"),
					c =
						document.getElementById(h) ||
						document.createElementNS("http://www.w3.org/2000/svg", "svg");
				if (s.created) {
					let e,
						t = s.element;
					(t.style.display = "flex"),
						(t.style.background = "#7faaf0"),
						(t.style.position = "fixed"),
						(t.style.bottom = "5px"),
						(t.style.left = "5px"),
						(t.style.padding = ".5em"),
						(t.style.borderRadius = "5px"),
						(t.style.alignItems = "center"),
						u.setAttribute("id", l),
						(u.innerText = "Learn more"),
						(u.href =
							"https://firebase.google.com/docs/studio/preview-apps#preview-backend"),
						u.setAttribute("target", "__blank"),
						(u.style.paddingLeft = "5px"),
						(u.style.textDecoration = "underline");
					const r =
						(((e = document.createElement("span")).style.cursor = "pointer"),
						(e.style.marginLeft = "16px"),
						(e.style.fontSize = "24px"),
						(e.innerHTML = " &times;"),
						(e.onclick = () => {
							let e;
							(S = !0), (e = document.getElementById(n)) && e.remove();
						}),
						e);
					c.setAttribute("width", "24"),
						c.setAttribute("id", h),
						c.setAttribute("height", "24"),
						c.setAttribute("viewBox", "0 0 24 24"),
						c.setAttribute("fill", "none"),
						(c.style.marginLeft = "-6px"),
						t.append(c, o, u, r),
						document.body.appendChild(t);
				}
				i
					? ((o.innerText = "Preview backend disconnected."),
						(c.innerHTML = `<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`))
					: ((c.innerHTML = `<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`),
						(o.innerText = "Preview backend running in this workspace.")),
					o.setAttribute("id", a);
			}
			"loading" === document.readyState
				? window.addEventListener("DOMContentLoaded", s)
				: s();
		}
		function A() {
			return "u" > typeof navigator && "string" == typeof navigator.userAgent
				? navigator.userAgent
				: "";
		}
		function k() {
			return (
				"u" > typeof window &&
				!!(window.cordova || window.phonegap || window.PhoneGap) &&
				/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(A())
			);
		}
		function R() {
			var t;
			const r = null == (t = g()) ? void 0 : t.forceEnvironment;
			if ("node" === r) return !0;
			if ("browser" === r) return !1;
			try {
				return (
					"[object process]" === Object.prototype.toString.call(e.g.process)
				);
			} catch (e) {
				return !1;
			}
		}
		function N() {
			return "u" > typeof window || D();
		}
		function D() {
			return (
				"u" > typeof WorkerGlobalScope &&
				"u" > typeof self &&
				self instanceof WorkerGlobalScope
			);
		}
		function O() {
			return (
				"u" > typeof navigator && "Cloudflare-Workers" === navigator.userAgent
			);
		}
		function P() {
			const e =
				"object" == typeof chrome
					? chrome.runtime
					: "object" == typeof browser
						? browser.runtime
						: void 0;
			return "object" == typeof e && void 0 !== e.id;
		}
		function x() {
			return (
				"object" == typeof navigator && "ReactNative" === navigator.product
			);
		}
		function L() {
			const e = A();
			return e.indexOf("MSIE ") >= 0 || e.indexOf("Trident/") >= 0;
		}
		function M() {
			return (
				!R() &&
				!!navigator.userAgent &&
				navigator.userAgent.includes("Safari") &&
				!navigator.userAgent.includes("Chrome")
			);
		}
		function U() {
			return (
				!R() &&
				!!navigator.userAgent &&
				(navigator.userAgent.includes("Safari") ||
					navigator.userAgent.includes("WebKit")) &&
				!navigator.userAgent.includes("Chrome")
			);
		}
		function V() {
			try {
				return "object" == typeof indexedDB;
			} catch (e) {
				return !1;
			}
		}
		function F() {
			return new Promise((e, t) => {
				try {
					let r = !0,
						n = "validate-browser-context-for-indexeddb-analytics-module",
						i = self.indexedDB.open(n);
					(i.onsuccess = () => {
						i.result.close(), r || self.indexedDB.deleteDatabase(n), e(!0);
					}),
						(i.onupgradeneeded = () => {
							r = !1;
						}),
						(i.onerror = () => {
							var e;
							t((null == (e = i.error) ? void 0 : e.message) || "");
						});
				} catch (e) {
					t(e);
				}
			});
		}
		class j extends Error {
			constructor(e, t, r) {
				super(t),
					(this.code = e),
					(this.customData = r),
					(this.name = "FirebaseError"),
					Object.setPrototypeOf(this, j.prototype),
					Error.captureStackTrace &&
						Error.captureStackTrace(this, B.prototype.create);
			}
		}
		class B {
			constructor(e, t, r) {
				(this.service = e), (this.serviceName = t), (this.errors = r);
			}
			create(e, ...t) {
				var r, n;
				const i = t[0] || {},
					s = `${this.service}/${e}`,
					a = this.errors[e],
					o = a
						? ((r = a),
							(n = i),
							r.replace(q, (e, t) => {
								const r = n[t];
								return null != r ? String(r) : `<${t}?>`;
							}))
						: "Error",
					l = `${this.serviceName}: ${o} (${s}).`;
				return new j(s, l, i);
			}
		}
		const q = /\{\$([^}]+)}/g;
		function $(e) {
			for (const t in e) if (Object.hasOwn(e, t)) return !1;
			return !0;
		}
		function z(e, t) {
			if (e === t) return !0;
			const r = Object.keys(e),
				n = Object.keys(t);
			for (const i of r) {
				if (!n.includes(i)) return !1;
				const r = e[i],
					s = t[i];
				if (H(r) && H(s)) {
					if (!z(r, s)) return !1;
				} else if (r !== s) return !1;
			}
			for (const e of n) if (!r.includes(e)) return !1;
			return !0;
		}
		function H(e) {
			return null !== e && "object" == typeof e;
		}
		function G(e) {
			const t = [];
			for (const [r, n] of Object.entries(e))
				Array.isArray(n)
					? n.forEach((e) => {
							t.push(encodeURIComponent(r) + "=" + encodeURIComponent(e));
						})
					: t.push(encodeURIComponent(r) + "=" + encodeURIComponent(n));
			return t.length ? "&" + t.join("&") : "";
		}
		function K(e) {
			const t = {};
			return (
				e
					.replace(/^\?/, "")
					.split("&")
					.forEach((e) => {
						if (e) {
							const [r, n] = e.split("=");
							t[decodeURIComponent(r)] = decodeURIComponent(n);
						}
					}),
				t
			);
		}
		function W(e) {
			const t = e.indexOf("?");
			if (!t) return "";
			const r = e.indexOf("#", t);
			return e.substring(t, r > 0 ? r : void 0);
		}
		function Q(e, t) {
			const r = new J(e, t);
			return r.subscribe.bind(r);
		}
		class J {
			constructor(e, t) {
				(this.observers = []),
					(this.unsubscribes = []),
					(this.observerCount = 0),
					(this.task = Promise.resolve()),
					(this.finalized = !1),
					(this.onNoObservers = t),
					this.task
						.then(() => {
							e(this);
						})
						.catch((e) => {
							this.error(e);
						});
			}
			next(e) {
				this.forEachObserver((t) => {
					t.next(e);
				});
			}
			error(e) {
				this.forEachObserver((t) => {
					t.error(e);
				}),
					this.close(e);
			}
			complete() {
				this.forEachObserver((e) => {
					e.complete();
				}),
					this.close();
			}
			subscribe(e, t, r) {
				let n;
				if (void 0 === e && void 0 === t && void 0 === r)
					throw Error("Missing Observer.");
				void 0 ===
					(n = !((e, t) => {
						if ("object" != typeof e || null === e) return !1;
						for (const r of t)
							if (r in e && "function" == typeof e[r]) return !0;
						return !1;
					})(e, ["next", "error", "complete"])
						? { next: e, error: t, complete: r }
						: e).next && (n.next = X),
					void 0 === n.error && (n.error = X),
					void 0 === n.complete && (n.complete = X);
				const i = this.unsubscribeOne.bind(this, this.observers.length);
				return (
					this.finalized &&
						this.task.then(() => {
							try {
								this.finalError ? n.error(this.finalError) : n.complete();
							} catch (e) {}
						}),
					this.observers.push(n),
					i
				);
			}
			unsubscribeOne(e) {
				void 0 !== this.observers &&
					void 0 !== this.observers[e] &&
					(delete this.observers[e],
					(this.observerCount -= 1),
					0 === this.observerCount &&
						void 0 !== this.onNoObservers &&
						this.onNoObservers(this));
			}
			forEachObserver(e) {
				if (!this.finalized)
					for (let t = 0; t < this.observers.length; t++) this.sendOne(t, e);
			}
			sendOne(e, t) {
				this.task.then(() => {
					if (void 0 !== this.observers && void 0 !== this.observers[e])
						try {
							t(this.observers[e]);
						} catch (e) {
							"u" > typeof console && console.error && console.error(e);
						}
				});
			}
			close(e) {
				this.finalized ||
					((this.finalized = !0),
					void 0 !== e && (this.finalError = e),
					this.task.then(() => {
						(this.observers = void 0), (this.onNoObservers = void 0);
					}));
			}
		}
		function X() {}
		function Y(e) {
			return e && e._delegate ? e._delegate : e;
		}
		e.s(
			[
				"Deferred",
				() => _,
				"ErrorFactory",
				() => B,
				"FirebaseError",
				() => j,
				"base64Decode",
				() => f,
				"base64urlEncodeWithoutPadding",
				() => d,
				"createMockUserToken",
				() => I,
				"createSubscribe",
				() => Q,
				"deepEqual",
				() => z,
				"extractQuerystring",
				() => W,
				"getDefaultAppConfig",
				() => v,
				"getDefaultEmulatorHost",
				() => m,
				"getDefaultEmulatorHostnameAndPort",
				() => y,
				"getExperimentalSetting",
				() => w,
				"getGlobal",
				() => p,
				"getModularInstance",
				() => Y,
				"getUA",
				() => A,
				"isBrowser",
				() => N,
				"isBrowserExtension",
				() => P,
				"isCloudWorkstation",
				() => E,
				"isCloudflareWorker",
				() => O,
				"isEmpty",
				() => $,
				"isIE",
				() => L,
				"isIndexedDBAvailable",
				() => V,
				"isMobileCordova",
				() => k,
				"isReactNative",
				() => x,
				"isSafari",
				() => M,
				"isSafariOrWebkit",
				() => U,
				"isWebWorker",
				() => D,
				"pingServer",
				() => b,
				"querystring",
				() => G,
				"querystringDecode",
				() => K,
				"updateEmulatorBanner",
				() => C,
				"validateIndexedDBOpenable",
				() => F,
			],
			81673,
		);
		class Z {
			constructor(e, t, r) {
				(this.name = e),
					(this.instanceFactory = t),
					(this.type = r),
					(this.multipleInstances = !1),
					(this.serviceProps = {}),
					(this.instantiationMode = "LAZY"),
					(this.onInstanceCreated = null);
			}
			setInstantiationMode(e) {
				return (this.instantiationMode = e), this;
			}
			setMultipleInstances(e) {
				return (this.multipleInstances = e), this;
			}
			setServiceProps(e) {
				return (this.serviceProps = e), this;
			}
			setInstanceCreatedCallback(e) {
				return (this.onInstanceCreated = e), this;
			}
		}
		const ee = "[DEFAULT]";
		class et {
			constructor(e, t) {
				(this.name = e),
					(this.container = t),
					(this.component = null),
					(this.instances = new Map()),
					(this.instancesDeferred = new Map()),
					(this.instancesOptions = new Map()),
					(this.onInitCallbacks = new Map());
			}
			get(e) {
				const t = this.normalizeInstanceIdentifier(e);
				if (!this.instancesDeferred.has(t)) {
					const e = new _();
					if (
						(this.instancesDeferred.set(t, e),
						this.isInitialized(t) || this.shouldAutoInitialize())
					)
						try {
							const r = this.getOrInitializeService({ instanceIdentifier: t });
							r && e.resolve(r);
						} catch (e) {}
				}
				return this.instancesDeferred.get(t).promise;
			}
			getImmediate(e) {
				var t;
				const r = this.normalizeInstanceIdentifier(
						null == e ? void 0 : e.identifier,
					),
					n = null != (t = null == e ? void 0 : e.optional) && t;
				if (this.isInitialized(r) || this.shouldAutoInitialize())
					try {
						return this.getOrInitializeService({ instanceIdentifier: r });
					} catch (e) {
						if (n) return null;
						throw e;
					}
				if (n) return null;
				throw Error(`Service ${this.name} is not available`);
			}
			getComponent() {
				return this.component;
			}
			setComponent(e) {
				if (e.name !== this.name)
					throw Error(
						`Mismatching Component ${e.name} for Provider ${this.name}.`,
					);
				if (this.component)
					throw Error(`Component for ${this.name} has already been provided`);
				if (((this.component = e), this.shouldAutoInitialize())) {
					if ("EAGER" === e.instantiationMode)
						try {
							this.getOrInitializeService({ instanceIdentifier: ee });
						} catch (e) {}
					for (const [e, t] of this.instancesDeferred.entries()) {
						const r = this.normalizeInstanceIdentifier(e);
						try {
							const e = this.getOrInitializeService({ instanceIdentifier: r });
							t.resolve(e);
						} catch (e) {}
					}
				}
			}
			clearInstance(e = ee) {
				this.instancesDeferred.delete(e),
					this.instancesOptions.delete(e),
					this.instances.delete(e);
			}
			async delete() {
				const e = Array.from(this.instances.values());
				await Promise.all([
					...e.filter((e) => "INTERNAL" in e).map((e) => e.INTERNAL.delete()),
					...e.filter((e) => "_delete" in e).map((e) => e._delete()),
				]);
			}
			isComponentSet() {
				return null != this.component;
			}
			isInitialized(e = ee) {
				return this.instances.has(e);
			}
			getOptions(e = ee) {
				return this.instancesOptions.get(e) || {};
			}
			initialize(e = {}) {
				const { options: t = {} } = e,
					r = this.normalizeInstanceIdentifier(e.instanceIdentifier);
				if (this.isInitialized(r))
					throw Error(`${this.name}(${r}) has already been initialized`);
				if (!this.isComponentSet())
					throw Error(`Component ${this.name} has not been registered yet`);
				const n = this.getOrInitializeService({
					instanceIdentifier: r,
					options: t,
				});
				for (const [e, t] of this.instancesDeferred.entries())
					r === this.normalizeInstanceIdentifier(e) && t.resolve(n);
				return n;
			}
			onInit(e, t) {
				var r;
				const n = this.normalizeInstanceIdentifier(t),
					i = null != (r = this.onInitCallbacks.get(n)) ? r : new Set();
				i.add(e), this.onInitCallbacks.set(n, i);
				const s = this.instances.get(n);
				return (
					s && e(s, n),
					() => {
						i.delete(e);
					}
				);
			}
			invokeOnInitCallbacks(e, t) {
				const r = this.onInitCallbacks.get(t);
				if (r)
					for (const n of r)
						try {
							n(e, t);
						} catch (e) {}
			}
			getOrInitializeService({ instanceIdentifier: e, options: t = {} }) {
				var r;
				let n = this.instances.get(e);
				if (
					!n &&
					this.component &&
					((n = this.component.instanceFactory(this.container, {
						instanceIdentifier: (r = e) === ee ? void 0 : r,
						options: t,
					})),
					this.instances.set(e, n),
					this.instancesOptions.set(e, t),
					this.invokeOnInitCallbacks(n, e),
					this.component.onInstanceCreated)
				)
					try {
						this.component.onInstanceCreated(this.container, e, n);
					} catch (e) {}
				return n || null;
			}
			normalizeInstanceIdentifier(e = ee) {
				return this.component ? (this.component.multipleInstances ? e : ee) : e;
			}
			shouldAutoInitialize() {
				return (
					!!this.component && "EXPLICIT" !== this.component.instantiationMode
				);
			}
		}
		class er {
			constructor(e) {
				(this.name = e), (this.providers = new Map());
			}
			addComponent(e) {
				const t = this.getProvider(e.name);
				if (t.isComponentSet())
					throw Error(
						`Component ${e.name} has already been registered with ${this.name}`,
					);
				t.setComponent(e);
			}
			addOrOverwriteComponent(e) {
				this.getProvider(e.name).isComponentSet() &&
					this.providers.delete(e.name),
					this.addComponent(e);
			}
			getProvider(e) {
				if (this.providers.has(e)) return this.providers.get(e);
				const t = new et(e, this);
				return this.providers.set(e, t), t;
			}
			getProviders() {
				return Array.from(this.providers.values());
			}
		}
		e.s(["Component", () => Z, "ComponentContainer", () => er], 81879);
		const en = [];
		((i = s || (s = {}))[(i.DEBUG = 0)] = "DEBUG"),
			(i[(i.VERBOSE = 1)] = "VERBOSE"),
			(i[(i.INFO = 2)] = "INFO"),
			(i[(i.WARN = 3)] = "WARN"),
			(i[(i.ERROR = 4)] = "ERROR"),
			(i[(i.SILENT = 5)] = "SILENT");
		const ei = {
				debug: s.DEBUG,
				verbose: s.VERBOSE,
				info: s.INFO,
				warn: s.WARN,
				error: s.ERROR,
				silent: s.SILENT,
			},
			es = s.INFO,
			ea = {
				[s.DEBUG]: "log",
				[s.VERBOSE]: "log",
				[s.INFO]: "info",
				[s.WARN]: "warn",
				[s.ERROR]: "error",
			},
			eo = (e, t, ...r) => {
				if (t < e.logLevel) return;
				const n = new Date().toISOString(),
					i = ea[t];
				if (i) console[i](`[${n}]  ${e.name}:`, ...r);
				else
					throw Error(
						`Attempted to log a message with an invalid logType (value: ${t})`,
					);
			};
		class el {
			constructor(e) {
				(this.name = e),
					(this._logLevel = es),
					(this._logHandler = eo),
					(this._userLogHandler = null),
					en.push(this);
			}
			get logLevel() {
				return this._logLevel;
			}
			set logLevel(e) {
				if (!(e in s))
					throw TypeError(`Invalid value "${e}" assigned to \`logLevel\``);
				this._logLevel = e;
			}
			setLogLevel(e) {
				this._logLevel = "string" == typeof e ? ei[e] : e;
			}
			get logHandler() {
				return this._logHandler;
			}
			set logHandler(e) {
				if ("function" != typeof e)
					throw TypeError("Value assigned to `logHandler` must be a function");
				this._logHandler = e;
			}
			get userLogHandler() {
				return this._userLogHandler;
			}
			set userLogHandler(e) {
				this._userLogHandler = e;
			}
			debug(...e) {
				this._userLogHandler && this._userLogHandler(this, s.DEBUG, ...e),
					this._logHandler(this, s.DEBUG, ...e);
			}
			log(...e) {
				this._userLogHandler && this._userLogHandler(this, s.VERBOSE, ...e),
					this._logHandler(this, s.VERBOSE, ...e);
			}
			info(...e) {
				this._userLogHandler && this._userLogHandler(this, s.INFO, ...e),
					this._logHandler(this, s.INFO, ...e);
			}
			warn(...e) {
				this._userLogHandler && this._userLogHandler(this, s.WARN, ...e),
					this._logHandler(this, s.WARN, ...e);
			}
			error(...e) {
				this._userLogHandler && this._userLogHandler(this, s.ERROR, ...e),
					this._logHandler(this, s.ERROR, ...e);
			}
		}
		function eu(e) {
			en.forEach((t) => {
				t.setLogLevel(e);
			});
		}
		function eh(e, t) {
			for (const r of en) {
				let n = null;
				t && t.level && (n = ei[t.level]),
					null === e
						? (r.userLogHandler = null)
						: (r.userLogHandler = (t, r, ...i) => {
								const a = i
									.map((e) => {
										if (null == e) return null;
										if ("string" == typeof e) return e;
										if ("number" == typeof e || "boolean" == typeof e)
											return e.toString();
										if (e instanceof Error) return e.message;
										try {
											return JSON.stringify(e);
										} catch (e) {
											return null;
										}
									})
									.filter((e) => e)
									.join(" ");
								r >= (null != n ? n : t.logLevel) &&
									e({
										level: s[r].toLowerCase(),
										message: a,
										args: i,
										type: t.name,
									});
							});
			}
		}
		e.s(
			[
				"LogLevel",
				() => s,
				"Logger",
				() => el,
				"setLogLevel",
				() => eu,
				"setUserLogHandler",
				() => eh,
			],
			63971,
		);
		let ec = new WeakMap(),
			ed = new WeakMap(),
			ef = new WeakMap(),
			ep = new WeakMap(),
			eg = new WeakMap(),
			em = {
				get(e, t, r) {
					if (e instanceof IDBTransaction) {
						if ("done" === t) return ed.get(e);
						if ("objectStoreNames" === t)
							return e.objectStoreNames || ef.get(e);
						if ("store" === t)
							return r.objectStoreNames[1]
								? void 0
								: r.objectStore(r.objectStoreNames[0]);
					}
					return ey(e[t]);
				},
				set: (e, t, r) => ((e[t] = r), !0),
				has: (e, t) =>
					(e instanceof IDBTransaction && ("done" === t || "store" === t)) ||
					t in e,
			};
		function ey(e) {
			if (e instanceof IDBRequest) {
				let t;
				return (
					(t = new Promise((t, r) => {
						const n = () => {
								e.removeEventListener("success", i),
									e.removeEventListener("error", s);
							},
							i = () => {
								t(ey(e.result)), n();
							},
							s = () => {
								r(e.error), n();
							};
						e.addEventListener("success", i), e.addEventListener("error", s);
					}))
						.then((t) => {
							t instanceof IDBCursor && ec.set(t, e);
						})
						.catch(() => {}),
					eg.set(t, e),
					t
				);
			}
			if (ep.has(e)) return ep.get(e);
			const n = ((e) => {
				if ("function" == typeof e)
					return e !== IDBDatabase.prototype.transaction ||
						"objectStoreNames" in IDBTransaction.prototype
						? (
								r ||
								(r = [
									IDBCursor.prototype.advance,
									IDBCursor.prototype.continue,
									IDBCursor.prototype.continuePrimaryKey,
								])
							).includes(e)
							? function (...t) {
									return e.apply(ev(this), t), ey(ec.get(this));
								}
							: function (...t) {
									return ey(e.apply(ev(this), t));
								}
						: function (t, ...r) {
								const n = e.call(ev(this), t, ...r);
								return ef.set(n, t.sort ? t.sort() : [t]), ey(n);
							};
				return (
					e instanceof IDBTransaction &&
						((e) => {
							if (ed.has(e)) return;
							const t = new Promise((t, r) => {
								const n = () => {
										e.removeEventListener("complete", i),
											e.removeEventListener("error", s),
											e.removeEventListener("abort", s);
									},
									i = () => {
										t(), n();
									},
									s = () => {
										r(e.error || new DOMException("AbortError", "AbortError")),
											n();
									};
								e.addEventListener("complete", i),
									e.addEventListener("error", s),
									e.addEventListener("abort", s);
							});
							ed.set(e, t);
						})(e),
					(
						t ||
						(t = [
							IDBDatabase,
							IDBObjectStore,
							IDBIndex,
							IDBCursor,
							IDBTransaction,
						])
					).some((t) => e instanceof t)
						? new Proxy(e, em)
						: e
				);
			})(e);
			return n !== e && (ep.set(e, n), eg.set(n, e)), n;
		}
		const ev = (e) => eg.get(e),
			ew = ["get", "getKey", "getAll", "getAllKeys", "count"],
			e_ = ["put", "add", "delete", "clear"],
			eE = new Map();
		function eb(e, t) {
			if (!(e instanceof IDBDatabase && !(t in e) && "string" == typeof t))
				return;
			if (eE.get(t)) return eE.get(t);
			const r = t.replace(/FromIndex$/, ""),
				n = t !== r,
				i = e_.includes(r);
			if (
				!(r in (n ? IDBIndex : IDBObjectStore).prototype) ||
				!(i || ew.includes(r))
			)
				return;
			const s = async function (e, ...t) {
				let s = this.transaction(e, i ? "readwrite" : "readonly"),
					a = s.store;
				return (
					n && (a = a.index(t.shift())),
					(await Promise.all([a[r](...t), i && s.done]))[0]
				);
			};
			return eE.set(t, s), s;
		}
		em = {
			...(n = em),
			get: (e, t, r) => eb(e, t) || n.get(e, t, r),
			has: (e, t) => !!eb(e, t) || n.has(e, t),
		};
		class eI {
			constructor(e) {
				this.container = e;
			}
			getPlatformInfoString() {
				return this.container
					.getProviders()
					.map((e) => {
						let t;
						if (
							(null == (t = e.getComponent()) ? void 0 : t.type) !== "VERSION"
						)
							return null;
						{
							const t = e.getImmediate();
							return `${t.library}/${t.version}`;
						}
					})
					.filter((e) => e)
					.join(" ");
			}
		}
		const eT = "@firebase/app",
			eS = "0.13.2",
			eC = new el("@firebase/app"),
			eA = "[DEFAULT]",
			ek = {
				[eT]: "fire-core",
				"@firebase/app-compat": "fire-core-compat",
				"@firebase/analytics": "fire-analytics",
				"@firebase/analytics-compat": "fire-analytics-compat",
				"@firebase/app-check": "fire-app-check",
				"@firebase/app-check-compat": "fire-app-check-compat",
				"@firebase/auth": "fire-auth",
				"@firebase/auth-compat": "fire-auth-compat",
				"@firebase/database": "fire-rtdb",
				"@firebase/data-connect": "fire-data-connect",
				"@firebase/database-compat": "fire-rtdb-compat",
				"@firebase/functions": "fire-fn",
				"@firebase/functions-compat": "fire-fn-compat",
				"@firebase/installations": "fire-iid",
				"@firebase/installations-compat": "fire-iid-compat",
				"@firebase/messaging": "fire-fcm",
				"@firebase/messaging-compat": "fire-fcm-compat",
				"@firebase/performance": "fire-perf",
				"@firebase/performance-compat": "fire-perf-compat",
				"@firebase/remote-config": "fire-rc",
				"@firebase/remote-config-compat": "fire-rc-compat",
				"@firebase/storage": "fire-gcs",
				"@firebase/storage-compat": "fire-gcs-compat",
				"@firebase/firestore": "fire-fst",
				"@firebase/firestore-compat": "fire-fst-compat",
				"@firebase/ai": "fire-vertex",
				"fire-js": "fire-js",
				firebase: "fire-js-all",
			},
			eR = new Map(),
			eN = new Map(),
			eD = new Map();
		function eO(e, t) {
			try {
				e.container.addComponent(t);
			} catch (r) {
				eC.debug(
					`Component ${t.name} failed to register with FirebaseApp ${e.name}`,
					r,
				);
			}
		}
		function eP(e, t) {
			e.container.addOrOverwriteComponent(t);
		}
		function ex(e) {
			const t = e.name;
			if (eD.has(t))
				return (
					eC.debug(`There were multiple attempts to register component ${t}.`),
					!1
				);
			for (const r of (eD.set(t, e), eR.values())) eO(r, e);
			for (const t of eN.values()) eO(t, e);
			return !0;
		}
		function eL(e, t) {
			const r = e.container
				.getProvider("heartbeat")
				.getImmediate({ optional: !0 });
			return r && r.triggerHeartbeat(), e.container.getProvider(t);
		}
		function eM(e, t, r = eA) {
			eL(e, t).clearInstance(r);
		}
		function eU(e) {
			return void 0 !== e.options;
		}
		function eV(e) {
			return null != e && void 0 !== e.settings;
		}
		function eF() {
			eD.clear();
		}
		const ej = new B("app", "Firebase", {
			"no-app":
				"No Firebase App '{$appName}' has been created - call initializeApp() first",
			"bad-app-name": "Illegal App name: '{$appName}'",
			"duplicate-app":
				"Firebase App named '{$appName}' already exists with different options or config",
			"app-deleted": "Firebase App named '{$appName}' already deleted",
			"server-app-deleted": "Firebase Server App has been deleted",
			"no-options":
				"Need to provide options, when not being deployed to hosting via source.",
			"invalid-app-argument":
				"firebase.{$appName}() takes either no argument or a Firebase App instance.",
			"invalid-log-argument":
				"First argument to `onLog` must be null or a function.",
			"idb-open":
				"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.",
			"idb-get":
				"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.",
			"idb-set":
				"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.",
			"idb-delete":
				"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.",
			"finalization-registry-not-supported":
				"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.",
			"invalid-server-app-environment":
				"FirebaseServerApp is not for use in browser environments.",
		});
		class eB {
			constructor(e, t, r) {
				(this._isDeleted = !1),
					(this._options = Object.assign({}, e)),
					(this._config = Object.assign({}, t)),
					(this._name = t.name),
					(this._automaticDataCollectionEnabled =
						t.automaticDataCollectionEnabled),
					(this._container = r),
					this.container.addComponent(new Z("app", () => this, "PUBLIC"));
			}
			get automaticDataCollectionEnabled() {
				return this.checkDestroyed(), this._automaticDataCollectionEnabled;
			}
			set automaticDataCollectionEnabled(e) {
				this.checkDestroyed(), (this._automaticDataCollectionEnabled = e);
			}
			get name() {
				return this.checkDestroyed(), this._name;
			}
			get options() {
				return this.checkDestroyed(), this._options;
			}
			get config() {
				return this.checkDestroyed(), this._config;
			}
			get container() {
				return this._container;
			}
			get isDeleted() {
				return this._isDeleted;
			}
			set isDeleted(e) {
				this._isDeleted = e;
			}
			checkDestroyed() {
				if (this.isDeleted)
					throw ej.create("app-deleted", { appName: this._name });
			}
		}
		function eq(e, t) {
			const r = f(e.split(".")[1]);
			null === r
				? console.error(
						`FirebaseServerApp ${t} is invalid: second part could not be parsed.`,
					)
				: void 0 === JSON.parse(r).exp
					? console.error(
							`FirebaseServerApp ${t} is invalid: expiration claim could not be parsed`,
						)
					: 1e3 * JSON.parse(r).exp - new Date().getTime() <= 0 &&
						console.error(
							`FirebaseServerApp ${t} is invalid: the token has expired.`,
						);
		}
		class e$ extends eB {
			constructor(e, t, r, n) {
				const i =
						void 0 === t.automaticDataCollectionEnabled ||
						t.automaticDataCollectionEnabled,
					s = { name: r, automaticDataCollectionEnabled: i };
				void 0 !== e.apiKey ? super(e, s, n) : super(e.options, s, n),
					(this._serverConfig = Object.assign(
						{ automaticDataCollectionEnabled: i },
						t,
					)),
					this._serverConfig.authIdToken &&
						eq(this._serverConfig.authIdToken, "authIdToken"),
					this._serverConfig.appCheckToken &&
						eq(this._serverConfig.appCheckToken, "appCheckToken"),
					(this._finalizationRegistry = null),
					"u" > typeof FinalizationRegistry &&
						(this._finalizationRegistry = new FinalizationRegistry(() => {
							this.automaticCleanup();
						})),
					(this._refCount = 0),
					this.incRefCount(this._serverConfig.releaseOnDeref),
					(this._serverConfig.releaseOnDeref = void 0),
					(t.releaseOnDeref = void 0),
					eQ(eT, eS, "serverapp");
			}
			toJSON() {}
			get refCount() {
				return this._refCount;
			}
			incRefCount(e) {
				this.isDeleted ||
					(this._refCount++,
					void 0 !== e &&
						null !== this._finalizationRegistry &&
						this._finalizationRegistry.register(e, this));
			}
			decRefCount() {
				return this.isDeleted ? 0 : --this._refCount;
			}
			automaticCleanup() {
				eW(this);
			}
			get settings() {
				return this.checkDestroyed(), this._serverConfig;
			}
			checkDestroyed() {
				if (this.isDeleted) throw ej.create("server-app-deleted");
			}
		}
		function ez(e, t = {}) {
			let r = e;
			"object" != typeof t && (t = { name: t });
			const n = Object.assign(
					{ name: eA, automaticDataCollectionEnabled: !0 },
					t,
				),
				i = n.name;
			if ("string" != typeof i || !i)
				throw ej.create("bad-app-name", { appName: String(i) });
			if ((r || (r = v()), !r)) throw ej.create("no-options");
			const s = eR.get(i);
			if (s)
				if (z(r, s.options) && z(n, s.config)) return s;
				else throw ej.create("duplicate-app", { appName: i });
			const a = new er(i);
			for (const e of eD.values()) a.addComponent(e);
			const o = new eB(r, n, a);
			return eR.set(i, o), o;
		}
		function eH(e, t) {
			let r;
			if (N() && !D()) throw ej.create("invalid-server-app-environment");
			void 0 === t.automaticDataCollectionEnabled &&
				(t.automaticDataCollectionEnabled = !0),
				(r = eU(e) ? e.options : e);
			const n = Object.assign(Object.assign({}, t), r);
			if (
				(void 0 !== n.releaseOnDeref && delete n.releaseOnDeref,
				void 0 !== t.releaseOnDeref && "u" < typeof FinalizationRegistry)
			)
				throw ej.create("finalization-registry-not-supported", {});
			const i =
					"" +
					[...JSON.stringify(n)].reduce(
						(e, t) => (Math.imul(31, e) + t.charCodeAt(0)) | 0,
						0,
					),
				s = eN.get(i);
			if (s) return s.incRefCount(t.releaseOnDeref), s;
			const a = new er(i);
			for (const e of eD.values()) a.addComponent(e);
			const o = new e$(r, t, i, a);
			return eN.set(i, o), o;
		}
		function eG(e = eA) {
			const t = eR.get(e);
			if (!t && e === eA && v()) return ez();
			if (!t) throw ej.create("no-app", { appName: e });
			return t;
		}
		function eK() {
			return Array.from(eR.values());
		}
		async function eW(e) {
			let t = !1,
				r = e.name;
			eR.has(r)
				? ((t = !0), eR.delete(r))
				: eN.has(r) && 0 >= e.decRefCount() && (eN.delete(r), (t = !0)),
				t &&
					(await Promise.all(e.container.getProviders().map((e) => e.delete())),
					(e.isDeleted = !0));
		}
		function eQ(e, t, r) {
			var n;
			let i = null != (n = ek[e]) ? n : e;
			r && (i += `-${r}`);
			const s = i.match(/\s|\//),
				a = t.match(/\s|\//);
			if (s || a) {
				const e = [`Unable to register library "${i}" with version "${t}":`];
				s &&
					e.push(
						`library name "${i}" contains illegal characters (whitespace or "/")`,
					),
					s && a && e.push("and"),
					a &&
						e.push(
							`version name "${t}" contains illegal characters (whitespace or "/")`,
						),
					eC.warn(e.join(" "));
				return;
			}
			ex(new Z(`${i}-version`, () => ({ library: i, version: t }), "VERSION"));
		}
		function eJ(e, t) {
			if (null !== e && "function" != typeof e)
				throw ej.create("invalid-log-argument");
			eh(e, t);
		}
		function eX(e) {
			eu(e);
		}
		let eY = "firebase-heartbeat-store",
			eZ = null;
		function e0() {
			return (
				eZ ||
					(eZ = ((
						e,
						t,
						{ blocked: r, upgrade: n, blocking: i, terminated: s } = {},
					) => {
						const a = indexedDB.open(e, 1),
							o = ey(a);
						return (
							n &&
								a.addEventListener("upgradeneeded", (e) => {
									n(
										ey(a.result),
										e.oldVersion,
										e.newVersion,
										ey(a.transaction),
										e,
									);
								}),
							r &&
								a.addEventListener("blocked", (e) =>
									r(e.oldVersion, e.newVersion, e),
								),
							o
								.then((e) => {
									s && e.addEventListener("close", () => s()),
										i &&
											e.addEventListener("versionchange", (e) =>
												i(e.oldVersion, e.newVersion, e),
											);
								})
								.catch(() => {}),
							o
						);
					})("firebase-heartbeat-database", 0, {
						upgrade: (e, t) => {
							if (0 === t)
								try {
									e.createObjectStore(eY);
								} catch (e) {
									console.warn(e);
								}
						},
					}).catch((e) => {
						throw ej.create("idb-open", { originalErrorMessage: e.message });
					})),
				eZ
			);
		}
		async function e1(e) {
			try {
				const t = (await e0()).transaction(eY),
					r = await t.objectStore(eY).get(e6(e));
				return await t.done, r;
			} catch (e) {
				if (e instanceof j) eC.warn(e.message);
				else {
					const t = ej.create("idb-get", {
						originalErrorMessage: null == e ? void 0 : e.message,
					});
					eC.warn(t.message);
				}
			}
		}
		async function e2(e, t) {
			try {
				const r = (await e0()).transaction(eY, "readwrite"),
					n = r.objectStore(eY);
				await n.put(t, e6(e)), await r.done;
			} catch (e) {
				if (e instanceof j) eC.warn(e.message);
				else {
					const t = ej.create("idb-set", {
						originalErrorMessage: null == e ? void 0 : e.message,
					});
					eC.warn(t.message);
				}
			}
		}
		function e6(e) {
			return `${e.name}!${e.options.appId}`;
		}
		class e3 {
			constructor(e) {
				(this.container = e), (this._heartbeatsCache = null);
				const t = this.container.getProvider("app").getImmediate();
				(this._storage = new e4(t)),
					(this._heartbeatsCachePromise = this._storage
						.read()
						.then((e) => ((this._heartbeatsCache = e), e)));
			}
			async triggerHeartbeat() {
				var e, t;
				try {
					const r = this.container
							.getProvider("platform-logger")
							.getImmediate()
							.getPlatformInfoString(),
						n = e5();
					if (
						((null == (e = this._heartbeatsCache) ? void 0 : e.heartbeats) ==
							null &&
							((this._heartbeatsCache = await this._heartbeatsCachePromise),
							(null == (t = this._heartbeatsCache) ? void 0 : t.heartbeats) ==
								null)) ||
						this._heartbeatsCache.lastSentHeartbeatDate === n ||
						this._heartbeatsCache.heartbeats.some((e) => e.date === n)
					)
						return;
					if (
						(this._heartbeatsCache.heartbeats.push({ date: n, agent: r }),
						this._heartbeatsCache.heartbeats.length > 30)
					) {
						const e = ((e) => {
							if (0 === e.length) return -1;
							let t = 0,
								r = e[0].date;
							for (let n = 1; n < e.length; n++)
								e[n].date < r && ((r = e[n].date), (t = n));
							return t;
						})(this._heartbeatsCache.heartbeats);
						this._heartbeatsCache.heartbeats.splice(e, 1);
					}
					return this._storage.overwrite(this._heartbeatsCache);
				} catch (e) {
					eC.warn(e);
				}
			}
			async getHeartbeatsHeader() {
				var e;
				try {
					if (
						(null === this._heartbeatsCache &&
							(await this._heartbeatsCachePromise),
						(null == (e = this._heartbeatsCache) ? void 0 : e.heartbeats) ==
							null || 0 === this._heartbeatsCache.heartbeats.length)
					)
						return "";
					const t = e5(),
						{ heartbeatsToSend: r, unsentEntries: n } = ((e, t = 1024) => {
							let r = [],
								n = e.slice();
							for (const i of e) {
								const e = r.find((e) => e.agent === i.agent);
								if (e) {
									if ((e.dates.push(i.date), e8(r) > t)) {
										e.dates.pop();
										break;
									}
								} else if (
									(r.push({ agent: i.agent, dates: [i.date] }), e8(r) > t)
								) {
									r.pop();
									break;
								}
								n = n.slice(1);
							}
							return { heartbeatsToSend: r, unsentEntries: n };
						})(this._heartbeatsCache.heartbeats),
						i = d(JSON.stringify({ version: 2, heartbeats: r }));
					return (
						(this._heartbeatsCache.lastSentHeartbeatDate = t),
						n.length > 0
							? ((this._heartbeatsCache.heartbeats = n),
								await this._storage.overwrite(this._heartbeatsCache))
							: ((this._heartbeatsCache.heartbeats = []),
								this._storage.overwrite(this._heartbeatsCache)),
						i
					);
				} catch (e) {
					return eC.warn(e), "";
				}
			}
		}
		function e5() {
			return new Date().toISOString().substring(0, 10);
		}
		class e4 {
			constructor(e) {
				(this.app = e),
					(this._canUseIndexedDBPromise = this.runIndexedDBEnvironmentCheck());
			}
			async runIndexedDBEnvironmentCheck() {
				return (
					!!V() &&
					F()
						.then(() => !0)
						.catch(() => !1)
				);
			}
			async read() {
				if (!(await this._canUseIndexedDBPromise)) return { heartbeats: [] };
				{
					const e = await e1(this.app);
					return (null == e ? void 0 : e.heartbeats) ? e : { heartbeats: [] };
				}
			}
			async overwrite(e) {
				var t;
				if (await this._canUseIndexedDBPromise) {
					const r = await this.read();
					return e2(this.app, {
						lastSentHeartbeatDate:
							null != (t = e.lastSentHeartbeatDate)
								? t
								: r.lastSentHeartbeatDate,
						heartbeats: e.heartbeats,
					});
				}
			}
			async add(e) {
				var t;
				if (await this._canUseIndexedDBPromise) {
					const r = await this.read();
					return e2(this.app, {
						lastSentHeartbeatDate:
							null != (t = e.lastSentHeartbeatDate)
								? t
								: r.lastSentHeartbeatDate,
						heartbeats: [...r.heartbeats, ...e.heartbeats],
					});
				}
			}
		}
		function e8(e) {
			return d(JSON.stringify({ version: 2, heartbeats: e })).length;
		}
		ex(new Z("platform-logger", (e) => new eI(e), "PRIVATE")),
			ex(new Z("heartbeat", (e) => new e3(e), "PRIVATE")),
			eQ(eT, eS, ""),
			eQ(eT, eS, "esm2017"),
			eQ("fire-js", ""),
			e.s(
				[
					"SDK_VERSION",
					() => "11.10.0",
					"_DEFAULT_ENTRY_NAME",
					() => eA,
					"_addComponent",
					() => eO,
					"_addOrOverwriteComponent",
					() => eP,
					"_apps",
					() => eR,
					"_clearComponents",
					() => eF,
					"_components",
					() => eD,
					"_getProvider",
					() => eL,
					"_isFirebaseApp",
					() => eU,
					"_isFirebaseServerApp",
					() => eV,
					"_registerComponent",
					() => ex,
					"_removeServiceInstance",
					() => eM,
					"_serverApps",
					() => eN,
					"deleteApp",
					() => eW,
					"getApp",
					() => eG,
					"getApps",
					() => eK,
					"initializeApp",
					() => ez,
					"initializeServerApp",
					() => eH,
					"onLog",
					() => eJ,
					"registerVersion",
					() => eQ,
					"setLogLevel",
					() => eX,
				],
				18044,
			);
	},
	51099,
	(e) => {
		var t,
			r = e.i(18044),
			n = e.i(81673),
			i = e.i(63971);
		function s(e, t) {
			var r = {};
			for (var n in e) Object.hasOwn(e, n) && 0 > t.indexOf(n) && (r[n] = e[n]);
			if (null != e && "function" == typeof Object.getOwnPropertySymbols)
				for (var i = 0, n = Object.getOwnPropertySymbols(e); i < n.length; i++)
					0 > t.indexOf(n[i]) &&
						Object.prototype.propertyIsEnumerable.call(e, n[i]) &&
						(r[n[i]] = e[n[i]]);
			return r;
		}
		var a =
			("function" == typeof SuppressedError && SuppressedError, e.i(81879));
		function o() {
			return {
				"dependent-sdk-initialized-before-auth":
					"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.",
			};
		}
		const l = new n.ErrorFactory("auth", "Firebase", o()),
			u = new i.Logger("@firebase/auth");
		function h(e, ...t) {
			u.logLevel <= i.LogLevel.ERROR &&
				u.error(`Auth (${r.SDK_VERSION}): ${e}`, ...t);
		}
		function c(e, ...t) {
			throw g(e, ...t);
		}
		function d(e, ...t) {
			return g(e, ...t);
		}
		function f(e, t, r) {
			const i = Object.assign(Object.assign({}, o()), { [t]: r });
			return new n.ErrorFactory("auth", "Firebase", i).create(t, {
				appName: e.name,
			});
		}
		function p(e) {
			return f(
				e,
				"operation-not-supported-in-this-environment",
				"Operations that alter the current user are not supported in conjunction with FirebaseServerApp",
			);
		}
		function g(e, ...t) {
			if ("string" != typeof e) {
				const r = t[0],
					n = [...t.slice(1)];
				return n[0] && (n[0].appName = e.name), e._errorFactory.create(r, ...n);
			}
			return l.create(e, ...t);
		}
		function m(e, t, ...r) {
			if (!e) throw g(t, ...r);
		}
		function y(e) {
			const t = "INTERNAL ASSERTION FAILED: " + e;
			throw (h(t), Error(t));
		}
		function v() {
			var e;
			return (
				("u" > typeof self &&
					(null == (e = self.location) ? void 0 : e.href)) ||
				""
			);
		}
		function w() {
			var e;
			return (
				("u" > typeof self &&
					(null == (e = self.location) ? void 0 : e.protocol)) ||
				null
			);
		}
		class _ {
			constructor(e, t) {
				var r;
				(this.shortDelay = e),
					(this.longDelay = t),
					(r = "Short delay should be less than long delay!"),
					t > e || y(r),
					(this.isMobile = (0, n.isMobileCordova)() || (0, n.isReactNative)());
			}
			get() {
				return !(
					"u" > typeof navigator &&
					navigator &&
					"onLine" in navigator &&
					"boolean" == typeof navigator.onLine &&
					("http:" === w() ||
						"https:" === w() ||
						(0, n.isBrowserExtension)() ||
						"connection" in navigator)
				) || navigator.onLine
					? this.isMobile
						? this.longDelay
						: this.shortDelay
					: Math.min(5e3, this.shortDelay);
			}
		}
		function E(e, t) {
			var r, n;
			(r = e.emulator), (n = "Emulator should always be set here"), r || y(n);
			const { url: i } = e.emulator;
			return t ? `${i}${t.startsWith("/") ? t.slice(1) : t}` : i;
		}
		class b {
			static initialize(e, t, r) {
				(b.fetchImpl = e), t && (b.headersImpl = t), r && (b.responseImpl = r);
			}
			static fetch() {
				return b.fetchImpl
					? b.fetchImpl
					: "u" > typeof self && "fetch" in self
						? self.fetch
						: "u" > typeof globalThis && globalThis.fetch
							? globalThis.fetch
							: "u" > typeof fetch
								? fetch
								: void y(
										"Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
									);
			}
			static headers() {
				return b.headersImpl
					? b.headersImpl
					: "u" > typeof self && "Headers" in self
						? self.Headers
						: "u" > typeof globalThis && globalThis.Headers
							? globalThis.Headers
							: "u" > typeof Headers
								? Headers
								: void y(
										"Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
									);
			}
			static response() {
				return b.responseImpl
					? b.responseImpl
					: "u" > typeof self && "Response" in self
						? self.Response
						: "u" > typeof globalThis && globalThis.Response
							? globalThis.Response
							: "u" > typeof Response
								? Response
								: void y(
										"Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill",
									);
			}
		}
		const I = {
				CREDENTIAL_MISMATCH: "custom-token-mismatch",
				MISSING_CUSTOM_TOKEN: "internal-error",
				INVALID_IDENTIFIER: "invalid-email",
				MISSING_CONTINUE_URI: "internal-error",
				INVALID_PASSWORD: "wrong-password",
				MISSING_PASSWORD: "missing-password",
				INVALID_LOGIN_CREDENTIALS: "invalid-credential",
				EMAIL_EXISTS: "email-already-in-use",
				PASSWORD_LOGIN_DISABLED: "operation-not-allowed",
				INVALID_IDP_RESPONSE: "invalid-credential",
				INVALID_PENDING_TOKEN: "invalid-credential",
				FEDERATED_USER_ID_ALREADY_LINKED: "credential-already-in-use",
				MISSING_REQ_TYPE: "internal-error",
				EMAIL_NOT_FOUND: "user-not-found",
				RESET_PASSWORD_EXCEED_LIMIT: "too-many-requests",
				EXPIRED_OOB_CODE: "expired-action-code",
				INVALID_OOB_CODE: "invalid-action-code",
				MISSING_OOB_CODE: "internal-error",
				CREDENTIAL_TOO_OLD_LOGIN_AGAIN: "requires-recent-login",
				INVALID_ID_TOKEN: "invalid-user-token",
				TOKEN_EXPIRED: "user-token-expired",
				USER_NOT_FOUND: "user-token-expired",
				TOO_MANY_ATTEMPTS_TRY_LATER: "too-many-requests",
				PASSWORD_DOES_NOT_MEET_REQUIREMENTS:
					"password-does-not-meet-requirements",
				INVALID_CODE: "invalid-verification-code",
				INVALID_SESSION_INFO: "invalid-verification-id",
				INVALID_TEMPORARY_PROOF: "invalid-credential",
				MISSING_SESSION_INFO: "missing-verification-id",
				SESSION_EXPIRED: "code-expired",
				MISSING_ANDROID_PACKAGE_NAME: "missing-android-pkg-name",
				UNAUTHORIZED_DOMAIN: "unauthorized-continue-uri",
				INVALID_OAUTH_CLIENT_ID: "invalid-oauth-client-id",
				ADMIN_ONLY_OPERATION: "admin-restricted-operation",
				INVALID_MFA_PENDING_CREDENTIAL: "invalid-multi-factor-session",
				MFA_ENROLLMENT_NOT_FOUND: "multi-factor-info-not-found",
				MISSING_MFA_ENROLLMENT_ID: "missing-multi-factor-info",
				MISSING_MFA_PENDING_CREDENTIAL: "missing-multi-factor-session",
				SECOND_FACTOR_EXISTS: "second-factor-already-in-use",
				SECOND_FACTOR_LIMIT_EXCEEDED: "maximum-second-factor-count-exceeded",
				BLOCKING_FUNCTION_ERROR_RESPONSE: "internal-error",
				RECAPTCHA_NOT_ENABLED: "recaptcha-not-enabled",
				MISSING_RECAPTCHA_TOKEN: "missing-recaptcha-token",
				INVALID_RECAPTCHA_TOKEN: "invalid-recaptcha-token",
				INVALID_RECAPTCHA_ACTION: "invalid-recaptcha-action",
				MISSING_CLIENT_TYPE: "missing-client-type",
				MISSING_RECAPTCHA_VERSION: "missing-recaptcha-version",
				INVALID_RECAPTCHA_VERSION: "invalid-recaptcha-version",
				INVALID_REQ_TYPE: "invalid-req-type",
			},
			T = [
				"/v1/accounts:signInWithCustomToken",
				"/v1/accounts:signInWithEmailLink",
				"/v1/accounts:signInWithIdp",
				"/v1/accounts:signInWithPassword",
				"/v1/accounts:signInWithPhoneNumber",
				"/v1/token",
			],
			S = new _(3e4, 6e4);
		function C(e, t) {
			return e.tenantId && !t.tenantId
				? Object.assign(Object.assign({}, t), { tenantId: e.tenantId })
				: t;
		}
		async function A(e, t, r, i, s = {}) {
			return k(e, s, async () => {
				let s = {},
					a = {};
				i && ("GET" === t ? (a = i) : (s = { body: JSON.stringify(i) }));
				const o = (0, n.querystring)(
						Object.assign({ key: e.config.apiKey }, a),
					).slice(1),
					l = await e._getAdditionalHeaders();
				(l["Content-Type"] = "application/json"),
					e.languageCode && (l["X-Firebase-Locale"] = e.languageCode);
				const u = Object.assign({ method: t, headers: l }, s);
				return (
					(0, n.isCloudflareWorker)() || (u.referrerPolicy = "no-referrer"),
					e.emulatorConfig &&
						(0, n.isCloudWorkstation)(e.emulatorConfig.host) &&
						(u.credentials = "include"),
					b.fetch()(await N(e, e.config.apiHost, r, o), u)
				);
			});
		}
		async function k(e, t, r) {
			e._canInitEmulator = !1;
			const i = Object.assign(Object.assign({}, I), t);
			try {
				const t = new D(e),
					n = await Promise.race([r(), t.promise]);
				t.clearNetworkTimeout();
				const s = await n.json();
				if ("needConfirmation" in s)
					throw O(e, "account-exists-with-different-credential", s);
				if (n.ok && !("errorMessage" in s)) return s;
				{
					const [t, r] = (n.ok ? s.errorMessage : s.error.message).split(" : ");
					if ("FEDERATED_USER_ID_ALREADY_LINKED" === t)
						throw O(e, "credential-already-in-use", s);
					if ("EMAIL_EXISTS" === t) throw O(e, "email-already-in-use", s);
					if ("USER_DISABLED" === t) throw O(e, "user-disabled", s);
					const a = i[t] || t.toLowerCase().replace(/[_\s]+/g, "-");
					if (r) throw f(e, a, r);
					c(e, a);
				}
			} catch (t) {
				if (t instanceof n.FirebaseError) throw t;
				c(e, "network-request-failed", { message: String(t) });
			}
		}
		async function R(e, t, r, n, i = {}) {
			const s = await A(e, t, r, n, i);
			return (
				"mfaPendingCredential" in s &&
					c(e, "multi-factor-auth-required", { _serverResponse: s }),
				s
			);
		}
		async function N(e, t, r, n) {
			const i = `${t}${r}?${n}`,
				s = e.config.emulator ? E(e.config, i) : `${e.config.apiScheme}://${i}`;
			return T.includes(r) &&
				(await e._persistenceManagerAvailable,
				"COOKIE" === e._getPersistenceType())
				? e._getPersistence()._getFinalTarget(s).toString()
				: s;
		}
		class D {
			clearNetworkTimeout() {
				clearTimeout(this.timer);
			}
			constructor(e) {
				(this.auth = e),
					(this.timer = null),
					(this.promise = new Promise((e, t) => {
						this.timer = setTimeout(
							() => t(d(this.auth, "network-request-failed")),
							S.get(),
						);
					}));
			}
		}
		function O(e, t, r) {
			const n = { appName: e.name };
			r.email && (n.email = r.email),
				r.phoneNumber && (n.phoneNumber = r.phoneNumber);
			const i = d(e, t, n);
			return (i.customData._tokenResponse = r), i;
		}
		function P(e) {
			return void 0 !== e && void 0 !== e.enterprise;
		}
		class x {
			constructor(e) {
				if (
					((this.siteKey = ""),
					(this.recaptchaEnforcementState = []),
					void 0 === e.recaptchaKey)
				)
					throw Error("recaptchaKey undefined");
				(this.siteKey = e.recaptchaKey.split("/")[3]),
					(this.recaptchaEnforcementState = e.recaptchaEnforcementState);
			}
			getProviderEnforcementState(e) {
				if (
					!this.recaptchaEnforcementState ||
					0 === this.recaptchaEnforcementState.length
				)
					return null;
				for (const t of this.recaptchaEnforcementState)
					if (t.provider && t.provider === e)
						switch (t.enforcementState) {
							case "ENFORCE":
								return "ENFORCE";
							case "AUDIT":
								return "AUDIT";
							case "OFF":
								return "OFF";
							default:
								return "ENFORCEMENT_STATE_UNSPECIFIED";
						}
				return null;
			}
			isProviderEnabled(e) {
				return (
					"ENFORCE" === this.getProviderEnforcementState(e) ||
					"AUDIT" === this.getProviderEnforcementState(e)
				);
			}
			isAnyProviderEnabled() {
				return (
					this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER") ||
					this.isProviderEnabled("PHONE_PROVIDER")
				);
			}
		}
		async function L(e, t) {
			return A(e, "GET", "/v2/recaptchaConfig", C(e, t));
		}
		async function M(e, t) {
			return A(e, "POST", "/v1/accounts:delete", t);
		}
		async function U(e, t) {
			return A(e, "POST", "/v1/accounts:lookup", t);
		}
		function V(e) {
			if (e)
				try {
					const t = new Date(Number(e));
					if (!isNaN(t.getTime())) return t.toUTCString();
				} catch (e) {}
		}
		async function F(e, t = !1) {
			const r = (0, n.getModularInstance)(e),
				i = await r.getIdToken(t),
				s = B(i);
			m(s && s.exp && s.auth_time && s.iat, r.auth, "internal-error");
			const a = "object" == typeof s.firebase ? s.firebase : void 0,
				o = null == a ? void 0 : a.sign_in_provider;
			return {
				claims: s,
				token: i,
				authTime: V(j(s.auth_time)),
				issuedAtTime: V(j(s.iat)),
				expirationTime: V(j(s.exp)),
				signInProvider: o || null,
				signInSecondFactor:
					(null == a ? void 0 : a.sign_in_second_factor) || null,
			};
		}
		function j(e) {
			return 1e3 * Number(e);
		}
		function B(e) {
			const [t, r, i] = e.split(".");
			if (void 0 === t || void 0 === r || void 0 === i)
				return h("JWT malformed, contained fewer than 3 sections"), null;
			try {
				const e = (0, n.base64Decode)(r);
				if (!e) return h("Failed to decode base64 JWT payload"), null;
				return JSON.parse(e);
			} catch (e) {
				return (
					h(
						"Caught error parsing JWT payload as JSON",
						null == e ? void 0 : e.toString(),
					),
					null
				);
			}
		}
		function q(e) {
			const t = B(e);
			return (
				m(t, "internal-error"),
				m(void 0 !== t.exp, "internal-error"),
				m(void 0 !== t.iat, "internal-error"),
				Number(t.exp) - Number(t.iat)
			);
		}
		async function $(e, t, r = !1) {
			if (r) return t;
			try {
				return await t;
			} catch (t) {
				throw (
					(t instanceof n.FirebaseError &&
						(({ code: e }) =>
							"auth/user-disabled" === e || "auth/user-token-expired" === e)(
							t,
						) &&
						e.auth.currentUser === e &&
						(await e.auth.signOut()),
					t)
				);
			}
		}
		class z {
			constructor(e) {
				(this.user = e),
					(this.isRunning = !1),
					(this.timerId = null),
					(this.errorBackoff = 3e4);
			}
			_start() {
				this.isRunning || ((this.isRunning = !0), this.schedule());
			}
			_stop() {
				this.isRunning &&
					((this.isRunning = !1),
					null !== this.timerId && clearTimeout(this.timerId));
			}
			getInterval(e) {
				var t;
				if (!e)
					return (
						(this.errorBackoff = 3e4),
						Math.max(
							0,
							(null != (t = this.user.stsTokenManager.expirationTime) ? t : 0) -
								Date.now() -
								3e5,
						)
					);
				{
					const e = this.errorBackoff;
					return (this.errorBackoff = Math.min(2 * this.errorBackoff, 96e4)), e;
				}
			}
			schedule(e = !1) {
				if (!this.isRunning) return;
				const t = this.getInterval(e);
				this.timerId = setTimeout(async () => {
					await this.iteration();
				}, t);
			}
			async iteration() {
				try {
					await this.user.getIdToken(!0);
				} catch (e) {
					(null == e ? void 0 : e.code) === "auth/network-request-failed" &&
						this.schedule(!0);
					return;
				}
				this.schedule();
			}
		}
		class H {
			constructor(e, t) {
				(this.createdAt = e), (this.lastLoginAt = t), this._initializeTime();
			}
			_initializeTime() {
				(this.lastSignInTime = V(this.lastLoginAt)),
					(this.creationTime = V(this.createdAt));
			}
			_copy(e) {
				(this.createdAt = e.createdAt),
					(this.lastLoginAt = e.lastLoginAt),
					this._initializeTime();
			}
			toJSON() {
				return { createdAt: this.createdAt, lastLoginAt: this.lastLoginAt };
			}
		}
		async function G(e) {
			var t, r, n;
			const i = e.auth,
				s = await e.getIdToken(),
				a = await $(e, U(i, { idToken: s }));
			m(null == a ? void 0 : a.users.length, i, "internal-error");
			const o = a.users[0];
			e._notifyReloadListener(o);
			const l = (null == (t = o.providerUserInfo) ? void 0 : t.length)
					? W(o.providerUserInfo)
					: [],
				u =
					((r = e.providerData),
					(n = l),
					[
						...r.filter((e) => !n.some((t) => t.providerId === e.providerId)),
						...n,
					]),
				h = e.isAnonymous,
				c = !(e.email && o.passwordHash) && !(null == u ? void 0 : u.length);
			Object.assign(e, {
				uid: o.localId,
				displayName: o.displayName || null,
				photoURL: o.photoUrl || null,
				email: o.email || null,
				emailVerified: o.emailVerified || !1,
				phoneNumber: o.phoneNumber || null,
				tenantId: o.tenantId || null,
				providerData: u,
				metadata: new H(o.createdAt, o.lastLoginAt),
				isAnonymous: !!h && c,
			});
		}
		async function K(e) {
			const t = (0, n.getModularInstance)(e);
			await G(t),
				await t.auth._persistUserIfCurrent(t),
				t.auth._notifyListenersIfCurrent(t);
		}
		function W(e) {
			return e.map((e) => {
				var { providerId: t } = e,
					r = s(e, ["providerId"]);
				return {
					providerId: t,
					uid: r.rawId || "",
					displayName: r.displayName || null,
					email: r.email || null,
					phoneNumber: r.phoneNumber || null,
					photoURL: r.photoUrl || null,
				};
			});
		}
		async function Q(e, t) {
			const r = await k(e, {}, async () => {
				const r = (0, n.querystring)({
						grant_type: "refresh_token",
						refresh_token: t,
					}).slice(1),
					{ tokenApiHost: i, apiKey: s } = e.config,
					a = await N(e, i, "/v1/token", `key=${s}`),
					o = await e._getAdditionalHeaders();
				o["Content-Type"] = "application/x-www-form-urlencoded";
				const l = { method: "POST", headers: o, body: r };
				return (
					e.emulatorConfig &&
						(0, n.isCloudWorkstation)(e.emulatorConfig.host) &&
						(l.credentials = "include"),
					b.fetch()(a, l)
				);
			});
			return {
				accessToken: r.access_token,
				expiresIn: r.expires_in,
				refreshToken: r.refresh_token,
			};
		}
		async function J(e, t) {
			return A(e, "POST", "/v2/accounts:revokeToken", C(e, t));
		}
		class X {
			constructor() {
				(this.refreshToken = null),
					(this.accessToken = null),
					(this.expirationTime = null);
			}
			get isExpired() {
				return !this.expirationTime || Date.now() > this.expirationTime - 3e4;
			}
			updateFromServerResponse(e) {
				m(e.idToken, "internal-error"),
					m(void 0 !== e.idToken, "internal-error"),
					m(void 0 !== e.refreshToken, "internal-error");
				const t =
					"expiresIn" in e && void 0 !== e.expiresIn
						? Number(e.expiresIn)
						: q(e.idToken);
				this.updateTokensAndExpiration(e.idToken, e.refreshToken, t);
			}
			updateFromIdToken(e) {
				m(0 !== e.length, "internal-error");
				const t = q(e);
				this.updateTokensAndExpiration(e, null, t);
			}
			async getToken(e, t = !1) {
				return t || !this.accessToken || this.isExpired
					? (m(this.refreshToken, e, "user-token-expired"), this.refreshToken)
						? (await this.refresh(e, this.refreshToken), this.accessToken)
						: null
					: this.accessToken;
			}
			clearRefreshToken() {
				this.refreshToken = null;
			}
			async refresh(e, t) {
				const { accessToken: r, refreshToken: n, expiresIn: i } = await Q(e, t);
				this.updateTokensAndExpiration(r, n, Number(i));
			}
			updateTokensAndExpiration(e, t, r) {
				(this.refreshToken = t || null),
					(this.accessToken = e || null),
					(this.expirationTime = Date.now() + 1e3 * r);
			}
			static fromJSON(e, t) {
				const { refreshToken: r, accessToken: n, expirationTime: i } = t,
					s = new X();
				return (
					r &&
						(m("string" == typeof r, "internal-error", { appName: e }),
						(s.refreshToken = r)),
					n &&
						(m("string" == typeof n, "internal-error", { appName: e }),
						(s.accessToken = n)),
					i &&
						(m("number" == typeof i, "internal-error", { appName: e }),
						(s.expirationTime = i)),
					s
				);
			}
			toJSON() {
				return {
					refreshToken: this.refreshToken,
					accessToken: this.accessToken,
					expirationTime: this.expirationTime,
				};
			}
			_assign(e) {
				(this.accessToken = e.accessToken),
					(this.refreshToken = e.refreshToken),
					(this.expirationTime = e.expirationTime);
			}
			_clone() {
				return Object.assign(new X(), this.toJSON());
			}
			_performRefresh() {
				return y("not implemented");
			}
		}
		function Y(e, t) {
			m("string" == typeof e || void 0 === e, "internal-error", { appName: t });
		}
		class Z {
			constructor(e) {
				var { uid: t, auth: r, stsTokenManager: n } = e,
					i = s(e, ["uid", "auth", "stsTokenManager"]);
				(this.providerId = "firebase"),
					(this.proactiveRefresh = new z(this)),
					(this.reloadUserInfo = null),
					(this.reloadListener = null),
					(this.uid = t),
					(this.auth = r),
					(this.stsTokenManager = n),
					(this.accessToken = n.accessToken),
					(this.displayName = i.displayName || null),
					(this.email = i.email || null),
					(this.emailVerified = i.emailVerified || !1),
					(this.phoneNumber = i.phoneNumber || null),
					(this.photoURL = i.photoURL || null),
					(this.isAnonymous = i.isAnonymous || !1),
					(this.tenantId = i.tenantId || null),
					(this.providerData = i.providerData ? [...i.providerData] : []),
					(this.metadata = new H(
						i.createdAt || void 0,
						i.lastLoginAt || void 0,
					));
			}
			async getIdToken(e) {
				const t = await $(this, this.stsTokenManager.getToken(this.auth, e));
				return (
					m(t, this.auth, "internal-error"),
					this.accessToken !== t &&
						((this.accessToken = t),
						await this.auth._persistUserIfCurrent(this),
						this.auth._notifyListenersIfCurrent(this)),
					t
				);
			}
			getIdTokenResult(e) {
				return F(this, e);
			}
			reload() {
				return K(this);
			}
			_assign(e) {
				this !== e &&
					(m(this.uid === e.uid, this.auth, "internal-error"),
					(this.displayName = e.displayName),
					(this.photoURL = e.photoURL),
					(this.email = e.email),
					(this.emailVerified = e.emailVerified),
					(this.phoneNumber = e.phoneNumber),
					(this.isAnonymous = e.isAnonymous),
					(this.tenantId = e.tenantId),
					(this.providerData = e.providerData.map((e) => Object.assign({}, e))),
					this.metadata._copy(e.metadata),
					this.stsTokenManager._assign(e.stsTokenManager));
			}
			_clone(e) {
				const t = new Z(
					Object.assign(Object.assign({}, this), {
						auth: e,
						stsTokenManager: this.stsTokenManager._clone(),
					}),
				);
				return t.metadata._copy(this.metadata), t;
			}
			_onReload(e) {
				m(!this.reloadListener, this.auth, "internal-error"),
					(this.reloadListener = e),
					this.reloadUserInfo &&
						(this._notifyReloadListener(this.reloadUserInfo),
						(this.reloadUserInfo = null));
			}
			_notifyReloadListener(e) {
				this.reloadListener
					? this.reloadListener(e)
					: (this.reloadUserInfo = e);
			}
			_startProactiveRefresh() {
				this.proactiveRefresh._start();
			}
			_stopProactiveRefresh() {
				this.proactiveRefresh._stop();
			}
			async _updateTokensIfNecessary(e, t = !1) {
				let r = !1;
				e.idToken &&
					e.idToken !== this.stsTokenManager.accessToken &&
					(this.stsTokenManager.updateFromServerResponse(e), (r = !0)),
					t && (await G(this)),
					await this.auth._persistUserIfCurrent(this),
					r && this.auth._notifyListenersIfCurrent(this);
			}
			async delete() {
				if ((0, r._isFirebaseServerApp)(this.auth.app))
					return Promise.reject(p(this.auth));
				const e = await this.getIdToken();
				return (
					await $(this, M(this.auth, { idToken: e })),
					this.stsTokenManager.clearRefreshToken(),
					this.auth.signOut()
				);
			}
			toJSON() {
				return Object.assign(
					Object.assign(
						{
							uid: this.uid,
							email: this.email || void 0,
							emailVerified: this.emailVerified,
							displayName: this.displayName || void 0,
							isAnonymous: this.isAnonymous,
							photoURL: this.photoURL || void 0,
							phoneNumber: this.phoneNumber || void 0,
							tenantId: this.tenantId || void 0,
							providerData: this.providerData.map((e) => Object.assign({}, e)),
							stsTokenManager: this.stsTokenManager.toJSON(),
							_redirectEventId: this._redirectEventId,
						},
						this.metadata.toJSON(),
					),
					{ apiKey: this.auth.config.apiKey, appName: this.auth.name },
				);
			}
			get refreshToken() {
				return this.stsTokenManager.refreshToken || "";
			}
			static _fromJSON(e, t) {
				var r, n, i, s, a, o, l, u;
				const h = null != (r = t.displayName) ? r : void 0,
					c = null != (n = t.email) ? n : void 0,
					d = null != (i = t.phoneNumber) ? i : void 0,
					f = null != (s = t.photoURL) ? s : void 0,
					p = null != (a = t.tenantId) ? a : void 0,
					g = null != (o = t._redirectEventId) ? o : void 0,
					y = null != (l = t.createdAt) ? l : void 0,
					v = null != (u = t.lastLoginAt) ? u : void 0,
					{
						uid: w,
						emailVerified: _,
						isAnonymous: E,
						providerData: b,
						stsTokenManager: I,
					} = t;
				m(w && I, e, "internal-error");
				const T = X.fromJSON(Z.name, I);
				m("string" == typeof w, e, "internal-error"),
					Y(h, e.name),
					Y(c, e.name),
					m("boolean" == typeof _, e, "internal-error"),
					m("boolean" == typeof E, e, "internal-error"),
					Y(d, e.name),
					Y(f, e.name),
					Y(p, e.name),
					Y(g, e.name),
					Y(y, e.name),
					Y(v, e.name);
				const S = new Z({
					uid: w,
					auth: e,
					email: c,
					emailVerified: _,
					displayName: h,
					isAnonymous: E,
					photoURL: f,
					phoneNumber: d,
					tenantId: p,
					stsTokenManager: T,
					createdAt: y,
					lastLoginAt: v,
				});
				return (
					b &&
						Array.isArray(b) &&
						(S.providerData = b.map((e) => Object.assign({}, e))),
					g && (S._redirectEventId = g),
					S
				);
			}
			static async _fromIdTokenResponse(e, t, r = !1) {
				const n = new X();
				n.updateFromServerResponse(t);
				const i = new Z({
					uid: t.localId,
					auth: e,
					stsTokenManager: n,
					isAnonymous: r,
				});
				return await G(i), i;
			}
			static async _fromGetAccountInfoResponse(e, t, r) {
				const n = t.users[0];
				m(void 0 !== n.localId, "internal-error");
				const i = void 0 !== n.providerUserInfo ? W(n.providerUserInfo) : [],
					s = !(n.email && n.passwordHash) && !(null == i ? void 0 : i.length),
					a = new X();
				a.updateFromIdToken(r);
				const o = new Z({
					uid: n.localId,
					auth: e,
					stsTokenManager: a,
					isAnonymous: s,
				});
				return (
					Object.assign(o, {
						uid: n.localId,
						displayName: n.displayName || null,
						photoURL: n.photoUrl || null,
						email: n.email || null,
						emailVerified: n.emailVerified || !1,
						phoneNumber: n.phoneNumber || null,
						tenantId: n.tenantId || null,
						providerData: i,
						metadata: new H(n.createdAt, n.lastLoginAt),
						isAnonymous:
							!(n.email && n.passwordHash) && !(null == i ? void 0 : i.length),
					}),
					o
				);
			}
		}
		const ee = new Map();
		function et(e) {
			var t, r;
			(t = "Expected a class definition"), e instanceof Function || y(t);
			let n = ee.get(e);
			return (
				n
					? ((r = "Instance stored in cache mismatched with class"),
						n instanceof e || y(r))
					: ((n = new e()), ee.set(e, n)),
				n
			);
		}
		class er {
			constructor() {
				(this.type = "NONE"), (this.storage = {});
			}
			async _isAvailable() {
				return !0;
			}
			async _set(e, t) {
				this.storage[e] = t;
			}
			async _get(e) {
				const t = this.storage[e];
				return void 0 === t ? null : t;
			}
			async _remove(e) {
				delete this.storage[e];
			}
			_addListener(e, t) {}
			_removeListener(e, t) {}
		}
		function en(e, t, r) {
			return `firebase:${e}:${t}:${r}`;
		}
		er.type = "NONE";
		class ei {
			constructor(e, t, r) {
				(this.persistence = e), (this.auth = t), (this.userKey = r);
				const { config: n, name: i } = this.auth;
				(this.fullUserKey = en(this.userKey, n.apiKey, i)),
					(this.fullPersistenceKey = en("persistence", n.apiKey, i)),
					(this.boundEventHandler = t._onStorageEvent.bind(t)),
					this.persistence._addListener(
						this.fullUserKey,
						this.boundEventHandler,
					);
			}
			setCurrentUser(e) {
				return this.persistence._set(this.fullUserKey, e.toJSON());
			}
			async getCurrentUser() {
				const e = await this.persistence._get(this.fullUserKey);
				if (!e) return null;
				if ("string" == typeof e) {
					const t = await U(this.auth, { idToken: e }).catch(() => void 0);
					return t ? Z._fromGetAccountInfoResponse(this.auth, t, e) : null;
				}
				return Z._fromJSON(this.auth, e);
			}
			removeCurrentUser() {
				return this.persistence._remove(this.fullUserKey);
			}
			savePersistenceForRedirect() {
				return this.persistence._set(
					this.fullPersistenceKey,
					this.persistence.type,
				);
			}
			async setPersistence(e) {
				if (this.persistence === e) return;
				const t = await this.getCurrentUser();
				if ((await this.removeCurrentUser(), (this.persistence = e), t))
					return this.setCurrentUser(t);
			}
			delete() {
				this.persistence._removeListener(
					this.fullUserKey,
					this.boundEventHandler,
				);
			}
			static async create(e, t, r = "authUser") {
				if (!t.length) return new ei(et(er), e, r);
				let n = (
						await Promise.all(
							t.map(async (e) => {
								if (await e._isAvailable()) return e;
							}),
						)
					).filter((e) => e),
					i = n[0] || et(er),
					s = en(r, e.config.apiKey, e.name),
					a = null;
				for (const r of t)
					try {
						const t = await r._get(s);
						if (t) {
							let n;
							if ("string" == typeof t) {
								const r = await U(e, { idToken: t }).catch(() => void 0);
								if (!r) break;
								n = await Z._fromGetAccountInfoResponse(e, r, t);
							} else n = Z._fromJSON(e, t);
							r !== i && (a = n), (i = r);
							break;
						}
					} catch (e) {}
				const o = n.filter((e) => e._shouldAllowMigration);
				return (
					i._shouldAllowMigration &&
						o.length &&
						((i = o[0]),
						a && (await i._set(s, a.toJSON())),
						await Promise.all(
							t.map(async (e) => {
								if (e !== i)
									try {
										await e._remove(s);
									} catch (e) {}
							}),
						)),
					new ei(i, e, r)
				);
			}
		}
		function es(e) {
			const t = e.toLowerCase();
			if (t.includes("opera/") || t.includes("opr/") || t.includes("opios/"))
				return "Opera";
			{
				if (eu(t)) return "IEMobile";
				if (t.includes("msie") || t.includes("trident/")) return "IE";
				if (t.includes("edge/")) return "Edge";
				if (ea(t)) return "Firefox";
				if (t.includes("silk/")) return "Silk";
				if (ec(t)) return "Blackberry";
				if (ed(t)) return "Webos";
				if (eo(t)) return "Safari";
				if ((t.includes("chrome/") || el(t)) && !t.includes("edge/"))
					return "Chrome";
				if (eh(t)) return "Android";
				const r = e.match(/([a-zA-Z\d.]+)\/[a-zA-Z\d.]*$/);
				if ((null == r ? void 0 : r.length) === 2) return r[1];
			}
			return "Other";
		}
		function ea(e = (0, n.getUA)()) {
			return /firefox\//i.test(e);
		}
		function eo(e = (0, n.getUA)()) {
			const t = e.toLowerCase();
			return (
				t.includes("safari/") &&
				!t.includes("chrome/") &&
				!t.includes("crios/") &&
				!t.includes("android")
			);
		}
		function el(e = (0, n.getUA)()) {
			return /crios\//i.test(e);
		}
		function eu(e = (0, n.getUA)()) {
			return /iemobile/i.test(e);
		}
		function eh(e = (0, n.getUA)()) {
			return /android/i.test(e);
		}
		function ec(e = (0, n.getUA)()) {
			return /blackberry/i.test(e);
		}
		function ed(e = (0, n.getUA)()) {
			return /webos/i.test(e);
		}
		function ef(e = (0, n.getUA)()) {
			return (
				/iphone|ipad|ipod/i.test(e) ||
				(/macintosh/i.test(e) && /mobile/i.test(e))
			);
		}
		function ep(e = (0, n.getUA)()) {
			return (
				ef(e) || eh(e) || ed(e) || ec(e) || /windows phone/i.test(e) || eu(e)
			);
		}
		function eg(e, t = []) {
			let i;
			switch (e) {
				case "Browser":
					i = es((0, n.getUA)());
					break;
				case "Worker":
					i = `${es((0, n.getUA)())}-${e}`;
					break;
				default:
					i = e;
			}
			const s = t.length ? t.join(",") : "FirebaseCore-web";
			return `${i}/JsCore/${r.SDK_VERSION}/${s}`;
		}
		class em {
			constructor(e) {
				(this.auth = e), (this.queue = []);
			}
			pushCallback(e, t) {
				const r = (t) =>
					new Promise((r, n) => {
						try {
							const n = e(t);
							r(n);
						} catch (e) {
							n(e);
						}
					});
				(r.onAbort = t), this.queue.push(r);
				const n = this.queue.length - 1;
				return () => {
					this.queue[n] = () => Promise.resolve();
				};
			}
			async runMiddleware(e) {
				if (this.auth.currentUser === e) return;
				const t = [];
				try {
					for (const r of this.queue)
						await r(e), r.onAbort && t.push(r.onAbort);
				} catch (e) {
					for (const e of (t.reverse(), t))
						try {
							e();
						} catch (e) {}
					throw this.auth._errorFactory.create("login-blocked", {
						originalMessage: null == e ? void 0 : e.message,
					});
				}
			}
		}
		async function ey(e, t = {}) {
			return A(e, "GET", "/v2/passwordPolicy", C(e, t));
		}
		class ev {
			constructor(e) {
				var t, r, n, i;
				const s = e.customStrengthOptions;
				(this.customStrengthOptions = {}),
					(this.customStrengthOptions.minPasswordLength =
						null != (t = s.minPasswordLength) ? t : 6),
					s.maxPasswordLength &&
						(this.customStrengthOptions.maxPasswordLength =
							s.maxPasswordLength),
					void 0 !== s.containsLowercaseCharacter &&
						(this.customStrengthOptions.containsLowercaseLetter =
							s.containsLowercaseCharacter),
					void 0 !== s.containsUppercaseCharacter &&
						(this.customStrengthOptions.containsUppercaseLetter =
							s.containsUppercaseCharacter),
					void 0 !== s.containsNumericCharacter &&
						(this.customStrengthOptions.containsNumericCharacter =
							s.containsNumericCharacter),
					void 0 !== s.containsNonAlphanumericCharacter &&
						(this.customStrengthOptions.containsNonAlphanumericCharacter =
							s.containsNonAlphanumericCharacter),
					(this.enforcementState = e.enforcementState),
					"ENFORCEMENT_STATE_UNSPECIFIED" === this.enforcementState &&
						(this.enforcementState = "OFF"),
					(this.allowedNonAlphanumericCharacters =
						null !=
						(n =
							null == (r = e.allowedNonAlphanumericCharacters)
								? void 0
								: r.join(""))
							? n
							: ""),
					(this.forceUpgradeOnSignin =
						null != (i = e.forceUpgradeOnSignin) && i),
					(this.schemaVersion = e.schemaVersion);
			}
			validatePassword(e) {
				var t, r, n, i, s, a;
				const o = { isValid: !0, passwordPolicy: this };
				return (
					this.validatePasswordLengthOptions(e, o),
					this.validatePasswordCharacterOptions(e, o),
					o.isValid &&
						(o.isValid = null == (t = o.meetsMinPasswordLength) || t),
					o.isValid &&
						(o.isValid = null == (r = o.meetsMaxPasswordLength) || r),
					o.isValid &&
						(o.isValid = null == (n = o.containsLowercaseLetter) || n),
					o.isValid &&
						(o.isValid = null == (i = o.containsUppercaseLetter) || i),
					o.isValid &&
						(o.isValid = null == (s = o.containsNumericCharacter) || s),
					o.isValid &&
						(o.isValid = null == (a = o.containsNonAlphanumericCharacter) || a),
					o
				);
			}
			validatePasswordLengthOptions(e, t) {
				const r = this.customStrengthOptions.minPasswordLength,
					n = this.customStrengthOptions.maxPasswordLength;
				r && (t.meetsMinPasswordLength = e.length >= r),
					n && (t.meetsMaxPasswordLength = e.length <= n);
			}
			validatePasswordCharacterOptions(e, t) {
				let r;
				this.updatePasswordCharacterOptionsStatuses(t, !1, !1, !1, !1);
				for (let n = 0; n < e.length; n++)
					(r = e.charAt(n)),
						this.updatePasswordCharacterOptionsStatuses(
							t,
							r >= "a" && r <= "z",
							r >= "A" && r <= "Z",
							r >= "0" && r <= "9",
							this.allowedNonAlphanumericCharacters.includes(r),
						);
			}
			updatePasswordCharacterOptionsStatuses(e, t, r, n, i) {
				this.customStrengthOptions.containsLowercaseLetter &&
					(e.containsLowercaseLetter || (e.containsLowercaseLetter = t)),
					this.customStrengthOptions.containsUppercaseLetter &&
						(e.containsUppercaseLetter || (e.containsUppercaseLetter = r)),
					this.customStrengthOptions.containsNumericCharacter &&
						(e.containsNumericCharacter || (e.containsNumericCharacter = n)),
					this.customStrengthOptions.containsNonAlphanumericCharacter &&
						(e.containsNonAlphanumericCharacter ||
							(e.containsNonAlphanumericCharacter = i));
			}
		}
		class ew {
			constructor(e, t, r, n) {
				(this.app = e),
					(this.heartbeatServiceProvider = t),
					(this.appCheckServiceProvider = r),
					(this.config = n),
					(this.currentUser = null),
					(this.emulatorConfig = null),
					(this.operations = Promise.resolve()),
					(this.authStateSubscription = new eE(this)),
					(this.idTokenSubscription = new eE(this)),
					(this.beforeStateQueue = new em(this)),
					(this.redirectUser = null),
					(this.isProactiveRefreshEnabled = !1),
					(this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION = 1),
					(this._canInitEmulator = !0),
					(this._isInitialized = !1),
					(this._deleted = !1),
					(this._initializationPromise = null),
					(this._popupRedirectResolver = null),
					(this._errorFactory = l),
					(this._agentRecaptchaConfig = null),
					(this._tenantRecaptchaConfigs = {}),
					(this._projectPasswordPolicy = null),
					(this._tenantPasswordPolicies = {}),
					(this._resolvePersistenceManagerAvailable = void 0),
					(this.lastNotifiedUid = void 0),
					(this.languageCode = null),
					(this.tenantId = null),
					(this.settings = { appVerificationDisabledForTesting: !1 }),
					(this.frameworks = []),
					(this.name = e.name),
					(this.clientVersion = n.sdkClientVersion),
					(this._persistenceManagerAvailable = new Promise(
						(e) => (this._resolvePersistenceManagerAvailable = e),
					));
			}
			_initializeWithPersistence(e, t) {
				return (
					t && (this._popupRedirectResolver = et(t)),
					(this._initializationPromise = this.queue(async () => {
						var r, n, i;
						if (!this._deleted) {
							if (
								((this.persistenceManager = await ei.create(this, e)),
								null == (r = this._resolvePersistenceManagerAvailable) ||
									r.call(this),
								!this._deleted)
							) {
								if (
									null == (n = this._popupRedirectResolver)
										? void 0
										: n._shouldInitProactively
								)
									try {
										await this._popupRedirectResolver._initialize(this);
									} catch (e) {}
								await this.initializeCurrentUser(t),
									(this.lastNotifiedUid =
										(null == (i = this.currentUser) ? void 0 : i.uid) || null),
									this._deleted || (this._isInitialized = !0);
							}
						}
					})),
					this._initializationPromise
				);
			}
			async _onStorageEvent() {
				if (this._deleted) return;
				const e = await this.assertedPersistence.getCurrentUser();
				if (this.currentUser || e) {
					if (this.currentUser && e && this.currentUser.uid === e.uid) {
						this._currentUser._assign(e), await this.currentUser.getIdToken();
						return;
					}
					await this._updateCurrentUser(e, !0);
				}
			}
			async initializeCurrentUserFromIdToken(e) {
				try {
					const t = await U(this, { idToken: e }),
						r = await Z._fromGetAccountInfoResponse(this, t, e);
					await this.directlySetCurrentUser(r);
				} catch (e) {
					console.warn(
						"FirebaseServerApp could not login user with provided authIdToken: ",
						e,
					),
						await this.directlySetCurrentUser(null);
				}
			}
			async initializeCurrentUser(e) {
				var t;
				if ((0, r._isFirebaseServerApp)(this.app)) {
					const e = this.app.settings.authIdToken;
					return e
						? new Promise((t) => {
								setTimeout(() =>
									this.initializeCurrentUserFromIdToken(e).then(t, t),
								);
							})
						: this.directlySetCurrentUser(null);
				}
				let n = await this.assertedPersistence.getCurrentUser(),
					i = n,
					s = !1;
				if (e && this.config.authDomain) {
					await this.getOrInitRedirectPersistenceManager();
					const r =
							null == (t = this.redirectUser) ? void 0 : t._redirectEventId,
						n = null == i ? void 0 : i._redirectEventId,
						a = await this.tryRedirectSignIn(e);
					(!r || r === n) &&
						(null == a ? void 0 : a.user) &&
						((i = a.user), (s = !0));
				}
				if (!i) return this.directlySetCurrentUser(null);
				if (!i._redirectEventId) {
					if (s)
						try {
							await this.beforeStateQueue.runMiddleware(i);
						} catch (e) {
							(i = n),
								this._popupRedirectResolver._overrideRedirectResult(this, () =>
									Promise.reject(e),
								);
						}
					return i
						? this.reloadAndSetCurrentUserOrClear(i)
						: this.directlySetCurrentUser(null);
				}
				return (m(this._popupRedirectResolver, this, "argument-error"),
				await this.getOrInitRedirectPersistenceManager(),
				this.redirectUser &&
					this.redirectUser._redirectEventId === i._redirectEventId)
					? this.directlySetCurrentUser(i)
					: this.reloadAndSetCurrentUserOrClear(i);
			}
			async tryRedirectSignIn(e) {
				let t = null;
				try {
					t = await this._popupRedirectResolver._completeRedirectFn(
						this,
						e,
						!0,
					);
				} catch (e) {
					await this._setRedirectUser(null);
				}
				return t;
			}
			async reloadAndSetCurrentUserOrClear(e) {
				try {
					await G(e);
				} catch (e) {
					if ((null == e ? void 0 : e.code) !== "auth/network-request-failed")
						return this.directlySetCurrentUser(null);
				}
				return this.directlySetCurrentUser(e);
			}
			useDeviceLanguage() {
				this.languageCode = (() => {
					if ("u" < typeof navigator) return null;
					const e = navigator;
					return (e.languages && e.languages[0]) || e.language || null;
				})();
			}
			async _delete() {
				this._deleted = !0;
			}
			async updateCurrentUser(e) {
				if ((0, r._isFirebaseServerApp)(this.app))
					return Promise.reject(p(this));
				const t = e ? (0, n.getModularInstance)(e) : null;
				return (
					t &&
						m(
							t.auth.config.apiKey === this.config.apiKey,
							this,
							"invalid-user-token",
						),
					this._updateCurrentUser(t && t._clone(this))
				);
			}
			async _updateCurrentUser(e, t = !1) {
				if (!this._deleted)
					return (
						e && m(this.tenantId === e.tenantId, this, "tenant-id-mismatch"),
						t || (await this.beforeStateQueue.runMiddleware(e)),
						this.queue(async () => {
							await this.directlySetCurrentUser(e), this.notifyAuthListeners();
						})
					);
			}
			async signOut() {
				return (0, r._isFirebaseServerApp)(this.app)
					? Promise.reject(p(this))
					: (await this.beforeStateQueue.runMiddleware(null),
						(this.redirectPersistenceManager || this._popupRedirectResolver) &&
							(await this._setRedirectUser(null)),
						this._updateCurrentUser(null, !0));
			}
			setPersistence(e) {
				return (0, r._isFirebaseServerApp)(this.app)
					? Promise.reject(p(this))
					: this.queue(async () => {
							await this.assertedPersistence.setPersistence(et(e));
						});
			}
			_getRecaptchaConfig() {
				return null == this.tenantId
					? this._agentRecaptchaConfig
					: this._tenantRecaptchaConfigs[this.tenantId];
			}
			async validatePassword(e) {
				this._getPasswordPolicyInternal() ||
					(await this._updatePasswordPolicy());
				const t = this._getPasswordPolicyInternal();
				return t.schemaVersion !== this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION
					? Promise.reject(
							this._errorFactory.create(
								"unsupported-password-policy-schema-version",
								{},
							),
						)
					: t.validatePassword(e);
			}
			_getPasswordPolicyInternal() {
				return null === this.tenantId
					? this._projectPasswordPolicy
					: this._tenantPasswordPolicies[this.tenantId];
			}
			async _updatePasswordPolicy() {
				const e = new ev(await ey(this));
				null === this.tenantId
					? (this._projectPasswordPolicy = e)
					: (this._tenantPasswordPolicies[this.tenantId] = e);
			}
			_getPersistenceType() {
				return this.assertedPersistence.persistence.type;
			}
			_getPersistence() {
				return this.assertedPersistence.persistence;
			}
			_updateErrorMap(e) {
				this._errorFactory = new n.ErrorFactory("auth", "Firebase", e());
			}
			onAuthStateChanged(e, t, r) {
				return this.registerStateListener(this.authStateSubscription, e, t, r);
			}
			beforeAuthStateChanged(e, t) {
				return this.beforeStateQueue.pushCallback(e, t);
			}
			onIdTokenChanged(e, t, r) {
				return this.registerStateListener(this.idTokenSubscription, e, t, r);
			}
			authStateReady() {
				return new Promise((e, t) => {
					if (this.currentUser) e();
					else {
						const r = this.onAuthStateChanged(() => {
							r(), e();
						}, t);
					}
				});
			}
			async revokeAccessToken(e) {
				if (this.currentUser) {
					const t = {
						providerId: "apple.com",
						tokenType: "ACCESS_TOKEN",
						token: e,
						idToken: await this.currentUser.getIdToken(),
					};
					null != this.tenantId && (t.tenantId = this.tenantId),
						await J(this, t);
				}
			}
			toJSON() {
				var e;
				return {
					apiKey: this.config.apiKey,
					authDomain: this.config.authDomain,
					appName: this.name,
					currentUser: null == (e = this._currentUser) ? void 0 : e.toJSON(),
				};
			}
			async _setRedirectUser(e, t) {
				const r = await this.getOrInitRedirectPersistenceManager(t);
				return null === e ? r.removeCurrentUser() : r.setCurrentUser(e);
			}
			async getOrInitRedirectPersistenceManager(e) {
				if (!this.redirectPersistenceManager) {
					const t = (e && et(e)) || this._popupRedirectResolver;
					m(t, this, "argument-error"),
						(this.redirectPersistenceManager = await ei.create(
							this,
							[et(t._redirectPersistence)],
							"redirectUser",
						)),
						(this.redirectUser =
							await this.redirectPersistenceManager.getCurrentUser());
				}
				return this.redirectPersistenceManager;
			}
			async _redirectUserForId(e) {
				var t, r;
				return (this._isInitialized && (await this.queue(async () => {})),
				(null == (t = this._currentUser) ? void 0 : t._redirectEventId) === e)
					? this._currentUser
					: (null == (r = this.redirectUser) ? void 0 : r._redirectEventId) ===
							e
						? this.redirectUser
						: null;
			}
			async _persistUserIfCurrent(e) {
				if (e === this.currentUser)
					return this.queue(async () => this.directlySetCurrentUser(e));
			}
			_notifyListenersIfCurrent(e) {
				e === this.currentUser && this.notifyAuthListeners();
			}
			_key() {
				return `${this.config.authDomain}:${this.config.apiKey}:${this.name}`;
			}
			_startProactiveRefresh() {
				(this.isProactiveRefreshEnabled = !0),
					this.currentUser && this._currentUser._startProactiveRefresh();
			}
			_stopProactiveRefresh() {
				(this.isProactiveRefreshEnabled = !1),
					this.currentUser && this._currentUser._stopProactiveRefresh();
			}
			get _currentUser() {
				return this.currentUser;
			}
			notifyAuthListeners() {
				var e, t;
				if (!this._isInitialized) return;
				this.idTokenSubscription.next(this.currentUser);
				const r =
					null != (t = null == (e = this.currentUser) ? void 0 : e.uid)
						? t
						: null;
				this.lastNotifiedUid !== r &&
					((this.lastNotifiedUid = r),
					this.authStateSubscription.next(this.currentUser));
			}
			registerStateListener(e, t, r, n) {
				if (this._deleted) return () => {};
				let i = "function" == typeof t ? t : t.next.bind(t),
					s = !1,
					a = this._isInitialized
						? Promise.resolve()
						: this._initializationPromise;
				if (
					(m(a, this, "internal-error"),
					a.then(() => {
						s || i(this.currentUser);
					}),
					"function" == typeof t)
				) {
					const i = e.addObserver(t, r, n);
					return () => {
						(s = !0), i();
					};
				}
				{
					const r = e.addObserver(t);
					return () => {
						(s = !0), r();
					};
				}
			}
			async directlySetCurrentUser(e) {
				this.currentUser &&
					this.currentUser !== e &&
					this._currentUser._stopProactiveRefresh(),
					e && this.isProactiveRefreshEnabled && e._startProactiveRefresh(),
					(this.currentUser = e),
					e
						? await this.assertedPersistence.setCurrentUser(e)
						: await this.assertedPersistence.removeCurrentUser();
			}
			queue(e) {
				return (this.operations = this.operations.then(e, e)), this.operations;
			}
			get assertedPersistence() {
				return (
					m(this.persistenceManager, this, "internal-error"),
					this.persistenceManager
				);
			}
			_logFramework(e) {
				!e ||
					this.frameworks.includes(e) ||
					(this.frameworks.push(e),
					this.frameworks.sort(),
					(this.clientVersion = eg(
						this.config.clientPlatform,
						this._getFrameworks(),
					)));
			}
			_getFrameworks() {
				return this.frameworks;
			}
			async _getAdditionalHeaders() {
				var e;
				const t = { "X-Client-Version": this.clientVersion };
				this.app.options.appId &&
					(t["X-Firebase-gmpid"] = this.app.options.appId);
				const r = await (null ==
				(e = this.heartbeatServiceProvider.getImmediate({ optional: !0 }))
					? void 0
					: e.getHeartbeatsHeader());
				r && (t["X-Firebase-Client"] = r);
				const n = await this._getAppCheckToken();
				return n && (t["X-Firebase-AppCheck"] = n), t;
			}
			async _getAppCheckToken() {
				var e;
				if (
					(0, r._isFirebaseServerApp)(this.app) &&
					this.app.settings.appCheckToken
				)
					return this.app.settings.appCheckToken;
				const t = await (null ==
				(e = this.appCheckServiceProvider.getImmediate({ optional: !0 }))
					? void 0
					: e.getToken());
				return (
					(null == t ? void 0 : t.error) &&
						((e, ...t) => {
							u.logLevel <= i.LogLevel.WARN &&
								u.warn(`Auth (${r.SDK_VERSION}): ${e}`, ...t);
						})(`Error while retrieving App Check token: ${t.error}`),
					null == t ? void 0 : t.token
				);
			}
		}
		function e_(e) {
			return (0, n.getModularInstance)(e);
		}
		class eE {
			constructor(e) {
				(this.auth = e),
					(this.observer = null),
					(this.addObserver = (0, n.createSubscribe)(
						(e) => (this.observer = e),
					));
			}
			get next() {
				return (
					m(this.observer, this.auth, "internal-error"),
					this.observer.next.bind(this.observer)
				);
			}
		}
		let eb = {
			async loadJS() {
				throw Error("Unable to load external scripts");
			},
			recaptchaV2Script: "",
			recaptchaEnterpriseScript: "",
			gapiScript: "",
		};
		function eI(e) {
			return `__${e}${Math.floor(1e6 * Math.random())}`;
		}
		class eT {
			constructor() {
				this.enterprise = new eS();
			}
			ready(e) {
				e();
			}
			execute(e, t) {
				return Promise.resolve("token");
			}
			render(e, t) {
				return "";
			}
		}
		class eS {
			ready(e) {
				e();
			}
			execute(e, t) {
				return Promise.resolve("token");
			}
			render(e, t) {
				return "";
			}
		}
		const eC = "NO_RECAPTCHA";
		class eA {
			constructor(e) {
				(this.type = "recaptcha-enterprise"), (this.auth = e_(e));
			}
			async verify(e = "verify", t = !1) {
				async function r(e) {
					if (!t) {
						if (null == e.tenantId && null != e._agentRecaptchaConfig)
							return e._agentRecaptchaConfig.siteKey;
						if (
							null != e.tenantId &&
							void 0 !== e._tenantRecaptchaConfigs[e.tenantId]
						)
							return e._tenantRecaptchaConfigs[e.tenantId].siteKey;
					}
					return new Promise(async (t, r) => {
						L(e, {
							clientType: "CLIENT_TYPE_WEB",
							version: "RECAPTCHA_ENTERPRISE",
						})
							.then((n) => {
								if (void 0 === n.recaptchaKey)
									r(Error("recaptcha Enterprise site key undefined"));
								else {
									const r = new x(n);
									return (
										null == e.tenantId
											? (e._agentRecaptchaConfig = r)
											: (e._tenantRecaptchaConfigs[e.tenantId] = r),
										t(r.siteKey)
									);
								}
							})
							.catch((e) => {
								r(e);
							});
					});
				}
				function n(t, r, n) {
					const i = window.grecaptcha;
					P(i)
						? i.enterprise.ready(() => {
								i.enterprise
									.execute(t, { action: e })
									.then((e) => {
										r(e);
									})
									.catch(() => {
										r(eC);
									});
							})
						: n(Error("No reCAPTCHA enterprise script loaded."));
				}
				return this.auth.settings.appVerificationDisabledForTesting
					? new eT().execute("siteKey", { action: "verify" })
					: new Promise((e, i) => {
							r(this.auth)
								.then((r) => {
									if (!t && P(window.grecaptcha)) n(r, e, i);
									else {
										var s;
										if ("u" < typeof window)
											return void i(
												Error("RecaptchaVerifier is only supported in browser"),
											);
										let t = eb.recaptchaEnterpriseScript;
										0 !== t.length && (t += r),
											((s = t), eb.loadJS(s))
												.then(() => {
													n(r, e, i);
												})
												.catch((e) => {
													i(e);
												});
									}
								})
								.catch((e) => {
									i(e);
								});
						});
			}
		}
		async function ek(e, t, r, n = !1, i = !1) {
			let s,
				a = new eA(e);
			if (i) s = eC;
			else
				try {
					s = await a.verify(r);
				} catch (e) {
					s = await a.verify(r, !0);
				}
			const o = Object.assign({}, t);
			if ("mfaSmsEnrollment" === r || "mfaSmsSignIn" === r) {
				if ("phoneEnrollmentInfo" in o) {
					const e = o.phoneEnrollmentInfo.phoneNumber,
						t = o.phoneEnrollmentInfo.recaptchaToken;
					Object.assign(o, {
						phoneEnrollmentInfo: {
							phoneNumber: e,
							recaptchaToken: t,
							captchaResponse: s,
							clientType: "CLIENT_TYPE_WEB",
							recaptchaVersion: "RECAPTCHA_ENTERPRISE",
						},
					});
				} else if ("phoneSignInInfo" in o) {
					const e = o.phoneSignInInfo.recaptchaToken;
					Object.assign(o, {
						phoneSignInInfo: {
							recaptchaToken: e,
							captchaResponse: s,
							clientType: "CLIENT_TYPE_WEB",
							recaptchaVersion: "RECAPTCHA_ENTERPRISE",
						},
					});
				}
				return o;
			}
			return (
				n
					? Object.assign(o, { captchaResp: s })
					: Object.assign(o, { captchaResponse: s }),
				Object.assign(o, { clientType: "CLIENT_TYPE_WEB" }),
				Object.assign(o, { recaptchaVersion: "RECAPTCHA_ENTERPRISE" }),
				o
			);
		}
		async function eR(e, t, r, n, i) {
			var s, a;
			if ("EMAIL_PASSWORD_PROVIDER" === i)
				if (
					null == (s = e._getRecaptchaConfig()) ||
					!s.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")
				)
					return n(e, t).catch(async (i) => {
						if ("auth/missing-recaptcha-token" !== i.code)
							return Promise.reject(i);
						{
							console.log(
								`${r} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`,
							);
							const i = await ek(e, t, r, "getOobCode" === r);
							return n(e, i);
						}
					});
				else {
					const i = await ek(e, t, r, "getOobCode" === r);
					return n(e, i);
				}
			if ("PHONE_PROVIDER" !== i)
				return Promise.reject(i + " provider is not supported.");
			if (
				null == (a = e._getRecaptchaConfig())
					? void 0
					: a.isProviderEnabled("PHONE_PROVIDER")
			) {
				const i = await ek(e, t, r);
				return n(e, i).catch(async (i) => {
					var s;
					if (
						(null == (s = e._getRecaptchaConfig())
							? void 0
							: s.getProviderEnforcementState("PHONE_PROVIDER")) === "AUDIT" &&
						("auth/missing-recaptcha-token" === i.code ||
							"auth/invalid-app-credential" === i.code)
					) {
						console.log(
							`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${r} flow.`,
						);
						const i = await ek(e, t, r, !1, !0);
						return n(e, i);
					}
					return Promise.reject(i);
				});
			}
			{
				const i = await ek(e, t, r, !1, !0);
				return n(e, i);
			}
		}
		async function eN(e) {
			const t = e_(e),
				r = new x(
					await L(t, {
						clientType: "CLIENT_TYPE_WEB",
						version: "RECAPTCHA_ENTERPRISE",
					}),
				);
			null == t.tenantId
				? (t._agentRecaptchaConfig = r)
				: (t._tenantRecaptchaConfigs[t.tenantId] = r),
				r.isAnyProviderEnabled() && new eA(t).verify();
		}
		function eD(e, t, r) {
			const i = e_(e);
			m(/^https?:\/\//.test(t), i, "invalid-emulator-scheme");
			const s = !!(null == r ? void 0 : r.disableWarnings),
				a = eO(t),
				{ host: o, port: l } = ((e) => {
					const t = eO(e),
						r = /(\/\/)?([^?#/]+)/.exec(e.substr(t.length));
					if (!r) return { host: "", port: null };
					const n = r[2].split("@").pop() || "",
						i = /^(\[[^\]]+\])(:|$)/.exec(n);
					if (i) {
						const e = i[1];
						return { host: e, port: eP(n.substr(e.length + 1)) };
					}
					{
						const [e, t] = n.split(":");
						return { host: e, port: eP(t) };
					}
				})(t),
				u = null === l ? "" : `:${l}`,
				h = { url: `${a}//${o}${u}/` },
				c = Object.freeze({
					host: o,
					port: l,
					protocol: a.replace(":", ""),
					options: Object.freeze({ disableWarnings: s }),
				});
			if (!i._canInitEmulator) {
				m(i.config.emulator && i.emulatorConfig, i, "emulator-config-failed"),
					m(
						(0, n.deepEqual)(h, i.config.emulator) &&
							(0, n.deepEqual)(c, i.emulatorConfig),
						i,
						"emulator-config-failed",
					);
				return;
			}
			(i.config.emulator = h),
				(i.emulatorConfig = c),
				(i.settings.appVerificationDisabledForTesting = !0),
				(0, n.isCloudWorkstation)(o)
					? ((0, n.pingServer)(`${a}//${o}${u}`),
						(0, n.updateEmulatorBanner)("Auth", !0))
					: s ||
						(() => {
							function e() {
								const e = document.createElement("p"),
									t = e.style;
								(e.innerText =
									"Running in emulator mode. Do not use with production credentials."),
									(t.position = "fixed"),
									(t.width = "100%"),
									(t.backgroundColor = "#ffffff"),
									(t.border = ".1em solid #000000"),
									(t.color = "#b50000"),
									(t.bottom = "0px"),
									(t.left = "0px"),
									(t.margin = "0px"),
									(t.zIndex = "10000"),
									(t.textAlign = "center"),
									e.classList.add("firebase-emulator-warning"),
									document.body.appendChild(e);
							}
							"u" > typeof console &&
								"function" == typeof console.info &&
								console.info(
									"WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.",
								),
								"u" > typeof window &&
									"u" > typeof document &&
									("loading" === document.readyState
										? window.addEventListener("DOMContentLoaded", e)
										: e());
						})();
		}
		function eO(e) {
			const t = e.indexOf(":");
			return t < 0 ? "" : e.substr(0, t + 1);
		}
		function eP(e) {
			if (!e) return null;
			const t = Number(e);
			return isNaN(t) ? null : t;
		}
		class ex {
			constructor(e, t) {
				(this.providerId = e), (this.signInMethod = t);
			}
			toJSON() {
				return y("not implemented");
			}
			_getIdTokenResponse(e) {
				return y("not implemented");
			}
			_linkToIdToken(e, t) {
				return y("not implemented");
			}
			_getReauthenticationResolver(e) {
				return y("not implemented");
			}
		}
		async function eL(e, t) {
			return A(e, "POST", "/v1/accounts:signUp", t);
		}
		async function eM(e, t) {
			return R(e, "POST", "/v1/accounts:signInWithPassword", C(e, t));
		}
		async function eU(e, t) {
			return R(e, "POST", "/v1/accounts:signInWithEmailLink", C(e, t));
		}
		async function eV(e, t) {
			return R(e, "POST", "/v1/accounts:signInWithEmailLink", C(e, t));
		}
		class eF extends ex {
			constructor(e, t, r, n = null) {
				super("password", r),
					(this._email = e),
					(this._password = t),
					(this._tenantId = n);
			}
			static _fromEmailAndPassword(e, t) {
				return new eF(e, t, "password");
			}
			static _fromEmailAndCode(e, t, r = null) {
				return new eF(e, t, "emailLink", r);
			}
			toJSON() {
				return {
					email: this._email,
					password: this._password,
					signInMethod: this.signInMethod,
					tenantId: this._tenantId,
				};
			}
			static fromJSON(e) {
				const t = "string" == typeof e ? JSON.parse(e) : e;
				if (
					(null == t ? void 0 : t.email) &&
					(null == t ? void 0 : t.password)
				) {
					if ("password" === t.signInMethod)
						return eF._fromEmailAndPassword(t.email, t.password);
					else if ("emailLink" === t.signInMethod)
						return eF._fromEmailAndCode(t.email, t.password, t.tenantId);
				}
				return null;
			}
			async _getIdTokenResponse(e) {
				switch (this.signInMethod) {
					case "password":
						return eR(
							e,
							{
								returnSecureToken: !0,
								email: this._email,
								password: this._password,
								clientType: "CLIENT_TYPE_WEB",
							},
							"signInWithPassword",
							eM,
							"EMAIL_PASSWORD_PROVIDER",
						);
					case "emailLink":
						return eU(e, { email: this._email, oobCode: this._password });
					default:
						c(e, "internal-error");
				}
			}
			async _linkToIdToken(e, t) {
				switch (this.signInMethod) {
					case "password":
						return eR(
							e,
							{
								idToken: t,
								returnSecureToken: !0,
								email: this._email,
								password: this._password,
								clientType: "CLIENT_TYPE_WEB",
							},
							"signUpPassword",
							eL,
							"EMAIL_PASSWORD_PROVIDER",
						);
					case "emailLink":
						return eV(e, {
							idToken: t,
							email: this._email,
							oobCode: this._password,
						});
					default:
						c(e, "internal-error");
				}
			}
			_getReauthenticationResolver(e) {
				return this._getIdTokenResponse(e);
			}
		}
		async function ej(e, t) {
			return R(e, "POST", "/v1/accounts:signInWithIdp", C(e, t));
		}
		class eB extends ex {
			constructor() {
				super(...arguments), (this.pendingToken = null);
			}
			static _fromParams(e) {
				const t = new eB(e.providerId, e.signInMethod);
				return (
					e.idToken || e.accessToken
						? (e.idToken && (t.idToken = e.idToken),
							e.accessToken && (t.accessToken = e.accessToken),
							e.nonce && !e.pendingToken && (t.nonce = e.nonce),
							e.pendingToken && (t.pendingToken = e.pendingToken))
						: e.oauthToken && e.oauthTokenSecret
							? ((t.accessToken = e.oauthToken),
								(t.secret = e.oauthTokenSecret))
							: c("argument-error"),
					t
				);
			}
			toJSON() {
				return {
					idToken: this.idToken,
					accessToken: this.accessToken,
					secret: this.secret,
					nonce: this.nonce,
					pendingToken: this.pendingToken,
					providerId: this.providerId,
					signInMethod: this.signInMethod,
				};
			}
			static fromJSON(e) {
				const t = "string" == typeof e ? JSON.parse(e) : e,
					{ providerId: r, signInMethod: n } = t,
					i = s(t, ["providerId", "signInMethod"]);
				if (!r || !n) return null;
				const a = new eB(r, n);
				return (
					(a.idToken = i.idToken || void 0),
					(a.accessToken = i.accessToken || void 0),
					(a.secret = i.secret),
					(a.nonce = i.nonce),
					(a.pendingToken = i.pendingToken || null),
					a
				);
			}
			_getIdTokenResponse(e) {
				return ej(e, this.buildRequest());
			}
			_linkToIdToken(e, t) {
				const r = this.buildRequest();
				return (r.idToken = t), ej(e, r);
			}
			_getReauthenticationResolver(e) {
				const t = this.buildRequest();
				return (t.autoCreate = !1), ej(e, t);
			}
			buildRequest() {
				const e = { requestUri: "http://localhost", returnSecureToken: !0 };
				if (this.pendingToken) e.pendingToken = this.pendingToken;
				else {
					const t = {};
					this.idToken && (t.id_token = this.idToken),
						this.accessToken && (t.access_token = this.accessToken),
						this.secret && (t.oauth_token_secret = this.secret),
						(t.providerId = this.providerId),
						this.nonce && !this.pendingToken && (t.nonce = this.nonce),
						(e.postBody = (0, n.querystring)(t));
				}
				return e;
			}
		}
		async function eq(e, t) {
			return A(e, "POST", "/v1/accounts:sendVerificationCode", C(e, t));
		}
		async function e$(e, t) {
			return R(e, "POST", "/v1/accounts:signInWithPhoneNumber", C(e, t));
		}
		async function ez(e, t) {
			const r = await R(
				e,
				"POST",
				"/v1/accounts:signInWithPhoneNumber",
				C(e, t),
			);
			if (r.temporaryProof)
				throw O(e, "account-exists-with-different-credential", r);
			return r;
		}
		const eH = { USER_NOT_FOUND: "user-not-found" };
		async function eG(e, t) {
			return R(
				e,
				"POST",
				"/v1/accounts:signInWithPhoneNumber",
				C(e, Object.assign(Object.assign({}, t), { operation: "REAUTH" })),
				eH,
			);
		}
		class eK extends ex {
			constructor(e) {
				super("phone", "phone"), (this.params = e);
			}
			static _fromVerification(e, t) {
				return new eK({ verificationId: e, verificationCode: t });
			}
			static _fromTokenResponse(e, t) {
				return new eK({ phoneNumber: e, temporaryProof: t });
			}
			_getIdTokenResponse(e) {
				return e$(e, this._makeVerificationRequest());
			}
			_linkToIdToken(e, t) {
				return ez(
					e,
					Object.assign({ idToken: t }, this._makeVerificationRequest()),
				);
			}
			_getReauthenticationResolver(e) {
				return eG(e, this._makeVerificationRequest());
			}
			_makeVerificationRequest() {
				const {
					temporaryProof: e,
					phoneNumber: t,
					verificationId: r,
					verificationCode: n,
				} = this.params;
				return e && t
					? { temporaryProof: e, phoneNumber: t }
					: { sessionInfo: r, code: n };
			}
			toJSON() {
				const e = { providerId: this.providerId };
				return (
					this.params.phoneNumber && (e.phoneNumber = this.params.phoneNumber),
					this.params.temporaryProof &&
						(e.temporaryProof = this.params.temporaryProof),
					this.params.verificationCode &&
						(e.verificationCode = this.params.verificationCode),
					this.params.verificationId &&
						(e.verificationId = this.params.verificationId),
					e
				);
			}
			static fromJSON(e) {
				"string" == typeof e && (e = JSON.parse(e));
				const {
					verificationId: t,
					verificationCode: r,
					phoneNumber: n,
					temporaryProof: i,
				} = e;
				return r || t || n || i
					? new eK({
							verificationId: t,
							verificationCode: r,
							phoneNumber: n,
							temporaryProof: i,
						})
					: null;
			}
		}
		class eW {
			constructor(e) {
				var t, r, i, s, a, o;
				const l = (0, n.querystringDecode)((0, n.extractQuerystring)(e)),
					u = null != (t = l.apiKey) ? t : null,
					h = null != (r = l.oobCode) ? r : null,
					c = ((e) => {
						switch (e) {
							case "recoverEmail":
								return "RECOVER_EMAIL";
							case "resetPassword":
								return "PASSWORD_RESET";
							case "signIn":
								return "EMAIL_SIGNIN";
							case "verifyEmail":
								return "VERIFY_EMAIL";
							case "verifyAndChangeEmail":
								return "VERIFY_AND_CHANGE_EMAIL";
							case "revertSecondFactorAddition":
								return "REVERT_SECOND_FACTOR_ADDITION";
							default:
								return null;
						}
					})(null != (i = l.mode) ? i : null);
				m(u && h && c, "argument-error"),
					(this.apiKey = u),
					(this.operation = c),
					(this.code = h),
					(this.continueUrl = null != (s = l.continueUrl) ? s : null),
					(this.languageCode = null != (a = l.lang) ? a : null),
					(this.tenantId = null != (o = l.tenantId) ? o : null);
			}
			static parseLink(e) {
				let t,
					r,
					i,
					s =
						((r = (t = (0, n.querystringDecode)(
							(0, n.extractQuerystring)(e),
						).link)
							? (0, n.querystringDecode)((0, n.extractQuerystring)(t))
									.deep_link_id
							: null),
						((i = (0, n.querystringDecode)(
							(0, n.extractQuerystring)(e),
						).deep_link_id)
							? (0, n.querystringDecode)((0, n.extractQuerystring)(i)).link
							: null) ||
							i ||
							r ||
							t ||
							e);
				try {
					return new eW(s);
				} catch (e) {
					return null;
				}
			}
		}
		class eQ {
			constructor() {
				this.providerId = eQ.PROVIDER_ID;
			}
			static credential(e, t) {
				return eF._fromEmailAndPassword(e, t);
			}
			static credentialWithLink(e, t) {
				const r = eW.parseLink(t);
				return (
					m(r, "argument-error"), eF._fromEmailAndCode(e, r.code, r.tenantId)
				);
			}
		}
		(eQ.PROVIDER_ID = "password"),
			(eQ.EMAIL_PASSWORD_SIGN_IN_METHOD = "password"),
			(eQ.EMAIL_LINK_SIGN_IN_METHOD = "emailLink");
		class eJ {
			constructor(e) {
				(this.providerId = e),
					(this.defaultLanguageCode = null),
					(this.customParameters = {});
			}
			setDefaultLanguage(e) {
				this.defaultLanguageCode = e;
			}
			setCustomParameters(e) {
				return (this.customParameters = e), this;
			}
			getCustomParameters() {
				return this.customParameters;
			}
		}
		class eX extends eJ {
			constructor() {
				super(...arguments), (this.scopes = []);
			}
			addScope(e) {
				return this.scopes.includes(e) || this.scopes.push(e), this;
			}
			getScopes() {
				return [...this.scopes];
			}
		}
		class eY extends eX {
			constructor() {
				super("facebook.com");
			}
			static credential(e) {
				return eB._fromParams({
					providerId: eY.PROVIDER_ID,
					signInMethod: eY.FACEBOOK_SIGN_IN_METHOD,
					accessToken: e,
				});
			}
			static credentialFromResult(e) {
				return eY.credentialFromTaggedObject(e);
			}
			static credentialFromError(e) {
				return eY.credentialFromTaggedObject(e.customData || {});
			}
			static credentialFromTaggedObject({ _tokenResponse: e }) {
				if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken)
					return null;
				try {
					return eY.credential(e.oauthAccessToken);
				} catch (e) {
					return null;
				}
			}
		}
		(eY.FACEBOOK_SIGN_IN_METHOD = "facebook.com"),
			(eY.PROVIDER_ID = "facebook.com");
		class eZ extends eX {
			constructor() {
				super("google.com"), this.addScope("profile");
			}
			static credential(e, t) {
				return eB._fromParams({
					providerId: eZ.PROVIDER_ID,
					signInMethod: eZ.GOOGLE_SIGN_IN_METHOD,
					idToken: e,
					accessToken: t,
				});
			}
			static credentialFromResult(e) {
				return eZ.credentialFromTaggedObject(e);
			}
			static credentialFromError(e) {
				return eZ.credentialFromTaggedObject(e.customData || {});
			}
			static credentialFromTaggedObject({ _tokenResponse: e }) {
				if (!e) return null;
				const { oauthIdToken: t, oauthAccessToken: r } = e;
				if (!t && !r) return null;
				try {
					return eZ.credential(t, r);
				} catch (e) {
					return null;
				}
			}
		}
		(eZ.GOOGLE_SIGN_IN_METHOD = "google.com"), (eZ.PROVIDER_ID = "google.com");
		class e0 extends eX {
			constructor() {
				super("github.com");
			}
			static credential(e) {
				return eB._fromParams({
					providerId: e0.PROVIDER_ID,
					signInMethod: e0.GITHUB_SIGN_IN_METHOD,
					accessToken: e,
				});
			}
			static credentialFromResult(e) {
				return e0.credentialFromTaggedObject(e);
			}
			static credentialFromError(e) {
				return e0.credentialFromTaggedObject(e.customData || {});
			}
			static credentialFromTaggedObject({ _tokenResponse: e }) {
				if (!e || !("oauthAccessToken" in e) || !e.oauthAccessToken)
					return null;
				try {
					return e0.credential(e.oauthAccessToken);
				} catch (e) {
					return null;
				}
			}
		}
		(e0.GITHUB_SIGN_IN_METHOD = "github.com"), (e0.PROVIDER_ID = "github.com");
		class e1 extends eX {
			constructor() {
				super("twitter.com");
			}
			static credential(e, t) {
				return eB._fromParams({
					providerId: e1.PROVIDER_ID,
					signInMethod: e1.TWITTER_SIGN_IN_METHOD,
					oauthToken: e,
					oauthTokenSecret: t,
				});
			}
			static credentialFromResult(e) {
				return e1.credentialFromTaggedObject(e);
			}
			static credentialFromError(e) {
				return e1.credentialFromTaggedObject(e.customData || {});
			}
			static credentialFromTaggedObject({ _tokenResponse: e }) {
				if (!e) return null;
				const { oauthAccessToken: t, oauthTokenSecret: r } = e;
				if (!t || !r) return null;
				try {
					return e1.credential(t, r);
				} catch (e) {
					return null;
				}
			}
		}
		async function e2(e, t) {
			return R(e, "POST", "/v1/accounts:signUp", C(e, t));
		}
		(e1.TWITTER_SIGN_IN_METHOD = "twitter.com"),
			(e1.PROVIDER_ID = "twitter.com");
		class e6 {
			constructor(e) {
				(this.user = e.user),
					(this.providerId = e.providerId),
					(this._tokenResponse = e._tokenResponse),
					(this.operationType = e.operationType);
			}
			static async _fromIdTokenResponse(e, t, r, n = !1) {
				return new e6({
					user: await Z._fromIdTokenResponse(e, r, n),
					providerId: e3(r),
					_tokenResponse: r,
					operationType: t,
				});
			}
			static async _forOperation(e, t, r) {
				return (
					await e._updateTokensIfNecessary(r, !0),
					new e6({
						user: e,
						providerId: e3(r),
						_tokenResponse: r,
						operationType: t,
					})
				);
			}
		}
		function e3(e) {
			return e.providerId ? e.providerId : "phoneNumber" in e ? "phone" : null;
		}
		class e5 extends n.FirebaseError {
			constructor(e, t, r, n) {
				var i;
				super(t.code, t.message),
					(this.operationType = r),
					(this.user = n),
					Object.setPrototypeOf(this, e5.prototype),
					(this.customData = {
						appName: e.name,
						tenantId: null != (i = e.tenantId) ? i : void 0,
						_serverResponse: t.customData._serverResponse,
						operationType: r,
					});
			}
			static _fromErrorAndOperation(e, t, r, n) {
				return new e5(e, t, r, n);
			}
		}
		function e4(e, t, r, n) {
			return (
				"reauthenticate" === t
					? r._getReauthenticationResolver(e)
					: r._getIdTokenResponse(e)
			).catch((r) => {
				if ("auth/multi-factor-auth-required" === r.code)
					throw e5._fromErrorAndOperation(e, r, t, n);
				throw r;
			});
		}
		async function e8(e, t, r = !1) {
			const n = await $(e, t._linkToIdToken(e.auth, await e.getIdToken()), r);
			return e6._forOperation(e, "link", n);
		}
		async function e7(e, t, n = !1) {
			const { auth: i } = e;
			if ((0, r._isFirebaseServerApp)(i.app)) return Promise.reject(p(i));
			const s = "reauthenticate";
			try {
				const r = await $(e, e4(i, s, t, e), n);
				m(r.idToken, i, "internal-error");
				const a = B(r.idToken);
				m(a, i, "internal-error");
				const { sub: o } = a;
				return m(e.uid === o, i, "user-mismatch"), e6._forOperation(e, s, r);
			} catch (e) {
				throw (
					((null == e ? void 0 : e.code) === "auth/user-not-found" &&
						c(i, "user-mismatch"),
					e)
				);
			}
		}
		async function e9(e, t, n = !1) {
			if ((0, r._isFirebaseServerApp)(e.app)) return Promise.reject(p(e));
			const i = "signIn",
				s = await e4(e, i, t),
				a = await e6._fromIdTokenResponse(e, i, s);
			return n || (await e._updateCurrentUser(a.user)), a;
		}
		async function te(e, t) {
			return e9(e_(e), t);
		}
		class tt {
			constructor(e, t) {
				(this.factorId = e),
					(this.uid = t.mfaEnrollmentId),
					(this.enrollmentTime = new Date(t.enrolledAt).toUTCString()),
					(this.displayName = t.displayName);
			}
			static _fromServerResponse(e, t) {
				return "phoneInfo" in t
					? tr._fromServerResponse(e, t)
					: "totpInfo" in t
						? tn._fromServerResponse(e, t)
						: c(e, "internal-error");
			}
		}
		class tr extends tt {
			constructor(e) {
				super("phone", e), (this.phoneNumber = e.phoneInfo);
			}
			static _fromServerResponse(e, t) {
				return new tr(t);
			}
		}
		class tn extends tt {
			constructor(e) {
				super("totp", e);
			}
			static _fromServerResponse(e, t) {
				return new tn(t);
			}
		}
		async function ti(e) {
			const t = e_(e);
			t._getPasswordPolicyInternal() && (await t._updatePasswordPolicy());
		}
		async function ts(e, t, n) {
			if ((0, r._isFirebaseServerApp)(e.app)) return Promise.reject(p(e));
			const i = e_(e),
				s = eR(
					i,
					{
						returnSecureToken: !0,
						email: t,
						password: n,
						clientType: "CLIENT_TYPE_WEB",
					},
					"signUpPassword",
					e2,
					"EMAIL_PASSWORD_PROVIDER",
				),
				a = await s.catch((t) => {
					throw (
						("auth/password-does-not-meet-requirements" === t.code && ti(e), t)
					);
				}),
				o = await e6._fromIdTokenResponse(i, "signIn", a);
			return await i._updateCurrentUser(o.user), o;
		}
		function ta(e, t, i) {
			return (0, r._isFirebaseServerApp)(e.app)
				? Promise.reject(p(e))
				: te((0, n.getModularInstance)(e), eQ.credential(t, i)).catch(
						async (t) => {
							throw (
								("auth/password-does-not-meet-requirements" === t.code && ti(e),
								t)
							);
						},
					);
		}
		function to(e, t, r, i) {
			return (0, n.getModularInstance)(e).onAuthStateChanged(t, r, i);
		}
		function tl(e) {
			return (0, n.getModularInstance)(e).signOut();
		}
		function tu(e, t) {
			return A(e, "POST", "/v2/accounts/mfaEnrollment:start", C(e, t));
		}
		new WeakMap();
		const th = "__sak";
		class tc {
			constructor(e, t) {
				(this.storageRetriever = e), (this.type = t);
			}
			_isAvailable() {
				try {
					if (!this.storage) return Promise.resolve(!1);
					return (
						this.storage.setItem(th, "1"),
						this.storage.removeItem(th),
						Promise.resolve(!0)
					);
				} catch (e) {
					return Promise.resolve(!1);
				}
			}
			_set(e, t) {
				return this.storage.setItem(e, JSON.stringify(t)), Promise.resolve();
			}
			_get(e) {
				const t = this.storage.getItem(e);
				return Promise.resolve(t ? JSON.parse(t) : null);
			}
			_remove(e) {
				return this.storage.removeItem(e), Promise.resolve();
			}
			get storage() {
				return this.storageRetriever();
			}
		}
		class td extends tc {
			constructor() {
				super(() => window.localStorage, "LOCAL"),
					(this.boundEventHandler = (e, t) => this.onStorageEvent(e, t)),
					(this.listeners = {}),
					(this.localCache = {}),
					(this.pollTimer = null),
					(this.fallbackToPolling = ep()),
					(this._shouldAllowMigration = !0);
			}
			forAllChangedKeys(e) {
				for (const t of Object.keys(this.listeners)) {
					const r = this.storage.getItem(t),
						n = this.localCache[t];
					r !== n && e(t, n, r);
				}
			}
			onStorageEvent(e, t = !1) {
				if (!e.key)
					return void this.forAllChangedKeys((e, t, r) => {
						this.notifyListeners(e, r);
					});
				const r = e.key;
				t ? this.detachListener() : this.stopPolling();
				const i = () => {
						const e = this.storage.getItem(r);
						(t || this.localCache[r] !== e) && this.notifyListeners(r, e);
					},
					s = this.storage.getItem(r);
				(0, n.isIE)() &&
				10 === document.documentMode &&
				s !== e.newValue &&
				e.newValue !== e.oldValue
					? setTimeout(i, 10)
					: i();
			}
			notifyListeners(e, t) {
				this.localCache[e] = t;
				const r = this.listeners[e];
				if (r) for (const e of Array.from(r)) e(t ? JSON.parse(t) : t);
			}
			startPolling() {
				this.stopPolling(),
					(this.pollTimer = setInterval(() => {
						this.forAllChangedKeys((e, t, r) => {
							this.onStorageEvent(
								new StorageEvent("storage", {
									key: e,
									oldValue: t,
									newValue: r,
								}),
								!0,
							);
						});
					}, 1e3));
			}
			stopPolling() {
				this.pollTimer &&
					(clearInterval(this.pollTimer), (this.pollTimer = null));
			}
			attachListener() {
				window.addEventListener("storage", this.boundEventHandler);
			}
			detachListener() {
				window.removeEventListener("storage", this.boundEventHandler);
			}
			_addListener(e, t) {
				0 === Object.keys(this.listeners).length &&
					(this.fallbackToPolling
						? this.startPolling()
						: this.attachListener()),
					this.listeners[e] ||
						((this.listeners[e] = new Set()),
						(this.localCache[e] = this.storage.getItem(e))),
					this.listeners[e].add(t);
			}
			_removeListener(e, t) {
				this.listeners[e] &&
					(this.listeners[e].delete(t),
					0 === this.listeners[e].size && delete this.listeners[e]),
					0 === Object.keys(this.listeners).length &&
						(this.detachListener(), this.stopPolling());
			}
			async _set(e, t) {
				await super._set(e, t), (this.localCache[e] = JSON.stringify(t));
			}
			async _get(e) {
				const t = await super._get(e);
				return (this.localCache[e] = JSON.stringify(t)), t;
			}
			async _remove(e) {
				await super._remove(e), delete this.localCache[e];
			}
		}
		td.type = "LOCAL";
		class tf extends tc {
			constructor() {
				super(() => window.sessionStorage, "SESSION");
			}
			_addListener(e, t) {}
			_removeListener(e, t) {}
		}
		tf.type = "SESSION";
		class tp {
			constructor(e) {
				(this.eventTarget = e),
					(this.handlersMap = {}),
					(this.boundEventHandler = this.handleEvent.bind(this));
			}
			static _getInstance(e) {
				const t = tp.receivers.find((t) => t.isListeningto(e));
				if (t) return t;
				const r = new tp(e);
				return tp.receivers.push(r), r;
			}
			isListeningto(e) {
				return this.eventTarget === e;
			}
			async handleEvent(e) {
				const { eventId: t, eventType: r, data: n } = e.data,
					i = this.handlersMap[r];
				if (!(null == i ? void 0 : i.size)) return;
				e.ports[0].postMessage({ status: "ack", eventId: t, eventType: r });
				const s = Array.from(i).map(async (t) => t(e.origin, n)),
					a = await Promise.all(
						s.map(async (e) => {
							try {
								const t = await e;
								return { fulfilled: !0, value: t };
							} catch (e) {
								return { fulfilled: !1, reason: e };
							}
						}),
					);
				e.ports[0].postMessage({
					status: "done",
					eventId: t,
					eventType: r,
					response: a,
				});
			}
			_subscribe(e, t) {
				0 === Object.keys(this.handlersMap).length &&
					this.eventTarget.addEventListener("message", this.boundEventHandler),
					this.handlersMap[e] || (this.handlersMap[e] = new Set()),
					this.handlersMap[e].add(t);
			}
			_unsubscribe(e, t) {
				this.handlersMap[e] && t && this.handlersMap[e].delete(t),
					(t && 0 !== this.handlersMap[e].size) || delete this.handlersMap[e],
					0 === Object.keys(this.handlersMap).length &&
						this.eventTarget.removeEventListener(
							"message",
							this.boundEventHandler,
						);
			}
		}
		function tg(e = "", t = 10) {
			let r = "";
			for (let e = 0; e < t; e++) r += Math.floor(10 * Math.random());
			return e + r;
		}
		tp.receivers = [];
		class tm {
			constructor(e) {
				(this.target = e), (this.handlers = new Set());
			}
			removeMessageHandler(e) {
				e.messageChannel &&
					(e.messageChannel.port1.removeEventListener("message", e.onMessage),
					e.messageChannel.port1.close()),
					this.handlers.delete(e);
			}
			async _send(e, t, r = 50) {
				let n,
					i,
					s = "u" > typeof MessageChannel ? new MessageChannel() : null;
				if (!s) throw Error("connection_unavailable");
				return new Promise((a, o) => {
					const l = tg("", 20);
					s.port1.start();
					const u = setTimeout(() => {
						o(Error("unsupported_event"));
					}, r);
					(i = {
						messageChannel: s,
						onMessage(e) {
							if (e.data.eventId === l)
								switch (e.data.status) {
									case "ack":
										clearTimeout(u),
											(n = setTimeout(() => {
												o(Error("timeout"));
											}, 3e3));
										break;
									case "done":
										clearTimeout(n), a(e.data.response);
										break;
									default:
										clearTimeout(u),
											clearTimeout(n),
											o(Error("invalid_response"));
								}
						},
					}),
						this.handlers.add(i),
						s.port1.addEventListener("message", i.onMessage),
						this.target.postMessage({ eventType: e, eventId: l, data: t }, [
							s.port2,
						]);
				}).finally(() => {
					i && this.removeMessageHandler(i);
				});
			}
		}
		function ty() {
			return window;
		}
		function tv() {
			return (
				void 0 !== ty().WorkerGlobalScope &&
				"function" == typeof ty().importScripts
			);
		}
		async function tw() {
			if (!(null == navigator ? void 0 : navigator.serviceWorker)) return null;
			try {
				return (await navigator.serviceWorker.ready).active;
			} catch (e) {
				return null;
			}
		}
		const t_ = "firebaseLocalStorageDb",
			tE = "firebaseLocalStorage",
			tb = "fbase_key";
		class tI {
			constructor(e) {
				this.request = e;
			}
			toPromise() {
				return new Promise((e, t) => {
					this.request.addEventListener("success", () => {
						e(this.request.result);
					}),
						this.request.addEventListener("error", () => {
							t(this.request.error);
						});
				});
			}
		}
		function tT(e, t) {
			return e.transaction([tE], t ? "readwrite" : "readonly").objectStore(tE);
		}
		function tS() {
			const e = indexedDB.open(t_, 1);
			return new Promise((t, r) => {
				e.addEventListener("error", () => {
					r(e.error);
				}),
					e.addEventListener("upgradeneeded", () => {
						const t = e.result;
						try {
							t.createObjectStore(tE, { keyPath: tb });
						} catch (e) {
							r(e);
						}
					}),
					e.addEventListener("success", async () => {
						const r = e.result;
						r.objectStoreNames.contains(tE)
							? t(r)
							: (r.close(),
								await new tI(indexedDB.deleteDatabase(t_)).toPromise(),
								t(await tS()));
					});
			});
		}
		async function tC(e, t, r) {
			return new tI(tT(e, !0).put({ [tb]: t, value: r })).toPromise();
		}
		async function tA(e, t) {
			const r = tT(e, !1).get(t),
				n = await new tI(r).toPromise();
			return void 0 === n ? null : n.value;
		}
		function tk(e, t) {
			return new tI(tT(e, !0).delete(t)).toPromise();
		}
		class tR {
			constructor() {
				(this.type = "LOCAL"),
					(this._shouldAllowMigration = !0),
					(this.listeners = {}),
					(this.localCache = {}),
					(this.pollTimer = null),
					(this.pendingWrites = 0),
					(this.receiver = null),
					(this.sender = null),
					(this.serviceWorkerReceiverAvailable = !1),
					(this.activeServiceWorker = null),
					(this._workerInitializationPromise =
						this.initializeServiceWorkerMessaging().then(
							() => {},
							() => {},
						));
			}
			async _openDb() {
				return this.db || (this.db = await tS()), this.db;
			}
			async _withRetries(e) {
				let t = 0;
				for (;;)
					try {
						const t = await this._openDb();
						return await e(t);
					} catch (e) {
						if (t++ > 3) throw e;
						this.db && (this.db.close(), (this.db = void 0));
					}
			}
			async initializeServiceWorkerMessaging() {
				return tv() ? this.initializeReceiver() : this.initializeSender();
			}
			async initializeReceiver() {
				(this.receiver = tp._getInstance(tv() ? self : null)),
					this.receiver._subscribe("keyChanged", async (e, t) => ({
						keyProcessed: (await this._poll()).includes(t.key),
					})),
					this.receiver._subscribe("ping", async (e, t) => ["keyChanged"]);
			}
			async initializeSender() {
				var e, t;
				if (
					((this.activeServiceWorker = await tw()), !this.activeServiceWorker)
				)
					return;
				this.sender = new tm(this.activeServiceWorker);
				const r = await this.sender._send("ping", {}, 800);
				r &&
					(null == (e = r[0]) ? void 0 : e.fulfilled) &&
					(null == (t = r[0]) ? void 0 : t.value.includes("keyChanged")) &&
					(this.serviceWorkerReceiverAvailable = !0);
			}
			async notifyServiceWorker(e) {
				var t;
				if (
					this.sender &&
					this.activeServiceWorker &&
					((null == (t = null == navigator ? void 0 : navigator.serviceWorker)
						? void 0
						: t.controller) || null) === this.activeServiceWorker
				)
					try {
						await this.sender._send(
							"keyChanged",
							{ key: e },
							this.serviceWorkerReceiverAvailable ? 800 : 50,
						);
					} catch (e) {}
			}
			async _isAvailable() {
				try {
					if (!indexedDB) return !1;
					const e = await tS();
					return await tC(e, th, "1"), await tk(e, th), !0;
				} catch (e) {}
				return !1;
			}
			async _withPendingWrite(e) {
				this.pendingWrites++;
				try {
					await e();
				} finally {
					this.pendingWrites--;
				}
			}
			async _set(e, t) {
				return this._withPendingWrite(
					async () => (
						await this._withRetries((r) => tC(r, e, t)),
						(this.localCache[e] = t),
						this.notifyServiceWorker(e)
					),
				);
			}
			async _get(e) {
				const t = await this._withRetries((t) => tA(t, e));
				return (this.localCache[e] = t), t;
			}
			async _remove(e) {
				return this._withPendingWrite(
					async () => (
						await this._withRetries((t) => tk(t, e)),
						delete this.localCache[e],
						this.notifyServiceWorker(e)
					),
				);
			}
			async _poll() {
				const e = await this._withRetries((e) =>
					new tI(tT(e, !1).getAll()).toPromise(),
				);
				if (!e || 0 !== this.pendingWrites) return [];
				const t = [],
					r = new Set();
				if (0 !== e.length)
					for (const { fbase_key: n, value: i } of e)
						r.add(n),
							JSON.stringify(this.localCache[n]) !== JSON.stringify(i) &&
								(this.notifyListeners(n, i), t.push(n));
				for (const e of Object.keys(this.localCache))
					this.localCache[e] &&
						!r.has(e) &&
						(this.notifyListeners(e, null), t.push(e));
				return t;
			}
			notifyListeners(e, t) {
				this.localCache[e] = t;
				const r = this.listeners[e];
				if (r) for (const e of Array.from(r)) e(t);
			}
			startPolling() {
				this.stopPolling(),
					(this.pollTimer = setInterval(async () => this._poll(), 800));
			}
			stopPolling() {
				this.pollTimer &&
					(clearInterval(this.pollTimer), (this.pollTimer = null));
			}
			_addListener(e, t) {
				0 === Object.keys(this.listeners).length && this.startPolling(),
					this.listeners[e] || ((this.listeners[e] = new Set()), this._get(e)),
					this.listeners[e].add(t);
			}
			_removeListener(e, t) {
				this.listeners[e] &&
					(this.listeners[e].delete(t),
					0 === this.listeners[e].size && delete this.listeners[e]),
					0 === Object.keys(this.listeners).length && this.stopPolling();
			}
		}
		function tN(e, t) {
			return A(e, "POST", "/v2/accounts/mfaSignIn:start", C(e, t));
		}
		(tR.type = "LOCAL"), eI("rcb"), new _(3e4, 6e4);
		const tD = "recaptcha";
		async function tO(e, t, r) {
			var n;
			if (!e._getRecaptchaConfig())
				try {
					await eN(e);
				} catch (e) {
					console.log(
						"Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.",
					);
				}
			try {
				let i;
				if (
					((i = "string" == typeof t ? { phoneNumber: t } : t), "session" in i)
				) {
					const t = i.session;
					if ("phoneNumber" in i) {
						m("enroll" === t.type, e, "internal-error");
						const n = {
								idToken: t.credential,
								phoneEnrollmentInfo: {
									phoneNumber: i.phoneNumber,
									clientType: "CLIENT_TYPE_WEB",
								},
							},
							s = async (e, t) => {
								if (t.phoneEnrollmentInfo.captchaResponse === eC) {
									m((null == r ? void 0 : r.type) === tD, e, "argument-error");
									const n = await tP(e, t, r);
									return tu(e, n);
								}
								return tu(e, t);
							},
							a = eR(e, n, "mfaSmsEnrollment", s, "PHONE_PROVIDER");
						return (await a.catch((e) => Promise.reject(e))).phoneSessionInfo
							.sessionInfo;
					}
					{
						m("signin" === t.type, e, "internal-error");
						const s =
							(null == (n = i.multiFactorHint) ? void 0 : n.uid) ||
							i.multiFactorUid;
						m(s, e, "missing-multi-factor-info");
						const a = {
								mfaPendingCredential: t.credential,
								mfaEnrollmentId: s,
								phoneSignInInfo: { clientType: "CLIENT_TYPE_WEB" },
							},
							o = async (e, t) => {
								if (t.phoneSignInInfo.captchaResponse === eC) {
									m((null == r ? void 0 : r.type) === tD, e, "argument-error");
									const n = await tP(e, t, r);
									return tN(e, n);
								}
								return tN(e, t);
							},
							l = eR(e, a, "mfaSmsSignIn", o, "PHONE_PROVIDER");
						return (await l.catch((e) => Promise.reject(e))).phoneResponseInfo
							.sessionInfo;
					}
				}
				{
					const t = {
							phoneNumber: i.phoneNumber,
							clientType: "CLIENT_TYPE_WEB",
						},
						n = async (e, t) => {
							if (t.captchaResponse === eC) {
								m((null == r ? void 0 : r.type) === tD, e, "argument-error");
								const n = await tP(e, t, r);
								return eq(e, n);
							}
							return eq(e, t);
						},
						s = eR(e, t, "sendVerificationCode", n, "PHONE_PROVIDER");
					return (await s.catch((e) => Promise.reject(e))).sessionInfo;
				}
			} finally {
				null == r || r._reset();
			}
		}
		async function tP(e, t, r) {
			m(r.type === tD, e, "argument-error");
			const n = await r.verify();
			m("string" == typeof n, e, "argument-error");
			const i = Object.assign({}, t);
			if ("phoneEnrollmentInfo" in i) {
				const e = i.phoneEnrollmentInfo.phoneNumber,
					t = i.phoneEnrollmentInfo.captchaResponse,
					r = i.phoneEnrollmentInfo.clientType,
					s = i.phoneEnrollmentInfo.recaptchaVersion;
				return (
					Object.assign(i, {
						phoneEnrollmentInfo: {
							phoneNumber: e,
							recaptchaToken: n,
							captchaResponse: t,
							clientType: r,
							recaptchaVersion: s,
						},
					}),
					i
				);
			}
			if (!("phoneSignInInfo" in i))
				return Object.assign(i, { recaptchaToken: n }), i;
			{
				const e = i.phoneSignInInfo.captchaResponse,
					t = i.phoneSignInInfo.clientType,
					r = i.phoneSignInInfo.recaptchaVersion;
				return (
					Object.assign(i, {
						phoneSignInInfo: {
							recaptchaToken: n,
							captchaResponse: e,
							clientType: t,
							recaptchaVersion: r,
						},
					}),
					i
				);
			}
		}
		class tx {
			constructor(e) {
				(this.providerId = tx.PROVIDER_ID), (this.auth = e_(e));
			}
			verifyPhoneNumber(e, t) {
				return tO(this.auth, e, (0, n.getModularInstance)(t));
			}
			static credential(e, t) {
				return eK._fromVerification(e, t);
			}
			static credentialFromResult(e) {
				return tx.credentialFromTaggedObject(e);
			}
			static credentialFromError(e) {
				return tx.credentialFromTaggedObject(e.customData || {});
			}
			static credentialFromTaggedObject({ _tokenResponse: e }) {
				if (!e) return null;
				const { phoneNumber: t, temporaryProof: r } = e;
				return t && r ? eK._fromTokenResponse(t, r) : null;
			}
		}
		(tx.PROVIDER_ID = "phone"), (tx.PHONE_SIGN_IN_METHOD = "phone");
		class tL extends ex {
			constructor(e) {
				super("custom", "custom"), (this.params = e);
			}
			_getIdTokenResponse(e) {
				return ej(e, this._buildIdpRequest());
			}
			_linkToIdToken(e, t) {
				return ej(e, this._buildIdpRequest(t));
			}
			_getReauthenticationResolver(e) {
				return ej(e, this._buildIdpRequest());
			}
			_buildIdpRequest(e) {
				const t = {
					requestUri: this.params.requestUri,
					sessionId: this.params.sessionId,
					postBody: this.params.postBody,
					tenantId: this.params.tenantId,
					pendingToken: this.params.pendingToken,
					returnSecureToken: !0,
					returnIdpCredential: !0,
				};
				return e && (t.idToken = e), t;
			}
		}
		function tM(e) {
			return e9(e.auth, new tL(e), e.bypassAuthState);
		}
		function tU(e) {
			const { auth: t, user: r } = e;
			return m(r, t, "internal-error"), e7(r, new tL(e), e.bypassAuthState);
		}
		async function tV(e) {
			const { auth: t, user: r } = e;
			return m(r, t, "internal-error"), e8(r, new tL(e), e.bypassAuthState);
		}
		class tF {
			constructor(e, t, r, n, i = !1) {
				(this.auth = e),
					(this.resolver = r),
					(this.user = n),
					(this.bypassAuthState = i),
					(this.pendingPromise = null),
					(this.eventManager = null),
					(this.filter = Array.isArray(t) ? t : [t]);
			}
			execute() {
				return new Promise(async (e, t) => {
					this.pendingPromise = { resolve: e, reject: t };
					try {
						(this.eventManager = await this.resolver._initialize(this.auth)),
							await this.onExecution(),
							this.eventManager.registerConsumer(this);
					} catch (e) {
						this.reject(e);
					}
				});
			}
			async onAuthEvent(e) {
				const {
					urlResponse: t,
					sessionId: r,
					postBody: n,
					tenantId: i,
					error: s,
					type: a,
				} = e;
				if (s) return void this.reject(s);
				const o = {
					auth: this.auth,
					requestUri: t,
					sessionId: r,
					tenantId: i || void 0,
					postBody: n || void 0,
					user: this.user,
					bypassAuthState: this.bypassAuthState,
				};
				try {
					this.resolve(await this.getIdpTask(a)(o));
				} catch (e) {
					this.reject(e);
				}
			}
			onError(e) {
				this.reject(e);
			}
			getIdpTask(e) {
				switch (e) {
					case "signInViaPopup":
					case "signInViaRedirect":
						return tM;
					case "linkViaPopup":
					case "linkViaRedirect":
						return tV;
					case "reauthViaPopup":
					case "reauthViaRedirect":
						return tU;
					default:
						c(this.auth, "internal-error");
				}
			}
			resolve(e) {
				var t, r;
				(t = this.pendingPromise),
					(r = "Pending promise was never set"),
					t || y(r),
					this.pendingPromise.resolve(e),
					this.unregisterAndCleanUp();
			}
			reject(e) {
				var t, r;
				(t = this.pendingPromise),
					(r = "Pending promise was never set"),
					t || y(r),
					this.pendingPromise.reject(e),
					this.unregisterAndCleanUp();
			}
			unregisterAndCleanUp() {
				this.eventManager && this.eventManager.unregisterConsumer(this),
					(this.pendingPromise = null),
					this.cleanUp();
			}
		}
		const tj = new _(2e3, 1e4);
		class tB extends tF {
			constructor(e, t, r, n, i) {
				super(e, t, n, i),
					(this.provider = r),
					(this.authWindow = null),
					(this.pollId = null),
					tB.currentPopupAction && tB.currentPopupAction.cancel(),
					(tB.currentPopupAction = this);
			}
			async executeNotNull() {
				const e = await this.execute();
				return m(e, this.auth, "internal-error"), e;
			}
			async onExecution() {
				var e, t;
				(e = 1 === this.filter.length),
					(t = "Popup operations only handle one event"),
					e || y(t);
				const r = tg();
				(this.authWindow = await this.resolver._openPopup(
					this.auth,
					this.provider,
					this.filter[0],
					r,
				)),
					(this.authWindow.associatedEvent = r),
					this.resolver._originValidation(this.auth).catch((e) => {
						this.reject(e);
					}),
					this.resolver._isIframeWebStorageSupported(this.auth, (e) => {
						e || this.reject(d(this.auth, "web-storage-unsupported"));
					}),
					this.pollUserCancellation();
			}
			get eventId() {
				var e;
				return (
					(null == (e = this.authWindow) ? void 0 : e.associatedEvent) || null
				);
			}
			cancel() {
				this.reject(d(this.auth, "cancelled-popup-request"));
			}
			cleanUp() {
				this.authWindow && this.authWindow.close(),
					this.pollId && window.clearTimeout(this.pollId),
					(this.authWindow = null),
					(this.pollId = null),
					(tB.currentPopupAction = null);
			}
			pollUserCancellation() {
				const e = () => {
					var t, r;
					if (
						null == (r = null == (t = this.authWindow) ? void 0 : t.window)
							? void 0
							: r.closed
					) {
						this.pollId = window.setTimeout(() => {
							(this.pollId = null),
								this.reject(d(this.auth, "popup-closed-by-user"));
						}, 8e3);
						return;
					}
					this.pollId = window.setTimeout(e, tj.get());
				};
				e();
			}
		}
		tB.currentPopupAction = null;
		const tq = new Map();
		class t$ extends tF {
			constructor(e, t, r = !1) {
				super(
					e,
					[
						"signInViaRedirect",
						"linkViaRedirect",
						"reauthViaRedirect",
						"unknown",
					],
					t,
					void 0,
					r,
				),
					(this.eventId = null);
			}
			async execute() {
				let e = tq.get(this.auth._key());
				if (!e) {
					try {
						const t = (await tz(this.resolver, this.auth))
							? await super.execute()
							: null;
						e = () => Promise.resolve(t);
					} catch (t) {
						e = () => Promise.reject(t);
					}
					tq.set(this.auth._key(), e);
				}
				return (
					this.bypassAuthState ||
						tq.set(this.auth._key(), () => Promise.resolve(null)),
					e()
				);
			}
			async onAuthEvent(e) {
				if ("signInViaRedirect" === e.type) return super.onAuthEvent(e);
				if ("unknown" === e.type) return void this.resolve(null);
				if (e.eventId) {
					const t = await this.auth._redirectUserForId(e.eventId);
					if (t) return (this.user = t), super.onAuthEvent(e);
					this.resolve(null);
				}
			}
			async onExecution() {}
			cleanUp() {}
		}
		async function tz(e, t) {
			var r;
			const n = en("pendingRedirect", (r = t).config.apiKey, r.name),
				i = et(e._redirectPersistence);
			if (!(await i._isAvailable())) return !1;
			const s = (await i._get(n)) === "true";
			return await i._remove(n), s;
		}
		function tH(e, t) {
			tq.set(e._key(), t);
		}
		async function tG(e, t, n = !1) {
			if ((0, r._isFirebaseServerApp)(e.app)) return Promise.reject(p(e));
			const i = e_(e),
				s = t
					? et(t)
					: (m(i._popupRedirectResolver, i, "argument-error"),
						i._popupRedirectResolver),
				a = new t$(i, s, n),
				o = await a.execute();
			return (
				o &&
					!n &&
					(delete o.user._redirectEventId,
					await i._persistUserIfCurrent(o.user),
					await i._setRedirectUser(null, t)),
				o
			);
		}
		class tK {
			constructor(e) {
				(this.auth = e),
					(this.cachedEventUids = new Set()),
					(this.consumers = new Set()),
					(this.queuedRedirectEvent = null),
					(this.hasHandledPotentialRedirect = !1),
					(this.lastProcessedEventTime = Date.now());
			}
			registerConsumer(e) {
				this.consumers.add(e),
					this.queuedRedirectEvent &&
						this.isEventForConsumer(this.queuedRedirectEvent, e) &&
						(this.sendToConsumer(this.queuedRedirectEvent, e),
						this.saveEventToCache(this.queuedRedirectEvent),
						(this.queuedRedirectEvent = null));
			}
			unregisterConsumer(e) {
				this.consumers.delete(e);
			}
			onEvent(e) {
				if (this.hasEventBeenHandled(e)) return !1;
				let t = !1;
				return (
					this.consumers.forEach((r) => {
						this.isEventForConsumer(e, r) &&
							((t = !0), this.sendToConsumer(e, r), this.saveEventToCache(e));
					}),
					this.hasHandledPotentialRedirect ||
						!((e) => {
							switch (e.type) {
								case "signInViaRedirect":
								case "linkViaRedirect":
								case "reauthViaRedirect":
									return !0;
								case "unknown":
									return tQ(e);
								default:
									return !1;
							}
						})(e) ||
						((this.hasHandledPotentialRedirect = !0),
						t || ((this.queuedRedirectEvent = e), (t = !0))),
					t
				);
			}
			sendToConsumer(e, t) {
				var r;
				if (e.error && !tQ(e)) {
					const n =
						(null == (r = e.error.code) ? void 0 : r.split("auth/")[1]) ||
						"internal-error";
					t.onError(d(this.auth, n));
				} else t.onAuthEvent(e);
			}
			isEventForConsumer(e, t) {
				const r =
					null === t.eventId || (!!e.eventId && e.eventId === t.eventId);
				return t.filter.includes(e.type) && r;
			}
			hasEventBeenHandled(e) {
				return (
					Date.now() - this.lastProcessedEventTime >= 6e5 &&
						this.cachedEventUids.clear(),
					this.cachedEventUids.has(tW(e))
				);
			}
			saveEventToCache(e) {
				this.cachedEventUids.add(tW(e)),
					(this.lastProcessedEventTime = Date.now());
			}
		}
		function tW(e) {
			return [e.type, e.eventId, e.sessionId, e.tenantId]
				.filter((e) => e)
				.join("-");
		}
		function tQ({ type: e, error: t }) {
			return (
				"unknown" === e &&
				(null == t ? void 0 : t.code) === "auth/no-auth-event"
			);
		}
		async function tJ(e, t = {}) {
			return A(e, "GET", "/v1/projects", t);
		}
		const tX = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,
			tY = /^https?/;
		async function tZ(e) {
			if (e.config.emulator) return;
			const { authorizedDomains: t } = await tJ(e);
			for (const e of t)
				try {
					if (
						((e) => {
							const t = v(),
								{ protocol: r, hostname: n } = new URL(t);
							if (e.startsWith("chrome-extension://")) {
								const i = new URL(e);
								return "" === i.hostname && "" === n
									? "chrome-extension:" === r &&
											e.replace("chrome-extension://", "") ===
												t.replace("chrome-extension://", "")
									: "chrome-extension:" === r && i.hostname === n;
							}
							if (!tY.test(r)) return !1;
							if (tX.test(e)) return n === e;
							const i = e.replace(/\./g, "\\.");
							return RegExp("^(.+\\." + i + "|" + i + ")$", "i").test(n);
						})(e)
					)
						return;
				} catch (e) {}
			c(e, "unauthorized-domain");
		}
		const t0 = new _(3e4, 6e4);
		function t1() {
			const e = ty().___jsl;
			if (null == e ? void 0 : e.H) {
				for (const t of Object.keys(e.H))
					if (
						((e.H[t].r = e.H[t].r || []),
						(e.H[t].L = e.H[t].L || []),
						(e.H[t].r = [...e.H[t].L]),
						e.CP)
					)
						for (let t = 0; t < e.CP.length; t++) e.CP[t] = null;
			}
		}
		let t2 = null,
			t6 = new _(5e3, 15e3),
			t3 = {
				style: {
					position: "absolute",
					top: "-100px",
					width: "1px",
					height: "1px",
				},
				"aria-hidden": "true",
				tabindex: "-1",
			},
			t5 = new Map([
				["identitytoolkit.googleapis.com", "p"],
				["staging-identitytoolkit.sandbox.googleapis.com", "s"],
				["test-identitytoolkit.sandbox.googleapis.com", "t"],
			]);
		async function t4(e) {
			let t,
				i,
				s,
				a,
				o,
				l = await (t2 =
					t2 ||
					new Promise((t, r) => {
						var n, i, s, a;
						function o() {
							t1(),
								gapi.load("gapi.iframes", {
									callback: () => {
										t(gapi.iframes.getContext());
									},
									ontimeout: () => {
										t1(), r(d(e, "network-request-failed"));
									},
									timeout: t0.get(),
								});
						}
						if (
							null == (i = null == (n = ty().gapi) ? void 0 : n.iframes)
								? void 0
								: i.Iframe
						)
							t(gapi.iframes.getContext());
						else if (null == (s = ty().gapi) ? void 0 : s.load) o();
						else {
							const t = eI("iframefcb");
							return (
								(ty()[t] = () => {
									gapi.load ? o() : r(d(e, "network-request-failed"));
								}),
								((a = `${eb.gapiScript}?onload=${t}`), eb.loadJS(a)).catch(
									(e) => r(e),
								)
							);
						}
					}).catch((e) => {
						throw ((t2 = null), e);
					})),
				u = ty().gapi;
			return (
				m(u, e, "internal-error"),
				l.open(
					{
						where: document.body,
						url:
							(m((t = e.config).authDomain, e, "auth-domain-config-required"),
							(i = t.emulator
								? E(t, "emulator/auth/iframe")
								: `https://${e.config.authDomain}/__/auth/iframe`),
							(s = { apiKey: t.apiKey, appName: e.name, v: r.SDK_VERSION }),
							(a = t5.get(e.config.apiHost)) && (s.eid = a),
							(o = e._getFrameworks()).length && (s.fw = o.join(",")),
							`${i}?${(0, n.querystring)(s).slice(1)}`),
						messageHandlersFilter: u.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
						attributes: t3,
						dontclear: !0,
					},
					(t) =>
						new Promise(async (r, n) => {
							await t.restyle({ setHideOnLeave: !1 });
							const i = d(e, "network-request-failed"),
								s = ty().setTimeout(() => {
									n(i);
								}, t6.get());
							function a() {
								ty().clearTimeout(s), r(t);
							}
							t.ping(a).then(a, () => {
								n(i);
							});
						}),
				)
			);
		}
		const t8 = {
			location: "yes",
			resizable: "yes",
			statusbar: "yes",
			toolbar: "no",
		};
		class t7 {
			constructor(e) {
				(this.window = e), (this.associatedEvent = null);
			}
			close() {
				if (this.window)
					try {
						this.window.close();
					} catch (e) {}
			}
		}
		const t9 = encodeURIComponent("fac");
		async function re(e, t, i, s, a, o) {
			m(e.config.authDomain, e, "auth-domain-config-required"),
				m(e.config.apiKey, e, "invalid-api-key");
			const l = {
				apiKey: e.config.apiKey,
				appName: e.name,
				authType: i,
				redirectUrl: s,
				v: r.SDK_VERSION,
				eventId: a,
			};
			if (t instanceof eJ)
				for (const [r, i] of (t.setDefaultLanguage(e.languageCode),
				(l.providerId = t.providerId || ""),
				(0, n.isEmpty)(t.getCustomParameters()) ||
					(l.customParameters = JSON.stringify(t.getCustomParameters())),
				Object.entries(o || {})))
					l[r] = i;
			if (t instanceof eX) {
				const e = t.getScopes().filter((e) => "" !== e);
				e.length > 0 && (l.scopes = e.join(","));
			}
			for (const t of (e.tenantId && (l.tid = e.tenantId), Object.keys(l)))
				void 0 === l[t] && delete l[t];
			const u = await e._getAppCheckToken(),
				h = u ? `#${t9}=${encodeURIComponent(u)}` : "";
			return `${(({ config: e }) => (e.emulator ? E(e, "emulator/auth/handler") : `https://${e.authDomain}/__/auth/handler`))(e)}?${(0, n.querystring)(l).slice(1)}${h}`;
		}
		const rt = "webStorageSupport",
			rr = class {
				constructor() {
					(this.eventManagers = {}),
						(this.iframes = {}),
						(this.originValidationPromises = {}),
						(this._redirectPersistence = tf),
						(this._completeRedirectFn = tG),
						(this._overrideRedirectResult = tH);
				}
				async _openPopup(e, t, r, i) {
					var s, a, o;
					(a = null == (s = this.eventManagers[e._key()]) ? void 0 : s.manager),
						(o = "_initialize() not called before _openPopup()"),
						a || y(o);
					const l = await re(e, t, r, v(), i);
					return ((e, t, r, i = 500, s = 600) => {
						let a = Math.max((window.screen.availHeight - s) / 2, 0).toString(),
							o = Math.max((window.screen.availWidth - i) / 2, 0).toString(),
							l = "",
							u = Object.assign(Object.assign({}, t8), {
								width: i.toString(),
								height: s.toString(),
								top: a,
								left: o,
							}),
							h = (0, n.getUA)().toLowerCase();
						r && (l = el(h) ? "_blank" : r),
							ea(h) && ((t = t || "http://localhost"), (u.scrollbars = "yes"));
						const c = Object.entries(u).reduce(
							(e, [t, r]) => `${e}${t}=${r},`,
							"",
						);
						if (
							((e = (0, n.getUA)()) => {
								var t;
								return (
									ef(e) &&
									!!(null == (t = window.navigator) ? void 0 : t.standalone)
								);
							})(h) &&
							"_self" !== l
						) {
							var d, f;
							let e, r;
							return (
								(d = t || ""),
								(f = l),
								((e = document.createElement("a")).href = d),
								(e.target = f),
								(r = document.createEvent("MouseEvent")).initMouseEvent(
									"click",
									!0,
									!0,
									window,
									1,
									0,
									0,
									0,
									0,
									!1,
									!1,
									!1,
									!1,
									1,
									null,
								),
								e.dispatchEvent(r),
								new t7(null)
							);
						}
						const p = window.open(t || "", l, c);
						m(p, e, "popup-blocked");
						try {
							p.focus();
						} catch (e) {}
						return new t7(p);
					})(e, l, tg());
				}
				async _openRedirect(e, t, r, n) {
					var i;
					return (
						await this._originValidation(e),
						(i = await re(e, t, r, v(), n)),
						(ty().location.href = i),
						new Promise(() => {})
					);
				}
				_initialize(e) {
					const t = e._key();
					if (this.eventManagers[t]) {
						var r;
						const { manager: e, promise: n } = this.eventManagers[t];
						return e
							? Promise.resolve(e)
							: ((r = "If manager is not set, promise should be"),
								n || y(r),
								n);
					}
					const n = this.initAndGetManager(e);
					return (
						(this.eventManagers[t] = { promise: n }),
						n.catch(() => {
							delete this.eventManagers[t];
						}),
						n
					);
				}
				async initAndGetManager(e) {
					const t = await t4(e),
						r = new tK(e);
					return (
						t.register(
							"authEvent",
							(t) => (
								m(null == t ? void 0 : t.authEvent, e, "invalid-auth-event"),
								{ status: r.onEvent(t.authEvent) ? "ACK" : "ERROR" }
							),
							gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
						),
						(this.eventManagers[e._key()] = { manager: r }),
						(this.iframes[e._key()] = t),
						r
					);
				}
				_isIframeWebStorageSupported(e, t) {
					this.iframes[e._key()].send(
						rt,
						{ type: rt },
						(r) => {
							var n;
							const i =
								null == (n = null == r ? void 0 : r[0]) ? void 0 : n[rt];
							void 0 !== i && t(!!i), c(e, "internal-error");
						},
						gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER,
					);
				}
				_originValidation(e) {
					const t = e._key();
					return (
						this.originValidationPromises[t] ||
							(this.originValidationPromises[t] = tZ(e)),
						this.originValidationPromises[t]
					);
				}
				get _shouldInitProactively() {
					return ep() || eo() || ef();
				}
			};
		var rn = "@firebase/auth",
			ri = "1.10.8";
		class rs {
			constructor(e) {
				(this.auth = e), (this.internalListeners = new Map());
			}
			getUid() {
				var e;
				return (
					this.assertAuthConfigured(),
					(null == (e = this.auth.currentUser) ? void 0 : e.uid) || null
				);
			}
			async getToken(e) {
				return (this.assertAuthConfigured(),
				await this.auth._initializationPromise,
				this.auth.currentUser)
					? { accessToken: await this.auth.currentUser.getIdToken(e) }
					: null;
			}
			addAuthTokenListener(e) {
				if ((this.assertAuthConfigured(), this.internalListeners.has(e)))
					return;
				const t = this.auth.onIdTokenChanged((t) => {
					e((null == t ? void 0 : t.stsTokenManager.accessToken) || null);
				});
				this.internalListeners.set(e, t), this.updateProactiveRefresh();
			}
			removeAuthTokenListener(e) {
				this.assertAuthConfigured();
				const t = this.internalListeners.get(e);
				t &&
					(this.internalListeners.delete(e),
					t(),
					this.updateProactiveRefresh());
			}
			assertAuthConfigured() {
				m(
					this.auth._initializationPromise,
					"dependent-sdk-initialized-before-auth",
				);
			}
			updateProactiveRefresh() {
				this.internalListeners.size > 0
					? this.auth._startProactiveRefresh()
					: this.auth._stopProactiveRefresh();
			}
		}
		let ra = (0, n.getExperimentalSetting)("authIdTokenMaxAge") || 300,
			ro = null;
		function rl(e = (0, r.getApp)()) {
			const t = (0, r._getProvider)(e, "auth");
			if (t.isInitialized()) return t.getImmediate();
			const i = ((e, t) => {
					const i = (0, r._getProvider)(e, "auth");
					if (i.isInitialized()) {
						const e = i.getImmediate(),
							r = i.getOptions();
						if ((0, n.deepEqual)(r, null != t ? t : {})) return e;
						c(e, "already-initialized");
					}
					return i.initialize({ options: t });
				})(e, { popupRedirectResolver: rr, persistence: [tR, td, tf] }),
				s = (0, n.getExperimentalSetting)("authTokenSyncURL");
			if (s && "boolean" == typeof isSecureContext && isSecureContext) {
				const e = new URL(s, location.origin);
				if (location.origin === e.origin) {
					let t,
						r =
							((t = e.toString()),
							async (e) => {
								const r = e && (await e.getIdTokenResult()),
									n =
										r &&
										(new Date().getTime() - Date.parse(r.issuedAtTime)) / 1e3;
								if (n && n > ra) return;
								const i = null == r ? void 0 : r.token;
								ro !== i &&
									((ro = i),
									await fetch(t, {
										method: i ? "POST" : "DELETE",
										headers: i ? { Authorization: `Bearer ${i}` } : {},
									}));
							});
					(0, n.getModularInstance)(i).beforeAuthStateChanged(r, () =>
						r(i.currentUser),
					),
						(0, n.getModularInstance)(i).onIdTokenChanged(
							(e) => r(e),
							void 0,
							void 0,
						);
				}
			}
			const a = (0, n.getDefaultEmulatorHost)("auth");
			return a && eD(i, `http://${a}`), i;
		}
		(eb = {
			loadJS: (e) =>
				new Promise((t, r) => {
					var n, i;
					const s = document.createElement("script");
					s.setAttribute("src", e),
						(s.onload = t),
						(s.onerror = (e) => {
							const t = d("internal-error");
							(t.customData = e), r(t);
						}),
						(s.type = "text/javascript"),
						(s.charset = "UTF-8"),
						(null !=
						(i =
							null == (n = document.getElementsByTagName("head"))
								? void 0
								: n[0])
							? i
							: document
						).appendChild(s);
				}),
			gapiScript: "https://apis.google.com/js/api.js",
			recaptchaV2Script: "https://www.google.com/recaptcha/api.js",
			recaptchaEnterpriseScript:
				"https://www.google.com/recaptcha/enterprise.js?render=",
		}),
			(t = "Browser"),
			(0, r._registerComponent)(
				new a.Component(
					"auth",
					(e, { options: r }) => {
						let n,
							i,
							s = e.getProvider("app").getImmediate(),
							a = e.getProvider("heartbeat"),
							o = e.getProvider("app-check-internal"),
							{ apiKey: l, authDomain: u } = s.options;
						m(l && !l.includes(":"), "invalid-api-key", { appName: s.name });
						const h = new ew(s, a, o, {
							apiKey: l,
							authDomain: u,
							clientPlatform: t,
							apiHost: "identitytoolkit.googleapis.com",
							tokenApiHost: "securetoken.googleapis.com",
							apiScheme: "https",
							sdkClientVersion: eg(t),
						});
						return (
							(i = (
								Array.isArray((n = (null == r ? void 0 : r.persistence) || []))
									? n
									: [n]
							).map(et)),
							(null == r ? void 0 : r.errorMap) &&
								h._updateErrorMap(r.errorMap),
							h._initializeWithPersistence(
								i,
								null == r ? void 0 : r.popupRedirectResolver,
							),
							h
						);
					},
					"PUBLIC",
				)
					.setInstantiationMode("EXPLICIT")
					.setInstanceCreatedCallback((e, t, r) => {
						e.getProvider("auth-internal").initialize();
					}),
			),
			(0, r._registerComponent)(
				new a.Component(
					"auth-internal",
					(e) => new rs(e_(e.getProvider("auth").getImmediate())),
					"PRIVATE",
				).setInstantiationMode("EXPLICIT"),
			),
			(0, r.registerVersion)(
				rn,
				ri,
				((e) => {
					switch (e) {
						case "Node":
							return "node";
						case "ReactNative":
							return "rn";
						case "Worker":
							return "webworker";
						case "Cordova":
							return "cordova";
						case "WebExtension":
							return "web-extension";
						default:
							return;
					}
				})(t),
			),
			(0, r.registerVersion)(rn, ri, "esm2017"),
			e.s([], 72469),
			e.i(72469),
			e.s(
				[
					"connectAuthEmulator",
					() => eD,
					"createUserWithEmailAndPassword",
					() => ts,
					"getAuth",
					() => rl,
					"onAuthStateChanged",
					() => to,
					"signInWithEmailAndPassword",
					() => ta,
					"signOut",
					() => tl,
				],
				51099,
			);
	},
	69960,
	(e) => {
		var t = e.i(18044);
		e.i(81673),
			e.s(["getApps", () => t.getApps, "initializeApp", () => t.initializeApp]);
	},
	32198,
	(e, t, r) => {
		var n = {
				675: (e, t) => {
					(t.byteLength = (e) => {
						var t = l(e),
							r = t[0],
							n = t[1];
						return ((r + n) * 3) / 4 - n;
					}),
						(t.toByteArray = (e) => {
							var t,
								r,
								s = l(e),
								a = s[0],
								o = s[1],
								u = new i(((a + o) * 3) / 4 - o),
								h = 0,
								c = o > 0 ? a - 4 : a;
							for (r = 0; r < c; r += 4)
								(t =
									(n[e.charCodeAt(r)] << 18) |
									(n[e.charCodeAt(r + 1)] << 12) |
									(n[e.charCodeAt(r + 2)] << 6) |
									n[e.charCodeAt(r + 3)]),
									(u[h++] = (t >> 16) & 255),
									(u[h++] = (t >> 8) & 255),
									(u[h++] = 255 & t);
							return (
								2 === o &&
									((t =
										(n[e.charCodeAt(r)] << 2) | (n[e.charCodeAt(r + 1)] >> 4)),
									(u[h++] = 255 & t)),
								1 === o &&
									((t =
										(n[e.charCodeAt(r)] << 10) |
										(n[e.charCodeAt(r + 1)] << 4) |
										(n[e.charCodeAt(r + 2)] >> 2)),
									(u[h++] = (t >> 8) & 255),
									(u[h++] = 255 & t)),
								u
							);
						}),
						(t.fromByteArray = (e) => {
							for (
								var t, n = e.length, i = n % 3, s = [], a = 0, o = n - i;
								a < o;
								a += 16383
							)
								s.push(
									((e, t, n) => {
										for (var i, s = [], a = t; a < n; a += 3)
											(i =
												((e[a] << 16) & 0xff0000) +
												((e[a + 1] << 8) & 65280) +
												(255 & e[a + 2])),
												s.push(
													r[(i >> 18) & 63] +
														r[(i >> 12) & 63] +
														r[(i >> 6) & 63] +
														r[63 & i],
												);
										return s.join("");
									})(e, a, a + 16383 > o ? o : a + 16383),
								);
							return (
								1 === i
									? s.push(r[(t = e[n - 1]) >> 2] + r[(t << 4) & 63] + "==")
									: 2 === i &&
										s.push(
											r[(t = (e[n - 2] << 8) + e[n - 1]) >> 10] +
												r[(t >> 4) & 63] +
												r[(t << 2) & 63] +
												"=",
										),
								s.join("")
							);
						});
					for (
						var r = [],
							n = [],
							i = "u" > typeof Uint8Array ? Uint8Array : Array,
							s =
								"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
							a = 0,
							o = s.length;
						a < o;
						++a
					)
						(r[a] = s[a]), (n[s.charCodeAt(a)] = a);
					function l(e) {
						var t = e.length;
						if (t % 4 > 0)
							throw Error("Invalid string. Length must be a multiple of 4");
						var r = e.indexOf("=");
						-1 === r && (r = t);
						var n = r === t ? 0 : 4 - (r % 4);
						return [r, n];
					}
					(n[45] = 62), (n[95] = 63);
				},
				72: (e, t, r) => {
					var n = r(675),
						i = r(783),
						s =
							"function" == typeof Symbol && "function" == typeof Symbol.for
								? Symbol.for("nodejs.util.inspect.custom")
								: null;
					function a(e) {
						if (e > 0x7fffffff)
							throw RangeError(
								'The value "' + e + '" is invalid for option "size"',
							);
						var t = new Uint8Array(e);
						return Object.setPrototypeOf(t, o.prototype), t;
					}
					function o(e, t, r) {
						if ("number" == typeof e) {
							if ("string" == typeof t)
								throw TypeError(
									'The "string" argument must be of type string. Received type number',
								);
							return h(e);
						}
						return l(e, t, r);
					}
					function l(e, t, r) {
						if ("string" == typeof e) {
							var n = e,
								i = t;
							if (
								(("string" != typeof i || "" === i) && (i = "utf8"),
								!o.isEncoding(i))
							)
								throw TypeError("Unknown encoding: " + i);
							var s = 0 | f(n, i),
								l = a(s),
								u = l.write(n, i);
							return u !== s && (l = l.slice(0, u)), l;
						}
						if (ArrayBuffer.isView(e)) return c(e);
						if (null == e)
							throw TypeError(
								"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
									typeof e,
							);
						if (
							R(e, ArrayBuffer) ||
							(e && R(e.buffer, ArrayBuffer)) ||
							("u" > typeof SharedArrayBuffer &&
								(R(e, SharedArrayBuffer) ||
									(e && R(e.buffer, SharedArrayBuffer))))
						)
							return ((e, t, r) => {
								var n;
								if (t < 0 || e.byteLength < t)
									throw RangeError('"offset" is outside of buffer bounds');
								if (e.byteLength < t + (r || 0))
									throw RangeError('"length" is outside of buffer bounds');
								return (
									Object.setPrototypeOf(
										(n =
											void 0 === t && void 0 === r
												? new Uint8Array(e)
												: void 0 === r
													? new Uint8Array(e, t)
													: new Uint8Array(e, t, r)),
										o.prototype,
									),
									n
								);
							})(e, t, r);
						if ("number" == typeof e)
							throw TypeError(
								'The "value" argument must not be of type number. Received type number',
							);
						var h = e.valueOf && e.valueOf();
						if (null != h && h !== e) return o.from(h, t, r);
						var p = ((e) => {
							if (o.isBuffer(e)) {
								var t = 0 | d(e.length),
									r = a(t);
								return 0 === r.length || e.copy(r, 0, 0, t), r;
							}
							return void 0 !== e.length
								? "number" != typeof e.length || ((e) => e != e)(e.length)
									? a(0)
									: c(e)
								: "Buffer" === e.type && Array.isArray(e.data)
									? c(e.data)
									: void 0;
						})(e);
						if (p) return p;
						if (
							"u" > typeof Symbol &&
							null != Symbol.toPrimitive &&
							"function" == typeof e[Symbol.toPrimitive]
						)
							return o.from(e[Symbol.toPrimitive]("string"), t, r);
						throw TypeError(
							"The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
								typeof e,
						);
					}
					function u(e) {
						if ("number" != typeof e)
							throw TypeError('"size" argument must be of type number');
						if (e < 0)
							throw RangeError(
								'The value "' + e + '" is invalid for option "size"',
							);
					}
					function h(e) {
						return u(e), a(e < 0 ? 0 : 0 | d(e));
					}
					function c(e) {
						for (
							var t = e.length < 0 ? 0 : 0 | d(e.length), r = a(t), n = 0;
							n < t;
							n += 1
						)
							r[n] = 255 & e[n];
						return r;
					}
					(t.Buffer = o),
						(t.SlowBuffer = (e) => (+e != e && (e = 0), o.alloc(+e))),
						(t.INSPECT_MAX_BYTES = 50),
						(t.kMaxLength = 0x7fffffff),
						(o.TYPED_ARRAY_SUPPORT = (() => {
							try {
								var e = new Uint8Array(1),
									t = { foo: () => 42 };
								return (
									Object.setPrototypeOf(t, Uint8Array.prototype),
									Object.setPrototypeOf(e, t),
									42 === e.foo()
								);
							} catch (e) {
								return !1;
							}
						})()),
						!o.TYPED_ARRAY_SUPPORT &&
							"u" > typeof console &&
							"function" == typeof console.error &&
							console.error(
								"This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.",
							),
						Object.defineProperty(o.prototype, "parent", {
							enumerable: !0,
							get: function () {
								if (o.isBuffer(this)) return this.buffer;
							},
						}),
						Object.defineProperty(o.prototype, "offset", {
							enumerable: !0,
							get: function () {
								if (o.isBuffer(this)) return this.byteOffset;
							},
						}),
						(o.poolSize = 8192),
						(o.from = (e, t, r) => l(e, t, r)),
						Object.setPrototypeOf(o.prototype, Uint8Array.prototype),
						Object.setPrototypeOf(o, Uint8Array),
						(o.alloc = (e, t, r) =>
							(u(e), e <= 0)
								? a(e)
								: void 0 !== t
									? "string" == typeof r
										? a(e).fill(t, r)
										: a(e).fill(t)
									: a(e)),
						(o.allocUnsafe = (e) => h(e)),
						(o.allocUnsafeSlow = (e) => h(e));
					function d(e) {
						if (e >= 0x7fffffff)
							throw RangeError(
								"Attempt to allocate Buffer larger than maximum size: 0x7fffffff bytes",
							);
						return 0 | e;
					}
					function f(e, t) {
						if (o.isBuffer(e)) return e.length;
						if (ArrayBuffer.isView(e) || R(e, ArrayBuffer)) return e.byteLength;
						if ("string" != typeof e)
							throw TypeError(
								'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
									typeof e,
							);
						var r = e.length,
							n = arguments.length > 2 && !0 === arguments[2];
						if (!n && 0 === r) return 0;
						for (var i = !1; ; )
							switch (t) {
								case "ascii":
								case "latin1":
								case "binary":
									return r;
								case "utf8":
								case "utf-8":
									return S(e).length;
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return 2 * r;
								case "hex":
									return r >>> 1;
								case "base64":
									return A(e).length;
								default:
									if (i) return n ? -1 : S(e).length;
									(t = ("" + t).toLowerCase()), (i = !0);
							}
					}
					function p(e, t, r) {
						var i,
							s,
							a,
							o = !1;
						if (
							((void 0 === t || t < 0) && (t = 0),
							t > this.length ||
								((void 0 === r || r > this.length) && (r = this.length),
								r <= 0 || (r >>>= 0) <= (t >>>= 0)))
						)
							return "";
						for (e || (e = "utf8"); ; )
							switch (e) {
								case "hex":
									return ((e, t, r) => {
										var n = e.length;
										(!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
										for (var i = "", s = t; s < r; ++s) i += N[e[s]];
										return i;
									})(this, t, r);
								case "utf8":
								case "utf-8":
									return v(this, t, r);
								case "ascii":
									return ((e, t, r) => {
										var n = "";
										r = Math.min(e.length, r);
										for (var i = t; i < r; ++i)
											n += String.fromCharCode(127 & e[i]);
										return n;
									})(this, t, r);
								case "latin1":
								case "binary":
									return ((e, t, r) => {
										var n = "";
										r = Math.min(e.length, r);
										for (var i = t; i < r; ++i) n += String.fromCharCode(e[i]);
										return n;
									})(this, t, r);
								case "base64":
									return (
										(i = this),
										(s = t),
										(a = r),
										0 === s && a === i.length
											? n.fromByteArray(i)
											: n.fromByteArray(i.slice(s, a))
									);
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return ((e, t, r) => {
										for (
											var n = e.slice(t, r), i = "", s = 0;
											s < n.length;
											s += 2
										)
											i += String.fromCharCode(n[s] + 256 * n[s + 1]);
										return i;
									})(this, t, r);
								default:
									if (o) throw TypeError("Unknown encoding: " + e);
									(e = (e + "").toLowerCase()), (o = !0);
							}
					}
					function g(e, t, r) {
						var n = e[t];
						(e[t] = e[r]), (e[r] = n);
					}
					function m(e, t, r, n, i) {
						var s;
						if (0 === e.length) return -1;
						if (
							("string" == typeof r
								? ((n = r), (r = 0))
								: r > 0x7fffffff
									? (r = 0x7fffffff)
									: r < -0x80000000 && (r = -0x80000000),
							(s = r *= 1) != s && (r = i ? 0 : e.length - 1),
							r < 0 && (r = e.length + r),
							r >= e.length)
						)
							if (i) return -1;
							else r = e.length - 1;
						else if (r < 0)
							if (!i) return -1;
							else r = 0;
						if (("string" == typeof t && (t = o.from(t, n)), o.isBuffer(t)))
							return 0 === t.length ? -1 : y(e, t, r, n, i);
						if ("number" == typeof t) {
							if (
								((t &= 255), "function" == typeof Uint8Array.prototype.indexOf)
							)
								if (i) return Uint8Array.prototype.indexOf.call(e, t, r);
								else return Uint8Array.prototype.lastIndexOf.call(e, t, r);
							return y(e, [t], r, n, i);
						}
						throw TypeError("val must be string, number or Buffer");
					}
					function y(e, t, r, n, i) {
						var s,
							a = 1,
							o = e.length,
							l = t.length;
						if (
							void 0 !== n &&
							("ucs2" === (n = String(n).toLowerCase()) ||
								"ucs-2" === n ||
								"utf16le" === n ||
								"utf-16le" === n)
						) {
							if (e.length < 2 || t.length < 2) return -1;
							(a = 2), (o /= 2), (l /= 2), (r /= 2);
						}
						function u(e, t) {
							return 1 === a ? e[t] : e.readUInt16BE(t * a);
						}
						if (i) {
							var h = -1;
							for (s = r; s < o; s++)
								if (u(e, s) === u(t, -1 === h ? 0 : s - h)) {
									if ((-1 === h && (h = s), s - h + 1 === l)) return h * a;
								} else -1 !== h && (s -= s - h), (h = -1);
						} else
							for (r + l > o && (r = o - l), s = r; s >= 0; s--) {
								for (var c = !0, d = 0; d < l; d++)
									if (u(e, s + d) !== u(t, d)) {
										c = !1;
										break;
									}
								if (c) return s;
							}
						return -1;
					}
					(o.isBuffer = (e) =>
						null != e && !0 === e._isBuffer && e !== o.prototype),
						(o.compare = (e, t) => {
							if (
								(R(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
								R(t, Uint8Array) && (t = o.from(t, t.offset, t.byteLength)),
								!o.isBuffer(e) || !o.isBuffer(t))
							)
								throw TypeError(
									'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array',
								);
							if (e === t) return 0;
							for (
								var r = e.length, n = t.length, i = 0, s = Math.min(r, n);
								i < s;
								++i
							)
								if (e[i] !== t[i]) {
									(r = e[i]), (n = t[i]);
									break;
								}
							return r < n ? -1 : +(n < r);
						}),
						(o.isEncoding = (e) => {
							switch (String(e).toLowerCase()) {
								case "hex":
								case "utf8":
								case "utf-8":
								case "ascii":
								case "latin1":
								case "binary":
								case "base64":
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return !0;
								default:
									return !1;
							}
						}),
						(o.concat = (e, t) => {
							if (!Array.isArray(e))
								throw TypeError('"list" argument must be an Array of Buffers');
							if (0 === e.length) return o.alloc(0);
							if (void 0 === t)
								for (r = 0, t = 0; r < e.length; ++r) t += e[r].length;
							var r,
								n = o.allocUnsafe(t),
								i = 0;
							for (r = 0; r < e.length; ++r) {
								var s = e[r];
								if ((R(s, Uint8Array) && (s = o.from(s)), !o.isBuffer(s)))
									throw TypeError(
										'"list" argument must be an Array of Buffers',
									);
								s.copy(n, i), (i += s.length);
							}
							return n;
						}),
						(o.byteLength = f),
						(o.prototype._isBuffer = !0),
						(o.prototype.swap16 = function () {
							var e = this.length;
							if (e % 2 != 0)
								throw RangeError("Buffer size must be a multiple of 16-bits");
							for (var t = 0; t < e; t += 2) g(this, t, t + 1);
							return this;
						}),
						(o.prototype.swap32 = function () {
							var e = this.length;
							if (e % 4 != 0)
								throw RangeError("Buffer size must be a multiple of 32-bits");
							for (var t = 0; t < e; t += 4)
								g(this, t, t + 3), g(this, t + 1, t + 2);
							return this;
						}),
						(o.prototype.swap64 = function () {
							var e = this.length;
							if (e % 8 != 0)
								throw RangeError("Buffer size must be a multiple of 64-bits");
							for (var t = 0; t < e; t += 8)
								g(this, t, t + 7),
									g(this, t + 1, t + 6),
									g(this, t + 2, t + 5),
									g(this, t + 3, t + 4);
							return this;
						}),
						(o.prototype.toString = function () {
							var e = this.length;
							return 0 === e
								? ""
								: 0 == arguments.length
									? v(this, 0, e)
									: p.apply(this, arguments);
						}),
						(o.prototype.toLocaleString = o.prototype.toString),
						(o.prototype.equals = function (e) {
							if (!o.isBuffer(e)) throw TypeError("Argument must be a Buffer");
							return this === e || 0 === o.compare(this, e);
						}),
						(o.prototype.inspect = function () {
							var e = "",
								r = t.INSPECT_MAX_BYTES;
							return (
								(e = this.toString("hex", 0, r)
									.replace(/(.{2})/g, "$1 ")
									.trim()),
								this.length > r && (e += " ... "),
								"<Buffer " + e + ">"
							);
						}),
						s && (o.prototype[s] = o.prototype.inspect),
						(o.prototype.compare = function (e, t, r, n, i) {
							if (
								(R(e, Uint8Array) && (e = o.from(e, e.offset, e.byteLength)),
								!o.isBuffer(e))
							)
								throw TypeError(
									'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
										typeof e,
								);
							if (
								(void 0 === t && (t = 0),
								void 0 === r && (r = e ? e.length : 0),
								void 0 === n && (n = 0),
								void 0 === i && (i = this.length),
								t < 0 || r > e.length || n < 0 || i > this.length)
							)
								throw RangeError("out of range index");
							if (n >= i && t >= r) return 0;
							if (n >= i) return -1;
							if (t >= r) return 1;
							if (((t >>>= 0), (r >>>= 0), (n >>>= 0), (i >>>= 0), this === e))
								return 0;
							for (
								var s = i - n,
									a = r - t,
									l = Math.min(s, a),
									u = this.slice(n, i),
									h = e.slice(t, r),
									c = 0;
								c < l;
								++c
							)
								if (u[c] !== h[c]) {
									(s = u[c]), (a = h[c]);
									break;
								}
							return s < a ? -1 : +(a < s);
						}),
						(o.prototype.includes = function (e, t, r) {
							return -1 !== this.indexOf(e, t, r);
						}),
						(o.prototype.indexOf = function (e, t, r) {
							return m(this, e, t, r, !0);
						}),
						(o.prototype.lastIndexOf = function (e, t, r) {
							return m(this, e, t, r, !1);
						});
					function v(e, t, r) {
						r = Math.min(e.length, r);
						for (var n = [], i = t; i < r; ) {
							var s,
								a,
								o,
								l,
								u = e[i],
								h = null,
								c = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
							if (i + c <= r)
								switch (c) {
									case 1:
										u < 128 && (h = u);
										break;
									case 2:
										(192 & (s = e[i + 1])) == 128 &&
											(l = ((31 & u) << 6) | (63 & s)) > 127 &&
											(h = l);
										break;
									case 3:
										(s = e[i + 1]),
											(a = e[i + 2]),
											(192 & s) == 128 &&
												(192 & a) == 128 &&
												(l = ((15 & u) << 12) | ((63 & s) << 6) | (63 & a)) >
													2047 &&
												(l < 55296 || l > 57343) &&
												(h = l);
										break;
									case 4:
										(s = e[i + 1]),
											(a = e[i + 2]),
											(o = e[i + 3]),
											(192 & s) == 128 &&
												(192 & a) == 128 &&
												(192 & o) == 128 &&
												(l =
													((15 & u) << 18) |
													((63 & s) << 12) |
													((63 & a) << 6) |
													(63 & o)) > 65535 &&
												l < 1114112 &&
												(h = l);
								}
							null === h
								? ((h = 65533), (c = 1))
								: h > 65535 &&
									((h -= 65536),
									n.push(((h >>> 10) & 1023) | 55296),
									(h = 56320 | (1023 & h))),
								n.push(h),
								(i += c);
						}
						var d = n,
							f = d.length;
						if (f <= 4096) return String.fromCharCode.apply(String, d);
						for (var p = "", g = 0; g < f; )
							p += String.fromCharCode.apply(String, d.slice(g, (g += 4096)));
						return p;
					}
					function w(e, t, r) {
						if (e % 1 != 0 || e < 0) throw RangeError("offset is not uint");
						if (e + t > r)
							throw RangeError("Trying to access beyond buffer length");
					}
					function _(e, t, r, n, i, s) {
						if (!o.isBuffer(e))
							throw TypeError('"buffer" argument must be a Buffer instance');
						if (t > i || t < s)
							throw RangeError('"value" argument is out of bounds');
						if (r + n > e.length) throw RangeError("Index out of range");
					}
					function E(e, t, r, n, i, s) {
						if (r + n > e.length || r < 0)
							throw RangeError("Index out of range");
					}
					function b(e, t, r, n, s) {
						return (
							(t *= 1),
							(r >>>= 0),
							s || E(e, t, r, 4, 34028234663852886e22, -34028234663852886e22),
							i.write(e, t, r, n, 23, 4),
							r + 4
						);
					}
					function I(e, t, r, n, s) {
						return (
							(t *= 1),
							(r >>>= 0),
							s || E(e, t, r, 8, 17976931348623157e292, -17976931348623157e292),
							i.write(e, t, r, n, 52, 8),
							r + 8
						);
					}
					(o.prototype.write = function (e, t, r, n) {
						if (void 0 === t) (n = "utf8"), (r = this.length), (t = 0);
						else if (void 0 === r && "string" == typeof t)
							(n = t), (r = this.length), (t = 0);
						else if (isFinite(t))
							(t >>>= 0),
								isFinite(r)
									? ((r >>>= 0), void 0 === n && (n = "utf8"))
									: ((n = r), (r = void 0));
						else
							throw Error(
								"Buffer.write(string, encoding, offset[, length]) is no longer supported",
							);
						var i,
							s,
							a,
							o,
							l,
							u,
							h,
							c,
							d = this.length - t;
						if (
							((void 0 === r || r > d) && (r = d),
							(e.length > 0 && (r < 0 || t < 0)) || t > this.length)
						)
							throw RangeError("Attempt to write outside buffer bounds");
						n || (n = "utf8");
						for (var f = !1; ; )
							switch (n) {
								case "hex":
									return ((e, t, r, n) => {
										r = Number(r) || 0;
										var i = e.length - r;
										n ? (n = Number(n)) > i && (n = i) : (n = i);
										var s = t.length;
										n > s / 2 && (n = s / 2);
										for (var a = 0; a < n; ++a) {
											var o,
												l = parseInt(t.substr(2 * a, 2), 16);
											if ((o = l) != o) break;
											e[r + a] = l;
										}
										return a;
									})(this, e, t, r);
								case "utf8":
								case "utf-8":
									return (i = t), (s = r), k(S(e, this.length - i), this, i, s);
								case "ascii":
									return (a = t), (o = r), k(C(e), this, a, o);
								case "latin1":
								case "binary":
									return ((e, t, r, n) => k(C(t), e, r, n))(this, e, t, r);
								case "base64":
									return (l = t), (u = r), k(A(e), this, l, u);
								case "ucs2":
								case "ucs-2":
								case "utf16le":
								case "utf-16le":
									return (
										(h = t),
										(c = r),
										k(
											((e, t) => {
												for (
													var r, n, i = [], s = 0;
													s < e.length && !((t -= 2) < 0);
													++s
												)
													(n = (r = e.charCodeAt(s)) >> 8),
														i.push(r % 256),
														i.push(n);
												return i;
											})(e, this.length - h),
											this,
											h,
											c,
										)
									);
								default:
									if (f) throw TypeError("Unknown encoding: " + n);
									(n = ("" + n).toLowerCase()), (f = !0);
							}
					}),
						(o.prototype.toJSON = function () {
							return {
								type: "Buffer",
								data: Array.prototype.slice.call(this._arr || this, 0),
							};
						}),
						(o.prototype.slice = function (e, t) {
							var r = this.length;
							(e = ~~e),
								(t = void 0 === t ? r : ~~t),
								e < 0 ? (e += r) < 0 && (e = 0) : e > r && (e = r),
								t < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
								t < e && (t = e);
							var n = this.subarray(e, t);
							return Object.setPrototypeOf(n, o.prototype), n;
						}),
						(o.prototype.readUIntLE = function (e, t, r) {
							(e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
							for (var n = this[e], i = 1, s = 0; ++s < t && (i *= 256); )
								n += this[e + s] * i;
							return n;
						}),
						(o.prototype.readUIntBE = function (e, t, r) {
							(e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
							for (var n = this[e + --t], i = 1; t > 0 && (i *= 256); )
								n += this[e + --t] * i;
							return n;
						}),
						(o.prototype.readUInt8 = function (e, t) {
							return (e >>>= 0), t || w(e, 1, this.length), this[e];
						}),
						(o.prototype.readUInt16LE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 2, this.length),
								this[e] | (this[e + 1] << 8)
							);
						}),
						(o.prototype.readUInt16BE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 2, this.length),
								(this[e] << 8) | this[e + 1]
							);
						}),
						(o.prototype.readUInt32LE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								(this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
									0x1000000 * this[e + 3]
							);
						}),
						(o.prototype.readUInt32BE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								0x1000000 * this[e] +
									((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
							);
						}),
						(o.prototype.readIntLE = function (e, t, r) {
							(e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
							for (var n = this[e], i = 1, s = 0; ++s < t && (i *= 256); )
								n += this[e + s] * i;
							return n >= (i *= 128) && (n -= 2 ** (8 * t)), n;
						}),
						(o.prototype.readIntBE = function (e, t, r) {
							(e >>>= 0), (t >>>= 0), r || w(e, t, this.length);
							for (var n = t, i = 1, s = this[e + --n]; n > 0 && (i *= 256); )
								s += this[e + --n] * i;
							return s >= (i *= 128) && (s -= 2 ** (8 * t)), s;
						}),
						(o.prototype.readInt8 = function (e, t) {
							return ((e >>>= 0), t || w(e, 1, this.length), 128 & this[e])
								? -((255 - this[e] + 1) * 1)
								: this[e];
						}),
						(o.prototype.readInt16LE = function (e, t) {
							(e >>>= 0), t || w(e, 2, this.length);
							var r = this[e] | (this[e + 1] << 8);
							return 32768 & r ? 0xffff0000 | r : r;
						}),
						(o.prototype.readInt16BE = function (e, t) {
							(e >>>= 0), t || w(e, 2, this.length);
							var r = this[e + 1] | (this[e] << 8);
							return 32768 & r ? 0xffff0000 | r : r;
						}),
						(o.prototype.readInt32LE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								this[e] |
									(this[e + 1] << 8) |
									(this[e + 2] << 16) |
									(this[e + 3] << 24)
							);
						}),
						(o.prototype.readInt32BE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								(this[e] << 24) |
									(this[e + 1] << 16) |
									(this[e + 2] << 8) |
									this[e + 3]
							);
						}),
						(o.prototype.readFloatLE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								i.read(this, e, !0, 23, 4)
							);
						}),
						(o.prototype.readFloatBE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 4, this.length),
								i.read(this, e, !1, 23, 4)
							);
						}),
						(o.prototype.readDoubleLE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 8, this.length),
								i.read(this, e, !0, 52, 8)
							);
						}),
						(o.prototype.readDoubleBE = function (e, t) {
							return (
								(e >>>= 0),
								t || w(e, 8, this.length),
								i.read(this, e, !1, 52, 8)
							);
						}),
						(o.prototype.writeUIntLE = function (e, t, r, n) {
							if (((e *= 1), (t >>>= 0), (r >>>= 0), !n)) {
								var i = 2 ** (8 * r) - 1;
								_(this, e, t, r, i, 0);
							}
							var s = 1,
								a = 0;
							for (this[t] = 255 & e; ++a < r && (s *= 256); )
								this[t + a] = (e / s) & 255;
							return t + r;
						}),
						(o.prototype.writeUIntBE = function (e, t, r, n) {
							if (((e *= 1), (t >>>= 0), (r >>>= 0), !n)) {
								var i = 2 ** (8 * r) - 1;
								_(this, e, t, r, i, 0);
							}
							var s = r - 1,
								a = 1;
							for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
								this[t + s] = (e / a) & 255;
							return t + r;
						}),
						(o.prototype.writeUInt8 = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 1, 255, 0),
								(this[t] = 255 & e),
								t + 1
							);
						}),
						(o.prototype.writeUInt16LE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 2, 65535, 0),
								(this[t] = 255 & e),
								(this[t + 1] = e >>> 8),
								t + 2
							);
						}),
						(o.prototype.writeUInt16BE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 2, 65535, 0),
								(this[t] = e >>> 8),
								(this[t + 1] = 255 & e),
								t + 2
							);
						}),
						(o.prototype.writeUInt32LE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 4, 0xffffffff, 0),
								(this[t + 3] = e >>> 24),
								(this[t + 2] = e >>> 16),
								(this[t + 1] = e >>> 8),
								(this[t] = 255 & e),
								t + 4
							);
						}),
						(o.prototype.writeUInt32BE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 4, 0xffffffff, 0),
								(this[t] = e >>> 24),
								(this[t + 1] = e >>> 16),
								(this[t + 2] = e >>> 8),
								(this[t + 3] = 255 & e),
								t + 4
							);
						}),
						(o.prototype.writeIntLE = function (e, t, r, n) {
							if (((e *= 1), (t >>>= 0), !n)) {
								var i = 2 ** (8 * r - 1);
								_(this, e, t, r, i - 1, -i);
							}
							var s = 0,
								a = 1,
								o = 0;
							for (this[t] = 255 & e; ++s < r && (a *= 256); )
								e < 0 && 0 === o && 0 !== this[t + s - 1] && (o = 1),
									(this[t + s] = (((e / a) | 0) - o) & 255);
							return t + r;
						}),
						(o.prototype.writeIntBE = function (e, t, r, n) {
							if (((e *= 1), (t >>>= 0), !n)) {
								var i = 2 ** (8 * r - 1);
								_(this, e, t, r, i - 1, -i);
							}
							var s = r - 1,
								a = 1,
								o = 0;
							for (this[t + s] = 255 & e; --s >= 0 && (a *= 256); )
								e < 0 && 0 === o && 0 !== this[t + s + 1] && (o = 1),
									(this[t + s] = (((e / a) | 0) - o) & 255);
							return t + r;
						}),
						(o.prototype.writeInt8 = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 1, 127, -128),
								e < 0 && (e = 255 + e + 1),
								(this[t] = 255 & e),
								t + 1
							);
						}),
						(o.prototype.writeInt16LE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 2, 32767, -32768),
								(this[t] = 255 & e),
								(this[t + 1] = e >>> 8),
								t + 2
							);
						}),
						(o.prototype.writeInt16BE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 2, 32767, -32768),
								(this[t] = e >>> 8),
								(this[t + 1] = 255 & e),
								t + 2
							);
						}),
						(o.prototype.writeInt32LE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 4, 0x7fffffff, -0x80000000),
								(this[t] = 255 & e),
								(this[t + 1] = e >>> 8),
								(this[t + 2] = e >>> 16),
								(this[t + 3] = e >>> 24),
								t + 4
							);
						}),
						(o.prototype.writeInt32BE = function (e, t, r) {
							return (
								(e *= 1),
								(t >>>= 0),
								r || _(this, e, t, 4, 0x7fffffff, -0x80000000),
								e < 0 && (e = 0xffffffff + e + 1),
								(this[t] = e >>> 24),
								(this[t + 1] = e >>> 16),
								(this[t + 2] = e >>> 8),
								(this[t + 3] = 255 & e),
								t + 4
							);
						}),
						(o.prototype.writeFloatLE = function (e, t, r) {
							return b(this, e, t, !0, r);
						}),
						(o.prototype.writeFloatBE = function (e, t, r) {
							return b(this, e, t, !1, r);
						}),
						(o.prototype.writeDoubleLE = function (e, t, r) {
							return I(this, e, t, !0, r);
						}),
						(o.prototype.writeDoubleBE = function (e, t, r) {
							return I(this, e, t, !1, r);
						}),
						(o.prototype.copy = function (e, t, r, n) {
							if (!o.isBuffer(e))
								throw TypeError("argument should be a Buffer");
							if (
								(r || (r = 0),
								n || 0 === n || (n = this.length),
								t >= e.length && (t = e.length),
								t || (t = 0),
								n > 0 && n < r && (n = r),
								n === r || 0 === e.length || 0 === this.length)
							)
								return 0;
							if (t < 0) throw RangeError("targetStart out of bounds");
							if (r < 0 || r >= this.length)
								throw RangeError("Index out of range");
							if (n < 0) throw RangeError("sourceEnd out of bounds");
							n > this.length && (n = this.length),
								e.length - t < n - r && (n = e.length - t + r);
							var i = n - r;
							if (
								this === e &&
								"function" == typeof Uint8Array.prototype.copyWithin
							)
								this.copyWithin(t, r, n);
							else if (this === e && r < t && t < n)
								for (var s = i - 1; s >= 0; --s) e[s + t] = this[s + r];
							else Uint8Array.prototype.set.call(e, this.subarray(r, n), t);
							return i;
						}),
						(o.prototype.fill = function (e, t, r, n) {
							if ("string" == typeof e) {
								if (
									("string" == typeof t
										? ((n = t), (t = 0), (r = this.length))
										: "string" == typeof r && ((n = r), (r = this.length)),
									void 0 !== n && "string" != typeof n)
								)
									throw TypeError("encoding must be a string");
								if ("string" == typeof n && !o.isEncoding(n))
									throw TypeError("Unknown encoding: " + n);
								if (1 === e.length) {
									var i,
										s = e.charCodeAt(0);
									(("utf8" === n && s < 128) || "latin1" === n) && (e = s);
								}
							} else
								"number" == typeof e
									? (e &= 255)
									: "boolean" == typeof e && (e = Number(e));
							if (t < 0 || this.length < t || this.length < r)
								throw RangeError("Out of range index");
							if (r <= t) return this;
							if (
								((t >>>= 0),
								(r = void 0 === r ? this.length : r >>> 0),
								e || (e = 0),
								"number" == typeof e)
							)
								for (i = t; i < r; ++i) this[i] = e;
							else {
								var a = o.isBuffer(e) ? e : o.from(e, n),
									l = a.length;
								if (0 === l)
									throw TypeError(
										'The value "' + e + '" is invalid for argument "value"',
									);
								for (i = 0; i < r - t; ++i) this[i + t] = a[i % l];
							}
							return this;
						});
					var T = /[^+/0-9A-Za-z-_]/g;
					function S(e, t) {
						t = t || 1 / 0;
						for (var r, n = e.length, i = null, s = [], a = 0; a < n; ++a) {
							if ((r = e.charCodeAt(a)) > 55295 && r < 57344) {
								if (!i) {
									if (r > 56319 || a + 1 === n) {
										(t -= 3) > -1 && s.push(239, 191, 189);
										continue;
									}
									i = r;
									continue;
								}
								if (r < 56320) {
									(t -= 3) > -1 && s.push(239, 191, 189), (i = r);
									continue;
								}
								r = (((i - 55296) << 10) | (r - 56320)) + 65536;
							} else i && (t -= 3) > -1 && s.push(239, 191, 189);
							if (((i = null), r < 128)) {
								if ((t -= 1) < 0) break;
								s.push(r);
							} else if (r < 2048) {
								if ((t -= 2) < 0) break;
								s.push((r >> 6) | 192, (63 & r) | 128);
							} else if (r < 65536) {
								if ((t -= 3) < 0) break;
								s.push((r >> 12) | 224, ((r >> 6) & 63) | 128, (63 & r) | 128);
							} else if (r < 1114112) {
								if ((t -= 4) < 0) break;
								s.push(
									(r >> 18) | 240,
									((r >> 12) & 63) | 128,
									((r >> 6) & 63) | 128,
									(63 & r) | 128,
								);
							} else throw Error("Invalid code point");
						}
						return s;
					}
					function C(e) {
						for (var t = [], r = 0; r < e.length; ++r)
							t.push(255 & e.charCodeAt(r));
						return t;
					}
					function A(e) {
						return n.toByteArray(
							((e) => {
								if (
									(e = (e = e.split("=")[0]).trim().replace(T, "")).length < 2
								)
									return "";
								for (; e.length % 4 != 0; ) e += "=";
								return e;
							})(e),
						);
					}
					function k(e, t, r, n) {
						for (
							var i = 0;
							i < n && !(i + r >= t.length) && !(i >= e.length);
							++i
						)
							t[i + r] = e[i];
						return i;
					}
					function R(e, t) {
						return (
							e instanceof t ||
							(null != e &&
								null != e.constructor &&
								null != e.constructor.name &&
								e.constructor.name === t.name)
						);
					}
					var N = (() => {
						for (var e = "0123456789abcdef", t = Array(256), r = 0; r < 16; ++r)
							for (var n = 16 * r, i = 0; i < 16; ++i) t[n + i] = e[r] + e[i];
						return t;
					})();
				},
				783: (e, t) => {
					(t.read = (e, t, r, n, i) => {
						var s,
							a,
							o = 8 * i - n - 1,
							l = (1 << o) - 1,
							u = l >> 1,
							h = -7,
							c = r ? i - 1 : 0,
							d = r ? -1 : 1,
							f = e[t + c];
						for (
							c += d, s = f & ((1 << -h) - 1), f >>= -h, h += o;
							h > 0;
							s = 256 * s + e[t + c], c += d, h -= 8
						);
						for (
							a = s & ((1 << -h) - 1), s >>= -h, h += n;
							h > 0;
							a = 256 * a + e[t + c], c += d, h -= 8
						);
						if (0 === s) s = 1 - u;
						else {
							if (s === l) return a ? NaN : (1 / 0) * (f ? -1 : 1);
							(a += 2 ** n), (s -= u);
						}
						return (f ? -1 : 1) * a * 2 ** (s - n);
					}),
						(t.write = (e, t, r, n, i, s) => {
							var a,
								o,
								l,
								u = 8 * s - i - 1,
								h = (1 << u) - 1,
								c = h >> 1,
								d = 5960464477539062e-23 * (23 === i),
								f = n ? 0 : s - 1,
								p = n ? 1 : -1,
								g = +(t < 0 || (0 === t && 1 / t < 0));
							for (
								isNaN((t = Math.abs(t))) || t === 1 / 0
									? ((o = +!!isNaN(t)), (a = h))
									: ((a = Math.floor(Math.log(t) / Math.LN2)),
										t * (l = 2 ** -a) < 1 && (a--, (l *= 2)),
										a + c >= 1 ? (t += d / l) : (t += d * 2 ** (1 - c)),
										t * l >= 2 && (a++, (l /= 2)),
										a + c >= h
											? ((o = 0), (a = h))
											: a + c >= 1
												? ((o = (t * l - 1) * 2 ** i), (a += c))
												: ((o = t * 2 ** (c - 1) * 2 ** i), (a = 0)));
								i >= 8;
								e[r + f] = 255 & o, f += p, o /= 256, i -= 8
							);
							for (
								a = (a << i) | o, u += i;
								u > 0;
								e[r + f] = 255 & a, f += p, a /= 256, u -= 8
							);
							e[r + f - p] |= 128 * g;
						});
				},
			},
			i = {};
		function s(e) {
			var t = i[e];
			if (void 0 !== t) return t.exports;
			var r = (i[e] = { exports: {} }),
				a = !0;
			try {
				n[e](r, r.exports, s), (a = !1);
			} finally {
				a && delete i[e];
			}
			return r.exports;
		}
		(s.ab =
			"/ROOT/node_modules/.pnpm/next@16.1.5_@opentelemetry+api@1.9.1_babel-plugin-react-compiler@1.0.0_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/compiled/buffer/"),
			(t.exports = s(72));
	},
	65237,
	28075,
	(e) => {
		let t, r, n, i;
		e.i(86697);
		var s,
			a,
			o,
			l,
			u,
			h,
			c,
			d,
			f,
			p,
			g,
			m,
			y,
			v,
			w = e.i(69960),
			_ = e.i(51099),
			E = e.i(32198),
			b = e.i(18044),
			I = e.i(81879),
			T = e.i(63971),
			S = e.i(81673),
			C =
				"u" > typeof globalThis
					? globalThis
					: "u" > typeof window
						? window
						: e.g,
			A = {};
		(() => {
			function e() {
				(this.blockSize = -1),
					(this.blockSize = 64),
					(this.g = [, , , ,]),
					(this.B = Array(this.blockSize)),
					(this.o = this.h = 0),
					this.s();
			}
			var t = function () {
				this.blockSize = -1;
			};
			function r() {}
			function n(e, t, r) {
				r || (r = 0);
				var n = Array(16);
				if ("string" == typeof t)
					for (var i = 0; 16 > i; ++i)
						n[i] =
							t.charCodeAt(r++) |
							(t.charCodeAt(r++) << 8) |
							(t.charCodeAt(r++) << 16) |
							(t.charCodeAt(r++) << 24);
				else
					for (i = 0; 16 > i; ++i)
						n[i] = t[r++] | (t[r++] << 8) | (t[r++] << 16) | (t[r++] << 24);
				(t = e.g[0]), (r = e.g[1]), (i = e.g[2]);
				var s = e.g[3],
					a = (t + (s ^ (r & (i ^ s))) + n[0] + 0xd76aa478) | 0;
				(a =
					(s +
						(i ^ ((t = r + ((a << 7) | (a >>> 25))) & (r ^ i))) +
						n[1] +
						0xe8c7b756) |
					0),
					(a =
						(i +
							(r ^ ((s = t + ((a << 12) | (a >>> 20))) & (t ^ r))) +
							n[2] +
							0x242070db) |
						0),
					(a =
						(r +
							(t ^ ((i = s + ((a << 17) | (a >>> 15))) & (s ^ t))) +
							n[3] +
							0xc1bdceee) |
						0),
					(a =
						(t +
							(s ^ ((r = i + ((a << 22) | (a >>> 10))) & (i ^ s))) +
							n[4] +
							0xf57c0faf) |
						0),
					(a =
						(s +
							(i ^ ((t = r + ((a << 7) | (a >>> 25))) & (r ^ i))) +
							n[5] +
							0x4787c62a) |
						0),
					(a =
						(i +
							(r ^ ((s = t + ((a << 12) | (a >>> 20))) & (t ^ r))) +
							n[6] +
							0xa8304613) |
						0),
					(a =
						(r +
							(t ^ ((i = s + ((a << 17) | (a >>> 15))) & (s ^ t))) +
							n[7] +
							0xfd469501) |
						0),
					(a =
						(t +
							(s ^ ((r = i + ((a << 22) | (a >>> 10))) & (i ^ s))) +
							n[8] +
							0x698098d8) |
						0),
					(a =
						(s +
							(i ^ ((t = r + ((a << 7) | (a >>> 25))) & (r ^ i))) +
							n[9] +
							0x8b44f7af) |
						0),
					(a =
						(i +
							(r ^ ((s = t + ((a << 12) | (a >>> 20))) & (t ^ r))) +
							n[10] +
							0xffff5bb1) |
						0),
					(a =
						(r +
							(t ^ ((i = s + ((a << 17) | (a >>> 15))) & (s ^ t))) +
							n[11] +
							0x895cd7be) |
						0),
					(a =
						(t +
							(s ^ ((r = i + ((a << 22) | (a >>> 10))) & (i ^ s))) +
							n[12] +
							0x6b901122) |
						0),
					(a =
						(s +
							(i ^ ((t = r + ((a << 7) | (a >>> 25))) & (r ^ i))) +
							n[13] +
							0xfd987193) |
						0),
					(a =
						(i +
							(r ^ ((s = t + ((a << 12) | (a >>> 20))) & (t ^ r))) +
							n[14] +
							0xa679438e) |
						0),
					(a =
						(r +
							(t ^ ((i = s + ((a << 17) | (a >>> 15))) & (s ^ t))) +
							n[15] +
							0x49b40821) |
						0),
					(r = i + ((a << 22) | (a >>> 10))),
					(a = (t + (i ^ (s & (r ^ i))) + n[1] + 0xf61e2562) | 0),
					(t = r + ((a << 5) | (a >>> 27))),
					(a = (s + (r ^ (i & (t ^ r))) + n[6] + 0xc040b340) | 0),
					(s = t + ((a << 9) | (a >>> 23))),
					(a = (i + (t ^ (r & (s ^ t))) + n[11] + 0x265e5a51) | 0),
					(i = s + ((a << 14) | (a >>> 18))),
					(a = (r + (s ^ (t & (i ^ s))) + n[0] + 0xe9b6c7aa) | 0),
					(r = i + ((a << 20) | (a >>> 12))),
					(a = (t + (i ^ (s & (r ^ i))) + n[5] + 0xd62f105d) | 0),
					(t = r + ((a << 5) | (a >>> 27))),
					(a = (s + (r ^ (i & (t ^ r))) + n[10] + 0x2441453) | 0),
					(s = t + ((a << 9) | (a >>> 23))),
					(a = (i + (t ^ (r & (s ^ t))) + n[15] + 0xd8a1e681) | 0),
					(i = s + ((a << 14) | (a >>> 18))),
					(a = (r + (s ^ (t & (i ^ s))) + n[4] + 0xe7d3fbc8) | 0),
					(r = i + ((a << 20) | (a >>> 12))),
					(a = (t + (i ^ (s & (r ^ i))) + n[9] + 0x21e1cde6) | 0),
					(t = r + ((a << 5) | (a >>> 27))),
					(a = (s + (r ^ (i & (t ^ r))) + n[14] + 0xc33707d6) | 0),
					(s = t + ((a << 9) | (a >>> 23))),
					(a = (i + (t ^ (r & (s ^ t))) + n[3] + 0xf4d50d87) | 0),
					(i = s + ((a << 14) | (a >>> 18))),
					(a = (r + (s ^ (t & (i ^ s))) + n[8] + 0x455a14ed) | 0),
					(r = i + ((a << 20) | (a >>> 12))),
					(a = (t + (i ^ (s & (r ^ i))) + n[13] + 0xa9e3e905) | 0),
					(t = r + ((a << 5) | (a >>> 27))),
					(a = (s + (r ^ (i & (t ^ r))) + n[2] + 0xfcefa3f8) | 0),
					(s = t + ((a << 9) | (a >>> 23))),
					(a = (i + (t ^ (r & (s ^ t))) + n[7] + 0x676f02d9) | 0),
					(i = s + ((a << 14) | (a >>> 18))),
					(a = (r + (s ^ (t & (i ^ s))) + n[12] + 0x8d2a4c8a) | 0),
					(a =
						(t +
							((r = i + ((a << 20) | (a >>> 12))) ^ i ^ s) +
							n[5] +
							0xfffa3942) |
						0),
					(a =
						(s +
							((t = r + ((a << 4) | (a >>> 28))) ^ r ^ i) +
							n[8] +
							0x8771f681) |
						0),
					(a =
						(i +
							((s = t + ((a << 11) | (a >>> 21))) ^ t ^ r) +
							n[11] +
							0x6d9d6122) |
						0),
					(a =
						(r +
							((i = s + ((a << 16) | (a >>> 16))) ^ s ^ t) +
							n[14] +
							0xfde5380c) |
						0),
					(a =
						(t +
							((r = i + ((a << 23) | (a >>> 9))) ^ i ^ s) +
							n[1] +
							0xa4beea44) |
						0),
					(a =
						(s +
							((t = r + ((a << 4) | (a >>> 28))) ^ r ^ i) +
							n[4] +
							0x4bdecfa9) |
						0),
					(a =
						(i +
							((s = t + ((a << 11) | (a >>> 21))) ^ t ^ r) +
							n[7] +
							0xf6bb4b60) |
						0),
					(a =
						(r +
							((i = s + ((a << 16) | (a >>> 16))) ^ s ^ t) +
							n[10] +
							0xbebfbc70) |
						0),
					(a =
						(t +
							((r = i + ((a << 23) | (a >>> 9))) ^ i ^ s) +
							n[13] +
							0x289b7ec6) |
						0),
					(a =
						(s +
							((t = r + ((a << 4) | (a >>> 28))) ^ r ^ i) +
							n[0] +
							0xeaa127fa) |
						0),
					(a =
						(i +
							((s = t + ((a << 11) | (a >>> 21))) ^ t ^ r) +
							n[3] +
							0xd4ef3085) |
						0),
					(a =
						(r +
							((i = s + ((a << 16) | (a >>> 16))) ^ s ^ t) +
							n[6] +
							0x4881d05) |
						0),
					(a =
						(t +
							((r = i + ((a << 23) | (a >>> 9))) ^ i ^ s) +
							n[9] +
							0xd9d4d039) |
						0),
					(a =
						(s +
							((t = r + ((a << 4) | (a >>> 28))) ^ r ^ i) +
							n[12] +
							0xe6db99e5) |
						0),
					(a =
						(i +
							((s = t + ((a << 11) | (a >>> 21))) ^ t ^ r) +
							n[15] +
							0x1fa27cf8) |
						0),
					(a =
						(r +
							((i = s + ((a << 16) | (a >>> 16))) ^ s ^ t) +
							n[2] +
							0xc4ac5665) |
						0),
					(r = i + ((a << 23) | (a >>> 9))),
					(a = (t + (i ^ (r | ~s)) + n[0] + 0xf4292244) | 0),
					(t = r + ((a << 6) | (a >>> 26))),
					(a = (s + (r ^ (t | ~i)) + n[7] + 0x432aff97) | 0),
					(s = t + ((a << 10) | (a >>> 22))),
					(a = (i + (t ^ (s | ~r)) + n[14] + 0xab9423a7) | 0),
					(i = s + ((a << 15) | (a >>> 17))),
					(a = (r + (s ^ (i | ~t)) + n[5] + 0xfc93a039) | 0),
					(r = i + ((a << 21) | (a >>> 11))),
					(a = (t + (i ^ (r | ~s)) + n[12] + 0x655b59c3) | 0),
					(t = r + ((a << 6) | (a >>> 26))),
					(a = (s + (r ^ (t | ~i)) + n[3] + 0x8f0ccc92) | 0),
					(s = t + ((a << 10) | (a >>> 22))),
					(a = (i + (t ^ (s | ~r)) + n[10] + 0xffeff47d) | 0),
					(i = s + ((a << 15) | (a >>> 17))),
					(a = (r + (s ^ (i | ~t)) + n[1] + 0x85845dd1) | 0),
					(r = i + ((a << 21) | (a >>> 11))),
					(a = (t + (i ^ (r | ~s)) + n[8] + 0x6fa87e4f) | 0),
					(t = r + ((a << 6) | (a >>> 26))),
					(a = (s + (r ^ (t | ~i)) + n[15] + 0xfe2ce6e0) | 0),
					(s = t + ((a << 10) | (a >>> 22))),
					(a = (i + (t ^ (s | ~r)) + n[6] + 0xa3014314) | 0),
					(i = s + ((a << 15) | (a >>> 17))),
					(a = (r + (s ^ (i | ~t)) + n[13] + 0x4e0811a1) | 0),
					(r = i + ((a << 21) | (a >>> 11))),
					(a = (t + (i ^ (r | ~s)) + n[4] + 0xf7537e82) | 0),
					(t = r + ((a << 6) | (a >>> 26))),
					(a = (s + (r ^ (t | ~i)) + n[11] + 0xbd3af235) | 0),
					(s = t + ((a << 10) | (a >>> 22))),
					(a = (i + (t ^ (s | ~r)) + n[2] + 0x2ad7d2bb) | 0),
					(i = s + ((a << 15) | (a >>> 17))),
					(a = (r + (s ^ (i | ~t)) + n[9] + 0xeb86d391) | 0),
					(e.g[0] = (e.g[0] + t) | 0),
					(e.g[1] = (e.g[1] + (i + ((a << 21) | (a >>> 11)))) | 0),
					(e.g[2] = (e.g[2] + i) | 0),
					(e.g[3] = (e.g[3] + s) | 0);
			}
			function i(e, t) {
				this.h = t;
				for (var r = [], n = !0, i = e.length - 1; 0 <= i; i--) {
					var s = 0 | e[i];
					(n && s == t) || ((r[i] = s), (n = !1));
				}
				this.g = r;
			}
			(r.prototype = t.prototype),
				(e.D = t.prototype),
				(e.prototype = new r()),
				(e.prototype.constructor = e),
				(e.C = function (e, r, n) {
					for (
						var i = Array(arguments.length - 2), s = 2;
						s < arguments.length;
						s++
					)
						i[s - 2] = arguments[s];
					return t.prototype[r].apply(e, i);
				}),
				(e.prototype.s = function () {
					(this.g[0] = 0x67452301),
						(this.g[1] = 0xefcdab89),
						(this.g[2] = 0x98badcfe),
						(this.g[3] = 0x10325476),
						(this.o = this.h = 0);
				}),
				(e.prototype.u = function (e, t) {
					void 0 === t && (t = e.length);
					for (
						var r = t - this.blockSize, i = this.B, s = this.h, a = 0;
						a < t;
					) {
						if (0 == s) for (; a <= r; ) n(this, e, a), (a += this.blockSize);
						if ("string" == typeof e) {
							for (; a < t; )
								if (((i[s++] = e.charCodeAt(a++)), s == this.blockSize)) {
									n(this, i), (s = 0);
									break;
								}
						} else
							for (; a < t; )
								if (((i[s++] = e[a++]), s == this.blockSize)) {
									n(this, i), (s = 0);
									break;
								}
					}
					(this.h = s), (this.o += t);
				}),
				(e.prototype.v = function () {
					var e = Array(
						(56 > this.h ? this.blockSize : 2 * this.blockSize) - this.h,
					);
					e[0] = 128;
					for (var t = 1; t < e.length - 8; ++t) e[t] = 0;
					var r = 8 * this.o;
					for (t = e.length - 8; t < e.length; ++t)
						(e[t] = 255 & r), (r /= 256);
					for (this.u(e), e = Array(16), t = r = 0; 4 > t; ++t)
						for (var n = 0; 32 > n; n += 8) e[r++] = (this.g[t] >>> n) & 255;
					return e;
				});
			var o,
				l = {};
			function u(e) {
				var t;
				return -128 <= e && 128 > e
					? ((t = (e) => new i([0 | e], 0 > e ? -1 : 0)),
						Object.hasOwn(l, e) ? l[e] : (l[e] = t(e)))
					: new i([0 | e], 0 > e ? -1 : 0);
			}
			function h(e) {
				if (isNaN(e) || !isFinite(e)) return c;
				if (0 > e) return m(h(-e));
				for (var t = [], r = 1, n = 0; e >= r; n++)
					(t[n] = (e / r) | 0), (r *= 0x100000000);
				return new i(t, 0);
			}
			var c = u(0),
				d = u(1),
				f = u(0x1000000);
			function p(e) {
				if (0 != e.h) return !1;
				for (var t = 0; t < e.g.length; t++) if (0 != e.g[t]) return !1;
				return !0;
			}
			function g(e) {
				return -1 == e.h;
			}
			function m(e) {
				for (var t = e.g.length, r = [], n = 0; n < t; n++) r[n] = ~e.g[n];
				return new i(r, ~e.h).add(d);
			}
			function y(e, t) {
				return e.add(m(t));
			}
			function v(e, t) {
				for (; (65535 & e[t]) != e[t]; )
					(e[t + 1] += e[t] >>> 16), (e[t] &= 65535), t++;
			}
			function w(e, t) {
				(this.g = e), (this.h = t);
			}
			function _(e, t) {
				if (p(t)) throw Error("division by zero");
				if (p(e)) return new w(c, c);
				if (g(e)) return (t = _(m(e), t)), new w(m(t.g), m(t.h));
				if (g(t)) return (t = _(e, m(t))), new w(m(t.g), t.h);
				if (30 < e.g.length) {
					if (g(e) || g(t))
						throw Error("slowDivide_ only works with positive integers.");
					for (var r = d, n = t; 0 >= n.l(e); ) (r = E(r)), (n = E(n));
					var i = b(r, 1),
						s = b(n, 1);
					for (n = b(n, 2), r = b(r, 2); !p(n); ) {
						var a = s.add(n);
						0 >= a.l(e) && ((i = i.add(r)), (s = a)),
							(n = b(n, 1)),
							(r = b(r, 1));
					}
					return (t = y(e, i.j(t))), new w(i, t);
				}
				for (i = c; 0 <= e.l(t); ) {
					for (
						n =
							48 >=
							(n = Math.ceil(
								Math.log((r = Math.max(1, Math.floor(e.m() / t.m())))) /
									Math.LN2,
							))
								? 1
								: 2 ** (n - 48),
							a = (s = h(r)).j(t);
						g(a) || 0 < a.l(e);
					)
						(r -= n), (a = (s = h(r)).j(t));
					p(s) && (s = d), (i = i.add(s)), (e = y(e, a));
				}
				return new w(i, e);
			}
			function E(e) {
				for (var t = e.g.length + 1, r = [], n = 0; n < t; n++)
					r[n] = (e.i(n) << 1) | (e.i(n - 1) >>> 31);
				return new i(r, e.h);
			}
			function b(e, t) {
				var r = t >> 5;
				t %= 32;
				for (var n = e.g.length - r, s = [], a = 0; a < n; a++)
					s[a] =
						0 < t
							? (e.i(a + r) >>> t) | (e.i(a + r + 1) << (32 - t))
							: e.i(a + r);
				return new i(s, e.h);
			}
			((o = i.prototype).m = function () {
				if (g(this)) return -m(this).m();
				for (var e = 0, t = 1, r = 0; r < this.g.length; r++) {
					var n = this.i(r);
					(e += (0 <= n ? n : 0x100000000 + n) * t), (t *= 0x100000000);
				}
				return e;
			}),
				(o.toString = function (e) {
					if (2 > (e = e || 10) || 36 < e)
						throw Error("radix out of range: " + e);
					if (p(this)) return "0";
					if (g(this)) return "-" + m(this).toString(e);
					for (var t = h(e ** 6), r = this, n = ""; ; ) {
						var i = _(r, t).g,
							s = (
								(0 < (r = y(r, i.j(t))).g.length ? r.g[0] : r.h) >>> 0
							).toString(e);
						if (p((r = i))) return s + n;
						for (; 6 > s.length; ) s = "0" + s;
						n = s + n;
					}
				}),
				(o.i = function (e) {
					return 0 > e ? 0 : e < this.g.length ? this.g[e] : this.h;
				}),
				(o.l = function (e) {
					return g((e = y(this, e))) ? -1 : +!p(e);
				}),
				(o.abs = function () {
					return g(this) ? m(this) : this;
				}),
				(o.add = function (e) {
					for (
						var t = Math.max(this.g.length, e.g.length), r = [], n = 0, s = 0;
						s <= t;
						s++
					) {
						var a = n + (65535 & this.i(s)) + (65535 & e.i(s)),
							o = (a >>> 16) + (this.i(s) >>> 16) + (e.i(s) >>> 16);
						(n = o >>> 16), (a &= 65535), (o &= 65535), (r[s] = (o << 16) | a);
					}
					return new i(r, -0x80000000 & r[r.length - 1] ? -1 : 0);
				}),
				(o.j = function (e) {
					if (p(this) || p(e)) return c;
					if (g(this)) return g(e) ? m(this).j(m(e)) : m(m(this).j(e));
					if (g(e)) return m(this.j(m(e)));
					if (0 > this.l(f) && 0 > e.l(f)) return h(this.m() * e.m());
					for (
						var t = this.g.length + e.g.length, r = [], n = 0;
						n < 2 * t;
						n++
					)
						r[n] = 0;
					for (n = 0; n < this.g.length; n++)
						for (var s = 0; s < e.g.length; s++) {
							var a = this.i(n) >>> 16,
								o = 65535 & this.i(n),
								l = e.i(s) >>> 16,
								u = 65535 & e.i(s);
							(r[2 * n + 2 * s] += o * u),
								v(r, 2 * n + 2 * s),
								(r[2 * n + 2 * s + 1] += a * u),
								v(r, 2 * n + 2 * s + 1),
								(r[2 * n + 2 * s + 1] += o * l),
								v(r, 2 * n + 2 * s + 1),
								(r[2 * n + 2 * s + 2] += a * l),
								v(r, 2 * n + 2 * s + 2);
						}
					for (n = 0; n < t; n++) r[n] = (r[2 * n + 1] << 16) | r[2 * n];
					for (n = t; n < 2 * t; n++) r[n] = 0;
					return new i(r, 0);
				}),
				(o.A = function (e) {
					return _(this, e).h;
				}),
				(o.and = function (e) {
					for (
						var t = Math.max(this.g.length, e.g.length), r = [], n = 0;
						n < t;
						n++
					)
						r[n] = this.i(n) & e.i(n);
					return new i(r, this.h & e.h);
				}),
				(o.or = function (e) {
					for (
						var t = Math.max(this.g.length, e.g.length), r = [], n = 0;
						n < t;
						n++
					)
						r[n] = this.i(n) | e.i(n);
					return new i(r, this.h | e.h);
				}),
				(o.xor = function (e) {
					for (
						var t = Math.max(this.g.length, e.g.length), r = [], n = 0;
						n < t;
						n++
					)
						r[n] = this.i(n) ^ e.i(n);
					return new i(r, this.h ^ e.h);
				}),
				(e.prototype.digest = e.prototype.v),
				(e.prototype.reset = e.prototype.s),
				(e.prototype.update = e.prototype.u),
				(a = A.Md5 = e),
				(i.prototype.add = i.prototype.add),
				(i.prototype.multiply = i.prototype.j),
				(i.prototype.modulo = i.prototype.A),
				(i.prototype.compare = i.prototype.l),
				(i.prototype.toNumber = i.prototype.m),
				(i.prototype.toString = i.prototype.toString),
				(i.prototype.getBits = i.prototype.i),
				(i.fromNumber = h),
				(i.fromString = function e(t, r) {
					if (0 == t.length) throw Error("number format error: empty string");
					if (2 > (r = r || 10) || 36 < r)
						throw Error("radix out of range: " + r);
					if ("-" == t.charAt(0)) return m(e(t.substring(1), r));
					if (0 <= t.indexOf("-"))
						throw Error('number format error: interior "-" character');
					for (var n = h(r ** 8), i = c, s = 0; s < t.length; s += 8) {
						var a = Math.min(8, t.length - s),
							o = parseInt(t.substring(s, s + a), r);
						8 > a
							? ((a = h(r ** a)), (i = i.j(a).add(h(o))))
							: (i = (i = i.j(n)).add(h(o)));
					}
					return i;
				}),
				(s = A.Integer = i);
		}).apply(
			void 0 !== C
				? C
				: "u" > typeof self
					? self
					: "u" > typeof window
						? window
						: {},
		);
		var k =
				"u" > typeof globalThis
					? globalThis
					: "u" > typeof window
						? window
						: e.g,
			R = {};
		(function () {
			var e,
				t,
				r,
				n =
					"function" == typeof Object.defineProperties
						? Object.defineProperty
						: (e, t, r) => (
								e == Array.prototype ||
									e == Object.prototype ||
									(e[t] = r.value),
								e
							),
				i = ((e) => {
					e = [
						"object" == typeof globalThis && globalThis,
						e,
						"object" == typeof window && window,
						"object" == typeof self && self,
						"object" == typeof k && k,
					];
					for (var t = 0; t < e.length; ++t) {
						var r = e[t];
						if (r && r.Math == Math) return r;
					}
					throw Error("Cannot find global object");
				})(this);
			!((e, t) => {
				if (t)
					e: {
						var r = i;
						e = e.split(".");
						for (var s = 0; s < e.length - 1; s++) {
							var a = e[s];
							if (!(a in r)) break e;
							r = r[a];
						}
						(t = t((s = r[(e = e[e.length - 1])]))) != s &&
							null != t &&
							n(r, e, { configurable: !0, writable: !0, value: t });
					}
			})(
				"Array.prototype.values",
				(e) =>
					e ||
					function () {
						var e, t, r, n, i;
						return (
							(e = this),
							(t = (e, t) => t),
							e instanceof String && (e += ""),
							(r = 0),
							(n = !1),
							((i = {
								next: () => {
									if (!n && r < e.length) {
										var i = r++;
										return { value: t(i, e[i]), done: !1 };
									}
									return (n = !0), { done: !0, value: void 0 };
								},
							})[Symbol.iterator] = () => i),
							i
						);
					},
			);
			var s = s || {},
				a = this || self;
			function g(e) {
				var t = typeof e;
				return (
					"array" ==
						(t =
							"object" != t
								? t
								: e
									? Array.isArray(e)
										? "array"
										: t
									: "null") ||
					("object" == t && "number" == typeof e.length)
				);
			}
			function m(e) {
				var t = typeof e;
				return ("object" == t && null != e) || "function" == t;
			}
			function y(e, t, r) {
				return e.call.apply(e.bind, arguments);
			}
			function v(e, t, r) {
				if (!e) throw Error();
				if (2 < arguments.length) {
					var n = Array.prototype.slice.call(arguments, 2);
					return function () {
						var r = Array.prototype.slice.call(arguments);
						return Array.prototype.unshift.apply(r, n), e.apply(t, r);
					};
				}
				return function () {
					return e.apply(t, arguments);
				};
			}
			function w(e, t, r) {
				return (w =
					Function.prototype.bind &&
					-1 != Function.prototype.bind.toString().indexOf("native code")
						? y
						: v).apply(null, arguments);
			}
			function _(e, t) {
				var r = Array.prototype.slice.call(arguments, 1);
				return function () {
					var t = r.slice();
					return t.push.apply(t, arguments), e.apply(this, t);
				};
			}
			function E(e, t) {
				function r() {}
				(r.prototype = t.prototype),
					(e.aa = t.prototype),
					(e.prototype = new r()),
					(e.prototype.constructor = e),
					(e.Qb = function (e, r, n) {
						for (
							var i = Array(arguments.length - 2), s = 2;
							s < arguments.length;
							s++
						)
							i[s - 2] = arguments[s];
						return t.prototype[r].apply(e, i);
					});
			}
			function b(e) {
				const t = e.length;
				if (0 < t) {
					const r = Array(t);
					for (let n = 0; n < t; n++) r[n] = e[n];
					return r;
				}
				return [];
			}
			function I(e, t) {
				for (let t = 1; t < arguments.length; t++) {
					const r = arguments[t];
					if (g(r)) {
						const t = e.length || 0,
							n = r.length || 0;
						e.length = t + n;
						for (let i = 0; i < n; i++) e[t + i] = r[i];
					} else e.push(r);
				}
			}
			function T(e) {
				return /^[\s\xa0]*$/.test(e);
			}
			function S() {
				var e = a.navigator;
				return e && (e = e.userAgent) ? e : "";
			}
			function C(e) {
				return C[" "](e), e;
			}
			C[" "] = () => {};
			var A =
				-1 != S().indexOf("Gecko") &&
				(-1 == S().toLowerCase().indexOf("webkit") ||
					-1 != S().indexOf("Edge")) &&
				-1 == S().indexOf("Trident") &&
				-1 == S().indexOf("MSIE") &&
				-1 == S().indexOf("Edge");
			function N(e, t, r) {
				for (const n in e) t.call(r, e[n], n, e);
			}
			function D(e) {
				const t = {};
				for (const r in e) t[r] = e[r];
				return t;
			}
			const O =
				"constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(
					" ",
				);
			function P(e, t) {
				let r, n;
				for (let t = 1; t < arguments.length; t++) {
					for (r in (n = arguments[t])) e[r] = n[r];
					for (let t = 0; t < O.length; t++)
						(r = O[t]), Object.hasOwn(n, r) && (e[r] = n[r]);
				}
			}
			var x = new (class {
				constructor(e, t) {
					(this.i = e), (this.j = t), (this.h = 0), (this.g = null);
				}
				get() {
					let e;
					return (
						0 < this.h
							? (this.h--, (e = this.g), (this.g = e.next), (e.next = null))
							: (e = this.i()),
						e
					);
				}
			})(
				() => new L(),
				(e) => e.reset(),
			);
			class L {
				constructor() {
					this.next = this.g = this.h = null;
				}
				set(e, t) {
					(this.h = e), (this.g = t), (this.next = null);
				}
				reset() {
					this.next = this.g = this.h = null;
				}
			}
			let M,
				U = !1,
				V = new (class {
					constructor() {
						this.h = this.g = null;
					}
					add(e, t) {
						const r = x.get();
						r.set(e, t),
							this.h ? (this.h.next = r) : (this.g = r),
							(this.h = r);
					}
				})(),
				F = () => {
					const e = a.Promise.resolve(void 0);
					M = () => {
						e.then(j);
					};
				};
			var j = () => {
				let e;
				for (
					var t;
					(e = null),
						V.g &&
							((e = V.g),
							(V.g = V.g.next),
							V.g || (V.h = null),
							(e.next = null)),
						(t = e);
				) {
					try {
						t.h.call(t.g);
					} catch (e) {
						!((e) => {
							a.setTimeout(() => {
								throw e;
							}, 0);
						})(e);
					}
					x.j(t), 100 > x.h && (x.h++, (t.next = x.g), (x.g = t));
				}
				U = !1;
			};
			function B() {
				(this.s = this.s), (this.C = this.C);
			}
			function q(e, t) {
				(this.type = e),
					(this.g = this.target = t),
					(this.defaultPrevented = !1);
			}
			(B.prototype.s = !1),
				(B.prototype.ma = function () {
					this.s || ((this.s = !0), this.N());
				}),
				(B.prototype.N = function () {
					if (this.C) for (; this.C.length; ) this.C.shift()();
				}),
				(q.prototype.h = function () {
					this.defaultPrevented = !0;
				});
			var $ = (() => {
				if (!a.addEventListener || !Object.defineProperty) return !1;
				var e = !1,
					t = Object.defineProperty({}, "passive", {
						get: () => {
							e = !0;
						},
					});
				try {
					const e = () => {};
					a.addEventListener("test", e, t), a.removeEventListener("test", e, t);
				} catch (e) {}
				return e;
			})();
			function z(e, t) {
				if (
					(q.call(this, e ? e.type : ""),
					(this.relatedTarget = this.g = this.target = null),
					(this.button =
						this.screenY =
						this.screenX =
						this.clientY =
						this.clientX =
							0),
					(this.key = ""),
					(this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1),
					(this.state = null),
					(this.pointerId = 0),
					(this.pointerType = ""),
					(this.i = null),
					e)
				) {
					var r = (this.type = e.type),
						n =
							e.changedTouches && e.changedTouches.length
								? e.changedTouches[0]
								: null;
					if (
						((this.target = e.target || e.srcElement),
						(this.g = t),
						(t = e.relatedTarget))
					) {
						if (A) {
							e: {
								try {
									C(t.nodeName);
									var i = !0;
									break e;
								} catch (e) {}
								i = !1;
							}
							i || (t = null);
						}
					} else
						"mouseover" == r
							? (t = e.fromElement)
							: "mouseout" == r && (t = e.toElement);
					(this.relatedTarget = t),
						n
							? ((this.clientX = void 0 !== n.clientX ? n.clientX : n.pageX),
								(this.clientY = void 0 !== n.clientY ? n.clientY : n.pageY),
								(this.screenX = n.screenX || 0),
								(this.screenY = n.screenY || 0))
							: ((this.clientX = void 0 !== e.clientX ? e.clientX : e.pageX),
								(this.clientY = void 0 !== e.clientY ? e.clientY : e.pageY),
								(this.screenX = e.screenX || 0),
								(this.screenY = e.screenY || 0)),
						(this.button = e.button),
						(this.key = e.key || ""),
						(this.ctrlKey = e.ctrlKey),
						(this.altKey = e.altKey),
						(this.shiftKey = e.shiftKey),
						(this.metaKey = e.metaKey),
						(this.pointerId = e.pointerId || 0),
						(this.pointerType =
							"string" == typeof e.pointerType
								? e.pointerType
								: H[e.pointerType] || ""),
						(this.state = e.state),
						(this.i = e),
						e.defaultPrevented && z.aa.h.call(this);
				}
			}
			E(z, q);
			var H = { 2: "touch", 3: "pen", 4: "mouse" };
			z.prototype.h = function () {
				z.aa.h.call(this);
				var e = this.i;
				e.preventDefault ? e.preventDefault() : (e.returnValue = !1);
			};
			var G = "closure_listenable_" + ((1e6 * Math.random()) | 0),
				K = 0;
			function W(e, t, r, n, i) {
				(this.listener = e),
					(this.proxy = null),
					(this.src = t),
					(this.type = r),
					(this.capture = !!n),
					(this.ha = i),
					(this.key = ++K),
					(this.da = this.fa = !1);
			}
			function Q(e) {
				(e.da = !0),
					(e.listener = null),
					(e.proxy = null),
					(e.src = null),
					(e.ha = null);
			}
			function J(e) {
				(this.src = e), (this.g = {}), (this.h = 0);
			}
			function X(e, t) {
				var r = t.type;
				if (r in e.g) {
					var n,
						i = e.g[r],
						s = Array.prototype.indexOf.call(i, t, void 0);
					(n = 0 <= s) && Array.prototype.splice.call(i, s, 1),
						n && (Q(t), 0 == e.g[r].length && (delete e.g[r], e.h--));
				}
			}
			function Y(e, t, r, n) {
				for (var i = 0; i < e.length; ++i) {
					var s = e[i];
					if (!s.da && s.listener == t && !!r == s.capture && s.ha == n)
						return i;
				}
				return -1;
			}
			J.prototype.add = function (e, t, r, n, i) {
				var s = e.toString();
				(e = this.g[s]) || ((e = this.g[s] = []), this.h++);
				var a = Y(e, t, n, i);
				return (
					-1 < a
						? ((t = e[a]), r || (t.fa = !1))
						: (((t = new W(t, this.src, s, !!n, i)).fa = r), e.push(t)),
					t
				);
			};
			var Z = "closure_lm_" + ((1e6 * Math.random()) | 0),
				ee = {};
			function et(e, t, r, n, i, s) {
				if (!t) throw Error("Invalid event type");
				var a = m(i) ? !!i.capture : !!i,
					o = es(e);
				if ((o || (e[Z] = o = new J(e)), (r = o.add(t, r, n, a, s)).proxy))
					return r;
				if (
					((n = function e(t) {
						return ei.call(e.src, e.listener, t);
					}),
					(r.proxy = n),
					(n.src = e),
					(n.listener = r),
					e.addEventListener)
				)
					$ || (i = a),
						void 0 === i && (i = !1),
						e.addEventListener(t.toString(), n, i);
				else if (e.attachEvent) e.attachEvent(en(t.toString()), n);
				else if (e.addListener && e.removeListener) e.addListener(n);
				else throw Error("addEventListener and attachEvent are unavailable.");
				return r;
			}
			function er(e) {
				if ("number" != typeof e && e && !e.da) {
					var t = e.src;
					if (t && t[G]) X(t.i, e);
					else {
						var r = e.type,
							n = e.proxy;
						t.removeEventListener
							? t.removeEventListener(r, n, e.capture)
							: t.detachEvent
								? t.detachEvent(en(r), n)
								: t.addListener && t.removeListener && t.removeListener(n),
							(r = es(t))
								? (X(r, e), 0 == r.h && ((r.src = null), (t[Z] = null)))
								: Q(e);
					}
				}
			}
			function en(e) {
				return e in ee ? ee[e] : (ee[e] = "on" + e);
			}
			function ei(e, t) {
				if (e.da) e = !0;
				else {
					t = new z(t, this);
					var r = e.listener,
						n = e.ha || e.src;
					e.fa && er(e), (e = r.call(n, t));
				}
				return e;
			}
			function es(e) {
				return (e = e[Z]) instanceof J ? e : null;
			}
			var ea = "__closure_events_fn_" + ((1e9 * Math.random()) >>> 0);
			function eo(e) {
				return "function" == typeof e
					? e
					: (e[ea] || (e[ea] = (t) => e.handleEvent(t)), e[ea]);
			}
			function el() {
				B.call(this), (this.i = new J(this)), (this.M = this), (this.F = null);
			}
			function eu(e, t) {
				var r,
					n = e.F;
				if (n) for (r = []; n; n = n.F) r.push(n);
				if (((e = e.M), (n = t.type || t), "string" == typeof t))
					t = new q(t, e);
				else if (t instanceof q) t.target = t.target || e;
				else {
					var i = t;
					P((t = new q(n, e)), i);
				}
				if (((i = !0), r))
					for (var s = r.length - 1; 0 <= s; s--) {
						var a = (t.g = r[s]);
						i = eh(a, n, !0, t) && i;
					}
				if (
					((i = eh((a = t.g = e), n, !0, t) && i),
					(i = eh(a, n, !1, t) && i),
					r)
				)
					for (s = 0; s < r.length; s++)
						i = eh((a = t.g = r[s]), n, !1, t) && i;
			}
			function eh(e, t, r, n) {
				if (!(t = e.i.g[String(t)])) return !0;
				t = t.concat();
				for (var i = !0, s = 0; s < t.length; ++s) {
					var a = t[s];
					if (a && !a.da && a.capture == r) {
						var o = a.listener,
							l = a.ha || a.src;
						a.fa && X(e.i, a), (i = !1 !== o.call(l, n) && i);
					}
				}
				return i && !n.defaultPrevented;
			}
			function ec(e, t, r) {
				if ("function" == typeof e) r && (e = w(e, r));
				else if (e && "function" == typeof e.handleEvent)
					e = w(e.handleEvent, e);
				else throw Error("Invalid listener argument");
				return 0x7fffffff < Number(t) ? -1 : a.setTimeout(e, t || 0);
			}
			E(el, B),
				(el.prototype[G] = !0),
				(el.prototype.removeEventListener = function (e, t, r, n) {
					!(function e(t, r, n, i, s) {
						if (Array.isArray(r))
							for (var a = 0; a < r.length; a++) e(t, r[a], n, i, s);
						else
							((i = m(i) ? !!i.capture : !!i), (n = eo(n)), t && t[G])
								? ((t = t.i),
									(r = String(r).toString()) in t.g &&
										-1 < (n = Y((a = t.g[r]), n, i, s)) &&
										(Q(a[n]),
										Array.prototype.splice.call(a, n, 1),
										0 == a.length && (delete t.g[r], t.h--)))
								: t &&
									(t = es(t)) &&
									((r = t.g[r.toString()]),
									(t = -1),
									r && (t = Y(r, n, i, s)),
									(n = -1 < t ? r[t] : null) && er(n));
					})(this, e, t, r, n);
				}),
				(el.prototype.N = function () {
					if ((el.aa.N.call(this), this.i)) {
						var e,
							t = this.i;
						for (e in t.g) {
							for (var r = t.g[e], n = 0; n < r.length; n++) Q(r[n]);
							delete t.g[e], t.h--;
						}
					}
					this.F = null;
				}),
				(el.prototype.K = function (e, t, r, n) {
					return this.i.add(String(e), t, !1, r, n);
				}),
				(el.prototype.L = function (e, t, r, n) {
					return this.i.add(String(e), t, !0, r, n);
				});
			class ed extends B {
				constructor(e, t) {
					super(),
						(this.m = e),
						(this.l = t),
						(this.h = null),
						(this.i = !1),
						(this.g = null);
				}
				j(e) {
					(this.h = arguments),
						this.g
							? (this.i = !0)
							: (function e(t) {
									t.g = ec(() => {
										(t.g = null), t.i && ((t.i = !1), e(t));
									}, t.l);
									const r = t.h;
									(t.h = null), t.m.apply(null, r);
								})(this);
				}
				N() {
					super.N(),
						this.g &&
							(a.clearTimeout(this.g),
							(this.g = null),
							(this.i = !1),
							(this.h = null));
				}
			}
			function ef(e) {
				B.call(this), (this.h = e), (this.g = {});
			}
			E(ef, B);
			var ep = [];
			function eg(e) {
				N(
					e.g,
					function (e, t) {
						Object.hasOwn(this.g, t) && er(e);
					},
					e,
				),
					(e.g = {});
			}
			(ef.prototype.N = function () {
				ef.aa.N.call(this), eg(this);
			}),
				(ef.prototype.handleEvent = () => {
					throw Error("EventHandler.handleEvent not implemented");
				});
			var em = a.JSON.stringify,
				ey = a.JSON.parse,
				ev = class {
					stringify(e) {
						return a.JSON.stringify(e, void 0);
					}
					parse(e) {
						return a.JSON.parse(e, void 0);
					}
				};
			function ew() {}
			function e_(e) {
				return e.h || (e.h = e.i());
			}
			function eE() {}
			ew.prototype.h = null;
			var eb = { OPEN: "a", kb: "b", Ja: "c", wb: "d" };
			function eI() {
				q.call(this, "d");
			}
			function eT() {
				q.call(this, "c");
			}
			E(eI, q), E(eT, q);
			var eS = {},
				eC = null;
			function eA() {
				return (eC = eC || new el());
			}
			function ek(e) {
				q.call(this, eS.La, e);
			}
			function eR(e) {
				const t = eA();
				eu(t, new ek(t));
			}
			function eN(e, t) {
				q.call(this, eS.STAT_EVENT, e), (this.stat = t);
			}
			function eD(e) {
				const t = eA();
				eu(t, new eN(t, e));
			}
			function eO(e, t) {
				q.call(this, eS.Ma, e), (this.size = t);
			}
			function eP(e, t) {
				if ("function" != typeof e)
					throw Error("Fn must not be null and must be a function");
				return a.setTimeout(() => {
					e();
				}, t);
			}
			function ex() {
				this.g = !0;
			}
			function eL(e, t, r, n) {
				e.info(
					() =>
						"XMLHTTP TEXT (" +
						t +
						"): " +
						((e, t) => {
							if (!e.g) return t;
							if (!t) return null;
							try {
								var r = JSON.parse(t);
								if (r) {
									for (e = 0; e < r.length; e++)
										if (Array.isArray(r[e])) {
											var n = r[e];
											if (!(2 > n.length)) {
												var i = n[1];
												if (Array.isArray(i) && !(1 > i.length)) {
													var s = i[0];
													if ("noop" != s && "stop" != s && "close" != s)
														for (var a = 1; a < i.length; a++) i[a] = "";
												}
											}
										}
								}
								return em(r);
							} catch (e) {
								return t;
							}
						})(e, r) +
						(n ? " " + n : ""),
				);
			}
			(eS.La = "serverreachability"),
				E(ek, q),
				(eS.STAT_EVENT = "statevent"),
				E(eN, q),
				(eS.Ma = "timingevent"),
				E(eO, q),
				(ex.prototype.xa = function () {
					this.g = !1;
				}),
				(ex.prototype.info = () => {});
			var eM = {
					NO_ERROR: 0,
					gb: 1,
					tb: 2,
					sb: 3,
					nb: 4,
					rb: 5,
					ub: 6,
					Ia: 7,
					TIMEOUT: 8,
					xb: 9,
				},
				eU = {
					lb: "complete",
					Hb: "success",
					Ja: "error",
					Ia: "abort",
					zb: "ready",
					Ab: "readystatechange",
					TIMEOUT: "timeout",
					vb: "incrementaldata",
					yb: "progress",
					ob: "downloadprogress",
					Pb: "uploadprogress",
				};
			function eV() {}
			function eF(e, t, r, n) {
				(this.j = e),
					(this.i = t),
					(this.l = r),
					(this.R = n || 1),
					(this.U = new ef(this)),
					(this.I = 45e3),
					(this.H = null),
					(this.o = !1),
					(this.m = this.A = this.v = this.L = this.F = this.S = this.B = null),
					(this.D = []),
					(this.g = null),
					(this.C = 0),
					(this.s = this.u = null),
					(this.X = -1),
					(this.J = !1),
					(this.O = 0),
					(this.M = null),
					(this.W = this.K = this.T = this.P = !1),
					(this.h = new ej());
			}
			function ej() {
				(this.i = null), (this.g = ""), (this.h = !1);
			}
			E(eV, ew),
				(eV.prototype.g = () => new XMLHttpRequest()),
				(eV.prototype.i = () => ({})),
				(t = new eV());
			var eB = {},
				eq = {};
			function e$(e, t, r) {
				(e.L = 1), (e.v = ti(e9(t))), (e.m = r), (e.P = !0), ez(e, null);
			}
			function ez(e, t) {
				(e.F = Date.now()), eG(e), (e.A = e9(e.v));
				var r,
					n,
					i,
					s,
					a,
					o,
					l = e.A,
					u = e.R;
				Array.isArray(u) || (u = [String(u)]),
					ty(l.i, "t", u),
					(e.C = 0),
					(l = e.j.J),
					(e.h = new ej()),
					(e.g = t6(e.j, l ? t : null, !e.m)),
					0 < e.O && (e.M = new ed(w(e.Y, e, e.g), e.O)),
					(t = e.U),
					(l = e.g),
					(u = e.ca);
				var h = "readystatechange";
				Array.isArray(h) || (h && (ep[0] = h.toString()), (h = ep));
				for (var c = 0; c < h.length; c++) {
					var d = (function e(t, r, n, i, s) {
						if (i && i.once)
							return (function e(t, r, n, i, s) {
								if (Array.isArray(r)) {
									for (var a = 0; a < r.length; a++) e(t, r[a], n, i, s);
									return null;
								}
								return (
									(n = eo(n)),
									t && t[G]
										? t.L(r, n, m(i) ? !!i.capture : !!i, s)
										: et(t, r, n, !0, i, s)
								);
							})(t, r, n, i, s);
						if (Array.isArray(r)) {
							for (var a = 0; a < r.length; a++) e(t, r[a], n, i, s);
							return null;
						}
						return (
							(n = eo(n)),
							t && t[G]
								? t.K(r, n, m(i) ? !!i.capture : !!i, s)
								: et(t, r, n, !1, i, s)
						);
					})(l, h[c], u || t.handleEvent, !1, t.h || t);
					if (!d) break;
					t.g[d.key] = d;
				}
				(t = e.H ? D(e.H) : {}),
					e.m
						? (e.u || (e.u = "POST"),
							(t["Content-Type"] = "application/x-www-form-urlencoded"),
							e.g.ea(e.A, e.u, e.m, t))
						: ((e.u = "GET"), e.g.ea(e.A, e.u, null, t)),
					eR(),
					(r = e.i),
					(n = e.u),
					(i = e.A),
					(s = e.l),
					(a = e.R),
					(o = e.m),
					r.info(() => {
						if (r.g)
							if (o)
								for (var e = "", t = o.split("&"), l = 0; l < t.length; l++) {
									var u = t[l].split("=");
									if (1 < u.length) {
										var h = u[0];
										u = u[1];
										var c = h.split("_");
										e =
											2 <= c.length && "type" == c[1]
												? e + (h + "=") + u + "&"
												: e + (h + "=redacted&");
									}
								}
							else e = null;
						else e = o;
						return (
							"XMLHTTP REQ (" +
							s +
							") [attempt " +
							a +
							"]: " +
							n +
							"\n" +
							i +
							"\n" +
							e
						);
					});
			}
			function eH(e) {
				return !!e.g && "GET" == e.u && 2 != e.L && e.j.Ca;
			}
			function eG(e) {
				(e.S = Date.now() + e.I), eK(e, e.I);
			}
			function eK(e, t) {
				if (null != e.B) throw Error("WatchDog timer not null");
				e.B = eP(w(e.ba, e), t);
			}
			function eW(e) {
				e.B && (a.clearTimeout(e.B), (e.B = null));
			}
			function eQ(e) {
				0 == e.j.G || e.J || tY(e.j, e);
			}
			function eJ(e) {
				eW(e);
				var t = e.M;
				t && "function" == typeof t.ma && t.ma(),
					(e.M = null),
					eg(e.U),
					e.g && ((t = e.g), (e.g = null), t.abort(), t.ma());
			}
			function eX(e, t) {
				try {
					var r = e.j;
					if (0 != r.G && (r.g == e || e2(r.h, e))) {
						if (!e.K && e2(r.h, e) && 3 == r.G) {
							try {
								var n = r.Da.g.parse(t);
							} catch (e) {
								n = null;
							}
							if (Array.isArray(n) && 3 == n.length) {
								var i = n;
								if (0 == i[0]) {
									e: if (!r.u) {
										if (r.g)
											if (r.g.F + 3e3 < e.F) tX(r), tB(r);
											else break e;
										tW(r), eD(18);
									}
								} else
									(r.za = i[1]),
										0 < r.za - r.T &&
											37500 > i[2] &&
											r.F &&
											0 == r.v &&
											!r.C &&
											(r.C = eP(w(r.Za, r), 6e3));
								if (1 >= e1(r.h) && r.ca) {
									try {
										r.ca();
									} catch (e) {}
									r.ca = void 0;
								}
							} else t0(r, 11);
						} else if (((e.K || r.g == e) && tX(r), !T(t)))
							for (i = r.Da.g.parse(t), t = 0; t < i.length; t++) {
								let o = i[t];
								if (((r.T = o[0]), (o = o[1]), 2 == r.G))
									if ("c" == o[0]) {
										(r.K = o[1]), (r.ia = o[2]);
										const t = o[3];
										null != t && ((r.la = t), r.j.info("VER=" + r.la));
										const i = o[4];
										null != i && ((r.Aa = i), r.j.info("SVER=" + r.Aa));
										const l = o[5];
										null != l &&
											"number" == typeof l &&
											0 < l &&
											((r.L = n = 1.5 * l),
											r.j.info("backChannelRequestTimeoutMs_=" + n)),
											(n = r);
										const u = e.g;
										if (u) {
											const e = u.g
												? u.g.getResponseHeader("X-Client-Wire-Protocol")
												: null;
											if (e) {
												var s = n.h;
												s.g ||
													(-1 == e.indexOf("spdy") &&
														-1 == e.indexOf("quic") &&
														-1 == e.indexOf("h2")) ||
													((s.j = s.l),
													(s.g = new Set()),
													s.h && (e6(s, s.h), (s.h = null)));
											}
											if (n.D) {
												const e = u.g
													? u.g.getResponseHeader("X-HTTP-Session-Id")
													: null;
												e && ((n.ya = e), tn(n.I, n.D, e));
											}
										}
										if (
											((r.G = 3),
											r.l && r.l.ua(),
											r.ba &&
												((r.R = Date.now() - e.F),
												r.j.info("Handshake RTT: " + r.R + "ms")),
											((n = r).qa = t2(n, n.J ? n.ia : null, n.W)),
											e.K)
										) {
											e3(n.h, e);
											var a = n.L;
											a && (e.I = a), e.B && (eW(e), eG(e)), (n.g = e);
										} else tK(n);
										0 < r.i.length && t$(r);
									} else ("stop" != o[0] && "close" != o[0]) || t0(r, 7);
								else
									3 == r.G &&
										("stop" == o[0] || "close" == o[0]
											? "stop" == o[0]
												? t0(r, 7)
												: tj(r)
											: "noop" != o[0] && r.l && r.l.ta(o),
										(r.v = 0));
							}
					}
					eR(4);
				} catch (e) {}
			}
			(eF.prototype.ca = function (e) {
				e = e.target;
				const t = this.M;
				t && 3 == tM(e) ? t.j() : this.Y(e);
			}),
				(eF.prototype.Y = function (e) {
					try {
						if (e == this.g)
							e: {
								const v = tM(this.g);
								var t = this.g.Ba();
								const w = this.g.Z();
								if (
									!(3 > v) &&
									(3 != v ||
										(this.g && (this.h.h || this.g.oa() || tU(this.g))))
								) {
									this.J ||
										4 != v ||
										7 == t ||
										(8 == t || 0 >= w ? eR(3) : eR(2)),
										eW(this);
									var r = this.g.Z();
									this.X = r;
									t: if (eH(this)) {
										var n = tU(this.g);
										e = "";
										var i = n.length,
											s = 4 == tM(this.g);
										if (!this.h.i) {
											if ("u" < typeof TextDecoder) {
												eJ(this), eQ(this);
												var o = "";
												break t;
											}
											this.h.i = new a.TextDecoder();
										}
										for (t = 0; t < i; t++)
											(this.h.h = !0),
												(e += this.h.i.decode(n[t], {
													stream: !(s && t == i - 1),
												}));
										(n.length = 0),
											(this.h.g += e),
											(this.C = 0),
											(o = this.h.g);
									} else o = this.g.oa();
									if (
										((this.o = 200 == r),
										(l = this.i),
										(u = this.u),
										(h = this.A),
										(c = this.l),
										(d = this.R),
										(f = r),
										l.info(
											() =>
												"XMLHTTP RESP (" +
												c +
												") [ attempt " +
												d +
												"]: " +
												u +
												"\n" +
												h +
												"\n" +
												v +
												" " +
												f,
										),
										this.o)
									) {
										if (this.T && !this.K) {
											t: {
												if (this.g) {
													var l,
														u,
														h,
														c,
														d,
														f,
														p,
														g = this.g;
													if (
														(p = g.g
															? g.g.getResponseHeader("X-HTTP-Initial-Response")
															: null) &&
														!T(p)
													) {
														var m = p;
														break t;
													}
												}
												m = null;
											}
											if ((r = m))
												eL(
													this.i,
													this.l,
													r,
													"Initial handshake response via X-HTTP-Initial-Response",
												),
													(this.K = !0),
													eX(this, r);
											else {
												(this.o = !1), (this.s = 3), eD(12), eJ(this), eQ(this);
												break e;
											}
										}
										if (this.P) {
											let e;
											for (r = !0; !this.J && this.C < o.length; )
												if (
													(e = ((e, t) => {
														var r = e.C,
															n = t.indexOf("\n", r);
														return -1 == n
															? eq
															: isNaN((r = Number(t.substring(r, n))))
																? eB
																: (n += 1) + r > t.length
																	? eq
																	: ((t = t.slice(n, n + r)), (e.C = n + r), t);
													})(this, o)) == eq
												) {
													4 == v && ((this.s = 4), eD(14), (r = !1)),
														eL(this.i, this.l, null, "[Incomplete Response]");
													break;
												} else if (e == eB) {
													(this.s = 4),
														eD(15),
														eL(this.i, this.l, o, "[Invalid Chunk]"),
														(r = !1);
													break;
												} else eL(this.i, this.l, e, null), eX(this, e);
											if (
												(eH(this) &&
													0 != this.C &&
													((this.h.g = this.h.g.slice(this.C)), (this.C = 0)),
												4 != v ||
													0 != o.length ||
													this.h.h ||
													((this.s = 1), eD(16), (r = !1)),
												(this.o = this.o && r),
												r)
											) {
												if (0 < o.length && !this.W) {
													this.W = !0;
													var y = this.j;
													y.g == this &&
														y.ba &&
														!y.M &&
														(y.j.info(
															"Great, no buffering proxy detected. Bytes received: " +
																o.length,
														),
														tQ(y),
														(y.M = !0),
														eD(11));
												}
											} else
												eL(this.i, this.l, o, "[Invalid Chunked Response]"),
													eJ(this),
													eQ(this);
										} else eL(this.i, this.l, o, null), eX(this, o);
										4 == v && eJ(this),
											this.o &&
												!this.J &&
												(4 == v ? tY(this.j, this) : ((this.o = !1), eG(this)));
									} else
										((e) => {
											const t = {};
											e = (
												(e.g && 2 <= tM(e) && e.g.getAllResponseHeaders()) ||
												""
											).split("\r\n");
											for (let n = 0; n < e.length; n++) {
												if (T(e[n])) continue;
												var r = ((e) => {
													var t = 1;
													e = e.split(":");
													const r = [];
													for (; 0 < t && e.length; ) r.push(e.shift()), t--;
													return e.length && r.push(e.join(":")), r;
												})(e[n]);
												const i = r[0];
												if ("string" != typeof (r = r[1])) continue;
												r = r.trim();
												const s = t[i] || [];
												(t[i] = s), s.push(r);
											}
											var n = (e) => e.join(", ");
											for (const e in t) n.call(void 0, t[e], e, t);
										})(this.g),
											400 == r && 0 < o.indexOf("Unknown SID")
												? ((this.s = 3), eD(12))
												: ((this.s = 0), eD(13)),
											eJ(this),
											eQ(this);
								}
							}
					} catch (e) {
					} finally {
					}
				}),
				(eF.prototype.cancel = function () {
					(this.J = !0), eJ(this);
				}),
				(eF.prototype.ba = function () {
					var e, t;
					this.B = null;
					const r = Date.now();
					0 <= r - this.S
						? ((e = this.i),
							(t = this.A),
							e.info(() => "TIMEOUT: " + t),
							2 != this.L && (eR(), eD(17)),
							eJ(this),
							(this.s = 2),
							eQ(this))
						: eK(this, this.S - r);
				});
			var eY = class {
				constructor(e, t) {
					(this.g = e), (this.map = t);
				}
			};
			function eZ(e) {
				(this.l = e || 10),
					(e = a.PerformanceNavigationTiming
						? 0 < (e = a.performance.getEntriesByType("navigation")).length &&
							("hq" == e[0].nextHopProtocol || "h2" == e[0].nextHopProtocol)
						: !!(
								a.chrome &&
								a.chrome.loadTimes &&
								a.chrome.loadTimes() &&
								a.chrome.loadTimes().wasFetchedViaSpdy
							)),
					(this.j = e ? this.l : 1),
					(this.g = null),
					1 < this.j && (this.g = new Set()),
					(this.h = null),
					(this.i = []);
			}
			function e0(e) {
				return !!e.h || (!!e.g && e.g.size >= e.j);
			}
			function e1(e) {
				return e.h ? 1 : e.g ? e.g.size : 0;
			}
			function e2(e, t) {
				return e.h ? e.h == t : !!e.g && e.g.has(t);
			}
			function e6(e, t) {
				e.g ? e.g.add(t) : (e.h = t);
			}
			function e3(e, t) {
				e.h && e.h == t ? (e.h = null) : e.g && e.g.has(t) && e.g.delete(t);
			}
			function e5(e) {
				if (null != e.h) return e.i.concat(e.h.D);
				if (null != e.g && 0 !== e.g.size) {
					let t = e.i;
					for (const r of e.g.values()) t = t.concat(r.D);
					return t;
				}
				return b(e.i);
			}
			function e4(e, t) {
				if (e.forEach && "function" == typeof e.forEach) e.forEach(t, void 0);
				else if (g(e) || "string" == typeof e)
					Array.prototype.forEach.call(e, t, void 0);
				else
					for (
						var r = ((e) => {
								if (e.na && "function" == typeof e.na) return e.na();
								if (!e.V || "function" != typeof e.V) {
									if ("u" > typeof Map && e instanceof Map)
										return Array.from(e.keys());
									if (!("u" > typeof Set && e instanceof Set)) {
										if (g(e) || "string" == typeof e) {
											var t = [];
											e = e.length;
											for (var r = 0; r < e; r++) t.push(r);
											return t;
										}
										for (const n in ((t = []), (r = 0), e)) t[r++] = n;
										return t;
									}
								}
							})(e),
							n = ((e) => {
								if (e.V && "function" == typeof e.V) return e.V();
								if (
									("u" > typeof Map && e instanceof Map) ||
									("u" > typeof Set && e instanceof Set)
								)
									return Array.from(e.values());
								if ("string" == typeof e) return e.split("");
								if (g(e)) {
									for (var t = [], r = e.length, n = 0; n < r; n++)
										t.push(e[n]);
									return t;
								}
								for (n in ((t = []), (r = 0), e)) t[r++] = e[n];
								return t;
							})(e),
							i = n.length,
							s = 0;
						s < i;
						s++
					)
						t.call(void 0, n[s], r && r[s], e);
			}
			eZ.prototype.cancel = function () {
				if (((this.i = e5(this)), this.h)) this.h.cancel(), (this.h = null);
				else if (this.g && 0 !== this.g.size) {
					for (const e of this.g.values()) e.cancel();
					this.g.clear();
				}
			};
			var e8 =
				/^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;
			function e7(e) {
				if (
					((this.g = this.o = this.j = ""),
					(this.s = null),
					(this.m = this.l = ""),
					(this.h = !1),
					e instanceof e7)
				) {
					(this.h = e.h),
						te(this, e.j),
						(this.o = e.o),
						(this.g = e.g),
						tt(this, e.s),
						(this.l = e.l);
					var t = e.i,
						r = new tf();
					(r.i = t.i),
						t.g && ((r.g = new Map(t.g)), (r.h = t.h)),
						tr(this, r),
						(this.m = e.m);
				} else
					e && (t = String(e).match(e8))
						? ((this.h = !1),
							te(this, t[1] || "", !0),
							(this.o = ts(t[2] || "")),
							(this.g = ts(t[3] || "", !0)),
							tt(this, t[4]),
							(this.l = ts(t[5] || "", !0)),
							tr(this, t[6] || "", !0),
							(this.m = ts(t[7] || "")))
						: ((this.h = !1), (this.i = new tf(null, this.h)));
			}
			function e9(e) {
				return new e7(e);
			}
			function te(e, t, r) {
				(e.j = r ? ts(t, !0) : t), e.j && (e.j = e.j.replace(/:$/, ""));
			}
			function tt(e, t) {
				if (t) {
					if (isNaN((t = Number(t))) || 0 > t)
						throw Error("Bad port number " + t);
					e.s = t;
				} else e.s = null;
			}
			function tr(e, t, r) {
				var n, i;
				t instanceof tf
					? ((e.i = t),
						(n = e.i),
						(i = e.h) &&
							!n.j &&
							(tp(n),
							(n.i = null),
							n.g.forEach(function (e, t) {
								var r = t.toLowerCase();
								t != r && (tg(this, t), ty(this, r, e));
							}, n)),
						(n.j = i))
					: (r || (t = ta(t, tc)), (e.i = new tf(t, e.h)));
			}
			function tn(e, t, r) {
				e.i.set(t, r);
			}
			function ti(e) {
				return (
					tn(
						e,
						"zx",
						Math.floor(0x80000000 * Math.random()).toString(36) +
							Math.abs(
								Math.floor(0x80000000 * Math.random()) ^ Date.now(),
							).toString(36),
					),
					e
				);
			}
			function ts(e, t) {
				return e
					? t
						? decodeURI(e.replace(/%25/g, "%2525"))
						: decodeURIComponent(e)
					: "";
			}
			function ta(e, t, r) {
				return "string" == typeof e
					? ((e = encodeURI(e).replace(t, to)),
						r && (e = e.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
						e)
					: null;
			}
			function to(e) {
				return (
					"%" +
					(((e = e.charCodeAt(0)) >> 4) & 15).toString(16) +
					(15 & e).toString(16)
				);
			}
			e7.prototype.toString = function () {
				var e = [],
					t = this.j;
				t && e.push(ta(t, tl, !0), ":");
				var r = this.g;
				return (
					(r || "file" == t) &&
						(e.push("//"),
						(t = this.o) && e.push(ta(t, tl, !0), "@"),
						e.push(
							encodeURIComponent(String(r)).replace(
								/%25([0-9a-fA-F]{2})/g,
								"%$1",
							),
						),
						null != (r = this.s) && e.push(":", String(r))),
					(r = this.l) &&
						(this.g && "/" != r.charAt(0) && e.push("/"),
						e.push(ta(r, "/" == r.charAt(0) ? th : tu, !0))),
					(r = this.i.toString()) && e.push("?", r),
					(r = this.m) && e.push("#", ta(r, td)),
					e.join("")
				);
			};
			var tl = /[#/?@]/g,
				tu = /[#?:]/g,
				th = /[#?]/g,
				tc = /[#?@]/g,
				td = /#/g;
			function tf(e, t) {
				(this.h = this.g = null), (this.i = e || null), (this.j = !!t);
			}
			function tp(e) {
				e.g ||
					((e.g = new Map()),
					(e.h = 0),
					e.i &&
						((e, t) => {
							if (e) {
								e = e.split("&");
								for (var r = 0; r < e.length; r++) {
									var n = e[r].indexOf("="),
										i = null;
									if (0 <= n) {
										var s = e[r].substring(0, n);
										i = e[r].substring(n + 1);
									} else s = e[r];
									t(s, i ? decodeURIComponent(i.replace(/\+/g, " ")) : "");
								}
							}
						})(e.i, (t, r) => {
							e.add(decodeURIComponent(t.replace(/\+/g, " ")), r);
						}));
			}
			function tg(e, t) {
				tp(e),
					(t = tv(e, t)),
					e.g.has(t) &&
						((e.i = null), (e.h -= e.g.get(t).length), e.g.delete(t));
			}
			function tm(e, t) {
				return tp(e), (t = tv(e, t)), e.g.has(t);
			}
			function ty(e, t, r) {
				tg(e, t),
					0 < r.length &&
						((e.i = null), e.g.set(tv(e, t), b(r)), (e.h += r.length));
			}
			function tv(e, t) {
				return (t = String(t)), e.j && (t = t.toLowerCase()), t;
			}
			function tw(e, t, r, n, i) {
				try {
					i &&
						((i.onload = null),
						(i.onerror = null),
						(i.onabort = null),
						(i.ontimeout = null)),
						n(r);
				} catch (e) {}
			}
			function t_() {
				this.g = new ev();
			}
			function tE(e) {
				(this.l = e.Ub || null), (this.j = e.eb || !1);
			}
			function tb(e, t) {
				el.call(this),
					(this.D = e),
					(this.o = t),
					(this.m = void 0),
					(this.status = this.readyState = 0),
					(this.responseType =
						this.responseText =
						this.response =
						this.statusText =
							""),
					(this.onreadystatechange = null),
					(this.u = new Headers()),
					(this.h = null),
					(this.B = "GET"),
					(this.A = ""),
					(this.g = !1),
					(this.v = this.j = this.l = null);
			}
			function tI(e) {
				e.j.read().then(e.Pa.bind(e)).catch(e.ga.bind(e));
			}
			function tT(e) {
				(e.readyState = 4), (e.l = null), (e.j = null), (e.v = null), tS(e);
			}
			function tS(e) {
				e.onreadystatechange && e.onreadystatechange.call(e);
			}
			function tC(e) {
				let t = "";
				return (
					N(e, (e, r) => {
						(t += r), (t += ":"), (t += e), (t += "\r\n");
					}),
					t
				);
			}
			function tA(e, t, r) {
				e: {
					for (n in r) {
						var n = !1;
						break e;
					}
					n = !0;
				}
				n ||
					((r = tC(r)),
					"string" == typeof e
						? null != r && encodeURIComponent(String(r))
						: tn(e, t, r));
			}
			function tk(e) {
				el.call(this),
					(this.headers = new Map()),
					(this.o = e || null),
					(this.h = !1),
					(this.v = this.g = null),
					(this.D = ""),
					(this.m = 0),
					(this.l = ""),
					(this.j = this.B = this.u = this.A = !1),
					(this.I = null),
					(this.H = ""),
					(this.J = !1);
			}
			((r = tf.prototype).add = function (e, t) {
				tp(this), (this.i = null), (e = tv(this, e));
				var r = this.g.get(e);
				return r || this.g.set(e, (r = [])), r.push(t), (this.h += 1), this;
			}),
				(r.forEach = function (e, t) {
					tp(this),
						this.g.forEach(function (r, n) {
							r.forEach(function (r) {
								e.call(t, r, n, this);
							}, this);
						}, this);
				}),
				(r.na = function () {
					tp(this);
					const e = Array.from(this.g.values()),
						t = Array.from(this.g.keys()),
						r = [];
					for (let n = 0; n < t.length; n++) {
						const i = e[n];
						for (let e = 0; e < i.length; e++) r.push(t[n]);
					}
					return r;
				}),
				(r.V = function (e) {
					tp(this);
					let t = [];
					if ("string" == typeof e)
						tm(this, e) && (t = t.concat(this.g.get(tv(this, e))));
					else {
						e = Array.from(this.g.values());
						for (let r = 0; r < e.length; r++) t = t.concat(e[r]);
					}
					return t;
				}),
				(r.set = function (e, t) {
					return (
						tp(this),
						(this.i = null),
						tm(this, (e = tv(this, e))) && (this.h -= this.g.get(e).length),
						this.g.set(e, [t]),
						(this.h += 1),
						this
					);
				}),
				(r.get = function (e, t) {
					return e && 0 < (e = this.V(e)).length ? String(e[0]) : t;
				}),
				(r.toString = function () {
					if (this.i) return this.i;
					if (!this.g) return "";
					const e = [],
						t = Array.from(this.g.keys());
					for (var r = 0; r < t.length; r++) {
						var n = t[r];
						const s = encodeURIComponent(String(n)),
							a = this.V(n);
						for (n = 0; n < a.length; n++) {
							var i = s;
							"" !== a[n] && (i += "=" + encodeURIComponent(String(a[n]))),
								e.push(i);
						}
					}
					return (this.i = e.join("&"));
				}),
				E(tE, ew),
				(tE.prototype.g = function () {
					return new tb(this.l, this.j);
				}),
				(tE.prototype.i = ((e = {}), () => e)),
				E(tb, el),
				((r = tb.prototype).open = function (e, t) {
					if (0 != this.readyState)
						throw (this.abort(), Error("Error reopening a connection"));
					(this.B = e), (this.A = t), (this.readyState = 1), tS(this);
				}),
				(r.send = function (e) {
					if (1 != this.readyState)
						throw (this.abort(), Error("need to call open() first. "));
					this.g = !0;
					const t = {
						headers: this.u,
						method: this.B,
						credentials: this.m,
						cache: void 0,
					};
					e && (t.body = e),
						(this.D || a)
							.fetch(new Request(this.A, t))
							.then(this.Sa.bind(this), this.ga.bind(this));
				}),
				(r.abort = function () {
					(this.response = this.responseText = ""),
						(this.u = new Headers()),
						(this.status = 0),
						this.j && this.j.cancel("Request was aborted.").catch(() => {}),
						1 <= this.readyState &&
							this.g &&
							4 != this.readyState &&
							((this.g = !1), tT(this)),
						(this.readyState = 0);
				}),
				(r.Sa = function (e) {
					if (
						this.g &&
						((this.l = e),
						this.h ||
							((this.status = this.l.status),
							(this.statusText = this.l.statusText),
							(this.h = e.headers),
							(this.readyState = 2),
							tS(this)),
						this.g && ((this.readyState = 3), tS(this), this.g))
					)
						if ("arraybuffer" === this.responseType)
							e.arrayBuffer().then(this.Qa.bind(this), this.ga.bind(this));
						else if (void 0 !== a.ReadableStream && "body" in e) {
							if (((this.j = e.body.getReader()), this.o)) {
								if (this.responseType)
									throw Error(
										'responseType must be empty for "streamBinaryChunks" mode responses.',
									);
								this.response = [];
							} else
								(this.response = this.responseText = ""),
									(this.v = new TextDecoder());
							tI(this);
						} else e.text().then(this.Ra.bind(this), this.ga.bind(this));
				}),
				(r.Pa = function (e) {
					if (this.g) {
						if (this.o && e.value) this.response.push(e.value);
						else if (!this.o) {
							var t = e.value ? e.value : new Uint8Array(0);
							(t = this.v.decode(t, { stream: !e.done })) &&
								(this.response = this.responseText += t);
						}
						e.done ? tT(this) : tS(this), 3 == this.readyState && tI(this);
					}
				}),
				(r.Ra = function (e) {
					this.g && ((this.response = this.responseText = e), tT(this));
				}),
				(r.Qa = function (e) {
					this.g && ((this.response = e), tT(this));
				}),
				(r.ga = function () {
					this.g && tT(this);
				}),
				(r.setRequestHeader = function (e, t) {
					this.u.append(e, t);
				}),
				(r.getResponseHeader = function (e) {
					return (this.h && this.h.get(e.toLowerCase())) || "";
				}),
				(r.getAllResponseHeaders = function () {
					if (!this.h) return "";
					const e = [],
						t = this.h.entries();
					for (var r = t.next(); !r.done; )
						e.push((r = r.value)[0] + ": " + r[1]), (r = t.next());
					return e.join("\r\n");
				}),
				Object.defineProperty(tb.prototype, "withCredentials", {
					get: function () {
						return "include" === this.m;
					},
					set: function (e) {
						this.m = e ? "include" : "same-origin";
					},
				}),
				E(tk, el);
			var tR = /^https?$/i,
				tN = ["POST", "PUT"];
			function tD(e, t) {
				(e.h = !1),
					e.g && ((e.j = !0), e.g.abort(), (e.j = !1)),
					(e.l = t),
					(e.m = 5),
					tO(e),
					tx(e);
			}
			function tO(e) {
				e.A || ((e.A = !0), eu(e, "complete"), eu(e, "error"));
			}
			function tP(e) {
				if (e.h && void 0 !== s && (!e.v[1] || 4 != tM(e) || 2 != e.Z())) {
					if (e.u && 4 == tM(e)) ec(e.Ea, 0, e);
					else if ((eu(e, "readystatechange"), 4 == tM(e))) {
						e.h = !1;
						try {
							const s = e.Z();
							switch (s) {
								case 200:
								case 201:
								case 202:
								case 204:
								case 206:
								case 304:
								case 1223: {
									var t,
										r,
										n = !0;
									break;
								}
								default:
									n = !1;
							}
							if (!(t = n)) {
								if ((r = 0 === s)) {
									var i = String(e.D).match(e8)[1] || null;
									!i &&
										a.self &&
										a.self.location &&
										(i = a.self.location.protocol.slice(0, -1)),
										(r = !tR.test(i ? i.toLowerCase() : ""));
								}
								t = r;
							}
							if (t) eu(e, "complete"), eu(e, "success");
							else {
								e.m = 6;
								try {
									var o = 2 < tM(e) ? e.g.statusText : "";
								} catch (e) {
									o = "";
								}
								(e.l = o + " [" + e.Z() + "]"), tO(e);
							}
						} finally {
							tx(e);
						}
					}
				}
			}
			function tx(e, t) {
				if (e.g) {
					tL(e);
					const r = e.g,
						n = e.v[0] ? () => {} : null;
					(e.g = null), (e.v = null), t || eu(e, "ready");
					try {
						r.onreadystatechange = n;
					} catch (e) {}
				}
			}
			function tL(e) {
				e.I && (a.clearTimeout(e.I), (e.I = null));
			}
			function tM(e) {
				return e.g ? e.g.readyState : 0;
			}
			function tU(e) {
				try {
					if (!e.g) return null;
					if ("response" in e.g) return e.g.response;
					switch (e.H) {
						case "":
						case "text":
							return e.g.responseText;
						case "arraybuffer":
							if ("mozResponseArrayBuffer" in e.g)
								return e.g.mozResponseArrayBuffer;
					}
					return null;
				} catch (e) {
					return null;
				}
			}
			function tV(e, t, r) {
				return (
					(r && r.internalChannelParams && r.internalChannelParams[e]) || t
				);
			}
			function tF(e) {
				(this.Aa = 0),
					(this.i = []),
					(this.j = new ex()),
					(this.ia =
						this.qa =
						this.I =
						this.W =
						this.g =
						this.ya =
						this.D =
						this.H =
						this.m =
						this.S =
						this.o =
							null),
					(this.Ya = this.U = 0),
					(this.Va = tV("failFast", !1, e)),
					(this.F = this.C = this.u = this.s = this.l = null),
					(this.X = !0),
					(this.za = this.T = -1),
					(this.Y = this.v = this.B = 0),
					(this.Ta = tV("baseRetryDelayMs", 5e3, e)),
					(this.cb = tV("retryDelaySeedMs", 1e4, e)),
					(this.Wa = tV("forwardChannelMaxRetries", 2, e)),
					(this.wa = tV("forwardChannelRequestTimeoutMs", 2e4, e)),
					(this.pa = (e && e.xmlHttpFactory) || void 0),
					(this.Xa = (e && e.Tb) || void 0),
					(this.Ca = (e && e.useFetchStreams) || !1),
					(this.L = void 0),
					(this.J = (e && e.supportsCrossDomainXhr) || !1),
					(this.K = ""),
					(this.h = new eZ(e && e.concurrentRequestLimit)),
					(this.Da = new t_()),
					(this.P = (e && e.fastHandshake) || !1),
					(this.O = (e && e.encodeInitMessageHeaders) || !1),
					this.P && this.O && (this.O = !1),
					(this.Ua = (e && e.Rb) || !1),
					e && e.xa && this.j.xa(),
					e && e.forceLongPolling && (this.X = !1),
					(this.ba = (!this.P && this.X && e && e.detectBufferingProxy) || !1),
					(this.ja = void 0),
					e &&
						e.longPollingTimeout &&
						0 < e.longPollingTimeout &&
						(this.ja = e.longPollingTimeout),
					(this.ca = void 0),
					(this.R = 0),
					(this.M = !1),
					(this.ka = this.A = null);
			}
			function tj(e) {
				if ((tq(e), 3 == e.G)) {
					var t = e.U++,
						r = e9(e.I);
					if (
						(tn(r, "SID", e.K),
						tn(r, "RID", t),
						tn(r, "TYPE", "terminate"),
						tH(e, r),
						((t = new eF(e, e.j, t)).L = 2),
						(t.v = ti(e9(r))),
						(r = !1),
						a.navigator && a.navigator.sendBeacon)
					)
						try {
							r = a.navigator.sendBeacon(t.v.toString(), "");
						} catch (e) {}
					!r && a.Image && ((new Image().src = t.v), (r = !0)),
						r || ((t.g = t6(t.j, null)), t.g.ea(t.v)),
						(t.F = Date.now()),
						eG(t);
				}
				t1(e);
			}
			function tB(e) {
				e.g && (tQ(e), e.g.cancel(), (e.g = null));
			}
			function tq(e) {
				tB(e),
					e.u && (a.clearTimeout(e.u), (e.u = null)),
					tX(e),
					e.h.cancel(),
					e.s && ("number" == typeof e.s && a.clearTimeout(e.s), (e.s = null));
			}
			function t$(e) {
				if (!e0(e.h) && !e.s) {
					e.s = !0;
					var t = e.Ga;
					M || F(), U || (M(), (U = !0)), V.add(t, e), (e.B = 0);
				}
			}
			function tz(e, t) {
				var r;
				r = t ? t.l : e.U++;
				const n = e9(e.I);
				tn(n, "SID", e.K),
					tn(n, "RID", r),
					tn(n, "AID", e.T),
					tH(e, n),
					e.m && e.o && tA(n, e.m, e.o),
					(r = new eF(e, e.j, r, e.B + 1)),
					null === e.m && (r.H = e.o),
					t && (e.i = t.D.concat(e.i)),
					(t = tG(e, r, 1e3)),
					(r.I =
						Math.round(0.5 * e.wa) + Math.round(0.5 * e.wa * Math.random())),
					e6(e.h, r),
					e$(r, n, t);
			}
			function tH(e, t) {
				e.H &&
					N(e.H, (e, r) => {
						tn(t, r, e);
					}),
					e.l &&
						e4({}, (e, r) => {
							tn(t, r, e);
						});
			}
			function tG(e, t, r) {
				r = Math.min(e.i.length, r);
				var n = e.l ? w(e.l.Na, e.l, e) : null;
				e: {
					var i = e.i;
					let t = -1;
					for (;;) {
						const e = ["count=" + r];
						-1 == t
							? 0 < r
								? ((t = i[0].g), e.push("ofs=" + t))
								: (t = 0)
							: e.push("ofs=" + t);
						let s = !0;
						for (let a = 0; a < r; a++) {
							let r = i[a].g,
								o = i[a].map;
							if (0 > (r -= t)) (t = Math.max(0, i[a].g - 100)), (s = !1);
							else
								try {
									!((e, t, r) => {
										const n = r || "";
										try {
											e4(e, (e, r) => {
												let i = e;
												m(e) && (i = em(e)),
													t.push(n + r + "=" + encodeURIComponent(i));
											});
										} catch (e) {
											throw (
												(t.push(n + "type=" + encodeURIComponent("_badmap")), e)
											);
										}
									})(o, e, "req" + r + "_");
								} catch (e) {
									n && n(o);
								}
						}
						if (s) {
							n = e.join("&");
							break e;
						}
					}
				}
				return (t.D = e = e.i.splice(0, r)), n;
			}
			function tK(e) {
				if (!e.g && !e.u) {
					e.Y = 1;
					var t = e.Fa;
					M || F(), U || (M(), (U = !0)), V.add(t, e), (e.v = 0);
				}
			}
			function tW(e) {
				return (
					!e.g &&
					!e.u &&
					!(3 <= e.v) &&
					(e.Y++, (e.u = eP(w(e.Fa, e), tZ(e, e.v))), e.v++, !0)
				);
			}
			function tQ(e) {
				null != e.A && (a.clearTimeout(e.A), (e.A = null));
			}
			function tJ(e) {
				(e.g = new eF(e, e.j, "rpc", e.Y)),
					null === e.m && (e.g.H = e.o),
					(e.g.O = 0);
				var t = e9(e.qa);
				tn(t, "RID", "rpc"),
					tn(t, "SID", e.K),
					tn(t, "AID", e.T),
					tn(t, "CI", e.F ? "0" : "1"),
					!e.F && e.ja && tn(t, "TO", e.ja),
					tn(t, "TYPE", "xmlhttp"),
					tH(e, t),
					e.m && e.o && tA(t, e.m, e.o),
					e.L && (e.g.I = e.L);
				var r = e.g;
				(e = e.ia),
					(r.L = 1),
					(r.v = ti(e9(t))),
					(r.m = null),
					(r.P = !0),
					ez(r, e);
			}
			function tX(e) {
				null != e.C && (a.clearTimeout(e.C), (e.C = null));
			}
			function tY(e, t) {
				var r,
					n = null;
				if (e.g == t) {
					tX(e), tQ(e), (e.g = null);
					var i = 2;
				} else {
					if (!e2(e.h, t)) return;
					(n = t.D), e3(e.h, t), (i = 1);
				}
				if (0 != e.G) {
					if (t.o)
						if (1 == i) {
							(n = t.m ? t.m.length : 0), (t = Date.now() - t.F);
							var s = e.B;
							eu((i = eA()), new eO(i, n)), t$(e);
						} else tK(e);
					else if (
						3 == (s = t.s) ||
						(0 == s && 0 < t.X) ||
						!(
							(1 == i &&
								((r = t),
								!(e1(e.h) >= e.h.j - !!e.s) &&
									(e.s
										? ((e.i = r.D.concat(e.i)), !0)
										: 1 != e.G &&
											2 != e.G &&
											!(e.B >= (e.Va ? 0 : e.Wa)) &&
											((e.s = eP(w(e.Ga, e, r), tZ(e, e.B))), e.B++, !0)))) ||
							(2 == i && tW(e))
						)
					)
						switch ((n && 0 < n.length && ((t = e.h).i = t.i.concat(n)), s)) {
							case 1:
								t0(e, 5);
								break;
							case 4:
								t0(e, 10);
								break;
							case 3:
								t0(e, 6);
								break;
							default:
								t0(e, 2);
						}
				}
			}
			function tZ(e, t) {
				let r = e.Ta + Math.floor(Math.random() * e.cb);
				return e.isActive() || (r *= 2), r * t;
			}
			function t0(e, t) {
				if ((e.j.info("Error code " + t), 2 == t)) {
					let t, s, o;
					var r,
						n = w(e.fb, e),
						i = e.Xa;
					const l = !i;
					(i = new e7(i || "//www.google.com/images/cleardot.gif")),
						(a.location && "http" == a.location.protocol) || te(i, "https"),
						ti(i),
						l
							? ((e, t) => {
									const r = new ex();
									if (a.Image) {
										const n = new Image();
										(n.onload = _(tw, r, "TestLoadImage: loaded", !0, t, n)),
											(n.onerror = _(tw, r, "TestLoadImage: error", !1, t, n)),
											(n.onabort = _(tw, r, "TestLoadImage: abort", !1, t, n)),
											(n.ontimeout = _(
												tw,
												r,
												"TestLoadImage: timeout",
												!1,
												t,
												n,
											)),
											a.setTimeout(() => {
												n.ontimeout && n.ontimeout();
											}, 1e4),
											(n.src = e);
									} else t(!1);
								})(i.toString(), n)
							: ((r = i.toString()),
								(t = new ex()),
								(s = new AbortController()),
								(o = setTimeout(() => {
									s.abort(), tw(t, "TestPingServer: timeout", !1, n);
								}, 1e4)),
								fetch(r, { signal: s.signal })
									.then((e) => {
										clearTimeout(o),
											e.ok
												? tw(t, "TestPingServer: ok", !0, n)
												: tw(t, "TestPingServer: server error", !1, n);
									})
									.catch(() => {
										clearTimeout(o), tw(t, "TestPingServer: error", !1, n);
									}));
				} else eD(2);
				(e.G = 0), e.l && e.l.sa(t), t1(e), tq(e);
			}
			function t1(e) {
				if (((e.G = 0), (e.ka = []), e.l)) {
					const t = e5(e.h);
					(0 != t.length || 0 != e.i.length) &&
						(I(e.ka, t),
						I(e.ka, e.i),
						(e.h.i.length = 0),
						b(e.i),
						(e.i.length = 0)),
						e.l.ra();
				}
			}
			function t2(e, t, r) {
				var n = r instanceof e7 ? e9(r) : new e7(r);
				if ("" != n.g) t && (n.g = t + "." + n.g), tt(n, n.s);
				else {
					var i = a.location;
					(n = i.protocol),
						(t = t ? t + "." + i.hostname : i.hostname),
						(i = +i.port);
					var s = new e7(null);
					n && te(s, n), t && (s.g = t), i && tt(s, i), r && (s.l = r), (n = s);
				}
				return (
					(r = e.D),
					(t = e.ya),
					r && t && tn(n, r, t),
					tn(n, "VER", e.la),
					tH(e, n),
					n
				);
			}
			function t6(e, t, r) {
				if (t && !e.J)
					throw Error("Can't create secondary domain capable XhrIo object.");
				return (
					(t = new tk(e.Ca && !e.pa ? new tE({ eb: r }) : e.pa)).Ha(e.J), t
				);
			}
			function t3() {}
			function t5() {}
			function t4(e, t) {
				el.call(this),
					(this.g = new tF(t)),
					(this.l = e),
					(this.h = (t && t.messageUrlParams) || null),
					(e = (t && t.messageHeaders) || null),
					t &&
						t.clientProtocolHeaderRequired &&
						(e
							? (e["X-Client-Protocol"] = "webchannel")
							: (e = { "X-Client-Protocol": "webchannel" })),
					(this.g.o = e),
					(e = (t && t.initMessageHeaders) || null),
					t &&
						t.messageContentType &&
						(e
							? (e["X-WebChannel-Content-Type"] = t.messageContentType)
							: (e = { "X-WebChannel-Content-Type": t.messageContentType })),
					t &&
						t.va &&
						(e
							? (e["X-WebChannel-Client-Profile"] = t.va)
							: (e = { "X-WebChannel-Client-Profile": t.va })),
					(this.g.S = e),
					(e = t && t.Sb) && !T(e) && (this.g.m = e),
					(this.v = (t && t.supportsCrossDomainXhr) || !1),
					(this.u = (t && t.sendRawJson) || !1),
					(t = t && t.httpSessionIdParam) &&
						!T(t) &&
						((this.g.D = t),
						null !== (e = this.h) &&
							t in e &&
							t in (e = this.h) &&
							delete e[t]),
					(this.j = new t9(this));
			}
			function t8(e) {
				eI.call(this),
					e.__headers__ &&
						((this.headers = e.__headers__),
						(this.statusCode = e.__status__),
						delete e.__headers__,
						delete e.__status__);
				var t = e.__sm__;
				if (t) {
					e: {
						for (const r in t) {
							e = r;
							break e;
						}
						e = void 0;
					}
					(this.i = e) &&
						((e = this.i), (t = null !== t && e in t ? t[e] : void 0)),
						(this.data = t);
				} else this.data = e;
			}
			function t7() {
				eT.call(this), (this.status = 1);
			}
			function t9(e) {
				this.g = e;
			}
			((r = tk.prototype).Ha = function (e) {
				this.J = e;
			}),
				(r.ea = function (e, r, n, i) {
					if (this.g)
						throw Error(
							"[goog.net.XhrIo] Object is active with another request=" +
								this.D +
								"; newUri=" +
								e,
						);
					(r = r ? r.toUpperCase() : "GET"),
						(this.D = e),
						(this.l = ""),
						(this.m = 0),
						(this.A = !1),
						(this.h = !0),
						(this.g = this.o ? this.o.g() : t.g()),
						(this.v = this.o ? e_(this.o) : e_(t)),
						(this.g.onreadystatechange = w(this.Ea, this));
					try {
						(this.B = !0), this.g.open(r, String(e), !0), (this.B = !1);
					} catch (e) {
						tD(this, e);
						return;
					}
					if (((e = n || ""), (n = new Map(this.headers)), i))
						if (Object.getPrototypeOf(i) === Object.prototype)
							for (var s in i) n.set(s, i[s]);
						else if ("function" == typeof i.keys && "function" == typeof i.get)
							for (const e of i.keys()) n.set(e, i.get(e));
						else
							throw Error("Unknown input type for opt_headers: " + String(i));
					for (const [t, o] of ((i = Array.from(n.keys()).find(
						(e) => "content-type" == e.toLowerCase(),
					)),
					(s = a.FormData && e instanceof a.FormData),
					!(0 <= Array.prototype.indexOf.call(tN, r, void 0)) ||
						i ||
						s ||
						n.set(
							"Content-Type",
							"application/x-www-form-urlencoded;charset=utf-8",
						),
					n))
						this.g.setRequestHeader(t, o);
					this.H && (this.g.responseType = this.H),
						"withCredentials" in this.g &&
							this.g.withCredentials !== this.J &&
							(this.g.withCredentials = this.J);
					try {
						tL(this), (this.u = !0), this.g.send(e), (this.u = !1);
					} catch (e) {
						tD(this, e);
					}
				}),
				(r.abort = function (e) {
					this.g &&
						this.h &&
						((this.h = !1),
						(this.j = !0),
						this.g.abort(),
						(this.j = !1),
						(this.m = e || 7),
						eu(this, "complete"),
						eu(this, "abort"),
						tx(this));
				}),
				(r.N = function () {
					this.g &&
						(this.h &&
							((this.h = !1), (this.j = !0), this.g.abort(), (this.j = !1)),
						tx(this, !0)),
						tk.aa.N.call(this);
				}),
				(r.Ea = function () {
					this.s || (this.B || this.u || this.j ? tP(this) : this.bb());
				}),
				(r.bb = function () {
					tP(this);
				}),
				(r.isActive = function () {
					return !!this.g;
				}),
				(r.Z = function () {
					try {
						return 2 < tM(this) ? this.g.status : -1;
					} catch (e) {
						return -1;
					}
				}),
				(r.oa = function () {
					try {
						return this.g ? this.g.responseText : "";
					} catch (e) {
						return "";
					}
				}),
				(r.Oa = function (e) {
					if (this.g) {
						var t = this.g.responseText;
						return e && 0 == t.indexOf(e) && (t = t.substring(e.length)), ey(t);
					}
				}),
				(r.Ba = function () {
					return this.m;
				}),
				(r.Ka = function () {
					return "string" == typeof this.l ? this.l : String(this.l);
				}),
				((r = tF.prototype).la = 8),
				(r.G = 1),
				(r.connect = function (e, t, r, n) {
					eD(0),
						(this.W = e),
						(this.H = t || {}),
						r && void 0 !== n && ((this.H.OSID = r), (this.H.OAID = n)),
						(this.F = this.X),
						(this.I = t2(this, null, this.W)),
						t$(this);
				}),
				(r.Ga = function (e) {
					if (this.s)
						if (((this.s = null), 1 == this.G)) {
							if (!e) {
								(this.U = Math.floor(1e5 * Math.random())), (e = this.U++);
								let i = new eF(this, this.j, e),
									s = this.o;
								if (
									(this.S && (s ? P((s = D(s)), this.S) : (s = this.S)),
									null !== this.m || this.O || ((i.H = s), (s = null)),
									this.P)
								)
									e: {
										for (var t = 0, r = 0; r < this.i.length; r++) {
											t: {
												var n = this.i[r];
												if (
													"__data__" in n.map &&
													"string" == typeof (n = n.map.__data__)
												) {
													n = n.length;
													break t;
												}
												n = void 0;
											}
											if (void 0 === n) break;
											if (4096 < (t += n)) {
												t = r;
												break e;
											}
											if (4096 === t || r === this.i.length - 1) {
												t = r + 1;
												break e;
											}
										}
										t = 1e3;
									}
								else t = 1e3;
								(t = tG(this, i, t)),
									tn((r = e9(this.I)), "RID", e),
									tn(r, "CVER", 22),
									this.D && tn(r, "X-HTTP-Session-Id", this.D),
									tH(this, r),
									s &&
										(this.O
											? (t =
													"headers=" +
													encodeURIComponent(String(tC(s))) +
													"&" +
													t)
											: this.m && tA(r, this.m, s)),
									e6(this.h, i),
									this.Ua && tn(r, "TYPE", "init"),
									this.P
										? (tn(r, "$req", t),
											tn(r, "SID", "null"),
											(i.T = !0),
											e$(i, r, null))
										: e$(i, r, t),
									(this.G = 2);
							}
						} else
							3 == this.G &&
								(e
									? tz(this, e)
									: 0 == this.i.length || e0(this.h) || tz(this));
				}),
				(r.Fa = function () {
					if (
						((this.u = null),
						tJ(this),
						this.ba && !(this.M || null == this.g || 0 >= this.R))
					) {
						var e = 2 * this.R;
						this.j.info("BP detection timer enabled: " + e),
							(this.A = eP(w(this.ab, this), e));
					}
				}),
				(r.ab = function () {
					this.A &&
						((this.A = null),
						this.j.info("BP detection timeout reached."),
						this.j.info("Buffering proxy detected and switch to long-polling!"),
						(this.F = !1),
						(this.M = !0),
						eD(10),
						tB(this),
						tJ(this));
				}),
				(r.Za = function () {
					null != this.C && ((this.C = null), tB(this), tW(this), eD(19));
				}),
				(r.fb = function (e) {
					e
						? (this.j.info("Successfully pinged google.com"), eD(2))
						: (this.j.info("Failed to ping google.com"), eD(1));
				}),
				(r.isActive = function () {
					return !!this.l && this.l.isActive(this);
				}),
				((r = t3.prototype).ua = () => {}),
				(r.ta = () => {}),
				(r.sa = () => {}),
				(r.ra = () => {}),
				(r.isActive = () => !0),
				(r.Na = () => {}),
				(t5.prototype.g = (e, t) => new t4(e, t)),
				E(t4, el),
				(t4.prototype.m = function () {
					(this.g.l = this.j),
						this.v && (this.g.J = !0),
						this.g.connect(this.l, this.h || void 0);
				}),
				(t4.prototype.close = function () {
					tj(this.g);
				}),
				(t4.prototype.o = function (e) {
					var t = this.g;
					if ("string" == typeof e) {
						var r = {};
						(r.__data__ = e), (e = r);
					} else this.u && (((r = {}).__data__ = em(e)), (e = r));
					t.i.push(new eY(t.Ya++, e)), 3 == t.G && t$(t);
				}),
				(t4.prototype.N = function () {
					(this.g.l = null),
						delete this.j,
						tj(this.g),
						delete this.g,
						t4.aa.N.call(this);
				}),
				E(t8, eI),
				E(t7, eT),
				E(t9, t3),
				(t9.prototype.ua = function () {
					eu(this.g, "a");
				}),
				(t9.prototype.ta = function (e) {
					eu(this.g, new t8(e));
				}),
				(t9.prototype.sa = function (e) {
					eu(this.g, new t7());
				}),
				(t9.prototype.ra = function () {
					eu(this.g, "b");
				}),
				(t5.prototype.createWebChannel = t5.prototype.g),
				(t4.prototype.send = t4.prototype.o),
				(t4.prototype.open = t4.prototype.m),
				(t4.prototype.close = t4.prototype.close),
				(p = R.createWebChannelTransport = () => new t5()),
				(f = R.getStatEventTarget = () => eA()),
				(d = R.Event = eS),
				(c = R.Stat =
					{
						mb: 0,
						pb: 1,
						qb: 2,
						Jb: 3,
						Ob: 4,
						Lb: 5,
						Mb: 6,
						Kb: 7,
						Ib: 8,
						Nb: 9,
						PROXY: 10,
						NOPROXY: 11,
						Gb: 12,
						Cb: 13,
						Db: 14,
						Bb: 15,
						Eb: 16,
						Fb: 17,
						ib: 18,
						hb: 19,
						jb: 20,
					}),
				(eM.NO_ERROR = 0),
				(eM.TIMEOUT = 8),
				(eM.HTTP_ERROR = 6),
				(h = R.ErrorCode = eM),
				(eU.COMPLETE = "complete"),
				(u = R.EventType = eU),
				(eE.EventType = eb),
				(eb.OPEN = "a"),
				(eb.CLOSE = "b"),
				(eb.ERROR = "c"),
				(eb.MESSAGE = "d"),
				(el.prototype.listen = el.prototype.K),
				(l = R.WebChannel = eE),
				(R.FetchXmlHttpFactory = tE),
				(tk.prototype.listenOnce = tk.prototype.L),
				(tk.prototype.getLastError = tk.prototype.Ka),
				(tk.prototype.getLastErrorCode = tk.prototype.Ba),
				(tk.prototype.getStatus = tk.prototype.Z),
				(tk.prototype.getResponseJson = tk.prototype.Oa),
				(tk.prototype.getResponseText = tk.prototype.oa),
				(tk.prototype.send = tk.prototype.ea),
				(tk.prototype.setWithCredentials = tk.prototype.Ha),
				(o = R.XhrIo = tk);
		}).apply(
			void 0 !== k
				? k
				: "u" > typeof self
					? self
					: "u" > typeof window
						? window
						: {},
		);
		const N = "@firebase/firestore",
			D = "4.8.0";
		class O {
			constructor(e) {
				this.uid = e;
			}
			isAuthenticated() {
				return null != this.uid;
			}
			toKey() {
				return this.isAuthenticated() ? "uid:" + this.uid : "anonymous-user";
			}
			isEqual(e) {
				return e.uid === this.uid;
			}
		}
		(O.UNAUTHENTICATED = new O(null)),
			(O.GOOGLE_CREDENTIALS = new O("google-credentials-uid")),
			(O.FIRST_PARTY = new O("first-party-uid")),
			(O.MOCK_USER = new O("mock-user"));
		let P = "11.10.0",
			x = new T.Logger("@firebase/firestore");
		function L() {
			return x.logLevel;
		}
		function M(e, ...t) {
			if (x.logLevel <= T.LogLevel.DEBUG) {
				const r = t.map(F);
				x.debug(`Firestore (${P}): ${e}`, ...r);
			}
		}
		function U(e, ...t) {
			if (x.logLevel <= T.LogLevel.ERROR) {
				const r = t.map(F);
				x.error(`Firestore (${P}): ${e}`, ...r);
			}
		}
		function V(e, ...t) {
			if (x.logLevel <= T.LogLevel.WARN) {
				const r = t.map(F);
				x.warn(`Firestore (${P}): ${e}`, ...r);
			}
		}
		function F(e) {
			if ("string" == typeof e) return e;
			try {
				return JSON.stringify(e);
			} catch (t) {
				return e;
			}
		}
		function j(e, t, r) {
			let n = "Unexpected state";
			"string" == typeof t ? (n = t) : (r = t), B(e, n, r);
		}
		function B(e, t, r) {
			let n = `FIRESTORE (${P}) INTERNAL ASSERTION FAILED: ${t} (ID: ${e.toString(16)})`;
			if (void 0 !== r)
				try {
					n += " CONTEXT: " + JSON.stringify(r);
				} catch (e) {
					n += " CONTEXT: " + r;
				}
			throw (U(n), Error(n));
		}
		function q(e, t, r, n) {
			let i = "Unexpected state";
			"string" == typeof r ? (i = r) : (n = r), e || B(t, i, n);
		}
		const $ = {
			OK: "ok",
			CANCELLED: "cancelled",
			UNKNOWN: "unknown",
			INVALID_ARGUMENT: "invalid-argument",
			DEADLINE_EXCEEDED: "deadline-exceeded",
			NOT_FOUND: "not-found",
			ALREADY_EXISTS: "already-exists",
			PERMISSION_DENIED: "permission-denied",
			UNAUTHENTICATED: "unauthenticated",
			RESOURCE_EXHAUSTED: "resource-exhausted",
			FAILED_PRECONDITION: "failed-precondition",
			ABORTED: "aborted",
			OUT_OF_RANGE: "out-of-range",
			UNIMPLEMENTED: "unimplemented",
			INTERNAL: "internal",
			UNAVAILABLE: "unavailable",
			DATA_LOSS: "data-loss",
		};
		class z extends S.FirebaseError {
			constructor(e, t) {
				super(e, t),
					(this.code = e),
					(this.message = t),
					(this.toString = () =>
						`${this.name}: [code=${this.code}]: ${this.message}`);
			}
		}
		class H {
			constructor() {
				this.promise = new Promise((e, t) => {
					(this.resolve = e), (this.reject = t);
				});
			}
		}
		class G {
			constructor(e, t) {
				(this.user = t),
					(this.type = "OAuth"),
					(this.headers = new Map()),
					this.headers.set("Authorization", `Bearer ${e}`);
			}
		}
		class K {
			getToken() {
				return Promise.resolve(null);
			}
			invalidateToken() {}
			start(e, t) {
				e.enqueueRetryable(() => t(O.UNAUTHENTICATED));
			}
			shutdown() {}
		}
		class W {
			constructor(e) {
				(this.token = e), (this.changeListener = null);
			}
			getToken() {
				return Promise.resolve(this.token);
			}
			invalidateToken() {}
			start(e, t) {
				(this.changeListener = t), e.enqueueRetryable(() => t(this.token.user));
			}
			shutdown() {
				this.changeListener = null;
			}
		}
		class Q {
			constructor(e) {
				(this.t = e),
					(this.currentUser = O.UNAUTHENTICATED),
					(this.i = 0),
					(this.forceRefresh = !1),
					(this.auth = null);
			}
			start(e, t) {
				q(void 0 === this.o, 42304);
				let r = this.i,
					n = (e) => (this.i !== r ? ((r = this.i), t(e)) : Promise.resolve()),
					i = new H();
				this.o = () => {
					this.i++,
						(this.currentUser = this.u()),
						i.resolve(),
						(i = new H()),
						e.enqueueRetryable(() => n(this.currentUser));
				};
				const s = () => {
						const t = i;
						e.enqueueRetryable(async () => {
							await t.promise, await n(this.currentUser);
						});
					},
					a = (e) => {
						M("FirebaseAuthCredentialsProvider", "Auth detected"),
							(this.auth = e),
							this.o && (this.auth.addAuthTokenListener(this.o), s());
					};
				this.t.onInit((e) => a(e)),
					setTimeout(() => {
						if (!this.auth) {
							const e = this.t.getImmediate({ optional: !0 });
							e
								? a(e)
								: (M(
										"FirebaseAuthCredentialsProvider",
										"Auth not yet detected",
									),
									i.resolve(),
									(i = new H()));
						}
					}, 0),
					s();
			}
			getToken() {
				const e = this.i,
					t = this.forceRefresh;
				return (
					(this.forceRefresh = !1),
					this.auth
						? this.auth
								.getToken(t)
								.then((t) =>
									this.i !== e
										? (M(
												"FirebaseAuthCredentialsProvider",
												"getToken aborted due to token change.",
											),
											this.getToken())
										: t
											? (q("string" == typeof t.accessToken, 31837, { l: t }),
												new G(t.accessToken, this.currentUser))
											: null,
								)
						: Promise.resolve(null)
				);
			}
			invalidateToken() {
				this.forceRefresh = !0;
			}
			shutdown() {
				this.auth && this.o && this.auth.removeAuthTokenListener(this.o),
					(this.o = void 0);
			}
			u() {
				const e = this.auth && this.auth.getUid();
				return q(null === e || "string" == typeof e, 2055, { h: e }), new O(e);
			}
		}
		class J {
			constructor(e, t, r) {
				(this.P = e),
					(this.T = t),
					(this.I = r),
					(this.type = "FirstParty"),
					(this.user = O.FIRST_PARTY),
					(this.A = new Map());
			}
			R() {
				return this.I ? this.I() : null;
			}
			get headers() {
				this.A.set("X-Goog-AuthUser", this.P);
				const e = this.R();
				return (
					e && this.A.set("Authorization", e),
					this.T && this.A.set("X-Goog-Iam-Authorization-Token", this.T),
					this.A
				);
			}
		}
		class X {
			constructor(e, t, r) {
				(this.P = e), (this.T = t), (this.I = r);
			}
			getToken() {
				return Promise.resolve(new J(this.P, this.T, this.I));
			}
			start(e, t) {
				e.enqueueRetryable(() => t(O.FIRST_PARTY));
			}
			shutdown() {}
			invalidateToken() {}
		}
		class Y {
			constructor(e) {
				(this.value = e),
					(this.type = "AppCheck"),
					(this.headers = new Map()),
					e &&
						e.length > 0 &&
						this.headers.set("x-firebase-appcheck", this.value);
			}
		}
		class Z {
			constructor(e, t) {
				(this.V = t),
					(this.forceRefresh = !1),
					(this.appCheck = null),
					(this.m = null),
					(this.p = null),
					(0, b._isFirebaseServerApp)(e) &&
						e.settings.appCheckToken &&
						(this.p = e.settings.appCheckToken);
			}
			start(e, t) {
				q(void 0 === this.o, 3512);
				const r = (e) => {
					null != e.error &&
						M(
							"FirebaseAppCheckTokenProvider",
							`Error getting App Check token; using placeholder token instead. Error: ${e.error.message}`,
						);
					const r = e.token !== this.m;
					return (
						(this.m = e.token),
						M(
							"FirebaseAppCheckTokenProvider",
							`Received ${r ? "new" : "existing"} token.`,
						),
						r ? t(e.token) : Promise.resolve()
					);
				};
				this.o = (t) => {
					e.enqueueRetryable(() => r(t));
				};
				const n = (e) => {
					M("FirebaseAppCheckTokenProvider", "AppCheck detected"),
						(this.appCheck = e),
						this.o && this.appCheck.addTokenListener(this.o);
				};
				this.V.onInit((e) => n(e)),
					setTimeout(() => {
						if (!this.appCheck) {
							const e = this.V.getImmediate({ optional: !0 });
							e
								? n(e)
								: M(
										"FirebaseAppCheckTokenProvider",
										"AppCheck not yet detected",
									);
						}
					}, 0);
			}
			getToken() {
				if (this.p) return Promise.resolve(new Y(this.p));
				const e = this.forceRefresh;
				return (
					(this.forceRefresh = !1),
					this.appCheck
						? this.appCheck
								.getToken(e)
								.then((e) =>
									e
										? (q("string" == typeof e.token, 44558, { tokenResult: e }),
											(this.m = e.token),
											new Y(e.token))
										: null,
								)
						: Promise.resolve(null)
				);
			}
			invalidateToken() {
				this.forceRefresh = !0;
			}
			shutdown() {
				this.appCheck && this.o && this.appCheck.removeTokenListener(this.o),
					(this.o = void 0);
			}
		}
		function ee() {
			return new TextEncoder();
		}
		class et {
			static newId() {
				let e = 62 * Math.floor(256 / 62),
					t = "";
				for (; t.length < 20; ) {
					const r = ((e) => {
						const t = "u" > typeof self && (self.crypto || self.msCrypto),
							r = new Uint8Array(40);
						if (t && "function" == typeof t.getRandomValues)
							t.getRandomValues(r);
						else
							for (let e = 0; e < 40; e++)
								r[e] = Math.floor(256 * Math.random());
						return r;
					})(0);
					for (let n = 0; n < r.length; ++n)
						t.length < 20 &&
							r[n] < e &&
							(t +=
								"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(
									r[n] % 62,
								));
				}
				return t;
			}
		}
		function er(e, t) {
			return e < t ? -1 : +(e > t);
		}
		function en(e, t) {
			let r = 0;
			for (; r < e.length && r < t.length; ) {
				const n = e.codePointAt(r),
					i = t.codePointAt(r);
				if (n !== i) {
					if (n < 128 && i < 128) return er(n, i);
					{
						const s = ee(),
							a = ((e, t) => {
								for (let r = 0; r < e.length && r < t.length; ++r)
									if (e[r] !== t[r]) return er(e[r], t[r]);
								return er(e.length, t.length);
							})(s.encode(ei(e, r)), s.encode(ei(t, r)));
						return 0 !== a ? a : er(n, i);
					}
				}
				r += n > 65535 ? 2 : 1;
			}
			return er(e.length, t.length);
		}
		function ei(e, t) {
			return e.codePointAt(t) > 65535
				? e.substring(t, t + 2)
				: e.substring(t, t + 1);
		}
		function es(e, t, r) {
			return e.length === t.length && e.every((e, n) => r(e, t[n]));
		}
		const ea = "__name__";
		class eo {
			constructor(e, t, r) {
				void 0 === t
					? (t = 0)
					: t > e.length && j(637, { offset: t, range: e.length }),
					void 0 === r
						? (r = e.length - t)
						: r > e.length - t && j(1746, { length: r, range: e.length - t }),
					(this.segments = e),
					(this.offset = t),
					(this.len = r);
			}
			get length() {
				return this.len;
			}
			isEqual(e) {
				return 0 === eo.comparator(this, e);
			}
			child(e) {
				const t = this.segments.slice(this.offset, this.limit());
				return (
					e instanceof eo
						? e.forEach((e) => {
								t.push(e);
							})
						: t.push(e),
					this.construct(t)
				);
			}
			limit() {
				return this.offset + this.length;
			}
			popFirst(e) {
				return (
					(e = void 0 === e ? 1 : e),
					this.construct(this.segments, this.offset + e, this.length - e)
				);
			}
			popLast() {
				return this.construct(this.segments, this.offset, this.length - 1);
			}
			firstSegment() {
				return this.segments[this.offset];
			}
			lastSegment() {
				return this.get(this.length - 1);
			}
			get(e) {
				return this.segments[this.offset + e];
			}
			isEmpty() {
				return 0 === this.length;
			}
			isPrefixOf(e) {
				if (e.length < this.length) return !1;
				for (let t = 0; t < this.length; t++)
					if (this.get(t) !== e.get(t)) return !1;
				return !0;
			}
			isImmediateParentOf(e) {
				if (this.length + 1 !== e.length) return !1;
				for (let t = 0; t < this.length; t++)
					if (this.get(t) !== e.get(t)) return !1;
				return !0;
			}
			forEach(e) {
				for (let t = this.offset, r = this.limit(); t < r; t++)
					e(this.segments[t]);
			}
			toArray() {
				return this.segments.slice(this.offset, this.limit());
			}
			static comparator(e, t) {
				const r = Math.min(e.length, t.length);
				for (let n = 0; n < r; n++) {
					const r = eo.compareSegments(e.get(n), t.get(n));
					if (0 !== r) return r;
				}
				return er(e.length, t.length);
			}
			static compareSegments(e, t) {
				const r = eo.isNumericId(e),
					n = eo.isNumericId(t);
				return r && !n
					? -1
					: !r && n
						? 1
						: r && n
							? eo.extractNumericId(e).compare(eo.extractNumericId(t))
							: en(e, t);
			}
			static isNumericId(e) {
				return e.startsWith("__id") && e.endsWith("__");
			}
			static extractNumericId(e) {
				return s.fromString(e.substring(4, e.length - 2));
			}
		}
		class el extends eo {
			construct(e, t, r) {
				return new el(e, t, r);
			}
			canonicalString() {
				return this.toArray().join("/");
			}
			toString() {
				return this.canonicalString();
			}
			toUriEncodedString() {
				return this.toArray().map(encodeURIComponent).join("/");
			}
			static fromString(...e) {
				const t = [];
				for (const r of e) {
					if (r.indexOf("//") >= 0)
						throw new z(
							$.INVALID_ARGUMENT,
							`Invalid segment (${r}). Paths must not contain // in them.`,
						);
					t.push(...r.split("/").filter((e) => e.length > 0));
				}
				return new el(t);
			}
			static emptyPath() {
				return new el([]);
			}
		}
		const eu = /^[_a-zA-Z][_a-zA-Z0-9]*$/;
		class eh extends eo {
			construct(e, t, r) {
				return new eh(e, t, r);
			}
			static isValidIdentifier(e) {
				return eu.test(e);
			}
			canonicalString() {
				return this.toArray()
					.map(
						(e) => (
							(e = e.replace(/\\/g, "\\\\").replace(/`/g, "\\`")),
							eh.isValidIdentifier(e) || (e = "`" + e + "`"),
							e
						),
					)
					.join(".");
			}
			toString() {
				return this.canonicalString();
			}
			isKeyField() {
				return 1 === this.length && this.get(0) === ea;
			}
			static keyField() {
				return new eh([ea]);
			}
			static fromServerFormat(e) {
				let t = [],
					r = "",
					n = 0,
					i = () => {
						if (0 === r.length)
							throw new z(
								$.INVALID_ARGUMENT,
								`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
							);
						t.push(r), (r = "");
					},
					s = !1;
				for (; n < e.length; ) {
					const t = e[n];
					if ("\\" === t) {
						if (n + 1 === e.length)
							throw new z(
								$.INVALID_ARGUMENT,
								"Path has trailing escape character: " + e,
							);
						const t = e[n + 1];
						if ("\\" !== t && "." !== t && "`" !== t)
							throw new z(
								$.INVALID_ARGUMENT,
								"Path has invalid escape sequence: " + e,
							);
						(r += t), (n += 2);
					} else "`" === t ? (s = !s) : "." !== t || s ? (r += t) : i(), n++;
				}
				if ((i(), s))
					throw new z($.INVALID_ARGUMENT, "Unterminated ` in path: " + e);
				return new eh(t);
			}
			static emptyPath() {
				return new eh([]);
			}
		}
		class ec {
			constructor(e) {
				this.path = e;
			}
			static fromPath(e) {
				return new ec(el.fromString(e));
			}
			static fromName(e) {
				return new ec(el.fromString(e).popFirst(5));
			}
			static empty() {
				return new ec(el.emptyPath());
			}
			get collectionGroup() {
				return this.path.popLast().lastSegment();
			}
			hasCollectionId(e) {
				return (
					this.path.length >= 2 && this.path.get(this.path.length - 2) === e
				);
			}
			getCollectionGroup() {
				return this.path.get(this.path.length - 2);
			}
			getCollectionPath() {
				return this.path.popLast();
			}
			isEqual(e) {
				return null !== e && 0 === el.comparator(this.path, e.path);
			}
			toString() {
				return this.path.toString();
			}
			static comparator(e, t) {
				return el.comparator(e.path, t.path);
			}
			static isDocumentKey(e) {
				return e.length % 2 == 0;
			}
			static fromSegments(e) {
				return new ec(new el(e.slice()));
			}
		}
		function ed(e, t, r) {
			if (!r)
				throw new z(
					$.INVALID_ARGUMENT,
					`Function ${e}() cannot be called with an empty ${t}.`,
				);
		}
		function ef(e) {
			if (!ec.isDocumentKey(e))
				throw new z(
					$.INVALID_ARGUMENT,
					`Invalid document reference. Document references must have an even number of segments, but ${e} has ${e.length}.`,
				);
		}
		function ep(e) {
			if (ec.isDocumentKey(e))
				throw new z(
					$.INVALID_ARGUMENT,
					`Invalid collection reference. Collection references must have an odd number of segments, but ${e} has ${e.length}.`,
				);
		}
		function eg(e) {
			return (
				"object" == typeof e &&
				null !== e &&
				(Object.getPrototypeOf(e) === Object.prototype ||
					null === Object.getPrototypeOf(e))
			);
		}
		function em(e) {
			if (void 0 === e) return "undefined";
			if (null === e) return "null";
			if ("string" == typeof e)
				return (
					e.length > 20 && (e = `${e.substring(0, 20)}...`), JSON.stringify(e)
				);
			if ("number" == typeof e || "boolean" == typeof e) return "" + e;
			if ("object" == typeof e) {
				if (e instanceof Array) return "an array";
				{
					var t;
					const r = (t = e).constructor ? t.constructor.name : null;
					return r ? `a custom ${r} object` : "an object";
				}
			}
			return "function" == typeof e
				? "a function"
				: j(12329, { type: typeof e });
		}
		function ey(e, t) {
			if (("_delegate" in e && (e = e._delegate), !(e instanceof t))) {
				if (t.name === e.constructor.name)
					throw new z(
						$.INVALID_ARGUMENT,
						"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?",
					);
				{
					const r = em(e);
					throw new z(
						$.INVALID_ARGUMENT,
						`Expected type '${t.name}', but it was: ${r}`,
					);
				}
			}
			return e;
		}
		function ev(e, t) {
			const r = { typeString: e };
			return t && (r.value = t), r;
		}
		function ew(e, t) {
			let r;
			if (!eg(e)) throw new z($.INVALID_ARGUMENT, "JSON must be an object");
			for (const n in t)
				if (t[n]) {
					const i = t[n].typeString,
						s = "value" in t[n] ? { value: t[n].value } : void 0;
					if (!(n in e)) {
						r = `JSON missing required field: '${n}'`;
						break;
					}
					const a = e[n];
					if (i && typeof a !== i) {
						r = `JSON field '${n}' must be a ${i}.`;
						break;
					}
					if (void 0 !== s && a !== s.value) {
						r = `Expected '${n}' field to equal '${s.value}'`;
						break;
					}
				}
			if (r) throw new z($.INVALID_ARGUMENT, r);
			return !0;
		}
		class e_ {
			static now() {
				return e_.fromMillis(Date.now());
			}
			static fromDate(e) {
				return e_.fromMillis(e.getTime());
			}
			static fromMillis(e) {
				const t = Math.floor(e / 1e3),
					r = Math.floor((e - 1e3 * t) * 1e6);
				return new e_(t, r);
			}
			constructor(e, t) {
				if (((this.seconds = e), (this.nanoseconds = t), t < 0 || t >= 1e9))
					throw new z(
						$.INVALID_ARGUMENT,
						"Timestamp nanoseconds out of range: " + t,
					);
				if (e < -0xe7791f700 || e >= 0x3afff44180)
					throw new z(
						$.INVALID_ARGUMENT,
						"Timestamp seconds out of range: " + e,
					);
			}
			toDate() {
				return new Date(this.toMillis());
			}
			toMillis() {
				return 1e3 * this.seconds + this.nanoseconds / 1e6;
			}
			_compareTo(e) {
				return this.seconds === e.seconds
					? er(this.nanoseconds, e.nanoseconds)
					: er(this.seconds, e.seconds);
			}
			isEqual(e) {
				return e.seconds === this.seconds && e.nanoseconds === this.nanoseconds;
			}
			toString() {
				return (
					"Timestamp(seconds=" +
					this.seconds +
					", nanoseconds=" +
					this.nanoseconds +
					")"
				);
			}
			toJSON() {
				return {
					type: e_._jsonSchemaVersion,
					seconds: this.seconds,
					nanoseconds: this.nanoseconds,
				};
			}
			static fromJSON(e) {
				if (ew(e, e_._jsonSchema)) return new e_(e.seconds, e.nanoseconds);
			}
			valueOf() {
				return (
					String(this.seconds - -0xe7791f700).padStart(12, "0") +
					"." +
					String(this.nanoseconds).padStart(9, "0")
				);
			}
		}
		(e_._jsonSchemaVersion = "firestore/timestamp/1.0"),
			(e_._jsonSchema = {
				type: ev("string", e_._jsonSchemaVersion),
				seconds: ev("number"),
				nanoseconds: ev("number"),
			});
		class eE {
			static fromTimestamp(e) {
				return new eE(e);
			}
			static min() {
				return new eE(new e_(0, 0));
			}
			static max() {
				return new eE(new e_(0x3afff4417f, 0x3b9ac9ff));
			}
			constructor(e) {
				this.timestamp = e;
			}
			compareTo(e) {
				return this.timestamp._compareTo(e.timestamp);
			}
			isEqual(e) {
				return this.timestamp.isEqual(e.timestamp);
			}
			toMicroseconds() {
				return 1e6 * this.timestamp.seconds + this.timestamp.nanoseconds / 1e3;
			}
			toString() {
				return "SnapshotVersion(" + this.timestamp.toString() + ")";
			}
			toTimestamp() {
				return this.timestamp;
			}
		}
		class eb {
			constructor(e, t, r) {
				(this.readTime = e), (this.documentKey = t), (this.largestBatchId = r);
			}
			static min() {
				return new eb(eE.min(), ec.empty(), -1);
			}
			static max() {
				return new eb(eE.max(), ec.empty(), -1);
			}
		}
		class eI {
			constructor() {
				this.onCommittedListeners = [];
			}
			addOnCommittedListener(e) {
				this.onCommittedListeners.push(e);
			}
			raiseOnCommittedEvent() {
				this.onCommittedListeners.forEach((e) => e());
			}
		}
		async function eT(e) {
			if (
				e.code !== $.FAILED_PRECONDITION ||
				"The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab." !==
					e.message
			)
				throw e;
			M("LocalStore", "Unexpectedly lost primary lease");
		}
		class eS {
			constructor(e) {
				(this.nextCallback = null),
					(this.catchCallback = null),
					(this.result = void 0),
					(this.error = void 0),
					(this.isDone = !1),
					(this.callbackAttached = !1),
					e(
						(e) => {
							(this.isDone = !0),
								(this.result = e),
								this.nextCallback && this.nextCallback(e);
						},
						(e) => {
							(this.isDone = !0),
								(this.error = e),
								this.catchCallback && this.catchCallback(e);
						},
					);
			}
			catch(e) {
				return this.next(void 0, e);
			}
			next(e, t) {
				return (
					this.callbackAttached && j(59440),
					(this.callbackAttached = !0),
					this.isDone
						? this.error
							? this.wrapFailure(t, this.error)
							: this.wrapSuccess(e, this.result)
						: new eS((r, n) => {
								(this.nextCallback = (t) => {
									this.wrapSuccess(e, t).next(r, n);
								}),
									(this.catchCallback = (e) => {
										this.wrapFailure(t, e).next(r, n);
									});
							})
				);
			}
			toPromise() {
				return new Promise((e, t) => {
					this.next(e, t);
				});
			}
			wrapUserFunction(e) {
				try {
					const t = e();
					return t instanceof eS ? t : eS.resolve(t);
				} catch (e) {
					return eS.reject(e);
				}
			}
			wrapSuccess(e, t) {
				return e ? this.wrapUserFunction(() => e(t)) : eS.resolve(t);
			}
			wrapFailure(e, t) {
				return e ? this.wrapUserFunction(() => e(t)) : eS.reject(t);
			}
			static resolve(e) {
				return new eS((t, r) => {
					t(e);
				});
			}
			static reject(e) {
				return new eS((t, r) => {
					r(e);
				});
			}
			static waitFor(e) {
				return new eS((t, r) => {
					let n = 0,
						i = 0,
						s = !1;
					e.forEach((e) => {
						++n,
							e.next(
								() => {
									++i, s && i === n && t();
								},
								(e) => r(e),
							);
					}),
						(s = !0),
						i === n && t();
				});
			}
			static or(e) {
				let t = eS.resolve(!1);
				for (const r of e) t = t.next((e) => (e ? eS.resolve(e) : r()));
				return t;
			}
			static forEach(e, t) {
				const r = [];
				return (
					e.forEach((e, n) => {
						r.push(t.call(eS, e, n));
					}),
					eS.waitFor(r)
				);
			}
			static mapArray(e, t) {
				return new eS((r, n) => {
					let i = e.length,
						s = Array(i),
						a = 0;
					for (let o = 0; o < i; o++) {
						const l = o;
						t(e[l]).next(
							(e) => {
								(s[l] = e), ++a === i && r(s);
							},
							(e) => n(e),
						);
					}
				});
			}
			static doWhile(e, t) {
				return new eS((r, n) => {
					const i = () => {
						!0 === e()
							? t().next(() => {
									i();
								}, n)
							: r();
					};
					i();
				});
			}
		}
		function eC(e) {
			return "IndexedDbTransactionError" === e.name;
		}
		class eA {
			constructor(e, t) {
				(this.previousValue = e),
					t &&
						((t.sequenceNumberHandler = (e) => this._e(e)),
						(this.ae = (e) => t.writeSequenceNumber(e)));
			}
			_e(e) {
				return (
					(this.previousValue = Math.max(e, this.previousValue)),
					this.previousValue
				);
			}
			next() {
				const e = ++this.previousValue;
				return this.ae && this.ae(e), e;
			}
		}
		eA.ue = -1;
		function ek(e) {
			return 0 === e && 1 / e == -1 / 0;
		}
		function eR(e) {
			let t = 0;
			for (const r in e) Object.hasOwn(e, r) && t++;
			return t;
		}
		function eN(e, t) {
			for (const r in e) Object.hasOwn(e, r) && t(r, e[r]);
		}
		function eD(e) {
			for (const t in e) if (Object.hasOwn(e, t)) return !1;
			return !0;
		}
		class eO {
			constructor(e, t) {
				(this.comparator = e), (this.root = t || ex.EMPTY);
			}
			insert(e, t) {
				return new eO(
					this.comparator,
					this.root
						.insert(e, t, this.comparator)
						.copy(null, null, ex.BLACK, null, null),
				);
			}
			remove(e) {
				return new eO(
					this.comparator,
					this.root
						.remove(e, this.comparator)
						.copy(null, null, ex.BLACK, null, null),
				);
			}
			get(e) {
				let t = this.root;
				for (; !t.isEmpty(); ) {
					const r = this.comparator(e, t.key);
					if (0 === r) return t.value;
					r < 0 ? (t = t.left) : r > 0 && (t = t.right);
				}
				return null;
			}
			indexOf(e) {
				let t = 0,
					r = this.root;
				for (; !r.isEmpty(); ) {
					const n = this.comparator(e, r.key);
					if (0 === n) return t + r.left.size;
					n < 0 ? (r = r.left) : ((t += r.left.size + 1), (r = r.right));
				}
				return -1;
			}
			isEmpty() {
				return this.root.isEmpty();
			}
			get size() {
				return this.root.size;
			}
			minKey() {
				return this.root.minKey();
			}
			maxKey() {
				return this.root.maxKey();
			}
			inorderTraversal(e) {
				return this.root.inorderTraversal(e);
			}
			forEach(e) {
				this.inorderTraversal((t, r) => (e(t, r), !1));
			}
			toString() {
				const e = [];
				return (
					this.inorderTraversal((t, r) => (e.push(`${t}:${r}`), !1)),
					`{${e.join(", ")}}`
				);
			}
			reverseTraversal(e) {
				return this.root.reverseTraversal(e);
			}
			getIterator() {
				return new eP(this.root, null, this.comparator, !1);
			}
			getIteratorFrom(e) {
				return new eP(this.root, e, this.comparator, !1);
			}
			getReverseIterator() {
				return new eP(this.root, null, this.comparator, !0);
			}
			getReverseIteratorFrom(e) {
				return new eP(this.root, e, this.comparator, !0);
			}
		}
		class eP {
			constructor(e, t, r, n) {
				(this.isReverse = n), (this.nodeStack = []);
				let i = 1;
				for (; !e.isEmpty(); )
					if (((i = t ? r(e.key, t) : 1), t && n && (i *= -1), i < 0))
						e = this.isReverse ? e.left : e.right;
					else {
						if (0 === i) {
							this.nodeStack.push(e);
							break;
						}
						this.nodeStack.push(e), (e = this.isReverse ? e.right : e.left);
					}
			}
			getNext() {
				let e = this.nodeStack.pop(),
					t = { key: e.key, value: e.value };
				if (this.isReverse)
					for (e = e.left; !e.isEmpty(); )
						this.nodeStack.push(e), (e = e.right);
				else
					for (e = e.right; !e.isEmpty(); )
						this.nodeStack.push(e), (e = e.left);
				return t;
			}
			hasNext() {
				return this.nodeStack.length > 0;
			}
			peek() {
				if (0 === this.nodeStack.length) return null;
				const e = this.nodeStack[this.nodeStack.length - 1];
				return { key: e.key, value: e.value };
			}
		}
		class ex {
			constructor(e, t, r, n, i) {
				(this.key = e),
					(this.value = t),
					(this.color = null != r ? r : ex.RED),
					(this.left = null != n ? n : ex.EMPTY),
					(this.right = null != i ? i : ex.EMPTY),
					(this.size = this.left.size + 1 + this.right.size);
			}
			copy(e, t, r, n, i) {
				return new ex(
					null != e ? e : this.key,
					null != t ? t : this.value,
					null != r ? r : this.color,
					null != n ? n : this.left,
					null != i ? i : this.right,
				);
			}
			isEmpty() {
				return !1;
			}
			inorderTraversal(e) {
				return (
					this.left.inorderTraversal(e) ||
					e(this.key, this.value) ||
					this.right.inorderTraversal(e)
				);
			}
			reverseTraversal(e) {
				return (
					this.right.reverseTraversal(e) ||
					e(this.key, this.value) ||
					this.left.reverseTraversal(e)
				);
			}
			min() {
				return this.left.isEmpty() ? this : this.left.min();
			}
			minKey() {
				return this.min().key;
			}
			maxKey() {
				return this.right.isEmpty() ? this.key : this.right.maxKey();
			}
			insert(e, t, r) {
				let n = this,
					i = r(e, n.key);
				return (n =
					i < 0
						? n.copy(null, null, null, n.left.insert(e, t, r), null)
						: 0 === i
							? n.copy(null, t, null, null, null)
							: n.copy(
									null,
									null,
									null,
									null,
									n.right.insert(e, t, r),
								)).fixUp();
			}
			removeMin() {
				if (this.left.isEmpty()) return ex.EMPTY;
				let e = this;
				return (
					e.left.isRed() || e.left.left.isRed() || (e = e.moveRedLeft()),
					(e = e.copy(null, null, null, e.left.removeMin(), null)).fixUp()
				);
			}
			remove(e, t) {
				let r,
					n = this;
				if (0 > t(e, n.key))
					n.left.isEmpty() ||
						n.left.isRed() ||
						n.left.left.isRed() ||
						(n = n.moveRedLeft()),
						(n = n.copy(null, null, null, n.left.remove(e, t), null));
				else {
					if (
						(n.left.isRed() && (n = n.rotateRight()),
						n.right.isEmpty() ||
							n.right.isRed() ||
							n.right.left.isRed() ||
							(n = n.moveRedRight()),
						0 === t(e, n.key))
					) {
						if (n.right.isEmpty()) return ex.EMPTY;
						(r = n.right.min()),
							(n = n.copy(r.key, r.value, null, null, n.right.removeMin()));
					}
					n = n.copy(null, null, null, null, n.right.remove(e, t));
				}
				return n.fixUp();
			}
			isRed() {
				return this.color;
			}
			fixUp() {
				let e = this;
				return (
					e.right.isRed() && !e.left.isRed() && (e = e.rotateLeft()),
					e.left.isRed() && e.left.left.isRed() && (e = e.rotateRight()),
					e.left.isRed() && e.right.isRed() && (e = e.colorFlip()),
					e
				);
			}
			moveRedLeft() {
				let e = this.colorFlip();
				return (
					e.right.left.isRed() &&
						(e = (e = (e = e.copy(
							null,
							null,
							null,
							null,
							e.right.rotateRight(),
						)).rotateLeft()).colorFlip()),
					e
				);
			}
			moveRedRight() {
				let e = this.colorFlip();
				return (
					e.left.left.isRed() && (e = (e = e.rotateRight()).colorFlip()), e
				);
			}
			rotateLeft() {
				const e = this.copy(null, null, ex.RED, null, this.right.left);
				return this.right.copy(null, null, this.color, e, null);
			}
			rotateRight() {
				const e = this.copy(null, null, ex.RED, this.left.right, null);
				return this.left.copy(null, null, this.color, null, e);
			}
			colorFlip() {
				const e = this.left.copy(null, null, !this.left.color, null, null),
					t = this.right.copy(null, null, !this.right.color, null, null);
				return this.copy(null, null, !this.color, e, t);
			}
			checkMaxDepth() {
				return 2 ** this.check() <= this.size + 1;
			}
			check() {
				if (this.isRed() && this.left.isRed())
					throw j(43730, { key: this.key, value: this.value });
				if (this.right.isRed())
					throw j(14113, { key: this.key, value: this.value });
				const e = this.left.check();
				if (e !== this.right.check()) throw j(27949);
				return e + +!this.isRed();
			}
		}
		(ex.EMPTY = null),
			(ex.RED = !0),
			(ex.BLACK = !1),
			(ex.EMPTY = new (class {
				constructor() {
					this.size = 0;
				}
				get key() {
					throw j(57766);
				}
				get value() {
					throw j(16141);
				}
				get color() {
					throw j(16727);
				}
				get left() {
					throw j(29726);
				}
				get right() {
					throw j(36894);
				}
				copy(e, t, r, n, i) {
					return this;
				}
				insert(e, t, r) {
					return new ex(e, t);
				}
				remove(e, t) {
					return this;
				}
				isEmpty() {
					return !0;
				}
				inorderTraversal(e) {
					return !1;
				}
				reverseTraversal(e) {
					return !1;
				}
				minKey() {
					return null;
				}
				maxKey() {
					return null;
				}
				isRed() {
					return !1;
				}
				checkMaxDepth() {
					return !0;
				}
				check() {
					return 0;
				}
			})());
		class eL {
			constructor(e) {
				(this.comparator = e), (this.data = new eO(this.comparator));
			}
			has(e) {
				return null !== this.data.get(e);
			}
			first() {
				return this.data.minKey();
			}
			last() {
				return this.data.maxKey();
			}
			get size() {
				return this.data.size;
			}
			indexOf(e) {
				return this.data.indexOf(e);
			}
			forEach(e) {
				this.data.inorderTraversal((t, r) => (e(t), !1));
			}
			forEachInRange(e, t) {
				const r = this.data.getIteratorFrom(e[0]);
				for (; r.hasNext(); ) {
					const n = r.getNext();
					if (this.comparator(n.key, e[1]) >= 0) return;
					t(n.key);
				}
			}
			forEachWhile(e, t) {
				let r;
				for (
					r =
						void 0 !== t
							? this.data.getIteratorFrom(t)
							: this.data.getIterator();
					r.hasNext();
				)
					if (!e(r.getNext().key)) return;
			}
			firstAfterOrEqual(e) {
				const t = this.data.getIteratorFrom(e);
				return t.hasNext() ? t.getNext().key : null;
			}
			getIterator() {
				return new eM(this.data.getIterator());
			}
			getIteratorFrom(e) {
				return new eM(this.data.getIteratorFrom(e));
			}
			add(e) {
				return this.copy(this.data.remove(e).insert(e, !0));
			}
			delete(e) {
				return this.has(e) ? this.copy(this.data.remove(e)) : this;
			}
			isEmpty() {
				return this.data.isEmpty();
			}
			unionWith(e) {
				let t = this;
				return (
					t.size < e.size && ((t = e), (e = this)),
					e.forEach((e) => {
						t = t.add(e);
					}),
					t
				);
			}
			isEqual(e) {
				if (!(e instanceof eL) || this.size !== e.size) return !1;
				const t = this.data.getIterator(),
					r = e.data.getIterator();
				for (; t.hasNext(); ) {
					const e = t.getNext().key,
						n = r.getNext().key;
					if (0 !== this.comparator(e, n)) return !1;
				}
				return !0;
			}
			toArray() {
				const e = [];
				return (
					this.forEach((t) => {
						e.push(t);
					}),
					e
				);
			}
			toString() {
				const e = [];
				return (
					this.forEach((t) => e.push(t)), "SortedSet(" + e.toString() + ")"
				);
			}
			copy(e) {
				const t = new eL(this.comparator);
				return (t.data = e), t;
			}
		}
		class eM {
			constructor(e) {
				this.iter = e;
			}
			getNext() {
				return this.iter.getNext().key;
			}
			hasNext() {
				return this.iter.hasNext();
			}
		}
		class eU {
			constructor(e) {
				(this.fields = e), e.sort(eh.comparator);
			}
			static empty() {
				return new eU([]);
			}
			unionWith(e) {
				let t = new eL(eh.comparator);
				for (const e of this.fields) t = t.add(e);
				for (const r of e) t = t.add(r);
				return new eU(t.toArray());
			}
			covers(e) {
				for (const t of this.fields) if (t.isPrefixOf(e)) return !0;
				return !1;
			}
			isEqual(e) {
				return es(this.fields, e.fields, (e, t) => e.isEqual(t));
			}
		}
		class eV extends Error {
			constructor() {
				super(...arguments), (this.name = "Base64DecodeError");
			}
		}
		class eF {
			constructor(e) {
				this.binaryString = e;
			}
			static fromBase64String(e) {
				return new eF(
					((e) => {
						try {
							return atob(e);
						} catch (e) {
							throw "u" > typeof DOMException && e instanceof DOMException
								? new eV("Invalid base64 string: " + e)
								: e;
						}
					})(e),
				);
			}
			static fromUint8Array(e) {
				return new eF(
					((e) => {
						let t = "";
						for (let r = 0; r < e.length; ++r) t += String.fromCharCode(e[r]);
						return t;
					})(e),
				);
			}
			[Symbol.iterator]() {
				let e = 0;
				return {
					next: () =>
						e < this.binaryString.length
							? { value: this.binaryString.charCodeAt(e++), done: !1 }
							: { value: void 0, done: !0 },
				};
			}
			toBase64() {
				return btoa(this.binaryString);
			}
			toUint8Array() {
				var e = this.binaryString;
				const t = new Uint8Array(e.length);
				for (let r = 0; r < e.length; r++) t[r] = e.charCodeAt(r);
				return t;
			}
			approximateByteSize() {
				return 2 * this.binaryString.length;
			}
			compareTo(e) {
				return er(this.binaryString, e.binaryString);
			}
			isEqual(e) {
				return this.binaryString === e.binaryString;
			}
		}
		eF.EMPTY_BYTE_STRING = new eF("");
		const ej = new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);
		function eB(e) {
			if ((q(!!e, 39018), "string" == typeof e)) {
				let t = 0,
					r = ej.exec(e);
				if ((q(!!r, 46558, { timestamp: e }), r[1])) {
					let e = r[1];
					t = Number((e = (e + "000000000").substr(0, 9)));
				}
				return { seconds: Math.floor(new Date(e).getTime() / 1e3), nanos: t };
			}
			return { seconds: eq(e.seconds), nanos: eq(e.nanos) };
		}
		function eq(e) {
			return "number" == typeof e ? e : "string" == typeof e ? Number(e) : 0;
		}
		function e$(e) {
			return "string" == typeof e
				? eF.fromBase64String(e)
				: eF.fromUint8Array(e);
		}
		const ez = "server_timestamp",
			eH = "__type__",
			eG = "__previous_value__",
			eK = "__local_write_time__";
		function eW(e) {
			var t, r;
			return (
				(null ==
				(r = ((null == (t = null == e ? void 0 : e.mapValue)
					? void 0
					: t.fields) || {})[eH])
					? void 0
					: r.stringValue) === ez
			);
		}
		function eQ(e) {
			const t = e.mapValue.fields[eG];
			return eW(t) ? eQ(t) : t;
		}
		function eJ(e) {
			const t = eB(e.mapValue.fields[eK].timestampValue);
			return new e_(t.seconds, t.nanos);
		}
		class eX {
			constructor(e, t, r, n, i, s, a, o, l, u) {
				(this.databaseId = e),
					(this.appId = t),
					(this.persistenceKey = r),
					(this.host = n),
					(this.ssl = i),
					(this.forceLongPolling = s),
					(this.autoDetectLongPolling = a),
					(this.longPollingOptions = o),
					(this.useFetchStreams = l),
					(this.isUsingEmulator = u);
			}
		}
		const eY = "(default)";
		class eZ {
			constructor(e, t) {
				(this.projectId = e), (this.database = t || eY);
			}
			static empty() {
				return new eZ("", "");
			}
			get isDefaultDatabase() {
				return this.database === eY;
			}
			isEqual(e) {
				return (
					e instanceof eZ &&
					e.projectId === this.projectId &&
					e.database === this.database
				);
			}
		}
		const e0 = "__type__",
			e1 = "__max__",
			e2 = {},
			e6 = "__vector__",
			e3 = "value";
		function e5(e) {
			return "nullValue" in e
				? 0
				: "booleanValue" in e
					? 1
					: "integerValue" in e || "doubleValue" in e
						? 2
						: "timestampValue" in e
							? 3
							: "stringValue" in e
								? 5
								: "bytesValue" in e
									? 6
									: "referenceValue" in e
										? 7
										: "geoPointValue" in e
											? 8
											: "arrayValue" in e
												? 9
												: "mapValue" in e
													? eW(e)
														? 4
														: th(e)
															? 0x1fffffffffffff
															: tl(e)
																? 10
																: 11
													: j(28295, { value: e });
		}
		function e4(e, t) {
			if (e === t) return !0;
			const r = e5(e);
			if (r !== e5(t)) return !1;
			switch (r) {
				case 0:
				case 0x1fffffffffffff:
					return !0;
				case 1:
					return e.booleanValue === t.booleanValue;
				case 4:
					return eJ(e).isEqual(eJ(t));
				case 3: {
					if (
						"string" == typeof e.timestampValue &&
						"string" == typeof t.timestampValue &&
						e.timestampValue.length === t.timestampValue.length
					)
						return e.timestampValue === t.timestampValue;
					const n = eB(e.timestampValue),
						i = eB(t.timestampValue);
					return n.seconds === i.seconds && n.nanos === i.nanos;
				}
				case 5:
					return e.stringValue === t.stringValue;
				case 6:
					return e$(e.bytesValue).isEqual(e$(t.bytesValue));
				case 7:
					return e.referenceValue === t.referenceValue;
				case 8:
					return (
						eq(e.geoPointValue.latitude) === eq(t.geoPointValue.latitude) &&
						eq(e.geoPointValue.longitude) === eq(t.geoPointValue.longitude)
					);
				case 2:
					if ("integerValue" in e && "integerValue" in t)
						return eq(e.integerValue) === eq(t.integerValue);
					if ("doubleValue" in e && "doubleValue" in t) {
						const r = eq(e.doubleValue),
							n = eq(t.doubleValue);
						return r === n ? ek(r) === ek(n) : isNaN(r) && isNaN(n);
					}
					return !1;
				case 9:
					return es(e.arrayValue.values || [], t.arrayValue.values || [], e4);
				case 10:
				case 11: {
					const s = e.mapValue.fields || {},
						a = t.mapValue.fields || {};
					if (eR(s) !== eR(a)) return !1;
					for (const e in s)
						if (Object.hasOwn(s, e) && (void 0 === a[e] || !e4(s[e], a[e])))
							return !1;
					return !0;
				}
				default:
					return j(52216, { left: e });
			}
		}
		function e8(e, t) {
			return void 0 !== (e.values || []).find((e) => e4(e, t));
		}
		function e7(e, t) {
			var r, n, i, s, a, o, l, u, h, c;
			if (e === t) return 0;
			const d = e5(e),
				f = e5(t);
			if (d !== f) return er(d, f);
			switch (d) {
				case 0:
				case 0x1fffffffffffff:
					return 0;
				case 1:
					return er(e.booleanValue, t.booleanValue);
				case 2: {
					let p, g;
					return (
						(p = eq(e.integerValue || e.doubleValue)),
						p < (g = eq(t.integerValue || t.doubleValue))
							? -1
							: p > g
								? 1
								: p === g
									? 0
									: isNaN(p)
										? isNaN(g)
											? 0
											: -1
										: 1
					);
				}
				case 3:
					return e9(e.timestampValue, t.timestampValue);
				case 4:
					return e9(eJ(e), eJ(t));
				case 5:
					return en(e.stringValue, t.stringValue);
				case 6: {
					let m, y;
					return (
						(r = e.bytesValue),
						(n = t.bytesValue),
						(m = e$(r)),
						(y = e$(n)),
						m.compareTo(y)
					);
				}
				case 7:
					return ((e, t) => {
						const r = e.split("/"),
							n = t.split("/");
						for (let e = 0; e < r.length && e < n.length; e++) {
							const t = er(r[e], n[e]);
							if (0 !== t) return t;
						}
						return er(r.length, n.length);
					})(e.referenceValue, t.referenceValue);
				case 8: {
					let v;
					return (
						(i = e.geoPointValue),
						(s = t.geoPointValue),
						0 !== (v = er(eq(i.latitude), eq(s.latitude)))
							? v
							: er(eq(i.longitude), eq(s.longitude))
					);
				}
				case 9:
					return te(e.arrayValue, t.arrayValue);
				case 10: {
					let w, _, E, b, I;
					return (
						(a = e.mapValue),
						(o = t.mapValue),
						(w = a.fields || {}),
						(_ = o.fields || {}),
						(E = null == (l = w[e3]) ? void 0 : l.arrayValue),
						(b = null == (u = _[e3]) ? void 0 : u.arrayValue),
						0 !==
						(I = er(
							(null == (h = null == E ? void 0 : E.values)
								? void 0
								: h.length) || 0,
							(null == (c = null == b ? void 0 : b.values)
								? void 0
								: c.length) || 0,
						))
							? I
							: te(E, b)
					);
				}
				case 11:
					return ((e, t) => {
						if (e === e2 && t === e2) return 0;
						if (e === e2) return 1;
						if (t === e2) return -1;
						const r = e.fields || {},
							n = Object.keys(r),
							i = t.fields || {},
							s = Object.keys(i);
						n.sort(), s.sort();
						for (let e = 0; e < n.length && e < s.length; ++e) {
							const t = en(n[e], s[e]);
							if (0 !== t) return t;
							const a = e7(r[n[e]], i[s[e]]);
							if (0 !== a) return a;
						}
						return er(n.length, s.length);
					})(e.mapValue, t.mapValue);
				default:
					throw j(23264, { le: d });
			}
		}
		function e9(e, t) {
			if ("string" == typeof e && "string" == typeof t && e.length === t.length)
				return er(e, t);
			const r = eB(e),
				n = eB(t),
				i = er(r.seconds, n.seconds);
			return 0 !== i ? i : er(r.nanos, n.nanos);
		}
		function te(e, t) {
			const r = e.values || [],
				n = t.values || [];
			for (let e = 0; e < r.length && e < n.length; ++e) {
				const t = e7(r[e], n[e]);
				if (t) return t;
			}
			return er(r.length, n.length);
		}
		function tt(e) {
			var t, r;
			let n;
			return "nullValue" in e
				? "null"
				: "booleanValue" in e
					? "" + e.booleanValue
					: "integerValue" in e
						? "" + e.integerValue
						: "doubleValue" in e
							? "" + e.doubleValue
							: "timestampValue" in e
								? ((n = eB(e.timestampValue)), `time(${n.seconds},${n.nanos})`)
								: "stringValue" in e
									? e.stringValue
									: "bytesValue" in e
										? e$(e.bytesValue).toBase64()
										: "referenceValue" in e
											? ((t = e.referenceValue), ec.fromName(t).toString())
											: "geoPointValue" in e
												? ((r = e.geoPointValue),
													`geo(${r.latitude},${r.longitude})`)
												: "arrayValue" in e
													? ((e) => {
															let t = "[",
																r = !0;
															for (const n of e.values || [])
																r ? (r = !1) : (t += ","), (t += tt(n));
															return t + "]";
														})(e.arrayValue)
													: "mapValue" in e
														? ((e) => {
																let t = Object.keys(e.fields || {}).sort(),
																	r = "{",
																	n = !0;
																for (const i of t)
																	n ? (n = !1) : (r += ","),
																		(r += `${i}:${tt(e.fields[i])}`);
																return r + "}";
															})(e.mapValue)
														: j(61005, { value: e });
		}
		function tr(e, t) {
			return {
				referenceValue: `projects/${e.projectId}/databases/${e.database}/documents/${t.path.canonicalString()}`,
			};
		}
		function tn(e) {
			return !!e && "integerValue" in e;
		}
		function ti(e) {
			return !!e && "arrayValue" in e;
		}
		function ts(e) {
			return !!e && "nullValue" in e;
		}
		function ta(e) {
			return !!e && "doubleValue" in e && isNaN(Number(e.doubleValue));
		}
		function to(e) {
			return !!e && "mapValue" in e;
		}
		function tl(e) {
			var t, r;
			return (
				(null ==
				(r = ((null == (t = null == e ? void 0 : e.mapValue)
					? void 0
					: t.fields) || {})[e0])
					? void 0
					: r.stringValue) === e6
			);
		}
		function tu(e) {
			if (e.geoPointValue)
				return { geoPointValue: Object.assign({}, e.geoPointValue) };
			if (e.timestampValue && "object" == typeof e.timestampValue)
				return { timestampValue: Object.assign({}, e.timestampValue) };
			if (e.mapValue) {
				const t = { mapValue: { fields: {} } };
				return (
					eN(e.mapValue.fields, (e, r) => (t.mapValue.fields[e] = tu(r))), t
				);
			}
			if (e.arrayValue) {
				const t = { arrayValue: { values: [] } };
				for (let r = 0; r < (e.arrayValue.values || []).length; ++r)
					t.arrayValue.values[r] = tu(e.arrayValue.values[r]);
				return t;
			}
			return Object.assign({}, e);
		}
		function th(e) {
			return (
				(((e.mapValue || {}).fields || {}).__type__ || {}).stringValue === e1
			);
		}
		class tc {
			constructor(e) {
				this.value = e;
			}
			static empty() {
				return new tc({ mapValue: {} });
			}
			field(e) {
				if (e.isEmpty()) return this.value;
				{
					let t = this.value;
					for (let r = 0; r < e.length - 1; ++r)
						if (!to((t = (t.mapValue.fields || {})[e.get(r)]))) return null;
					return (t = (t.mapValue.fields || {})[e.lastSegment()]) || null;
				}
			}
			set(e, t) {
				this.getFieldsMap(e.popLast())[e.lastSegment()] = tu(t);
			}
			setAll(e) {
				let t = eh.emptyPath(),
					r = {},
					n = [];
				e.forEach((e, i) => {
					if (!t.isImmediateParentOf(i)) {
						const e = this.getFieldsMap(t);
						this.applyChanges(e, r, n), (r = {}), (n = []), (t = i.popLast());
					}
					e ? (r[i.lastSegment()] = tu(e)) : n.push(i.lastSegment());
				});
				const i = this.getFieldsMap(t);
				this.applyChanges(i, r, n);
			}
			delete(e) {
				const t = this.field(e.popLast());
				to(t) && t.mapValue.fields && delete t.mapValue.fields[e.lastSegment()];
			}
			isEqual(e) {
				return e4(this.value, e.value);
			}
			getFieldsMap(e) {
				let t = this.value;
				t.mapValue.fields || (t.mapValue = { fields: {} });
				for (let r = 0; r < e.length; ++r) {
					let n = t.mapValue.fields[e.get(r)];
					(to(n) && n.mapValue.fields) ||
						((n = { mapValue: { fields: {} } }),
						(t.mapValue.fields[e.get(r)] = n)),
						(t = n);
				}
				return t.mapValue.fields;
			}
			applyChanges(e, t, r) {
				for (const n of (eN(t, (t, r) => (e[t] = r)), r)) delete e[n];
			}
			clone() {
				return new tc(tu(this.value));
			}
		}
		class td {
			constructor(e, t, r, n, i, s, a) {
				(this.key = e),
					(this.documentType = t),
					(this.version = r),
					(this.readTime = n),
					(this.createTime = i),
					(this.data = s),
					(this.documentState = a);
			}
			static newInvalidDocument(e) {
				return new td(e, 0, eE.min(), eE.min(), eE.min(), tc.empty(), 0);
			}
			static newFoundDocument(e, t, r, n) {
				return new td(e, 1, t, eE.min(), r, n, 0);
			}
			static newNoDocument(e, t) {
				return new td(e, 2, t, eE.min(), eE.min(), tc.empty(), 0);
			}
			static newUnknownDocument(e, t) {
				return new td(e, 3, t, eE.min(), eE.min(), tc.empty(), 2);
			}
			convertToFoundDocument(e, t) {
				return (
					this.createTime.isEqual(eE.min()) &&
						(2 === this.documentType || 0 === this.documentType) &&
						(this.createTime = e),
					(this.version = e),
					(this.documentType = 1),
					(this.data = t),
					(this.documentState = 0),
					this
				);
			}
			convertToNoDocument(e) {
				return (
					(this.version = e),
					(this.documentType = 2),
					(this.data = tc.empty()),
					(this.documentState = 0),
					this
				);
			}
			convertToUnknownDocument(e) {
				return (
					(this.version = e),
					(this.documentType = 3),
					(this.data = tc.empty()),
					(this.documentState = 2),
					this
				);
			}
			setHasCommittedMutations() {
				return (this.documentState = 2), this;
			}
			setHasLocalMutations() {
				return (this.documentState = 1), (this.version = eE.min()), this;
			}
			setReadTime(e) {
				return (this.readTime = e), this;
			}
			get hasLocalMutations() {
				return 1 === this.documentState;
			}
			get hasCommittedMutations() {
				return 2 === this.documentState;
			}
			get hasPendingWrites() {
				return this.hasLocalMutations || this.hasCommittedMutations;
			}
			isValidDocument() {
				return 0 !== this.documentType;
			}
			isFoundDocument() {
				return 1 === this.documentType;
			}
			isNoDocument() {
				return 2 === this.documentType;
			}
			isUnknownDocument() {
				return 3 === this.documentType;
			}
			isEqual(e) {
				return (
					e instanceof td &&
					this.key.isEqual(e.key) &&
					this.version.isEqual(e.version) &&
					this.documentType === e.documentType &&
					this.documentState === e.documentState &&
					this.data.isEqual(e.data)
				);
			}
			mutableCopy() {
				return new td(
					this.key,
					this.documentType,
					this.version,
					this.readTime,
					this.createTime,
					this.data.clone(),
					this.documentState,
				);
			}
			toString() {
				return `Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`;
			}
		}
		class tf {
			constructor(e, t) {
				(this.position = e), (this.inclusive = t);
			}
		}
		function tp(e, t, r) {
			let n = 0;
			for (let i = 0; i < e.position.length; i++) {
				const s = t[i],
					a = e.position[i];
				if (
					((n = s.field.isKeyField()
						? ec.comparator(ec.fromName(a.referenceValue), r.key)
						: e7(a, r.data.field(s.field))),
					"desc" === s.dir && (n *= -1),
					0 !== n)
				)
					break;
			}
			return n;
		}
		function tg(e, t) {
			if (null === e) return null === t;
			if (
				null === t ||
				e.inclusive !== t.inclusive ||
				e.position.length !== t.position.length
			)
				return !1;
			for (let r = 0; r < e.position.length; r++)
				if (!e4(e.position[r], t.position[r])) return !1;
			return !0;
		}
		class tm {
			constructor(e, t = "asc") {
				(this.field = e), (this.dir = t);
			}
		}
		class ty {}
		class tv extends ty {
			constructor(e, t, r) {
				super(), (this.field = e), (this.op = t), (this.value = r);
			}
			static create(e, t, r) {
				return e.isKeyField()
					? "in" === t || "not-in" === t
						? tv.createKeyFieldInFilter(e, t, r)
						: new tb(e, t, r)
					: "array-contains" === t
						? new tC(e, r)
						: "in" === t
							? new tA(e, r)
							: "not-in" === t
								? new tk(e, r)
								: "array-contains-any" === t
									? new tR(e, r)
									: new tv(e, t, r);
			}
			static createKeyFieldInFilter(e, t, r) {
				return "in" === t ? new tI(e, r) : new tT(e, r);
			}
			matches(e) {
				const t = e.data.field(this.field);
				return "!=" === this.op
					? null !== t &&
							void 0 === t.nullValue &&
							this.matchesComparison(e7(t, this.value))
					: null !== t &&
							e5(this.value) === e5(t) &&
							this.matchesComparison(e7(t, this.value));
			}
			matchesComparison(e) {
				switch (this.op) {
					case "<":
						return e < 0;
					case "<=":
						return e <= 0;
					case "==":
						return 0 === e;
					case "!=":
						return 0 !== e;
					case ">":
						return e > 0;
					case ">=":
						return e >= 0;
					default:
						return j(47266, { operator: this.op });
				}
			}
			isInequality() {
				return ["<", "<=", ">", ">=", "!=", "not-in"].indexOf(this.op) >= 0;
			}
			getFlattenedFilters() {
				return [this];
			}
			getFilters() {
				return [this];
			}
		}
		class tw extends ty {
			constructor(e, t) {
				super(), (this.filters = e), (this.op = t), (this.he = null);
			}
			static create(e, t) {
				return new tw(e, t);
			}
			matches(e) {
				return t_(this)
					? void 0 === this.filters.find((t) => !t.matches(e))
					: void 0 !== this.filters.find((t) => t.matches(e));
			}
			getFlattenedFilters() {
				return (
					null !== this.he ||
						(this.he = this.filters.reduce(
							(e, t) => e.concat(t.getFlattenedFilters()),
							[],
						)),
					this.he
				);
			}
			getFilters() {
				return Object.assign([], this.filters);
			}
		}
		function t_(e) {
			return "and" === e.op;
		}
		function tE(e) {
			for (const t of e.filters) if (t instanceof tw) return !1;
			return !0;
		}
		class tb extends tv {
			constructor(e, t, r) {
				super(e, t, r), (this.key = ec.fromName(r.referenceValue));
			}
			matches(e) {
				const t = ec.comparator(e.key, this.key);
				return this.matchesComparison(t);
			}
		}
		class tI extends tv {
			constructor(e, t) {
				super(e, "in", t), (this.keys = tS("in", t));
			}
			matches(e) {
				return this.keys.some((t) => t.isEqual(e.key));
			}
		}
		class tT extends tv {
			constructor(e, t) {
				super(e, "not-in", t), (this.keys = tS("not-in", t));
			}
			matches(e) {
				return !this.keys.some((t) => t.isEqual(e.key));
			}
		}
		function tS(e, t) {
			var r;
			return ((null == (r = t.arrayValue) ? void 0 : r.values) || []).map((e) =>
				ec.fromName(e.referenceValue),
			);
		}
		class tC extends tv {
			constructor(e, t) {
				super(e, "array-contains", t);
			}
			matches(e) {
				const t = e.data.field(this.field);
				return ti(t) && e8(t.arrayValue, this.value);
			}
		}
		class tA extends tv {
			constructor(e, t) {
				super(e, "in", t);
			}
			matches(e) {
				const t = e.data.field(this.field);
				return null !== t && e8(this.value.arrayValue, t);
			}
		}
		class tk extends tv {
			constructor(e, t) {
				super(e, "not-in", t);
			}
			matches(e) {
				if (e8(this.value.arrayValue, { nullValue: "NULL_VALUE" })) return !1;
				const t = e.data.field(this.field);
				return (
					null !== t && void 0 === t.nullValue && !e8(this.value.arrayValue, t)
				);
			}
		}
		class tR extends tv {
			constructor(e, t) {
				super(e, "array-contains-any", t);
			}
			matches(e) {
				const t = e.data.field(this.field);
				return (
					!(!ti(t) || !t.arrayValue.values) &&
					t.arrayValue.values.some((e) => e8(this.value.arrayValue, e))
				);
			}
		}
		class tN {
			constructor(e, t = null, r = [], n = [], i = null, s = null, a = null) {
				(this.path = e),
					(this.collectionGroup = t),
					(this.orderBy = r),
					(this.filters = n),
					(this.limit = i),
					(this.startAt = s),
					(this.endAt = a),
					(this.Pe = null);
			}
		}
		function tD(e, t = null, r = [], n = [], i = null, s = null, a = null) {
			return new tN(e, t, r, n, i, s, a);
		}
		function tO(e) {
			if (null === e.Pe) {
				let t = e.path.canonicalString();
				null !== e.collectionGroup && (t += "|cg:" + e.collectionGroup),
					(t += "|f:"),
					(t += e.filters
						.map((e) =>
							(function e(t) {
								if (t instanceof tv)
									return (
										t.field.canonicalString() + t.op.toString() + tt(t.value)
									);
								if (tE(t) && t_(t)) return t.filters.map((t) => e(t)).join(",");
								{
									const r = t.filters.map((t) => e(t)).join(",");
									return `${t.op}(${r})`;
								}
							})(e),
						)
						.join(",")),
					(t += "|ob:"),
					(t += e.orderBy
						.map((e) => e.field.canonicalString() + e.dir)
						.join(",")),
					null == e.limit || ((t += "|l:"), (t += e.limit)),
					e.startAt &&
						((t += "|lb:"),
						(t += e.startAt.inclusive ? "b:" : "a:"),
						(t += e.startAt.position.map((e) => tt(e)).join(","))),
					e.endAt &&
						((t += "|ub:"),
						(t += e.endAt.inclusive ? "a:" : "b:"),
						(t += e.endAt.position.map((e) => tt(e)).join(","))),
					(e.Pe = t);
			}
			return e.Pe;
		}
		function tP(e, t) {
			if (e.limit !== t.limit || e.orderBy.length !== t.orderBy.length)
				return !1;
			for (let i = 0; i < e.orderBy.length; i++) {
				var r, n;
				if (
					((r = e.orderBy[i]),
					(n = t.orderBy[i]),
					!(r.dir === n.dir && r.field.isEqual(n.field)))
				)
					return !1;
			}
			if (e.filters.length !== t.filters.length) return !1;
			for (let r = 0; r < e.filters.length; r++)
				if (
					!(function e(t, r) {
						return t instanceof tv
							? r instanceof tv &&
									t.op === r.op &&
									t.field.isEqual(r.field) &&
									e4(t.value, r.value)
							: t instanceof tw
								? r instanceof tw &&
									t.op === r.op &&
									t.filters.length === r.filters.length &&
									t.filters.reduce((t, n, i) => t && e(n, r.filters[i]), !0)
								: void j(19439);
					})(e.filters[r], t.filters[r])
				)
					return !1;
			return (
				e.collectionGroup === t.collectionGroup &&
				!!e.path.isEqual(t.path) &&
				!!tg(e.startAt, t.startAt) &&
				tg(e.endAt, t.endAt)
			);
		}
		function tx(e) {
			return (
				ec.isDocumentKey(e.path) &&
				null === e.collectionGroup &&
				0 === e.filters.length
			);
		}
		class tL {
			constructor(
				e,
				t = null,
				r = [],
				n = [],
				i = null,
				s = "F",
				a = null,
				o = null,
			) {
				(this.path = e),
					(this.collectionGroup = t),
					(this.explicitOrderBy = r),
					(this.filters = n),
					(this.limit = i),
					(this.limitType = s),
					(this.startAt = a),
					(this.endAt = o),
					(this.Te = null),
					(this.Ie = null),
					(this.de = null),
					this.startAt,
					this.endAt;
			}
		}
		function tM(e) {
			return new tL(e);
		}
		function tU(e) {
			return (
				0 === e.filters.length &&
				null === e.limit &&
				null == e.startAt &&
				null == e.endAt &&
				(0 === e.explicitOrderBy.length ||
					(1 === e.explicitOrderBy.length &&
						e.explicitOrderBy[0].field.isKeyField()))
			);
		}
		function tV(e) {
			return null !== e.collectionGroup;
		}
		function tF(e) {
			if (null === e.Te) {
				let t;
				e.Te = [];
				const r = new Set();
				for (const t of e.explicitOrderBy)
					e.Te.push(t), r.add(t.field.canonicalString());
				const n =
					e.explicitOrderBy.length > 0
						? e.explicitOrderBy[e.explicitOrderBy.length - 1].dir
						: "asc";
				((t = new eL(eh.comparator)),
				e.filters.forEach((e) => {
					e.getFlattenedFilters().forEach((e) => {
						e.isInequality() && (t = t.add(e.field));
					});
				}),
				t).forEach((t) => {
					r.has(t.canonicalString()) ||
						t.isKeyField() ||
						e.Te.push(new tm(t, n));
				}),
					r.has(eh.keyField().canonicalString()) ||
						e.Te.push(new tm(eh.keyField(), n));
			}
			return e.Te;
		}
		function tj(e) {
			return (
				e.Ie ||
					(e.Ie = ((e, t) => {
						if ("F" === e.limitType)
							return tD(
								e.path,
								e.collectionGroup,
								t,
								e.filters,
								e.limit,
								e.startAt,
								e.endAt,
							);
						{
							t = t.map((e) => {
								const t = "desc" === e.dir ? "asc" : "desc";
								return new tm(e.field, t);
							});
							const r = e.endAt
									? new tf(e.endAt.position, e.endAt.inclusive)
									: null,
								n = e.startAt
									? new tf(e.startAt.position, e.startAt.inclusive)
									: null;
							return tD(e.path, e.collectionGroup, t, e.filters, e.limit, r, n);
						}
					})(e, tF(e))),
				e.Ie
			);
		}
		function tB(e, t) {
			const r = e.filters.concat([t]);
			return new tL(
				e.path,
				e.collectionGroup,
				e.explicitOrderBy.slice(),
				r,
				e.limit,
				e.limitType,
				e.startAt,
				e.endAt,
			);
		}
		function tq(e, t, r) {
			return new tL(
				e.path,
				e.collectionGroup,
				e.explicitOrderBy.slice(),
				e.filters.slice(),
				t,
				r,
				e.startAt,
				e.endAt,
			);
		}
		function t$(e, t) {
			return tP(tj(e), tj(t)) && e.limitType === t.limitType;
		}
		function tz(e) {
			return `${tO(tj(e))}|lt:${e.limitType}`;
		}
		function tH(e) {
			var t;
			let r;
			return `Query(target=${
				((r = (t = tj(e)).path.canonicalString()),
				null !== t.collectionGroup &&
					(r += " collectionGroup=" + t.collectionGroup),
				t.filters.length > 0 &&
					(r += `, filters: [${t.filters
						.map((e) =>
							(function e(t) {
								return t instanceof tv
									? `${t.field.canonicalString()} ${t.op} ${tt(t.value)}`
									: t instanceof tw
										? t.op.toString() +
											" {" +
											t.getFilters().map(e).join(" ,") +
											"}"
										: "Filter";
							})(e),
						)
						.join(", ")}]`),
				null == t.limit || (r += ", limit: " + t.limit),
				t.orderBy.length > 0 &&
					(r += `, orderBy: [${t.orderBy.map((e) => `${e.field.canonicalString()} (${e.dir})`).join(", ")}]`),
				t.startAt &&
					((r += ", startAt: "),
					(r += t.startAt.inclusive ? "b:" : "a:"),
					(r += t.startAt.position.map((e) => tt(e)).join(","))),
				t.endAt &&
					((r += ", endAt: "),
					(r += t.endAt.inclusive ? "a:" : "b:"),
					(r += t.endAt.position.map((e) => tt(e)).join(","))),
				`Target(${r})`)
			}; limitType=${e.limitType})`;
		}
		function tG(e, t) {
			var r, n, i, s;
			let a, o, l;
			return (
				t.isFoundDocument() &&
				((a = t.key.path),
				null !== e.collectionGroup
					? t.key.hasCollectionId(e.collectionGroup) && e.path.isPrefixOf(a)
					: ec.isDocumentKey(e.path)
						? e.path.isEqual(a)
						: e.path.isImmediateParentOf(a)) &&
				((e, t) => {
					for (const r of tF(e))
						if (!r.field.isKeyField() && null === t.data.field(r.field))
							return !1;
					return !0;
				})(e, t) &&
				((e, t) => {
					for (const r of e.filters) if (!r.matches(t)) return !1;
					return !0;
				})(e, t) &&
				((r = e),
				(n = t),
				(!r.startAt ||
					((i = r.startAt),
					(o = tp(i, tF(r), n)),
					i.inclusive ? !!(o <= 0) : !!(o < 0))) &&
					(!r.endAt ||
						((s = r.endAt),
						(l = tp(s, tF(r), n)),
						s.inclusive ? !!(l >= 0) : !!(l > 0))))
			);
		}
		function tK(e) {
			return (t, r) => {
				let n = !1;
				for (const i of tF(e)) {
					const e = ((e, t, r) => {
						var n;
						let i,
							s,
							a = e.field.isKeyField()
								? ec.comparator(t.key, r.key)
								: ((n = e.field),
									(i = t.data.field(n)),
									(s = r.data.field(n)),
									null !== i && null !== s ? e7(i, s) : j(42886));
						switch (e.dir) {
							case "asc":
								return a;
							case "desc":
								return -1 * a;
							default:
								return j(19790, { direction: e.dir });
						}
					})(i, t, r);
					if (0 !== e) return e;
					n = n || i.field.isKeyField();
				}
				return 0;
			};
		}
		class tW {
			constructor(e, t) {
				(this.mapKeyFn = e),
					(this.equalsFn = t),
					(this.inner = {}),
					(this.innerSize = 0);
			}
			get(e) {
				const t = this.mapKeyFn(e),
					r = this.inner[t];
				if (void 0 !== r) {
					for (const [t, n] of r) if (this.equalsFn(t, e)) return n;
				}
			}
			has(e) {
				return void 0 !== this.get(e);
			}
			set(e, t) {
				const r = this.mapKeyFn(e),
					n = this.inner[r];
				if (void 0 === n)
					return (this.inner[r] = [[e, t]]), void this.innerSize++;
				for (let r = 0; r < n.length; r++)
					if (this.equalsFn(n[r][0], e)) return void (n[r] = [e, t]);
				n.push([e, t]), this.innerSize++;
			}
			delete(e) {
				const t = this.mapKeyFn(e),
					r = this.inner[t];
				if (void 0 === r) return !1;
				for (let n = 0; n < r.length; n++)
					if (this.equalsFn(r[n][0], e))
						return (
							1 === r.length ? delete this.inner[t] : r.splice(n, 1),
							this.innerSize--,
							!0
						);
				return !1;
			}
			forEach(e) {
				eN(this.inner, (t, r) => {
					for (const [t, n] of r) e(t, n);
				});
			}
			isEmpty() {
				return eD(this.inner);
			}
			size() {
				return this.innerSize;
			}
		}
		const tQ = new eO(ec.comparator),
			tJ = new eO(ec.comparator);
		function tX(...e) {
			let t = tJ;
			for (const r of e) t = t.insert(r.key, r);
			return t;
		}
		function tY(e) {
			let t = tJ;
			return e.forEach((e, r) => (t = t.insert(e, r.overlayedDocument))), t;
		}
		function tZ() {
			return new tW(
				(e) => e.toString(),
				(e, t) => e.isEqual(t),
			);
		}
		const t0 = new eO(ec.comparator),
			t1 = new eL(ec.comparator);
		function t2(...e) {
			let t = t1;
			for (const r of e) t = t.add(r);
			return t;
		}
		const t6 = new eL(er);
		function t3(e, t) {
			if (e.useProto3Json) {
				if (isNaN(t)) return { doubleValue: "NaN" };
				if (t === 1 / 0) return { doubleValue: "Infinity" };
				if (t === -1 / 0) return { doubleValue: "-Infinity" };
			}
			return { doubleValue: ek(t) ? "-0" : t };
		}
		function t5(e) {
			return { integerValue: "" + e };
		}
		class t4 {
			constructor() {
				this._ = void 0;
			}
		}
		function t8(e, t) {
			return e instanceof rn
				? tn(t) || (t && "doubleValue" in t)
					? t
					: { integerValue: 0 }
				: null;
		}
		class t7 extends t4 {}
		class t9 extends t4 {
			constructor(e) {
				super(), (this.elements = e);
			}
		}
		function re(e, t) {
			const r = rs(t);
			for (const t of e.elements) r.some((e) => e4(e, t)) || r.push(t);
			return { arrayValue: { values: r } };
		}
		class rt extends t4 {
			constructor(e) {
				super(), (this.elements = e);
			}
		}
		function rr(e, t) {
			let r = rs(t);
			for (const t of e.elements) r = r.filter((e) => !e4(e, t));
			return { arrayValue: { values: r } };
		}
		class rn extends t4 {
			constructor(e, t) {
				super(), (this.serializer = e), (this.Ee = t);
			}
		}
		function ri(e) {
			return eq(e.integerValue || e.doubleValue);
		}
		function rs(e) {
			return ti(e) && e.arrayValue.values ? e.arrayValue.values.slice() : [];
		}
		class ra {
			constructor(e, t) {
				(this.version = e), (this.transformResults = t);
			}
		}
		class ro {
			constructor(e, t) {
				(this.updateTime = e), (this.exists = t);
			}
			static none() {
				return new ro();
			}
			static exists(e) {
				return new ro(void 0, e);
			}
			static updateTime(e) {
				return new ro(e);
			}
			get isNone() {
				return void 0 === this.updateTime && void 0 === this.exists;
			}
			isEqual(e) {
				return (
					this.exists === e.exists &&
					(this.updateTime
						? !!e.updateTime && this.updateTime.isEqual(e.updateTime)
						: !e.updateTime)
				);
			}
		}
		function rl(e, t) {
			return void 0 !== e.updateTime
				? t.isFoundDocument() && t.version.isEqual(e.updateTime)
				: void 0 === e.exists || e.exists === t.isFoundDocument();
		}
		class ru {}
		function rh(e, t) {
			if (!e.hasLocalMutations || (t && 0 === t.fields.length)) return null;
			if (null === t)
				return e.isNoDocument()
					? new rv(e.key, ro.none())
					: new rf(e.key, e.data, ro.none());
			{
				let r = e.data,
					n = tc.empty(),
					i = new eL(eh.comparator);
				for (let e of t.fields)
					if (!i.has(e)) {
						let t = r.field(e);
						null === t && e.length > 1 && ((e = e.popLast()), (t = r.field(e))),
							null === t ? n.delete(e) : n.set(e, t),
							(i = i.add(e));
					}
				return new rp(e.key, n, new eU(i.toArray()), ro.none());
			}
		}
		function rc(e, t, r, n) {
			return e instanceof rf
				? ((e, t, r, n) => {
						if (!rl(e.precondition, t)) return r;
						const i = e.value.clone(),
							s = ry(e.fieldTransforms, n, t);
						return (
							i.setAll(s),
							t.convertToFoundDocument(t.version, i).setHasLocalMutations(),
							null
						);
					})(e, t, r, n)
				: e instanceof rp
					? ((e, t, r, n) => {
							if (!rl(e.precondition, t)) return r;
							const i = ry(e.fieldTransforms, n, t),
								s = t.data;
							return (s.setAll(rg(e)),
							s.setAll(i),
							t.convertToFoundDocument(t.version, s).setHasLocalMutations(),
							null === r)
								? null
								: r
										.unionWith(e.fieldMask.fields)
										.unionWith(e.fieldTransforms.map((e) => e.field));
						})(e, t, r, n)
					: rl(e.precondition, t)
						? (t.convertToNoDocument(t.version).setHasLocalMutations(), null)
						: r;
		}
		function rd(e, t) {
			var r, n;
			return (
				e.type === t.type &&
				!!e.key.isEqual(t.key) &&
				!!e.precondition.isEqual(t.precondition) &&
				((r = e.fieldTransforms),
				(n = t.fieldTransforms),
				!!(
					(void 0 === r && void 0 === n) ||
					(!(!r || !n) &&
						es(r, n, (e, t) => {
							var r, n;
							return (
								e.field.isEqual(t.field) &&
								((r = e.transform),
								(n = t.transform),
								(r instanceof t9 && n instanceof t9) ||
								(r instanceof rt && n instanceof rt)
									? es(r.elements, n.elements, e4)
									: r instanceof rn && n instanceof rn
										? e4(r.Ee, n.Ee)
										: r instanceof t7 && n instanceof t7)
							);
						}))
				)) &&
				(0 === e.type
					? e.value.isEqual(t.value)
					: 1 !== e.type ||
						(e.data.isEqual(t.data) && e.fieldMask.isEqual(t.fieldMask)))
			);
		}
		class rf extends ru {
			constructor(e, t, r, n = []) {
				super(),
					(this.key = e),
					(this.value = t),
					(this.precondition = r),
					(this.fieldTransforms = n),
					(this.type = 0);
			}
			getFieldMask() {
				return null;
			}
		}
		class rp extends ru {
			constructor(e, t, r, n, i = []) {
				super(),
					(this.key = e),
					(this.data = t),
					(this.fieldMask = r),
					(this.precondition = n),
					(this.fieldTransforms = i),
					(this.type = 1);
			}
			getFieldMask() {
				return this.fieldMask;
			}
		}
		function rg(e) {
			const t = new Map();
			return (
				e.fieldMask.fields.forEach((r) => {
					if (!r.isEmpty()) {
						const n = e.data.field(r);
						t.set(r, n);
					}
				}),
				t
			);
		}
		function rm(e, t, r) {
			const n = new Map();
			q(e.length === r.length, 32656, { Ae: r.length, Re: e.length });
			for (let s = 0; s < r.length; s++) {
				var i;
				const a = e[s],
					o = a.transform,
					l = t.data.field(a.field);
				n.set(
					a.field,
					((i = r[s]),
					o instanceof t9 ? re(o, l) : o instanceof rt ? rr(o, l) : i),
				);
			}
			return n;
		}
		function ry(e, t, r) {
			const n = new Map();
			for (const i of e) {
				const e = i.transform,
					s = r.data.field(i.field);
				n.set(
					i.field,
					((e, t, r) => {
						var n;
						let i, s, a;
						return e instanceof t7
							? ((n = t),
								(i = {
									fields: {
										[eH]: { stringValue: ez },
										[eK]: {
											timestampValue: {
												seconds: r.seconds,
												nanos: r.nanoseconds,
											},
										},
									},
								}),
								n && eW(n) && (n = eQ(n)),
								n && (i.fields[eG] = n),
								{ mapValue: i })
							: e instanceof t9
								? re(e, t)
								: e instanceof rt
									? rr(e, t)
									: ((a = ri((s = t8(e, t))) + ri(e.Ee)),
										tn(s) && tn(e.Ee) ? t5(a) : t3(e.serializer, a));
					})(e, s, t),
				);
			}
			return n;
		}
		class rv extends ru {
			constructor(e, t) {
				super(),
					(this.key = e),
					(this.precondition = t),
					(this.type = 2),
					(this.fieldTransforms = []);
			}
			getFieldMask() {
				return null;
			}
		}
		class rw extends ru {
			constructor(e, t) {
				super(),
					(this.key = e),
					(this.precondition = t),
					(this.type = 3),
					(this.fieldTransforms = []);
			}
			getFieldMask() {
				return null;
			}
		}
		class r_ {
			constructor(e, t, r, n) {
				(this.batchId = e),
					(this.localWriteTime = t),
					(this.baseMutations = r),
					(this.mutations = n);
			}
			applyToRemoteDocument(e, t) {
				const r = t.mutationResults;
				for (let t = 0; t < this.mutations.length; t++) {
					const n = this.mutations[t];
					n.key.isEqual(e.key) &&
						((e, t, r) => {
							let n, i;
							e instanceof rf
								? ((n = e.value.clone()),
									(i = rm(e.fieldTransforms, t, r.transformResults)),
									n.setAll(i),
									t
										.convertToFoundDocument(r.version, n)
										.setHasCommittedMutations())
								: e instanceof rp
									? ((e, t, r) => {
											if (!rl(e.precondition, t))
												return t.convertToUnknownDocument(r.version);
											const n = rm(e.fieldTransforms, t, r.transformResults),
												i = t.data;
											i.setAll(rg(e)),
												i.setAll(n),
												t
													.convertToFoundDocument(r.version, i)
													.setHasCommittedMutations();
										})(e, t, r)
									: t.convertToNoDocument(r.version).setHasCommittedMutations();
						})(n, e, r[t]);
				}
			}
			applyToLocalView(e, t) {
				for (const r of this.baseMutations)
					r.key.isEqual(e.key) && (t = rc(r, e, t, this.localWriteTime));
				for (const r of this.mutations)
					r.key.isEqual(e.key) && (t = rc(r, e, t, this.localWriteTime));
				return t;
			}
			applyToLocalDocumentSet(e, t) {
				const r = tZ();
				return (
					this.mutations.forEach((n) => {
						let i = e.get(n.key),
							s = i.overlayedDocument,
							a = this.applyToLocalView(s, i.mutatedFields),
							o = rh(s, (a = t.has(n.key) ? null : a));
						null !== o && r.set(n.key, o),
							s.isValidDocument() || s.convertToNoDocument(eE.min());
					}),
					r
				);
			}
			keys() {
				return this.mutations.reduce((e, t) => e.add(t.key), t2());
			}
			isEqual(e) {
				return (
					this.batchId === e.batchId &&
					es(this.mutations, e.mutations, (e, t) => rd(e, t)) &&
					es(this.baseMutations, e.baseMutations, (e, t) => rd(e, t))
				);
			}
		}
		class rE {
			constructor(e, t, r, n) {
				(this.batch = e),
					(this.commitVersion = t),
					(this.mutationResults = r),
					(this.docVersions = n);
			}
			static from(e, t, r) {
				q(e.mutations.length === r.length, 58842, {
					Ve: e.mutations.length,
					me: r.length,
				});
				let n = t0,
					i = e.mutations;
				for (let e = 0; e < i.length; e++) n = n.insert(i[e].key, r[e].version);
				return new rE(e, t, r, n);
			}
		}
		class rb {
			constructor(e, t) {
				(this.largestBatchId = e), (this.mutation = t);
			}
			getKey() {
				return this.mutation.key;
			}
			isEqual(e) {
				return null !== e && this.mutation === e.mutation;
			}
			toString() {
				return `Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`;
			}
		}
		class rI {
			constructor(e, t) {
				(this.count = e), (this.unchangedNames = t);
			}
		}
		function rT(e) {
			if (void 0 === e) return U("GRPC error has no .code"), $.UNKNOWN;
			switch (e) {
				case g.OK:
					return $.OK;
				case g.CANCELLED:
					return $.CANCELLED;
				case g.UNKNOWN:
					return $.UNKNOWN;
				case g.DEADLINE_EXCEEDED:
					return $.DEADLINE_EXCEEDED;
				case g.RESOURCE_EXHAUSTED:
					return $.RESOURCE_EXHAUSTED;
				case g.INTERNAL:
					return $.INTERNAL;
				case g.UNAVAILABLE:
					return $.UNAVAILABLE;
				case g.UNAUTHENTICATED:
					return $.UNAUTHENTICATED;
				case g.INVALID_ARGUMENT:
					return $.INVALID_ARGUMENT;
				case g.NOT_FOUND:
					return $.NOT_FOUND;
				case g.ALREADY_EXISTS:
					return $.ALREADY_EXISTS;
				case g.PERMISSION_DENIED:
					return $.PERMISSION_DENIED;
				case g.FAILED_PRECONDITION:
					return $.FAILED_PRECONDITION;
				case g.ABORTED:
					return $.ABORTED;
				case g.OUT_OF_RANGE:
					return $.OUT_OF_RANGE;
				case g.UNIMPLEMENTED:
					return $.UNIMPLEMENTED;
				case g.DATA_LOSS:
					return $.DATA_LOSS;
				default:
					return j(39323, { code: e });
			}
		}
		((m = g || (g = {}))[(m.OK = 0)] = "OK"),
			(m[(m.CANCELLED = 1)] = "CANCELLED"),
			(m[(m.UNKNOWN = 2)] = "UNKNOWN"),
			(m[(m.INVALID_ARGUMENT = 3)] = "INVALID_ARGUMENT"),
			(m[(m.DEADLINE_EXCEEDED = 4)] = "DEADLINE_EXCEEDED"),
			(m[(m.NOT_FOUND = 5)] = "NOT_FOUND"),
			(m[(m.ALREADY_EXISTS = 6)] = "ALREADY_EXISTS"),
			(m[(m.PERMISSION_DENIED = 7)] = "PERMISSION_DENIED"),
			(m[(m.UNAUTHENTICATED = 16)] = "UNAUTHENTICATED"),
			(m[(m.RESOURCE_EXHAUSTED = 8)] = "RESOURCE_EXHAUSTED"),
			(m[(m.FAILED_PRECONDITION = 9)] = "FAILED_PRECONDITION"),
			(m[(m.ABORTED = 10)] = "ABORTED"),
			(m[(m.OUT_OF_RANGE = 11)] = "OUT_OF_RANGE"),
			(m[(m.UNIMPLEMENTED = 12)] = "UNIMPLEMENTED"),
			(m[(m.INTERNAL = 13)] = "INTERNAL"),
			(m[(m.UNAVAILABLE = 14)] = "UNAVAILABLE"),
			(m[(m.DATA_LOSS = 15)] = "DATA_LOSS");
		const rS = new s([0xffffffff, 0xffffffff], 0);
		function rC(e) {
			const t = ee().encode(e),
				r = new a();
			return r.update(t), new Uint8Array(r.digest());
		}
		function rA(e) {
			const t = new DataView(e.buffer),
				r = t.getUint32(0, !0),
				n = t.getUint32(4, !0),
				i = t.getUint32(8, !0),
				a = t.getUint32(12, !0);
			return [new s([r, n], 0), new s([i, a], 0)];
		}
		class rk {
			constructor(e, t, r) {
				if (
					((this.bitmap = e),
					(this.padding = t),
					(this.hashCount = r),
					t < 0 || t >= 8)
				)
					throw new rR(`Invalid padding: ${t}`);
				if (r < 0 || (e.length > 0 && 0 === this.hashCount))
					throw new rR(`Invalid hash count: ${r}`);
				if (0 === e.length && 0 !== t)
					throw new rR(`Invalid padding when bitmap length is 0: ${t}`);
				(this.fe = 8 * e.length - t), (this.ge = s.fromNumber(this.fe));
			}
			pe(e, t, r) {
				let n = e.add(t.multiply(s.fromNumber(r)));
				return (
					1 === n.compare(rS) && (n = new s([n.getBits(0), n.getBits(1)], 0)),
					n.modulo(this.ge).toNumber()
				);
			}
			ye(e) {
				return !!(this.bitmap[Math.floor(e / 8)] & (1 << (e % 8)));
			}
			mightContain(e) {
				if (0 === this.fe) return !1;
				const [t, r] = rA(rC(e));
				for (let e = 0; e < this.hashCount; e++) {
					const n = this.pe(t, r, e);
					if (!this.ye(n)) return !1;
				}
				return !0;
			}
			static create(e, t, r) {
				const n = new rk(
					new Uint8Array(Math.ceil(e / 8)),
					e % 8 == 0 ? 0 : 8 - (e % 8),
					t,
				);
				return r.forEach((e) => n.insert(e)), n;
			}
			insert(e) {
				if (0 === this.fe) return;
				const [t, r] = rA(rC(e));
				for (let e = 0; e < this.hashCount; e++) {
					const n = this.pe(t, r, e);
					this.we(n);
				}
			}
			we(e) {
				const t = Math.floor(e / 8);
				this.bitmap[t] |= 1 << (e % 8);
			}
		}
		class rR extends Error {
			constructor() {
				super(...arguments), (this.name = "BloomFilterError");
			}
		}
		class rN {
			constructor(e, t, r, n, i) {
				(this.snapshotVersion = e),
					(this.targetChanges = t),
					(this.targetMismatches = r),
					(this.documentUpdates = n),
					(this.resolvedLimboDocuments = i);
			}
			static createSynthesizedRemoteEventForCurrentChange(e, t, r) {
				const n = new Map();
				return (
					n.set(e, rD.createSynthesizedTargetChangeForCurrentChange(e, t, r)),
					new rN(eE.min(), n, new eO(er), tQ, t2())
				);
			}
		}
		class rD {
			constructor(e, t, r, n, i) {
				(this.resumeToken = e),
					(this.current = t),
					(this.addedDocuments = r),
					(this.modifiedDocuments = n),
					(this.removedDocuments = i);
			}
			static createSynthesizedTargetChangeForCurrentChange(e, t, r) {
				return new rD(r, t, t2(), t2(), t2());
			}
		}
		class rO {
			constructor(e, t, r, n) {
				(this.Se = e),
					(this.removedTargetIds = t),
					(this.key = r),
					(this.be = n);
			}
		}
		class rP {
			constructor(e, t) {
				(this.targetId = e), (this.De = t);
			}
		}
		class rx {
			constructor(e, t, r = eF.EMPTY_BYTE_STRING, n = null) {
				(this.state = e),
					(this.targetIds = t),
					(this.resumeToken = r),
					(this.cause = n);
			}
		}
		class rL {
			constructor() {
				(this.ve = 0),
					(this.Ce = rV()),
					(this.Fe = eF.EMPTY_BYTE_STRING),
					(this.Me = !1),
					(this.xe = !0);
			}
			get current() {
				return this.Me;
			}
			get resumeToken() {
				return this.Fe;
			}
			get Oe() {
				return 0 !== this.ve;
			}
			get Ne() {
				return this.xe;
			}
			Be(e) {
				e.approximateByteSize() > 0 && ((this.xe = !0), (this.Fe = e));
			}
			Le() {
				let e = t2(),
					t = t2(),
					r = t2();
				return (
					this.Ce.forEach((n, i) => {
						switch (i) {
							case 0:
								e = e.add(n);
								break;
							case 2:
								t = t.add(n);
								break;
							case 1:
								r = r.add(n);
								break;
							default:
								j(38017, { changeType: i });
						}
					}),
					new rD(this.Fe, this.Me, e, t, r)
				);
			}
			ke() {
				(this.xe = !1), (this.Ce = rV());
			}
			qe(e, t) {
				(this.xe = !0), (this.Ce = this.Ce.insert(e, t));
			}
			Qe(e) {
				(this.xe = !0), (this.Ce = this.Ce.remove(e));
			}
			$e() {
				this.ve += 1;
			}
			Ue() {
				(this.ve -= 1), q(this.ve >= 0, 3241, { ve: this.ve });
			}
			Ke() {
				(this.xe = !0), (this.Me = !0);
			}
		}
		class rM {
			constructor(e) {
				(this.We = e),
					(this.Ge = new Map()),
					(this.ze = tQ),
					(this.je = rU()),
					(this.Je = rU()),
					(this.He = new eO(er));
			}
			Ye(e) {
				for (const t of e.Se)
					e.be && e.be.isFoundDocument()
						? this.Ze(t, e.be)
						: this.Xe(t, e.key, e.be);
				for (const t of e.removedTargetIds) this.Xe(t, e.key, e.be);
			}
			et(e) {
				this.forEachTarget(e, (t) => {
					const r = this.tt(t);
					switch (e.state) {
						case 0:
							this.nt(t) && r.Be(e.resumeToken);
							break;
						case 1:
							r.Ue(), r.Oe || r.ke(), r.Be(e.resumeToken);
							break;
						case 2:
							r.Ue(), r.Oe || this.removeTarget(t);
							break;
						case 3:
							this.nt(t) && (r.Ke(), r.Be(e.resumeToken));
							break;
						case 4:
							this.nt(t) && (this.rt(t), r.Be(e.resumeToken));
							break;
						default:
							j(56790, { state: e.state });
					}
				});
			}
			forEachTarget(e, t) {
				e.targetIds.length > 0
					? e.targetIds.forEach(t)
					: this.Ge.forEach((e, r) => {
							this.nt(r) && t(r);
						});
			}
			it(e) {
				const t = e.targetId,
					r = e.De.count,
					n = this.st(t);
				if (n) {
					const i = n.target;
					if (tx(i))
						if (0 === r) {
							const e = new ec(i.path);
							this.Xe(t, e, td.newNoDocument(e, eE.min()));
						} else q(1 === r, 20013, { expectedCount: r });
					else {
						const n = this.ot(t);
						if (n !== r) {
							const r = this._t(e),
								i = r ? this.ut(r, e, n) : 1;
							0 !== i &&
								(this.rt(t),
								(this.He = this.He.insert(
									t,
									2 === i
										? "TargetPurposeExistenceFilterMismatchBloom"
										: "TargetPurposeExistenceFilterMismatch",
								)));
						}
					}
				}
			}
			_t(e) {
				let t,
					r,
					n = e.De.unchangedNames;
				if (!n || !n.bits) return null;
				const {
					bits: { bitmap: i = "", padding: s = 0 },
					hashCount: a = 0,
				} = n;
				try {
					t = e$(i).toUint8Array();
				} catch (e) {
					if (e instanceof eV)
						return (
							V(
								"Decoding the base64 bloom filter in existence filter failed (" +
									e.message +
									"); ignoring the bloom filter and falling back to full re-query.",
							),
							null
						);
					throw e;
				}
				try {
					r = new rk(t, s, a);
				} catch (e) {
					return (
						V(
							e instanceof rR
								? "BloomFilter error: "
								: "Applying bloom filter failed: ",
							e,
						),
						null
					);
				}
				return 0 === r.fe ? null : r;
			}
			ut(e, t, r) {
				return 2 * (t.De.count !== r - this.ht(e, t.targetId));
			}
			ht(e, t) {
				let r = this.We.getRemoteKeysForTarget(t),
					n = 0;
				return (
					r.forEach((r) => {
						const i = this.We.lt(),
							s = `projects/${i.projectId}/databases/${i.database}/documents/${r.path.canonicalString()}`;
						e.mightContain(s) || (this.Xe(t, r, null), n++);
					}),
					n
				);
			}
			Pt(e) {
				const t = new Map();
				this.Ge.forEach((r, n) => {
					const i = this.st(n);
					if (i) {
						if (r.current && tx(i.target)) {
							const t = new ec(i.target.path);
							this.Tt(t).has(n) ||
								this.It(n, t) ||
								this.Xe(n, t, td.newNoDocument(t, e));
						}
						r.Ne && (t.set(n, r.Le()), r.ke());
					}
				});
				let r = t2();
				this.Je.forEach((e, t) => {
					let n = !0;
					t.forEachWhile((e) => {
						const t = this.st(e);
						return (
							!t ||
							"TargetPurposeLimboResolution" === t.purpose ||
							((n = !1), !1)
						);
					}),
						n && (r = r.add(e));
				}),
					this.ze.forEach((t, r) => r.setReadTime(e));
				const n = new rN(e, t, this.He, this.ze, r);
				return (
					(this.ze = tQ),
					(this.je = rU()),
					(this.Je = rU()),
					(this.He = new eO(er)),
					n
				);
			}
			Ze(e, t) {
				if (!this.nt(e)) return;
				const r = 2 * !!this.It(e, t.key);
				this.tt(e).qe(t.key, r),
					(this.ze = this.ze.insert(t.key, t)),
					(this.je = this.je.insert(t.key, this.Tt(t.key).add(e))),
					(this.Je = this.Je.insert(t.key, this.dt(t.key).add(e)));
			}
			Xe(e, t, r) {
				if (!this.nt(e)) return;
				const n = this.tt(e);
				this.It(e, t) ? n.qe(t, 1) : n.Qe(t),
					(this.Je = this.Je.insert(t, this.dt(t).delete(e))),
					(this.Je = this.Je.insert(t, this.dt(t).add(e))),
					r && (this.ze = this.ze.insert(t, r));
			}
			removeTarget(e) {
				this.Ge.delete(e);
			}
			ot(e) {
				const t = this.tt(e).Le();
				return (
					this.We.getRemoteKeysForTarget(e).size +
					t.addedDocuments.size -
					t.removedDocuments.size
				);
			}
			$e(e) {
				this.tt(e).$e();
			}
			tt(e) {
				let t = this.Ge.get(e);
				return t || ((t = new rL()), this.Ge.set(e, t)), t;
			}
			dt(e) {
				let t = this.Je.get(e);
				return t || ((t = new eL(er)), (this.Je = this.Je.insert(e, t))), t;
			}
			Tt(e) {
				let t = this.je.get(e);
				return t || ((t = new eL(er)), (this.je = this.je.insert(e, t))), t;
			}
			nt(e) {
				const t = null !== this.st(e);
				return (
					t || M("WatchChangeAggregator", "Detected inactive target", e), t
				);
			}
			st(e) {
				const t = this.Ge.get(e);
				return t && t.Oe ? null : this.We.Et(e);
			}
			rt(e) {
				this.Ge.set(e, new rL()),
					this.We.getRemoteKeysForTarget(e).forEach((t) => {
						this.Xe(e, t, null);
					});
			}
			It(e, t) {
				return this.We.getRemoteKeysForTarget(e).has(t);
			}
		}
		function rU() {
			return new eO(ec.comparator);
		}
		function rV() {
			return new eO(ec.comparator);
		}
		const rF = { asc: "ASCENDING", desc: "DESCENDING" },
			rj = {
				"<": "LESS_THAN",
				"<=": "LESS_THAN_OR_EQUAL",
				">": "GREATER_THAN",
				">=": "GREATER_THAN_OR_EQUAL",
				"==": "EQUAL",
				"!=": "NOT_EQUAL",
				"array-contains": "ARRAY_CONTAINS",
				in: "IN",
				"not-in": "NOT_IN",
				"array-contains-any": "ARRAY_CONTAINS_ANY",
			},
			rB = { and: "AND", or: "OR" };
		class rq {
			constructor(e, t) {
				(this.databaseId = e), (this.useProto3Json = t);
			}
		}
		function r$(e, t) {
			return e.useProto3Json || null == t ? t : { value: t };
		}
		function rz(e, t) {
			return e.useProto3Json
				? `${new Date(1e3 * t.seconds).toISOString().replace(/\.\d*/, "").replace("Z", "")}.${("000000000" + t.nanoseconds).slice(-9)}Z`
				: { seconds: "" + t.seconds, nanos: t.nanoseconds };
		}
		function rH(e, t) {
			return e.useProto3Json ? t.toBase64() : t.toUint8Array();
		}
		function rG(e) {
			let t;
			return (
				q(!!e, 49232), eE.fromTimestamp(new e_((t = eB(e)).seconds, t.nanos))
			);
		}
		function rK(e, t) {
			return rW(e, t).canonicalString();
		}
		function rW(e, t) {
			const r = new el([
				"projects",
				e.projectId,
				"databases",
				e.database,
			]).child("documents");
			return void 0 === t ? r : r.child(t);
		}
		function rQ(e) {
			const t = el.fromString(e);
			return q(r3(t), 10190, { key: t.toString() }), t;
		}
		function rJ(e, t) {
			return rK(e.databaseId, t.path);
		}
		function rX(e, t) {
			const r = rQ(t);
			if (r.get(1) !== e.databaseId.projectId)
				throw new z(
					$.INVALID_ARGUMENT,
					"Tried to deserialize key from different project: " +
						r.get(1) +
						" vs " +
						e.databaseId.projectId,
				);
			if (r.get(3) !== e.databaseId.database)
				throw new z(
					$.INVALID_ARGUMENT,
					"Tried to deserialize key from different database: " +
						r.get(3) +
						" vs " +
						e.databaseId.database,
				);
			return new ec(r0(r));
		}
		function rY(e, t) {
			return rK(e.databaseId, t);
		}
		function rZ(e) {
			return new el([
				"projects",
				e.databaseId.projectId,
				"databases",
				e.databaseId.database,
			]).canonicalString();
		}
		function r0(e) {
			return (
				q(e.length > 4 && "documents" === e.get(4), 29091, {
					key: e.toString(),
				}),
				e.popFirst(5)
			);
		}
		function r1(e, t, r) {
			return { name: rJ(e, t), fields: r.value.mapValue.fields };
		}
		function r2(e) {
			return { fieldPath: e.canonicalString() };
		}
		function r6(e) {
			return eh.fromServerFormat(e.fieldPath);
		}
		function r3(e) {
			return (
				e.length >= 4 && "projects" === e.get(0) && "databases" === e.get(2)
			);
		}
		class r5 {
			constructor(
				e,
				t,
				r,
				n,
				i = eE.min(),
				s = eE.min(),
				a = eF.EMPTY_BYTE_STRING,
				o = null,
			) {
				(this.target = e),
					(this.targetId = t),
					(this.purpose = r),
					(this.sequenceNumber = n),
					(this.snapshotVersion = i),
					(this.lastLimboFreeSnapshotVersion = s),
					(this.resumeToken = a),
					(this.expectedCount = o);
			}
			withSequenceNumber(e) {
				return new r5(
					this.target,
					this.targetId,
					this.purpose,
					e,
					this.snapshotVersion,
					this.lastLimboFreeSnapshotVersion,
					this.resumeToken,
					this.expectedCount,
				);
			}
			withResumeToken(e, t) {
				return new r5(
					this.target,
					this.targetId,
					this.purpose,
					this.sequenceNumber,
					t,
					this.lastLimboFreeSnapshotVersion,
					e,
					null,
				);
			}
			withExpectedCount(e) {
				return new r5(
					this.target,
					this.targetId,
					this.purpose,
					this.sequenceNumber,
					this.snapshotVersion,
					this.lastLimboFreeSnapshotVersion,
					this.resumeToken,
					e,
				);
			}
			withLastLimboFreeSnapshotVersion(e) {
				return new r5(
					this.target,
					this.targetId,
					this.purpose,
					this.sequenceNumber,
					this.snapshotVersion,
					e,
					this.resumeToken,
					this.expectedCount,
				);
			}
		}
		class r4 {
			constructor(e) {
				this.gt = e;
			}
		}
		class r8 {
			bt(e, t) {
				this.Dt(e, t), t.vt();
			}
			Dt(e, t) {
				if ("nullValue" in e) this.Ct(t, 5);
				else if ("booleanValue" in e) this.Ct(t, 10), t.Ft(+!!e.booleanValue);
				else if ("integerValue" in e) this.Ct(t, 15), t.Ft(eq(e.integerValue));
				else if ("doubleValue" in e) {
					const r = eq(e.doubleValue);
					isNaN(r)
						? this.Ct(t, 13)
						: (this.Ct(t, 15), ek(r) ? t.Ft(0) : t.Ft(r));
				} else if ("timestampValue" in e) {
					let r = e.timestampValue;
					this.Ct(t, 20),
						"string" == typeof r && (r = eB(r)),
						t.Mt(`${r.seconds || ""}`),
						t.Ft(r.nanos || 0);
				} else if ("stringValue" in e) this.xt(e.stringValue, t), this.Ot(t);
				else if ("bytesValue" in e)
					this.Ct(t, 30), t.Nt(e$(e.bytesValue)), this.Ot(t);
				else if ("referenceValue" in e) this.Bt(e.referenceValue, t);
				else if ("geoPointValue" in e) {
					const r = e.geoPointValue;
					this.Ct(t, 45), t.Ft(r.latitude || 0), t.Ft(r.longitude || 0);
				} else
					"mapValue" in e
						? th(e)
							? this.Ct(t, Number.MAX_SAFE_INTEGER)
							: tl(e)
								? this.Lt(e.mapValue, t)
								: (this.kt(e.mapValue, t), this.Ot(t))
						: "arrayValue" in e
							? (this.qt(e.arrayValue, t), this.Ot(t))
							: j(19022, { Qt: e });
			}
			xt(e, t) {
				this.Ct(t, 25), this.$t(e, t);
			}
			$t(e, t) {
				t.Mt(e);
			}
			kt(e, t) {
				const r = e.fields || {};
				for (const e of (this.Ct(t, 55), Object.keys(r)))
					this.xt(e, t), this.Dt(r[e], t);
			}
			Lt(e, t) {
				var r, n;
				const i = e.fields || {};
				this.Ct(t, 53);
				const s =
					(null == (n = null == (r = i[e3].arrayValue) ? void 0 : r.values)
						? void 0
						: n.length) || 0;
				this.Ct(t, 15), t.Ft(eq(s)), this.xt(e3, t), this.Dt(i[e3], t);
			}
			qt(e, t) {
				const r = e.values || [];
				for (const e of (this.Ct(t, 50), r)) this.Dt(e, t);
			}
			Bt(e, t) {
				this.Ct(t, 37),
					ec.fromName(e).path.forEach((e) => {
						this.Ct(t, 60), this.$t(e, t);
					});
			}
			Ct(e, t) {
				e.Ft(t);
			}
			Ot(e) {
				e.Ft(2);
			}
		}
		r8.Ut = new r8();
		class r7 {
			constructor() {
				this.Dn = new r9();
			}
			addToCollectionParentIndex(e, t) {
				return this.Dn.add(t), eS.resolve();
			}
			getCollectionParents(e, t) {
				return eS.resolve(this.Dn.getEntries(t));
			}
			addFieldIndex(e, t) {
				return eS.resolve();
			}
			deleteFieldIndex(e, t) {
				return eS.resolve();
			}
			deleteAllFieldIndexes(e) {
				return eS.resolve();
			}
			createTargetIndexes(e, t) {
				return eS.resolve();
			}
			getDocumentsMatchingTarget(e, t) {
				return eS.resolve(null);
			}
			getIndexType(e, t) {
				return eS.resolve(0);
			}
			getFieldIndexes(e, t) {
				return eS.resolve([]);
			}
			getNextCollectionGroupToUpdate(e) {
				return eS.resolve(null);
			}
			getMinOffset(e, t) {
				return eS.resolve(eb.min());
			}
			getMinOffsetFromCollectionGroup(e, t) {
				return eS.resolve(eb.min());
			}
			updateCollectionGroup(e, t, r) {
				return eS.resolve();
			}
			updateIndexEntries(e, t) {
				return eS.resolve();
			}
		}
		class r9 {
			constructor() {
				this.index = {};
			}
			add(e) {
				const t = e.lastSegment(),
					r = e.popLast(),
					n = this.index[t] || new eL(el.comparator),
					i = !n.has(r);
				return (this.index[t] = n.add(r)), i;
			}
			has(e) {
				const t = e.lastSegment(),
					r = e.popLast(),
					n = this.index[t];
				return n && n.has(r);
			}
			getEntries(e) {
				return (this.index[e] || new eL(el.comparator)).toArray();
			}
		}
		new Uint8Array(0);
		const ne = {
			didRun: !1,
			sequenceNumbersCollected: 0,
			targetsRemoved: 0,
			documentsRemoved: 0,
		};
		class nt {
			static withCacheSize(e) {
				return new nt(
					e,
					nt.DEFAULT_COLLECTION_PERCENTILE,
					nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT,
				);
			}
			constructor(e, t, r) {
				(this.cacheSizeCollectionThreshold = e),
					(this.percentileToCollect = t),
					(this.maximumSequenceNumbersToCollect = r);
			}
		}
		(nt.DEFAULT_COLLECTION_PERCENTILE = 10),
			(nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT = 1e3),
			(nt.DEFAULT = new nt(
				0x2800000,
				nt.DEFAULT_COLLECTION_PERCENTILE,
				nt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT,
			)),
			(nt.DISABLED = new nt(-1, 0, 0));
		class nr {
			constructor(e) {
				this._r = e;
			}
			next() {
				return (this._r += 2), this._r;
			}
			static ar() {
				return new nr(0);
			}
			static ur() {
				return new nr(-1);
			}
		}
		const nn = "LruGarbageCollector";
		function ni([e, t], [r, n]) {
			const i = er(e, r);
			return 0 === i ? er(t, n) : i;
		}
		class ns {
			constructor(e) {
				(this.Tr = e), (this.buffer = new eL(ni)), (this.Ir = 0);
			}
			dr() {
				return ++this.Ir;
			}
			Er(e) {
				const t = [e, this.dr()];
				if (this.buffer.size < this.Tr) this.buffer = this.buffer.add(t);
				else {
					const e = this.buffer.last();
					0 > ni(t, e) && (this.buffer = this.buffer.delete(e).add(t));
				}
			}
			get maxValue() {
				return this.buffer.last()[0];
			}
		}
		class na {
			constructor(e, t, r) {
				(this.garbageCollector = e),
					(this.asyncQueue = t),
					(this.localStore = r),
					(this.Ar = null);
			}
			start() {
				-1 !== this.garbageCollector.params.cacheSizeCollectionThreshold &&
					this.Rr(6e4);
			}
			stop() {
				this.Ar && (this.Ar.cancel(), (this.Ar = null));
			}
			get started() {
				return null !== this.Ar;
			}
			Rr(e) {
				M(nn, `Garbage collection scheduled in ${e}ms`),
					(this.Ar = this.asyncQueue.enqueueAfterDelay(
						"lru_garbage_collection",
						e,
						async () => {
							this.Ar = null;
							try {
								await this.localStore.collectGarbage(this.garbageCollector);
							} catch (e) {
								eC(e)
									? M(
											nn,
											"Ignoring IndexedDB error during garbage collection: ",
											e,
										)
									: await eT(e);
							}
							await this.Rr(3e5);
						},
					));
			}
		}
		class no {
			constructor(e, t) {
				(this.Vr = e), (this.params = t);
			}
			calculateTargetCount(e, t) {
				return this.Vr.mr(e).next((e) => Math.floor((t / 100) * e));
			}
			nthSequenceNumber(e, t) {
				if (0 === t) return eS.resolve(eA.ue);
				const r = new ns(t);
				return this.Vr.forEachTarget(e, (e) => r.Er(e.sequenceNumber))
					.next(() => this.Vr.gr(e, (e) => r.Er(e)))
					.next(() => r.maxValue);
			}
			removeTargets(e, t, r) {
				return this.Vr.removeTargets(e, t, r);
			}
			removeOrphanedDocuments(e, t) {
				return this.Vr.removeOrphanedDocuments(e, t);
			}
			collect(e, t) {
				return -1 === this.params.cacheSizeCollectionThreshold
					? (M("LruGarbageCollector", "Garbage collection skipped; disabled"),
						eS.resolve(ne))
					: this.getCacheSize(e).next((r) =>
							r < this.params.cacheSizeCollectionThreshold
								? (M(
										"LruGarbageCollector",
										`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`,
									),
									ne)
								: this.pr(e, t),
						);
			}
			getCacheSize(e) {
				return this.Vr.getCacheSize(e);
			}
			pr(e, t) {
				let r,
					n,
					i,
					s,
					a,
					o,
					l,
					u = Date.now();
				return this.calculateTargetCount(e, this.params.percentileToCollect)
					.next(
						(t) => (
							t > this.params.maximumSequenceNumbersToCollect
								? (M(
										"LruGarbageCollector",
										`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${t}`,
									),
									(n = this.params.maximumSequenceNumbersToCollect))
								: (n = t),
							(s = Date.now()),
							this.nthSequenceNumber(e, n)
						),
					)
					.next((n) => ((r = n), (a = Date.now()), this.removeTargets(e, r, t)))
					.next(
						(t) => (
							(i = t), (o = Date.now()), this.removeOrphanedDocuments(e, r)
						),
					)
					.next(
						(e) => (
							(l = Date.now()),
							L() <= T.LogLevel.DEBUG &&
								M(
									"LruGarbageCollector",
									`LRU Garbage Collection
	Counted targets in ${s - u}ms
	Determined least recently used ${n} in ` +
										(a - s) +
										"ms\n" +
										`	Removed ${i} targets in ` +
										(o - a) +
										"ms\n" +
										`	Removed ${e} documents in ` +
										(l - o) +
										"ms\n" +
										`Total Duration: ${l - u}ms`,
								),
							eS.resolve({
								didRun: !0,
								sequenceNumbersCollected: n,
								targetsRemoved: i,
								documentsRemoved: e,
							})
						),
					);
			}
		}
		class nl {
			constructor() {
				(this.changes = new tW(
					(e) => e.toString(),
					(e, t) => e.isEqual(t),
				)),
					(this.changesApplied = !1);
			}
			addEntry(e) {
				this.assertNotApplied(), this.changes.set(e.key, e);
			}
			removeEntry(e, t) {
				this.assertNotApplied(),
					this.changes.set(e, td.newInvalidDocument(e).setReadTime(t));
			}
			getEntry(e, t) {
				this.assertNotApplied();
				const r = this.changes.get(t);
				return void 0 !== r ? eS.resolve(r) : this.getFromCache(e, t);
			}
			getEntries(e, t) {
				return this.getAllFromCache(e, t);
			}
			apply(e) {
				return (
					this.assertNotApplied(),
					(this.changesApplied = !0),
					this.applyChanges(e)
				);
			}
			assertNotApplied() {}
		}
		class nu {
			constructor(e, t) {
				(this.overlayedDocument = e), (this.mutatedFields = t);
			}
		}
		class nh {
			constructor(e, t, r, n) {
				(this.remoteDocumentCache = e),
					(this.mutationQueue = t),
					(this.documentOverlayCache = r),
					(this.indexManager = n);
			}
			getDocument(e, t) {
				let r = null;
				return this.documentOverlayCache
					.getOverlay(e, t)
					.next((n) => ((r = n), this.remoteDocumentCache.getEntry(e, t)))
					.next(
						(e) => (null !== r && rc(r.mutation, e, eU.empty(), e_.now()), e),
					);
			}
			getDocuments(e, t) {
				return this.remoteDocumentCache
					.getEntries(e, t)
					.next((t) => this.getLocalViewOfDocuments(e, t, t2()).next(() => t));
			}
			getLocalViewOfDocuments(e, t, r = t2()) {
				const n = tZ();
				return this.populateOverlays(e, n, t).next(() =>
					this.computeViews(e, t, n, r).next((e) => {
						let t = tX();
						return (
							e.forEach((e, r) => {
								t = t.insert(e, r.overlayedDocument);
							}),
							t
						);
					}),
				);
			}
			getOverlayedDocuments(e, t) {
				const r = tZ();
				return this.populateOverlays(e, r, t).next(() =>
					this.computeViews(e, t, r, t2()),
				);
			}
			populateOverlays(e, t, r) {
				const n = [];
				return (
					r.forEach((e) => {
						t.has(e) || n.push(e);
					}),
					this.documentOverlayCache.getOverlays(e, n).next((e) => {
						e.forEach((e, r) => {
							t.set(e, r);
						});
					})
				);
			}
			computeViews(e, t, r, n) {
				let i = tQ,
					s = tZ(),
					a = tZ();
				return (
					t.forEach((e, t) => {
						const a = r.get(t.key);
						n.has(t.key) && (void 0 === a || a.mutation instanceof rp)
							? (i = i.insert(t.key, t))
							: void 0 !== a
								? (s.set(t.key, a.mutation.getFieldMask()),
									rc(a.mutation, t, a.mutation.getFieldMask(), e_.now()))
								: s.set(t.key, eU.empty());
					}),
					this.recalculateAndSaveOverlays(e, i).next(
						(e) => (
							e.forEach((e, t) => s.set(e, t)),
							t.forEach((e, t) => {
								var r;
								return a.set(e, new nu(t, null != (r = s.get(e)) ? r : null));
							}),
							a
						),
					)
				);
			}
			recalculateAndSaveOverlays(e, t) {
				let r = tZ(),
					n = new eO((e, t) => e - t),
					i = t2();
				return this.mutationQueue
					.getAllMutationBatchesAffectingDocumentKeys(e, t)
					.next((e) => {
						for (const i of e)
							i.keys().forEach((e) => {
								const s = t.get(e);
								if (null === s) return;
								let a = r.get(e) || eU.empty();
								(a = i.applyToLocalView(s, a)), r.set(e, a);
								const o = (n.get(i.batchId) || t2()).add(e);
								n = n.insert(i.batchId, o);
							});
					})
					.next(() => {
						const s = [],
							a = n.getReverseIterator();
						for (; a.hasNext(); ) {
							const n = a.getNext(),
								o = n.key,
								l = n.value,
								u = tZ();
							l.forEach((e) => {
								if (!i.has(e)) {
									const n = rh(t.get(e), r.get(e));
									null !== n && u.set(e, n), (i = i.add(e));
								}
							}),
								s.push(this.documentOverlayCache.saveOverlays(e, o, u));
						}
						return eS.waitFor(s);
					})
					.next(() => r);
			}
			recalculateAndSaveOverlaysForDocumentKeys(e, t) {
				return this.remoteDocumentCache
					.getEntries(e, t)
					.next((t) => this.recalculateAndSaveOverlays(e, t));
			}
			getDocumentsMatchingQuery(e, t, r, n) {
				return ec.isDocumentKey(t.path) &&
					null === t.collectionGroup &&
					0 === t.filters.length
					? this.getDocumentsMatchingDocumentQuery(e, t.path)
					: tV(t)
						? this.getDocumentsMatchingCollectionGroupQuery(e, t, r, n)
						: this.getDocumentsMatchingCollectionQuery(e, t, r, n);
			}
			getNextDocuments(e, t, r, n) {
				return this.remoteDocumentCache
					.getAllFromCollectionGroup(e, t, r, n)
					.next((i) => {
						let s =
								n - i.size > 0
									? this.documentOverlayCache.getOverlaysForCollectionGroup(
											e,
											t,
											r.largestBatchId,
											n - i.size,
										)
									: eS.resolve(tZ()),
							a = -1,
							o = i;
						return s.next((t) =>
							eS
								.forEach(
									t,
									(t, r) => (
										a < r.largestBatchId && (a = r.largestBatchId),
										i.get(t)
											? eS.resolve()
											: this.remoteDocumentCache.getEntry(e, t).next((e) => {
													o = o.insert(t, e);
												})
									),
								)
								.next(() => this.populateOverlays(e, t, i))
								.next(() => this.computeViews(e, o, t, t2()))
								.next((e) => ({ batchId: a, changes: tY(e) })),
						);
					});
			}
			getDocumentsMatchingDocumentQuery(e, t) {
				return this.getDocument(e, new ec(t)).next((e) => {
					let t = tX();
					return e.isFoundDocument() && (t = t.insert(e.key, e)), t;
				});
			}
			getDocumentsMatchingCollectionGroupQuery(e, t, r, n) {
				let i = t.collectionGroup,
					s = tX();
				return this.indexManager.getCollectionParents(e, i).next((a) =>
					eS
						.forEach(a, (a) => {
							const o = new tL(
								a.child(i),
								null,
								t.explicitOrderBy.slice(),
								t.filters.slice(),
								t.limit,
								t.limitType,
								t.startAt,
								t.endAt,
							);
							return this.getDocumentsMatchingCollectionQuery(e, o, r, n).next(
								(e) => {
									e.forEach((e, t) => {
										s = s.insert(e, t);
									});
								},
							);
						})
						.next(() => s),
				);
			}
			getDocumentsMatchingCollectionQuery(e, t, r, n) {
				let i;
				return this.documentOverlayCache
					.getOverlaysForCollection(e, t.path, r.largestBatchId)
					.next(
						(s) => (
							(i = s),
							this.remoteDocumentCache.getDocumentsMatchingQuery(e, t, r, i, n)
						),
					)
					.next((e) => {
						i.forEach((t, r) => {
							const n = r.getKey();
							null === e.get(n) && (e = e.insert(n, td.newInvalidDocument(n)));
						});
						let r = tX();
						return (
							e.forEach((e, n) => {
								const s = i.get(e);
								void 0 !== s && rc(s.mutation, n, eU.empty(), e_.now()),
									tG(t, n) && (r = r.insert(e, n));
							}),
							r
						);
					});
			}
		}
		class nc {
			constructor(e) {
				(this.serializer = e), (this.Br = new Map()), (this.Lr = new Map());
			}
			getBundleMetadata(e, t) {
				return eS.resolve(this.Br.get(t));
			}
			saveBundleMetadata(e, t) {
				return (
					this.Br.set(t.id, {
						id: t.id,
						version: t.version,
						createTime: rG(t.createTime),
					}),
					eS.resolve()
				);
			}
			getNamedQuery(e, t) {
				return eS.resolve(this.Lr.get(t));
			}
			saveNamedQuery(e, t) {
				var r;
				let n;
				return (
					this.Lr.set(t.name, {
						name: t.name,
						query:
							((n = ((e) => {
								var t, r, n, i;
								let s,
									a,
									o,
									l,
									u,
									h = 4 === (s = rQ(e.parent)).length ? el.emptyPath() : r0(s),
									c = e.structuredQuery,
									d = c.from ? c.from.length : 0,
									f = null;
								if (d > 0) {
									q(1 === d, 65062);
									const e = c.from[0];
									e.allDescendants
										? (f = e.collectionId)
										: (h = h.child(e.collectionId));
								}
								let p = [];
								c.where &&
									(p =
										(a = (function e(t) {
											return void 0 !== t.unaryFilter
												? ((e) => {
														switch (e.unaryFilter.op) {
															case "IS_NAN": {
																const t = r6(e.unaryFilter.field);
																return tv.create(t, "==", { doubleValue: NaN });
															}
															case "IS_NULL": {
																const r = r6(e.unaryFilter.field);
																return tv.create(r, "==", {
																	nullValue: "NULL_VALUE",
																});
															}
															case "IS_NOT_NAN": {
																const n = r6(e.unaryFilter.field);
																return tv.create(n, "!=", { doubleValue: NaN });
															}
															case "IS_NOT_NULL": {
																const i = r6(e.unaryFilter.field);
																return tv.create(i, "!=", {
																	nullValue: "NULL_VALUE",
																});
															}
															case "OPERATOR_UNSPECIFIED":
																return j(61313);
															default:
																return j(60726);
														}
													})(t)
												: void 0 !== t.fieldFilter
													? tv.create(
															r6(t.fieldFilter.field),
															((e) => {
																switch (e) {
																	case "EQUAL":
																		return "==";
																	case "NOT_EQUAL":
																		return "!=";
																	case "GREATER_THAN":
																		return ">";
																	case "GREATER_THAN_OR_EQUAL":
																		return ">=";
																	case "LESS_THAN":
																		return "<";
																	case "LESS_THAN_OR_EQUAL":
																		return "<=";
																	case "ARRAY_CONTAINS":
																		return "array-contains";
																	case "IN":
																		return "in";
																	case "NOT_IN":
																		return "not-in";
																	case "ARRAY_CONTAINS_ANY":
																		return "array-contains-any";
																	case "OPERATOR_UNSPECIFIED":
																		return j(58110);
																	default:
																		return j(50506);
																}
															})(t.fieldFilter.op),
															t.fieldFilter.value,
														)
													: void 0 !== t.compositeFilter
														? tw.create(
																t.compositeFilter.filters.map((t) => e(t)),
																((e) => {
																	switch (e) {
																		case "AND":
																			return "and";
																		case "OR":
																			return "or";
																		default:
																			return j(1026);
																	}
																})(t.compositeFilter.op),
															)
														: j(30097, { filter: t });
										})(c.where)) instanceof tw &&
										tE((t = a)) &&
										t_(t)
											? a.getFilters()
											: [a]);
								let g = [];
								c.orderBy &&
									(g = c.orderBy.map(
										(e) =>
											new tm(
												r6(e.field),
												((e) => {
													switch (e) {
														case "ASCENDING":
															return "asc";
														case "DESCENDING":
															return "desc";
														default:
															return;
													}
												})(e.direction),
											),
									));
								let m = null;
								c.limit &&
									(m =
										null == (o = "object" == typeof (r = c.limit) ? r.value : r)
											? null
											: o);
								let y = null;
								c.startAt &&
									((l = !!(n = c.startAt).before),
									(y = new tf(n.values || [], l)));
								let v = null;
								return (
									c.endAt &&
										((u = !(i = c.endAt).before),
										(v = new tf(i.values || [], u))),
									new tL(h, f, g, p, m, "F", y, v)
								);
							})({
								parent: (r = t.bundledQuery).parent,
								structuredQuery: r.structuredQuery,
							})),
							"LAST" === r.limitType ? tq(n, n.limit, "L") : n),
						readTime: rG(t.readTime),
					}),
					eS.resolve()
				);
			}
		}
		class nd {
			constructor() {
				(this.overlays = new eO(ec.comparator)), (this.kr = new Map());
			}
			getOverlay(e, t) {
				return eS.resolve(this.overlays.get(t));
			}
			getOverlays(e, t) {
				const r = tZ();
				return eS
					.forEach(t, (t) =>
						this.getOverlay(e, t).next((e) => {
							null !== e && r.set(t, e);
						}),
					)
					.next(() => r);
			}
			saveOverlays(e, t, r) {
				return (
					r.forEach((r, n) => {
						this.wt(e, t, n);
					}),
					eS.resolve()
				);
			}
			removeOverlaysForBatchId(e, t, r) {
				const n = this.kr.get(r);
				return (
					void 0 !== n &&
						(n.forEach((e) => (this.overlays = this.overlays.remove(e))),
						this.kr.delete(r)),
					eS.resolve()
				);
			}
			getOverlaysForCollection(e, t, r) {
				const n = tZ(),
					i = t.length + 1,
					s = new ec(t.child("")),
					a = this.overlays.getIteratorFrom(s);
				for (; a.hasNext(); ) {
					const e = a.getNext().value,
						s = e.getKey();
					if (!t.isPrefixOf(s.path)) break;
					s.path.length === i && e.largestBatchId > r && n.set(e.getKey(), e);
				}
				return eS.resolve(n);
			}
			getOverlaysForCollectionGroup(e, t, r, n) {
				let i = new eO((e, t) => e - t),
					s = this.overlays.getIterator();
				for (; s.hasNext(); ) {
					const e = s.getNext().value;
					if (e.getKey().getCollectionGroup() === t && e.largestBatchId > r) {
						let t = i.get(e.largestBatchId);
						null === t && ((t = tZ()), (i = i.insert(e.largestBatchId, t))),
							t.set(e.getKey(), e);
					}
				}
				const a = tZ(),
					o = i.getIterator();
				for (
					;
					o.hasNext() &&
					(o.getNext().value.forEach((e, t) => a.set(e, t)), !(a.size() >= n));
				);
				return eS.resolve(a);
			}
			wt(e, t, r) {
				const n = this.overlays.get(r.key);
				if (null !== n) {
					const e = this.kr.get(n.largestBatchId).delete(r.key);
					this.kr.set(n.largestBatchId, e);
				}
				this.overlays = this.overlays.insert(r.key, new rb(t, r));
				let i = this.kr.get(t);
				void 0 === i && ((i = t2()), this.kr.set(t, i)),
					this.kr.set(t, i.add(r.key));
			}
		}
		class nf {
			constructor() {
				this.sessionToken = eF.EMPTY_BYTE_STRING;
			}
			getSessionToken(e) {
				return eS.resolve(this.sessionToken);
			}
			setSessionToken(e, t) {
				return (this.sessionToken = t), eS.resolve();
			}
		}
		class np {
			constructor() {
				(this.qr = new eL(ng.Qr)), (this.$r = new eL(ng.Ur));
			}
			isEmpty() {
				return this.qr.isEmpty();
			}
			addReference(e, t) {
				const r = new ng(e, t);
				(this.qr = this.qr.add(r)), (this.$r = this.$r.add(r));
			}
			Kr(e, t) {
				e.forEach((e) => this.addReference(e, t));
			}
			removeReference(e, t) {
				this.Wr(new ng(e, t));
			}
			Gr(e, t) {
				e.forEach((e) => this.removeReference(e, t));
			}
			zr(e) {
				const t = new ec(new el([])),
					r = new ng(t, e),
					n = new ng(t, e + 1),
					i = [];
				return (
					this.$r.forEachInRange([r, n], (e) => {
						this.Wr(e), i.push(e.key);
					}),
					i
				);
			}
			jr() {
				this.qr.forEach((e) => this.Wr(e));
			}
			Wr(e) {
				(this.qr = this.qr.delete(e)), (this.$r = this.$r.delete(e));
			}
			Jr(e) {
				let t = new ec(new el([])),
					r = new ng(t, e),
					n = new ng(t, e + 1),
					i = t2();
				return (
					this.$r.forEachInRange([r, n], (e) => {
						i = i.add(e.key);
					}),
					i
				);
			}
			containsKey(e) {
				const t = new ng(e, 0),
					r = this.qr.firstAfterOrEqual(t);
				return null !== r && e.isEqual(r.key);
			}
		}
		class ng {
			constructor(e, t) {
				(this.key = e), (this.Hr = t);
			}
			static Qr(e, t) {
				return ec.comparator(e.key, t.key) || er(e.Hr, t.Hr);
			}
			static Ur(e, t) {
				return er(e.Hr, t.Hr) || ec.comparator(e.key, t.key);
			}
		}
		class nm {
			constructor(e, t) {
				(this.indexManager = e),
					(this.referenceDelegate = t),
					(this.mutationQueue = []),
					(this.er = 1),
					(this.Yr = new eL(ng.Qr));
			}
			checkEmpty(e) {
				return eS.resolve(0 === this.mutationQueue.length);
			}
			addMutationBatch(e, t, r, n) {
				const i = this.er;
				this.er++,
					this.mutationQueue.length > 0 &&
						this.mutationQueue[this.mutationQueue.length - 1];
				const s = new r_(i, t, r, n);
				for (const t of (this.mutationQueue.push(s), n))
					(this.Yr = this.Yr.add(new ng(t.key, i))),
						this.indexManager.addToCollectionParentIndex(
							e,
							t.key.path.popLast(),
						);
				return eS.resolve(s);
			}
			lookupMutationBatch(e, t) {
				return eS.resolve(this.Zr(t));
			}
			getNextMutationBatchAfterBatchId(e, t) {
				const r = this.Xr(t + 1),
					n = r < 0 ? 0 : r;
				return eS.resolve(
					this.mutationQueue.length > n ? this.mutationQueue[n] : null,
				);
			}
			getHighestUnacknowledgedBatchId() {
				return eS.resolve(0 === this.mutationQueue.length ? -1 : this.er - 1);
			}
			getAllMutationBatches(e) {
				return eS.resolve(this.mutationQueue.slice());
			}
			getAllMutationBatchesAffectingDocumentKey(e, t) {
				const r = new ng(t, 0),
					n = new ng(t, 1 / 0),
					i = [];
				return (
					this.Yr.forEachInRange([r, n], (e) => {
						const t = this.Zr(e.Hr);
						i.push(t);
					}),
					eS.resolve(i)
				);
			}
			getAllMutationBatchesAffectingDocumentKeys(e, t) {
				let r = new eL(er);
				return (
					t.forEach((e) => {
						const t = new ng(e, 0),
							n = new ng(e, 1 / 0);
						this.Yr.forEachInRange([t, n], (e) => {
							r = r.add(e.Hr);
						});
					}),
					eS.resolve(this.ei(r))
				);
			}
			getAllMutationBatchesAffectingQuery(e, t) {
				let r = t.path,
					n = r.length + 1,
					i = r;
				ec.isDocumentKey(i) || (i = i.child(""));
				let s = new ng(new ec(i), 0),
					a = new eL(er);
				return (
					this.Yr.forEachWhile((e) => {
						const t = e.key.path;
						return (
							!!r.isPrefixOf(t) && (t.length === n && (a = a.add(e.Hr)), !0)
						);
					}, s),
					eS.resolve(this.ei(a))
				);
			}
			ei(e) {
				const t = [];
				return (
					e.forEach((e) => {
						const r = this.Zr(e);
						null !== r && t.push(r);
					}),
					t
				);
			}
			removeMutationBatch(e, t) {
				q(0 === this.ti(t.batchId, "removed"), 55003),
					this.mutationQueue.shift();
				let r = this.Yr;
				return eS
					.forEach(t.mutations, (n) => {
						const i = new ng(n.key, t.batchId);
						return (
							(r = r.delete(i)),
							this.referenceDelegate.markPotentiallyOrphaned(e, n.key)
						);
					})
					.next(() => {
						this.Yr = r;
					});
			}
			rr(e) {}
			containsKey(e, t) {
				const r = new ng(t, 0),
					n = this.Yr.firstAfterOrEqual(r);
				return eS.resolve(t.isEqual(n && n.key));
			}
			performConsistencyCheck(e) {
				return this.mutationQueue.length, eS.resolve();
			}
			ti(e, t) {
				return this.Xr(e);
			}
			Xr(e) {
				return 0 === this.mutationQueue.length
					? 0
					: e - this.mutationQueue[0].batchId;
			}
			Zr(e) {
				const t = this.Xr(e);
				return t < 0 || t >= this.mutationQueue.length
					? null
					: this.mutationQueue[t];
			}
		}
		class ny {
			constructor(e) {
				(this.ni = e), (this.docs = new eO(ec.comparator)), (this.size = 0);
			}
			setIndexManager(e) {
				this.indexManager = e;
			}
			addEntry(e, t) {
				const r = t.key,
					n = this.docs.get(r),
					i = n ? n.size : 0,
					s = this.ni(t);
				return (
					(this.docs = this.docs.insert(r, {
						document: t.mutableCopy(),
						size: s,
					})),
					(this.size += s - i),
					this.indexManager.addToCollectionParentIndex(e, r.path.popLast())
				);
			}
			removeEntry(e) {
				const t = this.docs.get(e);
				t && ((this.docs = this.docs.remove(e)), (this.size -= t.size));
			}
			getEntry(e, t) {
				const r = this.docs.get(t);
				return eS.resolve(
					r ? r.document.mutableCopy() : td.newInvalidDocument(t),
				);
			}
			getEntries(e, t) {
				let r = tQ;
				return (
					t.forEach((e) => {
						const t = this.docs.get(e);
						r = r.insert(
							e,
							t ? t.document.mutableCopy() : td.newInvalidDocument(e),
						);
					}),
					eS.resolve(r)
				);
			}
			getDocumentsMatchingQuery(e, t, r, n) {
				let i = tQ,
					s = t.path,
					a = new ec(s.child("__id-9223372036854775808__")),
					o = this.docs.getIteratorFrom(a);
				for (; o.hasNext(); ) {
					const {
						key: e,
						value: { document: a },
					} = o.getNext();
					if (!s.isPrefixOf(e.path)) break;
					e.path.length > s.length + 1 ||
						0 >=
							((e, t) => {
								let r = e.readTime.compareTo(t.readTime);
								return 0 !== r ||
									0 !== (r = ec.comparator(e.documentKey, t.documentKey))
									? r
									: er(e.largestBatchId, t.largestBatchId);
							})(new eb(a.readTime, a.key, -1), r) ||
						((n.has(a.key) || tG(t, a)) &&
							(i = i.insert(a.key, a.mutableCopy())));
				}
				return eS.resolve(i);
			}
			getAllFromCollectionGroup(e, t, r, n) {
				j(9500);
			}
			ri(e, t) {
				return eS.forEach(this.docs, (e) => t(e));
			}
			newChangeBuffer(e) {
				return new nv(this);
			}
			getSize(e) {
				return eS.resolve(this.size);
			}
		}
		class nv extends nl {
			constructor(e) {
				super(), (this.Or = e);
			}
			applyChanges(e) {
				const t = [];
				return (
					this.changes.forEach((r, n) => {
						n.isValidDocument()
							? t.push(this.Or.addEntry(e, n))
							: this.Or.removeEntry(r);
					}),
					eS.waitFor(t)
				);
			}
			getFromCache(e, t) {
				return this.Or.getEntry(e, t);
			}
			getAllFromCache(e, t) {
				return this.Or.getEntries(e, t);
			}
		}
		class nw {
			constructor(e) {
				(this.persistence = e),
					(this.ii = new tW((e) => tO(e), tP)),
					(this.lastRemoteSnapshotVersion = eE.min()),
					(this.highestTargetId = 0),
					(this.si = 0),
					(this.oi = new np()),
					(this.targetCount = 0),
					(this._i = nr.ar());
			}
			forEachTarget(e, t) {
				return this.ii.forEach((e, r) => t(r)), eS.resolve();
			}
			getLastRemoteSnapshotVersion(e) {
				return eS.resolve(this.lastRemoteSnapshotVersion);
			}
			getHighestSequenceNumber(e) {
				return eS.resolve(this.si);
			}
			allocateTargetId(e) {
				return (
					(this.highestTargetId = this._i.next()),
					eS.resolve(this.highestTargetId)
				);
			}
			setTargetsMetadata(e, t, r) {
				return (
					r && (this.lastRemoteSnapshotVersion = r),
					t > this.si && (this.si = t),
					eS.resolve()
				);
			}
			hr(e) {
				this.ii.set(e.target, e);
				const t = e.targetId;
				t > this.highestTargetId &&
					((this._i = new nr(t)), (this.highestTargetId = t)),
					e.sequenceNumber > this.si && (this.si = e.sequenceNumber);
			}
			addTargetData(e, t) {
				return this.hr(t), (this.targetCount += 1), eS.resolve();
			}
			updateTargetData(e, t) {
				return this.hr(t), eS.resolve();
			}
			removeTargetData(e, t) {
				return (
					this.ii.delete(t.target),
					this.oi.zr(t.targetId),
					(this.targetCount -= 1),
					eS.resolve()
				);
			}
			removeTargets(e, t, r) {
				let n = 0,
					i = [];
				return (
					this.ii.forEach((s, a) => {
						a.sequenceNumber <= t &&
							null === r.get(a.targetId) &&
							(this.ii.delete(s),
							i.push(this.removeMatchingKeysForTargetId(e, a.targetId)),
							n++);
					}),
					eS.waitFor(i).next(() => n)
				);
			}
			getTargetCount(e) {
				return eS.resolve(this.targetCount);
			}
			getTargetData(e, t) {
				const r = this.ii.get(t) || null;
				return eS.resolve(r);
			}
			addMatchingKeys(e, t, r) {
				return this.oi.Kr(t, r), eS.resolve();
			}
			removeMatchingKeys(e, t, r) {
				this.oi.Gr(t, r);
				const n = this.persistence.referenceDelegate,
					i = [];
				return (
					n &&
						t.forEach((t) => {
							i.push(n.markPotentiallyOrphaned(e, t));
						}),
					eS.waitFor(i)
				);
			}
			removeMatchingKeysForTargetId(e, t) {
				return this.oi.zr(t), eS.resolve();
			}
			getMatchingKeysForTargetId(e, t) {
				const r = this.oi.Jr(t);
				return eS.resolve(r);
			}
			containsKey(e, t) {
				return eS.resolve(this.oi.containsKey(t));
			}
		}
		class n_ {
			constructor(e, t) {
				(this.ai = {}),
					(this.overlays = {}),
					(this.ui = new eA(0)),
					(this.ci = !1),
					(this.ci = !0),
					(this.li = new nf()),
					(this.referenceDelegate = e(this)),
					(this.hi = new nw(this)),
					(this.indexManager = new r7()),
					(this.remoteDocumentCache = new ny((e) =>
						this.referenceDelegate.Pi(e),
					)),
					(this.serializer = new r4(t)),
					(this.Ti = new nc(this.serializer));
			}
			start() {
				return Promise.resolve();
			}
			shutdown() {
				return (this.ci = !1), Promise.resolve();
			}
			get started() {
				return this.ci;
			}
			setDatabaseDeletedListener() {}
			setNetworkEnabled() {}
			getIndexManager(e) {
				return this.indexManager;
			}
			getDocumentOverlayCache(e) {
				let t = this.overlays[e.toKey()];
				return t || ((t = new nd()), (this.overlays[e.toKey()] = t)), t;
			}
			getMutationQueue(e, t) {
				let r = this.ai[e.toKey()];
				return (
					r ||
						((r = new nm(t, this.referenceDelegate)), (this.ai[e.toKey()] = r)),
					r
				);
			}
			getGlobalsCache() {
				return this.li;
			}
			getTargetCache() {
				return this.hi;
			}
			getRemoteDocumentCache() {
				return this.remoteDocumentCache;
			}
			getBundleCache() {
				return this.Ti;
			}
			runTransaction(e, t, r) {
				M("MemoryPersistence", "Starting transaction:", e);
				const n = new nE(this.ui.next());
				return (
					this.referenceDelegate.Ii(),
					r(n)
						.next((e) => this.referenceDelegate.di(n).next(() => e))
						.toPromise()
						.then((e) => (n.raiseOnCommittedEvent(), e))
				);
			}
			Ei(e, t) {
				return eS.or(
					Object.values(this.ai).map((r) => () => r.containsKey(e, t)),
				);
			}
		}
		class nE extends eI {
			constructor(e) {
				super(), (this.currentSequenceNumber = e);
			}
		}
		class nb {
			constructor(e) {
				(this.persistence = e), (this.Ai = new np()), (this.Ri = null);
			}
			static Vi(e) {
				return new nb(e);
			}
			get mi() {
				if (this.Ri) return this.Ri;
				throw j(60996);
			}
			addReference(e, t, r) {
				return (
					this.Ai.addReference(r, t), this.mi.delete(r.toString()), eS.resolve()
				);
			}
			removeReference(e, t, r) {
				return (
					this.Ai.removeReference(r, t), this.mi.add(r.toString()), eS.resolve()
				);
			}
			markPotentiallyOrphaned(e, t) {
				return this.mi.add(t.toString()), eS.resolve();
			}
			removeTarget(e, t) {
				this.Ai.zr(t.targetId).forEach((e) => this.mi.add(e.toString()));
				const r = this.persistence.getTargetCache();
				return r
					.getMatchingKeysForTargetId(e, t.targetId)
					.next((e) => {
						e.forEach((e) => this.mi.add(e.toString()));
					})
					.next(() => r.removeTargetData(e, t));
			}
			Ii() {
				this.Ri = new Set();
			}
			di(e) {
				const t = this.persistence.getRemoteDocumentCache().newChangeBuffer();
				return eS
					.forEach(this.mi, (r) => {
						const n = ec.fromPath(r);
						return this.fi(e, n).next((e) => {
							e || t.removeEntry(n, eE.min());
						});
					})
					.next(() => ((this.Ri = null), t.apply(e)));
			}
			updateLimboDocument(e, t) {
				return this.fi(e, t).next((e) => {
					e ? this.mi.delete(t.toString()) : this.mi.add(t.toString());
				});
			}
			Pi(e) {
				return 0;
			}
			fi(e, t) {
				return eS.or([
					() => eS.resolve(this.Ai.containsKey(t)),
					() => this.persistence.getTargetCache().containsKey(e, t),
					() => this.persistence.Ei(e, t),
				]);
			}
		}
		class nI {
			constructor(e, t) {
				(this.persistence = e),
					(this.gi = new tW(
						(e) =>
							((e) => {
								let t = "";
								for (let r = 0; r < e.length; r++)
									t.length > 0 && (t += "\x01\x01"),
										(t = ((e, t) => {
											let r = t,
												n = e.length;
											for (let t = 0; t < n; t++) {
												const n = e.charAt(t);
												switch (n) {
													case "\0":
														r += "\x01\x10";
														break;
													case "\x01":
														r += "\x01\x11";
														break;
													default:
														r += n;
												}
											}
											return r;
										})(e.get(r), t));
								return t + "\x01\x01";
							})(e.path),
						(e, t) => e.isEqual(t),
					)),
					(this.garbageCollector = new no(this, t));
			}
			static Vi(e, t) {
				return new nI(e, t);
			}
			Ii() {}
			di(e) {
				return eS.resolve();
			}
			forEachTarget(e, t) {
				return this.persistence.getTargetCache().forEachTarget(e, t);
			}
			mr(e) {
				const t = this.yr(e);
				return this.persistence
					.getTargetCache()
					.getTargetCount(e)
					.next((e) => t.next((t) => e + t));
			}
			yr(e) {
				let t = 0;
				return this.gr(e, (e) => {
					t++;
				}).next(() => t);
			}
			gr(e, t) {
				return eS.forEach(this.gi, (r, n) =>
					this.Sr(e, r, n).next((e) => (e ? eS.resolve() : t(n))),
				);
			}
			removeTargets(e, t, r) {
				return this.persistence.getTargetCache().removeTargets(e, t, r);
			}
			removeOrphanedDocuments(e, t) {
				let r = 0,
					n = this.persistence.getRemoteDocumentCache(),
					i = n.newChangeBuffer();
				return n
					.ri(e, (n) =>
						this.Sr(e, n, t).next((e) => {
							e || (r++, i.removeEntry(n, eE.min()));
						}),
					)
					.next(() => i.apply(e))
					.next(() => r);
			}
			markPotentiallyOrphaned(e, t) {
				return this.gi.set(t, e.currentSequenceNumber), eS.resolve();
			}
			removeTarget(e, t) {
				const r = t.withSequenceNumber(e.currentSequenceNumber);
				return this.persistence.getTargetCache().updateTargetData(e, r);
			}
			addReference(e, t, r) {
				return this.gi.set(r, e.currentSequenceNumber), eS.resolve();
			}
			removeReference(e, t, r) {
				return this.gi.set(r, e.currentSequenceNumber), eS.resolve();
			}
			updateLimboDocument(e, t) {
				return this.gi.set(t, e.currentSequenceNumber), eS.resolve();
			}
			Pi(e) {
				let t = e.key.toString().length;
				return (
					e.isFoundDocument() &&
						(t += (function e(t) {
							switch (e5(t)) {
								case 0:
								case 1:
									return 4;
								case 2:
									return 8;
								case 3:
								case 8:
									return 16;
								case 4: {
									const r = eQ(t);
									return r ? 16 + e(r) : 16;
								}
								case 5:
									return 2 * t.stringValue.length;
								case 6:
									return e$(t.bytesValue).approximateByteSize();
								case 7:
									return t.referenceValue.length;
								case 9:
									return (t.arrayValue.values || []).reduce(
										(t, r) => t + e(r),
										0,
									);
								case 10:
								case 11: {
									var n;
									let i;
									return (
										(n = t.mapValue),
										(i = 0),
										eN(n.fields, (t, r) => {
											i += t.length + e(r);
										}),
										i
									);
								}
								default:
									throw j(13486, { value: t });
							}
						})(e.data.value)),
					t
				);
			}
			Sr(e, t, r) {
				return eS.or([
					() => this.persistence.Ei(e, t),
					() => this.persistence.getTargetCache().containsKey(e, t),
					() => {
						const e = this.gi.get(t);
						return eS.resolve(void 0 !== e && e > r);
					},
				]);
			}
			getCacheSize(e) {
				return this.persistence.getRemoteDocumentCache().getSize(e);
			}
		}
		class nT {
			constructor(e, t, r, n) {
				(this.targetId = e), (this.fromCache = t), (this.Is = r), (this.ds = n);
			}
			static Es(e, t) {
				let r = t2(),
					n = t2();
				for (const e of t.docChanges)
					switch (e.type) {
						case 0:
							r = r.add(e.doc.key);
							break;
						case 1:
							n = n.add(e.doc.key);
					}
				return new nT(e, t.fromCache, r, n);
			}
		}
		class nS {
			constructor() {
				this._documentReadCount = 0;
			}
			get documentReadCount() {
				return this._documentReadCount;
			}
			incrementDocumentReadCount(e) {
				this._documentReadCount += e;
			}
		}
		class nC {
			constructor() {
				(this.As = !1),
					(this.Rs = !1),
					(this.Vs = 100),
					(this.fs = (() => {
						let e;
						return (0, S.isSafari)()
							? 8
							: Number(
										(e = (0, S.getUA)().match(/Android ([\d.]+)/i))
											? e[1].split(".").slice(0, 2).join(".")
											: "-1",
									) > 0
								? 6
								: 4;
					})());
			}
			initialize(e, t) {
				(this.gs = e), (this.indexManager = t), (this.As = !0);
			}
			getDocumentsMatchingQuery(e, t, r, n) {
				const i = { result: null };
				return this.ps(e, t)
					.next((e) => {
						i.result = e;
					})
					.next(() => {
						if (!i.result)
							return this.ys(e, t, n, r).next((e) => {
								i.result = e;
							});
					})
					.next(() => {
						if (i.result) return;
						const r = new nS();
						return this.ws(e, t, r).next((n) => {
							if (((i.result = n), this.Rs)) return this.Ss(e, t, r, n.size);
						});
					})
					.next(() => i.result);
			}
			Ss(e, t, r, n) {
				return r.documentReadCount < this.Vs
					? (L() <= T.LogLevel.DEBUG &&
							M(
								"QueryEngine",
								"SDK will not create cache indexes for query:",
								tH(t),
								"since it only creates cache indexes for collection contains",
								"more than or equal to",
								this.Vs,
								"documents",
							),
						eS.resolve())
					: (L() <= T.LogLevel.DEBUG &&
							M(
								"QueryEngine",
								"Query:",
								tH(t),
								"scans",
								r.documentReadCount,
								"local documents and returns",
								n,
								"documents as results.",
							),
						r.documentReadCount > this.fs * n
							? (L() <= T.LogLevel.DEBUG &&
									M(
										"QueryEngine",
										"The SDK decides to create cache indexes for query:",
										tH(t),
										"as using cache indexes may help improve performance.",
									),
								this.indexManager.createTargetIndexes(e, tj(t)))
							: eS.resolve());
			}
			ps(e, t) {
				if (tU(t)) return eS.resolve(null);
				let r = tj(t);
				return this.indexManager.getIndexType(e, r).next((n) =>
					0 === n
						? null
						: (null !== t.limit && 1 === n && (r = tj((t = tq(t, null, "F")))),
							this.indexManager.getDocumentsMatchingTarget(e, r).next((n) => {
								const i = t2(...n);
								return this.gs.getDocuments(e, i).next((n) =>
									this.indexManager.getMinOffset(e, r).next((r) => {
										const s = this.bs(t, n);
										return this.Ds(t, s, i, r.readTime)
											? this.ps(e, tq(t, null, "F"))
											: this.vs(e, s, t, r);
									}),
								);
							})),
				);
			}
			ys(e, t, r, n) {
				return tU(t) || n.isEqual(eE.min())
					? eS.resolve(null)
					: this.gs.getDocuments(e, r).next((i) => {
							let s,
								a,
								o = this.bs(t, i);
							return this.Ds(t, o, r, n)
								? eS.resolve(null)
								: (L() <= T.LogLevel.DEBUG &&
										M(
											"QueryEngine",
											"Re-using previous result from %s to execute query: %s",
											n.toString(),
											tH(t),
										),
									this.vs(
										e,
										o,
										t,
										((s = n.toTimestamp().seconds),
										(a = n.toTimestamp().nanoseconds + 1),
										new eb(
											eE.fromTimestamp(
												1e9 === a ? new e_(s + 1, 0) : new e_(s, a),
											),
											ec.empty(),
											-1,
										)),
									).next((e) => e));
						});
			}
			bs(e, t) {
				let r = new eL(tK(e));
				return (
					t.forEach((t, n) => {
						tG(e, n) && (r = r.add(n));
					}),
					r
				);
			}
			Ds(e, t, r, n) {
				if (null === e.limit) return !1;
				if (r.size !== t.size) return !0;
				const i = "F" === e.limitType ? t.last() : t.first();
				return !!i && (i.hasPendingWrites || i.version.compareTo(n) > 0);
			}
			ws(e, t, r) {
				return (
					L() <= T.LogLevel.DEBUG &&
						M(
							"QueryEngine",
							"Using full collection scan to execute query:",
							tH(t),
						),
					this.gs.getDocumentsMatchingQuery(e, t, eb.min(), r)
				);
			}
			vs(e, t, r, n) {
				return this.gs.getDocumentsMatchingQuery(e, r, n).next(
					(e) => (
						t.forEach((t) => {
							e = e.insert(t.key, t);
						}),
						e
					),
				);
			}
		}
		const nA = "LocalStore";
		class nk {
			constructor(e, t, r, n) {
				(this.persistence = e),
					(this.Cs = t),
					(this.serializer = n),
					(this.Fs = new eO(er)),
					(this.Ms = new tW((e) => tO(e), tP)),
					(this.xs = new Map()),
					(this.Os = e.getRemoteDocumentCache()),
					(this.hi = e.getTargetCache()),
					(this.Ti = e.getBundleCache()),
					this.Ns(r);
			}
			Ns(e) {
				(this.documentOverlayCache =
					this.persistence.getDocumentOverlayCache(e)),
					(this.indexManager = this.persistence.getIndexManager(e)),
					(this.mutationQueue = this.persistence.getMutationQueue(
						e,
						this.indexManager,
					)),
					(this.localDocuments = new nh(
						this.Os,
						this.mutationQueue,
						this.documentOverlayCache,
						this.indexManager,
					)),
					this.Os.setIndexManager(this.indexManager),
					this.Cs.initialize(this.localDocuments, this.indexManager);
			}
			collectGarbage(e) {
				return this.persistence.runTransaction(
					"Collect garbage",
					"readwrite-primary",
					(t) => e.collect(t, this.Fs),
				);
			}
		}
		async function nR(e, t) {
			return await e.persistence.runTransaction(
				"Handle user change",
				"readonly",
				(r) => {
					let n;
					return e.mutationQueue
						.getAllMutationBatches(r)
						.next(
							(i) => (
								(n = i), e.Ns(t), e.mutationQueue.getAllMutationBatches(r)
							),
						)
						.next((t) => {
							let i = [],
								s = [],
								a = t2();
							for (const e of n)
								for (const t of (i.push(e.batchId), e.mutations))
									a = a.add(t.key);
							for (const e of t)
								for (const t of (s.push(e.batchId), e.mutations))
									a = a.add(t.key);
							return e.localDocuments
								.getDocuments(r, a)
								.next((e) => ({ Bs: e, removedBatchIds: i, addedBatchIds: s }));
						});
				},
			);
		}
		function nN(e) {
			return e.persistence.runTransaction(
				"Get last remote snapshot version",
				"readonly",
				(t) => e.hi.getLastRemoteSnapshotVersion(t),
			);
		}
		async function nD(e, t, r) {
			const n = e.Fs.get(t);
			try {
				r ||
					(await e.persistence.runTransaction(
						"Release target",
						r ? "readwrite" : "readwrite-primary",
						(t) => e.persistence.referenceDelegate.removeTarget(t, n),
					));
			} catch (e) {
				if (!eC(e)) throw e;
				M(nA, `Failed to update sequence numbers for target ${t}: ${e}`);
			}
			(e.Fs = e.Fs.remove(t)), e.Ms.delete(n.target);
		}
		function nO(e, t, r) {
			let n = eE.min(),
				i = t2();
			return e.persistence.runTransaction("Execute query", "readwrite", (s) => {
				var a;
				let o;
				return ((a = tj(t)),
				void 0 !== (o = e.Ms.get(a))
					? eS.resolve(e.Fs.get(o))
					: e.hi.getTargetData(s, a))
					.next((t) => {
						if (t)
							return (
								(n = t.lastLimboFreeSnapshotVersion),
								e.hi.getMatchingKeysForTargetId(s, t.targetId).next((e) => {
									i = e;
								})
							);
					})
					.next(() =>
						e.Cs.getDocumentsMatchingQuery(
							s,
							t,
							r ? n : eE.min(),
							r ? i : t2(),
						),
					)
					.next((r) => {
						var n, s, a;
						let o;
						return (
							(n = e),
							(s =
								t.collectionGroup ||
								(t.path.length % 2 == 1
									? t.path.lastSegment()
									: t.path.get(t.path.length - 2))),
							(a = r),
							(o = n.xs.get(s) || eE.min()),
							a.forEach((e, t) => {
								t.readTime.compareTo(o) > 0 && (o = t.readTime);
							}),
							n.xs.set(s, o),
							{ documents: r, qs: i }
						);
					});
			});
		}
		class nP {
			constructor() {
				this.activeTargetIds = t6;
			}
			Gs(e) {
				this.activeTargetIds = this.activeTargetIds.add(e);
			}
			zs(e) {
				this.activeTargetIds = this.activeTargetIds.delete(e);
			}
			Ws() {
				return JSON.stringify({
					activeTargetIds: this.activeTargetIds.toArray(),
					updateTimeMs: Date.now(),
				});
			}
		}
		class nx {
			constructor() {
				(this.Fo = new nP()),
					(this.Mo = {}),
					(this.onlineStateHandler = null),
					(this.sequenceNumberHandler = null);
			}
			addPendingMutation(e) {}
			updateMutationState(e, t, r) {}
			addLocalQueryTarget(e, t = !0) {
				return t && this.Fo.Gs(e), this.Mo[e] || "not-current";
			}
			updateQueryState(e, t, r) {
				this.Mo[e] = t;
			}
			removeLocalQueryTarget(e) {
				this.Fo.zs(e);
			}
			isLocalQueryTarget(e) {
				return this.Fo.activeTargetIds.has(e);
			}
			clearQueryState(e) {
				delete this.Mo[e];
			}
			getAllActiveQueryTargets() {
				return this.Fo.activeTargetIds;
			}
			isActiveQueryTarget(e) {
				return this.Fo.activeTargetIds.has(e);
			}
			start() {
				return (this.Fo = new nP()), Promise.resolve();
			}
			handleUserChange(e, t, r) {}
			setOnlineState(e) {}
			shutdown() {}
			writeSequenceNumber(e) {}
			notifyBundleLoaded(e) {}
		}
		class nL {
			xo(e) {}
			shutdown() {}
		}
		const nM = "ConnectivityMonitor";
		class nU {
			constructor() {
				(this.Oo = () => this.No()),
					(this.Bo = () => this.Lo()),
					(this.ko = []),
					this.qo();
			}
			xo(e) {
				this.ko.push(e);
			}
			shutdown() {
				window.removeEventListener("online", this.Oo),
					window.removeEventListener("offline", this.Bo);
			}
			qo() {
				window.addEventListener("online", this.Oo),
					window.addEventListener("offline", this.Bo);
			}
			No() {
				for (const e of (M(nM, "Network connectivity changed: AVAILABLE"),
				this.ko))
					e(0);
			}
			Lo() {
				for (const e of (M(nM, "Network connectivity changed: UNAVAILABLE"),
				this.ko))
					e(1);
			}
			static C() {
				return (
					"u" > typeof window &&
					void 0 !== window.addEventListener &&
					void 0 !== window.removeEventListener
				);
			}
		}
		let nV = null;
		function nF() {
			return (
				null === nV
					? (nV = 0x10000000 + Math.round(0x80000000 * Math.random()))
					: nV++,
				"0x" + nV.toString(16)
			);
		}
		const nj = "RestConnection",
			nB = {
				BatchGetDocuments: "batchGet",
				Commit: "commit",
				RunQuery: "runQuery",
				RunAggregationQuery: "runAggregationQuery",
			};
		class nq {
			get Qo() {
				return !1;
			}
			constructor(e) {
				(this.databaseInfo = e), (this.databaseId = e.databaseId);
				const t = e.ssl ? "https" : "http",
					r = encodeURIComponent(this.databaseId.projectId),
					n = encodeURIComponent(this.databaseId.database);
				(this.$o = t + "://" + e.host),
					(this.Uo = `projects/${r}/databases/${n}`),
					(this.Ko =
						this.databaseId.database === eY
							? `project_id=${r}`
							: `project_id=${r}&database_id=${n}`);
			}
			Wo(e, t, r, n, i) {
				const s = nF(),
					a = this.Go(e, t.toUriEncodedString());
				M(nj, `Sending RPC '${e}' ${s}:`, a, r);
				const o = {
					"google-cloud-resource-prefix": this.Uo,
					"x-goog-request-params": this.Ko,
				};
				this.zo(o, n, i);
				const { host: l } = new URL(a),
					u = (0, S.isCloudWorkstation)(l);
				return this.jo(e, a, o, r, u).then(
					(t) => (M(nj, `Received RPC '${e}' ${s}: `, t), t),
					(t) => {
						throw (
							(V(
								nj,
								`RPC '${e}' ${s} failed with error: `,
								t,
								"url: ",
								a,
								"request:",
								r,
							),
							t)
						);
					},
				);
			}
			Jo(e, t, r, n, i, s) {
				return this.Wo(e, t, r, n, i);
			}
			zo(e, t, r) {
				(e["X-Goog-Api-Client"] = "gl-js/ fire/" + P),
					(e["Content-Type"] = "text/plain"),
					this.databaseInfo.appId &&
						(e["X-Firebase-GMPID"] = this.databaseInfo.appId),
					t && t.headers.forEach((t, r) => (e[r] = t)),
					r && r.headers.forEach((t, r) => (e[r] = t));
			}
			Go(e, t) {
				const r = nB[e];
				return `${this.$o}/v1/${t}:${r}`;
			}
			terminate() {}
		}
		class n$ {
			constructor(e) {
				(this.Ho = e.Ho), (this.Yo = e.Yo);
			}
			Zo(e) {
				this.Xo = e;
			}
			e_(e) {
				this.t_ = e;
			}
			n_(e) {
				this.r_ = e;
			}
			onMessage(e) {
				this.i_ = e;
			}
			close() {
				this.Yo();
			}
			send(e) {
				this.Ho(e);
			}
			s_() {
				this.Xo();
			}
			o_() {
				this.t_();
			}
			__(e) {
				this.r_(e);
			}
			a_(e) {
				this.i_(e);
			}
		}
		const nz = "WebChannelConnection";
		class nH extends nq {
			constructor(e) {
				super(e),
					(this.u_ = []),
					(this.forceLongPolling = e.forceLongPolling),
					(this.autoDetectLongPolling = e.autoDetectLongPolling),
					(this.useFetchStreams = e.useFetchStreams),
					(this.longPollingOptions = e.longPollingOptions);
			}
			jo(e, t, r, n, i) {
				const s = nF();
				return new Promise((i, a) => {
					const l = new o();
					l.setWithCredentials(!0),
						l.listenOnce(u.COMPLETE, () => {
							try {
								switch (l.getLastErrorCode()) {
									case h.NO_ERROR: {
										const t = l.getResponseJson();
										M(
											nz,
											`XHR for RPC '${e}' ${s} received:`,
											JSON.stringify(t),
										),
											i(t);
										break;
									}
									case h.TIMEOUT:
										M(nz, `RPC '${e}' ${s} timed out`),
											a(new z($.DEADLINE_EXCEEDED, "Request time out"));
										break;
									case h.HTTP_ERROR: {
										const r = l.getStatus();
										if (
											(M(
												nz,
												`RPC '${e}' ${s} failed with status:`,
												r,
												"response text:",
												l.getResponseText(),
											),
											r > 0)
										) {
											let e = l.getResponseJson();
											Array.isArray(e) && (e = e[0]);
											const t = null == e ? void 0 : e.error;
											if (t && t.status && t.message) {
												let e,
													r =
														((e = t.status.toLowerCase().replace(/_/g, "-")),
														Object.values($).indexOf(e) >= 0 ? e : $.UNKNOWN);
												a(new z(r, t.message));
											} else
												a(
													new z(
														$.UNKNOWN,
														"Server responded with status " + l.getStatus(),
													),
												);
										} else a(new z($.UNAVAILABLE, "Connection failed."));
										break;
									}
									default:
										j(9055, {
											c_: e,
											streamId: s,
											l_: l.getLastErrorCode(),
											h_: l.getLastError(),
										});
								}
							} finally {
								M(nz, `RPC '${e}' ${s} completed.`);
							}
						});
					const c = JSON.stringify(n);
					M(nz, `RPC '${e}' ${s} sending request:`, n),
						l.send(t, "POST", c, r, 15);
				});
			}
			P_(e, t, r) {
				const n = nF(),
					i = [
						this.$o,
						"/",
						"google.firestore.v1.Firestore",
						"/",
						e,
						"/channel",
					],
					s = p(),
					a = f(),
					o = {
						httpSessionIdParam: "gsessionid",
						initMessageHeaders: {},
						messageUrlParams: {
							database: `projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`,
						},
						sendRawJson: !0,
						supportsCrossDomainXhr: !0,
						internalChannelParams: { forwardChannelRequestTimeoutMs: 6e5 },
						forceLongPolling: this.forceLongPolling,
						detectBufferingProxy: this.autoDetectLongPolling,
					},
					u = this.longPollingOptions.timeoutSeconds;
				void 0 !== u && (o.longPollingTimeout = Math.round(1e3 * u)),
					this.useFetchStreams && (o.useFetchStreams = !0),
					this.zo(o.initMessageHeaders, t, r),
					(o.encodeInitMessageHeaders = !0);
				const h = i.join("");
				M(nz, `Creating RPC '${e}' stream ${n}: ${h}`, o);
				const m = s.createWebChannel(h, o);
				this.T_(m);
				let y = !1,
					v = !1,
					w = new n$({
						Ho: (t) => {
							v
								? M(
										nz,
										`Not sending because RPC '${e}' stream ${n} is closed:`,
										t,
									)
								: (y ||
										(M(nz, `Opening RPC '${e}' stream ${n} transport.`),
										m.open(),
										(y = !0)),
									M(nz, `RPC '${e}' stream ${n} sending:`, t),
									m.send(t));
						},
						Yo: () => m.close(),
					}),
					_ = (e, t, r) => {
						e.listen(t, (e) => {
							try {
								r(e);
							} catch (e) {
								setTimeout(() => {
									throw e;
								}, 0);
							}
						});
					};
				return (
					_(m, l.EventType.OPEN, () => {
						v || (M(nz, `RPC '${e}' stream ${n} transport opened.`), w.s_());
					}),
					_(m, l.EventType.CLOSE, () => {
						v ||
							((v = !0),
							M(nz, `RPC '${e}' stream ${n} transport closed`),
							w.__(),
							this.I_(m));
					}),
					_(m, l.EventType.ERROR, (t) => {
						v ||
							((v = !0),
							V(
								nz,
								`RPC '${e}' stream ${n} transport errored. Name:`,
								t.name,
								"Message:",
								t.message,
							),
							w.__(
								new z($.UNAVAILABLE, "The operation could not be completed"),
							));
					}),
					_(m, l.EventType.MESSAGE, (t) => {
						var r;
						if (!v) {
							const i = t.data[0];
							q(!!i, 16349);
							const s =
								(null == i ? void 0 : i.error) ||
								(null == (r = i[0]) ? void 0 : r.error);
							if (s) {
								M(nz, `RPC '${e}' stream ${n} received error:`, s);
								let t = s.status,
									r = ((e) => {
										const t = g[e];
										if (void 0 !== t) return rT(t);
									})(t),
									i = s.message;
								void 0 === r &&
									((r = $.INTERNAL),
									(i =
										"Unknown error status: " +
										t +
										" with message " +
										s.message)),
									(v = !0),
									w.__(new z(r, i)),
									m.close();
							} else M(nz, `RPC '${e}' stream ${n} received:`, i), w.a_(i);
						}
					}),
					_(a, d.STAT_EVENT, (t) => {
						t.stat === c.PROXY
							? M(nz, `RPC '${e}' stream ${n} detected buffering proxy`)
							: t.stat === c.NOPROXY &&
								M(nz, `RPC '${e}' stream ${n} detected no buffering proxy`);
					}),
					setTimeout(() => {
						w.o_();
					}, 0),
					w
				);
			}
			terminate() {
				this.u_.forEach((e) => e.close()), (this.u_ = []);
			}
			T_(e) {
				this.u_.push(e);
			}
			I_(e) {
				this.u_ = this.u_.filter((t) => t === e);
			}
		}
		function nG() {
			return "u" > typeof document ? document : null;
		}
		function nK(e) {
			return new rq(e, !0);
		}
		class nW {
			constructor(e, t, r = 1e3, n = 1.5, i = 6e4) {
				(this.Fi = e),
					(this.timerId = t),
					(this.d_ = r),
					(this.E_ = n),
					(this.A_ = i),
					(this.R_ = 0),
					(this.V_ = null),
					(this.m_ = Date.now()),
					this.reset();
			}
			reset() {
				this.R_ = 0;
			}
			f_() {
				this.R_ = this.A_;
			}
			g_(e) {
				this.cancel();
				const t = Math.floor(this.R_ + this.p_()),
					r = Math.max(0, Date.now() - this.m_),
					n = Math.max(0, t - r);
				n > 0 &&
					M(
						"ExponentialBackoff",
						`Backing off for ${n} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`,
					),
					(this.V_ = this.Fi.enqueueAfterDelay(
						this.timerId,
						n,
						() => ((this.m_ = Date.now()), e()),
					)),
					(this.R_ *= this.E_),
					this.R_ < this.d_ && (this.R_ = this.d_),
					this.R_ > this.A_ && (this.R_ = this.A_);
			}
			y_() {
				null !== this.V_ && (this.V_.skipDelay(), (this.V_ = null));
			}
			cancel() {
				null !== this.V_ && (this.V_.cancel(), (this.V_ = null));
			}
			p_() {
				return (Math.random() - 0.5) * this.R_;
			}
		}
		const nQ = "PersistentStream";
		class nJ {
			constructor(e, t, r, n, i, s, a, o) {
				(this.Fi = e),
					(this.w_ = r),
					(this.S_ = n),
					(this.connection = i),
					(this.authCredentialsProvider = s),
					(this.appCheckCredentialsProvider = a),
					(this.listener = o),
					(this.state = 0),
					(this.b_ = 0),
					(this.D_ = null),
					(this.v_ = null),
					(this.stream = null),
					(this.C_ = 0),
					(this.F_ = new nW(e, t));
			}
			M_() {
				return 1 === this.state || 5 === this.state || this.x_();
			}
			x_() {
				return 2 === this.state || 3 === this.state;
			}
			start() {
				(this.C_ = 0), 4 !== this.state ? this.auth() : this.O_();
			}
			async stop() {
				this.M_() && (await this.close(0));
			}
			N_() {
				(this.state = 0), this.F_.reset();
			}
			B_() {
				this.x_() &&
					null === this.D_ &&
					(this.D_ = this.Fi.enqueueAfterDelay(this.w_, 6e4, () => this.L_()));
			}
			k_(e) {
				this.q_(), this.stream.send(e);
			}
			async L_() {
				if (this.x_()) return this.close(0);
			}
			q_() {
				this.D_ && (this.D_.cancel(), (this.D_ = null));
			}
			Q_() {
				this.v_ && (this.v_.cancel(), (this.v_ = null));
			}
			async close(e, t) {
				this.q_(),
					this.Q_(),
					this.F_.cancel(),
					this.b_++,
					4 !== e
						? this.F_.reset()
						: t && t.code === $.RESOURCE_EXHAUSTED
							? (U(t.toString()),
								U(
									"Using maximum backoff delay to prevent overloading the backend.",
								),
								this.F_.f_())
							: t &&
								t.code === $.UNAUTHENTICATED &&
								3 !== this.state &&
								(this.authCredentialsProvider.invalidateToken(),
								this.appCheckCredentialsProvider.invalidateToken()),
					null !== this.stream &&
						(this.U_(), this.stream.close(), (this.stream = null)),
					(this.state = e),
					await this.listener.n_(t);
			}
			U_() {}
			auth() {
				this.state = 1;
				const e = this.K_(this.b_),
					t = this.b_;
				Promise.all([
					this.authCredentialsProvider.getToken(),
					this.appCheckCredentialsProvider.getToken(),
				]).then(
					([e, r]) => {
						this.b_ === t && this.W_(e, r);
					},
					(t) => {
						e(() => {
							const e = new z(
								$.UNKNOWN,
								"Fetching auth token failed: " + t.message,
							);
							return this.G_(e);
						});
					},
				);
			}
			W_(e, t) {
				const r = this.K_(this.b_);
				(this.stream = this.z_(e, t)),
					this.stream.Zo(() => {
						r(() => this.listener.Zo());
					}),
					this.stream.e_(() => {
						r(
							() => (
								(this.state = 2),
								(this.v_ = this.Fi.enqueueAfterDelay(
									this.S_,
									1e4,
									() => (this.x_() && (this.state = 3), Promise.resolve()),
								)),
								this.listener.e_()
							),
						);
					}),
					this.stream.n_((e) => {
						r(() => this.G_(e));
					}),
					this.stream.onMessage((e) => {
						r(() => (1 == ++this.C_ ? this.j_(e) : this.onNext(e)));
					});
			}
			O_() {
				(this.state = 5),
					this.F_.g_(async () => {
						(this.state = 0), this.start();
					});
			}
			G_(e) {
				return (
					M(nQ, `close with error: ${e}`),
					(this.stream = null),
					this.close(4, e)
				);
			}
			K_(e) {
				return (t) => {
					this.Fi.enqueueAndForget(() =>
						this.b_ === e
							? t()
							: (M(nQ, "stream callback skipped by getCloseGuardedDispatcher."),
								Promise.resolve()),
					);
				};
			}
		}
		class nX extends nJ {
			constructor(e, t, r, n, i, s) {
				super(
					e,
					"listen_stream_connection_backoff",
					"listen_stream_idle",
					"health_check_timeout",
					t,
					r,
					n,
					s,
				),
					(this.serializer = i);
			}
			z_(e, t) {
				return this.connection.P_("Listen", e, t);
			}
			j_(e) {
				return this.onNext(e);
			}
			onNext(e) {
				this.F_.reset();
				const t = ((e, t) => {
						let r;
						if ("targetChange" in t) {
							var n, i;
							t.targetChange;
							const s =
									"NO_CHANGE" ===
									(n = t.targetChange.targetChangeType || "NO_CHANGE")
										? 0
										: "ADD" === n
											? 1
											: "REMOVE" === n
												? 2
												: "CURRENT" === n
													? 3
													: "RESET" === n
														? 4
														: j(39313, { state: n }),
								a = t.targetChange.targetIds || [],
								o =
									((i = t.targetChange.resumeToken),
									e.useProto3Json
										? (q(void 0 === i || "string" == typeof i, 58123),
											eF.fromBase64String(i || ""))
										: (q(
												void 0 === i ||
													i instanceof E.Buffer ||
													i instanceof Uint8Array,
												16193,
											),
											eF.fromUint8Array(i || new Uint8Array()))),
								l = t.targetChange.cause;
							r = new rx(
								s,
								a,
								o,
								(l &&
									new z(
										void 0 === l.code ? $.UNKNOWN : rT(l.code),
										l.message || "",
									)) ||
									null,
							);
						} else if ("documentChange" in t) {
							t.documentChange;
							const n = t.documentChange;
							n.document, n.document.name, n.document.updateTime;
							const i = rX(e, n.document.name),
								s = rG(n.document.updateTime),
								a = n.document.createTime
									? rG(n.document.createTime)
									: eE.min(),
								o = new tc({ mapValue: { fields: n.document.fields } }),
								l = td.newFoundDocument(i, s, a, o);
							r = new rO(n.targetIds || [], n.removedTargetIds || [], l.key, l);
						} else if ("documentDelete" in t) {
							t.documentDelete;
							const n = t.documentDelete;
							n.document;
							const i = rX(e, n.document),
								s = n.readTime ? rG(n.readTime) : eE.min(),
								a = td.newNoDocument(i, s);
							r = new rO([], n.removedTargetIds || [], a.key, a);
						} else if ("documentRemove" in t) {
							t.documentRemove;
							const n = t.documentRemove;
							n.document;
							const i = rX(e, n.document);
							r = new rO([], n.removedTargetIds || [], i, null);
						} else {
							if (!("filter" in t)) return j(11601, { At: t });
							{
								t.filter;
								const e = t.filter;
								e.targetId;
								const { count: n = 0, unchangedNames: i } = e,
									s = new rI(n, i);
								r = new rP(e.targetId, s);
							}
						}
						return r;
					})(this.serializer, e),
					r = ((e) => {
						if (!("targetChange" in e)) return eE.min();
						const t = e.targetChange;
						return t.targetIds && t.targetIds.length
							? eE.min()
							: t.readTime
								? rG(t.readTime)
								: eE.min();
					})(e);
				return this.listener.J_(t, r);
			}
			H_(e) {
				let t,
					r = {};
				(r.database = rZ(this.serializer)),
					(r.addTarget = ((e, t) => {
						var r, n;
						let i,
							s,
							a,
							o,
							l,
							u,
							h,
							c = t.target;
						if (
							(((i = tx(c)
								? { documents: { documents: [rY(e, c.path)] } }
								: {
										query: ((a = { structuredQuery: {} }),
										(o = c.path),
										null !== c.collectionGroup
											? ((s = o),
												(a.structuredQuery.from = [
													{
														collectionId: c.collectionGroup,
														allDescendants: !0,
													},
												]))
											: ((s = o.popLast()),
												(a.structuredQuery.from = [
													{ collectionId: o.lastSegment() },
												])),
										(a.parent = rY(e, s)),
										(l = ((e) => {
											if (0 !== e.length)
												return (function e(t) {
													var r;
													let n;
													return t instanceof tv
														? ((e) => {
																if ("==" === e.op) {
																	if (ta(e.value))
																		return {
																			unaryFilter: {
																				field: r2(e.field),
																				op: "IS_NAN",
																			},
																		};
																	if (ts(e.value))
																		return {
																			unaryFilter: {
																				field: r2(e.field),
																				op: "IS_NULL",
																			},
																		};
																} else if ("!=" === e.op) {
																	if (ta(e.value))
																		return {
																			unaryFilter: {
																				field: r2(e.field),
																				op: "IS_NOT_NAN",
																			},
																		};
																	if (ts(e.value))
																		return {
																			unaryFilter: {
																				field: r2(e.field),
																				op: "IS_NOT_NULL",
																			},
																		};
																}
																return {
																	fieldFilter: {
																		field: r2(e.field),
																		op: rj[e.op],
																		value: e.value,
																	},
																};
															})(t)
														: t instanceof tw
															? 1 ===
																(n = (r = t).getFilters().map((t) => e(t)))
																	.length
																? n[0]
																: {
																		compositeFilter: {
																			op: rB[r.op],
																			filters: n,
																		},
																	}
															: j(54877, { filter: t });
												})(tw.create(e, "and"));
										})(c.filters)) && (a.structuredQuery.where = l),
										(u = ((e) => {
											if (0 !== e.length)
												return e.map((e) => ({
													field: r2(e.field),
													direction: rF[e.dir],
												}));
										})(c.orderBy)) && (a.structuredQuery.orderBy = u),
										null !== (h = r$(e, c.limit)) &&
											(a.structuredQuery.limit = h),
										c.startAt &&
											(a.structuredQuery.startAt = {
												before: (r = c.startAt).inclusive,
												values: r.position,
											}),
										c.endAt &&
											(a.structuredQuery.endAt = {
												before: !(n = c.endAt).inclusive,
												values: n.position,
											}),
										{ Vt: a, parent: s }).Vt,
									}).targetId = t.targetId),
							t.resumeToken.approximateByteSize() > 0)
						) {
							i.resumeToken = rH(e, t.resumeToken);
							const r = r$(e, t.expectedCount);
							null !== r && (i.expectedCount = r);
						} else if (t.snapshotVersion.compareTo(eE.min()) > 0) {
							i.readTime = rz(e, t.snapshotVersion.toTimestamp());
							const r = r$(e, t.expectedCount);
							null !== r && (i.expectedCount = r);
						}
						return i;
					})(this.serializer, e));
				const n =
					(this.serializer,
					null ==
					(t = ((e) => {
						switch (e) {
							case "TargetPurposeListen":
								return null;
							case "TargetPurposeExistenceFilterMismatch":
								return "existence-filter-mismatch";
							case "TargetPurposeExistenceFilterMismatchBloom":
								return "existence-filter-mismatch-bloom";
							case "TargetPurposeLimboResolution":
								return "limbo-document";
							default:
								return j(28987, { purpose: e });
						}
					})(e.purpose))
						? null
						: { "goog-listen-tags": t });
				n && (r.labels = n), this.k_(r);
			}
			Y_(e) {
				const t = {};
				(t.database = rZ(this.serializer)), (t.removeTarget = e), this.k_(t);
			}
		}
		class nY extends nJ {
			constructor(e, t, r, n, i, s) {
				super(
					e,
					"write_stream_connection_backoff",
					"write_stream_idle",
					"health_check_timeout",
					t,
					r,
					n,
					s,
				),
					(this.serializer = i);
			}
			get Z_() {
				return this.C_ > 0;
			}
			start() {
				(this.lastStreamToken = void 0), super.start();
			}
			U_() {
				this.Z_ && this.X_([]);
			}
			z_(e, t) {
				return this.connection.P_("Write", e, t);
			}
			j_(e) {
				return (
					q(!!e.streamToken, 31322),
					(this.lastStreamToken = e.streamToken),
					q(!e.writeResults || 0 === e.writeResults.length, 55816),
					this.listener.ea()
				);
			}
			onNext(e) {
				var t, r;
				q(!!e.streamToken, 12678),
					(this.lastStreamToken = e.streamToken),
					this.F_.reset();
				const n =
						((t = e.writeResults),
						(r = e.commitTime),
						t && t.length > 0
							? (q(void 0 !== r, 14353),
								t.map((e) => {
									let t;
									return (
										(t = e.updateTime ? rG(e.updateTime) : rG(r)).isEqual(
											eE.min(),
										) && (t = rG(r)),
										new ra(t, e.transformResults || [])
									);
								}))
							: []),
					i = rG(e.commitTime);
				return this.listener.ta(i, n);
			}
			na() {
				const e = {};
				(e.database = rZ(this.serializer)), this.k_(e);
			}
			X_(e) {
				const t = {
					streamToken: this.lastStreamToken,
					writes: e.map((e) =>
						((e, t) => {
							var r, n;
							let i;
							if (t instanceof rf) i = { update: r1(e, t.key, t.value) };
							else if (t instanceof rv) i = { delete: rJ(e, t.key) };
							else if (t instanceof rp) {
								let r;
								i = {
									update: r1(e, t.key, t.data),
									updateMask:
										((n = t.fieldMask),
										(r = []),
										n.fields.forEach((e) => r.push(e.canonicalString())),
										{ fieldPaths: r }),
								};
							} else {
								if (!(t instanceof rw)) return j(16599, { Rt: t.type });
								i = { verify: rJ(e, t.key) };
							}
							return (
								t.fieldTransforms.length > 0 &&
									(i.updateTransforms = t.fieldTransforms.map((e) =>
										((e, t) => {
											const r = t.transform;
											if (r instanceof t7)
												return {
													fieldPath: t.field.canonicalString(),
													setToServerValue: "REQUEST_TIME",
												};
											if (r instanceof t9)
												return {
													fieldPath: t.field.canonicalString(),
													appendMissingElements: { values: r.elements },
												};
											if (r instanceof rt)
												return {
													fieldPath: t.field.canonicalString(),
													removeAllFromArray: { values: r.elements },
												};
											if (r instanceof rn)
												return {
													fieldPath: t.field.canonicalString(),
													increment: r.Ee,
												};
											throw j(20930, { transform: t.transform });
										})(0, e),
									)),
								t.precondition.isNone ||
									(i.currentDocument =
										void 0 !== (r = t.precondition).updateTime
											? { updateTime: rz(e, r.updateTime.toTimestamp()) }
											: void 0 !== r.exists
												? { exists: r.exists }
												: j(27497)),
								i
							);
						})(this.serializer, e),
					),
				};
				this.k_(t);
			}
		}
		class nZ {}
		class n0 extends nZ {
			constructor(e, t, r, n) {
				super(),
					(this.authCredentials = e),
					(this.appCheckCredentials = t),
					(this.connection = r),
					(this.serializer = n),
					(this.ra = !1);
			}
			ia() {
				if (this.ra)
					throw new z(
						$.FAILED_PRECONDITION,
						"The client has already been terminated.",
					);
			}
			Wo(e, t, r, n) {
				return (
					this.ia(),
					Promise.all([
						this.authCredentials.getToken(),
						this.appCheckCredentials.getToken(),
					])
						.then(([i, s]) => this.connection.Wo(e, rW(t, r), n, i, s))
						.catch((e) => {
							throw "FirebaseError" === e.name
								? (e.code === $.UNAUTHENTICATED &&
										(this.authCredentials.invalidateToken(),
										this.appCheckCredentials.invalidateToken()),
									e)
								: new z($.UNKNOWN, e.toString());
						})
				);
			}
			Jo(e, t, r, n, i) {
				return (
					this.ia(),
					Promise.all([
						this.authCredentials.getToken(),
						this.appCheckCredentials.getToken(),
					])
						.then(([s, a]) => this.connection.Jo(e, rW(t, r), n, s, a, i))
						.catch((e) => {
							throw "FirebaseError" === e.name
								? (e.code === $.UNAUTHENTICATED &&
										(this.authCredentials.invalidateToken(),
										this.appCheckCredentials.invalidateToken()),
									e)
								: new z($.UNKNOWN, e.toString());
						})
				);
			}
			terminate() {
				(this.ra = !0), this.connection.terminate();
			}
		}
		class n1 {
			constructor(e, t) {
				(this.asyncQueue = e),
					(this.onlineStateHandler = t),
					(this.state = "Unknown"),
					(this.sa = 0),
					(this.oa = null),
					(this._a = !0);
			}
			aa() {
				0 === this.sa &&
					(this.ua("Unknown"),
					(this.oa = this.asyncQueue.enqueueAfterDelay(
						"online_state_timeout",
						1e4,
						() => (
							(this.oa = null),
							this.ca("Backend didn't respond within 10 seconds."),
							this.ua("Offline"),
							Promise.resolve()
						),
					)));
			}
			la(e) {
				"Online" === this.state
					? this.ua("Unknown")
					: (this.sa++,
						this.sa >= 1 &&
							(this.ha(),
							this.ca(
								`Connection failed 1 times. Most recent error: ${e.toString()}`,
							),
							this.ua("Offline")));
			}
			set(e) {
				this.ha(), (this.sa = 0), "Online" === e && (this._a = !1), this.ua(e);
			}
			ua(e) {
				e !== this.state && ((this.state = e), this.onlineStateHandler(e));
			}
			ca(e) {
				const t = `Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;
				this._a ? (U(t), (this._a = !1)) : M("OnlineStateTracker", t);
			}
			ha() {
				null !== this.oa && (this.oa.cancel(), (this.oa = null));
			}
		}
		const n2 = "RemoteStore";
		class n6 {
			constructor(e, t, r, n, i) {
				(this.localStore = e),
					(this.datastore = t),
					(this.asyncQueue = r),
					(this.remoteSyncer = {}),
					(this.Pa = []),
					(this.Ta = new Map()),
					(this.Ia = new Set()),
					(this.da = []),
					(this.Ea = i),
					this.Ea.xo((e) => {
						r.enqueueAndForget(async () => {
							ir(this) &&
								(M(n2, "Restarting streams for network reachability change."),
								await (async (e) => {
									e.Ia.add(4),
										await n5(e),
										e.Aa.set("Unknown"),
										e.Ia.delete(4),
										await n3(e);
								})(this));
						});
					}),
					(this.Aa = new n1(r, n));
			}
		}
		async function n3(e) {
			if (ir(e)) for (const t of e.da) await t(!0);
		}
		async function n5(e) {
			for (const t of e.da) await t(!1);
		}
		function n4(e, t) {
			e.Ta.has(t.targetId) ||
				(e.Ta.set(t.targetId, t), it(e) ? ie(e) : i_(e).x_() && n7(e, t));
		}
		function n8(e, t) {
			const r = i_(e);
			e.Ta.delete(t),
				r.x_() && n9(e, t),
				0 === e.Ta.size && (r.x_() ? r.B_() : ir(e) && e.Aa.set("Unknown"));
		}
		function n7(e, t) {
			if (
				(e.Ra.$e(t.targetId),
				t.resumeToken.approximateByteSize() > 0 ||
					t.snapshotVersion.compareTo(eE.min()) > 0)
			) {
				const r = e.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;
				t = t.withExpectedCount(r);
			}
			i_(e).H_(t);
		}
		function n9(e, t) {
			e.Ra.$e(t), i_(e).Y_(t);
		}
		function ie(e) {
			(e.Ra = new rM({
				getRemoteKeysForTarget: (t) => e.remoteSyncer.getRemoteKeysForTarget(t),
				Et: (t) => e.Ta.get(t) || null,
				lt: () => e.datastore.serializer.databaseId,
			})),
				i_(e).start(),
				e.Aa.aa();
		}
		function it(e) {
			return ir(e) && !i_(e).M_() && e.Ta.size > 0;
		}
		function ir(e) {
			return 0 === e.Ia.size;
		}
		async function ii(e) {
			e.Aa.set("Online");
		}
		async function is(e) {
			e.Ta.forEach((t, r) => {
				n7(e, t);
			});
		}
		async function ia(e, t) {
			(e.Ra = void 0), it(e) ? (e.Aa.la(t), ie(e)) : e.Aa.set("Unknown");
		}
		async function io(e, t, r) {
			if ((e.Aa.set("Online"), t instanceof rx && 2 === t.state && t.cause))
				try {
					await (async (e, t) => {
						const r = t.cause;
						for (const n of t.targetIds)
							e.Ta.has(n) &&
								(await e.remoteSyncer.rejectListen(n, r),
								e.Ta.delete(n),
								e.Ra.removeTarget(n));
					})(e, t);
				} catch (r) {
					M(n2, "Failed to remove targets %s: %s ", t.targetIds.join(","), r),
						await il(e, r);
				}
			else if (
				(t instanceof rO
					? e.Ra.Ye(t)
					: t instanceof rP
						? e.Ra.it(t)
						: e.Ra.et(t),
				!r.isEqual(eE.min()))
			)
				try {
					let t,
						n = await nN(e.localStore);
					r.compareTo(n) >= 0 &&
						(await ((t = e.Ra.Pt(r)).targetChanges.forEach((t, n) => {
							if (t.resumeToken.approximateByteSize() > 0) {
								const i = e.Ta.get(n);
								i && e.Ta.set(n, i.withResumeToken(t.resumeToken, r));
							}
						}),
						t.targetMismatches.forEach((t, r) => {
							const n = e.Ta.get(t);
							if (!n) return;
							e.Ta.set(
								t,
								n.withResumeToken(eF.EMPTY_BYTE_STRING, n.snapshotVersion),
							),
								n9(e, t);
							const i = new r5(n.target, t, r, n.sequenceNumber);
							n7(e, i);
						}),
						e.remoteSyncer.applyRemoteEvent(t)));
				} catch (t) {
					M(n2, "Failed to raise snapshot:", t), await il(e, t);
				}
		}
		async function il(e, t, r) {
			if (!eC(t)) throw t;
			e.Ia.add(1),
				await n5(e),
				e.Aa.set("Offline"),
				r || (r = () => nN(e.localStore)),
				e.asyncQueue.enqueueRetryable(async () => {
					M(n2, "Retrying IndexedDB access"),
						await r(),
						e.Ia.delete(1),
						await n3(e);
				});
		}
		function iu(e, t) {
			return t().catch((r) => il(e, r, t));
		}
		async function ih(e) {
			var t;
			let r = iE(e),
				n = e.Pa.length > 0 ? e.Pa[e.Pa.length - 1].batchId : -1;
			for (; ir((t = e)) && t.Pa.length < 10; )
				try {
					const t = await ((e, t) =>
						e.persistence.runTransaction(
							"Get next mutation batch",
							"readonly",
							(r) => (
								void 0 === t && (t = -1),
								e.mutationQueue.getNextMutationBatchAfterBatchId(r, t)
							),
						))(e.localStore, n);
					if (null === t) {
						0 === e.Pa.length && r.B_();
						break;
					}
					(n = t.batchId),
						((e, t) => {
							e.Pa.push(t);
							const r = iE(e);
							r.x_() && r.Z_ && r.X_(t.mutations);
						})(e, t);
				} catch (t) {
					await il(e, t);
				}
			ic(e) && id(e);
		}
		function ic(e) {
			return ir(e) && !iE(e).M_() && e.Pa.length > 0;
		}
		function id(e) {
			iE(e).start();
		}
		async function ip(e) {
			iE(e).na();
		}
		async function ig(e) {
			const t = iE(e);
			for (const r of e.Pa) t.X_(r.mutations);
		}
		async function im(e, t, r) {
			const n = e.Pa.shift(),
				i = rE.from(n, t, r);
			await iu(e, () => e.remoteSyncer.applySuccessfulWrite(i)), await ih(e);
		}
		async function iy(e, t) {
			t &&
				iE(e).Z_ &&
				(await (async (e, t) => {
					var r;
					if (
						((e) => {
							switch (e) {
								case $.OK:
									return j(64938);
								case $.CANCELLED:
								case $.UNKNOWN:
								case $.DEADLINE_EXCEEDED:
								case $.RESOURCE_EXHAUSTED:
								case $.INTERNAL:
								case $.UNAVAILABLE:
								case $.UNAUTHENTICATED:
									return !1;
								case $.INVALID_ARGUMENT:
								case $.NOT_FOUND:
								case $.ALREADY_EXISTS:
								case $.PERMISSION_DENIED:
								case $.FAILED_PRECONDITION:
								case $.ABORTED:
								case $.OUT_OF_RANGE:
								case $.UNIMPLEMENTED:
								case $.DATA_LOSS:
									return !0;
								default:
									return j(15467, { code: e });
							}
						})((r = t.code)) &&
						r !== $.ABORTED
					) {
						const r = e.Pa.shift();
						iE(e).N_(),
							await iu(e, () => e.remoteSyncer.rejectFailedWrite(r.batchId, t)),
							await ih(e);
					}
				})(e, t)),
				ic(e) && id(e);
		}
		async function iv(e, t) {
			e.asyncQueue.verifyOperationInProgress(),
				M(n2, "RemoteStore received new credentials");
			const r = ir(e);
			e.Ia.add(3),
				await n5(e),
				r && e.Aa.set("Unknown"),
				await e.remoteSyncer.handleCredentialChange(t),
				e.Ia.delete(3),
				await n3(e);
		}
		async function iw(e, t) {
			t
				? (e.Ia.delete(2), await n3(e))
				: t || (e.Ia.add(2), await n5(e), e.Aa.set("Unknown"));
		}
		function i_(e) {
			var t, r, n;
			return (
				e.Va ||
					((t = e.datastore),
					(r = e.asyncQueue),
					(n = {
						Zo: ii.bind(null, e),
						e_: is.bind(null, e),
						n_: ia.bind(null, e),
						J_: io.bind(null, e),
					}),
					t.ia(),
					(e.Va = new nX(
						r,
						t.connection,
						t.authCredentials,
						t.appCheckCredentials,
						t.serializer,
						n,
					)),
					e.da.push(async (t) => {
						t
							? (e.Va.N_(), it(e) ? ie(e) : e.Aa.set("Unknown"))
							: (await e.Va.stop(), (e.Ra = void 0));
					})),
				e.Va
			);
		}
		function iE(e) {
			var t, r, n;
			return (
				e.ma ||
					((t = e.datastore),
					(r = e.asyncQueue),
					(n = {
						Zo: () => Promise.resolve(),
						e_: ip.bind(null, e),
						n_: iy.bind(null, e),
						ea: ig.bind(null, e),
						ta: im.bind(null, e),
					}),
					t.ia(),
					(e.ma = new nY(
						r,
						t.connection,
						t.authCredentials,
						t.appCheckCredentials,
						t.serializer,
						n,
					)),
					e.da.push(async (t) => {
						t
							? (e.ma.N_(), await ih(e))
							: (await e.ma.stop(),
								e.Pa.length > 0 &&
									(M(
										n2,
										`Stopping write stream with ${e.Pa.length} pending writes`,
									),
									(e.Pa = [])));
					})),
				e.ma
			);
		}
		class ib {
			constructor(e, t, r, n, i) {
				(this.asyncQueue = e),
					(this.timerId = t),
					(this.targetTimeMs = r),
					(this.op = n),
					(this.removalCallback = i),
					(this.deferred = new H()),
					(this.then = this.deferred.promise.then.bind(this.deferred.promise)),
					this.deferred.promise.catch((e) => {});
			}
			get promise() {
				return this.deferred.promise;
			}
			static createAndSchedule(e, t, r, n, i) {
				const s = new ib(e, t, Date.now() + r, n, i);
				return s.start(r), s;
			}
			start(e) {
				this.timerHandle = setTimeout(() => this.handleDelayElapsed(), e);
			}
			skipDelay() {
				return this.handleDelayElapsed();
			}
			cancel(e) {
				null !== this.timerHandle &&
					(this.clearTimeout(),
					this.deferred.reject(
						new z($.CANCELLED, "Operation cancelled" + (e ? ": " + e : "")),
					));
			}
			handleDelayElapsed() {
				this.asyncQueue.enqueueAndForget(() =>
					null !== this.timerHandle
						? (this.clearTimeout(),
							this.op().then((e) => this.deferred.resolve(e)))
						: Promise.resolve(),
				);
			}
			clearTimeout() {
				null !== this.timerHandle &&
					(this.removalCallback(this),
					clearTimeout(this.timerHandle),
					(this.timerHandle = null));
			}
		}
		function iI(e, t) {
			if ((U("AsyncQueue", `${t}: ${e}`), eC(e)))
				return new z($.UNAVAILABLE, `${t}: ${e}`);
			throw e;
		}
		class iT {
			static emptySet(e) {
				return new iT(e.comparator);
			}
			constructor(e) {
				(this.comparator = e
					? (t, r) => e(t, r) || ec.comparator(t.key, r.key)
					: (e, t) => ec.comparator(e.key, t.key)),
					(this.keyedMap = tX()),
					(this.sortedSet = new eO(this.comparator));
			}
			has(e) {
				return null != this.keyedMap.get(e);
			}
			get(e) {
				return this.keyedMap.get(e);
			}
			first() {
				return this.sortedSet.minKey();
			}
			last() {
				return this.sortedSet.maxKey();
			}
			isEmpty() {
				return this.sortedSet.isEmpty();
			}
			indexOf(e) {
				const t = this.keyedMap.get(e);
				return t ? this.sortedSet.indexOf(t) : -1;
			}
			get size() {
				return this.sortedSet.size;
			}
			forEach(e) {
				this.sortedSet.inorderTraversal((t, r) => (e(t), !1));
			}
			add(e) {
				const t = this.delete(e.key);
				return t.copy(t.keyedMap.insert(e.key, e), t.sortedSet.insert(e, null));
			}
			delete(e) {
				const t = this.get(e);
				return t
					? this.copy(this.keyedMap.remove(e), this.sortedSet.remove(t))
					: this;
			}
			isEqual(e) {
				if (!(e instanceof iT) || this.size !== e.size) return !1;
				const t = this.sortedSet.getIterator(),
					r = e.sortedSet.getIterator();
				for (; t.hasNext(); ) {
					const e = t.getNext().key,
						n = r.getNext().key;
					if (!e.isEqual(n)) return !1;
				}
				return !0;
			}
			toString() {
				const e = [];
				return (
					this.forEach((t) => {
						e.push(t.toString());
					}),
					0 === e.length
						? "DocumentSet ()"
						: "DocumentSet (\n  " + e.join("  \n") + "\n)"
				);
			}
			copy(e, t) {
				const r = new iT();
				return (
					(r.comparator = this.comparator),
					(r.keyedMap = e),
					(r.sortedSet = t),
					r
				);
			}
		}
		class iS {
			constructor() {
				this.fa = new eO(ec.comparator);
			}
			track(e) {
				const t = e.doc.key,
					r = this.fa.get(t);
				r
					? 0 !== e.type && 3 === r.type
						? (this.fa = this.fa.insert(t, e))
						: 3 === e.type && 1 !== r.type
							? (this.fa = this.fa.insert(t, { type: r.type, doc: e.doc }))
							: 2 === e.type && 2 === r.type
								? (this.fa = this.fa.insert(t, { type: 2, doc: e.doc }))
								: 2 === e.type && 0 === r.type
									? (this.fa = this.fa.insert(t, { type: 0, doc: e.doc }))
									: 1 === e.type && 0 === r.type
										? (this.fa = this.fa.remove(t))
										: 1 === e.type && 2 === r.type
											? (this.fa = this.fa.insert(t, { type: 1, doc: r.doc }))
											: 0 === e.type && 1 === r.type
												? (this.fa = this.fa.insert(t, { type: 2, doc: e.doc }))
												: j(63341, { At: e, ga: r })
					: (this.fa = this.fa.insert(t, e));
			}
			pa() {
				const e = [];
				return (
					this.fa.inorderTraversal((t, r) => {
						e.push(r);
					}),
					e
				);
			}
		}
		class iC {
			constructor(e, t, r, n, i, s, a, o, l) {
				(this.query = e),
					(this.docs = t),
					(this.oldDocs = r),
					(this.docChanges = n),
					(this.mutatedKeys = i),
					(this.fromCache = s),
					(this.syncStateChanged = a),
					(this.excludesMetadataChanges = o),
					(this.hasCachedResults = l);
			}
			static fromInitialDocuments(e, t, r, n, i) {
				const s = [];
				return (
					t.forEach((e) => {
						s.push({ type: 0, doc: e });
					}),
					new iC(e, t, iT.emptySet(t), s, r, n, !0, !1, i)
				);
			}
			get hasPendingWrites() {
				return !this.mutatedKeys.isEmpty();
			}
			isEqual(e) {
				if (
					!(
						this.fromCache === e.fromCache &&
						this.hasCachedResults === e.hasCachedResults &&
						this.syncStateChanged === e.syncStateChanged &&
						this.mutatedKeys.isEqual(e.mutatedKeys) &&
						t$(this.query, e.query) &&
						this.docs.isEqual(e.docs) &&
						this.oldDocs.isEqual(e.oldDocs)
					)
				)
					return !1;
				const t = this.docChanges,
					r = e.docChanges;
				if (t.length !== r.length) return !1;
				for (let e = 0; e < t.length; e++)
					if (t[e].type !== r[e].type || !t[e].doc.isEqual(r[e].doc)) return !1;
				return !0;
			}
		}
		class iA {
			constructor() {
				(this.ya = void 0), (this.wa = []);
			}
			Sa() {
				return this.wa.some((e) => e.ba());
			}
		}
		class ik {
			constructor() {
				(this.queries = iR()),
					(this.onlineState = "Unknown"),
					(this.Da = new Set());
			}
			terminate() {
				var e;
				let t;
				(e = new z($.ABORTED, "Firestore shutting down")),
					(t = this.queries),
					(this.queries = iR()),
					t.forEach((t, r) => {
						for (const t of r.wa) t.onError(e);
					});
			}
		}
		function iR() {
			return new tW((e) => tz(e), t$);
		}
		async function iN(e, t) {
			let r = 3,
				n = t.query,
				i = e.queries.get(n);
			i ? !i.Sa() && t.ba() && (r = 2) : ((i = new iA()), (r = +!t.ba()));
			try {
				switch (r) {
					case 0:
						i.ya = await e.onListen(n, !0);
						break;
					case 1:
						i.ya = await e.onListen(n, !1);
						break;
					case 2:
						await e.onFirstRemoteStoreListen(n);
				}
			} catch (r) {
				const e = iI(r, `Initialization of query '${tH(t.query)}' failed`);
				return void t.onError(e);
			}
			e.queries.set(n, i),
				i.wa.push(t),
				t.va(e.onlineState),
				i.ya && t.Ca(i.ya) && ix(e);
		}
		async function iD(e, t) {
			let r = t.query,
				n = 3,
				i = e.queries.get(r);
			if (i) {
				const e = i.wa.indexOf(t);
				e >= 0 &&
					(i.wa.splice(e, 1),
					0 === i.wa.length ? (n = +!t.ba()) : !i.Sa() && t.ba() && (n = 2));
			}
			switch (n) {
				case 0:
					return e.queries.delete(r), e.onUnlisten(r, !0);
				case 1:
					return e.queries.delete(r), e.onUnlisten(r, !1);
				case 2:
					return e.onLastRemoteStoreUnlisten(r);
				default:
					return;
			}
		}
		function iO(e, t) {
			let r = !1;
			for (const n of t) {
				const t = n.query,
					i = e.queries.get(t);
				if (i) {
					for (const e of i.wa) e.Ca(n) && (r = !0);
					i.ya = n;
				}
			}
			r && ix(e);
		}
		function iP(e, t, r) {
			const n = e.queries.get(t);
			if (n) for (const e of n.wa) e.onError(r);
			e.queries.delete(t);
		}
		function ix(e) {
			e.Da.forEach((e) => {
				e.next();
			});
		}
		((v = y || (y = {})).Fa = "default"), (v.Cache = "cache");
		class iL {
			constructor(e, t, r) {
				(this.query = e),
					(this.Ma = t),
					(this.xa = !1),
					(this.Oa = null),
					(this.onlineState = "Unknown"),
					(this.options = r || {});
			}
			Ca(e) {
				if (!this.options.includeMetadataChanges) {
					const t = [];
					for (const r of e.docChanges) 3 !== r.type && t.push(r);
					e = new iC(
						e.query,
						e.docs,
						e.oldDocs,
						t,
						e.mutatedKeys,
						e.fromCache,
						e.syncStateChanged,
						!0,
						e.hasCachedResults,
					);
				}
				let t = !1;
				return (
					this.xa
						? this.Na(e) && (this.Ma.next(e), (t = !0))
						: this.Ba(e, this.onlineState) && (this.La(e), (t = !0)),
					(this.Oa = e),
					t
				);
			}
			onError(e) {
				this.Ma.error(e);
			}
			va(e) {
				this.onlineState = e;
				let t = !1;
				return (
					this.Oa &&
						!this.xa &&
						this.Ba(this.Oa, e) &&
						(this.La(this.Oa), (t = !0)),
					t
				);
			}
			Ba(e, t) {
				return (
					!(e.fromCache && this.ba()) ||
					((!this.options.ka || "Offline" === t) &&
						(!e.docs.isEmpty() || e.hasCachedResults || "Offline" === t))
				);
			}
			Na(e) {
				if (e.docChanges.length > 0) return !0;
				const t = this.Oa && this.Oa.hasPendingWrites !== e.hasPendingWrites;
				return (
					!(!e.syncStateChanged && !t) &&
					!0 === this.options.includeMetadataChanges
				);
			}
			La(e) {
				(e = iC.fromInitialDocuments(
					e.query,
					e.docs,
					e.mutatedKeys,
					e.fromCache,
					e.hasCachedResults,
				)),
					(this.xa = !0),
					this.Ma.next(e);
			}
			ba() {
				return this.options.source !== y.Cache;
			}
		}
		class iM {
			constructor(e) {
				this.key = e;
			}
		}
		class iU {
			constructor(e) {
				this.key = e;
			}
		}
		class iV {
			constructor(e, t) {
				(this.query = e),
					(this.Ha = t),
					(this.Ya = null),
					(this.hasCachedResults = !1),
					(this.current = !1),
					(this.Za = t2()),
					(this.mutatedKeys = t2()),
					(this.Xa = tK(e)),
					(this.eu = new iT(this.Xa));
			}
			get tu() {
				return this.Ha;
			}
			nu(e, t) {
				let r = t ? t.ru : new iS(),
					n = t ? t.eu : this.eu,
					i = t ? t.mutatedKeys : this.mutatedKeys,
					s = n,
					a = !1,
					o =
						"F" === this.query.limitType && n.size === this.query.limit
							? n.last()
							: null,
					l =
						"L" === this.query.limitType && n.size === this.query.limit
							? n.first()
							: null;
				if (
					(e.inorderTraversal((e, t) => {
						let u = n.get(e),
							h = tG(this.query, t) ? t : null,
							c = !!u && this.mutatedKeys.has(u.key),
							d =
								!!h &&
								(h.hasLocalMutations ||
									(this.mutatedKeys.has(h.key) && h.hasCommittedMutations)),
							f = !1;
						u && h
							? u.data.isEqual(h.data)
								? c !== d && (r.track({ type: 3, doc: h }), (f = !0))
								: this.iu(u, h) ||
									(r.track({ type: 2, doc: h }),
									(f = !0),
									((o && this.Xa(h, o) > 0) || (l && 0 > this.Xa(h, l))) &&
										(a = !0))
							: !u && h
								? (r.track({ type: 0, doc: h }), (f = !0))
								: u &&
									!h &&
									(r.track({ type: 1, doc: u }),
									(f = !0),
									(o || l) && (a = !0)),
							f &&
								(h
									? ((s = s.add(h)), (i = d ? i.add(e) : i.delete(e)))
									: ((s = s.delete(e)), (i = i.delete(e))));
					}),
					null !== this.query.limit)
				)
					for (; s.size > this.query.limit; ) {
						const e = "F" === this.query.limitType ? s.last() : s.first();
						(s = s.delete(e.key)),
							(i = i.delete(e.key)),
							r.track({ type: 1, doc: e });
					}
				return { eu: s, ru: r, Ds: a, mutatedKeys: i };
			}
			iu(e, t) {
				return (
					e.hasLocalMutations && t.hasCommittedMutations && !t.hasLocalMutations
				);
			}
			applyChanges(e, t, r, n) {
				const i = this.eu;
				(this.eu = e.eu), (this.mutatedKeys = e.mutatedKeys);
				const s = e.ru.pa();
				s.sort((e, t) => {
					var r, n;
					let i;
					return (
						(r = e.type),
						(n = t.type),
						(i = (e) => {
							switch (e) {
								case 0:
									return 1;
								case 2:
								case 3:
									return 2;
								case 1:
									return 0;
								default:
									return j(20277, { At: e });
							}
						})(r) - i(n) || this.Xa(e.doc, t.doc)
					);
				}),
					this.su(r),
					(n = null != n && n);
				const a = t && !n ? this.ou() : [],
					o = 0 === this.Za.size && this.current && !n ? 1 : 0,
					l = o !== this.Ya;
				return ((this.Ya = o), 0 !== s.length || l)
					? {
							snapshot: new iC(
								this.query,
								e.eu,
								i,
								s,
								e.mutatedKeys,
								0 === o,
								l,
								!1,
								!!r && r.resumeToken.approximateByteSize() > 0,
							),
							_u: a,
						}
					: { _u: a };
			}
			va(e) {
				return this.current && "Offline" === e
					? ((this.current = !1),
						this.applyChanges(
							{
								eu: this.eu,
								ru: new iS(),
								mutatedKeys: this.mutatedKeys,
								Ds: !1,
							},
							!1,
						))
					: { _u: [] };
			}
			au(e) {
				return (
					!this.Ha.has(e) &&
					!!this.eu.has(e) &&
					!this.eu.get(e).hasLocalMutations
				);
			}
			su(e) {
				e &&
					(e.addedDocuments.forEach((e) => (this.Ha = this.Ha.add(e))),
					e.modifiedDocuments.forEach((e) => {}),
					e.removedDocuments.forEach((e) => (this.Ha = this.Ha.delete(e))),
					(this.current = e.current));
			}
			ou() {
				if (!this.current) return [];
				const e = this.Za;
				(this.Za = t2()),
					this.eu.forEach((e) => {
						this.au(e.key) && (this.Za = this.Za.add(e.key));
					});
				const t = [];
				return (
					e.forEach((e) => {
						this.Za.has(e) || t.push(new iU(e));
					}),
					this.Za.forEach((r) => {
						e.has(r) || t.push(new iM(r));
					}),
					t
				);
			}
			uu(e) {
				(this.Ha = e.qs), (this.Za = t2());
				const t = this.nu(e.documents);
				return this.applyChanges(t, !0);
			}
			cu() {
				return iC.fromInitialDocuments(
					this.query,
					this.eu,
					this.mutatedKeys,
					0 === this.Ya,
					this.hasCachedResults,
				);
			}
		}
		const iF = "SyncEngine";
		class ij {
			constructor(e, t, r) {
				(this.query = e), (this.targetId = t), (this.view = r);
			}
		}
		class iB {
			constructor(e) {
				(this.key = e), (this.lu = !1);
			}
		}
		class iq {
			constructor(e, t, r, n, i, s) {
				(this.localStore = e),
					(this.remoteStore = t),
					(this.eventManager = r),
					(this.sharedClientState = n),
					(this.currentUser = i),
					(this.maxConcurrentLimboResolutions = s),
					(this.hu = {}),
					(this.Pu = new tW((e) => tz(e), t$)),
					(this.Tu = new Map()),
					(this.Iu = new Set()),
					(this.du = new eO(ec.comparator)),
					(this.Eu = new Map()),
					(this.Au = new np()),
					(this.Ru = {}),
					(this.Vu = new Map()),
					(this.mu = nr.ur()),
					(this.onlineState = "Unknown"),
					(this.fu = void 0);
			}
			get isPrimaryClient() {
				return !0 === this.fu;
			}
		}
		async function i$(e, t, r = !0) {
			let n,
				i = se(e),
				s = i.Pu.get(t);
			return (
				s
					? (i.sharedClientState.addLocalQueryTarget(s.targetId),
						(n = s.view.cu()))
					: (n = await iH(i, t, r, !0)),
				n
			);
		}
		async function iz(e, t) {
			const r = se(e);
			await iH(r, t, !0, !1);
		}
		async function iH(e, t, r, n) {
			var i, s;
			let a,
				o = await ((i = e.localStore),
				(s = tj(t)),
				i.persistence
					.runTransaction("Allocate target", "readwrite", (e) => {
						let t;
						return i.hi
							.getTargetData(e, s)
							.next((r) =>
								r
									? ((t = r), eS.resolve(t))
									: i.hi
											.allocateTargetId(e)
											.next(
												(r) => (
													(t = new r5(
														s,
														r,
														"TargetPurposeListen",
														e.currentSequenceNumber,
													)),
													i.hi.addTargetData(e, t).next(() => t)
												),
											),
							);
					})
					.then((e) => {
						const t = i.Fs.get(e.targetId);
						return (
							(null === t ||
								e.snapshotVersion.compareTo(t.snapshotVersion) > 0) &&
								((i.Fs = i.Fs.insert(e.targetId, e)), i.Ms.set(s, e.targetId)),
							e
						);
					})),
				l = o.targetId,
				u = e.sharedClientState.addLocalQueryTarget(l, r);
			return (
				n && (a = await iG(e, t, l, "current" === u, o.resumeToken)),
				e.isPrimaryClient && r && n4(e.remoteStore, o),
				a
			);
		}
		async function iG(e, t, r, n, i) {
			e.gu = (t, r, n) =>
				(async (e, t, r, n) => {
					let i = t.view.nu(r);
					i.Ds &&
						(i = await nO(e.localStore, t.query, !1).then(({ documents: e }) =>
							t.view.nu(e, i),
						));
					const s = n && n.targetChanges.get(t.targetId),
						a = n && null != n.targetMismatches.get(t.targetId),
						o = t.view.applyChanges(i, e.isPrimaryClient, s, a);
					return i5(e, t.targetId, o._u), o.snapshot;
				})(e, t, r, n);
			const s = await nO(e.localStore, t, !0),
				a = new iV(t, s.qs),
				o = a.nu(s.documents),
				l = rD.createSynthesizedTargetChangeForCurrentChange(
					r,
					n && "Offline" !== e.onlineState,
					i,
				),
				u = a.applyChanges(o, e.isPrimaryClient, l);
			i5(e, r, u._u);
			const h = new ij(t, r, a);
			return (
				e.Pu.set(t, h),
				e.Tu.has(r) ? e.Tu.get(r).push(t) : e.Tu.set(r, [t]),
				u.snapshot
			);
		}
		async function iK(e, t, r) {
			const n = e.Pu.get(t),
				i = e.Tu.get(n.targetId);
			i.length > 1
				? (e.Tu.set(
						n.targetId,
						i.filter((e) => !t$(e, t)),
					),
					e.Pu.delete(t))
				: e.isPrimaryClient
					? (e.sharedClientState.removeLocalQueryTarget(n.targetId),
						e.sharedClientState.isActiveQueryTarget(n.targetId) ||
							(await nD(e.localStore, n.targetId, !1)
								.then(() => {
									e.sharedClientState.clearQueryState(n.targetId),
										r && n8(e.remoteStore, n.targetId),
										i6(e, n.targetId);
								})
								.catch(eT)))
					: (i6(e, n.targetId), await nD(e.localStore, n.targetId, !0));
		}
		async function iW(e, t) {
			const r = e.Pu.get(t),
				n = e.Tu.get(r.targetId);
			e.isPrimaryClient &&
				1 === n.length &&
				(e.sharedClientState.removeLocalQueryTarget(r.targetId),
				n8(e.remoteStore, r.targetId));
		}
		async function iQ(e, t, r) {
			var n, i, s;
			const a =
				(((n = e).remoteStore.remoteSyncer.applySuccessfulWrite = iZ.bind(
					null,
					n,
				)),
				(n.remoteStore.remoteSyncer.rejectFailedWrite = i0.bind(null, n)),
				n);
			try {
				let e,
					n,
					o,
					l,
					u,
					h = await ((i = a.localStore),
					(o = e_.now()),
					(l = t.reduce((e, t) => e.add(t.key), t2())),
					i.persistence
						.runTransaction("Locally write mutations", "readwrite", (r) => {
							let s = tQ,
								a = t2();
							return i.Os.getEntries(r, l)
								.next((e) => {
									(s = e).forEach((e, t) => {
										t.isValidDocument() || (a = a.add(e));
									});
								})
								.next(() => i.localDocuments.getOverlayedDocuments(r, s))
								.next((n) => {
									e = n;
									const s = [];
									for (const r of t) {
										const t = ((e, t) => {
											let r = null;
											for (const n of e.fieldTransforms) {
												const e = t.data.field(n.field),
													i = t8(n.transform, e || null);
												null != i &&
													(null === r && (r = tc.empty()), r.set(n.field, i));
											}
											return r || null;
										})(r, e.get(r.key).overlayedDocument);
										null != t &&
											s.push(
												new rp(
													r.key,
													t,
													(function e(t) {
														const r = [];
														return (
															eN(t.fields, (t, n) => {
																const i = new eh([t]);
																if (to(n)) {
																	const t = e(n.mapValue).fields;
																	if (0 === t.length) r.push(i);
																	else for (const e of t) r.push(i.child(e));
																} else r.push(i);
															}),
															new eU(r)
														);
													})(t.value.mapValue),
													ro.exists(!0),
												),
											);
									}
									return i.mutationQueue.addMutationBatch(r, o, s, t);
								})
								.next((t) => {
									n = t;
									const s = t.applyToLocalDocumentSet(e, a);
									return i.documentOverlayCache.saveOverlays(r, t.batchId, s);
								});
						})
						.then(() => ({ batchId: n.batchId, changes: tY(e) })));
				a.sharedClientState.addPendingMutation(h.batchId),
					(s = h.batchId),
					(u = a.Ru[a.currentUser.toKey()]) || (u = new eO(er)),
					(u = u.insert(s, r)),
					(a.Ru[a.currentUser.toKey()] = u),
					await i8(a, h.changes),
					await ih(a.remoteStore);
			} catch (t) {
				const e = iI(t, "Failed to persist write");
				r.reject(e);
			}
		}
		async function iJ(e, t) {
			var r;
			try {
				let n,
					i,
					s = await ((r = e.localStore),
					(n = t.snapshotVersion),
					(i = r.Fs),
					r.persistence
						.runTransaction("Apply remote event", "readwrite-primary", (e) => {
							var s, a, o;
							let l,
								u,
								h = r.Os.newChangeBuffer({ trackRemovals: !0 });
							i = r.Fs;
							const c = [];
							t.targetChanges.forEach((s, a) => {
								var o;
								const l = i.get(a);
								if (!l) return;
								c.push(
									r.hi
										.removeMatchingKeys(e, s.removedDocuments, a)
										.next(() => r.hi.addMatchingKeys(e, s.addedDocuments, a)),
								);
								let u = l.withSequenceNumber(e.currentSequenceNumber);
								null !== t.targetMismatches.get(a)
									? (u = u
											.withResumeToken(eF.EMPTY_BYTE_STRING, eE.min())
											.withLastLimboFreeSnapshotVersion(eE.min()))
									: s.resumeToken.approximateByteSize() > 0 &&
										(u = u.withResumeToken(s.resumeToken, n)),
									(i = i.insert(a, u)),
									(o = u),
									(0 === l.resumeToken.approximateByteSize() ||
										o.snapshotVersion.toMicroseconds() -
											l.snapshotVersion.toMicroseconds() >=
											3e8 ||
										s.addedDocuments.size +
											s.modifiedDocuments.size +
											s.removedDocuments.size >
											0) &&
										c.push(r.hi.updateTargetData(e, u));
							});
							let d = tQ,
								f = t2();
							if (
								(t.documentUpdates.forEach((n) => {
									t.resolvedLimboDocuments.has(n) &&
										c.push(
											r.persistence.referenceDelegate.updateLimboDocument(e, n),
										);
								}),
								c.push(
									((s = e),
									(a = h),
									(o = t.documentUpdates),
									(l = t2()),
									(u = t2()),
									o.forEach((e) => (l = l.add(e))),
									a.getEntries(s, l).next((e) => {
										let t = tQ;
										return (
											o.forEach((r, n) => {
												const i = e.get(r);
												n.isFoundDocument() !== i.isFoundDocument() &&
													(u = u.add(r)),
													n.isNoDocument() && n.version.isEqual(eE.min())
														? (a.removeEntry(r, n.readTime),
															(t = t.insert(r, n)))
														: !i.isValidDocument() ||
																n.version.compareTo(i.version) > 0 ||
																(0 === n.version.compareTo(i.version) &&
																	i.hasPendingWrites)
															? (a.addEntry(n), (t = t.insert(r, n)))
															: M(
																	nA,
																	"Ignoring outdated watch update for ",
																	r,
																	". Current version:",
																	i.version,
																	" Watch version:",
																	n.version,
																);
											}),
											{ Ls: t, ks: u }
										);
									})).next((e) => {
										(d = e.Ls), (f = e.ks);
									}),
								),
								!n.isEqual(eE.min()))
							) {
								const t = r.hi
									.getLastRemoteSnapshotVersion(e)
									.next((t) =>
										r.hi.setTargetsMetadata(e, e.currentSequenceNumber, n),
									);
								c.push(t);
							}
							return eS
								.waitFor(c)
								.next(() => h.apply(e))
								.next(() => r.localDocuments.getLocalViewOfDocuments(e, d, f))
								.next(() => d);
						})
						.then((e) => ((r.Fs = i), e)));
				t.targetChanges.forEach((t, r) => {
					const n = e.Eu.get(r);
					n &&
						(q(
							t.addedDocuments.size +
								t.modifiedDocuments.size +
								t.removedDocuments.size <=
								1,
							22616,
						),
						t.addedDocuments.size > 0
							? (n.lu = !0)
							: t.modifiedDocuments.size > 0
								? q(n.lu, 14607)
								: t.removedDocuments.size > 0 && (q(n.lu, 42227), (n.lu = !1)));
				}),
					await i8(e, s, t);
			} catch (e) {
				await eT(e);
			}
		}
		function iX(e, t, r) {
			var n;
			if ((e.isPrimaryClient && 0 === r) || (!e.isPrimaryClient && 1 === r)) {
				let r,
					i = [];
				e.Pu.forEach((e, r) => {
					const n = r.view.va(t);
					n.snapshot && i.push(n.snapshot);
				}),
					((n = e.eventManager).onlineState = t),
					(r = !1),
					n.queries.forEach((e, n) => {
						for (const e of n.wa) e.va(t) && (r = !0);
					}),
					r && ix(n),
					i.length && e.hu.J_(i),
					(e.onlineState = t),
					e.isPrimaryClient && e.sharedClientState.setOnlineState(t);
			}
		}
		async function iY(e, t, r) {
			e.sharedClientState.updateQueryState(t, "rejected", r);
			const n = e.Eu.get(t),
				i = n && n.key;
			if (i) {
				let r = new eO(ec.comparator);
				r = r.insert(i, td.newNoDocument(i, eE.min()));
				const n = t2().add(i),
					s = new rN(eE.min(), new Map(), new eO(er), r, n);
				await iJ(e, s), (e.du = e.du.remove(i)), e.Eu.delete(t), i4(e);
			} else
				await nD(e.localStore, t, !1)
					.then(() => i6(e, t, r))
					.catch(eT);
		}
		async function iZ(e, t) {
			var r;
			const n = t.batch.batchId;
			try {
				const i = await ((r = e.localStore),
				r.persistence.runTransaction(
					"Acknowledge batch",
					"readwrite-primary",
					(e) => {
						let n,
							i,
							s,
							a = t.batch.keys(),
							o = r.Os.newChangeBuffer({ trackRemovals: !0 });
						return ((i = (n = t.batch).keys()),
						(s = eS.resolve()),
						i.forEach((r) => {
							s = s
								.next(() => o.getEntry(e, r))
								.next((e) => {
									const i = t.docVersions.get(r);
									q(null !== i, 48541),
										0 > e.version.compareTo(i) &&
											(n.applyToRemoteDocument(e, t),
											e.isValidDocument() &&
												(e.setReadTime(t.commitVersion), o.addEntry(e)));
								});
						}),
						s.next(() => r.mutationQueue.removeMutationBatch(e, n)))
							.next(() => o.apply(e))
							.next(() => r.mutationQueue.performConsistencyCheck(e))
							.next(() =>
								r.documentOverlayCache.removeOverlaysForBatchId(
									e,
									a,
									t.batch.batchId,
								),
							)
							.next(() =>
								r.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
									e,
									((e) => {
										let t = t2();
										for (let r = 0; r < e.mutationResults.length; ++r)
											e.mutationResults[r].transformResults.length > 0 &&
												(t = t.add(e.batch.mutations[r].key));
										return t;
									})(t),
								),
							)
							.next(() => r.localDocuments.getDocuments(e, a));
					},
				));
				i2(e, n, null),
					i1(e, n),
					e.sharedClientState.updateMutationState(n, "acknowledged"),
					await i8(e, i);
			} catch (e) {
				await eT(e);
			}
		}
		async function i0(e, t, r) {
			var n;
			try {
				const i = await ((n = e.localStore),
				n.persistence.runTransaction(
					"Reject batch",
					"readwrite-primary",
					(e) => {
						let r;
						return n.mutationQueue
							.lookupMutationBatch(e, t)
							.next(
								(t) => (
									q(null !== t, 37113),
									(r = t.keys()),
									n.mutationQueue.removeMutationBatch(e, t)
								),
							)
							.next(() => n.mutationQueue.performConsistencyCheck(e))
							.next(() =>
								n.documentOverlayCache.removeOverlaysForBatchId(e, r, t),
							)
							.next(() =>
								n.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(
									e,
									r,
								),
							)
							.next(() => n.localDocuments.getDocuments(e, r));
					},
				));
				i2(e, t, r),
					i1(e, t),
					e.sharedClientState.updateMutationState(t, "rejected", r),
					await i8(e, i);
			} catch (e) {
				await eT(e);
			}
		}
		function i1(e, t) {
			(e.Vu.get(t) || []).forEach((e) => {
				e.resolve();
			}),
				e.Vu.delete(t);
		}
		function i2(e, t, r) {
			let n = e.Ru[e.currentUser.toKey()];
			if (n) {
				const i = n.get(t);
				i && (r ? i.reject(r) : i.resolve(), (n = n.remove(t))),
					(e.Ru[e.currentUser.toKey()] = n);
			}
		}
		function i6(e, t, r = null) {
			for (const n of (e.sharedClientState.removeLocalQueryTarget(t),
			e.Tu.get(t)))
				e.Pu.delete(n), r && e.hu.pu(n, r);
			e.Tu.delete(t),
				e.isPrimaryClient &&
					e.Au.zr(t).forEach((t) => {
						e.Au.containsKey(t) || i3(e, t);
					});
		}
		function i3(e, t) {
			e.Iu.delete(t.path.canonicalString());
			const r = e.du.get(t);
			null !== r &&
				(n8(e.remoteStore, r), (e.du = e.du.remove(t)), e.Eu.delete(r), i4(e));
		}
		function i5(e, t, r) {
			for (const n of r)
				n instanceof iM
					? (e.Au.addReference(n.key, t),
						((e, t) => {
							const r = t.key,
								n = r.path.canonicalString();
							e.du.get(r) ||
								e.Iu.has(n) ||
								(M(iF, "New document in limbo: " + r), e.Iu.add(n), i4(e));
						})(e, n))
					: n instanceof iU
						? (M(iF, "Document no longer in limbo: " + n.key),
							e.Au.removeReference(n.key, t),
							e.Au.containsKey(n.key) || i3(e, n.key))
						: j(19791, { yu: n });
		}
		function i4(e) {
			for (; e.Iu.size > 0 && e.du.size < e.maxConcurrentLimboResolutions; ) {
				const t = e.Iu.values().next().value;
				e.Iu.delete(t);
				const r = new ec(el.fromString(t)),
					n = e.mu.next();
				e.Eu.set(n, new iB(r)),
					(e.du = e.du.insert(r, n)),
					n4(
						e.remoteStore,
						new r5(tj(tM(r.path)), n, "TargetPurposeLimboResolution", eA.ue),
					);
			}
		}
		async function i8(e, t, r) {
			const n = [],
				i = [],
				s = [];
			e.Pu.isEmpty() ||
				(e.Pu.forEach((a, o) => {
					s.push(
						e.gu(o, t, r).then((t) => {
							var s;
							if ((t || r) && e.isPrimaryClient) {
								const n = t
									? !t.fromCache
									: null ==
											(s = null == r ? void 0 : r.targetChanges.get(o.targetId))
										? void 0
										: s.current;
								e.sharedClientState.updateQueryState(
									o.targetId,
									n ? "current" : "not-current",
								);
							}
							if (t) {
								n.push(t);
								const e = nT.Es(o.targetId, t);
								i.push(e);
							}
						}),
					);
				}),
				await Promise.all(s),
				e.hu.J_(n),
				await (async (e, t) => {
					try {
						await e.persistence.runTransaction(
							"notifyLocalViewChanges",
							"readwrite",
							(r) =>
								eS.forEach(t, (t) =>
									eS
										.forEach(t.Is, (n) =>
											e.persistence.referenceDelegate.addReference(
												r,
												t.targetId,
												n,
											),
										)
										.next(() =>
											eS.forEach(t.ds, (n) =>
												e.persistence.referenceDelegate.removeReference(
													r,
													t.targetId,
													n,
												),
											),
										),
								),
						);
					} catch (e) {
						if (!eC(e)) throw e;
						M(nA, "Failed to update sequence numbers: " + e);
					}
					for (const r of t) {
						const t = r.targetId;
						if (!r.fromCache) {
							const r = e.Fs.get(t),
								n = r.snapshotVersion,
								i = r.withLastLimboFreeSnapshotVersion(n);
							e.Fs = e.Fs.insert(t, i);
						}
					}
				})(e.localStore, i));
		}
		async function i7(e, t) {
			if (!e.currentUser.isEqual(t)) {
				M(iF, "User change. New user:", t.toKey());
				const r = await nR(e.localStore, t);
				(e.currentUser = t),
					e.Vu.forEach((e) => {
						e.forEach((e) => {
							e.reject(
								new z(
									$.CANCELLED,
									"'waitForPendingWrites' promise is rejected due to a user change.",
								),
							);
						});
					}),
					e.Vu.clear(),
					e.sharedClientState.handleUserChange(
						t,
						r.removedBatchIds,
						r.addedBatchIds,
					),
					await i8(e, r.Bs);
			}
		}
		function i9(e, t) {
			const r = e.Eu.get(t);
			if (r && r.lu) return t2().add(r.key);
			{
				let r = t2(),
					n = e.Tu.get(t);
				if (!n) return r;
				for (const t of n) {
					const n = e.Pu.get(t);
					r = r.unionWith(n.view.tu);
				}
				return r;
			}
		}
		function se(e) {
			return (
				(e.remoteStore.remoteSyncer.applyRemoteEvent = iJ.bind(null, e)),
				(e.remoteStore.remoteSyncer.getRemoteKeysForTarget = i9.bind(null, e)),
				(e.remoteStore.remoteSyncer.rejectListen = iY.bind(null, e)),
				(e.hu.J_ = iO.bind(null, e.eventManager)),
				(e.hu.pu = iP.bind(null, e.eventManager)),
				e
			);
		}
		class st {
			constructor() {
				(this.kind = "memory"), (this.synchronizeTabs = !1);
			}
			async initialize(e) {
				(this.serializer = nK(e.databaseInfo.databaseId)),
					(this.sharedClientState = this.bu(e)),
					(this.persistence = this.Du(e)),
					await this.persistence.start(),
					(this.localStore = this.vu(e)),
					(this.gcScheduler = this.Cu(e, this.localStore)),
					(this.indexBackfillerScheduler = this.Fu(e, this.localStore));
			}
			Cu(e, t) {
				return null;
			}
			Fu(e, t) {
				return null;
			}
			vu(e) {
				var t, r;
				return (
					(t = this.persistence),
					(r = new nC()),
					new nk(t, r, e.initialUser, this.serializer)
				);
			}
			Du(e) {
				return new n_(nb.Vi, this.serializer);
			}
			bu(e) {
				return new nx();
			}
			async terminate() {
				var e, t;
				null == (e = this.gcScheduler) || e.stop(),
					null == (t = this.indexBackfillerScheduler) || t.stop(),
					this.sharedClientState.shutdown(),
					await this.persistence.shutdown();
			}
		}
		st.provider = { build: () => new st() };
		class sr extends st {
			constructor(e) {
				super(), (this.cacheSizeBytes = e);
			}
			Cu(e, t) {
				return (
					q(this.persistence.referenceDelegate instanceof nI, 46915),
					new na(
						this.persistence.referenceDelegate.garbageCollector,
						e.asyncQueue,
						t,
					)
				);
			}
			Du(e) {
				const t =
					void 0 !== this.cacheSizeBytes
						? nt.withCacheSize(this.cacheSizeBytes)
						: nt.DEFAULT;
				return new n_((e) => nI.Vi(e, t), this.serializer);
			}
		}
		class sn {
			async initialize(e, t) {
				this.localStore ||
					((this.localStore = e.localStore),
					(this.sharedClientState = e.sharedClientState),
					(this.datastore = this.createDatastore(t)),
					(this.remoteStore = this.createRemoteStore(t)),
					(this.eventManager = this.createEventManager(t)),
					(this.syncEngine = this.createSyncEngine(t, !e.synchronizeTabs)),
					(this.sharedClientState.onlineStateHandler = (e) =>
						iX(this.syncEngine, e, 1)),
					(this.remoteStore.remoteSyncer.handleCredentialChange = i7.bind(
						null,
						this.syncEngine,
					)),
					await iw(this.remoteStore, this.syncEngine.isPrimaryClient));
			}
			createEventManager(e) {
				return new ik();
			}
			createDatastore(e) {
				var t;
				const r = nK(e.databaseInfo.databaseId),
					n = new nH(e.databaseInfo);
				return (t = e.authCredentials), new n0(t, e.appCheckCredentials, n, r);
			}
			createRemoteStore(e) {
				var t, r;
				return (
					(t = this.localStore),
					(r = this.datastore),
					new n6(
						t,
						r,
						e.asyncQueue,
						(e) => iX(this.syncEngine, e, 0),
						nU.C() ? new nU() : new nL(),
					)
				);
			}
			createSyncEngine(e, t) {
				var r, n, i, s, a, o;
				let l;
				return (
					(r = this.localStore),
					(n = this.remoteStore),
					(i = this.eventManager),
					(s = this.sharedClientState),
					(a = e.initialUser),
					(o = e.maxConcurrentLimboResolutions),
					(l = new iq(r, n, i, s, a, o)),
					t && (l.fu = !0),
					l
				);
			}
			async terminate() {
				var e, t;
				await (async (e) => {
					M(n2, "RemoteStore shutting down."),
						e.Ia.add(5),
						await n5(e),
						e.Ea.shutdown(),
						e.Aa.set("Unknown");
				})(this.remoteStore),
					null == (e = this.datastore) || e.terminate(),
					null == (t = this.eventManager) || t.terminate();
			}
		}
		sn.provider = { build: () => new sn() };
		class si {
			constructor(e) {
				(this.observer = e), (this.muted = !1);
			}
			next(e) {
				this.muted || (this.observer.next && this.xu(this.observer.next, e));
			}
			error(e) {
				this.muted ||
					(this.observer.error
						? this.xu(this.observer.error, e)
						: U("Uncaught Error in snapshot listener:", e.toString()));
			}
			Ou() {
				this.muted = !0;
			}
			xu(e, t) {
				setTimeout(() => {
					this.muted || e(t);
				}, 0);
			}
		}
		const ss = "FirestoreClient";
		class sa {
			constructor(e, t, r, n, i) {
				(this.authCredentials = e),
					(this.appCheckCredentials = t),
					(this.asyncQueue = r),
					(this.databaseInfo = n),
					(this.user = O.UNAUTHENTICATED),
					(this.clientId = et.newId()),
					(this.authCredentialListener = () => Promise.resolve()),
					(this.appCheckCredentialListener = () => Promise.resolve()),
					(this._uninitializedComponentsProvider = i),
					this.authCredentials.start(r, async (e) => {
						M(ss, "Received user=", e.uid),
							await this.authCredentialListener(e),
							(this.user = e);
					}),
					this.appCheckCredentials.start(
						r,
						(e) => (
							M(ss, "Received new app check token=", e),
							this.appCheckCredentialListener(e, this.user)
						),
					);
			}
			get configuration() {
				return {
					asyncQueue: this.asyncQueue,
					databaseInfo: this.databaseInfo,
					clientId: this.clientId,
					authCredentials: this.authCredentials,
					appCheckCredentials: this.appCheckCredentials,
					initialUser: this.user,
					maxConcurrentLimboResolutions: 100,
				};
			}
			setCredentialChangeListener(e) {
				this.authCredentialListener = e;
			}
			setAppCheckTokenChangeListener(e) {
				this.appCheckCredentialListener = e;
			}
			terminate() {
				this.asyncQueue.enterRestrictedMode();
				const e = new H();
				return (
					this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async () => {
						try {
							this._onlineComponents &&
								(await this._onlineComponents.terminate()),
								this._offlineComponents &&
									(await this._offlineComponents.terminate()),
								this.authCredentials.shutdown(),
								this.appCheckCredentials.shutdown(),
								e.resolve();
						} catch (r) {
							const t = iI(r, "Failed to shutdown persistence");
							e.reject(t);
						}
					}),
					e.promise
				);
			}
		}
		async function so(e, t) {
			e.asyncQueue.verifyOperationInProgress(),
				M(ss, "Initializing OfflineComponentProvider");
			const r = e.configuration;
			await t.initialize(r);
			let n = r.initialUser;
			e.setCredentialChangeListener(async (e) => {
				n.isEqual(e) || (await nR(t.localStore, e), (n = e));
			}),
				t.persistence.setDatabaseDeletedListener(() => {
					V("Terminating Firestore due to IndexedDb database deletion"),
						e
							.terminate()
							.then(() => {
								M(
									"Terminating Firestore due to IndexedDb database deletion completed successfully",
								);
							})
							.catch((e) => {
								V(
									"Terminating Firestore due to IndexedDb database deletion failed",
									e,
								);
							});
				}),
				(e._offlineComponents = t);
		}
		async function sl(e, t) {
			e.asyncQueue.verifyOperationInProgress();
			const r = await su(e);
			M(ss, "Initializing OnlineComponentProvider"),
				await t.initialize(r, e.configuration),
				e.setCredentialChangeListener((e) => iv(t.remoteStore, e)),
				e.setAppCheckTokenChangeListener((e, r) => iv(t.remoteStore, r)),
				(e._onlineComponents = t);
		}
		async function su(e) {
			if (!e._offlineComponents)
				if (e._uninitializedComponentsProvider) {
					M(ss, "Using user provided OfflineComponentProvider");
					try {
						await so(e, e._uninitializedComponentsProvider._offline);
					} catch (t) {
						if (
							!("FirebaseError" === t.name
								? t.code === $.FAILED_PRECONDITION || t.code === $.UNIMPLEMENTED
								: !("u" > typeof DOMException && t instanceof DOMException) ||
									22 === t.code ||
									20 === t.code ||
									11 === t.code)
						)
							throw t;
						V(
							"Error using user provided cache. Falling back to memory cache: " +
								t,
						),
							await so(e, new st());
					}
				} else
					M(ss, "Using default OfflineComponentProvider"),
						await so(e, new sr(void 0));
			return e._offlineComponents;
		}
		async function sh(e) {
			return (
				e._onlineComponents ||
					(e._uninitializedComponentsProvider
						? (M(ss, "Using user provided OnlineComponentProvider"),
							await sl(e, e._uninitializedComponentsProvider._online))
						: (M(ss, "Using default OnlineComponentProvider"),
							await sl(e, new sn()))),
				e._onlineComponents
			);
		}
		async function sc(e) {
			const t = await sh(e),
				r = t.eventManager;
			return (
				(r.onListen = i$.bind(null, t.syncEngine)),
				(r.onUnlisten = iK.bind(null, t.syncEngine)),
				(r.onFirstRemoteStoreListen = iz.bind(null, t.syncEngine)),
				(r.onLastRemoteStoreUnlisten = iW.bind(null, t.syncEngine)),
				r
			);
		}
		function sd(e) {
			const t = {};
			return (
				void 0 !== e.timeoutSeconds && (t.timeoutSeconds = e.timeoutSeconds), t
			);
		}
		const sf = new Map(),
			sp = "firestore.googleapis.com";
		class sg {
			constructor(e) {
				var t, r;
				if (void 0 === e.host) {
					if (void 0 !== e.ssl)
						throw new z(
							$.INVALID_ARGUMENT,
							"Can't provide ssl option if host option is not set",
						);
					(this.host = sp), (this.ssl = !0);
				} else (this.host = e.host), (this.ssl = null == (t = e.ssl) || t);
				if (
					((this.isUsingEmulator = void 0 !== e.emulatorOptions),
					(this.credentials = e.credentials),
					(this.ignoreUndefinedProperties = !!e.ignoreUndefinedProperties),
					(this.localCache = e.localCache),
					void 0 === e.cacheSizeBytes)
				)
					this.cacheSizeBytes = 0x2800000;
				else {
					if (-1 !== e.cacheSizeBytes && e.cacheSizeBytes < 1048576)
						throw new z(
							$.INVALID_ARGUMENT,
							"cacheSizeBytes must be at least 1048576",
						);
					this.cacheSizeBytes = e.cacheSizeBytes;
				}
				((e, t, r, n) => {
					if (!0 === t && !0 === n)
						throw new z(
							$.INVALID_ARGUMENT,
							`${e} and ${r} cannot be used together.`,
						);
				})(
					"experimentalForceLongPolling",
					e.experimentalForceLongPolling,
					"experimentalAutoDetectLongPolling",
					e.experimentalAutoDetectLongPolling,
				),
					(this.experimentalForceLongPolling =
						!!e.experimentalForceLongPolling),
					this.experimentalForceLongPolling
						? (this.experimentalAutoDetectLongPolling = !1)
						: void 0 === e.experimentalAutoDetectLongPolling
							? (this.experimentalAutoDetectLongPolling = !0)
							: (this.experimentalAutoDetectLongPolling =
									!!e.experimentalAutoDetectLongPolling),
					(this.experimentalLongPollingOptions = sd(
						null != (r = e.experimentalLongPollingOptions) ? r : {},
					)),
					((e) => {
						if (void 0 !== e.timeoutSeconds) {
							if (isNaN(e.timeoutSeconds))
								throw new z(
									$.INVALID_ARGUMENT,
									`invalid long polling timeout: ${e.timeoutSeconds} (must not be NaN)`,
								);
							if (e.timeoutSeconds < 5)
								throw new z(
									$.INVALID_ARGUMENT,
									`invalid long polling timeout: ${e.timeoutSeconds} (minimum allowed value is 5)`,
								);
							if (e.timeoutSeconds > 30)
								throw new z(
									$.INVALID_ARGUMENT,
									`invalid long polling timeout: ${e.timeoutSeconds} (maximum allowed value is 30)`,
								);
						}
					})(this.experimentalLongPollingOptions),
					(this.useFetchStreams = !!e.useFetchStreams);
			}
			isEqual(e) {
				var t, r;
				return (
					this.host === e.host &&
					this.ssl === e.ssl &&
					this.credentials === e.credentials &&
					this.cacheSizeBytes === e.cacheSizeBytes &&
					this.experimentalForceLongPolling ===
						e.experimentalForceLongPolling &&
					this.experimentalAutoDetectLongPolling ===
						e.experimentalAutoDetectLongPolling &&
					((t = this.experimentalLongPollingOptions),
					(r = e.experimentalLongPollingOptions),
					t.timeoutSeconds === r.timeoutSeconds) &&
					this.ignoreUndefinedProperties === e.ignoreUndefinedProperties &&
					this.useFetchStreams === e.useFetchStreams
				);
			}
		}
		class sm {
			constructor(e, t, r, n) {
				(this._authCredentials = e),
					(this._appCheckCredentials = t),
					(this._databaseId = r),
					(this._app = n),
					(this.type = "firestore-lite"),
					(this._persistenceKey = "(lite)"),
					(this._settings = new sg({})),
					(this._settingsFrozen = !1),
					(this._emulatorOptions = {}),
					(this._terminateTask = "notTerminated");
			}
			get app() {
				if (!this._app)
					throw new z(
						$.FAILED_PRECONDITION,
						"Firestore was not initialized using the Firebase SDK. 'app' is not available",
					);
				return this._app;
			}
			get _initialized() {
				return this._settingsFrozen;
			}
			get _terminated() {
				return "notTerminated" !== this._terminateTask;
			}
			_setSettings(e) {
				if (this._settingsFrozen)
					throw new z(
						$.FAILED_PRECONDITION,
						"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.",
					);
				(this._settings = new sg(e)),
					(this._emulatorOptions = e.emulatorOptions || {}),
					void 0 !== e.credentials &&
						(this._authCredentials = ((e) => {
							if (!e) return new K();
							switch (e.type) {
								case "firstParty":
									return new X(
										e.sessionIndex || "0",
										e.iamToken || null,
										e.authTokenFactory || null,
									);
								case "provider":
									return e.client;
								default:
									throw new z(
										$.INVALID_ARGUMENT,
										"makeAuthCredentialsProvider failed due to invalid credential type",
									);
							}
						})(e.credentials));
			}
			_getSettings() {
				return this._settings;
			}
			_getEmulatorOptions() {
				return this._emulatorOptions;
			}
			_freezeSettings() {
				return (this._settingsFrozen = !0), this._settings;
			}
			_delete() {
				return (
					"notTerminated" === this._terminateTask &&
						(this._terminateTask = this._terminate()),
					this._terminateTask
				);
			}
			async _restart() {
				"notTerminated" === this._terminateTask
					? await this._terminate()
					: (this._terminateTask = "notTerminated");
			}
			toJSON() {
				return {
					app: this._app,
					databaseId: this._databaseId,
					settings: this._settings,
				};
			}
			_terminate() {
				let e;
				return (
					(e = sf.get(this)) &&
						(M("ComponentProvider", "Removing Datastore"),
						sf.delete(this),
						e.terminate()),
					Promise.resolve()
				);
			}
		}
		function sy(e, t, r, n = {}) {
			var i;
			e = ey(e, sm);
			const s = (0, S.isCloudWorkstation)(t),
				a = e._getSettings(),
				o = Object.assign(Object.assign({}, a), {
					emulatorOptions: e._getEmulatorOptions(),
				}),
				l = `${t}:${r}`;
			s &&
				((0, S.pingServer)(`https://${l}`),
				(0, S.updateEmulatorBanner)("Firestore", !0)),
				a.host !== sp &&
					a.host !== l &&
					V(
						"Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.",
					);
			const u = Object.assign(Object.assign({}, a), {
				host: l,
				ssl: s,
				emulatorOptions: n,
			});
			if (!(0, S.deepEqual)(u, o) && (e._setSettings(u), n.mockUserToken)) {
				let t, r;
				if ("string" == typeof n.mockUserToken)
					(t = n.mockUserToken), (r = O.MOCK_USER);
				else {
					t = (0, S.createMockUserToken)(
						n.mockUserToken,
						null == (i = e._app) ? void 0 : i.options.projectId,
					);
					const s = n.mockUserToken.sub || n.mockUserToken.user_id;
					if (!s)
						throw new z(
							$.INVALID_ARGUMENT,
							"mockUserToken must contain 'sub' or 'user_id' field!",
						);
					r = new O(s);
				}
				e._authCredentials = new W(new G(t, r));
			}
		}
		class sv {
			constructor(e, t, r) {
				(this.converter = t),
					(this._query = r),
					(this.type = "query"),
					(this.firestore = e);
			}
			withConverter(e) {
				return new sv(this.firestore, e, this._query);
			}
		}
		class sw {
			constructor(e, t, r) {
				(this.converter = t),
					(this._key = r),
					(this.type = "document"),
					(this.firestore = e);
			}
			get _path() {
				return this._key.path;
			}
			get id() {
				return this._key.path.lastSegment();
			}
			get path() {
				return this._key.path.canonicalString();
			}
			get parent() {
				return new s_(this.firestore, this.converter, this._key.path.popLast());
			}
			withConverter(e) {
				return new sw(this.firestore, e, this._key);
			}
			toJSON() {
				return {
					type: sw._jsonSchemaVersion,
					referencePath: this._key.toString(),
				};
			}
			static fromJSON(e, t, r) {
				if (ew(t, sw._jsonSchema))
					return new sw(e, r || null, new ec(el.fromString(t.referencePath)));
			}
		}
		(sw._jsonSchemaVersion = "firestore/documentReference/1.0"),
			(sw._jsonSchema = {
				type: ev("string", sw._jsonSchemaVersion),
				referencePath: ev("string"),
			});
		class s_ extends sv {
			constructor(e, t, r) {
				super(e, t, tM(r)), (this._path = r), (this.type = "collection");
			}
			get id() {
				return this._query.path.lastSegment();
			}
			get path() {
				return this._query.path.canonicalString();
			}
			get parent() {
				const e = this._path.popLast();
				return e.isEmpty() ? null : new sw(this.firestore, null, new ec(e));
			}
			withConverter(e) {
				return new s_(this.firestore, e, this._path);
			}
		}
		function sE(e, t, ...r) {
			if (
				((e = (0, S.getModularInstance)(e)),
				ed("collection", "path", t),
				e instanceof sm)
			) {
				const n = el.fromString(t, ...r);
				return ep(n), new s_(e, null, n);
			}
			{
				if (!(e instanceof sw || e instanceof s_))
					throw new z(
						$.INVALID_ARGUMENT,
						"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
					);
				const n = e._path.child(el.fromString(t, ...r));
				return ep(n), new s_(e.firestore, null, n);
			}
		}
		function sb(e, t, ...r) {
			if (
				((e = (0, S.getModularInstance)(e)),
				1 == arguments.length && (t = et.newId()),
				ed("doc", "path", t),
				e instanceof sm)
			) {
				const n = el.fromString(t, ...r);
				return ef(n), new sw(e, null, new ec(n));
			}
			{
				if (!(e instanceof sw || e instanceof s_))
					throw new z(
						$.INVALID_ARGUMENT,
						"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore",
					);
				const n = e._path.child(el.fromString(t, ...r));
				return (
					ef(n),
					new sw(e.firestore, e instanceof s_ ? e.converter : null, new ec(n))
				);
			}
		}
		const sI = "AsyncQueue";
		class sT {
			constructor(e = Promise.resolve()) {
				(this.Zu = []),
					(this.Xu = !1),
					(this.ec = []),
					(this.tc = null),
					(this.nc = !1),
					(this.rc = !1),
					(this.sc = []),
					(this.F_ = new nW(this, "async_queue_retry")),
					(this.oc = () => {
						const e = nG();
						e && M(sI, "Visibility state changed to " + e.visibilityState),
							this.F_.y_();
					}),
					(this._c = e);
				const t = nG();
				t &&
					"function" == typeof t.addEventListener &&
					t.addEventListener("visibilitychange", this.oc);
			}
			get isShuttingDown() {
				return this.Xu;
			}
			enqueueAndForget(e) {
				this.enqueue(e);
			}
			enqueueAndForgetEvenWhileRestricted(e) {
				this.ac(), this.uc(e);
			}
			enterRestrictedMode(e) {
				if (!this.Xu) {
					(this.Xu = !0), (this.rc = e || !1);
					const t = nG();
					t &&
						"function" == typeof t.removeEventListener &&
						t.removeEventListener("visibilitychange", this.oc);
				}
			}
			enqueue(e) {
				if ((this.ac(), this.Xu)) return new Promise(() => {});
				const t = new H();
				return this.uc(() =>
					this.Xu && this.rc
						? Promise.resolve()
						: (e().then(t.resolve, t.reject), t.promise),
				).then(() => t.promise);
			}
			enqueueRetryable(e) {
				this.enqueueAndForget(() => (this.Zu.push(e), this.cc()));
			}
			async cc() {
				if (0 !== this.Zu.length) {
					try {
						await this.Zu[0](), this.Zu.shift(), this.F_.reset();
					} catch (e) {
						if (!eC(e)) throw e;
						M(sI, "Operation failed with retryable error: " + e);
					}
					this.Zu.length > 0 && this.F_.g_(() => this.cc());
				}
			}
			uc(e) {
				const t = this._c.then(
					() => (
						(this.nc = !0),
						e()
							.catch((e) => {
								throw (
									((this.tc = e),
									(this.nc = !1),
									U("INTERNAL UNHANDLED ERROR: ", sS(e)),
									e)
								);
							})
							.then((e) => ((this.nc = !1), e))
					),
				);
				return (this._c = t), t;
			}
			enqueueAfterDelay(e, t, r) {
				this.ac(), this.sc.indexOf(e) > -1 && (t = 0);
				const n = ib.createAndSchedule(this, e, t, r, (e) => this.lc(e));
				return this.ec.push(n), n;
			}
			ac() {
				this.tc && j(47125, { hc: sS(this.tc) });
			}
			verifyOperationInProgress() {}
			async Pc() {
				let e;
				do (e = this._c), await e;
				while (e !== this._c);
			}
			Tc(e) {
				for (const t of this.ec) if (t.timerId === e) return !0;
				return !1;
			}
			Ic(e) {
				return this.Pc().then(() => {
					for (const t of (this.ec.sort(
						(e, t) => e.targetTimeMs - t.targetTimeMs,
					),
					this.ec))
						if ((t.skipDelay(), "all" !== e && t.timerId === e)) break;
					return this.Pc();
				});
			}
			dc(e) {
				this.sc.push(e);
			}
			lc(e) {
				const t = this.ec.indexOf(e);
				this.ec.splice(t, 1);
			}
		}
		function sS(e) {
			let t = e.message || "";
			return (
				e.stack &&
					(t = e.stack.includes(e.message)
						? e.stack
						: e.message + "\n" + e.stack),
				t
			);
		}
		function sC(e) {
			if ("object" != typeof e || null === e) return !1;
			for (const t of ["next", "error", "complete"])
				if (t in e && "function" == typeof e[t]) return !0;
			return !1;
		}
		class sA extends sm {
			constructor(e, t, r, n) {
				super(e, t, r, n),
					(this.type = "firestore"),
					(this._queue = new sT()),
					(this._persistenceKey = (null == n ? void 0 : n.name) || "[DEFAULT]");
			}
			async _terminate() {
				if (this._firestoreClient) {
					const e = this._firestoreClient.terminate();
					(this._queue = new sT(e)), (this._firestoreClient = void 0), await e;
				}
			}
		}
		function sk(e, t) {
			const r = "object" == typeof e ? e : (0, b.getApp)(),
				n = (0, b._getProvider)(r, "firestore").getImmediate({
					identifier: "string" == typeof e ? e : t || eY,
				});
			if (!n._initialized) {
				const e = (0, S.getDefaultEmulatorHostnameAndPort)("firestore");
				e && sy(n, ...e);
			}
			return n;
		}
		function sR(e) {
			if (e._terminated)
				throw new z(
					$.FAILED_PRECONDITION,
					"The client has already been terminated.",
				);
			return (
				e._firestoreClient ||
					((e) => {
						var t, r, n, i, s, a;
						let o,
							l = e._freezeSettings(),
							u =
								((i = e._databaseId),
								(s = (null == (t = e._app) ? void 0 : t.options.appId) || ""),
								new eX(
									i,
									s,
									e._persistenceKey,
									l.host,
									l.ssl,
									l.experimentalForceLongPolling,
									l.experimentalAutoDetectLongPolling,
									sd(l.experimentalLongPollingOptions),
									l.useFetchStreams,
									l.isUsingEmulator,
								));
						e._componentsProvider ||
							((null == (r = l.localCache)
								? void 0
								: r._offlineComponentProvider) &&
								(null == (n = l.localCache)
									? void 0
									: n._onlineComponentProvider) &&
								(e._componentsProvider = {
									_offline: l.localCache._offlineComponentProvider,
									_online: l.localCache._onlineComponentProvider,
								})),
							(e._firestoreClient = new sa(
								e._authCredentials,
								e._appCheckCredentials,
								e._queue,
								u,
								e._componentsProvider &&
									((o =
										null == (a = e._componentsProvider)
											? void 0
											: a._online.build()),
									{
										_offline: null == a ? void 0 : a._offline.build(o),
										_online: o,
									}),
							));
					})(e),
				e._firestoreClient
			);
		}
		class sN {
			constructor(e) {
				this._byteString = e;
			}
			static fromBase64String(e) {
				try {
					return new sN(eF.fromBase64String(e));
				} catch (e) {
					throw new z(
						$.INVALID_ARGUMENT,
						"Failed to construct data from Base64 string: " + e,
					);
				}
			}
			static fromUint8Array(e) {
				return new sN(eF.fromUint8Array(e));
			}
			toBase64() {
				return this._byteString.toBase64();
			}
			toUint8Array() {
				return this._byteString.toUint8Array();
			}
			toString() {
				return "Bytes(base64: " + this.toBase64() + ")";
			}
			isEqual(e) {
				return this._byteString.isEqual(e._byteString);
			}
			toJSON() {
				return { type: sN._jsonSchemaVersion, bytes: this.toBase64() };
			}
			static fromJSON(e) {
				if (ew(e, sN._jsonSchema)) return sN.fromBase64String(e.bytes);
			}
		}
		(sN._jsonSchemaVersion = "firestore/bytes/1.0"),
			(sN._jsonSchema = {
				type: ev("string", sN._jsonSchemaVersion),
				bytes: ev("string"),
			});
		class sD {
			constructor(...e) {
				for (let t = 0; t < e.length; ++t)
					if (0 === e[t].length)
						throw new z(
							$.INVALID_ARGUMENT,
							"Invalid field name at argument $(i + 1). Field names must not be empty.",
						);
				this._internalPath = new eh(e);
			}
			isEqual(e) {
				return this._internalPath.isEqual(e._internalPath);
			}
		}
		class sO {
			constructor(e) {
				this._methodName = e;
			}
		}
		class sP {
			constructor(e, t) {
				if (!isFinite(e) || e < -90 || e > 90)
					throw new z(
						$.INVALID_ARGUMENT,
						"Latitude must be a number between -90 and 90, but was: " + e,
					);
				if (!isFinite(t) || t < -180 || t > 180)
					throw new z(
						$.INVALID_ARGUMENT,
						"Longitude must be a number between -180 and 180, but was: " + t,
					);
				(this._lat = e), (this._long = t);
			}
			get latitude() {
				return this._lat;
			}
			get longitude() {
				return this._long;
			}
			isEqual(e) {
				return this._lat === e._lat && this._long === e._long;
			}
			_compareTo(e) {
				return er(this._lat, e._lat) || er(this._long, e._long);
			}
			toJSON() {
				return {
					latitude: this._lat,
					longitude: this._long,
					type: sP._jsonSchemaVersion,
				};
			}
			static fromJSON(e) {
				if (ew(e, sP._jsonSchema)) return new sP(e.latitude, e.longitude);
			}
		}
		(sP._jsonSchemaVersion = "firestore/geoPoint/1.0"),
			(sP._jsonSchema = {
				type: ev("string", sP._jsonSchemaVersion),
				latitude: ev("number"),
				longitude: ev("number"),
			});
		class sx {
			constructor(e) {
				this._values = (e || []).map((e) => e);
			}
			toArray() {
				return this._values.map((e) => e);
			}
			isEqual(e) {
				return ((e, t) => {
					if (e.length !== t.length) return !1;
					for (let r = 0; r < e.length; ++r) if (e[r] !== t[r]) return !1;
					return !0;
				})(this._values, e._values);
			}
			toJSON() {
				return { type: sx._jsonSchemaVersion, vectorValues: this._values };
			}
			static fromJSON(e) {
				if (ew(e, sx._jsonSchema)) {
					if (
						Array.isArray(e.vectorValues) &&
						e.vectorValues.every((e) => "number" == typeof e)
					)
						return new sx(e.vectorValues);
					throw new z(
						$.INVALID_ARGUMENT,
						"Expected 'vectorValues' field to be a number array",
					);
				}
			}
		}
		(sx._jsonSchemaVersion = "firestore/vectorValue/1.0"),
			(sx._jsonSchema = {
				type: ev("string", sx._jsonSchemaVersion),
				vectorValues: ev("object"),
			});
		const sL = /^__.*__$/;
		class sM {
			constructor(e, t, r) {
				(this.data = e), (this.fieldMask = t), (this.fieldTransforms = r);
			}
			toMutation(e, t) {
				return null !== this.fieldMask
					? new rp(e, this.data, this.fieldMask, t, this.fieldTransforms)
					: new rf(e, this.data, t, this.fieldTransforms);
			}
		}
		class sU {
			constructor(e, t, r) {
				(this.data = e), (this.fieldMask = t), (this.fieldTransforms = r);
			}
			toMutation(e, t) {
				return new rp(e, this.data, this.fieldMask, t, this.fieldTransforms);
			}
		}
		function sV(e) {
			switch (e) {
				case 0:
				case 2:
				case 1:
					return !0;
				case 3:
				case 4:
					return !1;
				default:
					throw j(40011, { Ec: e });
			}
		}
		class sF {
			constructor(e, t, r, n, i, s) {
				(this.settings = e),
					(this.databaseId = t),
					(this.serializer = r),
					(this.ignoreUndefinedProperties = n),
					void 0 === i && this.Ac(),
					(this.fieldTransforms = i || []),
					(this.fieldMask = s || []);
			}
			get path() {
				return this.settings.path;
			}
			get Ec() {
				return this.settings.Ec;
			}
			Rc(e) {
				return new sF(
					Object.assign(Object.assign({}, this.settings), e),
					this.databaseId,
					this.serializer,
					this.ignoreUndefinedProperties,
					this.fieldTransforms,
					this.fieldMask,
				);
			}
			Vc(e) {
				var t;
				const r = null == (t = this.path) ? void 0 : t.child(e),
					n = this.Rc({ path: r, mc: !1 });
				return n.fc(e), n;
			}
			gc(e) {
				var t;
				const r = null == (t = this.path) ? void 0 : t.child(e),
					n = this.Rc({ path: r, mc: !1 });
				return n.Ac(), n;
			}
			yc(e) {
				return this.Rc({ path: void 0, mc: !0 });
			}
			wc(e) {
				return sJ(
					e,
					this.settings.methodName,
					this.settings.Sc || !1,
					this.path,
					this.settings.bc,
				);
			}
			contains(e) {
				return (
					void 0 !== this.fieldMask.find((t) => e.isPrefixOf(t)) ||
					void 0 !== this.fieldTransforms.find((t) => e.isPrefixOf(t.field))
				);
			}
			Ac() {
				if (this.path)
					for (let e = 0; e < this.path.length; e++) this.fc(this.path.get(e));
			}
			fc(e) {
				if (0 === e.length) throw this.wc("Document fields must not be empty");
				if (sV(this.Ec) && sL.test(e))
					throw this.wc('Document fields cannot begin and end with "__"');
			}
		}
		class sj {
			constructor(e, t, r) {
				(this.databaseId = e),
					(this.ignoreUndefinedProperties = t),
					(this.serializer = r || nK(e));
			}
			Dc(e, t, r, n = !1) {
				return new sF(
					{ Ec: e, methodName: t, bc: r, path: eh.emptyPath(), mc: !1, Sc: n },
					this.databaseId,
					this.serializer,
					this.ignoreUndefinedProperties,
				);
			}
		}
		function sB(e) {
			const t = e._freezeSettings(),
				r = nK(e._databaseId);
			return new sj(e._databaseId, !!t.ignoreUndefinedProperties, r);
		}
		class sq extends sO {
			_toFieldTransform(e) {
				if (2 !== e.Ec)
					throw 1 === e.Ec
						? e.wc(
								`${this._methodName}() can only appear at the top level of your update data`,
							)
						: e.wc(
								`${this._methodName}() cannot be used with set() unless you pass {merge:true}`,
							);
				return e.fieldMask.push(e.path), null;
			}
			isEqual(e) {
				return e instanceof sq;
			}
		}
		function s$(e, t) {
			if (sH((e = (0, S.getModularInstance)(e))))
				return sG("Unsupported field value:", t, e), sz(e, t);
			if (e instanceof sO)
				return (
					((e, t) => {
						if (!sV(t.Ec))
							throw t.wc(
								`${e._methodName}() can only be used with update() and set()`,
							);
						if (!t.path)
							throw t.wc(
								`${e._methodName}() is not currently supported inside arrays`,
							);
						const r = e._toFieldTransform(t);
						r && t.fieldTransforms.push(r);
					})(e, t),
					null
				);
			if (void 0 === e && t.ignoreUndefinedProperties) return null;
			if ((t.path && t.fieldMask.push(t.path), e instanceof Array)) {
				if (t.settings.mc && 4 !== t.Ec)
					throw t.wc("Nested arrays are not supported");
				let r = [],
					n = 0;
				for (const i of e) {
					let e = s$(i, t.yc(n));
					null == e && (e = { nullValue: "NULL_VALUE" }), r.push(e), n++;
				}
				return { arrayValue: { values: r } };
			}
			return ((e, t) => {
				var r, n, i;
				if (null === (e = (0, S.getModularInstance)(e)))
					return { nullValue: "NULL_VALUE" };
				if ("number" == typeof e)
					return (
						(r = t.serializer),
						"number" == typeof (i = n = e) &&
						Number.isInteger(i) &&
						!ek(i) &&
						i <= Number.MAX_SAFE_INTEGER &&
						i >= Number.MIN_SAFE_INTEGER
							? t5(n)
							: t3(r, n)
					);
				if ("boolean" == typeof e) return { booleanValue: e };
				if ("string" == typeof e) return { stringValue: e };
				if (e instanceof Date) {
					const r = e_.fromDate(e);
					return { timestampValue: rz(t.serializer, r) };
				}
				if (e instanceof e_) {
					const r = new e_(e.seconds, 1e3 * Math.floor(e.nanoseconds / 1e3));
					return { timestampValue: rz(t.serializer, r) };
				}
				if (e instanceof sP)
					return {
						geoPointValue: { latitude: e.latitude, longitude: e.longitude },
					};
				if (e instanceof sN)
					return { bytesValue: rH(t.serializer, e._byteString) };
				if (e instanceof sw) {
					const r = t.databaseId,
						n = e.firestore._databaseId;
					if (!n.isEqual(r))
						throw t.wc(
							`Document reference is for database ${n.projectId}/${n.database} but should be for database ${r.projectId}/${r.database}`,
						);
					return {
						referenceValue: rK(
							e.firestore._databaseId || t.databaseId,
							e._key.path,
						),
					};
				}
				if (e instanceof sx)
					return {
						mapValue: {
							fields: {
								[e0]: { stringValue: e6 },
								[e3]: {
									arrayValue: {
										values: e.toArray().map((e) => {
											if ("number" != typeof e)
												throw t.wc(
													"VectorValues must only contain numeric values.",
												);
											return t3(t.serializer, e);
										}),
									},
								},
							},
						},
					};
				throw t.wc(`Unsupported field value: ${em(e)}`);
			})(e, t);
		}
		function sz(e, t) {
			const r = {};
			return (
				eD(e)
					? t.path && t.path.length > 0 && t.fieldMask.push(t.path)
					: eN(e, (e, n) => {
							const i = s$(n, t.Vc(e));
							null != i && (r[e] = i);
						}),
				{ mapValue: { fields: r } }
			);
		}
		function sH(e) {
			return !(
				"object" != typeof e ||
				null === e ||
				e instanceof Array ||
				e instanceof Date ||
				e instanceof e_ ||
				e instanceof sP ||
				e instanceof sN ||
				e instanceof sw ||
				e instanceof sO ||
				e instanceof sx
			);
		}
		function sG(e, t, r) {
			if (!sH(r) || !eg(r)) {
				const n = em(r);
				throw "an object" === n
					? t.wc(e + " a custom object")
					: t.wc(e + " " + n);
			}
		}
		function sK(e, t, r) {
			if ((t = (0, S.getModularInstance)(t)) instanceof sD)
				return t._internalPath;
			if ("string" == typeof t) return sQ(e, t);
			throw sJ(
				"Field path arguments must be of type string or ",
				e,
				!1,
				void 0,
				r,
			);
		}
		const sW = /[~*/[\]]/;
		function sQ(e, t, r) {
			if (t.search(sW) >= 0)
				throw sJ(
					`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,
					e,
					!1,
					void 0,
					r,
				);
			try {
				return new sD(...t.split("."))._internalPath;
			} catch (n) {
				throw sJ(
					`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,
					e,
					!1,
					void 0,
					r,
				);
			}
		}
		function sJ(e, t, r, n, i) {
			let s = n && !n.isEmpty(),
				a = void 0 !== i,
				o = `Function ${t}() called with invalid data`;
			r && (o += " (via `toFirestore()`)"), (o += ". ");
			let l = "";
			return (
				(s || a) &&
					((l += " (found"),
					s && (l += ` in field ${n}`),
					a && (l += ` in document ${i}`),
					(l += ")")),
				new z($.INVALID_ARGUMENT, o + e + l)
			);
		}
		function sX(e, t) {
			return e.some((e) => e.isEqual(t));
		}
		class sY {
			constructor(e, t, r, n, i) {
				(this._firestore = e),
					(this._userDataWriter = t),
					(this._key = r),
					(this._document = n),
					(this._converter = i);
			}
			get id() {
				return this._key.path.lastSegment();
			}
			get ref() {
				return new sw(this._firestore, this._converter, this._key);
			}
			exists() {
				return null !== this._document;
			}
			data() {
				if (this._document) {
					if (this._converter) {
						const e = new sZ(
							this._firestore,
							this._userDataWriter,
							this._key,
							this._document,
							null,
						);
						return this._converter.fromFirestore(e);
					}
					return this._userDataWriter.convertValue(this._document.data.value);
				}
			}
			get(e) {
				if (this._document) {
					const t = this._document.data.field(s0("DocumentSnapshot.get", e));
					if (null !== t) return this._userDataWriter.convertValue(t);
				}
			}
		}
		class sZ extends sY {
			data() {
				return super.data();
			}
		}
		function s0(e, t) {
			return "string" == typeof t
				? sQ(e, t)
				: t instanceof sD
					? t._internalPath
					: t._delegate._internalPath;
		}
		function s1(e) {
			if ("L" === e.limitType && 0 === e.explicitOrderBy.length)
				throw new z(
					$.UNIMPLEMENTED,
					"limitToLast() queries require specifying at least one orderBy() clause",
				);
		}
		class s2 {}
		class s6 extends s2 {}
		function s3(e, t, ...r) {
			let n = [];
			for (const i of (t instanceof s2 && n.push(t),
			((e) => {
				const t = e.filter((e) => e instanceof s8).length,
					r = e.filter((e) => e instanceof s5).length;
				if (t > 1 || (t > 0 && r > 0))
					throw new z(
						$.INVALID_ARGUMENT,
						"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.",
					);
			})((n = n.concat(r))),
			n))
				e = i._apply(e);
			return e;
		}
		class s5 extends s6 {
			constructor(e, t, r) {
				super(),
					(this._field = e),
					(this._op = t),
					(this._value = r),
					(this.type = "where");
			}
			static _create(e, t, r) {
				return new s5(e, t, r);
			}
			_apply(e) {
				const t = this._parse(e);
				return (
					ar(e._query, t), new sv(e.firestore, e.converter, tB(e._query, t))
				);
			}
			_parse(e) {
				const t = sB(e.firestore);
				return ((e, t, r, n, i, s, a) => {
					let o;
					if (i.isKeyField()) {
						if ("array-contains" === s || "array-contains-any" === s)
							throw new z(
								$.INVALID_ARGUMENT,
								`Invalid Query. You can't perform '${s}' queries on documentId().`,
							);
						if ("in" === s || "not-in" === s) {
							at(a, s);
							const t = [];
							for (const r of a) t.push(ae(n, e, r));
							o = { arrayValue: { values: t } };
						} else o = ae(n, e, a);
					} else
						("in" !== s && "not-in" !== s && "array-contains-any" !== s) ||
							at(a, s),
							(o = ((e, t, r, n = !1) => s$(r, e.Dc(n ? 4 : 3, t)))(
								r,
								t,
								a,
								"in" === s || "not-in" === s,
							));
					return tv.create(i, s, o);
				})(
					e._query,
					"where",
					t,
					e.firestore._databaseId,
					this._field,
					this._op,
					this._value,
				);
			}
		}
		function s4(e, t, r) {
			const n = s0("where", e);
			return s5._create(n, t, r);
		}
		class s8 extends s2 {
			constructor(e, t) {
				super(), (this.type = e), (this._queryConstraints = t);
			}
			static _create(e, t) {
				return new s8(e, t);
			}
			_parse(e) {
				const t = this._queryConstraints
					.map((t) => t._parse(e))
					.filter((e) => e.getFilters().length > 0);
				return 1 === t.length ? t[0] : tw.create(t, this._getOperator());
			}
			_apply(e) {
				const t = this._parse(e);
				return 0 === t.getFilters().length
					? e
					: (((e, t) => {
							let r = e;
							for (const e of t.getFlattenedFilters()) ar(r, e), (r = tB(r, e));
						})(e._query, t),
						new sv(e.firestore, e.converter, tB(e._query, t)));
			}
			_getQueryConstraints() {
				return this._queryConstraints;
			}
			_getOperator() {
				return "and" === this.type ? "and" : "or";
			}
		}
		class s7 extends s6 {
			constructor(e, t) {
				super(),
					(this._field = e),
					(this._direction = t),
					(this.type = "orderBy");
			}
			static _create(e, t) {
				return new s7(e, t);
			}
			_apply(e) {
				var t;
				let r,
					n = ((e, t, r) => {
						if (null !== e.startAt)
							throw new z(
								$.INVALID_ARGUMENT,
								"Invalid query. You must not call startAt() or startAfter() before calling orderBy().",
							);
						if (null !== e.endAt)
							throw new z(
								$.INVALID_ARGUMENT,
								"Invalid query. You must not call endAt() or endBefore() before calling orderBy().",
							);
						return new tm(t, r);
					})(e._query, this._field, this._direction);
				return new sv(
					e.firestore,
					e.converter,
					((t = e._query),
					(r = t.explicitOrderBy.concat([n])),
					new tL(
						t.path,
						t.collectionGroup,
						r,
						t.filters.slice(),
						t.limit,
						t.limitType,
						t.startAt,
						t.endAt,
					)),
				);
			}
		}
		function s9(e, t = "asc") {
			const r = s0("orderBy", e);
			return s7._create(r, t);
		}
		function ae(e, t, r) {
			if ("string" == typeof (r = (0, S.getModularInstance)(r))) {
				if ("" === r)
					throw new z(
						$.INVALID_ARGUMENT,
						"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.",
					);
				if (!tV(t) && -1 !== r.indexOf("/"))
					throw new z(
						$.INVALID_ARGUMENT,
						`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`,
					);
				const n = t.path.child(el.fromString(r));
				if (!ec.isDocumentKey(n))
					throw new z(
						$.INVALID_ARGUMENT,
						`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`,
					);
				return tr(e, new ec(n));
			}
			if (r instanceof sw) return tr(e, r._key);
			throw new z(
				$.INVALID_ARGUMENT,
				`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${em(r)}.`,
			);
		}
		function at(e, t) {
			if (!Array.isArray(e) || 0 === e.length)
				throw new z(
					$.INVALID_ARGUMENT,
					`Invalid Query. A non-empty array is required for '${t.toString()}' filters.`,
				);
		}
		function ar(e, t) {
			const r = ((e, t) => {
				for (const r of e)
					for (const e of r.getFlattenedFilters())
						if (t.indexOf(e.op) >= 0) return e.op;
				return null;
			})(
				e.filters,
				((e) => {
					switch (e) {
						case "!=":
							return ["!=", "not-in"];
						case "array-contains-any":
						case "in":
							return ["not-in"];
						case "not-in":
							return ["array-contains-any", "in", "not-in", "!="];
						default:
							return [];
					}
				})(t.op),
			);
			if (null !== r)
				throw r === t.op
					? new z(
							$.INVALID_ARGUMENT,
							`Invalid query. You cannot use more than one '${t.op.toString()}' filter.`,
						)
					: new z(
							$.INVALID_ARGUMENT,
							`Invalid query. You cannot use '${t.op.toString()}' filters with '${r.toString()}' filters.`,
						);
		}
		class an {
			convertValue(e, t = "none") {
				switch (e5(e)) {
					case 0:
						return null;
					case 1:
						return e.booleanValue;
					case 2:
						return eq(e.integerValue || e.doubleValue);
					case 3:
						return this.convertTimestamp(e.timestampValue);
					case 4:
						return this.convertServerTimestamp(e, t);
					case 5:
						return e.stringValue;
					case 6:
						return this.convertBytes(e$(e.bytesValue));
					case 7:
						return this.convertReference(e.referenceValue);
					case 8:
						return this.convertGeoPoint(e.geoPointValue);
					case 9:
						return this.convertArray(e.arrayValue, t);
					case 11:
						return this.convertObject(e.mapValue, t);
					case 10:
						return this.convertVectorValue(e.mapValue);
					default:
						throw j(62114, { value: e });
				}
			}
			convertObject(e, t) {
				return this.convertObjectMap(e.fields, t);
			}
			convertObjectMap(e, t = "none") {
				const r = {};
				return (
					eN(e, (e, n) => {
						r[e] = this.convertValue(n, t);
					}),
					r
				);
			}
			convertVectorValue(e) {
				var t, r, n;
				return new sx(
					null ==
						(n =
							null == (r = null == (t = e.fields) ? void 0 : t[e3].arrayValue)
								? void 0
								: r.values)
						? void 0
						: n.map((e) => eq(e.doubleValue)),
				);
			}
			convertGeoPoint(e) {
				return new sP(eq(e.latitude), eq(e.longitude));
			}
			convertArray(e, t) {
				return (e.values || []).map((e) => this.convertValue(e, t));
			}
			convertServerTimestamp(e, t) {
				switch (t) {
					case "previous": {
						const r = eQ(e);
						return null == r ? null : this.convertValue(r, t);
					}
					case "estimate":
						return this.convertTimestamp(eJ(e));
					default:
						return null;
				}
			}
			convertTimestamp(e) {
				const t = eB(e);
				return new e_(t.seconds, t.nanos);
			}
			convertDocumentKey(e, t) {
				const r = el.fromString(e);
				q(r3(r), 9688, { name: e });
				const n = new eZ(r.get(1), r.get(3)),
					i = new ec(r.popFirst(5));
				return (
					n.isEqual(t) ||
						U(
							`Document ${i} contains a document reference within a different database (${n.projectId}/${n.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`,
						),
					i
				);
			}
		}
		class ai {
			constructor(e, t) {
				(this.hasPendingWrites = e), (this.fromCache = t);
			}
			isEqual(e) {
				return (
					this.hasPendingWrites === e.hasPendingWrites &&
					this.fromCache === e.fromCache
				);
			}
		}
		class as extends sY {
			constructor(e, t, r, n, i, s) {
				super(e, t, r, n, s),
					(this._firestore = e),
					(this._firestoreImpl = e),
					(this.metadata = i);
			}
			exists() {
				return super.exists();
			}
			data(e = {}) {
				if (this._document) {
					if (this._converter) {
						const t = new aa(
							this._firestore,
							this._userDataWriter,
							this._key,
							this._document,
							this.metadata,
							null,
						);
						return this._converter.fromFirestore(t, e);
					}
					return this._userDataWriter.convertValue(
						this._document.data.value,
						e.serverTimestamps,
					);
				}
			}
			get(e, t = {}) {
				if (this._document) {
					const r = this._document.data.field(s0("DocumentSnapshot.get", e));
					if (null !== r)
						return this._userDataWriter.convertValue(r, t.serverTimestamps);
				}
			}
			toJSON() {
				if (this.metadata.hasPendingWrites)
					throw new z(
						$.FAILED_PRECONDITION,
						"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().",
					);
				const e = this._document,
					t = {};
				return (
					(t.type = as._jsonSchemaVersion),
					(t.bundle = ""),
					(t.bundleSource = "DocumentSnapshot"),
					(t.bundleName = this._key.toString()),
					e &&
						e.isValidDocument() &&
						e.isFoundDocument() &&
						(this._userDataWriter.convertObjectMap(
							e.data.value.mapValue.fields,
							"previous",
						),
						this._firestore,
						this.ref.path,
						(t.bundle = "NOT SUPPORTED")),
					t
				);
			}
		}
		(as._jsonSchemaVersion = "firestore/documentSnapshot/1.0"),
			(as._jsonSchema = {
				type: ev("string", as._jsonSchemaVersion),
				bundleSource: ev("string", "DocumentSnapshot"),
				bundleName: ev("string"),
				bundle: ev("string"),
			});
		class aa extends as {
			data(e = {}) {
				return super.data(e);
			}
		}
		class ao {
			constructor(e, t, r, n) {
				(this._firestore = e),
					(this._userDataWriter = t),
					(this._snapshot = n),
					(this.metadata = new ai(n.hasPendingWrites, n.fromCache)),
					(this.query = r);
			}
			get docs() {
				const e = [];
				return this.forEach((t) => e.push(t)), e;
			}
			get size() {
				return this._snapshot.docs.size;
			}
			get empty() {
				return 0 === this.size;
			}
			forEach(e, t) {
				this._snapshot.docs.forEach((r) => {
					e.call(
						t,
						new aa(
							this._firestore,
							this._userDataWriter,
							r.key,
							r,
							new ai(
								this._snapshot.mutatedKeys.has(r.key),
								this._snapshot.fromCache,
							),
							this.query.converter,
						),
					);
				});
			}
			docChanges(e = {}) {
				const t = !!e.includeMetadataChanges;
				if (t && this._snapshot.excludesMetadataChanges)
					throw new z(
						$.INVALID_ARGUMENT,
						"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().",
					);
				return (
					(this._cachedChanges &&
						this._cachedChangesIncludeMetadataChanges === t) ||
						((this._cachedChanges = ((e, t) => {
							if (e._snapshot.oldDocs.isEmpty()) {
								let t = 0;
								return e._snapshot.docChanges.map((r) => {
									const n = new aa(
										e._firestore,
										e._userDataWriter,
										r.doc.key,
										r.doc,
										new ai(
											e._snapshot.mutatedKeys.has(r.doc.key),
											e._snapshot.fromCache,
										),
										e.query.converter,
									);
									return (
										r.doc,
										{ type: "added", doc: n, oldIndex: -1, newIndex: t++ }
									);
								});
							}
							{
								let r = e._snapshot.oldDocs;
								return e._snapshot.docChanges
									.filter((e) => t || 3 !== e.type)
									.map((t) => {
										let n = new aa(
												e._firestore,
												e._userDataWriter,
												t.doc.key,
												t.doc,
												new ai(
													e._snapshot.mutatedKeys.has(t.doc.key),
													e._snapshot.fromCache,
												),
												e.query.converter,
											),
											i = -1,
											s = -1;
										return (
											0 !== t.type &&
												((i = r.indexOf(t.doc.key)), (r = r.delete(t.doc.key))),
											1 !== t.type &&
												(s = (r = r.add(t.doc)).indexOf(t.doc.key)),
											{
												type: ((e) => {
													switch (e) {
														case 0:
															return "added";
														case 2:
														case 3:
															return "modified";
														case 1:
															return "removed";
														default:
															return j(61501, { type: e });
													}
												})(t.type),
												doc: n,
												oldIndex: i,
												newIndex: s,
											}
										);
									});
							}
						})(this, t)),
						(this._cachedChangesIncludeMetadataChanges = t)),
					this._cachedChanges
				);
			}
			toJSON() {
				if (this.metadata.hasPendingWrites)
					throw new z(
						$.FAILED_PRECONDITION,
						"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().",
					);
				const e = {};
				(e.type = ao._jsonSchemaVersion),
					(e.bundleSource = "QuerySnapshot"),
					(e.bundleName = et.newId()),
					this._firestore._databaseId.database,
					this._firestore._databaseId.projectId;
				const t = [],
					r = [],
					n = [];
				return (
					this.docs.forEach((e) => {
						null !== e._document &&
							(t.push(e._document),
							r.push(
								this._userDataWriter.convertObjectMap(
									e._document.data.value.mapValue.fields,
									"previous",
								),
							),
							n.push(e.ref.path));
					}),
					this._firestore,
					this.query._query,
					e.bundleName,
					(e.bundle = "NOT SUPPORTED"),
					e
				);
			}
		}
		function al(e) {
			e = ey(e, sw);
			const t = ey(e.firestore, sA);
			return ((e, t, r = {}) => {
				const n = new H();
				return (
					e.asyncQueue.enqueueAndForget(async () => {
						var i, s;
						let a, o;
						return (
							(i = await sc(e)),
							(s = e.asyncQueue),
							(a = new si({
								next: (e) => {
									a.Ou(), s.enqueueAndForget(() => iD(i, o));
									const l = e.docs.has(t);
									!l && e.fromCache
										? n.reject(
												new z(
													$.UNAVAILABLE,
													"Failed to get document because the client is offline.",
												),
											)
										: l && e.fromCache && r && "server" === r.source
											? n.reject(
													new z(
														$.UNAVAILABLE,
														'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)',
													),
												)
											: n.resolve(e);
								},
								error: (e) => n.reject(e),
							})),
							iN(
								i,
								(o = new iL(tM(t.path), a, {
									includeMetadataChanges: !0,
									ka: !0,
								})),
							)
						);
					}),
					n.promise
				);
			})(sR(t), e._key).then((r) => am(t, e, r));
		}
		(ao._jsonSchemaVersion = "firestore/querySnapshot/1.0"),
			(ao._jsonSchema = {
				type: ev("string", ao._jsonSchemaVersion),
				bundleSource: ev("string", "QuerySnapshot"),
				bundleName: ev("string"),
				bundle: ev("string"),
			});
		class au extends an {
			constructor(e) {
				super(), (this.firestore = e);
			}
			convertBytes(e) {
				return new sN(e);
			}
			convertReference(e) {
				const t = this.convertDocumentKey(e, this.firestore._databaseId);
				return new sw(this.firestore, null, t);
			}
		}
		function ah(e) {
			e = ey(e, sv);
			const t = ey(e.firestore, sA),
				r = sR(t),
				n = new au(t);
			return (
				s1(e._query),
				((e, t, r = {}) => {
					const n = new H();
					return (
						e.asyncQueue.enqueueAndForget(async () => {
							var i, s;
							let a, o;
							return (
								(i = await sc(e)),
								(s = e.asyncQueue),
								(o = new iL(
									t,
									(a = new si({
										next: (e) => {
											a.Ou(),
												s.enqueueAndForget(() => iD(i, o)),
												e.fromCache && "server" === r.source
													? n.reject(
															new z(
																$.UNAVAILABLE,
																'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)',
															),
														)
													: n.resolve(e);
										},
										error: (e) => n.reject(e),
									})),
									{ includeMetadataChanges: !0, ka: !0 },
								)),
								iN(i, o)
							);
						}),
						n.promise
					);
				})(r, e._query).then((r) => new ao(t, n, e, r))
			);
		}
		function ac(e, t, r, ...n) {
			var i, s, a;
			let o, l, u;
			e = ey(e, sw);
			const h = ey(e.firestore, sA),
				c = sB(h);
			return ag(h, [
				("string" == typeof (t = (0, S.getModularInstance)(t)) ||
				t instanceof sD
					? ((e, t, r, n, i, s) => {
							const a = e.Dc(1, t, r),
								o = [sK(t, n, r)],
								l = [i];
							if (s.length % 2 != 0)
								throw new z(
									$.INVALID_ARGUMENT,
									`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`,
								);
							for (let e = 0; e < s.length; e += 2)
								o.push(sK(t, s[e])), l.push(s[e + 1]);
							const u = [],
								h = tc.empty();
							for (let e = o.length - 1; e >= 0; --e)
								if (!sX(u, o[e])) {
									let t = o[e],
										r = l[e];
									r = (0, S.getModularInstance)(r);
									const n = a.gc(t);
									if (r instanceof sq) u.push(t);
									else {
										const e = s$(r, n);
										null != e && (u.push(t), h.set(t, e));
									}
								}
							return new sU(h, new eU(u), a.fieldTransforms);
						})(c, "updateDoc", e._key, t, r, n)
					: ((i = "updateDoc"),
						(s = e._key),
						(a = t),
						sG("Data must be an object, but it was:", (o = c.Dc(1, i, s)), a),
						(l = []),
						(u = tc.empty()),
						eN(a, (e, t) => {
							const r = sQ(i, e, s);
							t = (0, S.getModularInstance)(t);
							const n = o.gc(r);
							if (t instanceof sq) l.push(r);
							else {
								const e = s$(t, n);
								null != e && (l.push(r), u.set(r, e));
							}
						}),
						new sU(u, new eU(l), o.fieldTransforms))
				).toMutation(e._key, ro.exists(!0)),
			]);
		}
		function ad(e) {
			return ag(ey(e.firestore, sA), [new rv(e._key, ro.none())]);
		}
		function af(e, t) {
			var r;
			const n = ey(e.firestore, sA),
				i = sb(e),
				s = ((r = e.converter), r ? r.toFirestore(t) : t);
			return ag(n, [
				((e, t, r, n, i, s = {}) => {
					let a,
						o,
						l = e.Dc(s.merge || s.mergeFields ? 2 : 0, t, r, i);
					sG("Data must be an object, but it was:", l, n);
					const u = sz(n, l);
					if (s.merge) (a = new eU(l.fieldMask)), (o = l.fieldTransforms);
					else if (s.mergeFields) {
						const e = [];
						for (const n of s.mergeFields) {
							const i = sK(t, n, r);
							if (!l.contains(i))
								throw new z(
									$.INVALID_ARGUMENT,
									`Field '${i}' is specified in your field mask but missing from your input data.`,
								);
							sX(e, i) || e.push(i);
						}
						(a = new eU(e)),
							(o = l.fieldTransforms.filter((e) => a.covers(e.field)));
					} else (a = null), (o = l.fieldTransforms);
					return new sM(new tc(u), a, o);
				})(
					sB(e.firestore),
					"addDoc",
					i._key,
					s,
					null !== e.converter,
					{},
				).toMutation(i._key, ro.exists(!1)),
			]).then(() => i);
		}
		function ap(e, ...t) {
			var r, n, i, s;
			let a, o, l, u, h;
			e = (0, S.getModularInstance)(e);
			let c = { includeMetadataChanges: !1, source: "default" },
				d = 0;
			"object" != typeof t[0] || sC(t[d]) || (c = t[d++]);
			const f = {
				includeMetadataChanges: c.includeMetadataChanges,
				source: c.source,
			};
			if (sC(t[d])) {
				const e = t[d];
				(t[d] = null == (r = e.next) ? void 0 : r.bind(e)),
					(t[d + 1] = null == (n = e.error) ? void 0 : n.bind(e)),
					(t[d + 2] = null == (i = e.complete) ? void 0 : i.bind(e));
			}
			if (e instanceof sw)
				(o = ey(e.firestore, sA)),
					(l = tM(e._key.path)),
					(a = {
						next: (r) => {
							t[d] && t[d](am(o, e, r));
						},
						error: t[d + 1],
						complete: t[d + 2],
					});
			else {
				const r = ey(e, sv);
				(o = ey(r.firestore, sA)), (l = r._query);
				const n = new au(o);
				(a = {
					next: (e) => {
						t[d] && t[d](new ao(o, n, r, e));
					},
					error: t[d + 1],
					complete: t[d + 2],
				}),
					s1(e._query);
			}
			return (
				(s = sR(o)),
				(h = new iL(l, (u = new si(a)), f)),
				s.asyncQueue.enqueueAndForget(async () => iN(await sc(s), h)),
				() => {
					u.Ou(), s.asyncQueue.enqueueAndForget(async () => iD(await sc(s), h));
				}
			);
		}
		function ag(e, t) {
			var r;
			let n;
			return (
				(r = sR(e)),
				(n = new H()),
				r.asyncQueue.enqueueAndForget(async () =>
					iQ(await sh(r).then((e) => e.syncEngine), t, n),
				),
				n.promise
			);
		}
		function am(e, t, r) {
			const n = r.docs.get(t._key),
				i = new au(e);
			return new as(
				e,
				i,
				t._key,
				n,
				new ai(r.hasPendingWrites, r.fromCache),
				t.converter,
			);
		}
		new WeakMap(),
			((e = !0) => {
				(P = b.SDK_VERSION),
					(0, b._registerComponent)(
						new I.Component(
							"firestore",
							(t, { instanceIdentifier: r, options: n }) => {
								const i = t.getProvider("app").getImmediate(),
									s = new sA(
										new Q(t.getProvider("auth-internal")),
										new Z(i, t.getProvider("app-check-internal")),
										((e, t) => {
											if (
												!Object.prototype.hasOwnProperty.apply(e.options, [
													"projectId",
												])
											)
												throw new z(
													$.INVALID_ARGUMENT,
													'"projectId" not provided in firebase.initializeApp.',
												);
											return new eZ(e.options.projectId, t);
										})(i, r),
										i,
									);
								return (
									(n = Object.assign({ useFetchStreams: e }, n)),
									s._setSettings(n),
									s
								);
							},
							"PUBLIC",
						).setMultipleInstances(!0),
					),
					(0, b.registerVersion)(N, D, void 0),
					(0, b.registerVersion)(N, D, "esm2017");
			})(),
			e.s(
				[
					"QueryConstraint",
					() => s6,
					"Timestamp",
					() => e_,
					"addDoc",
					() => af,
					"collection",
					() => sE,
					"connectFirestoreEmulator",
					() => sy,
					"deleteDoc",
					() => ad,
					"doc",
					() => sb,
					"getDoc",
					() => al,
					"getDocs",
					() => ah,
					"getFirestore",
					() => sk,
					"onSnapshot",
					() => ap,
					"orderBy",
					() => s9,
					"query",
					() => s3,
					"updateDoc",
					() => ac,
					"where",
					() => s4,
				],
				28075,
			);
		var ay = S;
		function av(e, t) {
			const r = {};
			for (const n in e) Object.hasOwn(e, n) && (r[n] = t(e[n]));
			return r;
		}
		function aw(e) {
			if (null == e) return null;
			if (
				(e instanceof Number && (e = e.valueOf()),
				("number" == typeof e && isFinite(e)) ||
					!0 === e ||
					!1 === e ||
					"[object String]" === Object.prototype.toString.call(e))
			)
				return e;
			if (e instanceof Date) return e.toISOString();
			if (Array.isArray(e)) return e.map((e) => aw(e));
			if ("function" == typeof e || "object" == typeof e)
				return av(e, (e) => aw(e));
			throw Error("Data cannot be encoded in JSON: " + e);
		}
		function a_(e) {
			if (null == e) return e;
			if (e["@type"])
				switch (e["@type"]) {
					case "type.googleapis.com/google.protobuf.Int64Value":
					case "type.googleapis.com/google.protobuf.UInt64Value": {
						const t = Number(e.value);
						if (isNaN(t)) throw Error("Data cannot be decoded from JSON: " + e);
						return t;
					}
					default:
						throw Error("Data cannot be decoded from JSON: " + e);
				}
			return Array.isArray(e)
				? e.map((e) => a_(e))
				: "function" == typeof e || "object" == typeof e
					? av(e, (e) => a_(e))
					: e;
		}
		const aE = "functions",
			ab = {
				OK: "ok",
				CANCELLED: "cancelled",
				UNKNOWN: "unknown",
				INVALID_ARGUMENT: "invalid-argument",
				DEADLINE_EXCEEDED: "deadline-exceeded",
				NOT_FOUND: "not-found",
				ALREADY_EXISTS: "already-exists",
				PERMISSION_DENIED: "permission-denied",
				UNAUTHENTICATED: "unauthenticated",
				RESOURCE_EXHAUSTED: "resource-exhausted",
				FAILED_PRECONDITION: "failed-precondition",
				ABORTED: "aborted",
				OUT_OF_RANGE: "out-of-range",
				UNIMPLEMENTED: "unimplemented",
				INTERNAL: "internal",
				UNAVAILABLE: "unavailable",
				DATA_LOSS: "data-loss",
			};
		class aI extends ay.FirebaseError {
			constructor(e, t, r) {
				super(`${aE}/${e}`, t || ""),
					(this.details = r),
					Object.setPrototypeOf(this, aI.prototype);
			}
		}
		function aT(e, t) {
			let r,
				n = ((e) => {
					if (e >= 200 && e < 300) return "ok";
					switch (e) {
						case 0:
						case 500:
							return "internal";
						case 400:
							return "invalid-argument";
						case 401:
							return "unauthenticated";
						case 403:
							return "permission-denied";
						case 404:
							return "not-found";
						case 409:
							return "aborted";
						case 429:
							return "resource-exhausted";
						case 499:
							return "cancelled";
						case 501:
							return "unimplemented";
						case 503:
							return "unavailable";
						case 504:
							return "deadline-exceeded";
					}
					return "unknown";
				})(e),
				i = n;
			try {
				const e = t && t.error;
				if (e) {
					const t = e.status;
					if ("string" == typeof t) {
						if (!ab[t]) return new aI("internal", "internal");
						(n = ab[t]), (i = t);
					}
					const s = e.message;
					"string" == typeof s && (i = s),
						(r = e.details),
						void 0 !== r && (r = a_(r));
				}
			} catch (e) {}
			return "ok" === n ? null : new aI(n, i, r);
		}
		class aS {
			constructor(e, t, r, n) {
				(this.app = e),
					(this.auth = null),
					(this.messaging = null),
					(this.appCheck = null),
					(this.serverAppAppCheckToken = null),
					(0, b._isFirebaseServerApp)(e) &&
						e.settings.appCheckToken &&
						(this.serverAppAppCheckToken = e.settings.appCheckToken),
					(this.auth = t.getImmediate({ optional: !0 })),
					(this.messaging = r.getImmediate({ optional: !0 })),
					this.auth ||
						t.get().then(
							(e) => (this.auth = e),
							() => {},
						),
					this.messaging ||
						r.get().then(
							(e) => (this.messaging = e),
							() => {},
						),
					this.appCheck ||
						null == n ||
						n.get().then(
							(e) => (this.appCheck = e),
							() => {},
						);
			}
			async getAuthToken() {
				if (this.auth)
					try {
						const e = await this.auth.getToken();
						return null == e ? void 0 : e.accessToken;
					} catch (e) {
						return;
					}
			}
			async getMessagingToken() {
				if (
					this.messaging &&
					"Notification" in self &&
					"granted" === Notification.permission
				)
					try {
						return await this.messaging.getToken();
					} catch (e) {
						return;
					}
			}
			async getAppCheckToken(e) {
				if (this.serverAppAppCheckToken) return this.serverAppAppCheckToken;
				if (this.appCheck) {
					const t = e
						? await this.appCheck.getLimitedUseToken()
						: await this.appCheck.getToken();
					return t.error ? null : t.token;
				}
				return null;
			}
			async getContext(e) {
				const t = await this.getAuthToken();
				return {
					authToken: t,
					messagingToken: await this.getMessagingToken(),
					appCheckToken: await this.getAppCheckToken(e),
				};
			}
		}
		const aC = "us-central1",
			aA = /^data: (.*?)(?:\n|$)/;
		class ak {
			constructor(e, t, r, n, i = aC, s = (...e) => fetch(...e)) {
				(this.app = e),
					(this.fetchImpl = s),
					(this.emulatorOrigin = null),
					(this.contextProvider = new aS(e, t, r, n)),
					(this.cancelAllRequests = new Promise((e) => {
						this.deleteService = () => Promise.resolve(e());
					}));
				try {
					const e = new URL(i);
					(this.customDomain =
						e.origin + ("/" === e.pathname ? "" : e.pathname)),
						(this.region = aC);
				} catch (e) {
					(this.customDomain = null), (this.region = i);
				}
			}
			_delete() {
				return this.deleteService();
			}
			_url(e) {
				const t = this.app.options.projectId;
				if (null !== this.emulatorOrigin) {
					const r = this.emulatorOrigin;
					return `${r}/${t}/${this.region}/${e}`;
				}
				return null !== this.customDomain
					? `${this.customDomain}/${e}`
					: `https://${this.region}-${t}.cloudfunctions.net/${e}`;
			}
		}
		async function aR(e, t, r, n) {
			let i;
			r["Content-Type"] = "application/json";
			try {
				i = await n(e, { method: "POST", body: JSON.stringify(t), headers: r });
			} catch (e) {
				return { status: 0, json: null };
			}
			let s = null;
			try {
				s = await i.json();
			} catch (e) {}
			return { status: i.status, json: s };
		}
		async function aN(e, t) {
			const r = {},
				n = await e.contextProvider.getContext(t.limitedUseAppCheckTokens);
			return (
				n.authToken && (r.Authorization = "Bearer " + n.authToken),
				n.messagingToken &&
					(r["Firebase-Instance-ID-Token"] = n.messagingToken),
				null !== n.appCheckToken &&
					(r["X-Firebase-AppCheck"] = n.appCheckToken),
				r
			);
		}
		async function aD(e, t, r, n) {
			var i;
			let s,
				a = { data: (r = aw(r)) },
				o = await aN(e, n),
				l =
					((i = n.timeout || 7e4),
					(s = null),
					{
						promise: new Promise((e, t) => {
							s = setTimeout(() => {
								t(new aI("deadline-exceeded", "deadline-exceeded"));
							}, i);
						}),
						cancel: () => {
							s && clearTimeout(s);
						},
					}),
				u = await Promise.race([
					aR(t, a, o, e.fetchImpl),
					l.promise,
					e.cancelAllRequests,
				]);
			if ((l.cancel(), !u))
				throw new aI("cancelled", "Firebase Functions instance was deleted.");
			const h = aT(u.status, u.json);
			if (h) throw h;
			if (!u.json)
				throw new aI("internal", "Response is not valid JSON object.");
			let c = u.json.data;
			if ((void 0 === c && (c = u.json.result), void 0 === c))
				throw new aI("internal", "Response is missing data field.");
			return { data: a_(c) };
		}
		async function aO(e, t, r, n) {
			var i, s, a, o, l;
			let u,
				h,
				c,
				d,
				f,
				p = { data: (r = aw(r)) },
				g = await aN(e, n);
			(g["Content-Type"] = "application/json"),
				(g.Accept = "text/event-stream");
			try {
				c = await e.fetchImpl(t, {
					method: "POST",
					body: JSON.stringify(p),
					headers: g,
					signal: null == n ? void 0 : n.signal,
				});
			} catch (t) {
				if (t instanceof Error && "AbortError" === t.name) {
					const e = new aI("cancelled", "Request was cancelled.");
					return {
						data: Promise.reject(e),
						stream: {
							[Symbol.asyncIterator]: () => ({ next: () => Promise.reject(e) }),
						},
					};
				}
				const e = aT(0, null);
				return {
					data: Promise.reject(e),
					stream: {
						[Symbol.asyncIterator]: () => ({ next: () => Promise.reject(e) }),
					},
				};
			}
			const m = new Promise((e, t) => {
				(d = e), (f = t);
			});
			null == (i = null == n ? void 0 : n.signal) ||
				i.addEventListener("abort", () => {
					const e = new aI("cancelled", "Request was cancelled.");
					f(e);
				});
			const y =
				((s = c.body.getReader()),
				(a = d),
				(o = f),
				(l = null == n ? void 0 : n.signal),
				(u = (e, t) => {
					const r = e.match(aA);
					if (!r) return;
					const n = r[1];
					try {
						const e = JSON.parse(n);
						if ("result" in e) return void a(a_(e.result));
						if ("message" in e) return void t.enqueue(a_(e.message));
						if ("error" in e) {
							const r = aT(0, e);
							t.error(r), o(r);
							return;
						}
					} catch (e) {
						if (e instanceof aI) {
							t.error(e), o(e);
							return;
						}
					}
				}),
				(h = new TextDecoder()),
				new ReadableStream({
					start(e) {
						let t = "";
						return r();
						async function r() {
							if (null == l ? void 0 : l.aborted) {
								const t = new aI("cancelled", "Request was cancelled");
								return e.error(t), o(t), Promise.resolve();
							}
							try {
								const { value: n, done: i } = await s.read();
								if (i) {
									t.trim() && u(t.trim(), e), e.close();
									return;
								}
								if (null == l ? void 0 : l.aborted) {
									const t = new aI("cancelled", "Request was cancelled");
									e.error(t), o(t), await s.cancel();
									return;
								}
								const a = (t += h.decode(n, { stream: !0 })).split("\n");
								for (const r of ((t = a.pop() || ""), a))
									r.trim() && u(r.trim(), e);
								return r();
							} catch (r) {
								const t = r instanceof aI ? r : aT(0, null);
								e.error(t), o(t);
							}
						}
					},
					cancel: () => s.cancel(),
				}));
			return {
				stream: {
					[Symbol.asyncIterator]() {
						const e = y.getReader();
						return {
							async next() {
								const { value: t, done: r } = await e.read();
								return { value: t, done: r };
							},
							return: async () => (
								await e.cancel(), { done: !0, value: void 0 }
							),
						};
					},
				},
				data: m,
			};
		}
		const aP = "@firebase/functions",
			ax = "0.12.9";
		function aL(e, t, r) {
			var n;
			let i;
			(n = (0, ay.getModularInstance)(e)),
				(i = (0, ay.isCloudWorkstation)(t)),
				(n.emulatorOrigin = `http${i ? "s" : ""}://${t}:${r}`),
				i &&
					((0, ay.pingServer)(n.emulatorOrigin),
					(0, ay.updateEmulatorBanner)("Functions", !0));
		}
		(0, b._registerComponent)(
			new I.Component(
				aE,
				(e, { instanceIdentifier: t }) =>
					new ak(
						e.getProvider("app").getImmediate(),
						e.getProvider("auth-internal"),
						e.getProvider("messaging-internal"),
						e.getProvider("app-check-internal"),
						t,
					),
				"PUBLIC",
			).setMultipleInstances(!0),
		),
			(0, b.registerVersion)(aP, ax, void 0),
			(0, b.registerVersion)(aP, ax, "esm2017");
		const aM = globalThis;
		(r = sk(
			(t =
				0 === (0, w.getApps)().length
					? (0, w.initializeApp)({
							apiKey: "AIzaSyDogjn3RauIxH19tqldSxu_dAuX0U97P44",
							authDomain: "abtec-8f31e.firebaseapp.com",
							projectId: "abtec-8f31e",
							storageBucket: "abtec-8f31e.firebasestorage.app",
							messagingSenderId: "453551453612",
							appId: "1:453551453612:web:93f83eff2f9e279f177609",
						})
					: (0, w.getApps)()[0]),
		)),
			(n = (0, _.getAuth)(t)),
			(i = ((e = (0, b.getApp)(), t = aC) => {
				const r = (0, b._getProvider)(
						(0, ay.getModularInstance)(e),
						aE,
					).getImmediate({ identifier: t }),
					n = (0, ay.getDefaultEmulatorHostnameAndPort)("functions");
				return n && aL(r, ...n), r;
			})(t)),
			aM.__abtecCrmFirebaseEmulatorsConnected ||
				(sy(r, "127.0.0.1", 8080),
				(0, _.connectAuthEmulator)(n, "http://127.0.0.1:9099"),
				aL(i, "127.0.0.1", 5001),
				console.info(
					"[Firebase][CRM] Usando emuladores: Firestore(8080), Auth(9099), Functions(5001)",
				),
				(aM.__abtecCrmFirebaseEmulatorsConnected = !0));
		const aU = async (e, ...t) => {
				const n = s3(sE(r, e), ...t);
				return (await ah(n)).docs.map((e) => ({ id: e.id, ...e.data() }));
			},
			aV = async (e, t) => {
				const n = sb(r, e, t),
					i = await al(n);
				return i.exists() ? { id: i.id, ...i.data() } : null;
			},
			aF = async (e, t) =>
				(await af(sE(r, e), { ...t, createdAt: e_.now(), updatedAt: e_.now() }))
					.id,
			aj = async (e, t, n) => {
				const i = sb(r, e, t);
				await ac(i, { ...n, updatedAt: e_.now() });
			},
			aB = async (e, t) => {
				const n = sb(r, e, t);
				await ad(n);
			};
		e.s(
			[
				"auth",
				() => n,
				"callFunction",
				0,
				(e) => {
					var t, r;
					let n;
					return (
						(t = (0, ay.getModularInstance)(i)),
						(r = void 0),
						((n = (n) => {
							var i, s, a, o;
							let l;
							return (
								(i = t),
								(s = e),
								(a = n),
								(o = r || {}),
								(l = i._url(s)),
								aD(i, l, a, o)
							);
						}).stream = (r, n) => {
							var i, s, a, o;
							let l;
							return (
								(i = t),
								(s = e),
								(a = r),
								(o = n),
								(l = i._url(s)),
								aO(i, l, a, o || {})
							);
						}),
						n
					);
				},
				"createDocument",
				0,
				aF,
				"deleteDocument",
				0,
				aB,
				"getCollection",
				0,
				aU,
				"getDocument",
				0,
				aV,
				"subscribeToCollection",
				0,
				(e, t, ...n) =>
					ap(s3(sE(r, e), ...n), (e) => {
						t(e.docs.map((e) => ({ id: e.id, ...e.data() })));
					}),
				"updateDocument",
				0,
				aj,
			],
			65237,
		);
	},
]);
