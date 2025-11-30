import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Assignment } from '../domain/model/assignment.model';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
  private http = inject(HttpClient);
  private apiUrl = environment.baseApiBaseUrl; // http://localhost:8080/api/v1

  // 1. Obtener mis tareas (DTO Enriquecido)
  getMyAssignments(): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(`${this.apiUrl}/assignments`);
  }

  // 2. Crear Asignación (Asignarme a mí mismo - Lógica de Discovery)
  assignToMe(incidentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/assignments`, { incidentId });
  }

  // 3. Acciones de Flujo (Lógica de Execution)
  // POST /api/v1/incidents/{id}/start
  start(incidentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/incidents/${incidentId}/start`, {});
  }

  // POST /api/v1/incidents/{id}/close
  close(incidentId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/incidents/${incidentId}/close`, {});
  }

  // PATCH /api/v1/assignments/{id}/priority
  updatePriority(assignmentId: number, priority: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/assignments/${assignmentId}/priority`, { priority });
  }
}