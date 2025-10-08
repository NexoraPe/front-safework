import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class ProfileApi {
  private readonly baseUrl = 'http://localhost:3000/api/v1/users';

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  updateUser(id: number, payload: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, payload);
  }
}
