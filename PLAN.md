# Plan de Ejecucion - Abtec CRM + Postventa

> Roadmap tecnico y de producto alineado con el estado real del repo al 2026-04-04.
> Objetivo: consolidar el CRM actual en Firebase y entregar un MVP funcional de postventa para clientes.

---

## 1. Estado real del proyecto

### Ya existe

- CRM interno en `CRM/` con vistas basicas para `contacts`, `companies`, `deals`, `tickets`, `activities` y dashboard.
- Backend Firebase en `apps/firebase/` con:
  - Firestore rules
  - Firestore indexes
  - Cloud Functions para `contacts`, `companies`, `deals`, `tickets`
  - Funciones programadas para SLA
- `apps/web` ya cumple doble funcion:
  - sitio publico / landing
  - portal web de cliente
- Monorepo con `apps/web`, `apps/mobile`, `apps/firebase/functions`, `CRM`, `packages/*`.

### No existe o esta incompleto

- App movil de clientes: hoy sigue practicamente como scaffold de Expo.
- Flujo real de autenticacion para agentes y clientes.
- Proteccion de rutas en CRM.
- CRUD completo en el CRM.
- Modelo de postventa para `customers`, `contracts`, `warranties`, `installations`.
- RTDB y reglas de RTDB.
- Reportes avanzados.

### Desalineaciones actuales del repo

- Persisten referencias a LeadCMS en `README.md` y `docker-compose.yml`.
- El CRM vive en `CRM/`, no en `apps/crm/`.
- `apps/web` y `CRM` usan stacks distintos de Next/React.
- La documentacion raiz no representa con precision el estado actual del sistema.

---

## 2. Objetivo del MVP

Entregar una primera version operativa donde:

- El equipo interno gestiona ventas y postventa desde el CRM actual.
- Existe un modelo de cliente final separado de `contacts`.
- Un cliente autenticado puede entrar tanto desde web como desde mobile.
- Un cliente autenticado puede ver su perfil, sus tickets y crear tickets.
- El CRM puede relacionar clientes, tickets, contratos, garantias e instalaciones.
- Las reglas de seguridad impiden que un cliente vea informacion de otros clientes.

### Canales del MVP cliente

- Portal cliente web en `apps/web`
- App movil cliente en `apps/mobile`

Ambos canales deben compartir el mismo dominio, permisos y flujos principales.

### Fuera del MVP

- Chat en vivo.
- Presencia de agentes.
- WhatsApp Business API.
- Reporteria avanzada.
- Knowledge base.
- Integraciones externas.

---

## 3. Principios de arquitectura

### Fuente de verdad

- Firestore sera la base principal para datos operativos.
- Firebase Auth manejara identidades de agentes y clientes.
- RTDB no entra al MVP salvo que una necesidad concreta de tiempo real lo justifique.

### Separacion de dominios

- `contacts`: leads/contactos comerciales del CRM.
- `customers`: cliente final con acceso a portal web y app movil.
- Un `contact` puede convertirse en `customer`, pero no deben mezclarse como si fueran la misma entidad.

### Prioridad tecnica

- Primero seguridad, modelo de datos y flujos base.
- Despues experiencia de cliente.
- RTDB, chat y analytics quedan para una segunda etapa.

---

## 4. Flujo del ecosistema

```text
┌──────────────────────┐      ┌──────────────────────┐      ┌──────────────────────┐
│   CRM Interno        │      │  Portal Cliente Web  │      │   App Movil Cliente  │
│   `CRM/`             │      │   `apps/web`         │      │   `apps/mobile`      │
│                      │      │                      │      │                      │
│ - Ventas             │      │ - Login cliente      │      │ - Login cliente      │
│ - Deals              │      │ - Perfil             │      │ - Perfil             │
│ - Tickets            │◄────►│ - Mis tickets        │◄────►│ - Mis tickets        │
│ - Customers          │Firebase - Crear ticket     │Firebase - Crear ticket     │
│ - Contracts          │      │ - Estado de ticket   │      │ - Estado de ticket   │
│ - Warranties         │      │                      │      │                      │
│ - Installations      │      │                      │      │                      │
└──────────┬───────────┘      └──────────┬───────────┘      └──────────┬───────────┘
           │                             │                             │
           └───────────────┬─────────────┴─────────────┬───────────────┘
                           │                           │
                    ┌──────▼───────────────────────────▼──────┐
                    │            Firebase Backend               │
                    │                                           │
                    │ - Firebase Auth                           │
                    │ - Firestore                               │
                    │ - Cloud Functions                         │
                    │ - RTDB solo si el caso lo justifica       │
                    └───────────────────────────────────────────┘
```

