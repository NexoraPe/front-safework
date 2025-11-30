import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Assignment } from '../../../domain/model/assignment.model';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule, MatMenuModule],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css'
})
export class AssignmentCardComponent {
  @Input({ required: true }) assignment!: Assignment;

  // Eventos de acción
  @Output() start = new EventEmitter<number>();
  @Output() changePriority = new EventEmitter<string>();
  @Output() requestClose = new EventEmitter<Assignment>(); // Emitimos todo el objeto
  @Output() editDocument = new EventEmitter<Assignment>();

  // Helpers visuales
  getStatusColor(status: string): string {
    switch (status) {
      case 'ASSIGNED': return 'accent';     // Naranja/Amarillo
      case 'IN_PROGRESS': return 'primary'; // Azul (Trabajando)
      case 'CLOSED': return '';             // Gris
      default: return '';
    }
  }

  // Helpers de lógica de botones (Basado en el nuevo DTO)
  canStart(): boolean {
    return this.assignment.status === 'ASSIGNED';
  }

  canClose(): boolean {
    return this.assignment.status === 'IN_PROGRESS';
  }

  // Helper color prioridad
  getPriorityColor(priority: string): string {
    return priority === 'HIGH' ? 'warn' : priority === 'MEDIUM' ? 'accent' : 'primary';
  }
}