import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Ajusta la ruta a tu environment
import { Notification } from '../domain/notification.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private http = inject(HttpClient);
    private apiUrl = environment.baseApiBaseUrl; // http://localhost:8080/api/v1

    // GET /api/v1/notifications/my-notifications
    getMyNotifications(): Observable<Notification[]> {
        return this.http.get<Notification[]>(`${this.apiUrl}/notifications/my-notifications`);
    }
}