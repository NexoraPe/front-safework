import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-close-incident-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatInputModule, MatFormFieldModule],
  templateUrl: './close-incident-dialog.component.html',
  styleUrl: './close-incident-dialog.component.css'
})
export class CloseIncidentDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<CloseIncidentDialogComponent>);

  // Recibimos data para saber si es edición o cierre
  public data = inject(MAT_DIALOG_DATA); // { currentUrl: string, isEditing: boolean }

  form: FormGroup = this.fb.group({
    documentUrl: [this.data.currentUrl || '', [Validators.required]] // URL obligatoria
  });

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value.documentUrl);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}