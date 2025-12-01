import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../domain/model/user.model';

// DTO para el PATCH
export interface UpdateProfileRequest {
    fullName: string;
    phoneNumber: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
    private http = inject(HttpClient);
    private apiUrl = environment.baseApiBaseUrl; // http://localhost:8080/api/v1

    // GET /api/v1/users/me
    getProfile(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/me`);
    }

    // PATCH /api/v1/users/me
    updateProfile(data: UpdateProfileRequest): Observable<User> {
        return this.http.patch<User>(`${this.apiUrl}/users/me`, data);
    }
}