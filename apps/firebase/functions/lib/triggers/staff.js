"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStaffUser = exports.setStaffRole = void 0;
const admin = require("firebase-admin");
const firestore_1 = require("firebase-admin/firestore");
const functions = require("firebase-functions/v1");
const firebase_1 = require("../config/firebase");
const STAFF_ROLES = ["admin", "manager", "sales", "support", "publisher"];
/**
 * setStaffRole — solo admin puede invocarla.
 * Payload: { targetUid: string; role: StaffRole | null }
 * role=null revoca el acceso al CRM.
 */
exports.setStaffRole = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Debes estar autenticado.");
    }
    const callerClaim = context.auth.token.staff;
    if (callerClaim !== "admin") {
        throw new functions.https.HttpsError("permission-denied", "Solo un admin puede asignar roles.");
    }
    const { targetUid, roles } = data;
    if (!targetUid || typeof targetUid !== "string") {
        throw new functions.https.HttpsError("invalid-argument", "targetUid requerido.");
    }
    if (roles !== undefined && roles !== null) {
        if (!Array.isArray(roles)) {
            throw new functions.https.HttpsError("invalid-argument", "roles debe ser un array.");
        }
        for (const r of roles) {
            if (!STAFF_ROLES.includes(r)) {
                throw new functions.https.HttpsError("invalid-argument", `Cada rol debe ser uno de: ${STAFF_ROLES.join(", ")}`);
            }
        }
    }
    await admin.auth().getUser(targetUid);
    await firebase_1.db
        .collection("users")
        .doc(targetUid)
        .set({
        roles: roles && roles.length > 0 ? roles : firestore_1.FieldValue.delete(),
        role: firestore_1.FieldValue.delete(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    }, { merge: true });
    functions.logger.info(`Staff roles updated: ${targetUid} → ${roles ? roles.join(", ") : "revoked"}`, {
        by: context.auth.uid,
    });
    return { success: true, uid: targetUid, roles: roles !== null && roles !== void 0 ? roles : [] };
});
/**
 * createStaffUser — crea un nuevo usuario con acceso al CRM.
 * Payload: { email, password, displayName, role }
 */
exports.createStaffUser = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Debes estar autenticado.");
    }
    const callerClaim = context.auth.token.staff;
    if (callerClaim !== "admin") {
        throw new functions.https.HttpsError("permission-denied", "Solo un admin puede crear usuarios staff.");
    }
    const { email, password, displayName, roles } = data;
    if (!email || !password || !displayName || !roles || !Array.isArray(roles) || roles.length === 0) {
        throw new functions.https.HttpsError("invalid-argument", "email, password, displayName y roles (no vacío) son requeridos.");
    }
    for (const r of roles) {
        if (!STAFF_ROLES.includes(r)) {
            throw new functions.https.HttpsError("invalid-argument", `Cada rol debe ser uno de: ${STAFF_ROLES.join(", ")}`);
        }
    }
    if (password.length < 6) {
        throw new functions.https.HttpsError("invalid-argument", "La contraseña debe tener mínimo 6 caracteres.");
    }
    // Crear usuario en Firebase Auth
    const newUser = await admin
        .auth()
        .createUser({ email, password, displayName });
    // Crear documento en Firestore
    await firebase_1.db.collection("users").doc(newUser.uid).set({
        email,
        displayName,
        authUid: newUser.uid,
        roles,
        status: "active",
        isActive: true,
        createdAt: firestore_1.FieldValue.serverTimestamp(),
        updatedAt: firestore_1.FieldValue.serverTimestamp(),
    });
    functions.logger.info(`Staff user created: ${newUser.uid} (${email}) with roles: ${roles.join(", ")}`, {
        by: context.auth.uid,
    });
    return { success: true, uid: newUser.uid, email, roles };
});
//# sourceMappingURL=staff.js.map