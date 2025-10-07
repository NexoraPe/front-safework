import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatFormField} from '@angular/material/form-field';
import {MatInput, MatLabel} from '@angular/material/input';
import {RouterLink} from '@angular/router';
import {TranslatePipe} from '@ngx-translate/core';
import {MatButtonToggle, MatButtonToggleGroup} from '@angular/material/button-toggle';

@Component({
  selector: 'app-register-form',
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardFooter,
    MatCardHeader,
    MatCardTitle,
    MatFormField,
    MatInput,
    MatLabel,
    RouterLink,
    TranslatePipe,
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css'
})
export class RegisterForm {

}
