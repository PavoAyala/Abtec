#!/usr/bin/env node
/**
 * Crea todos los roles de staff y carga información de prueba en el emulador local.
 *
 * Uso:
 *   node seed-all-staff.js
 */

const admin = require("firebase-admin");

const PROJECT_ID = "abtec-8f31e";

// Forzar conexión con los emuladores locales
process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";

admin.initializeApp({ projectId: PROJECT_ID });
console.log("🧪 Conectado a emuladores locales.");

const auth = admin.auth();
const db = admin.firestore();

// 1. Roles de staff y datos de usuarios a crear
const staffUsers = [
	{
		email: "admin@abtec.com",
		password: "password123",
		name: "Admin User",
		role: "admin",
	},
	{
		email: "manager@abtec.com",
		password: "password123",
		name: "Manager User",
		role: "manager",
	},
	{
		email: "sales@abtec.com",
		password: "password123",
		name: "Sales User",
		role: "sales",
	},
	{
		email: "support@abtec.com",
		password: "password123",
		name: "Support User",
		role: "support",
	},
	{
		email: "publisher@abtec.com",
		password: "password123",
		name: "Publisher User",
		role: "publisher",
	},
];

async function seedUsers() {
	console.log("\n--- Creando/Actualizando Usuarios Staff ---");
	const userMap = {};

	for (const staff of staffUsers) {
		let uid;
		try {
			const existing = await auth.getUserByEmail(staff.email);
			uid = existing.uid;
			console.log(`ℹ️ Usuario ${staff.email} ya existe (uid: ${uid}).`);
		} catch {
			const newUser = await auth.createUser({
				email: staff.email,
				password: staff.password,
				displayName: staff.name,
			});
			uid = newUser.uid;
			console.log(`✅ Creado en Auth: ${staff.email} (uid: ${uid})`);
		}

		// Asignar el Custom Claim { staff: [role] }
		await auth.setCustomUserClaims(uid, { staff: [staff.role] });
		console.log(`🔑 Custom claim asignado: { staff: ["${staff.role}"] }`);

		// Guardar/Actualizar en la colección 'users'
		await db.collection("users").doc(uid).set(
			{
				email: staff.email,
				displayName: staff.name,
				name: staff.name,
				authUid: uid,
				roles: [staff.role],
				role: admin.firestore.FieldValue.delete(),
				status: "active",
				isActive: true,
				createdAt: admin.firestore.FieldValue.serverTimestamp(),
				updatedAt: admin.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true },
		);
		console.log(`📄 Documento /users/${uid} sincronizado.`);
		userMap[staff.role] = uid;
	}

	return userMap;
}

