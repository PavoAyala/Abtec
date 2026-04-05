# Abtec Monorepo

Monorepo del ecosistema Abtec. El estado actual del repositorio gira alrededor de cuatro superficies activas:

- `CRM/`: CRM interno para operacion comercial y postventa.
- `apps/web`: sitio publico y portal web para clientes.
- `apps/mobile`: aplicacion movil de cliente con Expo.
- `apps/firebase`: backend y configuracion de Firebase.

## Arquitectura actual

Decision vigente de estructura: el CRM interno se mantiene en `CRM/` durante el MVP. Una migracion futura a `apps/crm/` no se considera cambio cosmetico; requerira un refactor controlado de workspace, scripts, CI y documentacion.

### `CRM/`

Aplicacion Next.js independiente para uso interno del equipo.

- Dashboard operativo.
- Modulos de `contacts`, `companies`, `deals`, `tickets` y `activities`.
- Conexion a Firebase para datos y autenticacion.
- Corre localmente en el puerto `3001`.

### `apps/web`

Aplicacion Next.js para la experiencia web externa.

- Landing publica.
- Base para portal autenticado de clientes.
- Integracion con Firebase Auth, Firestore y Analytics.
- Corre localmente en el puerto `3000`.

### `apps/mobile`

Aplicacion Expo / React Native para clientes.

- Scaffold funcional con Expo Router.
- Comparte el dominio funcional con el portal web.
- Punto de partida para login, perfil y tickets del cliente.

### `apps/firebase`

Backend y configuracion de Firebase del proyecto.

- `firebase.json` para emuladores y despliegue local.
- `functions/` con Cloud Functions en TypeScript.
- Reglas e indices de Firestore.

### `packages/*`

Paquetes compartidos para UI y configuraciones del monorepo.

## Estructura

```text
abtec/
├── apps/
│   ├── firebase/
│   ├── mobile/
│   └── web/
├── CRM/
├── packages/
├── CRM.md
├── PLAN.md
├── README.md
├── docker-compose.yml
├── package.json
└── turbo.json
```

## Requisitos

- Node.js 20.x
- pnpm 8.x
- Firebase CLI para emuladores y despliegues locales
- Expo CLI o herramientas equivalentes si trabajas en `apps/mobile`

## Instalacion

Desde la raiz:

```bash
pnpm install
```

## Desarrollo local

### Monorepo

```bash
pnpm dev
```

Este comando levanta los proyectos configurados actualmente en Turbo:

- `apps/web`
- `CRM/`

### Web publica

```bash
pnpm --filter web dev
```

### CRM interno

```bash
pnpm --filter abtec-crm dev
```

### Mobile

```bash
pnpm --filter abtec-mobil start
```

### Firebase emulators

```bash
pnpm firebase:dev
```

Opciones adicionales:

- `pnpm firebase:dev:import`
- `pnpm firebase:dev:ui`

## Variables de entorno

### Raiz

La raiz del repo ya contiene variables publicas de Firebase en [`.env`](.env). Se usan como referencia comun del proyecto.

### `apps/web`

La web usa variables `NEXT_PUBLIC_FIREBASE_*` y puede conectarse a emuladores con:

```dotenv
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
```

La plantilla actual vive en [`apps/web/.env`](apps/web/.env).

### `CRM/`

El CRM usa el mismo set de variables publicas de Firebase en `CRM/.env.local`.

## Docker

Actualmente el flujo principal del repo no depende de contenedores como parte obligatoria de desarrollo.

- `docker-compose.yml` se conserva solo como placeholder para orquestacion futura.
- El desarrollo activo se hace con `pnpm` y los emuladores de Firebase.

## Scripts utiles

- `pnpm dev`: inicia `apps/web` y `CRM/`.
- `pnpm build`: compila los paquetes del monorepo.
- `pnpm lint`: ejecuta lint en los proyectos configurados.
- `pnpm format`: formatea archivos soportados.
- `pnpm firebase:dev`: inicia emuladores de Firebase.

## Documentacion relacionada

- [PLAN.md](PLAN.md)
- [CRM.md](CRM.md)
