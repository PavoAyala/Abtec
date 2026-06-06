import { type StaffMember, UserRole } from "@/types";
import { callFunction, getCollection, orderBy, where, limit, startAfter } from "./firebase";

const STAFF_ROLES = [UserRole.Admin, UserRole.Manager, UserRole.Sales, UserRole.Support, UserRole.Publisher];

export const getStaffUsers = (lastCreatedAt?: Date): Promise<StaffMember[]> => {
	const constraints: any[] = [
		where("roles", "array-contains-any", STAFF_ROLES),
		orderBy("createdAt", "desc"),
		limit(15)
	];
	if (lastCreatedAt) {
		constraints.push(startAfter(lastCreatedAt));
	}

	return getCollection<StaffMember>("users", ...constraints).then((docs) =>
		docs.map((doc) => ({
			...doc,
			createdAt: doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
			updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
		})),
	);
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
