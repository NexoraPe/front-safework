import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../domain/model/notification.model';
import { NotificationRepository } from '../../infrastructure/repositories/notification.repository';

/**
 * Notification Application Service
 * Orchestrates business logic and acts as a facade for the presentation layer
 * Uses the repository to fetch data and can add additional business rules
 */
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly repository: NotificationRepository) {}

  /**
   * Retrieves all notifications
   * @returns Observable of all notifications
   */
  getAllNotifications(): Observable<Notification[]> {
    return this.repository.getAll();
  }

  /**
   * Retrieves a specific notification by its ID
   * @param id - Notification identifier
   * @returns Observable of the notification or undefined
   */
  getNotificationById(id: string): Observable<Notification | undefined> {
    return this.repository.getById(id);
  }

  /**
   * Retrieves notifications for a specific user
   * @param recipientId - User identifier
   * @returns Observable of user's notifications
   */
  getNotificationsByRecipient(recipientId: string): Observable<Notification[]> {
    return this.repository.getByRecipient(recipientId);
  }

  /**
   * Gets the count of unread/pending notifications
   * Can be used for badge indicators
   * @returns Observable of notification count
   */
  getUnreadCount(): Observable<number> {
    // This is a simple implementation; in a real app, you'd filter by 'read' status
    return new Observable((observer) => {
      this.repository.getAll().subscribe((notifications) => {
        observer.next(notifications.length);
        observer.complete();
      });
    });
  }
}

