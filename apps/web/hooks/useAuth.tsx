"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
	User,
	signOut as firebaseSignOut,
	onAuthStateChanged,
} from "firebase/auth";
import { getClientAuth, getClientDb } from "../lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
	user: User | null;
	loading: boolean;
	error: string | null;
	isAuthModalOpen: boolean;
	isAuthenticated: boolean;
	openAuthModal: () => void;
	closeAuthModal: () => void;
	signOut: () => Promise<void>;
	setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

	useEffect(() => {
		const auth = getClientAuth();
		const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
			if (firebaseUser) {
				setUser(firebaseUser);
				try {
					const db = getClientDb();
					const userRef = doc(db, "users", firebaseUser.uid);
					const userSnap = await getDoc(userRef);

					if (!userSnap.exists()) {
						await setDoc(userRef, {
							email: firebaseUser.email,
							displayName: firebaseUser.displayName || "",
							authUid: firebaseUser.uid,
							status: "active",
							createdAt: serverTimestamp(),
							updatedAt: serverTimestamp(),
						});
					}
				} catch (error) {
					console.error(
						"Error checking/creating user profile in Firestore:",
						error,
					);
				}
			} else {
				setUser(null);
			}
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const openAuthModal = () => setIsAuthModalOpen(true);
	const closeAuthModal = () => setIsAuthModalOpen(false);

	const signOut = async () => {
		setError(null);
		try {
			const auth = getClientAuth();
			await firebaseSignOut(auth);
		} catch (err) {
			const message = err instanceof Error ? err.message : "Sign out failed";
			setError(message);
			throw err;
		}
	};

	const contextValue = useMemo(
		() => ({
			user,
			loading,
			error,
			isAuthModalOpen,
			isAuthenticated: !!user,
			openAuthModal,
			closeAuthModal,
			signOut,
			setUser,
		}),
		[user, loading, error, isAuthModalOpen],
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export function useAuth(): AuthContextType {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
