import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectBoards } from '../../state/app.selectors';

@Component({
  selector: 'app-workspace',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css'],
})
export class WorkspaceComponent {
  private readonly store = inject(Store);
  readonly boards = toSignal(this.store.select(selectBoards), { initialValue: [] });
}
