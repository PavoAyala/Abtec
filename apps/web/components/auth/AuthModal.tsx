"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { getClientAuth, getClientDb } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

import type { ReactElement } from "react";

export default function AuthModal(): ReactElement | null {
	const { isAuthModalOpen, closeAuthModal, user } = useAuth();
	const [activeTab, setActiveTab] = useState<"login" | "register">("login");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	if (!isAuthModalOpen) return null;

	const getFriendlyErrorMessage = (errorObj: unknown): string => {
		const err = errorObj as Record<string, unknown>;
		let code = "";
		if (typeof err?.code === "string") {
			code = err.code;
		} else if (typeof err?.message === "string") {
			code = err.message;
		}
		if (code.includes("auth/popup-closed-by-user"))
			return "El inicio de sesión con Google fue cancelado.";
		if (code.includes("auth/invalid-credential"))
			return "El correo o la contraseña son incorrectos.";
		if (
			code.includes("auth/user-not-found") ||
			code.includes("auth/wrong-password")
		)
			return "El correo o la contraseña son incorrectos.";
		if (code.includes("auth/email-already-in-use"))
			return "Ya existe una cuenta con este correo electrónico.";
		if (code.includes("auth/weak-password"))
			return "La contraseña es muy débil (mínimo 6 caracteres).";
		if (code.includes("auth/network-request-failed"))
			return "Error de conexión. Revisa tu internet e intenta de nuevo.";
		if (code.includes("auth/invalid-email"))
			return "El correo electrónico no es válido.";
		return "Ocurrió un error inesperado al iniciar sesión. Inténtalo de nuevo.";
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		if (activeTab === "register" && password !== confirmPassword) {
			setError("Las contraseñas no coinciden. Por favor, verifica.");
			return;
		}

		setLoading(true);

		try {
			const auth = getClientAuth();
			if (activeTab === "login") {
				await signInWithEmailAndPassword(auth, email, password);
				closeAuthModal();
			} else {
				const { user } = await createUserWithEmailAndPassword(
					auth,
					email,
					password,
				);
				// Explicitly create user document just in case onAuthStateChanged is slow
				try {
					const db = getClientDb();
					await setDoc(doc(db, "users", user.uid), {
						email: user.email,
						displayName: `${firstName} ${lastName}`.trim(),
						firstName,
						lastName,
						authUid: user.uid,
						status: "active",
						createdAt: serverTimestamp(),
						updatedAt: serverTimestamp(),
					});
				} catch (dbError) {
					console.error("Failed to create profile document", dbError);
				}
				closeAuthModal();
			}
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
			const auth = getClientAuth();
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			closeAuthModal();
		} catch (err: unknown) {
			setError(getFriendlyErrorMessage(err));
		} finally {
			setLoading(false);
		}
	};

	if (user) {
		// If somehow authenticated but modal is open, just close it or show a quick summary
		return (
			<div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center">
				<div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center relative shadow-2xl">
					<button
						onClick={closeAuthModal}
						className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
					>
						<span className="material-symbols-outlined">close</span>
					</button>
					<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
						<span className="material-symbols-outlined text-green-600 text-3xl">
							check_circle
						</span>
					</div>
					<h2 className="text-xl font-bold mb-2">Ya estás conectado</h2>
					<p className="text-gray-600 mb-6">{user.email}</p>
					<button
						onClick={closeAuthModal}
						className="w-full bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary/90 transition-colors"
					>
						Continuar al sitio
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl w-full max-w-md p-8 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
				<button
					onClick={closeAuthModal}
					className="absolute right-4 top-4 text-secondary/40 hover:text-secondary p-1 transition-colors"
				>
					<span className="material-symbols-outlined">close</span>
				</button>

				<div className="text-center mb-8">
					<div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
						<span className="material-symbols-outlined text-primary text-3xl">
							person
						</span>
					</div>
					<h2 className="text-2xl font-bold text-secondary">Acceso Clientes</h2>
					<p className="text-secondary/60 text-sm mt-1">
						Gestiona tus proyectos y servicios
					</p>
				</div>

				<div className="flex bg-gray-100 p-1 rounded-xl mb-6">
					<button
						type="button"
						onClick={() => {
							setActiveTab("login");
							setError(null);
						}}
						className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "login" ? "bg-white text-secondary shadow-sm" : "text-secondary/60 hover:text-secondary"}`}
					>
						Iniciar Sesión
					</button>
					<button
						type="button"
						onClick={() => {
							setActiveTab("register");
							setError(null);
						}}
						className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "register" ? "bg-white text-secondary shadow-sm" : "text-secondary/60 hover:text-secondary"}`}
					>
						Crear Cuenta
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-4">
					{activeTab === "register" && (
						<div className="flex gap-4">
							<div className="flex-1">
								<label
									htmlFor="first-name-input"
									className="block text-xs font-semibold text-secondary/80 mb-1 ml-1 uppercase tracking-wide"
								>
									Nombre
								</label>
								<input
									id="first-name-input"
									type="text"
									required
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
									placeholder="Juan"
								/>
							</div>
							<div className="flex-1">
								<label
									htmlFor="last-name-input"
									className="block text-xs font-semibold text-secondary/80 mb-1 ml-1 uppercase tracking-wide"
								>
									Apellido
								</label>
								<input
									id="last-name-input"
									type="text"
									required
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
									placeholder="Pérez"
								/>
							</div>
						</div>
					)}

					<div>
						<label
							htmlFor="email-input"
							className="block text-xs font-semibold text-secondary/80 mb-1 ml-1 uppercase tracking-wide"
						>
							Correo Electrónico
						</label>
						<input
							id="email-input"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
							placeholder="tu@correo.com"
						/>
					</div>

					<div>
						<label
							htmlFor="password-input"
							className="block text-xs font-semibold text-secondary/80 mb-1 ml-1 uppercase tracking-wide"
						>
							Contraseña
						</label>
						<input
							id="password-input"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
							placeholder="••••••••"
						/>
					</div>

					{activeTab === "register" && (
						<div>
							<label
								htmlFor="confirm-password-input"
								className="block text-xs font-semibold text-secondary/80 mb-1 ml-1 uppercase tracking-wide"
							>
								Confirmar Contraseña
							</label>
							<input
								id="confirm-password-input"
								type="password"
								required
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:ring-2 focus:outline-none transition-all ${confirmPassword && password !== confirmPassword ? "border-red-300 focus:ring-red-200 focus:border-red-400" : "border-gray-200 focus:ring-primary/20 focus:border-primary"}`}
								placeholder="••••••••"
							/>
						</div>
					)}

					{error && (
						<div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100 flex items-start gap-2">
							<span className="material-symbols-outlined text-red-500 text-[20px]">
								error
							</span>
							<p>{error}</p>
						</div>
					)}

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-3.5 px-4 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
					>
						{(() => {
							if (loading) return "Procesando...";
							return activeTab === "login"
								? "Ingresar a mi cuenta"
								: "Completar Registro";
						})()}
					</button>
				</form>

				<div className="my-6 flex items-center before:flex-1 before:border-t before:border-gray-200 after:flex-1 after:border-t after:border-gray-200">
					<span className="mx-4 text-sm text-gray-400 font-medium">
						o continúa con
					</span>
				</div>

				<button
					type="button"
					onClick={handleGoogleSignIn}
					disabled={loading}
					className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-100 hover:bg-gray-50 text-secondary font-bold py-3.5 px-4 rounded-xl transition-all disabled:opacity-70"
				>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
						className="w-5 h-5"
						alt="Google logo"
					/>
					<span>Google</span>
				</button>
			</div>
		</div>
	);
}
