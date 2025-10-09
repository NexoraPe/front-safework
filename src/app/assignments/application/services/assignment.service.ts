import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Assignment, AssignmentStatus } from '../../domain/model/assignment.model';
import { AssignmentRepository } from '../../infrastructure/repositories/assignment.repository';

/**
 * Assignment Service
 * Business logic layer for assignment management
 */
@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  constructor(private repository: AssignmentRepository) {}

  /**
   * Get all assignments
   */
  getAllAssignments(): Observable<Assignment[]> {
    return this.repository.getAll();
  }

  /**
   * Get assignment by ID
   */
  getAssignmentById(id: string): Observable<Assignment | undefined> {
    return this.repository.getById(id);
  }

  /**
   * Get assignments grouped by status
   */
  getAssignmentsGroupedByStatus(): Observable<Map<AssignmentStatus, Assignment[]>> {
    return this.repository.getAll().pipe(
      map(assignments => {
        const grouped = new Map<AssignmentStatus, Assignment[]>();
        
        // Initialize all status groups
        Object.values(AssignmentStatus).forEach(status => {
          grouped.set(status, []);
        });

        // Group assignments by status
        assignments.forEach(assignment => {
          const statusGroup = grouped.get(assignment.status);
          if (statusGroup) {
            statusGroup.push(assignment);
          }
        });

        return grouped;
      })
    );
  }

  /**
   * Get assignments by status
   */
  getAssignmentsByStatus(status: AssignmentStatus): Observable<Assignment[]> {
    return this.repository.getByStatus(status);
  }

  /**
   * Get assignments for a specific incident
   */
  getAssignmentsByIncidentId(incidentId: string): Observable<Assignment[]> {
    return this.repository.getByIncidentId(incidentId);
  }

  /**
   * Get overdue assignments
   * Returns assignments where the SLA due date has passed and status is not CLOSED
   */
  getOverdueAssignments(): Observable<Assignment[]> {
    return this.repository.getAll().pipe(
      map(assignments => {
        const now = new Date();
        return assignments.filter(
          a => a.status !== AssignmentStatus.CLOSED && 
               new Date(a.sla.dueDate) < now
        );
      })
    );
  }

  /**
   * Sort assignments by priority and due date
   */
  getSortedAssignments(): Observable<Assignment[]> {
    return this.repository.getAll().pipe(
      map(assignments => {
        const priorityOrder = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
        
        return [...assignments].sort((a, b) => {
          // First sort by priority
          const priorityDiff = priorityOrder[a.sla.priority] - priorityOrder[b.sla.priority];
          if (priorityDiff !== 0) return priorityDiff;
          
          // Then by due date
          return new Date(a.sla.dueDate).getTime() - new Date(b.sla.dueDate).getTime();
        });
      })
    );
  }
}

