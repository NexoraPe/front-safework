import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface AnalyticsData {
  open: {
    count: number;
    percentage: number;
    description: string;
  };
  in_progress: {
    count: number;
    percentage: number;
    description: string;
  };
  closed: {
    count: number;
    percentage: number;
    description: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private analyticsUrl = environment.analyticsEndpoint;

  constructor(private http: HttpClient) {}

  getAnalyticsData(): Observable<AnalyticsData> {
    return this.http.get<AnalyticsData>(this.analyticsUrl);
  }
}

