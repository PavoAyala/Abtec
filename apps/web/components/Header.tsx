"use client";

import { ChevronDown, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { JSX } from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Header(): JSX.Element {
	const { isAuthenticated, openAuthModal } = useAuth();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isNosotrosDropdownOpen, setIsNosotrosDropdownOpen] = useState(false);
	const [isMobileNosotrosOpen, setIsMobileNosotrosOpen] = useState(false);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (!target.closest(".nosotros-dropdown-container")) {
				setIsNosotrosDropdownOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm transition-all duration-300">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-[90px] flex items-center justify-between">
				<Link href="/" className="flex items-center">
					<div className="relative flex items-center justify-center">
						<Image
							src="/images/logotipoABTEC_horizontal.png"
							alt="ABTEC Logo"
							width={220}
							height={56}
							className="object-contain"
						/>
					</div>
				</Link>

				<nav className="hidden lg:flex items-center gap-6">
					<Link
						href="/"
						className="text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
					>
						Paneles Solares Monterrey
					</Link>
					<div className="relative nosotros-dropdown-container flex items-center">
						<button
							type="button"
							onClick={() => setIsNosotrosDropdownOpen(!isNosotrosDropdownOpen)}
							className="flex items-center gap-1 text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium cursor-pointer focus:outline-none"
						>
							Acerca de Nosotros <ChevronDown size={14} className={`transition-transform duration-200 ${isNosotrosDropdownOpen ? "rotate-180" : ""}`} />
						</button>
						{isNosotrosDropdownOpen && (
							<div className="absolute top-full left-0 flex flex-col bg-white shadow-lg border border-gray-100 min-w-[280px] py-2 z-50 rounded-md mt-2">
								<Link
									href="/nosotros/paneles-solares"
									onClick={() => setIsNosotrosDropdownOpen(false)}
									className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 hover:text-abtec-green block transition-colors"
								>
									Proyectos de Paneles Solares
								</Link>
								<Link
									href="/nosotros/iluminacion"
									onClick={() => setIsNosotrosDropdownOpen(false)}
									className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 hover:text-abtec-green block transition-colors"
								>
									Proyectos de Iluminación
								</Link>
								<Link
									href="/nosotros/calentadores-solares"
									onClick={() => setIsNosotrosDropdownOpen(false)}
									className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 hover:text-abtec-green block transition-colors"
								>
									Proyectos de Calentadores Solares
								</Link>
							</div>
						)}
					</div>

					<Link
						href="/servicios"
						className="text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
					>
						Servicios
					</Link>
					<div className="relative group">
						<button
							type="button"
							className="flex items-center gap-1 text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
						>
							Equipos <ChevronDown size={14} />
						</button>
						<div className="absolute top-full left-0 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-100 min-w-[200px] py-2 z-50">
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Paneles Solares
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Inversores
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Microinversores
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Controladores
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Baterias
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Alumbrado Público
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Alumbrado Comercial
							</Link>
							<Link
								href="#equipos"
								className="px-4 py-2 hover:bg-gray-50 text-sm text-gray-600 pl-6"
							>
								Alumbrado Industrial
							</Link>
						</div>
					</div>
					<Link
						href="/financiamiento"
						className="text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
					>
						Financiamiento
					</Link>
					<Link
						href="#blog"
						className="text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
					>
						Blog
					</Link>
					<Link
						href="#contacto"
						className="text-gray-700 hover:text-abtec-green transition-colors text-sm font-medium"
					>
						Contacto
					</Link>
				</nav>

				<div className="hidden lg:flex items-center gap-6">
					<a
						href="tel:8132476565"
						className="flex items-center gap-2 text-abtec-orange font-bold hover:opacity-80 transition-opacity"
					>
						<Phone size={18} />
						<span>81 3247 6565</span>
					</a>
					{isAuthenticated ? (
						<Link
							href="/client-access"
							className="bg-abtec-blue text-white px-6 py-2 rounded text-sm font-medium transition-all hover:bg-opacity-90"
						>
							Mi Portal
						</Link>
					) : (
						<button
							type="button"
							onClick={openAuthModal}
							className="bg-abtec-blue text-white px-6 py-2 rounded text-sm font-medium transition-all hover:bg-opacity-90"
						>
							Acceso Clientes
						</button>
					)}
				</div>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="lg:hidden p-2 text-abtec-blue hover:text-abtec-green transition-colors"
					onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
				>
					{isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isMobileMenuOpen && (
				<div className="lg:hidden absolute top-[90px] left-0 w-full bg-white shadow-lg py-4 flex flex-col px-6 gap-4 z-50">
					<Link href="/" className="text-gray-700 font-medium pb-2 border-b">
						Paneles Solares Monterrey
					</Link>
					<div className="flex flex-col border-b pb-2">
						<button
							type="button"
							onClick={() => setIsMobileNosotrosOpen(!isMobileNosotrosOpen)}
							className="flex items-center justify-between text-gray-700 font-medium w-full text-left focus:outline-none"
						>
							<span>Acerca de Nosotros</span>
							<ChevronDown size={18} className={`transition-transform duration-200 ${isMobileNosotrosOpen ? 'rotate-180' : ''}`} />
						</button>
						{isMobileNosotrosOpen && (
							<div className="flex flex-col pl-4 mt-2 gap-2">
								<Link
									href="/nosotros/paneles-solares"
									onClick={() => {
										setIsMobileMenuOpen(false);
										setIsMobileNosotrosOpen(false);
									}}
									className="text-gray-600 text-sm py-1 hover:text-abtec-green transition-colors"
								>
									Proyectos de Paneles Solares
								</Link>
								<Link
									href="/nosotros/iluminacion"
									onClick={() => {
										setIsMobileMenuOpen(false);
										setIsMobileNosotrosOpen(false);
									}}
									className="text-gray-600 text-sm py-1 hover:text-abtec-green transition-colors"
								>
									Proyectos de Iluminación
								</Link>
								<Link
									href="/nosotros/calentadores-solares"
									onClick={() => {
										setIsMobileMenuOpen(false);
										setIsMobileNosotrosOpen(false);
									}}
									className="text-gray-600 text-sm py-1 hover:text-abtec-green transition-colors"
								>
									Proyectos de Calentadores Solares
								</Link>
							</div>
						)}
					</div>

					<Link
						href="/servicios"
						className="text-gray-700 font-medium pb-2 border-b"
					>
						Servicios
					</Link>
					<Link
						href="#equipos"
						className="text-gray-700 font-medium pb-2 border-b"
					>
						Equipos
					</Link>
					<Link
						href="/financiamiento"
						className="text-gray-700 font-medium pb-2 border-b"
					>
						Financiamiento
					</Link>
					<Link
						href="#blog"
						className="text-gray-700 font-medium pb-2 border-b"
					>
						Blog
					</Link>
					<Link
						href="#contacto"
						className="text-gray-700 font-medium pb-2 border-b"
					>
						Contacto
					</Link>

					<div className="flex flex-col gap-4 mt-2">
						<a
							href="tel:8132476565"
							className="flex items-center justify-center gap-2 text-white font-bold py-3 bg-abtec-orange rounded"
						>
							<Phone size={18} />
							<span>81 3247 6565</span>
						</a>
						{isAuthenticated ? (
							<Link
								href="/client-access"
								className="bg-abtec-blue text-white px-5 py-3 rounded text-center font-bold"
							>
								Mi Portal
							</Link>
						) : (
							<button
								type="button"
								onClick={() => {
									setIsMobileMenuOpen(false);
									openAuthModal();
								}}
								className="bg-abtec-blue text-white px-5 py-3 rounded text-center font-bold"
							>
								Acceso Clientes
							</button>
						)}
					</div>
				</div>
			)}
		</header>
	);
}
