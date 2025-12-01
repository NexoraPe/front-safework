import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from '../../../domain/model/user.model';

@Component({
  selector: 'app-edit-profile-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatInputModule, MatFormFieldModule
  ],
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.css']
})
export class EditProfileDialogComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<EditProfileDialogComponent>);
  public data: User = inject(MAT_DIALOG_DATA); // Recibimos el usuario actual

  form: FormGroup = this.fb.group({
    fullName: [this.data.fullName || '', [Validators.required, Validators.minLength(3)]],
    phoneNumber: [this.data.phoneNumber || '', [Validators.pattern(/^\d+$/)]] // Solo números
  });

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value); // Devolvemos {fullName, phoneNumber}
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}