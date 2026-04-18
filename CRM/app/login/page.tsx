"use client";
import {
	GoogleAuthProvider,
	signInWithEmailAndPassword,
	signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { auth, db } from "../../lib/firebase";

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
		if (code.includes("auth/popup-closed-by-user"))
			return "El proceso de Google fue cancelado o la ventana se cerró.";
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

	const handleGoogleSignIn = async () => {
		setError(null);
		setLoading(true);

		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);

			const staffRef = doc(db, "staff", userCredential.user.uid);
			const staffSnap = await getDoc(staffRef);

			if (!staffSnap.exists()) {
				throw new Error(
					"Access Denied: Authorized staff account not found for this Google email.",
				);
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
		<div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
			<div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/20">
				<div className="text-center mb-10">
					<div className="relative inline-block mb-6">
						<div className="w-20 h-20 bg-primary rounded-2xl rotate-3 shadow-lg shadow-primary/30 flex items-center justify-center mx-auto transition-transform hover:rotate-6 duration-300">
							<span className="text-white text-3xl font-bold -rotate-3">A</span>
						</div>
						<div className="absolute -bottom-1 -right-1 w-6 h-6 bg-secondary rounded-full border-4 border-white"></div>
					</div>
					<h1 className="text-3xl font-bold text-secondary tracking-tight font-display">
						Abtec <span className="text-primary">CRM</span>
					</h1>
					<p className="text-slate-500 mt-2 font-medium">
						Panel de Control Corporativo
					</p>
				</div>

				{(error || queryError === "not_staff") && (
					<div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm flex gap-3 items-center animate-shake">
						<span className="bg-red-100 p-1 rounded-full">⚠️</span>
						<p className="font-medium">
							{error ||
								"Acceso denegado: esta cuenta no pertenece al personal interno."}
						</p>
					</div>
				)}

				<form onSubmit={handleLogin} className="space-y-6">
					<div className="space-y-2">
						<label
							htmlFor="crm-email"
							className="text-sm font-semibold text-secondary ml-1"
						>
							Correo Corporativo
						</label>
						<div className="relative group">
							<input
								id="crm-email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-300 placeholder:text-slate-400"
								placeholder="nombre@abtec.com"
							/>
						</div>
					</div>
					<div className="space-y-2">
						<label
							htmlFor="crm-password"
							className="text-sm font-semibold text-secondary ml-1"
						>
							Contraseña
						</label>
						<div className="relative group">
							<input
								id="crm-password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all duration-300 placeholder:text-slate-400"
								placeholder="••••••••"
							/>
						</div>
					</div>
					
					<button
						type="submit"
						disabled={loading}
						className="w-full bg-secondary hover:bg-[#243b7a] active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-secondary/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group flex items-center justify-center gap-2"
					>
						{loading ? (
							<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
						) : (
							<>
								<span>Iniciar Sesión</span>
								<svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
								</svg>
							</>
						)}
					</button>
				</form>

				<div className="mt-8 relative">
					<div className="absolute inset-0 flex items-center">
						<div className="w-full border-t border-slate-200"></div>
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
							o continuar con
						</span>
					</div>
				</div>

				<button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={loading}
					className="w-full mt-6 bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 text-secondary font-bold py-4 flex items-center justify-center gap-3 rounded-2xl transition-all duration-300 disabled:opacity-70"
				>
					<Image
						src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
						width={20}
						height={20}
						alt="Logo de Google para autenticación corporativa"
					/>
					<span>Acceso de Empleado</span>
				</button>
				
				<p className="mt-8 text-center text-slate-400 text-xs font-medium uppercase tracking-tighter">
					Confidencial & Privado &copy; {new Date().getFullYear()} Abtec Energía
				</p>
			</div>
		</div>
	);
}

export default function LoginPage() {
	return (
		<div className="min-h-screen relative flex items-center justify-center bg-background-light overflow-hidden font-display selection:bg-primary/30">
			{/* Decorative Elements */}
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
				<div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
				<div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px]"></div>
			</div>
			
			<div className="z-10 w-full p-4 flex justify-center">
				<Suspense fallback={
					<div className="flex flex-col items-center gap-4">
						<div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
						<p className="text-secondary font-bold animate-pulse">Cargando Entorno Seguro...</p>
					</div>
				}>
					<LoginForm />
				</Suspense>
			</div>
		</div>
	);
}
