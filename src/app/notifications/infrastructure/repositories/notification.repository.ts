import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, delay } from 'rxjs/operators';
import { Notification } from '../../domain/model/notification.model';
import notificationsData from '../mock/notifications.json';

/**
 * Notification Repository
 * Simulates data fetching from a backend API
 * In production, this would use HttpClient to fetch from a real API
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationRepository {
  /**
   * Fetches all notifications
   * Simulates network delay for realistic behavior
   * @returns Observable of Notification array
   */
  getAll(): Observable<Notification[]> {
    // Convert JSON data to Notification objects with proper Date parsing and type casting
    const notifications: Notification[] = notificationsData.map((item) => ({
      id: item.id,
      recipientId: item.recipientId,
      incidentId: item.incidentId,
      message: item.message,
      type: item.type as any,
      status: item.status as any,
      sentAt: new Date(item.sentAt),
    }));

    // Simulate network delay (500ms)
    return of(notifications).pipe(delay(500));
  }

  /**
   * Fetches a single notification by ID
   * @param id - Notification ID
   * @returns Observable of Notification or undefined
   */
  getById(id: string): Observable<Notification | undefined> {
    return this.getAll().pipe(
      map((notifications) => notifications.find((notification) => notification.id === id))
    );
  }

  /**
   * Fetches notifications for a specific recipient
   * @param recipientId - Recipient user ID
   * @returns Observable of Notification array
   */
  getByRecipient(recipientId: string): Observable<Notification[]> {
    return this.getAll().pipe(
      map((notifications) =>
        notifications.filter((notification) => notification.recipientId === recipientId)
      )
    );
  }
}

