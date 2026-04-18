"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

// DotMap Component
type RoutePoint = {
	x: number;
	y: number;
	delay: number;
};

const DotMap = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

	const routes: { start: RoutePoint; end: RoutePoint; color: string }[] = [
		{ start: { x: 100, y: 150, delay: 0 }, end: { x: 200, y: 80, delay: 2 }, color: "#78b309" },
		{ start: { x: 200, y: 80, delay: 2 }, end: { x: 260, y: 120, delay: 4 }, color: "#78b309" },
		{ start: { x: 50, y: 50, delay: 1 }, end: { x: 150, y: 180, delay: 3 }, color: "#78b309" },
		{ start: { x: 280, y: 60, delay: 0.5 }, end: { x: 180, y: 180, delay: 2.5 }, color: "#78b309" },
	];

	const generateDots = (width: number, height: number) => {
		const dots = [];
		const gap = 12;
		const dotRadius = 1;

		for (let x = 0; x < width; x += gap) {
			for (let y = 0; y < height; y += gap) {
				const isInMapShape =
					((x < width * 0.25 && x > width * 0.05) && (y < height * 0.4 && y > height * 0.1)) ||
					((x < width * 0.25 && x > width * 0.15) && (y < height * 0.8 && y > height * 0.4)) ||
					((x < width * 0.45 && x > width * 0.3) && (y < height * 0.35 && y > height * 0.15)) ||
					((x < width * 0.5 && x > width * 0.35) && (y < height * 0.65 && y > height * 0.35)) ||
					((x < width * 0.7 && x > width * 0.45) && (y < height * 0.5 && y > height * 0.1)) ||
					((x < width * 0.8 && x > width * 0.65) && (y < height * 0.8 && y > height * 0.6));

				if (isInMapShape && Math.random() > 0.3) {
					dots.push({ x, y, radius: dotRadius, opacity: Math.random() * 0.5 + 0.1 });
				}
			}
		}
		return dots;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const resizeObserver = new ResizeObserver((entries) => {
			const { width, height } = entries[0].contentRect;
			setDimensions({ width, height });
			canvas.width = width;
			canvas.height = height;
		});

		resizeObserver.observe(canvas.parentElement as Element);
		return () => resizeObserver.disconnect();
	}, []);

	useEffect(() => {
		if (!dimensions.width || !dimensions.height) return;

		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const dots = generateDots(dimensions.width, dimensions.height);
		let animationFrameId: number;
		let startTime = Date.now();

		function drawDots() {
			ctx!.clearRect(0, 0, dimensions.width, dimensions.height);
			for (const dot of dots) {
				ctx!.beginPath();
				ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
				ctx!.fillStyle = `rgba(255, 255, 255, ${dot.opacity})`;
				ctx!.fill();
			}
		}

		function drawRoutes() {
			const currentTime = (Date.now() - startTime) / 1000;

			for (const route of routes) {
				const elapsed = currentTime - route.start.delay;
				if (elapsed <= 0) continue;

				const duration = 3;
				const progress = Math.min(elapsed / duration, 1);

				const x = route.start.x + (route.end.x - route.start.x) * progress;
				const y = route.start.y + (route.end.y - route.start.y) * progress;

				ctx!.beginPath();
				ctx!.moveTo(route.start.x, route.start.y);
				ctx!.lineTo(x, y);
				ctx!.strokeStyle = route.color;
				ctx!.lineWidth = 1.5;
				ctx!.stroke();

				ctx!.beginPath();
				ctx!.arc(route.start.x, route.start.y, 3, 0, Math.PI * 2);
				ctx!.fillStyle = route.color;
				ctx!.fill();

				ctx!.beginPath();
				ctx!.arc(x, y, 3, 0, Math.PI * 2);
				ctx!.fillStyle = "#a3d430";
				ctx!.fill();

				ctx!.beginPath();
				ctx!.arc(x, y, 6, 0, Math.PI * 2);
				ctx!.fillStyle = "rgba(120, 179, 9, 0.3)";
				ctx!.fill();

				if (progress === 1) {
					ctx!.beginPath();
					ctx!.arc(route.end.x, route.end.y, 3, 0, Math.PI * 2);
					ctx!.fillStyle = route.color;
					ctx!.fill();
				}
			}
		}

		function animate() {
			drawDots();
			drawRoutes();

			const currentTime = (Date.now() - startTime) / 1000;
			if (currentTime > 15) {
				startTime = Date.now();
			}

			animationFrameId = requestAnimationFrame(animate);
		}

		animate();
		return () => cancelAnimationFrame(animationFrameId);
	}, [dimensions]);

	return (
		<div className="relative w-full h-full overflow-hidden">
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
		</div>
	);
};

interface TravelConnectSignInProps {
	readonly onSubmit: (e: React.FormEvent) => void;
	readonly loading: boolean;
	readonly error: string | null;
	readonly email: string;
	readonly setEmail: (val: string) => void;
	readonly password: string;
	readonly setPassword: (val: string) => void;
}

