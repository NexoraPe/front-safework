import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { SLA, SLAPriority } from '../../../domain/model/assignment.model';

/**
 * SLA View Component
 * Displays SLA information including priority and due date
 */
@Component({
  selector: 'app-sla-view',
  standalone: true,
  imports: [CommonModule, MatChipsModule, MatIconModule, TranslateModule],
  templateUrl: './sla-view.component.html',
  styleUrls: ['./sla-view.component.scss']
})
export class SlaViewComponent {
  @Input({ required: true }) sla!: SLA;

  /**
   * Get priority color based on SLA priority level
   */
  getPriorityColor(): string {
    const colors: Record<SLAPriority, string> = {
      [SLAPriority.CRITICAL]: 'warn',
      [SLAPriority.HIGH]: 'accent',
      [SLAPriority.MEDIUM]: 'primary',
      [SLAPriority.LOW]: ''
    };
    return colors[this.sla.priority];
  }

  /**
   * Get priority icon based on SLA priority level
   */
  getPriorityIcon(): string {
    const icons: Record<SLAPriority, string> = {
      [SLAPriority.CRITICAL]: 'warning',
      [SLAPriority.HIGH]: 'priority_high',
      [SLAPriority.MEDIUM]: 'info',
      [SLAPriority.LOW]: 'check_circle'
    };
    return icons[this.sla.priority];
  }

  /**
   * Check if the SLA is overdue
   */
  isOverdue(): boolean {
    return new Date(this.sla.dueDate) < new Date();
  }

  /**
   * Get time remaining until due date
   */
  getTimeRemaining(): string {
    const now = new Date();
    const dueDate = new Date(this.sla.dueDate);
    const diff = dueDate.getTime() - now.getTime();

    if (diff < 0) {
      const hours = Math.floor(Math.abs(diff) / (1000 * 60 * 60));
      return `${hours}h overdue`;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days}d ${hours}h remaining`;
    }
    return `${hours}h remaining`;
  }
}

