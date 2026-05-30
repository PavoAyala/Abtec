// Funciones CRUD para Blog Posts en CRM
import { type BlogPost } from "@/types";
import {
	createDocument,
	deleteDocument,
	getCollection,
	getDocument,
	orderBy,
	type QueryConstraint,
	updateDocument,
} from "./firebase";

export const getBlogPosts = (): Promise<BlogPost[]> => {
	const constraints: QueryConstraint[] = [orderBy("createdAt", "desc")];
	return getCollection<BlogPost>("blog_posts", ...constraints).then((docs) =>
		docs.map((doc) => {
			const createdAt = doc.createdAt && typeof doc.createdAt === "object" && "toDate" in doc.createdAt
				? (doc.createdAt as any).toDate()
				: doc.createdAt;
			const updatedAt = doc.updatedAt && typeof doc.updatedAt === "object" && "toDate" in doc.updatedAt
				? (doc.updatedAt as any).toDate()
				: doc.updatedAt;

			return {
				...doc,
				createdAt: createdAt instanceof Date ? createdAt : new Date(createdAt),
				updatedAt: updatedAt instanceof Date ? updatedAt : new Date(updatedAt),
			};
		}),
	);
};

export const getBlogPost = (id: string): Promise<BlogPost | null> =>
	getDocument<BlogPost>("blog_posts", id);

export const createBlogPost = async (data: Partial<BlogPost>): Promise<string> => {
	const postData = {
		title: data.title || "",
		slug: data.slug || "",
		excerpt: data.excerpt || "",
		content: data.content || "",
		category: data.category || "Paneles Solares Monterrey",
		author: data.author || "Ingeniería ABTEC",
		image: data.image || "/images/solar_panel.png",
	};
	return createDocument("blog_posts", postData);
};

export const updateBlogPost = (id: string, data: Partial<BlogPost>): Promise<void> =>
	updateDocument("blog_posts", id, data);

export const deleteBlogPost = (id: string): Promise<void> =>
	deleteDocument("blog_posts", id);
