import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { UserService } from '../../../infrastructure/user.service';
import { User } from '../../../domain/model/user.model';
import { EditProfileDialogComponent } from '../../components/edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule, MatCardModule, MatButtonModule, MatIconModule,
    MatDividerModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.css'
})
export class ProfileForm implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  user: User | null = null;
  loading = true;

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.userService.getProfile().subscribe({
      next: (data) => {
        this.user = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading profile', err);
        this.loading = false;
      }
    });
  }

  openEditDialog() {
    if (!this.user) return;

    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      width: '400px',
      data: { ...this.user } // Pasamos copia para no mutar visualmente antes de tiempo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateProfile(result);
      }
    });
  }

  private updateProfile(data: { fullName: string, phoneNumber: string }) {
    this.loading = true; // Mostrar spinner sutil si quieres
    this.userService.updateProfile(data).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser; // Actualizamos la vista con la respuesta del backend
        this.snackBar.open('Profile updated successfully!', 'Ok', { duration: 3000 });
        this.loading = false;

        // Opcional: Si quieres actualizar el nombre en la Toolbar (IamStore), 
        // podrías disparar una acción aquí o simplemente recargar la página.
      },
      error: () => {
        this.snackBar.open('Failed to update profile', 'Close');
        this.loading = false;
      }
    });
  }
}
