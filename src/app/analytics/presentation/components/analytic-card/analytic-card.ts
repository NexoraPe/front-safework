import { Component, Input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-analytic-card',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    TranslatePipe,
    DecimalPipe
  ],
  templateUrl: './analytic-card.html',
  styleUrl: './analytic-card.css'
})
export class AnalyticCard {
  @Input() analytics: any[] = [];
}
