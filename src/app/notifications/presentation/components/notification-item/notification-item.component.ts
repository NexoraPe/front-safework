import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { Notification, NotificationType } from '../../../domain/model/notification.model';

/**
 * Notification Item Component
 * Displays a single notification card with icon, message, and metadata
 */
@Component({
  selector: 'app-notification-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, TranslateModule],
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent {
  @Input() notification!: Notification;

  /**
   * Gets the appropriate icon based on notification type
   * @returns Material icon name
   */
  getNotificationIcon(): string {
    switch (this.notification.type) {
      case NotificationType.EMAIL:
        return 'email';
      case NotificationType.SMS:
        return 'sms';
      case NotificationType.PUSH:
        return 'notifications';
      default:
        return 'info';
    }
  }

  /**
   * Gets the CSS class for styling based on notification type
   * @returns CSS class name
   */
  getNotificationTypeClass(): string {
    return `notification-type-${this.notification.type.toLowerCase()}`;
  }

  /**
   * Formats the sent date for display
   * @returns Formatted date string
   */
  getFormattedDate(): string {
    const date = new Date(this.notification.sentAt);
    return date.toLocaleString();
  }
}

