/**
 * Assignment domain model
 * Represents a task assignment linked to an incident
 */
export interface Assignment {
  id: string;
  incidentId: string;
  incidentTitle: string;
  incidentDescription: string;
  assignee: Assignee;
  sla: SLA;
  status: AssignmentStatus;
  assignedAt: Date;
  completedAt?: Date;
}

/**
 * Assignee information
 * Represents the person responsible for the assignment
 */
export interface Assignee {
  id: string;
  name: string;
  role: string;
}

/**
 * Service Level Agreement
 * Represents the SLA associated with an assignment
 */
export interface SLA {
  id: string;
  dueDate: Date;
  priority: SLAPriority;
}

/**
 * SLA Priority levels
 */
export enum SLAPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

/**
 * Assignment status lifecycle
 */
export enum AssignmentStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  CLOSED = 'CLOSED',
}

