import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslatePipe } from '@ngx-translate/core';
import {DatePipe, NgIf} from '@angular/common';
import {environment} from '../../../../../environments/environment';

interface User {
  id: number;
  email: string;
  password: string;
  role: 'worker' | 'employer';
  firstName: string;
  lastName: string;
  dni: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
}

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    TranslatePipe,
    DatePipe,
    NgIf
  ],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css'
})
export class ProfileForm implements OnInit {
  user?: User;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // ID = 1 (example)
    this.http.get<User>(`${environment.usersEndpoint}/1`).subscribe({
      next: (data) => {
        console.log('Received user:', data);
        this.user = data;
      },
      error: (err) => console.error('Error fetching user:', err),
    });
  }
}
