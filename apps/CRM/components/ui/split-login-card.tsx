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
		<div>
			<div>
				<Image
					src="/logo.png"
					alt="Abtec Logo"
					width={64}
					height={64}
					priority
				/>
				<h2>Energía que Transforma</h2>
				<p>Accede al ecosistema corporativo de Abtec para gestionar operaciones de vanguardia.</p>
			</div>

			<div>
				<h3>Panel de Control</h3>
				<p>Ingresa tus credenciales corporativas para continuar.</p>

				{error && (
					<div role="alert">
						<p>{error}</p>
					</div>
				)}

				<form onSubmit={onSubmit}>
					<div>
						<Label htmlFor="email">Correo Electrónico</Label>
						<Input
							id="email"
							type="email"
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="admin@abtec.com"
						/>
					</div>
					<div>
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••••••"
						/>
					</div>

					<Button disabled={loading}>
						{loading ? "Verificando..." : "Entrar al Sistema"}
					</Button>
				</form>

				<p>Abtec Energía Smart Systems &copy; {new Date().getFullYear()}</p>
			</div>
		</div>
	);
}
