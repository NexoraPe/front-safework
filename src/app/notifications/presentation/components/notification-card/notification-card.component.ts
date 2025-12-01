import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Notification } from '../../../domain/notification.model';

@Component({
  selector: 'app-notification-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './notification-card.component.html',
  styleUrls: ['./notification-card.component.css']
})
export class NotificationCardComponent {
  @Input({ required: true }) notification!: Notification;

  // Lógica simple para decidir el icono (puedes mejorarla luego)
  get iconName(): string {
    return this.notification.subject.toLowerCase().includes('email') ? 'mail' : 'notifications';
  }
}