import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Assignment, AssignmentStatus } from '../../../domain/model/assignment.model';
import { SlaViewComponent } from '../sla-view/sla-view.component';

/**
 * Assignment Card Component
 * Displays assignment details in a card format
 */
@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    SlaViewComponent
  ],
  templateUrl: './assignment-card.component.html',
  styleUrls: ['./assignment-card.component.scss']
})
export class AssignmentCardComponent {
  @Input({ required: true }) assignment!: Assignment;

  /**
   * Get status display class for styling
   */
  getStatusClass(): string {
    const statusClasses: Record<AssignmentStatus, string> = {
      [AssignmentStatus.OPEN]: 'status-open',
      [AssignmentStatus.IN_PROGRESS]: 'status-in-progress',
      [AssignmentStatus.CLOSED]: 'status-closed'
    };
    return statusClasses[this.assignment.status];
  }

  /**
   * Get status icon
   */
  getStatusIcon(): string {
    const icons: Record<AssignmentStatus, string> = {
      [AssignmentStatus.OPEN]: 'radio_button_unchecked',
      [AssignmentStatus.IN_PROGRESS]: 'pending',
      [AssignmentStatus.CLOSED]: 'check_circle'
    };
    return icons[this.assignment.status];
  }

  /**
   * Get status display text
   */
  getStatusText(): string {
    const texts: Record<AssignmentStatus, string> = {
      [AssignmentStatus.OPEN]: 'Open',
      [AssignmentStatus.IN_PROGRESS]: 'In Progress',
      [AssignmentStatus.CLOSED]: 'Closed'
    };
    return texts[this.assignment.status];
  }

  /**
   * Format date for display
   */
  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

