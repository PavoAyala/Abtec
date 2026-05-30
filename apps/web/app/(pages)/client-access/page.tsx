"use client";

import Link from "next/link";
import { type JSX, useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { collection, query, where, getDocs, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import { getClientDb } from "../../../lib/firebase";

// Basic interface to match the CRM Contact/Company type
interface ClientData {
	id: string;
	name: string;
	phone?: string;
	panelBrand?: string;
	warrantyEndDate?: Date;
	lastMaintenanceDate?: Date;
	contractUrl?: string;
	lifecycleStage?: string;
	sourceCollection?: "contacts" | "users";
}

export default function ClientAccess(): JSX.Element {
	const { user, loading, error, signOut, isAuthenticated } = useAuth();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [localError, setLocalError] = useState<string | null>(null);

	const [clientData, setClientData] = useState<ClientData | null>(null);
	const [isLoadingData, setIsLoadingData] = useState(false);

	const [ticketTitle, setTicketTitle] = useState("");
	const [ticketDesc, setTicketDesc] = useState("");
	const [isSubmittingTicket, setIsSubmittingTicket] = useState(false);
	const [ticketSuccess, setTicketSuccess] = useState(false);
	const [showTicketModal, setShowTicketModal] = useState(false);

	// Profile Edit State
	const [showProfileModal, setShowProfileModal] = useState(false);
	const [editName, setEditName] = useState("");
	const [editPhone, setEditPhone] = useState("");
	const [isSubmittingProfile, setIsSubmittingProfile] = useState(false);

	useEffect(() => {
		async function fetchClientData() {
			if (!user?.email) return;
			setIsLoadingData(true);
			try {
				const db = getClientDb();
				let data = null;
				let docId = null;
				let source: "contacts" | "users" = "contacts";

				// Primero buscamos en contactos
				const q = query(collection(db, "contacts"), where("email", "==", user.email));
				const querySnapshot = await getDocs(q);
				
				if (!querySnapshot.empty && querySnapshot.docs[0]) {
					data = querySnapshot.docs[0].data();
					docId = querySnapshot.docs[0].id;
				} else {
					// Si no está, buscamos en users (por si solo se registró pero no se ha movido)
					const q2 = query(collection(db, "users"), where("email", "==", user.email));
					const querySnapshot2 = await getDocs(q2);
					if (!querySnapshot2.empty && querySnapshot2.docs[0]) {
						data = querySnapshot2.docs[0].data();
						docId = querySnapshot2.docs[0].id;
						source = "users";
					}
				}

				if (data && docId) {
					setClientData({
						id: docId,
						name: data.name || data.displayName || `${data.firstName || ""} ${data.lastName || ""}`.trim() || user.email,
						phone: data.phone || "",
						panelBrand: data.panelBrand,
						warrantyEndDate: data.warrantyEndDate?.toDate ? data.warrantyEndDate.toDate() : undefined,
						lastMaintenanceDate: data.lastMaintenanceDate?.toDate ? data.lastMaintenanceDate.toDate() : undefined,
						contractUrl: data.contractUrl,
						lifecycleStage: data.lifecycleStage || data.role,
						sourceCollection: source,
					});
					setEditName(data.name || data.displayName || `${data.firstName || ""} ${data.lastName || ""}`.trim() || user.email);
					setEditPhone(data.phone || "");
				}
			} catch (err) {
				console.error("Error fetching client data", err);
			} finally {
				setIsLoadingData(false);
			}
		}

		if (isAuthenticated && user) {
			fetchClientData();
		}
	}, [isAuthenticated, user]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setLocalError(null);
		try {
			const { signInWithEmailAndPassword } = await import("firebase/auth");
			const { getClientAuth } = await import("../../../lib/firebase");
			await signInWithEmailAndPassword(getClientAuth(), email, password);
		} catch (err) {
			setLocalError(err instanceof Error ? err.message : "Sign in failed");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!clientData) return;
		setIsSubmittingProfile(true);
		try {
			const db = getClientDb();
			const updatePayload = {
				name: editName,
				phone: editPhone,
				updatedAt: Timestamp.now(),
			};
			
			// Actualizamos el documento original de donde sacamos la info
			if (clientData.sourceCollection) {
				await setDoc(doc(db, clientData.sourceCollection, clientData.id), updatePayload, { merge: true });
			}
			
			setClientData(prev => prev ? { ...prev, name: editName, phone: editPhone } : null);
			setShowProfileModal(false);
		} catch (error) {
			console.error("Error updating profile", error);
			alert("Error al actualizar el perfil.");
		} finally {
			setIsSubmittingProfile(false);
		}
	};

	const handleCreateTicket = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!ticketTitle || !ticketDesc) return;
		setIsSubmittingTicket(true);
		try {
			const db = getClientDb();
			await addDoc(collection(db, "tickets"), {
				title: ticketTitle,
				description: ticketDesc,
				status: "Open",
				priority: "Medium",
				category: "Support",
				contactId: clientData?.sourceCollection === "contacts" ? clientData.id : null,
				contactEmail: user?.email,
				createdAt: Timestamp.now(),
				updatedAt: Timestamp.now(),
			});
			setTicketSuccess(true);
			setTicketTitle("");
			setTicketDesc("");
			setTimeout(() => {
				setShowTicketModal(false);
				setTicketSuccess(false);
			}, 3000);
		} catch (err) {
			console.error("Error creating ticket", err);
			alert("Hubo un error al crear el ticket.");
		} finally {
			setIsSubmittingTicket(false);
		}
	};

	const calculateYearsRemaining = (endDate?: Date) => {
		if (!endDate) return "N/A";
		const diff = endDate.getTime() - new Date().getTime();
		const years = diff / (1000 * 60 * 60 * 24 * 365.25);
		return years > 0 ? years.toFixed(1) + " años" : "Vencida";
	};

	if (loading) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abtec-green-600" />
			</div>
		);
	}

	if (isAuthenticated && user) {
		const isCustomer = clientData?.panelBrand || clientData?.warrantyEndDate || clientData?.contractUrl;

		return (
			<div className="min-h-screen bg-gray-50">
				<div className="max-w-5xl mx-auto px-4 py-16">
					<div className="bg-white rounded-2xl shadow-lg p-8">
						<div className="flex flex-col md:flex-row justify-between items-center mb-8 pb-8 border-b border-gray-100">
							<div className="flex items-center space-x-4 mb-4 md:mb-0">
								<div className="w-16 h-16 bg-abtec-green-100 rounded-full flex items-center justify-center">
									<span className="text-abtec-green-600 text-2xl font-bold uppercase">
										{clientData?.name ? clientData.name.charAt(0) : user.email?.charAt(0)}
									</span>
								</div>
								<div>
									<h1 className="text-2xl font-bold text-abtec-navy-900 flex items-center gap-2">
										{clientData?.name || "Cargando perfil..."}
										<button 
											onClick={() => setShowProfileModal(true)}
											className="p-1 text-gray-400 hover:text-abtec-blue transition-colors"
											title="Editar Perfil"
										>
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
										</button>
									</h1>
									<p className="text-abtec-navy-600">
										{user.email} {clientData?.phone ? `| ${clientData.phone}` : ""}
									</p>
								</div>
							</div>
							<div className="flex gap-3">
								<Link
									href="/"
									className="px-4 py-2 border-2 border-abtec-navy-200 text-abtec-navy-700 font-semibold rounded-lg hover:bg-abtec-navy-50 transition-colors"
								>
									Volver al Inicio
								</Link>
								<button
									type="button"
									onClick={signOut}
									className="px-4 py-2 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors"
								>
									Cerrar Sesión
								</button>
							</div>
						</div>

						{isLoadingData ? (
							<div className="flex justify-center py-12">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-abtec-green-600" />
							</div>
						) : (
							<>
								{isCustomer ? (
									<div className="grid md:grid-cols-2 gap-8 mb-8">
										{/* Detalles del Sistema */}
										<div className="p-6 bg-gray-50 rounded-xl border border-gray-100 shadow-sm">
											<h3 className="font-bold text-lg text-abtec-navy-900 mb-6 flex items-center gap-2">
												<svg className="w-5 h-5 text-abtec-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
												Detalles de tu Instalación
											</h3>
											
											<div className="space-y-4">
												<div className="flex justify-between items-center border-b border-gray-200 pb-3">
													<span className="text-abtec-navy-600">Marca de Paneles</span>
													<span className="font-semibold text-abtec-navy-900">{clientData?.panelBrand || "No especificada"}</span>
												</div>
												<div className="flex justify-between items-center border-b border-gray-200 pb-3">
													<span className="text-abtec-navy-600">Garantía Restante</span>
													<span className="font-semibold text-abtec-navy-900">{calculateYearsRemaining(clientData?.warrantyEndDate)}</span>
												</div>
												<div className="flex justify-between items-center border-b border-gray-200 pb-3">
													<span className="text-abtec-navy-600">Último Mantenimiento</span>
													<span className="font-semibold text-abtec-navy-900">
														{clientData?.lastMaintenanceDate ? new Intl.DateTimeFormat('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }).format(clientData.lastMaintenanceDate) : "Sin registro"}
													</span>
												</div>
												<div className="flex justify-between items-center pt-2">
													<span className="text-abtec-navy-600">Contrato</span>
													{clientData?.contractUrl ? (
														<a href={clientData.contractUrl} target="_blank" rel="noopener noreferrer" className="text-abtec-blue font-semibold hover:underline flex items-center gap-1">
															<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
															Ver Contrato
														</a>
													) : (
														<span className="text-gray-400">No disponible</span>
													)}
												</div>
											</div>
										</div>

										{/* Soporte Técnico */}
										<div className="p-6 bg-gradient-to-br from-abtec-navy-900 to-abtec-navy-800 rounded-xl shadow-md text-white flex flex-col">
											<h3 className="font-bold text-lg mb-4 flex items-center gap-2">
												<svg className="w-5 h-5 text-abtec-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
												Soporte Técnico
											</h3>
											<p className="text-abtec-navy-200 mb-6 flex-grow">
												¿Tienes algún problema con tu sistema o necesitas agendar un mantenimiento? Nuestro equipo está listo para ayudarte.
											</p>
											<button
												onClick={() => setShowTicketModal(true)}
												className="w-full py-3 bg-abtec-green-600 hover:bg-abtec-green-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
											>
												<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
												Crear Ticket de Soporte
											</button>
										</div>
									</div>
								) : (
									<div className="bg-gradient-to-br from-abtec-navy-900 to-abtec-navy-800 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl mb-8">
										<div className="w-20 h-20 bg-abtec-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-abtec-green-600/30">
											<svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
										</div>
										<h2 className="text-3xl font-bold mb-4">¡Aún no cuentas con un sistema de paneles solares!</h2>
										<p className="text-abtec-navy-200 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
											Parece que aún no tienes información de instalación registrada en nuestro sistema. ¿Te gustaría recibir una cotización personalizada y empezar a ahorrar en tu recibo de luz con la mejor energía renovable?
										</p>
										<a 
											href="https://wa.me/5211234567890?text=Hola,%20me%20gustaría%20solicitar%20una%20cotización%20para%20paneles%20solares."
											target="_blank" 
											rel="noopener noreferrer"
											className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-full transition-all text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-200"
										>
											<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
											Contactar por WhatsApp
										</a>
									</div>
								)}
							</>
						)}
					</div>
				</div>

				{/* Modal de Editar Perfil */}
				{showProfileModal && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
							<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
								<h3 className="font-bold text-lg text-abtec-navy-900">Editar Perfil</h3>
								<button onClick={() => setShowProfileModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
								</button>
							</div>
							
							<form onSubmit={handleUpdateProfile} className="p-6">
								<div className="mb-4">
									<label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
									<input 
										type="text" 
										required
										value={editName}
										onChange={e => setEditName(e.target.value)}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-abtec-green-500 focus:border-abtec-green-500 outline-none transition-all"
									/>
								</div>
								<div className="mb-6">
									<label className="block text-sm font-medium text-gray-700 mb-1">Número de Teléfono</label>
									<input 
										type="tel" 
										value={editPhone}
										onChange={e => setEditPhone(e.target.value)}
										placeholder="Ej. 55 1234 5678"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-abtec-green-500 focus:border-abtec-green-500 outline-none transition-all"
									/>
								</div>
								<div className="flex justify-end gap-3">
									<button 
										type="button" 
										onClick={() => setShowProfileModal(false)}
										className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
									>
										Cancelar
									</button>
									<button 
										type="submit" 
										disabled={isSubmittingProfile}
										className="px-6 py-2 bg-abtec-blue hover:bg-abtec-navy-800 text-white font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
									>
										{isSubmittingProfile ? (
											<>
												<div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
												Guardando...
											</>
										) : "Guardar Cambios"}
									</button>
								</div>
							</form>
						</div>
					</div>
				)}

				{/* Modal de Ticket */}
				{showTicketModal && (
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
						<div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95">
							<div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
								<h3 className="font-bold text-lg text-abtec-navy-900">Nuevo Ticket de Soporte</h3>
								<button onClick={() => setShowTicketModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
								</button>
							</div>
							
							{ticketSuccess ? (
								<div className="p-8 text-center">
									<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
										<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
									</div>
									<h4 className="text-xl font-bold text-gray-900 mb-2">¡Ticket Creado!</h4>
									<p className="text-gray-600">Nuestro equipo ha recibido tu solicitud y se pondrá en contacto contigo pronto.</p>
								</div>
							) : (
								<form onSubmit={handleCreateTicket} className="p-6">
									<div className="mb-4">
										<label className="block text-sm font-medium text-gray-700 mb-1">Asunto</label>
										<input 
											type="text" 
											required
											value={ticketTitle}
											onChange={e => setTicketTitle(e.target.value)}
											placeholder="Ej. Problema con el inversor"
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-abtec-green-500 focus:border-abtec-green-500 outline-none transition-all"
										/>
									</div>
									<div className="mb-6">
										<label className="block text-sm font-medium text-gray-700 mb-1">Descripción del problema</label>
										<textarea 
											required
											rows={4}
											value={ticketDesc}
											onChange={e => setTicketDesc(e.target.value)}
											placeholder="Por favor describe detalladamente lo que ocurre..."
											className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-abtec-green-500 focus:border-abtec-green-500 outline-none transition-all resize-none"
										></textarea>
									</div>
									<div className="flex justify-end gap-3">
										<button 
											type="button" 
											onClick={() => setShowTicketModal(false)}
											className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
										>
											Cancelar
										</button>
										<button 
											type="submit" 
											disabled={isSubmittingTicket}
											className="px-6 py-2 bg-abtec-blue hover:bg-abtec-navy-800 text-white font-bold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2"
										>
											{isSubmittingTicket ? (
												<>
													<div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
													Enviando...
												</>
											) : "Enviar Ticket"}
										</button>
									</div>
								</form>
							)}
						</div>
					</div>
				)}
			</div>
		);
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<Link href="/" className="inline-flex items-center space-x-2 mb-6">
						<div className="w-12 h-12 bg-abtec-green-600 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-2xl">A</span>
						</div>
						<span className="text-2xl font-bold text-abtec-navy-900">
							Abtec
						</span>
					</Link>
					<h1 className="text-2xl font-bold text-abtec-navy-900">
						Acceso Cliente
					</h1>
					<p className="text-abtec-navy-600 mt-2">
						Inicia sesión para acceder a tu portal de cliente
					</p>
				</div>

				<div className="bg-white rounded-2xl shadow-lg p-8">
					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-abtec-navy-700 mb-2"
							>
								Correo Electrónico
							</label>
							<input
								type="email"
								id="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
								placeholder="tu@ejemplo.com"
							/>
						</div>

						<div>
							<label
								htmlFor="password"
								className="block text-sm font-medium text-abtec-navy-700 mb-2"
							>
								Contraseña
							</label>
							<input
								type="password"
								id="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-abtec-green-500 focus:border-transparent transition-colors text-abtec-navy-900"
								placeholder="Ingresa tu contraseña"
							/>
						</div>

						{(error || localError) && (
							<div className="p-4 bg-red-100 text-red-700 rounded-lg text-sm">
								{error || localError}
							</div>
						)}

						<button
							type="submit"
							disabled={isSubmitting}
							className="w-full bg-abtec-green-600 hover:bg-abtec-green-700 disabled:bg-abtec-green-400 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
						>
							{isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
						</button>
					</form>

					<div className="mt-6 text-center">
						<Link
							href="/"
							className="text-abtec-green-600 hover:text-abtec-green-700 font-medium text-sm"
						>
							&larr; Volver al Inicio
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
