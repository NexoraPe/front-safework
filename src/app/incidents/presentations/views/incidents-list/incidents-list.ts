import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para los filtros
import { Router } from '@angular/router';

import { IncidentCardComponent } from '../../components/incident-card/incident-card.component';
import { IncidentService } from '../../../infrastructure/incident.service';
import { Incident } from '../../../domain/model/incident.model';
import { IamStore } from '../../../../IAM/application/iam.store';

import { MatDialog } from '@angular/material/dialog';
import { CreateIncidentDialogComponent } from '../../components/create-incident-dialog/create-incident-dialog.component';

import { MatDialogModule } from '@angular/material/dialog';
import { IncidentDetailsDialogComponent } from '../../components/incident-details-dialog/incident-details-dialog.component';

import { User } from '../../../../IAM/domain/model/user.model'; // Importa tu modelo User

@Component({
  selector: 'app-incidents-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IncidentCardComponent,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
  ],
  templateUrl: './incidents-list.html',
  styleUrls: ['./incidents-list.css']
})
export class IncidentsList implements OnInit {
  // Inyecciones
  private incidentService = inject(IncidentService);
  private iamStore = inject(IamStore); // Necesario para saber mi ID
  private router = inject(Router);
  private dialog = inject(MatDialog); // <--- Inyección del Dialog Service

  // Estado de datos
  incidents: Incident[] = [];
  filteredIncidents: Incident[] = [];
  isLoading = true;
  error = '';


  // Estado de usuario
  currentUser: User | null = null;

  // Filtros
  // Asegúrate que estos strings coincidan EXACTAMENTE con lo que devuelve tu backend (Mayúsculas)
  statusOptions = [
    { value: 'OPEN', label: 'Open', color: 'warn' },
    { value: 'ASSIGNED', label: 'Assigned', color: 'accent' },
    { value: 'IN_PROGRESS', label: 'In Progress', color: 'primary' },
    { value: 'CLOSED', label: 'Closed', color: '' }
  ];

  selectedStatuses: string[] = ['OPEN', 'ASSIGNED', 'IN_PROGRESS', 'CLOSED'];
  showOnlyMine = false; // Toggle para "My Incidents"

  ngOnInit(): void {
    // Nos suscribimos al Store para saber QUIÉN soy (Rol y ID)
    this.iamStore.user$.subscribe(user => {
      this.currentUser = user;
    });

    //Imprimir el usuario actual
    console.log('Usuario actual:', this.currentUser);

    this.loadIncidents();
  }

  loadIncidents(): void {
    this.isLoading = true;

    // Usamos el servicio real, que ya usa el Interceptor
    this.incidentService.getAll().subscribe({
      next: (data) => {
        console.log('✅ Incidentes cargados:', data);
        this.incidents = data;
        this.applyFilters();
        this.isLoading = false;
      },
      error: (err) => {
        console.error('❌ Error:', err);
        this.error = 'No se pudieron cargar los incidentes.';
        this.isLoading = false;
      }
    });
  }

  // --- LÓGICA DE FILTROS ---

  toggleStatus(status: string, checked: boolean) {
    if (checked) {
      this.selectedStatuses.push(status);
    } else {
      this.selectedStatuses = this.selectedStatuses.filter(s => s !== status);
    }
    this.applyFilters();
  }

  toggleMyIncidents(checked: boolean) {
    this.showOnlyMine = checked;
    this.applyFilters();
  }

  toggleSelectAll(checked: boolean) {
    if (checked) {
      this.selectedStatuses = this.statusOptions.map(s => s.value);
    } else {
      this.selectedStatuses = [];
    }
    this.applyFilters();
  }

  isAllSelected(): boolean {
    return this.selectedStatuses.length === this.statusOptions.length;
  }

  applyFilters(): void {
    this.filteredIncidents = this.incidents.filter(incident => {
      // 1. Filtro de Estado
      const statusMatch = this.selectedStatuses.includes(incident.status);

      // 2. Filtro de "Mis Incidentes"
      // Si el toggle está activo, solo mostramos si userId coincide con currentUserId
      const ownerMatch = this.showOnlyMine
        ? (incident.userId === this.currentUser?.id)
        : true;

      return statusMatch && ownerMatch;
    });
  }

  // --- ACCIONES QUE VIENEN DEL CARD ---

  onViewDetails(incidentId: number) {
    // 1. Buscamos el incidente en nuestro array local (no gastamos API call)
    const selectedIncident = this.incidents.find(inc => inc.id === incidentId);

    if (selectedIncident) {
      // 2. Abrimos el diálogo pasándole los datos
      this.dialog.open(IncidentDetailsDialogComponent, {
        width: '600px', // Ancho cómodo
        data: selectedIncident, // Pasamos el objeto entero
        autoFocus: false // Evita que el primer botón se seleccione feo
      });
    }
  }

  onUpdateStatus(id: number) {
    console.log('Actualizar estado:', id);
    // Aquí implementaremos la lógica del Worker más adelante
  }

  onAssignToMe(incidentId: number) {

    console.log("Intentando asignar incidente:", incidentId);

    if (!confirm('¿Confirmas que quieres tomar este incidente?')) return;

    this.isLoading = true;
    this.incidentService.assignToMe(incidentId).subscribe({
      next: () => {
        // Opción A: Recargar toda la lista
        this.loadIncidents();
        // Opción B (Más rápida): Actualizar localmente el estado del incidente en el array
        // alert('Incidente asignado exitosamente. Ve a "Mis Tareas" para trabajarlo.');
      },
      error: (err) => {
        console.error('Error al asignar:', err);
        this.isLoading = false;
        // Mostrar mensaje de error
      }
    });
  }

  // Función para el botón "NEW INCIDENT"
  openCreateDialog() {
    const dialogRef = this.dialog.open(CreateIncidentDialogComponent, {
      width: '500px',
      disableClose: true // Obliga a usar botones Cancelar/Crear
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Si devolvió true, significa que se creó uno nuevo.
        // Recargamos la lista para verlo al instante.
        this.loadIncidents();
      }
    });
  }


}