import { type StaffMember, UserRole } from "@/types";
import { callFunction, getCollection, orderBy, where } from "./firebase";

const STAFF_ROLES = [UserRole.Admin, UserRole.Manager, UserRole.Sales, UserRole.Support];

export const getStaffUsers = (): Promise<StaffMember[]> =>
	getCollection<StaffMember>(
		"users",
		where("role", "in", STAFF_ROLES),
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
	role: UserRole;
}) => callFunction<typeof data, { uid: string }>("createStaffUser")(data);

export const updateStaffRole = (targetUid: string, role: UserRole) =>
	callFunction<{ targetUid: string; role: UserRole }, { success: boolean }>("setStaffRole")({
		targetUid,
		role,
	});

export const revokeStaffAccess = (targetUid: string) =>
	callFunction<{ targetUid: string; role: null }, { success: boolean }>("setStaffRole")({
		targetUid,
		role: null,
	});
