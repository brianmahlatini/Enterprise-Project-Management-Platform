import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PlaceholderComponent } from '../placeholder/placeholder.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, PlaceholderComponent],
  template: `
    <app-placeholder
      title="Settings"
      description="Org controls, integrations, and permissions live here."
    ></app-placeholder>
  `,
})
export class SettingsComponent {}
