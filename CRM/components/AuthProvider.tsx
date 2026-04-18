"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import type { ReactNode } from "react";
import {
	User,
	onAuthStateChanged,
	signOut as firebaseSignOut,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../lib/firebase";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	isStaff: boolean;
	signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
	user: null,
	loading: true,
	isStaff: false,
	signOut: async () => {},
});

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [isStaff, setIsStaff] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				try {
					// Check if user exists in the staff collection
					const staffRef = doc(db, "staff", firebaseUser.uid);
					const staffSnap = await getDoc(staffRef);

					if (staffSnap.exists()) {
						setUser(firebaseUser);
						setIsStaff(true);
						if (pathname === "/login") {
							router.push("/");
						}
					} else {
						// Unauthorized - not staff
						await firebaseSignOut(auth);
						setUser(null);
						setIsStaff(false);
						if (pathname !== "/login") {
							router.push("/login?error=not_staff");
						}
					}
				} catch (error) {
					console.error("Error verifying staff access:", error);
					await firebaseSignOut(auth);
					setUser(null);
					setIsStaff(false);
				}
			} else {
				setUser(null);
				setIsStaff(false);
				if (pathname !== "/login") {
					router.push("/login");
				}
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, [pathname, router]);

	const signOut = async () => {
		await firebaseSignOut(auth);
		router.push("/login");
	};

	const contextValue = useMemo(
		() => ({ user, loading, isStaff, signOut }),
		[user, loading, isStaff],
	);

	// Only render children if loading is done and they are either authenticated staff or on the login page.
	// Wait, if we enforce routing here, we can just return children and let useEffect handle the redirect, but to prevent flash of content:
	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
			</div>
		);
	}

	// If not staff and not on login page, don't render children (avoid flash of protected content)
	if (!isStaff && pathname !== "/login") {
		return null;
	}

	// If staff and on login page, we're redirecting to /, so return null to avoid flash of login page
	if (isStaff && pathname === "/login") {
		return null;
	}

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export const useAuth = () => useContext(AuthContext);
