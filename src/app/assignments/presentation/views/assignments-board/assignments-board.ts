import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Assignment, AssignmentStatus } from '../../../domain/model/assignment.model';
import { AssignmentService } from '../../../application/services/assignment.service';
import { AssignmentCardComponent } from '../../components/assignment-card/assignment-card.component';

/**
 * Assignments Board Component
 * Main view for displaying all assignments grouped by status
 */
@Component({
  selector: 'app-assignments-board',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    AssignmentCardComponent
  ],
  templateUrl: './assignments-board.html',
  styleUrls: ['./assignments-board.css']
})
export class AssignmentsBoard implements OnInit {
  assignments$!: Observable<Assignment[]>;
  loading = true;

  // Status enum for template access
  AssignmentStatus = AssignmentStatus;

  constructor(private assignmentService: AssignmentService) {}

  ngOnInit(): void {
    this.loadAssignments();
  }

  /**
   * Load all assignments
   */
  loadAssignments(): void {
    this.loading = true;
    this.assignments$ = this.assignmentService.getAllAssignments();
    
    // Simulate loading state
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  /**
   * Filter assignments by status
   */
  getAssignmentsByStatus(assignments: Assignment[] | null, status: AssignmentStatus): Assignment[] {
    if (!assignments) return [];
    return assignments.filter(a => a.status === status);
  }

  /**
   * Get status display text
   */
  getStatusText(status: AssignmentStatus): string {
    const texts: Record<AssignmentStatus, string> = {
      [AssignmentStatus.OPEN]: 'Open',
      [AssignmentStatus.IN_PROGRESS]: 'In Progress',
      [AssignmentStatus.CLOSED]: 'Closed'
    };
    return texts[status];
  }

  /**
   * Get status icon
   */
  getStatusIcon(status: AssignmentStatus): string {
    const icons: Record<AssignmentStatus, string> = {
      [AssignmentStatus.OPEN]: 'radio_button_unchecked',
      [AssignmentStatus.IN_PROGRESS]: 'pending',
      [AssignmentStatus.CLOSED]: 'check_circle'
    };
    return icons[status];
  }

  /**
   * Track by function for assignment lists
   */
  trackByAssignmentId(index: number, assignment: Assignment): string {
    return assignment.id;
  }
}
