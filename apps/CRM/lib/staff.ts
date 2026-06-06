import { type StaffMember, UserRole } from "@/types";
import { callFunction, getCollection, orderBy, where, limit, startAfter } from "./firebase";

const STAFF_ROLES = [UserRole.Admin, UserRole.Manager, UserRole.Sales, UserRole.Support, UserRole.Publisher];

export const getStaffUsers = async (lastCreatedAt?: Date): Promise<StaffMember[]> => {
	try {
		// Query 1: users with roles array
		const constraintsRoles: any[] = [
			where("roles", "array-contains-any", STAFF_ROLES),
			orderBy("createdAt", "desc"),
			limit(15)
		];
		if (lastCreatedAt) constraintsRoles.push(startAfter(lastCreatedAt));
		const p1 = getCollection<StaffMember>("users", ...constraintsRoles).catch(e => {
			console.error("[getStaffUsers] Error in roles array query. Missing index?", e);
			return [] as StaffMember[];
		});

		// Query 2: users with role string (fallback for older or manually created documents)
		const constraintsRole: any[] = [
			where("role", "in", STAFF_ROLES),
			orderBy("createdAt", "desc"),
			limit(15)
		];
		if (lastCreatedAt) constraintsRole.push(startAfter(lastCreatedAt));
		const p2 = getCollection<StaffMember>("users", ...constraintsRole).catch(e => {
			console.error("[getStaffUsers] Error in role string query. Missing index?", e);
			return [] as StaffMember[];
		});

		const [docs1, docs2] = await Promise.all([p1, p2]);
		
		// Merge and deduplicate by id
		const allDocs = [...docs1, ...docs2];
		const uniqueDocs = Array.from(new Map(allDocs.map(d => [d.id, d])).values());

		// Sort descending by createdAt
		uniqueDocs.sort((a, b) => {
			const dateA = a.createdAt instanceof Date ? a.createdAt.getTime() : new Date(a.createdAt).getTime();
			const dateB = b.createdAt instanceof Date ? b.createdAt.getTime() : new Date(b.createdAt).getTime();
			return dateB - dateA;
		});

		// Limit to 15 after merge
		const finalDocs = uniqueDocs.slice(0, 15);

		console.log(`[getStaffUsers] Fetched ${finalDocs.length} users (Array: ${docs1.length}, String: ${docs2.length})`, finalDocs);

		return finalDocs.map((doc: any) => ({
			...doc,
			createdAt: doc.createdAt?.toDate ? doc.createdAt.toDate() : (doc.createdAt ? new Date(doc.createdAt) : null),
			updatedAt: doc.updatedAt?.toDate ? doc.updatedAt.toDate() : (doc.updatedAt ? new Date(doc.updatedAt) : null),
		}));
	} catch (error) {
		console.error("[getStaffUsers] Fatal error fetching staff users", error);
		throw error;
	}
};

export const createStaffUser = (data: {
	email: string;
	password: string;
	displayName: string;
	roles: UserRole[];
}) => callFunction<typeof data, { uid: string }>("createStaffUser")(data);

export const updateStaffRoles = (targetUid: string, roles: UserRole[]) =>
	callFunction<{ targetUid: string; roles: UserRole[] }, { success: boolean }>("setStaffRole")({
		targetUid,
		roles,
	});

export const revokeStaffAccess = (targetUid: string) =>
	callFunction<{ targetUid: string; roles: [] }, { success: boolean }>("setStaffRole")({
		targetUid,
		roles: [],
	});
