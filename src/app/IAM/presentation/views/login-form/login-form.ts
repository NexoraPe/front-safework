import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { IamStore } from '../../../application/iam.store';
import { SignInCommand } from '../../../domain/model/sign-in.command';

import { MatIconModule } from '@angular/material/icon'; // <--- Agregado


import { TranslatePipe } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    TranslatePipe,
    MatButtonModule,
    RouterLink,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.scss'
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private iamStore = inject(IamStore);

  // Formulario simple: Email y Password
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  hidePassword = true; // Para el ojito (opcional)

  onLogin(): void {
    if (this.loginForm.invalid) return;

    const formValue = this.loginForm.value;

    const command: SignInCommand = {
      email: formValue.email,
      password: formValue.password
    };

    // Llamamos al Store. El Store se encargará de redirigir si es exitoso.
    this.iamStore.signIn(command);
  }
}
