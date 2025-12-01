import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { Notification } from '../../../domain/notification.model';
import { NotificationService } from '../../../infrastructure/notification.service';
// Importamos directamente la Card
import { NotificationCardComponent } from '../../components/notification-card/notification-card.component';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule, TranslateModule, NotificationCardComponent],
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

  private loadNotifications(): void {
    this.loading = true;
    this.error = null;

    // CORRECCIÓN: Usamos 'getMyNotifications' que definimos en el servicio
    this.notificationService
      .getMyNotifications()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (notifications) => {
          // Opcional: Ordenar por fecha (más reciente primero)
          this.notifications = notifications.sort((a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to load notifications';
          this.loading = false;
          console.error('Error loading notifications:', error);
        },
      });
  }

  refreshNotifications(): void {
    this.loadNotifications();
  }
}