import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment'; // Ajusta la ruta ../ si es necesario
import { Incident } from '../domain/model/incident.model';

// Definimos el payload limpio para crear (sin IDs)
export interface CreateIncidentPayload {
    title: string;
    description: string;
    location: string;
}


@Injectable({
    providedIn: 'root'
})
export class IncidentService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.baseApiBaseUrl}/incidents`; // http://localhost:8080/api/v1/incidents

    getAll(): Observable<Incident[]> {
        return this.http.get<Incident[]>(this.apiUrl);
    }

    // 1. CREACIÓN SEGURA (Backend inyecta usuario y compañía)
    create(payload: CreateIncidentPayload): Observable<Incident> {
        return this.http.post<Incident>(`${this.apiUrl}/incidents`, payload);
    }

    // 2. AUTO-ASIGNACIÓN (Backend sabe quién eres)
    assignToMe(incidentId: number): Observable<void> {
        // El body solo necesita el ID del incidente
        return this.http.post<void>(`${this.apiUrl}/assignments`, { incidentId });
    }
}