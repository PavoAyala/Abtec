"use client";

import type { JSX } from "react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import { getClientDb } from "../../../lib/firebase";
import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { 
	Calendar, User, ArrowLeft, Tag, BookOpen, Clock, 
	Search, ChevronRight, Share2, Facebook, MessageCircle, Link2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	category: string;
	author: string;
	image: string;
	date: string;
}

const STATIC_POSTS: BlogPost[] = [
	{
		id: "static-1",
		image: "/images/abtec1.jpeg",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "23 de agosto, 2023",
		title: "Paneles Solares Monterrey: Cómo aprovechar al máximo la energía del sol",
		excerpt: "Los paneles solares Monterrey se han convertido en una forma cada vez más popular y efectiva de aprovechar la energía solar...",
		content: `
			<p class="mb-4">Los paneles solares Monterrey se han convertido en una forma cada vez más popular y efectiva de aprovechar la energía solar en el norte de México. Con altos niveles de radiación solar durante todo el año, la región metropolitana de Monterrey ofrece condiciones óptimas para la transición energética.</p>
			<h3 class="text-2xl font-bold text-[#262660] my-6">¿Por qué instalar paneles solares en Monterrey?</h3>
			<p class="mb-4">Monterrey es una de las ciudades con mayor consumo de electricidad en el país debido a las altas temperaturas en verano que demandan el uso de aire acondicionado. Esto resulta en tarifas eléctricas elevadas (como la tarifa DAC de CFE). Instalar un sistema solar no solo reduce tu huella de carbono, sino que disminuye tus recibos de luz hasta en un 99%.</p>
			<h3 class="text-2xl font-bold text-[#262660] my-6">Factores clave para el máximo aprovechamiento</h3>
			<ul class="list-disc pl-6 mb-6 flex flex-col gap-2">
				<li><strong>Inclinación y orientación:</strong> Los paneles deben orientarse hacia el sur con una inclinación promedio de 20 a 25 grados para capturar la mayor radiación posible.</li>
				<li><strong>Limpieza constante:</strong> El polvo e impurezas de la zona metropolitana pueden reducir la eficiencia hasta en un 15%. Se recomienda una limpieza mensual.</li>
				<li><strong>Monitoreo de producción:</strong> Utilizar aplicaciones de monitoreo permite detectar de inmediato si algún módulo presenta sombreado o fallas.</li>
			</ul>
			<p class="mb-4">En ABTEC, te acompañamos desde el diseño del proyecto y la instalación profesional hasta el trámite de interconexión con CFE. ¡Empieza a generar tu propia energía hoy mismo!</p>
		`,
		slug: "paneles-solares-como-aprovechar-al-maximo-la-energia-del-sol",
	},
	{
		id: "static-2",
		image: "/images/proyecto residencial.png",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "22 de mayo, 2023",
		title: "Beneficios ambientales y económicos de la energía solar",
		excerpt: "La energía solar se ha consolidado como una fuente de energía renovable que ofrece una amplia gama de beneficios tanto...",
		content: `
			<p class="mb-4">La energía solar se ha consolidado como una fuente de energía renovable que ofrece una amplia gama de beneficios tanto ambientales como económicos. En este artículo exploramos cómo impacta de manera directa a tu bolsillo y al planeta.</p>
			<h3 class="text-2xl font-bold text-[#262660] my-6">Beneficios Ambientales</h3>
			<p class="mb-4">Al producir electricidad limpia de forma directa del sol, los sistemas solares reducen significativamente las emisiones de gases de efecto invernadero. A diferencia de las plantas termoeléctricas tradicionales, la energía solar:</p>
			<ul class="list-disc pl-6 mb-6 flex flex-col gap-2">
				<li>No emite dióxido de carbono (CO2) ni otros gases nocivos durante su funcionamiento.</li>
				<li>Ayuda a combatir el cambio climático de forma directa.</li>
				<li>Reduce la dependencia de combustibles fósiles importados y locales.</li>
				<li>Preserva el agua limpia al no requerir refrigeración como las plantas tradicionales.</li>
			</ul>
			<h3 class="text-2xl font-bold text-[#262660] my-6">Beneficios Económicos</h3>
			<p class="mb-4">La inversión en paneles solares es una de las decisiones financieras más seguras y rentables a largo plazo. Entre los principales impactos económicos destacan:</p>
			<ul class="list-disc pl-6 mb-6 flex flex-col gap-2">
				<li><strong>Ahorro inmediato:</strong> Verás una reducción drástica en tu factura eléctrica desde el primer mes de interconexión.</li>
				<li><strong>Retorno de inversión (ROI):</strong> El periodo promedio de recuperación es de 3 a 5 años en tarifas comerciales o residenciales de alto consumo.</li>
				<li><strong>Plusvalía inmobiliaria:</strong> Las propiedades con sistemas solares instalados incrementan su valor de mercado de manera significativa.</li>
				<li><strong>Estabilidad energética:</strong> Te proteges contra las alzas futuras de tarifas eléctricas.</li>
			</ul>
		`,
		slug: "beneficios-ambientales-y-economicos-de-la-energia-solar",
	},
	{
		id: "static-3",
		image: "/images/solar_panel.png",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "22 de mayo, 2023",
		title: "El futuro de la energía solar: avances tecnológicos y perspectivas",
		excerpt: "La energía solar ha experimentado un crecimiento exponencial en las últimas décadas, convirtiéndose en una de las...",
		content: `
			<p class="mb-4">La energía solar ha experimentado un crecimiento exponencial en las últimas décadas, convirtiéndose en una de las tecnologías de más rápido desarrollo en el sector energético mundial. Los avances tecnológicos de hoy están pavimentando el camino para la energía del mañana.</p>
			<h3 class="text-2xl font-bold text-[#262660] my-6">Innovaciones Tecnológicas del Futuro</h3>
			<p class="mb-4">Las celdas fotovoltaicas de silicio tradicionales siguen siendo eficientes, pero nuevas investigaciones abren posibilidades revolucionarias:</p>
			<ul class="list-disc pl-6 mb-6 flex flex-col gap-2">
				<li><strong>Celdas de Perovskita:</strong> Tienen el potencial de superar los límites de eficiencia del silicio, logrando tasas de conversión superiores al 30% en combinación tándem.</li>
				<li><strong>Paneles Solares Transparentes:</strong> Integrables en ventanas de edificios de oficinas y hogares, convirtiendo fachadas enteras en generadores de energía sin alterar la estética.</li>
				<li><strong>Sistemas de Almacenamiento Avanzados:</strong> Baterías de estado sólido y flujos de hierro que prometen mayor seguridad, durabilidad y capacidad a menor costo, resolviendo el problema de intermitencia.</li>
			</ul>
			<h3 class="text-2xl font-bold text-[#262660] my-6">Perspectiva Global</h3>
			<p class="mb-4">Se estima que para el año 2030, la energía solar será la fuente de electricidad más barata y abundante en gran parte del mundo. La adopción acelerada a nivel residencial, comercial e industrial está impulsando políticas de descarbonización global, logrando ciudades más sostenibles e inteligentes.</p>
		`,
		slug: "el-futuro-de-la-energia-solar-avances-tecnologicos-y-perspectivas",
	},
];

