import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-incident',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './new-incident.html',
  styleUrls: ['./new-incident.css']
})
export class NewIncident {
  @Output() close = new EventEmitter<boolean>();

  title = '';
  description = '';
  location = '';
  isSubmitting = false;
  error = '';

  constructor(private http: HttpClient) {}

  submitIncident(): void {
    if (!this.title.trim() || !this.description.trim() || !this.location.trim()) {
      this.error = 'Please fill in all required fields.';
      return;
    }

    this.isSubmitting = true;
    this.error = '';

    const newIncident = {
      title: this.title,
      description: this.description,
      location: this.location,
      status: 'open',
      createdBy: 1,
      createdAt: new Date().toISOString()
    };

    this.http.post('http://localhost:3000/incidents', newIncident).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.close.emit(true);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.error = `Error adding incident: ${error.message}`;
      }
    });
  }

  cancel(): void {
    this.close.emit(false);
  }
}
