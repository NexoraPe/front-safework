/**
 * Notification Domain Model
 * Represents a notification entity in the system
 */
export interface Notification {
  id: string;
  recipientId: string;
  incidentId: string;
  message: string;
  type: NotificationType;
  status: NotificationStatus;
  sentAt: Date;
}

/**
 * Notification Type Enumeration
 * Defines the different channels through which notifications can be sent
 */
export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

/**
 * Notification Status Enumeration
 * Tracks the delivery status of a notification
 */
export enum NotificationStatus {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

