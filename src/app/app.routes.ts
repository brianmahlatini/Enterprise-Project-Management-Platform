import { Routes } from '@angular/router';
import { BoardComponent } from './components/board/board.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'workspace' },
  { path: 'workspace', component: WorkspaceComponent },
  { path: 'boards/:boardId', component: BoardComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '**', redirectTo: 'workspace' },
];
