import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from '../../../domain/model/notification.model';
import { NotificationService } from '../../../application/services/notification.service';
import { NotificationListComponent } from '../../components/notification-list/notification-list.component';

/**
 * Notifications Page Component
 * Main view for displaying all notifications
 */
@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, NotificationListComponent],
  templateUrl: './notifications.html',
  styleUrl: './notifications.scss',
})
export class Notifications implements OnInit, OnDestroy {
  private readonly notificationService = inject(NotificationService);
  
  notifications: Notification[] = [];
  loading = false;
  error: string | null = null;
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.loadNotifications();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Loads notifications from the service
   */
  private loadNotifications(): void {
    this.loading = true;
    this.error = null;

    this.notificationService
      .getAllNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          this.notifications = notifications;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to load notifications';
          this.loading = false;
          console.error('Error loading notifications:', error);
        },
      });
  }

  /**
   * Refreshes the notification list
   */
  refreshNotifications(): void {
    this.loadNotifications();
  }
}
