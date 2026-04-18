"use client";

import TravelConnectSignIn from "@/components/ui/travel-connect-signin";
import { auth, db } from "../../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

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
			return "Acceso denegado: cuenta no autorizada en el CRM.";
		return "Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.";
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setLoading(true);

		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const staffRef = doc(db, "staff", userCredential.user.uid);
			const staffSnap = await getDoc(staffRef);

			if (!staffSnap.exists()) {
				throw new Error("Access Denied: You do not have staff privileges.");
			}

			router.push("/");
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
			await auth.signOut();
		} finally {
			setLoading(false);
		}
	};

	return (
		<TravelConnectSignIn
			onSubmit={handleLogin}
			loading={loading}
			error={error || (queryError === "not_staff" ? "Acceso denegado: esta cuenta no pertenece al personal interno." : null)}
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
			<Suspense fallback={<p className="text-gray-400">Cargando Entorno Seguro...</p>}>
				<LoginForm />
			</Suspense>
		</div>
	);
}
