import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import * as functions from "firebase-functions/v1";
import { db } from "../config/firebase";




const STAFF_ROLES = ["admin", "manager", "sales", "support", "publisher"] as const;
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

	const callerClaim = context.auth.token.staff;
	const isAdmin = Array.isArray(callerClaim) ? callerClaim.includes("admin") : callerClaim === "admin";
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"Solo un admin puede asignar roles.",
		);
	}

	const { targetUid, roles } = data as {
		targetUid?: string;
		roles?: StaffRole[];
	};

	if (!targetUid || typeof targetUid !== "string") {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"targetUid requerido.",
		);
	}

	if (roles !== undefined && roles !== null) {
		if (!Array.isArray(roles)) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				"roles debe ser un array.",
			);
		}
		for (const r of roles) {
			if (!STAFF_ROLES.includes(r)) {
				throw new functions.https.HttpsError(
					"invalid-argument",
					`Cada rol debe ser uno de: ${STAFF_ROLES.join(", ")}`,
				);
			}
		}
	}

	await admin.auth().getUser(targetUid);

	await db
		.collection("users")
		.doc(targetUid)
		.set(
			{
				roles: roles && roles.length > 0 ? roles : FieldValue.delete(),
				role: FieldValue.delete(),
				updatedAt: FieldValue.serverTimestamp(),
			},
			{ merge: true },
		);

	functions.logger.info(
		`Staff roles updated: ${targetUid} → ${roles ? roles.join(", ") : "revoked"}`,
		{
			by: context.auth.uid,
		},
	);

	return { success: true, uid: targetUid, roles: roles ?? [] };
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

	const callerClaim = context.auth.token.staff;
	const isAdmin = Array.isArray(callerClaim) ? callerClaim.includes("admin") : callerClaim === "admin";
	if (!isAdmin) {
		throw new functions.https.HttpsError(
			"permission-denied",
			"Solo un admin puede crear usuarios staff.",
		);
	}

	const { email, password, displayName, roles } = data as {
		email?: string;
		password?: string;
		displayName?: string;
		roles?: StaffRole[];
	};

	if (!email || !password || !displayName || !roles || !Array.isArray(roles) || roles.length === 0) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"email, password, displayName y roles (no vacío) son requeridos.",
		);
	}

	for (const r of roles) {
		if (!STAFF_ROLES.includes(r)) {
			throw new functions.https.HttpsError(
				"invalid-argument",
				`Cada rol debe ser uno de: ${STAFF_ROLES.join(", ")}`,
			);
		}
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

	// Crear documento en Firestore
	await db.collection("users").doc(newUser.uid).set({
		email,
		displayName,
		authUid: newUser.uid,
		roles,
		status: "active",
		isActive: true,
		createdAt: FieldValue.serverTimestamp(),
		updatedAt: FieldValue.serverTimestamp(),
	});

	functions.logger.info(
		`Staff user created: ${newUser.uid} (${email}) with roles: ${roles.join(", ")}`,
		{
			by: context.auth.uid,
		},
	);

	return { success: true, uid: newUser.uid, email, roles };
});
