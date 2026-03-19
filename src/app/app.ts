import { Component, signal } from '@angular/core';
import { AppShellComponent } from './components/app-shell/app-shell.component';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('enterprise-project-management-platform');
}
