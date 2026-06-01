"use client";

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, type User } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import TravelConnectSignIn from "@/components/ui/travel-connect-signin";
import { auth, db } from "../../../lib/firebase";

function LoginForm() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const searchParams = useSearchParams();

	const queryError = searchParams.get("error");

	const getFriendlyErrorMessage = (errorObj: unknown): string => {
		const err = errorObj as Record<string, unknown>;
		let code = "";
		if (typeof err?.code === "string") {
			code = err.code;
		} else if (typeof err?.message === "string") {
			code = err.message;
		}
		if (code.includes("auth/invalid-credential"))
			return "El correo o la contraseña son incorrectos.";
		if (
			code.includes("auth/user-not-found") ||
			code.includes("auth/wrong-password")
		)
			return "El correo o la contraseña son incorrectos.";
		if (code.includes("auth/network-request-failed"))
			return "Error de conexión. Revisa tu internet e intenta de nuevo.";
		if (code.includes("Access Denied"))
			return "No tienes permisos para ver esta página";
		return "Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.";
	};

	const ensureUserDocument = async (user: User) => {
		try {
			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);
			if (!userDoc.exists()) {
				await setDoc(userDocRef, {
					email: user.email,
					name: user.displayName || user.email?.split('@')[0] || "Nuevo Usuario",
					roles: [],
					status: "active",
					createdAt: serverTimestamp(),
					updatedAt: serverTimestamp(),
				});
			}
		} catch (err) {
			console.error("Error creating user document:", err);
			// We don't throw here to avoid blocking login flow
		}
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const { user } = await createUserWithEmailAndPassword(auth, email, password);
			await ensureUserDocument(user);
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	const handleGoogleSignIn = async () => {
		setError(null);
		setLoading(true);

		try {
			const provider = new GoogleAuthProvider();
			const { user } = await signInWithPopup(auth, provider);
			await ensureUserDocument(user);
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	return (
		<TravelConnectSignIn
			onSubmit={handleLogin}
			onRegister={handleRegister}
			onGoogleSignIn={handleGoogleSignIn}
			loading={loading}
			error={
				error ||
				(queryError === "not_staff"
					? "No tienes permisos para ver esta página"
					: null)
			}
			email={email}
			setEmail={setEmail}
			password={password}
			setPassword={setPassword}
		/>
	);
}

export default function LoginPage() {
	return (
		<div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#0d1a0d] p-4">
			<Suspense
				fallback={<p className="text-gray-400">Cargando Entorno Seguro...</p>}
			>
				<LoginForm />
			</Suspense>
		</div>
	);
}
