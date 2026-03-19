import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, PlaceholderComponent],
  template: `
    <app-placeholder
      title="Reports"
      description="Analytics, burndown, and executive snapshots land here."
    ></app-placeholder>
  `,
})
export class ReportsComponent {}
