import { DealStage, TicketPriority, TicketStatus, ActivityType, UserRole, LifecycleStage } from "@/types";

export const LIFECYCLE_LABELS: Record<LifecycleStage, string> = {
	[LifecycleStage.Subscriber]: "Suscriptor",
	[LifecycleStage.Lead]: "Prospecto",
	[LifecycleStage.MQL]: "Lead Calificado (Marketing)",
	[LifecycleStage.SQL]: "Lead Calificado (Ventas)",
	[LifecycleStage.Opportunity]: "Oportunidad",
	[LifecycleStage.Customer]: "Cliente",
	[LifecycleStage.Lost]: "Perdido",
};

export const DEAL_STAGE_LABELS: Record<DealStage, string> = {
	[DealStage.Lead]: "Prospecto",
	[DealStage.Proposal]: "Propuesta",
	[DealStage.Negotiation]: "Negociación",
	[DealStage.Won]: "Ganado",
	[DealStage.Lost]: "Perdido",
};

export const TICKET_PRIORITY_LABELS: Record<TicketPriority, string> = {
	[TicketPriority.Low]: "Baja",
	[TicketPriority.Medium]: "Media",
	[TicketPriority.High]: "Alta",
	[TicketPriority.Critical]: "Crítica",
};

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
	[TicketStatus.Open]: "Abierto",
	[TicketStatus.InProgress]: "En Progreso",
	[TicketStatus.Resolved]: "Resuelto",
	[TicketStatus.Closed]: "Cerrado",
};

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
	[ActivityType.Call]: "Llamada",
	[ActivityType.Email]: "Correo",
	[ActivityType.Meeting]: "Reunión",
	[ActivityType.Note]: "Nota",
	[ActivityType.Task]: "Tarea",
};
