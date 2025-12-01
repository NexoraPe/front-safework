export interface StatusMetric {
    count: number;
    percentage: number;
}

export interface AnalyticsResponse {
    analytics: {
        open: StatusMetric;
        assigned: StatusMetric;
        in_progress: StatusMetric;
        closed: StatusMetric;
    };
}