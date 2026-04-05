# Abtec CRM - Estado del Proyecto

> Sistema CRM + Postventa basado en Firebase, inspirado en flujos de CRM modernos.

---

## 1. Módulos del Sistema

### 1.1 CRM de Ventas

- [x] **Gestión de Contactos**
  - Datos básicos (nombre, email, teléfono, empresa)
  - Custom fields editables
  - Historial de actividades por contacto
  - ~~Importación/exportación CSV~~
  - ~~Segmentación por tags y filtros~~
  - ✅ Lifecycle stages (subscriber, lead, mql, sql, opportunity, customer)
  - ✅ Lead score automático

- [x] **Gestión de Empresas/Cuentas**
  - Datos de empresa (nombre, industria, tamaño, website)
  - ~~Múltiples contactos por empresa~~
  - ~~Score/valoración del cliente~~

- [x] **Pipeline de Deals/Oportunidades**
  - Kanban visual por etapas
  - Etapas: Lead, Proposal, Negotiation, Won, Lost
  - Valor de deal, probabilidad
  - ~~Fecha esperada~~
  - ~~Deals perdidos con motivo de pérdida~~
  - ✅ Integración básica con contactos

- [x] **Actividades y Tareas**
  - Tareas con fecha límite
  - Tipos: Call, Email, Meeting, Note, Task
  - ~~Recordatorios automáticos~~
  - ✅ Feed de actividad chronological
  - ✅ Completar tareas

- [ ] **Secuencias de Email (Email Marketing)**
  - ~~Plantillas de email~~
  - ~~Secuencias automatizadas~~
  - ~~Tracking de aperturas y clicks~~
  - ~~Cadencias de seguimiento~~

- [ ] **Cotizaciones**
  - ~~Generar cotizaciones PDF~~
  - ~~Historial de cotizaciones~~
  - ~~Estados: Borrador, Enviada, Aceptada, Rechazada~~

### 1.2 CRM de Postventa/Soporte

- [x] **Sistema de Tickets**
  - Estados: Open, InProgress, Resolved, Closed
  - Prioridades: Low, Medium, High, Critical
  - Categorías/Tipos de ticket
  - ~~Asignación a agentes~~
  - ✅ SLA con tiempos de respuesta automáticos (4h, 24h, 48h, 72h por prioridad)
  - ~~Satisfacción del cliente~~

- [ ] **Base de Conocimiento**
  - ~~Artículos organizados por categorías~~
  - ~~Búsqueda full-text~~
  - ~~Artículos públicos e internos~~
  - ~~Versionado de artículos~~

- [ ] **Satisfacción del Cliente (CSAT/NPS)**
  - ~~Encuestas post-resolución de ticket~~
  - ~~Encuestas NPS periódicas~~
  - ~~Dashboard de satisfacción~~

- [ ] **Gestión de Contratos**
  - ~~Vinculación ticket-contrato~~
  - ~~Renovaciones automáticas提醒~~
  - ~~Documentos adjuntos~~

### 1.3 Automatizaciones y Workflows

- [x] **Workflows/Automatizaciones** (Cloud Functions)
  - ✅ `onContactCreated` - Asignar owner (round-robin), inicializar lead score
  - ✅ `onContactUpdated` - Actualizar score según lifecycle stage
  - ✅ `onDealCreated` - Inicializar probabilidad según etapa
  - ✅ `onDealStageChanged` - Actualizar probabilidad, crear actividad
  - ✅ `onTicketCreated` - Asignar SLA, round-robin assignee
  - ✅ `onTicketStatusChanged` - Registrar resolvedAt
  - ✅ `onCompanyCreated/Updated` - Audit log
  - ✅ `checkSlaDeadlines` - Función programada (cada 15 min)
  - ✅ `checkOverdueTasks` - Función programada (cada 60 min)
  - ~~Enviar email automático~~
  - ~~Crear tarea automática~~
  - ~~Condiciones y bifurcaciones avanzadas~~

- [x] **Score de Leads/Clientes**
  - ✅ Scoring automático basado en lifecycle stage
  - ~~Behavioral scoring~~
  - ✅ Lead lifecycle stages

### 1.4 Reportes y Analytics

- [x] **Dashboards**
  - ✅ Total contactos, deals, tickets
  - ✅ Pipeline value
  - ✅ Tickets abiertos
  - ~~Win rate, avg deal size, sales cycle~~
  - ~~Postventa: tiempo resolución, CSAT~~
  - ~~Actividad: emails, llamadas, reuniones~~

