"use client";

import { useState, useMemo } from "react";
import useSWR, { mutate } from "swr";
import { DataTable } from "@/components/StatsAndTables";
import { fetcher, SWRKeys } from "@/lib/swr";
import { type BlogPost } from "@/types";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/lib/blog";
import { AnimatePresence, motion } from "framer-motion";
import { X, FileText, Image as ImageIcon, Check, BookOpen, User, Tag, Globe, Sparkles } from "lucide-react";

const IMAGE_PRESETS = [
	{ label: "Instalación Comercial", value: "/images/abtec1.jpeg" },
	{ label: "Proyecto Residencial", value: "/images/proyecto residencial.png" },
	{ label: "Panel Solar Detalle", value: "/images/solar_panel.png" }
];

export default function BlogPage() {
	const { data: posts, isLoading } = useSWR<BlogPost[]>(
		SWRKeys.blogPosts,
		fetcher.blogPosts,
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
			dedupingInterval: 10000,
		}
	);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	// Form State
	const [title, setTitle] = useState("");
	const [slug, setSlug] = useState("");
	const [excerpt, setExcerpt] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("Paneles Solares Monterrey");
	const [author, setAuthor] = useState("Ingeniería ABTEC");
	const [image, setImage] = useState("/images/solar_panel.png");

	const handleOpenCreate = () => {
		setEditingPost(null);
		setTitle("");
		setSlug("");
		setExcerpt("");
		setContent("");
		setCategory("Paneles Solares Monterrey");
		setAuthor("Ingeniería ABTEC");
		setImage("/images/solar_panel.png");
		setIsModalOpen(true);
	};

	const handleOpenEdit = (post: BlogPost) => {
		setEditingPost(post);
		setTitle(post.title);
		setSlug(post.slug);
		setExcerpt(post.excerpt);
		setContent(post.content);
		setCategory(post.category);
		setAuthor(post.author);
		setImage(post.image);
		setIsModalOpen(true);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setTitle(val);
		if (!editingPost) {
			// Auto-generate slug from title
			const generated = val
				.toLowerCase()
				.normalize("NFD")
				.replace(/[\u0300-\u036f]/g, "") // remove accents
				.replace(/[^\w\s-]/g, "") // remove non-alphanumeric
				.trim()
				.replace(/[-\s]+/g, "-"); // replace spaces with hyphens
			setSlug(generated);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !slug || !excerpt) {
			alert("Por favor completa los campos requeridos (Título, Slug, Resumen)");
			return;
		}

		setIsSubmitting(true);
		try {
			const postData: Partial<BlogPost> = {
				title,
				slug,
				excerpt,
				content,
				category,
				author,
				image,
			};

			if (editingPost) {
				await updateBlogPost(editingPost.id, postData);
			} else {
				await createBlogPost(postData);
			}

			// Refetch SWR cache
			mutate(SWRKeys.blogPosts);
			setIsModalOpen(false);
		} catch (error) {
			console.error("Error saving blog post:", error);
			alert("Error al guardar la nota. Revisa la consola.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleDelete = async (id: string) => {
		if (confirm("¿Estás seguro de que deseas eliminar esta nota de blog?")) {
			try {
				await deleteBlogPost(id);
				mutate(SWRKeys.blogPosts);
			} catch (error) {
				console.error("Error deleting blog post:", error);
				alert("Error al eliminar la nota.");
			}
		}
	};

	const columns = [
		{
			key: "title",
			label: "Título",
			sortable: true,
			render: (item: BlogPost) => (
				<div className="flex flex-col gap-1 max-w-[400px]">
					<span className="font-semibold text-slate-800 line-clamp-1">{item.title}</span>
					<span className="text-xs text-slate-400 font-mono line-clamp-1">{item.slug}</span>
				</div>
			)
		},
		{
			key: "author",
			label: "Autor/Categoría",
			render: (item: BlogPost) => (
				<div className="flex flex-col gap-1">
					<span className="text-sm font-medium text-slate-700">{item.author}</span>
					<span className="text-xs text-abtec-green">{item.category}</span>
				</div>
			)
		},
		{
			key: "createdAt",
			label: "Fecha Creación",
			render: (item: BlogPost) => {
				const date = item.createdAt;
				return date instanceof Date
					? date.toLocaleDateString("es-MX", { year: "numeric", month: "short", day: "numeric" })
					: "-";
			}
		},
		{
			key: "actions",
			label: "Acciones",
			render: (item: BlogPost) => (
				<div className="flex gap-2">
					<button
						type="button"
						className="btn btn-secondary py-1 px-3 text-xs"
						onClick={() => handleOpenEdit(item)}
					>
						Editar
					</button>
					<button
						type="button"
						className="btn btn-ghost py-1 px-3 text-xs text-rose-600 hover:text-rose-700"
						style={{ color: "#ef4444" }}
						onClick={() => handleDelete(item.id)}
					>
						Eliminar
					</button>
				</div>
			)
		}
	];

	return (
		<div className="page-container">
			<div className="page-header">
				<div className="page-header-content">
					<h2>Gestión de Blog</h2>
					<p>Administra las notas y artículos que se muestran en el sitio web público.</p>
				</div>
				<div className="page-actions">
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleOpenCreate}
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							aria-hidden="true"
						>
							<path d="M12 5v14M5 12h14" />
						</svg>
						Nueva Nota
					</button>
				</div>
			</div>

			{isLoading ? (
				<div className="card p-12 text-center text-slate-500">Cargando notas...</div>
			) : (
				<DataTable
					data={posts || []}
					columns={columns}
					searchPlaceholder="Buscar notas por título, autor..."
					emptyMessage="No hay notas en el blog. Crea una nueva para empezar."
					onSearch={() => {}} // Habilita barra de búsqueda local en DataTable
				/>
			)}

			{/* Modal de Crear / Editar */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
						animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
						exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 sm:p-6"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.95, y: 20 }}
							animate={{ opacity: 1, scale: 1, y: 0 }}
							exit={{ opacity: 0, scale: 0.95, y: 20 }}
							transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
							className="bg-white rounded-[24px] max-w-5xl w-full max-h-[92vh] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 flex flex-col overflow-hidden relative"
						>
							{/* Decoration */}
							<div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-abtec-green via-emerald-400 to-teal-500"></div>

							{/* Header */}
							<div className="flex justify-between items-start border-b border-slate-100 bg-white/80 backdrop-blur-md z-10 shrink-0" style={{ padding: '24px 40px' }}>
								<div className="flex items-start gap-4">
									<div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-abtec-green/20 to-abtec-green/5 text-abtec-green shadow-inner border border-abtec-green/10">
										<Sparkles size={24} className="text-abtec-green" />
									</div>
									<div className="mt-1">
										<h3 className="text-2xl font-bold text-slate-800 tracking-tight">
											{editingPost ? "Editar Publicación" : "Crear Nueva Publicación"}
										</h3>
										<p className="text-sm text-slate-500 mt-1 font-medium">
											Diseña y estructura tu nota para el blog
										</p>
									</div>
								</div>
								<button
									type="button"
									className="p-2.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all cursor-pointer bg-slate-50 border border-slate-200/60 shadow-sm"
									onClick={() => setIsModalOpen(false)}
								>
									<X size={18} />
								</button>
							</div>

							<form onSubmit={handleSubmit} className="flex flex-col flex-grow overflow-hidden bg-[#fafafa]">
								{/* Scrollable Body */}
								<div className="flex-grow overflow-y-auto" style={{ padding: '48px' }}>
									<div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
										
										{/* Left Column (Meta) */}
										<div className="lg:col-span-5 flex flex-col gap-6">
											{/* Título */}
											<div className="flex flex-col gap-2 relative group">
												<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
													Título <span className="text-rose-500">*</span>
												</label>
												<input
													type="text"
													className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all font-medium"
													placeholder="Ej: Ahorro con Energía Solar en Casa"
													value={title}
													onChange={handleTitleChange}
													required
												/>
											</div>

											{/* Slug */}
											<div className="flex flex-col gap-2 relative">
												<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
													Slug <span className="text-rose-500">*</span>
												</label>
												<div className="flex rounded-xl border border-slate-200/70 overflow-hidden focus-within:border-abtec-green focus-within:ring-4 focus-within:ring-abtec-green/10 shadow-sm transition-all bg-white">
													<span className="bg-slate-50/50 border-r border-slate-200/70 px-4 py-3.5 text-sm text-slate-400 flex items-center select-none font-mono">
														abtec.mx/blog/
													</span>
													<input
														type="text"
														className="w-full bg-transparent px-4 py-3.5 text-sm font-mono text-slate-700 focus:outline-none"
														placeholder="ahorro-energia"
														value={slug}
														onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
														required
													/>
												</div>
											</div>

											<div className="grid grid-cols-2 gap-4">
												{/* Autor */}
												<div className="flex flex-col gap-2">
													<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
														Autor
													</label>
													<div className="relative">
														<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
															<User size={16} />
														</div>
														<input
															type="text"
															className="w-full rounded-xl border border-slate-200/70 bg-white pr-4 py-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all"
															style={{ paddingLeft: '40px' }}
															placeholder="Autor"
															value={author}
															onChange={(e) => setAuthor(e.target.value)}
														/>
													</div>
												</div>
												{/* Categoría */}
												<div className="flex flex-col gap-2">
													<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest ml-1">
														Categoría
													</label>
													<div className="relative">
														<div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
															<Tag size={16} />
														</div>
														<input
															type="text"
															className="w-full rounded-xl border border-slate-200/70 bg-white pr-4 py-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all"
															style={{ paddingLeft: '40px' }}
															placeholder="Categoría"
															value={category}
															onChange={(e) => setCategory(e.target.value)}
														/>
													</div>
												</div>
											</div>

											{/* Imagen Hero */}
											<div className="flex flex-col gap-3 mt-2">
												<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
													Imagen Principal
												</label>
												
												<div className="relative w-full aspect-video rounded-2xl border border-slate-200/80 bg-slate-100 overflow-hidden group shadow-sm flex flex-col items-center justify-center">
													{image ? (
														<>
															<img
																src={image}
																alt="Vista previa"
																className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
																onError={(e) => {
																	(e.target as HTMLImageElement).src = "/images/solar_panel.png";
																}}
															/>
															<div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
																<span className="text-white text-xs font-medium bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 shadow-xl">Vista Previa</span>
															</div>
														</>
													) : (
														<div className="flex flex-col items-center text-slate-400">
															<ImageIcon size={32} className="mb-2 opacity-50" />
															<span className="text-xs font-medium">Sin imagen</span>
														</div>
													)}
												</div>

												<div className="relative">
													<input
														type="text"
														className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all"
														placeholder="URL de la imagen (/images/...)"
														value={image}
														onChange={(e) => setImage(e.target.value)}
													/>
												</div>

												{/* Pre-cargados (Chips) */}
												<div className="flex flex-wrap gap-2 mt-1">
													{IMAGE_PRESETS.map((preset) => {
														const isActive = image === preset.value;
														return (
															<button
																key={preset.value}
																type="button"
																className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm ${
																	isActive
																		? "bg-abtec-green/10 text-abtec-green border-abtec-green/30 font-semibold"
																		: "bg-white text-slate-500 border-slate-200/70 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700"
																}`}
																onClick={() => setImage(preset.value)}
															>
																{isActive && <Check size={12} strokeWidth={3} />}
																{preset.label}
															</button>
														);
													})}
												</div>
											</div>
										</div>

										{/* Right Column (Content) */}
										<div className="lg:col-span-7 flex flex-col gap-6">
											{/* Excerpt */}
											<div className="flex flex-col gap-2 relative">
												<div className="flex justify-between items-end mb-1 ml-1">
													<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
														Resumen (Excerpt) <span className="text-rose-500">*</span>
													</label>
													<span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${excerpt.length > 180 ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>
														{excerpt.length}/200
													</span>
												</div>
												<textarea
													className="w-full rounded-xl border border-slate-200/70 bg-white px-4 py-3.5 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all resize-none h-[110px] leading-relaxed"
													placeholder="Escribe un resumen atractivo de 1-2 líneas. Esto aparecerá en las tarjetas de previsualización..."
													value={excerpt}
													onChange={(e) => setExcerpt(e.target.value)}
													maxLength={200}
													required
												/>
											</div>

											{/* Contenido Completo */}
											<div className="flex flex-col gap-2 flex-grow relative">
												<label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-1 ml-1">
													Contenido Completo
												</label>
												<textarea
													className="w-full rounded-xl border border-slate-200/70 bg-white px-5 py-4 text-slate-800 shadow-sm placeholder:text-slate-300 focus:outline-none focus:border-abtec-green focus:ring-4 focus:ring-abtec-green/10 transition-all flex-grow min-h-[300px] font-serif text-base leading-loose resize-none"
													placeholder="Empieza a escribir la publicación de tu blog aquí..."
													value={content}
													onChange={(e) => setContent(e.target.value)}
												/>
											</div>
										</div>

									</div>
								</div>

								{/* Botones - Footer */}
								<div className="flex justify-between items-center bg-white border-t border-slate-100 shrink-0" style={{ padding: '20px 40px' }}>
									<p className="text-xs text-slate-400 font-medium">
										{editingPost ? "Editando publicación existente" : "Creando nueva publicación"}
									</p>
									<div className="flex gap-3">
										<button
											type="button"
											className="px-6 py-2.5 rounded-xl font-semibold text-slate-600 bg-white border border-slate-200/80 shadow-sm hover:bg-slate-50 hover:text-slate-800 transition-all duration-200 cursor-pointer"
											onClick={() => setIsModalOpen(false)}
											disabled={isSubmitting}
										>
											Cancelar
										</button>
										<button
											type="submit"
											className="px-8 py-2.5 rounded-xl font-bold text-white bg-abtec-green shadow-lg shadow-abtec-green/30 hover:shadow-abtec-green/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex items-center gap-2 border border-transparent disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												<>
													<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
													<span>Guardando...</span>
												</>
											) : (
												<>
													<span>Guardar Publicación</span>
													<Check size={18} strokeWidth={2.5} />
												</>
											)}
										</button>
									</div>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
