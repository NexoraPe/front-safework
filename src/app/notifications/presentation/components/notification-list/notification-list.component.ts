import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '../../../domain/model/notification.model';
import { NotificationItemComponent } from '../notification-item/notification-item.component';

/**
 * Notification List Component
 * Displays a list of notification items with loading and empty states
 */
@Component({
  selector: 'app-notification-list',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NotificationItemComponent,
  ],
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss'],
})
export class NotificationListComponent {
  @Input() notifications: Notification[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;

  /**
   * Tracks notifications by ID for efficient rendering
   * Used by *ngFor trackBy
   */
  trackByNotificationId(index: number, notification: Notification): string {
    return notification.id;
  }
}