- [ ] **Reportes**
  - ~~Reportes configurables~~
  - ~~Exportación a PDF/CSV~~
  - ~~Scheduled reports~~

---

## 2. Modelo de Datos (Firestore) ✅

```
/companies/{companyId}
  - name, industry, size, website, createdAt

/contacts/{contactId}
  - name, email, phone, companyId, tags[], customFields{}
  - lifecycleStage, leadScore, ownerId
  - createdAt, updatedAt

/deals/{dealId}
  - title, value, currency, stage, probability
  - contactId, companyId, ownerId
  - expectedCloseDate, lostReason
  - createdAt, updatedAt

/activities/{activityId}
  - type (call, email, meeting, note, task)
  - contactId, dealId, companyId, ticketId
  - description, dueDate, completedAt
  - ownerId, createdAt

/tickets/{ticketId}
  - title, description, status, priority, category
  - contactId, companyId, assigneeId
  - slaDeadline, resolvedAt
  - satisfactionRating
  - createdAt, updatedAt

/users/{userId}
  - name, email, role, isActive
  - createdAt, updatedAt

/auditLog/{logId}
  - userId, action, collection, documentId
  - changes{}, timestamp
```

---

## 3. Cloud Functions (TypeScript) ✅

### 3.1 Triggers Firestore
- ✅ `onContactCreated` - Round-robin owner, inicializar score
- ✅ `onContactUpdated` - Update score por lifecycle stage
- ✅ `onDealCreated` - Inicializar probabilidad
- ✅ `onDealStageChanged` - Update probabilidad, actividad, sync contact
- ✅ `onDealUpdated` - Audit log
- ✅ `onTicketCreated` - SLA dinámico, round-robin assignee
- ✅ `onTicketStatusChanged` - resolvedAt, actividad
- ✅ `onTicketUpdated` - Audit log
- ✅ `onCompanyCreated` - Audit log
- ✅ `onCompanyUpdated` - Audit log

### 3.2 Funciones Programadas (v2)
- ✅ `checkSlaDeadlines` - Cada 15 min
- ✅ `checkOverdueTasks` - Cada 60 min

### 3.3 Pendiente
- ~~Funciones de Email (sendgrid/resend)~~
- ~~Notificaciones push~~
- ~~Scheduled workflows~~

---

## 4. Autenticación y Permisos ✅ Parcial

- [x] Firebase Auth configurado
- [x] Modelo User con roles
- [ ] ~~Firestore Security Rules con validación de roles~~
- [ ] ~~Login/Logout UI~~
- [ ] ~~Protección de rutas~~

---

## 5. Frontend (Apps)

### 5.1 Web App (Next.js) ✅
- ✅ Dashboard principal con stats
- ✅ Contactos (lectura)
- ✅ Empresas (lectura)
- ✅ Deals Pipeline (Kanban, lectura)
- ✅ Tickets (lectura)
- ✅ Actividades (CRUD básico)
- ✅ Settings page
- ✅ SWR para cache y rendimiento
- ~~CRUD completo con formularios~~
- ~~Filtros y búsqueda~~
- ~~Edición inline~~
- ~~Drag & drop en pipeline~~

### 5.2 Mobile App (Expo) ❌
- ~~Vista de tareas del día~~
- ~~Crear/ver tickets~~
- ~~Log de actividades rápidas~~
- ~~Notificaciones push~~

---

## 6. Integraciones

- [ ] WhatsApp Business API
- [ ] Zapier/Make integration
- [ ] Webhooks outbound
- [ ] API REST pública
- [ ] Google Calendar sync
- [ ] Google Meet integration
- [ ] Email (SendGrid/Resend)

---

## 7. Seguridad (Firestore)

- ✅ `firestore.rules` creado con roles
- ✅ `firestore.indexes.json` con 17 índices
- [ ] Validar reglas en entorno de producción

---

## Resumen de Estado

| Componente | Estado |
|------------|--------|
| Modelos de datos | ✅ Listos |
| Cloud Functions (Triggers) | ✅ Listos |
| Cloud Functions (Scheduled) | ✅ Listos |
| Web App (Básico) | ✅ Listo |
| Web App (Completo) | 🔄 Parcial |
| Auth/Seguridad | ⚠️ Parcial |
| Mobile App | ❌ Pendiente |
| Email/SMS | ❌ Pendiente |
| Knowledge Base | ❌ Pendiente |
| Reportes avanzados | ❌ Pendiente |
| Integraciones | ❌ Pendiente |

---

*Documento actualizado: 2026-03-22*
