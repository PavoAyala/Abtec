# Abtec Monorepo

Abtec ecosystem monorepo. The current state of the repository revolves around four active surfaces:

- `CRM/`: Internal CRM for commercial and after-sales operations.
- `apps/web`: Public site and customer web portal.
- `apps/mobile`: Customer mobile application with Expo.
- `apps/firebase`: Firebase backend and configuration.

## Current Architecture

Current structure decision: the internal CRM is kept in `CRM/` during the MVP. A future migration to `apps/crm/` is not considered a cosmetic change; it will require a controlled refactor of the workspace, scripts, CI, and documentation.

### `CRM/`

Independent Next.js application for internal team use.

- Operational dashboard.
- Modules for `contacts`, `companies`, `deals`, `tickets`, and `activities`.
- Firebase connection for data and authentication.
- Runs locally on port `3001`.

### `apps/web`

Next.js application for the external web experience.

- Public landing page.
- Base for authenticated customer portal.
- Integration with Firebase Auth, Firestore, and Analytics.
- Runs locally on port `3000`.

### `apps/mobile`

Expo / React Native application for customers.

- Functional scaffold with Expo Router.
- Shares the functional domain with the web portal.
- Starting point for customer login, profile, and tickets.

### `apps/firebase`

Firebase backend and configuration for the project.

- `firebase.json` for emulators and local deployment.
- `functions/` with Cloud Functions in TypeScript.
- Firestore rules and indexes.

### `packages/*`

Shared packages for UI and monorepo configurations.

## Structure

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

## Requirements

- Node.js 20.x
- pnpm 8.x
- Firebase CLI for emulators and local deployments
- Expo CLI or equivalent tools if working in `apps/mobile`

## Installation

From the root:

```bash
pnpm install
```

## Local Development

### Monorepo

```bash
pnpm dev
```

This command starts the projects currently configured in Turbo:

- `apps/web`
- `CRM/`

### Public Web

```bash
pnpm --filter web dev
```

### Internal CRM

```bash
pnpm --filter abtec-crm dev
```

### Mobile

```bash
pnpm --filter abtec-mobil start
```

### Firebase Emulators

```bash
pnpm firebase:dev
```

Additional options:

- `pnpm firebase:dev:import`
- `pnpm firebase:dev:ui`

## Environment Variables

### Root

The repo root already contains public Firebase variables in [`.env`](.env). They are used as a common reference for the project.

### `apps/web`

The web app uses `NEXT_PUBLIC_FIREBASE_*` variables and can connect to emulators with:

```dotenv
NEXT_PUBLIC_USE_FIREBASE_EMULATORS=false
```

The current template lives in [`apps/web/.env`](apps/web/.env).

### `CRM/`

The CRM uses the same set of public Firebase variables in `CRM/.env.local`.

## Docker

Currently, the main repo workflow does not depend on containers as a mandatory part of development.

- `docker-compose.yml` is kept only as a placeholder for future orchestration.
- Active development is done using `pnpm` and Firebase emulators.

## Useful Scripts

- `pnpm dev`: starts `apps/web` and `CRM/`.
- `pnpm build`: builds the monorepo packages.
- `pnpm lint`: runs linting on configured projects.
- `pnpm format`: formats supported files.
- `pnpm firebase:dev`: starts Firebase emulators.

## Related Documentation

- [PLAN.md](PLAN.md)
- [CRM.md](CRM.md)
