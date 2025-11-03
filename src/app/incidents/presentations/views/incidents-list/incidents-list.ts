import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewIncident } from '../new-incident/new-incident';
import { ViewDetails } from '../view-details/view-details';

type IncidentStatus = 'open' | 'assigned' | 'in_progress' | 'closed';

interface Incident {
  id: number;
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
  imports: [CommonModule, FormsModule, HttpClientModule, NewIncident, ViewDetails],
  templateUrl: './incidents-list.html',
  styleUrls: ['./incidents-list.css']
})
export class IncidentsList implements OnInit {
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  isLoading = true;
  error = '';

  selectedStatuses: IncidentStatus[] = ['open', 'assigned', 'in_progress', 'closed'];
  selectedTab: 'all' | 'mine' = 'all';

  currentUserId = 1;

  showNewIncident = false;
  showViewDetails = false;
  selectedIncident: Incident | null = null;

  statusOptions: StatusOption[] = [
    { value: 'open', label: 'OPEN', color: '#28a745' },
    { value: 'assigned', label: 'ASSIGNED', color: '#007bff' },
    { value: 'in_progress', label: 'IN PROGRESS', color: '#ffc107' },
    { value: 'closed', label: 'CLOSED', color: '#dc3545' }
  ];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadIncidents();
  }

  loadIncidents(): void {
    this.isLoading = true;
    this.http.get<Incident[]>('http://localhost:3000/incidents').subscribe({
      next: (data) => {
        this.incidents = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = `Error loading incidents: ${error.message}`;
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = this.incidents.filter(i => this.selectedStatuses.includes(i.status));
    if (this.selectedTab === 'mine') {
      filtered = filtered.filter(i => i.createdBy === this.currentUserId);
    }
    this.filteredIncidents = filtered;
  }

  onFilterChange(status: IncidentStatus, checked: boolean): void {
    if (checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);
    }
    this.applyFilters();
  }

  selectTab(tab: 'all' | 'mine'): void {
    this.selectedTab = tab;
    this.applyFilters();
  }

  getStatusColor(status: IncidentStatus): string {
    return this.statusOptions.find(s => s.value === status)?.color || '#6c757d';
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  openNewIncident(): void {
    this.showNewIncident = true;
  }

  closeNewIncident(refresh?: boolean): void {
    this.showNewIncident = false;
    if (refresh) {
      const newIncident: Incident = {
        id: this.incidents.length + 1,
        title: 'New Incident Example',
        description: 'This incident was just added.',
        status: 'open',
        createdBy: this.currentUserId,
        createdAt: new Date().toISOString(),
      };
      this.loadIncidents();
      this.incidents.unshift(newIncident);
      this.applyFilters();
    }
  }

  openViewDetails(incident: Incident): void {
    this.selectedIncident = incident;
    this.showViewDetails = true;
  }

  closeViewDetails(): void {
    this.showViewDetails = false;
    this.selectedIncident = null;
  }
}
