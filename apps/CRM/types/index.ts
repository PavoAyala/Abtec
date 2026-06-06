// Tipos para el CRM de Abtec

export enum DealStage {
	Lead = "Lead",
	Proposal = "Proposal",
	Negotiation = "Negotiation",
	Won = "Won",
	Lost = "Lost",
}

export enum TicketPriority {
	Low = "Low",
	Medium = "Medium",
	High = "High",
	Critical = "Critical",
}

export enum TicketStatus {
	Open = "Open",
	InProgress = "InProgress",
	Resolved = "Resolved",
	Closed = "Closed",
}

export enum ActivityType {
	Call = "Call",
	Email = "Email",
	Meeting = "Meeting",
	Note = "Note",
	Task = "Task",
}

export enum UserRole {
	Admin = "admin",
	Manager = "manager",
	Sales = "sales",
	Support = "support",
	Publisher = "publisher",
	Viewer = "viewer",
	Customer = "customer",
}

export enum LifecycleStage {
	Subscriber = "subscriber",
	Lead = "lead",
	MQL = "mql",
	SQL = "sql",
	Opportunity = "opportunity",
	Customer = "customer",
	Lost = "lost",
}

export interface Contact {
	id: string;
	name: string;
	email: string;
	phone?: string;
	companyId?: string;
	tags: string[];
	customFields: Record<string, unknown>;
	lifecycleStage: LifecycleStage;
	leadScore: number;
	ownerId?: string;
	// Detalles de Implementación / Cliente
	panelBrand?: string;
	warrantyEndDate?: Date;
	lastMaintenanceDate?: Date;
	contractUrl?: string;
	relevantInfo?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Company {
	id: string;
	name: string;
	industry: string;
	size: string;
	website?: string;
	lifecycleStage?: LifecycleStage;
	// Detalles de Implementación / Cliente
	panelBrand?: string;
	warrantyEndDate?: Date;
	lastMaintenanceDate?: Date;
	contractUrl?: string;
	relevantInfo?: string;
	createdAt: Date;
}

export interface Deal {
	id: string;
	title: string;
	value: number;
	currency: string;
	stage: DealStage;
	probability: number;
	contactId?: string;
	companyId?: string;
	ownerId?: string;
	expectedCloseDate?: Date;
	lostReason?: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Ticket {
	id: string;
	title: string;
	description: string;
	status: TicketStatus;
	priority: TicketPriority;
	category: string;
	contactId?: string;
	contactEmail?: string;
	companyId?: string;
	assigneeId?: string;
	slaDeadline?: Date;
	resolvedAt?: Date;
	satisfactionRating?: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface Activity {
	id: string;
	type: ActivityType;
	contactId?: string;
	dealId?: string;
	companyId?: string;
	ticketId?: string;
	description: string;
	dueDate?: Date;
	completedAt?: Date;
	ownerId?: string;
	createdAt: Date;
}

export interface User {
	id: string;
	name: string;
	email: string;
	roles: UserRole[];
	isActive: boolean;
	createdAt: Date;
}

export interface StaffMember {
	id: string;
	email: string;
	displayName: string;
	roles: UserRole[];
	role?: string | UserRole;
	status: "active" | "inactive";
	createdAt: Date;
	updatedAt: Date;
}

export interface Workflow {
	id: string;
	name: string;
	trigger: WorkflowTrigger;
	conditions: WorkflowCondition[];
	actions: WorkflowAction[];
	isActive: boolean;
	createdAt: Date;
}

export interface WorkflowTrigger {
	type:
		| "contact_created"
		| "deal_stage_changed"
		| "ticket_created"
		| "ticket_resolved"
		| "schedule";
	collection: string;
}

export interface WorkflowCondition {
	field: string;
	operator: "equals" | "not_equals" | "contains" | "greater_than" | "less_than";
	value: unknown;
}

export interface WorkflowAction {
	type:
		| "send_email"
		| "create_task"
		| "update_field"
		| "add_tag"
		| "assign_owner";
	config: Record<string, unknown>;
}

export interface KnowledgeBaseArticle {
	id: string;
	title: string;
	content: string;
	categoryId: string;
	slug: string;
	isPublished: boolean;
	isInternal: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface Report {
	id: string;
	name: string;
	type: "sales" | "tickets" | "activities" | "custom";
	config: Record<string, unknown>;
	schedule?: string;
	createdAt: Date;
	ownerId: string;
}

export interface BlogPost {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	content: string;
	category: string;
	author: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}
