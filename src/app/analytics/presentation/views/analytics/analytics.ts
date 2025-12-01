import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../../services/analytics.service';
import { AnalyticCard } from '../../components/analytic-card/analytic-card'; // Asegúrate de actualizar este componente también si es necesario

const COLORS = {
  OPEN: '#FF5252',       // Rojo suave
  ASSIGNED: '#FFC107',   // Ambar/Naranja
  IN_PROGRESS: '#536DFE', // Indigo (Tu color de marca aprox)
  CLOSED: '#00BFA5'      // Teal/Verde azulado
};

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, TranslateModule, AnalyticCard],
  templateUrl: './analytics.html',
  styleUrls: ['./analytics.css']
})
export class Analytics implements OnInit {
  private analyticsService = inject(AnalyticsService);
  private translate = inject(TranslateService);

  loading = true;

  // Opciones visuales
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: { position: 'bottom' }
    }
  };

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      // Usamos la nueva paleta armónica
      backgroundColor: [COLORS.OPEN, COLORS.ASSIGNED, COLORS.IN_PROGRESS, COLORS.CLOSED],
      hoverBackgroundColor: [COLORS.OPEN, COLORS.ASSIGNED, COLORS.IN_PROGRESS, COLORS.CLOSED],
      borderWidth: 0 // Quitamos bordes blancos para que se vea más flat/moderno
    }]
  };

  // Datos para las tarjetas descriptivas
  public analyticsOptions: any[] = [];

  ngOnInit(): void {
    this.loadData();

    // Escuchar cambio de idioma
    this.translate.onLangChange.subscribe(() => {
      this.updateLabels();
    });
  }

  loadData(): void {
    this.loading = true;
    this.analyticsService.getAnalytics().subscribe({
      next: (response) => {
        const data = response.analytics; // Accedemos a la propiedad raíz

        // Asignamos datos al gráfico (Orden: Open, Assigned, InProgress, Closed)
        this.pieChartData.datasets[0].data = [
          data.open.count,
          data.assigned.count,
          data.in_progress.count,
          data.closed.count
        ];

        // Preparamos las tarjetas
        this.analyticsOptions = [
          {
            title: 'analytics.open',
            count: data.open.count,
            percentage: data.open.percentage,
            description: 'analytics.openDescription',
            color: COLORS.OPEN // <--- Pasamos el color
          },
          {
            title: 'analytics.assigned',
            count: data.assigned.count,
            percentage: data.assigned.percentage,
            description: 'analytics.assignedDescription',
            color: COLORS.ASSIGNED
          },
          {
            title: 'analytics.inProgress',
            count: data.in_progress.count,
            percentage: data.in_progress.percentage,
            description: 'analytics.inProgressDescription',
            color: COLORS.IN_PROGRESS
          },
          {
            title: 'analytics.closed',
            count: data.closed.count,
            percentage: data.closed.percentage,
            description: 'analytics.closedDescription',
            color: COLORS.CLOSED
          }
        ];

        this.updateLabels();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  updateLabels(): void {
    // Traducciones síncronas si ya están cargadas, o usas get().subscribe
    this.translate.get([
      'analytics.open',
      'analytics.assigned',
      'analytics.inProgress',
      'analytics.closed'
    ]).subscribe(res => {
      this.pieChartData = {
        ...this.pieChartData, // Inmutabilidad para refrescar chart
        labels: [
          res['analytics.open'],
          res['analytics.assigned'],
          res['analytics.inProgress'],
          res['analytics.closed']
        ]
      };
    });
  }
}