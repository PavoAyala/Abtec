import { type StaffMember, UserRole } from "@/types";
import { callFunction, getCollection, orderBy, where } from "./firebase";

const STAFF_ROLES = [UserRole.Admin, UserRole.Manager, UserRole.Sales, UserRole.Support, UserRole.Publisher];

export const getStaffUsers = (): Promise<StaffMember[]> =>
	getCollection<StaffMember>(
		"users",
		where("roles", "array-contains-any", STAFF_ROLES),
		orderBy("createdAt", "desc"),
	).then((docs) =>
		docs.map((doc) => ({
			...doc,
			createdAt: doc.createdAt instanceof Date ? doc.createdAt : new Date(doc.createdAt),
			updatedAt: doc.updatedAt instanceof Date ? doc.updatedAt : new Date(doc.updatedAt),
		})),
	);

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
