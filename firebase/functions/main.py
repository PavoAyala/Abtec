from firebase_functions import https_fn, options
from firebase_admin import initialize_app, firestore
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from a2wsgi import ASGIMiddleware

# 1. Inicializar Firebase Admin (para conectar a la BD)
initialize_app()

# 2. Configurar FastAPI
app = FastAPI(title="API Backend Tecmilenio")

# Configurar CORS (Vital para que Vercel y Expo se conecten)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # En producción cambia esto por las URLs reales de Vercel
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- TUS RUTAS DE API ---

@app.get("/")
def leer_raiz():
    return {"mensaje": "¡Hola! La API con FastAPI en Firebase está funcionando."}

@app.get("/items/{item_id}")
def leer_item(item_id: int):
    return {"item_id": item_id, "descripcion": "Ejemplo de dato dinámico"}

# Ejemplo de lectura de base de datos
@app.get("/usuarios/{uid}")
def obtener_usuario(uid: str):
    db = firestore.client()
    doc_ref = db.collection("users").document(uid)
    doc = doc_ref.get()
    if doc.exists:
        return doc.to_dict()
    raise HTTPException(status_code=404, detail="Usuario no encontrado")

# -----------------------

# 3. EL PUENTE (Adapter)
# Convertimos la app asíncrona de FastAPI en una app WSGI que Firebase entienda.
wsgi_app = ASGIMiddleware(app)

# 4. Exponer la función a Firebase
# Nota: Llamamos a la función 'api'. Tu URL final terminará en /api
@https_fn.on_request(
    max_instances=10,
    region="us-east1" # Asegúrate que coincida con tu proyecto
)
def api(req: https_fn.Request) -> https_fn.Response:
    # Este método mágico pasa la petición de Firebase a FastAPI
    return https_fn.Response.from_app(wsgi_app, req.environ)