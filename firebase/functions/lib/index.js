"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const express = require("express");
const cors = require("cors");
// 1. Inicializar Firebase Admin (para conectar a la BD)
admin.initializeApp();
// 2. Configurar Express (reemplazo de FastAPI)
const app = express();
// Configurar CORS (Vital para que Vercel y Expo se conecten)
app.use(cors({ origin: true }));
// --- TUS RUTAS DE API ---
app.get("/", (req, res) => {
    res.json({ mensaje: "¡Hola! La API con Express en Firebase está funcionando." });
});
app.get("/items/:itemId", (req, res) => {
    const itemId = req.params.itemId;
    res.json({ item_id: itemId, descripcion: "Ejemplo de dato dinámico" });
});
// Ejemplo de lectura de base de datos
app.get("/usuarios/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        const db = admin.firestore();
        const docRef = db.collection("users").doc(uid);
        const doc = await docRef.get();
        if (doc.exists) {
            res.json(doc.data());
        }
        else {
            res.status(404).json({ detail: "Usuario no encontrado" });
        }
    }
    catch (error) {
        logger.error("Error al obtener usuario:", error);
        res.status(500).json({ detail: "Error interno del servidor" });
    }
});
// -----------------------
// 4. Exponer la función a Firebase
// Nota: Llamamos a la función 'api'. Tu URL final terminará en /api
exports.api = (0, https_1.onRequest)({
    maxInstances: 10,
    region: "us-east1" // Asegúrate que coincida con tu proyecto
}, app);
//# sourceMappingURL=index.js.map