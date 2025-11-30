import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IncidentService, CreateIncidentPayload } from '../../../infrastructure/incident.service';

@Component({
  selector: 'app-create-incident-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './create-incident-dialog.component.html',
  styleUrl: './create-incident-dialog.component.css' // Opcional si quieres estilos específicos
})
export class CreateIncidentDialogComponent {
  private fb = inject(FormBuilder);
  private incidentService = inject(IncidentService);
  private dialogRef = inject(MatDialogRef<CreateIncidentDialogComponent>);

  isLoading = false;

  form: FormGroup = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    location: ['', Validators.required],
    documentUrl: [''] // Opcional
  });

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const payload: CreateIncidentPayload = this.form.value;

    this.incidentService.create(payload).subscribe({
      next: (newIncident) => {
        console.log('Incidente creado:', newIncident);
        this.isLoading = false;
        // Cerramos el diálogo y pasamos 'true' para avisar que se creó exitosamente
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error creando incidente:', err);
        this.isLoading = false;
        // Aquí podrías mostrar un error en el formulario
        alert('Error al crear el incidente');
      }
    });
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}