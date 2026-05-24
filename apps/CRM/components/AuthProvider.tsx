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

const STAFF_ROLES = ["admin", "manager", "sales", "support"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isStaff: boolean;
	staffRole: StaffRole | null;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	isStaff: false,
	staffRole: null,
	signOut: async () => {},
});

async function resolveStaffRole(user: User): Promise<StaffRole | null> {
	// Force-refresh so newly set claims are picked up immediately
	const { claims } = await user.getIdTokenResult(true);
	const role = claims.staff as string | undefined;
	return STAFF_ROLES.includes(role as StaffRole) ? (role as StaffRole) : null;
}

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isStaff, setIsStaff] = useState(false);
	const [staffRole, setStaffRole] = useState<StaffRole | null>(null);
	const router = useRouter();
	const pathname = usePathname();

	const resetAuth = useCallback(async (signOutFirst = false) => {
		if (signOutFirst) await firebaseSignOut(auth);
		setUser(null);
		setIsStaff(false);
		setStaffRole(null);
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
				const role = await resolveStaffRole(firebaseUser);

				if (role) {
					setUser(firebaseUser);
					setIsStaff(true);
					setStaffRole(role);
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
		() => ({ user, loading, isStaff, staffRole, signOut }),
		[user, loading, isStaff, staffRole, signOut],
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
