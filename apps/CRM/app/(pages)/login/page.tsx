"use client";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import TravelConnectSignIn from "@/components/ui/travel-connect-signin";
import { auth } from "../../../lib/firebase";

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
			const { user } = await signInWithEmailAndPassword(auth, email, password);

			// Verify the staff custom claim before allowing access
			let claims;
			try {
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
			if (!claims.staff) {
				await auth.signOut();
				throw new Error("Access Denied: You do not have staff privileges.");
			}

			router.push("/");
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	return (
		<TravelConnectSignIn
			onSubmit={handleLogin}
			loading={loading}
			error={
				error ||
				(queryError === "not_staff"
					? "Acceso denegado: esta cuenta no pertenece al personal interno."
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
