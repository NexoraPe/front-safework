import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

type IncidentStatus = 'open' | 'in_progress' | 'closed';

interface Incident {
  id: string;
  title: string;
  description: string;
  status: IncidentStatus;
  createdBy: number;
  createdAt: string;
  fileUrl?: string;
}

interface StatusOption {
  value: IncidentStatus;
  label: string;
  color: string;
}

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './incidents-list.html',
  styleUrls: ['./incidents-list.css']
})
export class IncidentsList implements OnInit {
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  isLoading: boolean = true;
  error: string = '';

  // Status filters
  selectedStatuses: IncidentStatus[] = ['open', 'in_progress', 'closed'];

  statusOptions: StatusOption[] = [
    { value: 'open', label: 'OPEN', color: '#ff4444' },
    { value: 'in_progress', label: 'IN PROGRESS', color: '#ffbb33' },
    { value: 'closed', label: 'CLOSED', color: '#00C851' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.isLoading = true;
    this.error = '';

    this.http.get<Incident[]>('http://localhost:3000/incidents')
      .subscribe({
        next: (data) => {
          console.log('Data received correctly:', data);
          this.incidents = data;
          this.applyFilters();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading incidents:', error);
          this.error = `Error loading incidents: ${error.message}`;
          this.isLoading = false;
        }
      });
  }

  onFilterChange(status: IncidentStatus, isChecked: boolean): void {
    if (isChecked) {
      if (!this.selectedStatuses.includes(status)) {
        this.selectedStatuses.push(status);
      }
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);
    }
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredIncidents = this.incidents.filter(incident =>
      this.selectedStatuses.includes(incident.status)
    );

    this.filteredIncidents.sort((a, b) => {
      const statusOrder: Record<IncidentStatus, number> = {
        'open': 0,
        'in_progress': 1,
        'closed': 2
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });

    console.log('Incidents filters:', this.filteredIncidents);
  }

  getStatusColor(status: IncidentStatus): string {
    const statusOption = this.statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.color : '#666666';
  }

  getStatusLabel(status: IncidentStatus): string {
    const statusOption = this.statusOptions.find(opt => opt.value === status);
    return statusOption ? statusOption.label : status.toUpperCase();
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  isAllSelected(): boolean {
    return this.selectedStatuses.length === this.statusOptions.length;
  }

  toggleAllFilters(isChecked: boolean): void {
    if (isChecked) {
      // Mapping values
      this.selectedStatuses = this.statusOptions.map(opt => opt.value);
    } else {
      this.selectedStatuses = [];
    }
    this.applyFilters();
  }

  onCreateReport(): void {
    console.log('Create Report clicked');
    // Create Report function
  }

  onUploadReport(): void {
    console.log('Upload Report clicked');
    // Upload Report function
  }

  // Test
  testConnection(): void {
    console.log('Testing connection to JSON Server...');
    this.http.get('http://localhost:3000/incidents').subscribe({
      next: (data) => console.log('Connection successful:', data),
      error: (error) => console.error('Error 404:', error)
    });
  }
}
