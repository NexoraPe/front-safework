import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Assignment, AssignmentStatus, SLAPriority } from '../../domain/model/assignment.model';
import assignmentsData from '../mock/assignments.json';

/**
 * Assignment Repository
 * Handles data access for assignments (mock implementation)
 */
@Injectable({
  providedIn: 'root'
})
export class AssignmentRepository {
  private readonly MOCK_DELAY = 300; // Simulate network delay

  /**
   * Get all assignments from the mock data
   */
  getAll(): Observable<Assignment[]> {
    return of(assignmentsData).pipe(
      delay(this.MOCK_DELAY),
      map(data => this.mapToAssignments(data))
    );
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

