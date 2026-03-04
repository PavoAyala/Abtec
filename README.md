# 🚀 Abtec Monorepo

¡Bienvenido al ecosistema **Abtec**! Este repositorio es un monorepo híbrido que centraliza la aplicación móvil, la plataforma web y el backend escalable.

---

## 🏗️ Arquitectura del Proyecto

El proyecto está organizado para maximizar la reutilización de código y la velocidad de desarrollo:

- **`apps/mobile`**: Aplicación móvil nativa desarrollada con **Expo** (React Native) y **Expo Router**.
- **`apps/web`**: Un sub-monorepo gestionado por **Turborepo** que contiene:
  - `apps/web`: Aplicación web principal (Next.js).
  - `apps/docs`: Sitio de documentación técnica.
  - `packages/*`: Componentes UI y configuraciones compartidas.
- **`firebase`**: Infraestructura de backend:
  - **Firestore**: Base de datos NoSQL.
  - **Functions**: Lógica de servidor desarrollada en **Python**.

---

## 🛠️ Tecnologías Principales

| Categoría | Tecnología |
| :--- | :--- |
| **Mobile** | Expo, React Native, TypeScript |
| **Web** | Next.js, Turborepo, Tailwind CSS |
| **Backend** | Firebase Cloud Functions (Python), Firestore |
| **Orquestación** | Turborepo, NPM Workspaces |
| **Formateo** | Prettier, ESLint |

---

## 🚀 Inicio Rápido

Sigue estos pasos para poner en marcha tu entorno de desarrollo local:

### 1. Requisitos Previos
- Node.js (v18 o superior)
- Firebase CLI (`npm install -g firebase-tools`)
- Python (v3.10 o superior) para las funciones.

### 2. Instalación
Desde la raíz del proyecto, instala todas las dependencias:
```bash
npm install
```

### 3. Desarrollo
Inicia todos los servicios (Web, Mobile y Emuladores) con un solo comando:
```bash
npm run dev
```

O inicia servicios específicos:
- **Web**: `npm run dev --workspace=abtec-web`
- **Móvil**: `npm run dev --workspace=abtec-mobile`
- **Firebase**: `npm run firebase:dev`



---

## 🧩 LeadCMS local (CMS/CRM)

El proyecto incluye una configuración de **LeadCMS** basada en el arranque original de `Next-LeadCMS-starter`. Puedes levantar el CMS (y su base de datos PostgreSQL) junto a la web usando Docker.

1. Copia la plantilla de entorno y edita las claves en `apps/leadcms/docker-compose/.env`:
```dotenv
# valores de ejemplo – sustituye por tus credenciales
JWT__SECRET=clave-muy-larga-32+
JWT__ISSUER=leadcms-issuer
JWT__AUDIENCE=leadcms-audience

DEFAULTUSERS__0__USERNAME=admin
DEFAULTUSERS__0__PASSWORD=admin

POSTGRES__SERVER=postgres          # o tu endpoint Neon, sin "-pooler"
POSTGRES__PORT=5432
POSTGRES__USERNAME=postgres
POSTGRES__PASSWORD=secret
POSTGRES__DATABASE=LeadCMS

CORS__ALLOWEDORIGINS__0=http://localhost:8080
CORS__ALLOWEDORIGINS__1=http://localhost:3000
```

2. El servicio LeadCMS en Docker se expone como **`Abtec-LeadCMS`** y el Postgres como **`Abtec-LeadCMS-postgres`**. Esto ya está configurado en `apps/leadcms/docker-compose/docker-compose.yml`.

3. Si deseas orquestar también la web desde la raíz, usa el archivo `docker-compose.yml` en la raíz del repositorio. Levanta todo con:
```powershell
# desde la raíz del repo
docker compose up -d
```

   - `http://localhost:8080` → LeadCMS admin (usuario `admin` / contraseña según .env).
   - `http://localhost:3000` → web pública Next.js que consume LeadCMS.

4. Para levantar únicamente el CMS (sin web) puedes ejecutar:
```powershell
cd apps/leadcms/docker-compose
docker compose up -d
```

5. Cuando trabajes sin Docker en la web, configura `apps/web/.env` apuntando a la URL/clave del CMS:
```dotenv
LEADCMS_URL=http://Abtec-LeadCMS:80
LEADCMS_API_KEY=<mismo JWT__SECRET>
```

> ⚠️ **Importante**: nunca uses un host Neon con `-pooler` en `POSTGRES__SERVER`, ya que puede producir bloqueos de advisory locks.
>
> ❗ **Si cambias entre Neon y clave local**, recuerda que el contenedor PostgreSQL conserva su volumen `postgres-data` y carga la configuración inicial que tuvo la primera vez que se creó. Si el usuario/contraseña no coincide con el valor actual de `.env` verás errores `password authentication failed` o `role "postgres" does not exist`.
>   * Solución rápida: elimina el volumen antes de reiniciar el stack:
>     ```powershell
>     docker compose down -v    # borra datos de Postgres
>     docker compose up -d      # volver a levantar con las nuevas credenciales
>     ```
>   * Alternativa: cambia el `.env` para usar el mismo usuario/clave que ya existe en el volumen, o crea la rol manualmente dentro de la BD.

---

## 📜 Scripts Disponibles

Ejecuta estos comandos desde la raíz:

- `npm run dev`: Inicia el desarrollo en todo el monorepo.
- `npm run build`: Compila todas las aplicaciones para producción.
- `npm run lint`: Ejecuta el análisis de código en todo el proyecto.
- `npm run format`: Formatea automáticamente todos los archivos (`.ts`, `.tsx`, `.py`, `.json`, etc).
- `npm run firebase:dev`: Inicia los emuladores locales de Firebase (Firestore + Auth + Functions).

---

Desarrollado con ❤️ para el equipo de **Abtec**.