async function seedCrmData(userMap) {
	console.log("\n--- Cargando Información de Prueba (CRM) ---");

	// Limpiar colecciones anteriores para asegurar consistencia
	const collectionsToClean = ["companies", "contacts", "deals", "tickets", "activities", "blog_posts"];
	for (const collName of collectionsToClean) {
		const snapshot = await db.collection(collName).get();
		const batch = db.batch();
		snapshot.docs.forEach((doc) => batch.delete(doc.ref));
		await batch.commit();
		console.log(`🗑️ Limpiada colección: ${collName}`);
	}

	// 2. Empresas (Companies)
	const companies = [
		{
			id: "comp-01",
			name: "Abtec Soluciones S.A.",
			industry: "Energía",
			size: "Mediana",
			website: "https://abtecsoluciones.com",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "comp-02",
			name: "Smart Solar Tech",
			industry: "Tecnología",
			size: "Grande",
			website: "https://smartsolar.io",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "comp-03",
			name: "Eco-Energía de México",
			industry: "Renovables",
			size: "Pequeña",
			website: "https://ecoenergia.mx",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "comp-04",
			name: "Industrias Omega",
			industry: "Manufactura",
			size: "Grande",
			website: "https://industriasomega.com",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const comp of companies) {
		await db.collection("companies").doc(comp.id).set(comp);
		console.log(`🏢 Empresa guardada: ${comp.name}`);
	}

	// 3. Contactos (Contacts)
	const contacts = [
		{
			id: "cont-01",
			name: "Juan Pérez",
			email: "juan.perez@abtecsoluciones.com",
			phone: "+52 55 1234 5678",
			companyId: "comp-01",
			tags: ["Lead", "Interesado"],
			lifecycleStage: "lead",
			leadScore: 45,
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "cont-02",
			name: "Sofía Rodríguez",
			email: "sofia.rod@smartsolar.io",
			phone: "+52 55 8765 4321",
			companyId: "comp-02",
			tags: ["MQL", "VIP"],
			lifecycleStage: "mql",
			leadScore: 75,
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "cont-03",
			name: "Carlos Mendoza",
			email: "carlos.m@ecoenergia.mx",
			phone: "+52 55 9876 5432",
			companyId: "comp-03",
			tags: ["SQL"],
			lifecycleStage: "sql",
			leadScore: 90,
			ownerId: userMap["manager"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "cont-04",
			name: "Laura Gómez",
			email: "laura.gomez@gmail.com",
			phone: "+52 55 1111 2222",
			companyId: null,
			tags: ["Subscriber"],
			lifecycleStage: "subscriber",
			leadScore: 15,
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const cont of contacts) {
		await db.collection("contacts").doc(cont.id).set(cont);
		console.log(`👤 Contacto guardado: ${cont.name}`);
	}

	// 4. Negociaciones (Deals)
	const deals = [
		{
			id: "deal-01",
			title: "Instalación Paneles Solares - Abtec Soluciones",
			value: 120000,
			currency: "MXN",
			stage: "Proposal",
			probability: 60,
			contactId: "cont-01",
			companyId: "comp-01",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "deal-02",
			title: "Mantenimiento Preventivo - Smart Solar",
			value: 45000,
			currency: "MXN",
			stage: "Negotiation",
			probability: 80,
			contactId: "cont-02",
			companyId: "comp-02",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "deal-03",
			title: "Proyecto Parque Solar - Industrias Omega",
			value: 1500000,
			currency: "MXN",
			stage: "Lead",
			probability: 20,
			contactId: null,
			companyId: "comp-04",
			ownerId: userMap["manager"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "deal-04",
			title: "Suministro Inversores - Eco-Energía",
			value: 85000,
			currency: "MXN",
			stage: "Won",
			probability: 100,
			contactId: "cont-03",
			companyId: "comp-03",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const deal of deals) {
		await db.collection("deals").doc(deal.id).set(deal);
		console.log(`💼 Negociación guardada: ${deal.title}`);
	}

	// 5. Soporte (Tickets)
	const tickets = [
		{
			id: "tick-01",
			title: "Inversor no enciende",
			description: "El inversor de la planta solar reporta código de falla 104 y no genera energía.",
			status: "Open",
			priority: "High",
			category: "Hardware",
			contactId: "cont-01",
			companyId: "comp-01",
			assigneeId: userMap["support"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "tick-02",
			title: "Duda sobre facturación mensual",
			description: "El cliente solicita aclaración sobre los cargos del mes de abril por el servicio de monitoreo.",
			status: "InProgress",
			priority: "Medium",
			category: "Billing",
			contactId: "cont-02",
			companyId: "comp-02",
			assigneeId: userMap["support"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "tick-03",
			title: "Solicitud de capacitación de portal",
			description: "El equipo técnico de Eco-Energía solicita acceso al portal de administración y una videollamada de inducción.",
			status: "Resolved",
			priority: "Low",
			category: "Training",
			contactId: "cont-03",
			companyId: "comp-03",
			assigneeId: userMap["support"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const tick of tickets) {
		await db.collection("tickets").doc(tick.id).set(tick);
		console.log(`🎫 Ticket guardado: ${tick.title}`);
	}

	// 6. Actividades (Activities)
	const activities = [
		{
			id: "act-01",
			type: "Email",
			description: "Envío de cotización formal para el proyecto de paneles solares",
			contactId: "cont-01",
			dealId: "deal-01",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "act-02",
			type: "Call",
			description: "Llamada de seguimiento. El cliente indica que está revisando la propuesta con su junta directiva.",
			contactId: "cont-01",
			dealId: "deal-01",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "act-03",
			type: "Meeting",
			description: "Reunión técnica para definir detalles de la instalación de los inversores.",
			companyId: "comp-03",
			ownerId: userMap["sales"],
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const act of activities) {
		await db.collection("activities").doc(act.id).set(act);
		console.log(`📞 Actividad guardada: ${act.type} - ${act.description.substring(0, 30)}...`);
	}

	// 7. Entradas de Blog (Blog Posts)
	const blogPosts = [
		{
			id: "post-01",
			title: "La Importancia de la Energía Solar en la Industria Moderna",
			slug: "importancia-energia-solar-industria",
			excerpt: "Descubre cómo las empresas están reduciendo sus costos de energía y su huella de carbono mediante la adopción de tecnologías solares.",
			content: `La energía solar fotovoltaica se ha consolidado como una de las fuentes de energía renovable más competitivas y eficientes para el sector industrial. En este artículo, analizamos los beneficios clave de la transición energética en las empresas, incluyendo:
			
1. Reducción directa de costes operativos.
2. Independencia y estabilidad en la red eléctrica.
3. Cumplimiento de metas ESG y reducción de la huella de carbono.
4. Incentivos fiscales gubernamentales para el desarrollo sustentable.

Implementar sistemas solares es hoy en día un movimiento estratégico indispensable para mantener la competitividad a largo plazo.`,
			category: "Industrial",
			author: "Publisher User",
			image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
		{
			id: "post-02",
			title: "Mantenimiento Preventivo de Paneles Solares",
			slug: "mantenimiento-preventivo-paneles-solares",
			excerpt: "Una guía práctica para mantener la máxima eficiencia de tus instalaciones fotovoltaicas durante todo el año.",
			content: `El correcto funcionamiento de un sistema solar fotovoltaico depende en gran medida del mantenimiento periódico de los paneles e inversores. Sigue esta lista de verificación simple para maximizar el rendimiento:

- **Limpieza regular:** Remueve polvo, hojas y suciedad de la superficie del vidrio.
- **Inspección visual:** Revisa que no haya fisuras, decoloraciones o sombras persistentes sobre las celdas.
- **Monitoreo de rendimiento:** Utiliza el portal de CRM para revisar la generación diaria de energía y detectar caídas anormales de potencia.
- **Mantenimiento profesional:** Agenda revisiones técnicas del cableado e inversores al menos una vez al año.`,
			category: "Mantenimiento",
			author: "Publisher User",
			image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
			createdAt: admin.firestore.FieldValue.serverTimestamp(),
			updatedAt: admin.firestore.FieldValue.serverTimestamp(),
		},
	];

	for (const post of blogPosts) {
		await db.collection("blog_posts").doc(post.id).set(post);
		console.log(`✍️ Entrada de blog guardada: ${post.title}`);
	}
}

async function main() {
	console.log("=== INICIANDO SEEDING DE BASE DE DATOS DE PRUEBA ===");
	const userMap = await seedUsers();
	await seedCrmData(userMap);
	console.log("\n🎉 ¡Seeding completado con éxito!");
	process.exit(0);
}

main().catch((err) => {
	console.error("❌ Error en seeding:", err);
	process.exit(1);
});