### Lectura operativa

- `CRM/` es la superficie interna de operacion.
- `apps/web` tiene dos zonas:
  - landing publica
  - portal autenticado de cliente
- `apps/mobile` replica el flujo principal del portal cliente.
- Firebase centraliza identidad, permisos, datos y automatizaciones.

---

## 5. Estructura objetivo del proyecto

```text
abtec/
├── apps/
│   ├── firebase/
│   │   ├── firebase.json
│   │   ├── firestore.rules
│   │   ├── firestore.indexes.json
│   │   ├── database.rules.json         # solo si RTDB entra formalmente
│   │   └── functions/
│   │       └── src/
│   │           ├── config/
│   │           ├── models/
│   │           │   ├── Contact.ts
│   │           │   ├── Company.ts
│   │           │   ├── Deal.ts
│   │           │   ├── Ticket.ts
│   │           │   ├── Customer.ts
│   │           │   ├── Contract.ts
│   │           │   ├── Warranty.ts
│   │           │   └── Installation.ts
│   │           ├── triggers/
│   │           └── scheduled/
│   ├── mobile/
│   │   ├── app/
│   │   ├── components/
│   │   ├── hooks/
│   │   └── package.json
│   └── web/
│       ├── app/
│       │   ├── (public)/               # landing y contenido publico
│       │   └── (client)/               # portal autenticado de cliente
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       └── package.json
├── CRM/                                # CRM interno actual
│   ├── app/
│   ├── lib/
│   ├── types/
│   └── package.json
├── packages/
│   ├── ui/
│   ├── eslint-config/
│   └── typescript-config/
├── CRM.md
├── PLAN.md
├── README.md
├── package.json
├── turbo.json
└── pnpm-workspace.yaml
```

### Nota de estructura

- Mientras no se haga una migracion real, el CRM sigue en `CRM/`.
- Si despues se decide moverlo a `apps/crm/`, eso debe tratarse como refactor controlado, no como cambio cosmético.
- En `apps/web` conviene separar explicitamente lo publico de lo autenticado para evitar mezclar landing y portal cliente.

### Decision formal sobre ubicacion del CRM

- Decision vigente: `CRM/` se mantiene en la raiz del repo durante el MVP.
- Alcance de la decision: no se migra a `apps/crm/` en esta etapa.
- Criterio principal:
  - moverlo hoy no cambia capacidades de producto, seguridad, datos ni despliegue;
  - si se hiciera ahora, introduciria churn en workspace, rutas, scripts, CI y documentacion sin reducir riesgo operativo del MVP;
  - el CRM actual ya esta integrado al monorepo via `package.json`, `pnpm-workspace.yaml` y Turbo sin bloqueo tecnico inmediato.
- Impacto tecnico:
  - se conserva `CRM/` como convencion estable del monorepo;
  - no se requieren cambios en `package.json`, `pnpm-workspace.yaml` ni `turbo.json`;
  - cualquier futura migracion a `apps/crm/` debe tratarse como refactor controlado con actualizacion coordinada de imports, scripts, CI, paths y documentacion.

---

## 6. Modelo de datos objetivo

### Existentes

| Coleccion | Uso | Estado |
| --- | --- | --- |
| `users` | Agentes y admins del CRM | Existente |
| `contacts` | Leads y contactos comerciales | Existente |
| `companies` | Empresas | Existente |
| `deals` | Pipeline comercial | Existente |
| `activities` | Actividades y seguimiento | Existente |
| `tickets` | Soporte y postventa | Existente |
| `auditLog` | Auditoria | Existente |

### Nuevas para postventa

| Coleccion | Uso | Estado |
| --- | --- | --- |
| `customers` | Perfil del cliente final con acceso autenticado | Nueva |
| `contracts` | Contratos de mantenimiento o monitoreo | Nueva |
| `warranties` | Garantias por instalacion o componente | Nueva |
| `installations` | Sistemas instalados en sitio del cliente | Nueva |

### Nuevas para reportes

| Coleccion | Uso | Estado |
| --- | --- | --- |
| `reports_daily` | Resumen operativo diario | Futuro |
| `reports_monthly` | Resumen mensual | Futuro |

### Relacion entre entidades

