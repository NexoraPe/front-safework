import { Component, inject } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { RouterLink } from '@angular/router';


import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IamStore } from '../../../application/iam.store'; // Ajusta la ruta si varía
import { SignUpCommand } from '../../../domain/model/sign-up.command';

@Component({
  selector: 'app-register-form',
  imports: [
    TranslatePipe,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatButtonToggleModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {
  private fb = inject(FormBuilder);
  private iamStore = inject(IamStore); // Inyección moderna

  registerForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required],
    role: ['worker', Validators.required]
  });

  hidePassword = true;

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    const formValue = this.registerForm.value;

    if (formValue.password !== formValue.confirmPassword) {
      // Idealmente usar un snackbar
      alert('Password mismatch');
      return;
    }

    const command: SignUpCommand = {
      fullName: formValue.fullName,
      emailAddress: formValue.email,
      password: formValue.password,
      roles: [formValue.role.toUpperCase()],
      // TODO: Implementar lógica de Registration Code.
      // Por ahora hardcodeado para validar conexión con Backend.
      companyId: 1
    };

    this.iamStore.signUp(command);
  }
}
