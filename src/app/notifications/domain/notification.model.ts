export interface Notification {
    id: string;        // UUID
    subject: string;
    body: string;
    createdAt: string; // ISO Date String
    isRead: boolean;
}