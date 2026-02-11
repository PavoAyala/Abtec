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

## 📜 Scripts Disponibles

Ejecuta estos comandos desde la raíz:

- `npm run dev`: Inicia el desarrollo en todo el monorepo.
- `npm run build`: Compila todas las aplicaciones para producción.
- `npm run lint`: Ejecuta el análisis de código en todo el proyecto.
- `npm run format`: Formatea automáticamente todos los archivos (`.ts`, `.tsx`, `.py`, `.json`, etc).
- `npm run firebase:dev`: Inicia los emuladores locales de Firebase (Firestore + Auth + Functions).

---

Desarrollado con ❤️ para el equipo de **Abtec**.