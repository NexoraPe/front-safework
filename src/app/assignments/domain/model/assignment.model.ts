export type AssignmentStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'CLOSED';
export type Priority = 'HIGH' | 'MEDIUM' | 'LOW'; // Ajusta según tu backend

export interface Assignment {
  id: number;
  incidentId: number;
  userId: number; // Redundante pero viene
  incidentTitle: string;
  priority: Priority;
  status: AssignmentStatus;
  assignedAt: string; // Fecha ISO
  completionDate?: string; // Fecha ISO
  documentUrl?: string;
}