import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import { db } from "../config/firebase";

const STAFF_ROLES = ["admin", "manager", "sales", "support"] as const;
type StaffRole = (typeof STAFF_ROLES)[number];

/**
 * setStaffRole — solo admin puede invocarla.
 * Payload: { targetUid: string; role: StaffRole | null }
 * role=null revoca el acceso al CRM.
 */
export const setStaffRole = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			"unauthenticated",
			"Debes estar autenticado.",
		);
	}

	const callerClaim = context.auth.token.staff as string | undefined;
	if (callerClaim !== "admin") {
		throw new functions.https.HttpsError(
			"permission-denied",
			"Solo un admin puede asignar roles.",
		);
	}

	const { targetUid, role } = data as {
		targetUid?: string;
		role?: StaffRole | null;
	};

	if (!targetUid || typeof targetUid !== "string") {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"targetUid requerido.",
		);
	}

	if (role !== null && role !== undefined && !STAFF_ROLES.includes(role)) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			`role debe ser uno de: ${STAFF_ROLES.join(", ")} o null para revocar.`,
		);
	}

	await admin.auth().getUser(targetUid);

	const newClaims = role ? { staff: role } : {};
	await admin.auth().setCustomUserClaims(targetUid, newClaims);

	await db
		.collection("users")
		.doc(targetUid)
		.set(
			{
				role: role ?? admin.firestore.FieldValue.delete(),
				updatedAt: admin.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true },
		);

	functions.logger.info(
		`Staff role updated: ${targetUid} → ${role ?? "revoked"}`,
		{
			by: context.auth.uid,
		},
	);

	return { success: true, uid: targetUid, role: role ?? null };
});

/**
 * createStaffUser — crea un nuevo usuario con acceso al CRM.
 * Payload: { email, password, displayName, role }
 */
export const createStaffUser = functions.https.onCall(async (data, context) => {
	if (!context.auth) {
		throw new functions.https.HttpsError(
			"unauthenticated",
			"Debes estar autenticado.",
		);
	}

	const callerClaim = context.auth.token.staff as string | undefined;
	if (callerClaim !== "admin") {
		throw new functions.https.HttpsError(
			"permission-denied",
			"Solo un admin puede crear usuarios staff.",
		);
	}

	const { email, password, displayName, role } = data as {
		email?: string;
		password?: string;
		displayName?: string;
		role?: StaffRole;
	};

	if (!email || !password || !displayName || !role) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"email, password, displayName y role son requeridos.",
		);
	}

	if (!STAFF_ROLES.includes(role)) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			`role debe ser uno de: ${STAFF_ROLES.join(", ")}`,
		);
	}

	if (password.length < 6) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"La contraseña debe tener mínimo 6 caracteres.",
		);
	}

	// Crear usuario en Firebase Auth
	const newUser = await admin
		.auth()
		.createUser({ email, password, displayName });

	// Setear custom claim
	await admin.auth().setCustomUserClaims(newUser.uid, { staff: role });

	// Crear documento en Firestore
	await db.collection("users").doc(newUser.uid).set({
		email,
		displayName,
		authUid: newUser.uid,
		role,
		status: "active",
		createdAt: admin.firestore.FieldValue.serverTimestamp(),
		updatedAt: admin.firestore.FieldValue.serverTimestamp(),
	});

	functions.logger.info(
		`Staff user created: ${newUser.uid} (${email}) with role: ${role}`,
		{
			by: context.auth.uid,
		},
	);

	return { success: true, uid: newUser.uid, email, role };
});
