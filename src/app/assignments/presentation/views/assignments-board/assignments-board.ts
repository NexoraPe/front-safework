import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentService } from '../../../infrastructure/assignment.service';
import { Assignment } from '../../../domain/model/assignment.model';
import { AssignmentCardComponent } from '../../components/assignment-card/assignment-card.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { IncidentService } from '../../../../incidents/infrastructure/incident.service';
import { CloseIncidentDialogComponent } from '../../components/close-incident-dialog/close-incident-dialog.component';

/**
 * Assignments Board Component
 * Main view for displaying all assignments grouped by status
 */
@Component({
  selector: 'app-assignments-board',
  standalone: true,
  imports: [CommonModule, AssignmentCardComponent, MatSnackBarModule],
  templateUrl: './assignments-board.html',
  styleUrls: ['./assignments-board.css']
})
export class AssignmentsBoard implements OnInit {
  // Inyecciones
  private assignmentService = inject(AssignmentService);
  private incidentService = inject(IncidentService); // Necesario para el PATCH documento
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  assignments: Assignment[] = [];

  ngOnInit() {
    this.loadAssignments();
  }

  loadAssignments() {
    this.assignmentService.getMyAssignments().subscribe(data => {
      this.assignments = data;
    });
  }

  // 1. CAMBIAR PRIORIDAD
  onChangePriority(assignment: Assignment, newPriority: string) {
    if (assignment.priority === newPriority) return;

    // Optimistic Update (Actualizamos visualmente antes de la respuesta para que se sienta rápido)
    const oldPriority = assignment.priority;
    assignment.priority = newPriority as any;

    this.assignmentService.updatePriority(assignment.id, newPriority).subscribe({
      error: () => {
        // Si falla, revertimos
        assignment.priority = oldPriority;
        this.snackBar.open('Error updating priority', 'Close');
      }
    });
  }

  // 2. INICIAR TAREA 
  onStart(incidentId: number) {
    this.assignmentService.start(incidentId).subscribe(() => {
      this.loadAssignments(); // Recargar para ver cambio de estado
    });
  }

  // 3. FLUJO DE CIERRE (Abre Modal -> Update Doc -> Close)
  onRequestClose(assignment: Assignment) {
    const dialogRef = this.dialog.open(CloseIncidentDialogComponent, {
      width: '400px',
      data: { isEditing: false, currentUrl: '' }
    });

    dialogRef.afterClosed().subscribe(url => {
      if (url) {
        this.executeCloseFlow(assignment.incidentId, url);
      }
    });
  }

  private executeCloseFlow(incidentId: number, url: string) {
    // Lógica secuencial: Primero guardamos URL, luego cerramos
    this.incidentService.updateDocumentUrl(incidentId, url).subscribe({
      next: () => {
        // 2. Si guardó URL, procedemos a cerrar
        this.assignmentService.close(incidentId).subscribe({
          next: () => {
            this.snackBar.open('Incident Closed Successfully! 🎉', 'Ok');
            this.loadAssignments();
          },
          error: () => this.snackBar.open('Error closing incident', 'Close')
        });
      },
      error: () => this.snackBar.open('Error saving document URL', 'Close')
    });
  }

  // 4. FLUJO EDITAR DOCUMENTO (Solo Update Doc)
  onEditDocument(assignment: Assignment) {
    const dialogRef = this.dialog.open(CloseIncidentDialogComponent, {
      width: '400px',
      data: { isEditing: true, currentUrl: assignment.documentUrl } // Pasamos URL actual si la tuviéramos
    });

    dialogRef.afterClosed().subscribe(url => {
      if (url) {
        this.incidentService.updateDocumentUrl(assignment.incidentId, url).subscribe(() => {
          this.snackBar.open('Document Updated', 'Ok');
          // Opcional: recargar si quieres reflejarlo en la tarjeta
        });
      }
    });
  }
}
