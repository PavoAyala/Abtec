"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import type * as React from "react";

interface SplitLoginCardProps {
	readonly onSubmit: (e: React.FormEvent) => void;
	readonly loading: boolean;
	readonly error: string | null;
	readonly email: string;
	readonly setEmail: (val: string) => void;
	readonly password: string;
	readonly setPassword: (val: string) => void;
}

export default function SplitLoginCard({
	onSubmit,
	loading,
	error,
	email,
	setEmail,
	password,
	setPassword,
}: SplitLoginCardProps) {
	return (
		<div className="flex flex-col md:flex-row w-full max-w-4xl mx-auto shadow-2xl rounded-2xl overflow-hidden bg-white border dark:bg-gray-800 border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-500">
			{/* Left Side: Welcome + Illustration */}
			<div className="md:w-1/2 bg-secondary text-white flex flex-col items-center justify-center p-12 relative overflow-hidden">
				<div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
					<div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-white rounded-full blur-[100px]"></div>
				</div>

				<div className="relative z-10 flex flex-col items-center text-center">
					<div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/20 transform -rotate-6">
						<span className="text-white text-3xl font-bold">A</span>
					</div>
					<h2 className="text-4xl font-bold mb-4 tracking-tight font-display">
						¡Bienvenido!
					</h2>
					<p className="mb-8 text-blue-100 font-medium max-w-[280px]">
						Inicia sesión para acceder a tu panel de control y gestionar tus
						operaciones.
					</p>
					<Image
						src="https://pub-940ccf6255b54fa799a9b01050e6c227.r2.dev/ruixen-dark.png"
						alt="Ilustración corporativa de Abtec Energía"
						width={96}
						height={96}
						className="opacity-80 hover:scale-110 transition-transform duration-500"
					/>
				</div>
			</div>

			{/* Right Side: Login Form */}
			<div className="md:w-1/2 p-12 flex flex-col justify-center bg-slate-50/50">
				<div className="mb-10">
					<h3 className="text-3xl font-bold text-secondary mb-2 tracking-tight">
						Iniciar Sesión
					</h3>
					<p className="text-slate-500 text-sm font-medium">
						Panel de Control Corporativo Abtec
					</p>
				</div>

				{error && (
					<div
						role="alert"
						className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-6 text-sm flex gap-3 items-center animate-shake"
					>
						<span className="bg-red-100 p-1 rounded-full" aria-hidden="true">
							⚠️
						</span>
						<p className="font-medium">{error}</p>
					</div>
				)}

				<form onSubmit={onSubmit} className="flex flex-col gap-5">
					<div className="space-y-2">
						<Label
							htmlFor="email"
							className="text-slate-700 font-semibold ml-1"
						>
							Correo Corporativo
						</Label>
						<Input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="nombre@abtec.com"
							className="h-12 rounded-xl border-slate-200 bg-white focus:ring-primary/20"
						/>
					</div>
					<div className="space-y-2">
						<Label
							htmlFor="password"
							className="text-slate-700 font-semibold ml-1"
						>
							Contraseña
						</Label>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="h-12 rounded-xl border-slate-200 bg-white focus:ring-primary/20"
						/>
					</div>

					<Button
						disabled={loading}
						className="mt-4 h-12 w-full bg-secondary hover:bg-[#243b7a] text-white font-bold rounded-xl shadow-lg shadow-secondary/20 transition-all duration-300"
					>
						{loading ? (
							<div className="flex items-center gap-2">
								<div
									className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"
									role="status"
								>
									<span className="sr-only">Cargando...</span>
								</div>
								<span>Entrando...</span>
							</div>
						) : (
							"Entrar al Sistema"
						)}
					</Button>
				</form>

				<p className="mt-10 text-xs text-slate-400 font-medium text-center uppercase tracking-widest">
					Propiedad de Abtec Energía &copy; {new Date().getFullYear()}
				</p>
			</div>
		</div>
	);
}
