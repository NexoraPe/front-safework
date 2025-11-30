import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Incident } from '../../../domain/model/incident.model';

import { User } from '../../../../IAM/domain/model/user.model';

@Component({
  selector: 'app-incident-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  templateUrl: './incident-card.component.html',
  styleUrl: './incident-card.component.css'
})
export class IncidentCardComponent {
  // Input obligatorio: ¡Sin incidente no hay carta!
  @Input({ required: true }) incident!: Incident;

  // Nuevo Input: El usuario que está viendo la pantalla
  @Input() currentUser: User | null = null;

  // Outputs: Avisamos al padre cuando alguien toca un botón
  @Output() viewDetails = new EventEmitter<number>();
  @Output() updateStatus = new EventEmitter<number>();
  @Output() assignToMe = new EventEmitter<number>();

  // Helper para abrir el archivo (esto sí lo puede hacer el hijo directo)
  openDocument(): void {
    if (this.incident.documentUrl) {
      window.open(this.incident.documentUrl, '_blank');
    }
  }

  // Helper visual para colores
  getStatusColor(status: string): string {
    switch (status) {
      case 'OPEN': return 'warn';       // Rojo/Naranja
      case 'ASSIGNED': return 'accent'; // Rosado/Morado
      case 'IN_PROGRESS': return 'primary'; // Azul
      case 'CLOSED': return '';         // Gris (default)
      default: return '';
    }
  }

  canAssign(): boolean {

    // 1. Verificamos que currentUser y roles existan (Defensive Programming)
    const roles = this.currentUser?.roles || [];
    // Ejemplo: Solo EMPLOYER puede auto-asignarse si está OPEN
    // Use nullish coalescing (??) to default to 'false' if roles is undefined/null
    const isEmployer = roles.includes('EMPLOYER');
    const isOpen = this.incident.status === 'OPEN';

    return isEmployer && isOpen;
  }
}