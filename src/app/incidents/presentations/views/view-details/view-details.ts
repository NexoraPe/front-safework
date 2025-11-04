import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-details.html',
  styleUrls: ['./view-details.css']
})
export class ViewDetails {
  @Input() incident: any;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