- `contact` puede originar un `deal`.
- `customer` representa al usuario final autenticable.
- `customer` puede tener muchos `tickets`.
- `customer` puede tener muchas `installations`.
- `customer` puede tener muchos `contracts`.
- `installation` puede tener muchas `warranties`.
- `ticket` puede referenciar `customerId`, y opcionalmente `contactId` o `companyId` si nacio desde el CRM.

---

## 7. Esquemas minimos sugeridos

### `customers`

```ts
{
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone?: string;
  authUid: string;
  contactId?: string;
  companyId?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  status: 'active' | 'inactive';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `contracts`

```ts
{
  customerId: string;
  installationId?: string;
  type: 'maintenance' | 'monitoring' | 'full-service';
  status: 'active' | 'expired' | 'cancelled' | 'pending';
  startDate: Timestamp;
  endDate?: Timestamp;
  monthlyPrice?: number;
  currency?: string;
  servicesIncluded?: string[];
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `warranties`

```ts
{
  customerId: string;
  installationId: string;
  type: 'panels' | 'inverter' | 'batteries' | 'workmanship';
  status: 'active' | 'expired' | 'claimed';
  startDate: Timestamp;
  endDate: Timestamp;
  coverage?: string;
  claimHistory?: Array<{
    createdAt: Timestamp;
    notes: string;
    status: 'open' | 'resolved';
  }>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### `installations`

```ts
{
  customerId: string;
  address: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  systemSizeKw?: number;
  panelBrand?: string;
  panelModel?: string;
  panelCount?: number;
  inverterBrand?: string;
  inverterModel?: string;
  installationDate?: Timestamp;
  status: 'planned' | 'in_progress' | 'completed' | 'maintenance';
  notes?: string;
  photos?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Ajuste a `tickets`

Agregar campos:

- `customerId?: string`
- `source: 'crm' | 'mobile' | 'web'`
- `visibleToCustomer?: boolean`

---

## 8. Fases de ejecucion

## Fase 0 - Higiene del repo

Objetivo: alinear el repositorio con la realidad tecnica antes de agregar mas producto.

- [x] Eliminar referencias obsoletas a LeadCMS:
  - [x] `README.md`
  - [x] `docker-compose.yml`
  - [x] variables de entorno relacionadas
  - [x] carpeta `apps/leadcms/` si aun existe fuera del listado actual
- [x] Actualizar documentacion raiz con arquitectura real:
  - [x] `CRM/`
  - [x] `apps/web`
  - [x] `apps/mobile`
  - [x] `apps/firebase`
- [x] Decidir si `CRM/` se mantiene en raiz o se mueve a `apps/crm/`
- [x] Decision tomada: `CRM/` se mantiene en raiz durante el MVP
- [x] Si se mueve en el futuro:
  - [x] tratarlo como refactor controlado
  - [x] actualizar `package.json`
  - [x] actualizar `pnpm-workspace.yaml`
  - [x] actualizar scripts de Turbo

### Criterio de salida

- La documentacion refleja el repo real.
- No quedan referencias activas a LeadCMS en el flujo principal.

---

## Fase 1 - Seguridad y acceso

Objetivo: cerrar la base de acceso antes de abrir clientes finales.

- [ ] Implementar login/logout real para agentes en CRM.
- [ ] Proteger rutas privadas en CRM.
- [ ] Validar uso de roles actuales en `users`.
- [ ] Revisar `firestore.rules` actuales y endurecer:
  - [ ] `tickets` no debe permitir escrituras abiertas sin reglas claras de origen
  - [ ] `auditLog` debe quedar solo para system o backend
  - [ ] definir permisos por rol para colecciones nuevas
- [ ] Preparar estrategia de autenticacion para clientes:
  - [ ] email/password como opcion inicial recomendada
  - [ ] phone auth solo si hay necesidad real de negocio

### Criterio de salida

- Agentes solo entran al CRM autenticados.
- Hay una estrategia clara para autenticar clientes.
- Las reglas no exponen escrituras o lecturas mas amplias de lo necesario.

---

## Fase 2 - Dominio de postventa en Firestore

Objetivo: introducir el modelo de cliente final sin romper ventas.

- [ ] Crear modelos TypeScript en `apps/firebase/functions/src/models/`:
  - [ ] `Customer.ts`
  - [ ] `Contract.ts`
  - [ ] `Warranty.ts`
  - [ ] `Installation.ts`
- [ ] Exportarlos desde el barrel de modelos.
- [ ] Extender `tickets` para soportar `customerId` y `source`.
- [ ] Crear reglas Firestore para:
  - [ ] `customers`
  - [ ] `contracts`
  - [ ] `warranties`
  - [ ] `installations`
- [ ] Crear indexes necesarios en `firestore.indexes.json`.
- [ ] Definir proceso de conversion:
  - [ ] `contact -> customer`
  - [ ] linkage opcional con `company`

### Criterio de salida

- El backend ya entiende clientes finales y sus relaciones base.
- Las colecciones nuevas tienen modelos, reglas e indices.

---

## Fase 3 - Automatizaciones minimas

Objetivo: automatizar lo suficiente para operar, sin sobreingenieria.

- [ ] `onCustomerCreated`
  - [ ] validar consistencia de datos
  - [ ] crear auditoria
- [ ] flujo de provisioning de Auth para customer
  - [ ] decidir si lo dispara el CRM o una callable/admin flow
- [ ] extender `onTicketCreated`
  - [ ] soportar tickets creados desde mobile
  - [ ] vincular `customerId`
  - [ ] marcar `source`
- [ ] crear funciones programadas:
  - [ ] `checkExpiringWarranties`
  - [ ] `checkExpiringContracts`

### Criterio de salida

- El sistema puede crear clientes finales y tickets vinculados a ellos.
- Existen alertas basicas de vencimientos.

---

## Fase 4 - CRM operativo de postventa

Objetivo: que el equipo interno pueda trabajar todo el flujo desde CRM.

- [ ] Completar CRUD de:
  - [ ] `contacts`
  - [ ] `companies`
  - [ ] `deals`
  - [ ] `tickets`
  - [ ] `activities`
  - [ ] `customers`
  - [ ] `contracts`
  - [ ] `warranties`
  - [ ] `installations`
- [ ] Crear vista detalle de customer:
  - [ ] perfil
  - [ ] tickets
  - [ ] instalaciones
  - [ ] garantias
  - [ ] contratos
  - [ ] deals relacionados si existen
- [ ] Mejoras UX del CRM:
  - [ ] filtros
  - [ ] busqueda
  - [ ] formularios usables
  - [ ] pipeline con drag and drop solo si sigue siendo prioridad comercial

### Criterio de salida

- Un agente puede operar ventas y postventa sin salir del CRM.

---

## Fase 5 - Plataforma cliente MVP

Objetivo: entregar la primera experiencia real al cliente final en web y mobile.

### Capacidades compartidas

- [ ] modelo de sesion de cliente
- [ ] permisos por `authUid`
- [ ] consultas de datos propias del cliente
- [ ] flujo de creacion de ticket
- [ ] visibilidad de estado de ticket

### Portal cliente web (`apps/web`)

- [ ] separar claramente landing publica y area autenticada
- [ ] login
- [ ] recuperacion de sesion
- [ ] home simple
- [ ] mi perfil
- [ ] mis tickets
- [ ] detalle de ticket
- [ ] crear ticket

### App movil cliente (`apps/mobile`)

- [ ] conexion Expo + Firebase Auth + Firestore
- [ ] login
- [ ] recuperacion de sesion
- [ ] home simple
- [ ] mi perfil
- [ ] mis tickets
- [ ] detalle de ticket
- [ ] crear ticket

### Diferido

- [ ] contratos
- [ ] garantias
- [ ] instalaciones
- [ ] notificaciones push
- [ ] carga de fotos

### Criterio de salida

- Un cliente autenticado puede entrar desde web o mobile, ver sus tickets y crear uno nuevo.

---

## Fase 6 - Tiempo real y notificaciones

Objetivo: agregar realtime solo donde aporte valor inmediato.

### Prioridad alta

- [ ] Evaluar si alcanza con Firestore listeners para estado de ticket en MVP.
- [ ] Si no alcanza, introducir RTDB solo para:
  - [ ] `notifications/{userId}`
  - [ ] `ticket-status/{ticketId}`
- [ ] Crear `database.rules.json`.
- [ ] Añadir configuracion RTDB a `firebase.json`.

### Prioridad baja

- [ ] `presence/{userId}`
- [ ] `chat/{ticketId}`
- [ ] `activity-feed/{userId}`

### Criterio de salida

- Hay un canal claro de actualizacion de estado o notificacion, con la menor complejidad posible.

---

## Fase 7 - Reportes

Objetivo: medir operacion despues de cerrar el flujo transaccional.

- [ ] Integrar extensión **Stream Firestore to BigQuery** para mover carga operativa y derivarlo a BI (Looker).
- [ ] `calculateDailyReports`
- [ ] `calculateMonthlyReports`
- [ ] colecciones resumen:
  - [ ] `reports_daily`
  - [ ] `reports_monthly`
- [ ] dashboard CRM con:
  - [ ] tickets abiertos
  - [ ] tickets vencidos SLA
  - [ ] tiempo promedio de resolucion
  - [ ] pipeline value
  - [ ] win rate

### Criterio de salida

- Los indicadores dependen de datos ya estabilizados, no de supuestos.

---

## 9. Reglas de seguridad objetivo

### Firestore

| Coleccion | Lectura | Escritura |
| --- | --- | --- |
| `users` | autenticado | admin o propio con restricciones |
| `contacts` | agentes | sales/admin/owner segun rol |
| `companies` | agentes | sales/admin/owner segun rol |
| `deals` | agentes | sales/admin/owner segun rol |
| `activities` | agentes | sales/support/admin |
| `tickets` | agente asignado o roles internos; cliente solo si es suyo | soporte/admin o flujos permitidos de cliente |
| `customers` | owner o agente | agente/admin |
| `contracts` | owner o agente | agente/admin |
| `warranties` | owner o agente | agente/admin |
| `installations` | owner o agente | agente/admin |
| `auditLog` | admin/manager | backend/system |

### RTDB

Solo si entra en uso:

| Path | Lectura | Escritura |
| --- | --- | --- |
| `/notifications/{userId}` | propio | backend/system |
| `/ticket-status/{ticketId}` | owner o agente | backend/system |
| `/presence/{userId}` | autenticado | propio |
| `/chat/{ticketId}` | participantes | participantes |

---

## 10. Riesgos y decisiones pendientes

- [x] Definir si `CRM/` se renombra o se deja como esta.
  Se deja como `CRM/` durante el MVP para evitar refactor estructural sin retorno funcional inmediato.
- [ ] Definir si el CRM seguira consultando Firestore directo desde cliente o si ciertas operaciones pasaran por backend.
- [ ] Resolver convivencia entre `contacts` y `customers` para evitar duplicidad y confusion operativa.
- [ ] Decidir si contratos, garantias e instalaciones entran al MVP movil o quedan para iteracion 2.
- [ ] Validar si RTDB realmente aporta valor antes de abrir una segunda base operativa.
- [ ] Alinear versiones de Next/React si se busca consolidacion real de plataforma.
- [ ] Investigar extensiones de Firebase (ej. Trigger Email, Stripe, Search) y Google Cloud para evaluar su viabilidad y aportes al CRM antes de construir soluciones custom.

---

## 11. Orden recomendado de trabajo inmediato

### Sprint 1

- [x] Limpiar LeadCMS del repo y documentacion
- [x] Investigar extensiones de Firebase y Google Cloud aplicables al flujo comercial/CRM.
- [ ] cerrar auth y proteccion de rutas del CRM
- [ ] endurecer `firestore.rules`

### Sprint 2

- [ ] crear `customers`, `contracts`, `warranties`, `installations`
- [ ] extender `tickets` con `customerId` y `source`
- [ ] preparar CRUD basico en CRM para `customers`

### Sprint 3

- [ ] definir capacidades compartidas del cliente entre web y mobile
- [ ] habilitar portal cliente web con login + lista de tickets + crear ticket
- [ ] convertir app movil de scaffold a login + lista de tickets + crear ticket
- [ ] conectar customer auth en ambos canales
- [ ] Configurar extensión **Trigger Email from Firestore** para correos transaccionales (bienvenidas, estatus).

### Sprint 4

- [ ] detalle de customer en CRM
- [ ] vencimientos de contratos y garantias (apoyado mediante **Cloud Scheduler** y **Cloud Tasks**)
- [ ] Integrar extensión **Search with Typesense** para búsqueda global veloz en el CRM.
- [ ] Integrar extensión **Resize Images** para optimizar cargas de fotos en instalaciones.
- [ ] decidir si se agrega RTDB o si Firestore listeners bastan

---

## 12. Definicion de exito

Se considerara que esta etapa fue exitosa cuando:

- El repo ya no depende conceptualmente de LeadCMS.
- El CRM autentica agentes y protege rutas.
- Existe un dominio claro de `customer` separado de `contact`.
- Los clientes pueden autenticarse desde web y mobile y operar tickets propios.
- Los agentes pueden ver el contexto completo del cliente en CRM.
- La seguridad de Firestore refleja roles y ownership reales.

---

Documento revisado: 2026-04-04