export default function TravelConnectSignIn({
	onSubmit,
	loading,
	error,
	email,
	setEmail,
	password,
	setPassword,
}: TravelConnectSignInProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: "56rem" }}>
		<motion.div
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.5 }}
			className="w-full overflow-hidden rounded-2xl flex bg-[#0d1020] text-white shadow-2xl"
		>
			{/* Left side - Map */}
			<div className="hidden md:block w-1/2 relative overflow-hidden border-r border-white/10" style={{ minHeight: "600px" }}>
				<div className="absolute inset-0 bg-gradient-to-br from-[#0d1a35] to-[#111c10]">
					<DotMap />

					<div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-10">
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.6, duration: 0.5 }}
							className="mb-6"
						>
							<div className="w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-2xl">
								<Image src="/logo.png" alt="Abtec Logo" width={52} height={52} className="object-contain" priority />
							</div>
						</motion.div>
						<motion.h2
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.7, duration: 0.5 }}
							className="text-3xl font-bold mb-2 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#78b309] to-[#a3d430]"
						>
							Abtec CRM
						</motion.h2>
						<motion.p
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.8, duration: 0.5 }}
							className="text-sm text-center text-gray-400 max-w-xs"
						>
							Accede al panel corporativo para gestionar operaciones y clientes de Abtec.
						</motion.p>
					</div>
				</div>
			</div>

			{/* Right side - Sign In Form */}
			<div style={{ flex: 1, width: "50%", padding: "40px", display: "flex", flexDirection: "column", justifyContent: "center", minWidth: 0 }}>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "6px", color: "#fff" }}>Bienvenido</h1>
					<p style={{ color: "#9ca3af", marginBottom: "32px", fontSize: "0.95rem" }}>Ingresa tus credenciales corporativas</p>

					{error && (
						<div
							role="alert"
							style={{
								background: "rgba(239,68,68,0.1)",
								border: "1px solid rgba(239,68,68,0.2)",
								color: "#f87171",
								padding: "16px",
								borderRadius: "12px",
								marginBottom: "24px",
								fontSize: "0.875rem",
								display: "flex",
								gap: "12px",
								alignItems: "center",
							}}
						>
							<div style={{ background: "rgba(239,68,68,0.2)", padding: "6px", borderRadius: "50%", flexShrink: 0 }}>
								<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
									<circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
								</svg>
							</div>
							<p style={{ fontWeight: 600, margin: 0 }}>{error}</p>
						</div>
					)}

					<form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
						<div>
							<label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#d1d5db", marginBottom: "6px" }}>
								Correo Electrónico <span style={{ color: "#78b309" }}>*</span>
							</label>
							<input
								id="email"
								type="email"
								value={email}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
								placeholder="admin@abtec.com"
								required
								style={{
									width: "100%",
									height: "48px",
									borderRadius: "12px",
									padding: "0 16px",
									fontSize: "0.875rem",
									background: "rgba(255,255,255,0.06)",
									border: "1px solid rgba(255,255,255,0.15)",
									color: "#e5e7eb",
									outline: "none",
									boxSizing: "border-box",
								}}
							/>
						</div>

						<div>
							<label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: 500, color: "#d1d5db", marginBottom: "6px" }}>
								Contraseña <span style={{ color: "#78b309" }}>*</span>
							</label>
							<div style={{ position: "relative" }}>
								<input
									id="password"
									type={isPasswordVisible ? "text" : "password"}
									value={password}
									onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
									placeholder="••••••••••••"
									required
									style={{
										width: "100%",
										height: "48px",
										borderRadius: "12px",
										padding: "0 44px 0 16px",
										fontSize: "0.875rem",
										background: "rgba(255,255,255,0.06)",
										border: "1px solid rgba(255,255,255,0.15)",
										color: "#e5e7eb",
										outline: "none",
										boxSizing: "border-box",
									}}
								/>
								<button
									type="button"
									style={{ position: "absolute", right: 0, top: 0, bottom: 0, display: "flex", alignItems: "center", paddingRight: "12px", color: "#9ca3af", background: "none", border: "none", cursor: "pointer" }}
									onClick={() => setIsPasswordVisible(!isPasswordVisible)}
								>
									{isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
						</div>

						<motion.div
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.98 }}
							onHoverStart={() => setIsHovered(true)}
							onHoverEnd={() => setIsHovered(false)}
							style={{ paddingTop: "8px" }}
						>
							<button
								type="submit"
								disabled={loading}
								style={{
									width: "100%",
									position: "relative",
									overflow: "hidden",
									color: "#fff",
									height: "48px",
									borderRadius: "12px",
									border: "none",
									cursor: loading ? "not-allowed" : "pointer",
									fontWeight: 600,
									fontSize: "0.95rem",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									gap: "8px",
									background: "linear-gradient(to right, #78b309, #1a2a5a)",
									boxShadow: isHovered ? "0 10px 30px rgba(120,179,9,0.25)" : "none",
									transition: "box-shadow 0.3s",
								}}
							>
								{loading ? (
									<>
										<div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
										<span>Verificando...</span>
									</>
								) : (
									<>
										Entrar al Sistema
										<ArrowRight size={16} />
									</>
								)}
								{isHovered && (
									<motion.span
										initial={{ left: "-100%" }}
										animate={{ left: "100%" }}
										transition={{ duration: 1, ease: "easeInOut" }}
										style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 80, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)", filter: "blur(8px)" }}
									/>
								)}
							</button>
						</motion.div>

					</form>

					<div style={{ marginTop: "28px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
						<div style={{ height: "1px", width: "100%", background: "rgba(255,255,255,0.1)" }} />
						<p style={{ fontSize: "10px", color: "#4b5563", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.2em", margin: 0 }}>
							Abtec Energía Smart Systems &copy; {new Date().getFullYear()}
						</p>
					</div>

				</motion.div>
			</div>
		</motion.div>
		</div>
	);
}
