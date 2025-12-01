import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Incident } from '../../../domain/model/incident.model';

@Component({
  selector: 'app-incident-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './incident-details-dialog.component.html',
  styleUrls: ['./incident-details-dialog.component.css']
})
export class IncidentDetailsDialogComponent {
  // Inyectamos los datos que vienen del padre
  public incident: Incident = inject(MAT_DIALOG_DATA);

  // Referencia para poder cerrar el modal programáticamente si fuera necesario
  private dialogRef = inject(MatDialogRef<IncidentDetailsDialogComponent>);

  close(): void {
    this.dialogRef.close();
  }

  // Helper para abrir documento (reutilizamos lógica)
  openDocument(): void {
    if (this.incident.documentUrl) {
      window.open(this.incident.documentUrl, '_blank');
    }
  }
}