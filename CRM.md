# Abtec CRM - Propuesta de Funcionalidades

> Sistema CRM + Postventa basado en Firebase, inspirado en LeadCMS y HubSpot.

---

## 1. Módulos del Sistema

### 1.1 CRM de Ventas
- [ ] **Gestión de Contactos**
  - Datos básicos (nombre, email, teléfono, empresa)
  - Custom fields editables
  - Historial de actividades por contacto
  - Importación/exportación CSV
  - Segmentation por tags y filtros

- [ ] **Gestión de Empresas/Cuentas**
  - Datos de empresa (nombre, industria, tamaño, revenue)
  - Múltiples contactos por empresa
  - Score/valoración del cliente

- [ ] **Pipeline de Deals/Oportunidades**
  - Kanban visual (LeadCMS style)
  - Etapas configurables
  - Valor de deal, probabilidad, fecha esperada
  - Deals perdidos con motivo de pérdida
  - Integración con contactos/empresas

- [ ] **Actividades y Tareas**
  - Tareas con fecha límite y asignaciones
  - Tipos: Llamada, Email, Reunión, Nota, Tarea
  - Recordatorios automáticos
  - Feed de actividad chronological

- [ ] **Secuencias de Email (Email Marketing)**
  - Plantillas de email
  - Secuencias automatizadas
  - Tracking de aperturas y clicks
  - Cadencias de seguimiento

- [ ] **Cotizaciones**
  - Generar cotizaciones PDF
  - Historial de cotizaciones
  - Estados: Borrador, Enviada, Aceptada, Rechazada

### 1.2 CRM de Postventa/Soporte

- [ ] **Sistema de Tickets**
  - Estados: Abierto, En Progreso, Resuelto, Cerrado
  - Prioridades: Baja, Media, Alta, Crítica
  - Categorías/Tipos de ticket
  - Asignación a agentes
  - SLA (Service Level Agreement) con tiempos de respuesta

- [ ] **Base de Conocimiento**
  - Artículos organizados por categorías
  - Búsqueda full-text
  - Artículos públicos e internos
  - Versionado de artículos

- [ ] **Satisfacción del Cliente (CSAT/NPS)**
  - Encuestas post-resolución de ticket
  - Encuestas NPS periódicas
  - Dashboard de satisfacción

- [ ] **Gestión de Contratos**
  - Vinculación ticket-contrato
  - Renovaciones automáticas提醒
  - Documentos adjuntos

### 1.3 Automatizaciones y Workflows

- [ ] **Workflows/Automatizaciones**
  - Triggers: nuevo contacto, deal stage changed, ticket creado, etc.
  - Acciones: enviar email, asignar tarea, actualizar campo, etc.
  - Condiciones y bifurcaciones

- [ ] **Score de Leads/Clientes**
  - Scoring automático basado en actividades
  - behavioral scoring
  - Lead lifecycle stages

### 1.4 Reportes y Analytics

- [ ] **Dashboards**
  - Ventas: pipeline value, win rate, avg deal size, sales cycle
  - Postventa: tickets abiertos, tiempo resolución, CSAT
  - Actividad: emails enviados, llamadas, reuniones

- [ ] **Reportes**
  - Reportes configurables
  - Exportación a PDF/CSV
  - Scheduled reports (envío por email)

---

## 2. Modelo de Datos (Firestore)

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
  - contactId, dealId, companyId
  - description, dueDate, completedAt
  - ownerId, createdAt

/tickets/{ticketId}
  - title, description, status, priority, category
  - contactId, companyId, assigneeId
  - slaDeadline, resolvedAt
  - satisfactionRating
  - createdAt, updatedAt

/knowledgeBase/{articleId}
  - title, content, categoryId, slug
  - isPublished, isInternal
  - createdAt, updatedAt

/workflows/{workflowId}
  - name, trigger, conditions[], actions[]
  - isActive, createdAt

/reports/{reportId}
  - name, type, config{}, schedule
  - createdAt, ownerId
```

---

## 3. Cloud Functions (Python) - Propuestas

### 3.1 Funciones de Automatización
- `onContactCreated` - Asignar owner, agregar a secuencia
- `onDealStageChanged` - Notificar, actualizar metrics
- `onTicketCreated` - Asignar por round-robin, verificar SLA
- `onTicketResolved` - Enviar encuesta CSAT
- `scheduledWorkflows` - Ejecutar workflows cada X minutos
- `calculateLeadScore` - Recalcular score basado en actividades

### 3.2 Funciones de Integridad
- `aggregateCompanyMetrics` - Stats para dashboards
- `cleanupOldActivities` - Archivar actividades > 1 año
- `sendFollowUpReminders` - Tareas próximas a vencer

### 3.3 Funciones de Email
- `sendSequenceEmails` - Procesar secuencias pendientes
- `processEmailWebhook` - Tracking opens/clicks
- `sendSatisfactionSurvey` - Post-resolución ticket

---

## 4. Autenticación y Permisos

- Firebase Auth con email/password
- Roles: Admin, Manager, Sales, Support, Viewer
- Permisos granulares por módulo
- Log de auditoría de cambios

---

## 5. Frontend (Apps)

### 5.1 Web App (Next.js)
- Dashboard principal
- Vistas de: Contactos, Empresas, Deals, Tickets, KB
- Kanban de Pipeline
- Configuración de workflows
- Reportes y Analytics

### 5.2 Mobile App (Expo)
- Vista de tareas del día
- Crear/ver tickets
- Log de actividades rápidas
- Notificaciones push

---

## 6. Integraciones Futuras

- [ ] WhatsApp Business API
- [ ] Zapier/Make integration
- [ ] Webhooks outbound
- [ ] API REST pública
- [ ] Google Calendar sync
- [ ] Google Meet integration

---

## 7. Roadmap Tentativo

| Fase | Módulo | Prioridad |
|------|--------|-----------|
| 1 | Contacts + Companies + Auth | Alta |
| 2 | Deals Pipeline + Activities | Alta |
| 3 | Tickets + CSAT | Alta |
| 4 | Automatizaciones + Workflows | Media |
| 5 | Knowledge Base | Media |
| 6 | Reports + Dashboards | Media |
| 7 | Email Sequences | Baja |
| 8 | Mobile App | Baja |

---

*Documento vivo - modificar según necesidades del negocio.*

## 8. Consideraciones Técnicas

Al momento de crear la carpeta firebase, se debe tener en cuenta que se debe crear un proyecto en firebase y configurarlo con las credenciales correspondientes.

Ademas la carpeta donde ira Firebase, es separada a la del CRM, por lo que van a existir dos carpetas con el mismo nombre en el proyecto, una para el CRM y otra para Firebase.