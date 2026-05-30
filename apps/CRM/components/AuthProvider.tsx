"use client";

import {
	signOut as firebaseSignOut,
	onAuthStateChanged,
	type User,
} from "firebase/auth";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";
import { auth } from "../lib/firebase";

const STAFF_ROLES = ["admin", "manager", "sales", "support", "publisher"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isStaff: boolean;
	staffRoles: StaffRole[];
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	isStaff: false,
	staffRoles: [],
	signOut: async () => {},
});

async function resolveStaffRoles(user: User): Promise<StaffRole[]> {
	let claims;
	try {
		// Force-refresh so newly set claims are picked up immediately
		const result = await user.getIdTokenResult(true);
		claims = result.claims;
	} catch (error: any) {
		if (error?.code === "auth/network-request-failed") {
			console.warn("Network request failed, falling back to cached claims");
			const result = await user.getIdTokenResult(false);
			claims = result.claims;
		} else {
			throw error;
		}
	}

	const roles = claims.staff;

	if (Array.isArray(roles)) {
		return roles.filter((r): r is StaffRole => STAFF_ROLES.includes(r as StaffRole));
	}
	if (typeof roles === "string" && STAFF_ROLES.includes(roles as StaffRole)) {
		return [roles as StaffRole];
	}
	return [];
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isStaff, setIsStaff] = useState(false);
	const [staffRoles, setStaffRoles] = useState<StaffRole[]>([]);
	const router = useRouter();
	const pathname = usePathname();

	const resetAuth = useCallback(async (signOutFirst = false) => {
		if (signOutFirst) await firebaseSignOut(auth);
		setUser(null);
		setIsStaff(false);
		setStaffRoles([]);
	}, []);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (!firebaseUser) {
				await resetAuth();
				if (pathname !== "/login") router.push("/login");
				setLoading(false);
				return;
			}

			try {
				const roles = await resolveStaffRoles(firebaseUser);

				if (roles.length > 0) {
					setUser(firebaseUser);
					setIsStaff(true);
					setStaffRoles(roles);
					if (pathname === "/login") router.push("/");
				} else {
					await resetAuth(true);
					if (pathname !== "/login") router.push("/login?error=not_staff");
				}
			} catch (error) {
				console.error("Error verifying staff claim:", error);
				await resetAuth(true);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [pathname, router, resetAuth]);

	const signOut = useCallback(async () => {
		await firebaseSignOut(auth);
		router.push("/login");
	}, [router]);

	const contextValue = useMemo(
		() => ({ user, loading, isStaff, staffRoles, signOut }),
		[user, loading, isStaff, staffRoles, signOut],
	);

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	if (!isStaff && pathname !== "/login") return null;
	if (isStaff && pathname === "/login") return null;

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