export default function BlogPage(): any {
	const SuspenseComponent = Suspense as any;
	return (
		<SuspenseComponent fallback={<BlogLoadingState />}>
			<BlogContent />
		</SuspenseComponent>
	);
}

function BlogLoadingState(): JSX.Element {
	return (
		<>
			<Header />
			<main className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center py-20">
				<div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#3AB54A] mb-4"></div>
				<p className="text-[#262660] font-semibold text-lg animate-pulse">Cargando Blog ABTEC...</p>
			</main>
			<Footer />
		</>
	);
}

function BlogContent(): JSX.Element {
	const searchParams = useSearchParams();
	const router = useRouter();
	const currentSlug = searchParams.get("slug");

	const [posts, setPosts] = useState<BlogPost[]>(STATIC_POSTS);
	const [isLoading, setIsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("Todos");
	const [showShareToast, setShowShareToast] = useState(false);

	useEffect(() => {
		async function fetchPosts() {
			setIsLoading(true);
			try {
				const db = getClientDb();
				const postsQuery = query(
					collection(db, "blog_posts"),
					orderBy("createdAt", "desc")
				);
				const querySnapshot = await getDocs(postsQuery);
				
				let fetchedList: BlogPost[] = [];
				if (!querySnapshot.empty) {
					fetchedList = querySnapshot.docs.map((doc) => {
						const data = doc.data();
						const createdAt = data.createdAt && typeof data.createdAt === "object" && "toDate" in data.createdAt
							? data.createdAt.toDate()
							: (data.createdAt ? new Date(data.createdAt) : new Date());

						const formattedDate = createdAt.toLocaleDateString("es-MX", {
							year: "numeric",
							month: "long",
							day: "numeric",
						});

						return {
							id: doc.id,
							image: data.image || "/images/solar_panel.png",
							category: data.category || "Paneles Solares Monterrey",
							author: data.author || "Ingeniería ABTEC",
							date: formattedDate,
							title: data.title || "",
							excerpt: data.excerpt || "",
							content: data.content || "",
							slug: data.slug || "",
						};
					});
				}
				
				// Combinar con posts estáticos
				const combined = [...fetchedList];
				STATIC_POSTS.forEach(staticPost => {
					if (!combined.some(p => p.slug === staticPost.slug)) {
						combined.push(staticPost);
					}
				});
				
				setPosts(combined);
			} catch (error) {
				console.error("[Web][Blog] Error loading blog posts:", error);
				setPosts(STATIC_POSTS);
			} finally {
				setIsLoading(false);
			}
		}

		fetchPosts();
	}, []);

	// Buscar post actual
	const currentPost = posts.find(p => p.slug === currentSlug);

	// Obtener categorías únicas
	const categories = ["Todos", ...Array.from(new Set(posts.map(p => p.category)))];

	// Filtrar posts para la lista
	const filteredPosts = posts.filter(post => {
		const matchesSearch = 
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.category.toLowerCase().includes(searchQuery.toLowerCase());
		
		const matchesCategory = 
			selectedCategory === "Todos" || post.category === selectedCategory;

		return matchesSearch && matchesCategory;
	});

	// Copiar al portapapeles
	const handleCopyLink = () => {
		if (typeof window !== "undefined") {
			navigator.clipboard.writeText(window.location.href);
			setShowShareToast(true);
			setTimeout(() => setShowShareToast(false), 3000);
		}
	};

	// Ir a post específico
	const handleSelectPost = (slug: string) => {
		router.push(`/blog?slug=${slug}`);
	};

	// Ir a lista
	const handleGoBack = () => {
		router.push("/blog");
	};

	return (
		<>
			<Header />
			
			<main className="bg-[#f8fafc] font-sans text-slate-800 min-h-screen">
				
				{/* Banner Superior */}
				<section className="relative w-full py-16 md:py-24 bg-[#1f2a5c] overflow-hidden">
					<div className="absolute inset-0 z-0">
						<Image
							src="/images/abtec1.jpeg"
							alt="Blog ABTEC"
							fill
							className="object-cover object-center opacity-25"
							priority
							sizes="100vw"
						/>
						<div className="absolute inset-0 bg-gradient-to-b from-[#1f2a5c]/90 via-[#1f2a5c]/70 to-[#1f2a5c]/95"></div>
					</div>
					<div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10 text-center">
						<div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3AB54A]/20 border border-[#3AB54A]/30 w-fit mb-6 mx-auto">
							<BookOpen className="w-4 h-4 text-[#3AB54A]" />
							<span className="text-[10px] font-bold tracking-widest uppercase text-[#3AB54A]">
								Conocimiento y Tecnología
							</span>
						</div>
						<h1 className="text-white text-4xl md:text-6xl font-bold tracking-tight mb-4 font-heading uppercase">
							{currentPost ? "Artículo de Blog" : "Blog de Energía Solar"}
						</h1>
						<p className="text-white/70 text-base md:text-lg max-w-2xl mx-auto">
							{currentPost 
								? "Descubre las últimas noticias, tips e innovaciones de la mano de nuestros expertos." 
								: "Explora guías prácticas, noticias del sector e información útil sobre sistemas solares en Monterrey."
							}
						</p>
					</div>
				</section>

				<section className="py-12 md:py-16 bg-[#f8fafc]">
					<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
						
						{/* Modo: Detalle de Artículo */}
						{currentSlug ? (
							<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
								
								{/* Columna Principal (Contenido) */}
								<div className="lg:col-span-8">
									{isLoading ? (
										<div className="bg-white rounded-[32px] p-12 text-center shadow-md border border-slate-100 flex flex-col items-center">
											<div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3AB54A] mb-4"></div>
											<p className="text-slate-500">Cargando artículo...</p>
										</div>
									) : currentPost ? (
										<motion.article 
											initial={{ opacity: 0, y: 15 }}
											animate={{ opacity: 1, y: 0 }}
											className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(15,23,42,0.03)] border border-slate-200/60 p-6 sm:p-8 md:p-10"
										>
											{/* Botón Volver */}
											<button
												onClick={handleGoBack}
												className="inline-flex items-center gap-2 text-slate-500 hover:text-[#262660] transition-colors mb-6 text-sm font-semibold group cursor-pointer"
											>
												<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
												Volver a todos los artículos
											</button>

											{/* Categoría */}
											<span className="inline-block bg-[#3AB54A]/10 border border-[#3AB54A]/20 text-[#3AB54A] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4">
												{currentPost.category}
											</span>

											{/* Título */}
											<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-heading text-[#1f2a5c] leading-tight mb-6 uppercase">
												{currentPost.title}
											</h2>

											{/* Metadatos */}
											<div className="flex flex-wrap items-center gap-6 text-xs text-slate-500 border-y border-slate-100 py-4 mb-8">
												<div className="flex items-center gap-2">
													<User className="w-4 h-4 text-[#3AB54A]" />
													<span className="font-semibold text-slate-700">{currentPost.author}</span>
												</div>
												<div className="flex items-center gap-2">
													<Calendar className="w-4 h-4 text-[#3AB54A]" />
													<span>{currentPost.date}</span>
												</div>
												<div className="flex items-center gap-2">
													<Clock className="w-4 h-4 text-[#3AB54A]" />
													<span>5 min de lectura</span>
												</div>
											</div>

											{/* Imagen Destacada */}
											<div className="relative w-full h-[250px] sm:h-[400px] rounded-2xl overflow-hidden mb-8 shadow-sm">
												<Image
													src={currentPost.image}
													alt={currentPost.title}
													fill
													className="object-cover"
													quality={95}
												/>
											</div>

											{/* Contenido Completo */}
											<div className="relative">
												<div 
													className="prose max-w-none text-slate-700 leading-relaxed text-sm sm:text-base flex flex-col gap-4"
													dangerouslySetInnerHTML={{ __html: currentPost.content || `<p>${currentPost.excerpt}</p>` }}
												/>
											</div>

											{/* Compartir nota */}
											<div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
												<div className="flex items-center gap-2 text-slate-700 font-bold text-sm">
													<Share2 className="w-4 h-4 text-[#262660]" />
													<span>Compartir este artículo:</span>
												</div>
												<div className="flex items-center gap-3">
													<a 
														href={`https://www.facebook.com/sharer/sharer.php?u=${typeof window !== "undefined" ? encodeURIComponent(window.location.href) : ""}`} 
														target="_blank" 
														rel="noopener noreferrer" 
														className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#1f2a5c] hover:text-white transition-all cursor-pointer"
													>
														<Facebook className="w-4 h-4 fill-current" />
													</a>
													<a 
														href={`https://api.whatsapp.com/send?text=${typeof window !== "undefined" ? encodeURIComponent(currentPost.title + " " + window.location.href) : ""}`} 
														target="_blank" 
														rel="noopener noreferrer" 
														className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#3AB54A] hover:text-white transition-all cursor-pointer"
													>
														<MessageCircle className="w-4 h-4 fill-current" />
													</a>
													<button 
														onClick={handleCopyLink}
														className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-[#262660] hover:text-white transition-all cursor-pointer relative"
														title="Copiar enlace"
													>
														<Link2 className="w-4 h-4" />
													</button>
												</div>
											</div>
										</motion.article>
									) : (
										<div className="bg-white rounded-[32px] p-12 text-center shadow-md border border-slate-100 flex flex-col items-center">
											<AlertCircle className="w-16 h-16 text-rose-500 mb-4 animate-pulse" />
											<h3 className="text-xl font-bold text-[#262660] mb-2">Artículo no encontrado</h3>
											<p className="text-slate-500 mb-6 max-w-md">Lo sentimos, no encontramos la publicación que buscas o ha sido eliminada.</p>
											<button
												onClick={handleGoBack}
												className="bg-[#262660] text-white hover:bg-[#1f2a5c] font-bold py-3.5 px-8 rounded-2xl transition-all cursor-pointer"
											>
												Volver al Blog
											</button>
										</div>
									)}
								</div>

								{/* Columna Lateral (Sidebar) */}
								<div className="lg:col-span-4 flex flex-col gap-8">
									
									{/* Sugerencias */}
									<div className="bg-white rounded-[32px] p-6 shadow-[0_15px_50px_rgba(15,23,42,0.02)] border border-slate-200/60">
										<h4 className="text-[#262660] font-bold font-heading text-lg mb-6 uppercase pb-3 border-b-2 border-[#3AB54A] w-fit">
											Otros Artículos
										</h4>
										<div className="flex flex-col gap-4">
											{posts
												.filter(p => p.slug !== currentSlug)
												.slice(0, 4)
												.map(post => (
													<div 
														key={post.id} 
														onClick={() => handleSelectPost(post.slug)}
														className="flex gap-4 cursor-pointer group pb-4 border-b border-slate-100 last:border-b-0 last:pb-0"
													>
														<div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-slate-100">
															<Image
																src={post.image}
																alt={post.title}
																fill
																className="object-cover group-hover:scale-105 transition-transform duration-300"
															/>
														</div>
														<div className="flex flex-col justify-center">
															<span className="text-[10px] font-bold text-[#3AB54A] uppercase tracking-wider mb-1">
																{post.category}
															</span>
															<h5 className="text-[#262660] font-bold text-xs sm:text-sm line-clamp-2 leading-snug group-hover:text-[#3AB54A] transition-colors">
																{post.title}
															</h5>
														</div>
													</div>
												))
											}
										</div>
									</div>

									{/* CTA */}
									<div className="bg-gradient-to-br from-[#262660] to-[#1a1a44] rounded-[32px] p-8 text-white relative overflow-hidden shadow-lg">
										<div className="absolute -right-12 -top-12 w-32 h-32 bg-[#3AB54A]/20 rounded-full blur-2xl"></div>
										<h4 className="text-xl font-bold font-heading mb-4 uppercase">
											¿Quieres cotizar paneles solares?
										</h4>
										<p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-6">
											Nuestros asesores certificados realizarán un estudio técnico de tu consumo eléctrico sin costo. ¡Empieza a ahorrar hoy!
										</p>
										<a 
											href="/contacto"
											className="inline-flex w-full items-center justify-center bg-[#3AB54A] hover:bg-[#2d9c3b] text-white font-bold py-3.5 px-6 rounded-2xl transition-all text-sm uppercase tracking-wider"
										>
											Cotizar gratis
										</a>
									</div>

								</div>
							</div>
						) : (
							
							/* Modo: Listado de Artículos */
							<div className="flex flex-col gap-10">
								
								{/* Controles de Búsqueda y Filtrado */}
								<div className="bg-white rounded-[32px] p-6 sm:p-8 shadow-[0_15px_50px_rgba(15,23,42,0.02)] border border-slate-200/60 flex flex-col md:flex-row items-center justify-between gap-6">
									{/* Categorías */}
									<div className="flex flex-wrap gap-2 w-full md:w-auto">
										{categories.map(category => (
											<button
												key={category}
												onClick={() => setSelectedCategory(category)}
												className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
													selectedCategory === category 
														? "bg-[#262660] text-white shadow-sm" 
														: "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/60"
												}`}
											>
												{category}
											</button>
										))}
									</div>

									{/* Buscador */}
									<div className="relative w-full md:w-80">
										<div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
											<Search className="w-4 h-4 text-slate-400" />
										</div>
										<input
											type="text"
											placeholder="Buscar artículos..."
											value={searchQuery}
											onChange={(e) => setSearchQuery(e.target.value)}
											className="w-full bg-[#f8fafc] border border-slate-200 rounded-xl pl-11 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#3AB54A]/50 focus:border-[#3AB54A] transition-all"
										/>
									</div>
								</div>

								{/* Grid de Artículos */}
								{isLoading ? (
									<div className="py-20 text-center flex flex-col items-center justify-center">
										<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3AB54A] mb-4"></div>
										<p className="text-slate-500">Cargando publicaciones...</p>
									</div>
								) : filteredPosts.length > 0 ? (
									<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
										{filteredPosts.map((post, index) => (
											<motion.div
												key={post.id}
												initial={{ opacity: 0, y: 25 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ delay: index * 0.08, duration: 0.4 }}
												className="bg-white rounded-[32px] overflow-hidden shadow-[0_15px_50px_rgba(15,23,42,0.03)] border border-slate-200/60 flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300"
											>
												{/* Imagen */}
												<div className="relative h-56 w-full bg-slate-100">
													<Image
														src={post.image}
														alt={post.title}
														fill
														className="object-cover"
														quality={90}
													/>
													{/* Etiqueta de categoría en imagen */}
													<span className="absolute top-4 left-4 bg-[#262660] text-white text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
														{post.category}
													</span>
												</div>

												{/* Contenido Card */}
												<div className="p-6 md:p-8 flex flex-col flex-grow">
													
													{/* Autor y fecha */}
													<div className="flex flex-wrap items-center gap-4 text-[11px] text-slate-500 mb-3">
														<div className="flex items-center gap-1.5">
															<User className="w-3.5 h-3.5 text-[#3AB54A]" />
															<span>{post.author}</span>
														</div>
														<div className="flex items-center gap-1.5">
															<Calendar className="w-3.5 h-3.5 text-[#3AB54A]" />
															<span>{post.date}</span>
														</div>
													</div>

													{/* Título */}
													<h3 
														onClick={() => handleSelectPost(post.slug)}
														className="text-xl md:text-2xl font-bold font-heading text-[#262660] mb-3 line-clamp-2 leading-snug hover:text-[#3AB54A] cursor-pointer transition-colors uppercase"
													>
														{post.title}
													</h3>

													{/* Resumen */}
													<p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
														{post.excerpt}
													</p>

													{/* Botón */}
													<button
														onClick={() => handleSelectPost(post.slug)}
														className="inline-flex items-center justify-center gap-2 w-full bg-[#262660] hover:bg-[#3AB54A] text-white py-3 rounded-2xl text-xs uppercase tracking-widest font-bold transition-all cursor-pointer group"
													>
														<span>Leer artículo</span>
														<ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
													</button>
												</div>
											</motion.div>
										))}
									</div>
								) : (
									<div className="bg-white rounded-[32px] py-16 text-center shadow-sm border border-slate-200/60 max-w-lg mx-auto flex flex-col items-center px-8">
										<AlertCircle className="w-12 h-12 text-[#262660] mb-4" />
										<h4 className="text-lg font-bold text-[#262660] mb-2">No se encontraron artículos</h4>
										<p className="text-slate-500 text-sm mb-6">
											No hay resultados que coincidan con la búsqueda "{searchQuery}" o la categoría "{selectedCategory}". Intenta con otros términos.
										</p>
										<button
											onClick={() => { setSearchQuery(""); setSelectedCategory("Todos"); }}
											className="bg-[#262660] hover:bg-[#1f2a5c] text-white py-3 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
										>
											Limpiar filtros
										</button>
									</div>
								)}
							</div>
						)}

					</div>
				</section>

			</main>

			{/* Compartir toast de confirmación */}
			<AnimatePresence>
				{showShareToast && (
					<motion.div 
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 50 }}
						className="fixed bottom-6 right-6 z-50 bg-[#262660] text-white py-3.5 px-6 rounded-2xl shadow-xl flex items-center gap-3 border border-[#3AB54A]/30 text-sm"
					>
						<span className="w-2.5 h-2.5 rounded-full bg-[#3AB54A] animate-ping"></span>
						<span>¡Enlace copiado al portapapeles!</span>
					</motion.div>
				)}
			</AnimatePresence>

			<Footer />
		</>
	);
}
