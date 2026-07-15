"use client";

import { motion } from "framer-motion";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { getClientDb } from "../lib/firebase";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

interface PostItem {
	image: string;
	category: string;
	author: string;
	date: string;
	title: string;
	excerpt: string;
	slug: string;
}

const STATIC_POSTS: PostItem[] = [
	{
		image: "/images/abtec1.jpeg",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "agosto 23, 2023",
		title:
			"Paneles Solares Monterrey: Cómo aprovechar al máximo la energía del sol",
		excerpt:
			"Los paneles solares Monterrey se han convertido en una forma cada vez más popular y efectiva de aprovechar la energía...",
		slug: "/blog?slug=paneles-solares-como-aprovechar-al-maximo-la-energia-del-sol",
	},
	{
		image: "/images/proyecto residencial.png",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "mayo 22, 2023",
		title: "Beneficios ambientales y económicos de la energía solar",
		excerpt:
			"La energía solar se ha consolidado como una fuente de energía renovable que ofrece una amplia gama de beneficios tanto...",
		slug: "/blog?slug=beneficios-ambientales-y-economicos-de-la-energia-solar",
	},
	{
		image: "/images/solar_panel.png",
		category: "Paneles Solares Monterrey",
		author: "Ingeniería ABTEC",
		date: "mayo 22, 2023",
		title:
			"El futuro de la energía solar: avances tecnológicos y perspectivas",
		excerpt:
			"La energía solar ha experimentado un crecimiento exponencial en las últimas décadas, convirtiéndose en una de las...",
		slug: "/blog?slug=el-futuro-de-la-energia-solar-avances-tecnologicos-y-perspectivas",
	},
];

export default function BlogPreview(): JSX.Element {
	const [posts, setPosts] = useState<PostItem[]>(STATIC_POSTS);

	useEffect(() => {
		async function fetchLatestPosts() {
			try {
				const db = getClientDb();
				const postsQuery = query(
					collection(db, "blog_posts"),
					orderBy("createdAt", "desc"),
					limit(3)
				);
				const querySnapshot = await getDocs(postsQuery);
				if (!querySnapshot.empty) {
					const fetched = querySnapshot.docs.map((doc) => {
						const data = doc.data();
						const createdAt = data.createdAt && typeof data.createdAt === "object" && "toDate" in data.createdAt
							? data.createdAt.toDate()
							: (data.createdAt ? new Date(data.createdAt) : new Date());

						const formattedDate = createdAt.toLocaleDateString("es-MX", {
							year: "numeric",
							month: "long",
							day: "numeric",
						});

						let slug = data.slug || "";
						if (slug && !slug.startsWith("http")) {
							slug = `/blog?slug=${slug}`;
						}

						return {
							image: data.image || "/images/solar_panel.png",
							category: data.category || "Paneles Solares Monterrey",
							author: data.author || "Ingeniería ABTEC",
							date: formattedDate,
							title: data.title || "",
							excerpt: data.excerpt || "",
							slug: slug || "#",
						};
					});
					setPosts(fetched);
				}
			} catch (error) {
				console.error("[Web][BlogPreview] Error loading blog posts:", error);
			}
		}
		fetchLatestPosts();
	}, []);

	return (
		<section id="blog" className="py-16 bg-white">
			<div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center max-w-4xl mx-auto mb-16">
					<p className="text-abtec-blue font-semibold uppercase tracking-[0.35em] text-sm mb-3">
						POST RECIENTES - PANELES SOLARES MONTERREY
					</p>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						className="font-heading text-4xl md:text-5xl font-bold text-[#1f2a5c] mb-4 uppercase"
					>
						BLOG <span className="text-abtec-green">ABTEC</span>
					</motion.h2>
					<div className="w-16 h-1 bg-abtec-blue mx-auto rounded-full" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{posts.map((post, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ delay: index * 0.15, duration: 0.5 }}
							className="bg-white rounded-[32px] overflow-hidden shadow-[0_20px_60px_rgba(15,23,42,0.1)] border border-slate-200 flex flex-col"
						>
							<div className="relative h-64">
								<Image
									src={post.image}
									alt={post.title}
									fill
									className="object-cover"
									quality={100}
								/>
							</div>
							<div className="p-8 flex flex-col flex-grow">
								<div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 mb-4">
									<div className="flex items-center gap-2">
										<User size={14} className="text-abtec-green" />
										<span>{post.author}</span>
									</div>
									<div className="flex items-center gap-2">
										<Calendar size={14} className="text-abtec-green" />
										<span>{post.date}</span>
									</div>
								</div>
								<h3 className="text-2xl font-heading font-bold text-[#1c1d29] mb-4">
									<a
										href={post.slug}
										className="block hover:text-abtec-blue transition-colors"
									>
										{post.title}
									</a>
								</h3>
								<p className="text-gray-600 leading-relaxed mb-8 text-sm flex-grow">
									{post.excerpt}
								</p>
								<a
									href={post.slug}
									className="inline-flex items-center justify-center w-full bg-abtec-blue text-white py-3 rounded-full uppercase tracking-[0.15em] font-semibold hover:bg-[#14154e] transition-colors"
								>
									Leer más
								</a>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
