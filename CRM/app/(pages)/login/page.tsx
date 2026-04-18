"use client";

import SplitLoginCard from "@/components/ui/split-login-card";
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

	// If redirected here with error query parameter
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
		<SplitLoginCard
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
		<div className="min-h-screen relative flex items-center justify-center bg-background-light p-6 overflow-hidden selection:bg-primary/30">
			{/* Decorative background elements consistent with Abtec theme */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
				<div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]"></div>
			</div>

			<div className="z-10 w-full max-w-6xl mx-auto flex justify-center">
				<Suspense
					fallback={
						<div className="flex flex-col items-center gap-4">
							<div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
							<p className="text-secondary font-bold animate-pulse">
								Cargando Entorno Seguro...
							</p>
						</div>
					}
				>
					<LoginForm />
				</Suspense>
			</div>
		</div>
	);
}
