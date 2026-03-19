import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectMembers } from '../../state/app.selectors';

@Component({
  selector: 'app-invite-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css'],
})
export class InviteDialogComponent {
  private readonly store = inject(Store);
  readonly members = toSignal(this.store.select(selectMembers), {
    initialValue: [],
  });
  inviteLink = 'https://enterprise-pm.local/invite/board-1';

  constructor(private dialogRef: MatDialogRef<InviteDialogComponent>) {}

  close() {
    this.dialogRef.close();
  }

  copyLink() {
    navigator.clipboard?.writeText(this.inviteLink);
  }
}
