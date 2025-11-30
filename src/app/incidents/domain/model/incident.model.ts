export type IncidentStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'CLOSED';

export interface Incident {
    id: number;
    userId: number;
    companyId: number;
    title: string;
    description: string;
    location: string;
    status: IncidentStatus;
    documentUrl?: string;
    reporterName: string;
    assigneeName: string;
}