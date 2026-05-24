#!/usr/bin/env node
/**
 * Crea el primer usuario admin seteando el custom claim { staff: 'admin' }.
 *
 * Uso:
 *   node seed-admin.js                   # contra emuladores locales
 *   USE_PROD=true node seed-admin.js     # contra producción (requiere serviceAccount.json)
 *
 * En producción descarga la clave desde:
 *   Firebase Console → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada
 * y guárdala como apps/firebase/serviceAccount.json  ← NO subir a git
 */

const admin = require("firebase-admin");
const readline = require("readline");

const USE_PROD = process.env.USE_PROD === "true";
const PROJECT_ID = "abtec-8f31e";

if (USE_PROD) {
	let serviceAccount;
	try {
		serviceAccount = require("./serviceAccount.json");
	} catch {
		console.error("❌  No se encontró serviceAccount.json");
		process.exit(1);
	}
	admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
	console.log("🔥  Conectado a producción.");
} else {
	process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
	process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
	admin.initializeApp({ projectId: PROJECT_ID });
	console.log("🧪  Conectado a emuladores locales.");
}

const auth = admin.auth();
const db = admin.firestore();

function ask(question) {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});
	return new Promise((resolve) =>
		rl.question(question, (a) => {
			rl.close();
			resolve(a.trim());
		}),
	);
}

const VALID_ROLES = ["admin", "manager", "sales", "support"];

async function main() {
	console.log("\n=== Seed: Primer Usuario Staff ===\n");

	const email = await ask("Email: ");
	const password = await ask("Contraseña (mín. 6 caracteres): ");
	const name = await ask("Nombre completo: ");
	const roleInput = await ask(
		`Rol [${VALID_ROLES.join(" | ")}] (Enter = admin): `,
	);
	const role = VALID_ROLES.includes(roleInput) ? roleInput : "admin";

	if (!email || password.length < 6) {
		console.error("❌  Datos inválidos.");
		process.exit(1);
	}

	// Crear o reutilizar usuario en Auth
	let uid;
	try {
		const existing = await auth.getUserByEmail(email);
		uid = existing.uid;
		console.log(`\nℹ️   Usuario ya existe (uid: ${uid}). Reutilizando.`);
	} catch {
		const newUser = await auth.createUser({
			email,
			password,
			displayName: name,
		});
		uid = newUser.uid;
		console.log(`\n✅  Usuario creado en Auth (uid: ${uid})`);
	}

	// Setear custom claim { staff: role }
	await auth.setCustomUserClaims(uid, { staff: role });
	console.log(`✅  Custom claim seteado: { staff: "${role}" }`);

	// Crear/actualizar documento en /users/{uid}
	await db.collection("users").doc(uid).set(
		{
			email,
			displayName: name,
			authUid: uid,
			role,
			status: "active",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{ merge: true },
	);
	console.log(`✅  Documento /users/${uid} sincronizado con role: "${role}"`);
	console.log(`\n🎉  Listo. Inicia sesión en el CRM con ${email}\n`);
	process.exit(0);
}

main().catch((err) => {
	console.error("❌  Error:", err.message);
	process.exit(1);
});
