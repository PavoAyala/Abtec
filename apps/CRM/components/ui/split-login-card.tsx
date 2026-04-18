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
		<div className="flex flex-col md:flex-row w-full max-w-5xl mx-auto shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden bg-white border border-slate-200 animate-in fade-in zoom-in-95 duration-700">
			{/* Left Side: Brand Identity */}
			<div className="md:w-[45%] bg-[#1a2a5a] text-white flex flex-col items-center justify-center p-12 relative overflow-hidden">
				{/* Modern Background Effects */}
				<div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
					<div className="absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-[#78b309] rounded-full blur-[120px] opacity-20 animate-pulse"></div>
					<div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#78b309] rounded-full blur-[100px] opacity-10"></div>
				</div>

				<div className="relative z-10 flex flex-col items-center text-center">
					<div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center mb-10 shadow-2xl border border-white/20 transform hover:scale-110 transition-transform duration-500">
						<Image
							src="/logo.png"
							alt="Abtec Logo"
							width={64}
							height={64}
							className="object-contain"
							priority
						/>
					</div>
					
					<h2 className="text-4xl font-bold mb-6 tracking-tight font-display leading-tight">
						Energía que <br />
						<span className="text-[#78b309]">Transforma</span>
					</h2>
					
					<p className="mb-8 text-blue-100/70 font-medium max-w-[280px] text-sm leading-relaxed">
						Accede al ecosistema corporativo de Abtec para gestionar operaciones de vanguardia.
					</p>

					{/* Simple CSS-based aesthetic element */}
					<div className="mt-4 flex gap-2">
						{[1, 2, 3].map((i) => (
							<div key={i} className={`h-1 rounded-full bg-white/${i === 1 ? '40' : '10'} w-8`}></div>
						))}
					</div>
				</div>
			</div>

			{/* Right Side: High-End Login Form */}
			<div className="md:w-[55%] p-12 md:p-16 flex flex-col justify-center bg-white">
				<div className="mb-12">
					<div className="inline-block px-3 py-1 rounded-full bg-[#78b309]/10 text-[#78b309] text-[10px] font-bold uppercase tracking-widest mb-4">
						Acceso Restringido
					</div>
					<h3 className="text-3xl font-bold text-[#1a2a5a] mb-3 tracking-tight font-display">
						Panel de Control
					</h3>
					<p className="text-slate-400 text-sm font-medium">
						Ingresa tus credenciales corporativas para continuar.
					</p>
				</div>

				{error && (
					<div
						role="alert"
						className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-8 text-sm flex gap-3 items-center animate-in slide-in-from-top-2 duration-300"
					>
						<div className="bg-red-100 p-1.5 rounded-full flex-shrink-0">
							<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
						</div>
						<p className="font-semibold">{error}</p>
					</div>
				)}

				<form onSubmit={onSubmit} className="flex flex-col gap-6">
					<div className="space-y-2.5">
						<Label
							htmlFor="email"
							className="text-slate-600 font-bold text-xs uppercase tracking-wider ml-1"
						>
							Correo Electrónico
						</Label>
						<Input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="admin@abtec.com"
							className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-5 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#78b309]/10 focus-visible:border-[#78b309] focus-visible:outline-none transition-all duration-300"
						/>
					</div>
					<div className="space-y-2.5">
						<div className="flex justify-between items-end ml-1">
							<Label
								htmlFor="password"
								className="text-slate-600 font-bold text-xs uppercase tracking-wider"
							>
								Contraseña
							</Label>
							<a href="#" className="text-[11px] font-bold text-[#78b309] hover:underline">¿Olvidaste tu clave?</a>
						</div>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••••••"
							className="h-14 rounded-2xl border-slate-200 bg-slate-50/50 px-5 focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[#78b309]/10 focus-visible:border-[#78b309] focus-visible:outline-none transition-all duration-300"
						/>
					</div>

					<Button
						disabled={loading}
						className="mt-6 h-14 w-full bg-[#1a2a5a] hover:bg-[#152248] text-white font-bold rounded-2xl shadow-xl shadow-[#1a2a5a]/20 transform active:scale-[0.98] transition-all duration-300 overflow-hidden group relative"
					>
						{loading ? (
							<div className="flex items-center gap-3">
								<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
								<span className="tracking-wide">Verificando...</span>
							</div>
						) : (
							<span className="relative z-10 flex items-center justify-center gap-2">
								Entrar al Sistema
								<svg className="group-hover:translate-x-1 transition-transform" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
							</span>
						)}
					</Button>
				</form>

				<div className="mt-12 flex flex-col items-center gap-6">
					<div className="h-px w-full bg-slate-100"></div>
					<p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-[0.2em]">
						Abtec Energía Smart Systems &copy; {new Date().getFullYear()}
					</p>
				</div>
			</div>
		</div>
	);
}
