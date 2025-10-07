import { Component } from '@angular/core';
import {
  MatCard,
  MatCardContent,
  MatCardFooter,
  MatCardHeader,
  MatCardTitle
} from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import { MatButton } from '@angular/material/button';
import {RouterLink} from '@angular/router';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-login-form',
  imports: [
    MatCard,
    TranslatePipe,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatCardFooter,
    MatButton,
    RouterLink,
    MatLabel,
    MatInput,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css'
})
export class LoginForm {

}
