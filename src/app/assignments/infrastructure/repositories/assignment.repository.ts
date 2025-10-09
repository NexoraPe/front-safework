import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assignment, AssignmentStatus, SLAPriority } from '../../domain/model/assignment.model';

/**
 * Assignment Repository
 * Handles data access for assignments (mock implementation)
 */
@Injectable({
  providedIn: 'root'
})
export class AssignmentRepository {
  private readonly MOCK_DATA_PATH = '/assignments/infrastructure/mock/assignments.json';
  private cachedAssignments$?: Observable<Assignment[]>;

  constructor(private http: HttpClient) {}

  /**
   * Get all assignments from the mock data
   */
  getAll(): Observable<Assignment[]> {
    if (!this.cachedAssignments$) {
      this.cachedAssignments$ = this.http.get<any[]>(this.MOCK_DATA_PATH).pipe(
        map(data => this.mapToAssignments(data))
      );
    }
    return this.cachedAssignments$;
  }

  /**
   * Get assignment by ID
   */
  getById(id: string): Observable<Assignment | undefined> {
    return this.getAll().pipe(
      map(assignments => assignments.find(a => a.id === id))
    );
  }

  /**
   * Get assignments by status
   */
  getByStatus(status: AssignmentStatus): Observable<Assignment[]> {
    return this.getAll().pipe(
      map(assignments => assignments.filter(a => a.status === status))
    );
  }

  /**
   * Get assignments by incident ID
   */
  getByIncidentId(incidentId: string): Observable<Assignment[]> {
    return this.getAll().pipe(
      map(assignments => assignments.filter(a => a.incidentId === incidentId))
    );
  }

  /**
   * Map raw JSON data to Assignment domain model
   * Converts date strings to Date objects and ensures type safety
   */
  private mapToAssignments(data: any[]): Assignment[] {
    return data.map(item => ({
      ...item,
      assignedAt: new Date(item.assignedAt),
      completedAt: item.completedAt ? new Date(item.completedAt) : undefined,
      sla: {
        ...item.sla,
        dueDate: new Date(item.sla.dueDate),
        priority: item.sla.priority as SLAPriority
      },
      status: item.status as AssignmentStatus
    }));
  }
}

