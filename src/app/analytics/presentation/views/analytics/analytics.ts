import {Component, OnDestroy, OnInit} from '@angular/core';
import {BaseChartDirective} from 'ng2-charts';
import {ChartData, ChartOptions} from "chart.js";
import { TranslatePipe, TranslateService} from '@ngx-translate/core';
import {AnalyticsService} from "../../../services/analytics.service";
import {Subscription} from "rxjs";
import {AnalyticsData} from "../../../services/analytics.service";
import {NgIf} from "@angular/common";
import {AnalyticCard} from '../../components/analytic-card/analytic-card';

@Component({
  selector: 'app-analytics',
  imports: [
    BaseChartDirective,
    TranslatePipe,
    NgIf,
    AnalyticCard
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css'
})
export class Analytics implements OnInit, OnDestroy {
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
  };
  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [ {
      data: [],
      backgroundColor: [ '#D9D9D9', '#7B7DC1', '#0D0C22' ]
    } ]
  };
  public loading = true;
  private langChangeSubscription: Subscription | undefined;
  private dataSubscription: Subscription | undefined;
  public analyticsOptions: { title: string; percentage: string; description: string; }[] = [];

  constructor(private translate: TranslateService, private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.loadChartData();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.setChartLabels();
    });
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
    }
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadChartData(): void {
    this.loading = true;
    this.dataSubscription = this.analyticsService.getAnalyticsData().subscribe({
      next: (data) => {
        this.pieChartData.datasets[0].data = [data.open.count, data.in_progress.count, data.closed.count];
        this.updateAnalyticsOptions(data);
        this.setChartLabels();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching analytics data', err);
        this.loading = false;
      }
    });
  }

  setChartLabels(): void {
    this.translate.get(['analytics.open', 'analytics.inProgress', 'analytics.closed']).subscribe(translations => {
      this.pieChartData = {
        ...this.pieChartData,
        labels: [
          translations['analytics.open'],
          translations['analytics.inProgress'],
          translations['analytics.closed']
        ]
      };
      // Esto crea un nuevo objeto para asegurar la detección de cambios
    });
  }

  updateAnalyticsOptions(data: AnalyticsData): void {
    const total = data.open.count + data.in_progress.count + data.closed.count;

    const calculatePercentage = (count: number) => {
      if (total === 0) {
        return '0';
      }
      return Math.round((count / total) * 100).toString();
    };

    this.analyticsOptions = [
      { title: 'analytics.open', percentage: calculatePercentage(data.open.count), description: 'analytics.openDescription' },
      { title: 'analytics.inProgress', percentage: calculatePercentage(data.in_progress.count), description: 'analytics.inProgressDescription' },
      { title: 'analytics.closed', percentage: calculatePercentage(data.closed.count), description: 'analytics.closedDescription' }
    ];
  }
}
