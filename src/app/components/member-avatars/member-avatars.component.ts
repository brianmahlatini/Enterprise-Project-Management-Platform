import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectMembers } from '../../state/app.selectors';

@Component({
  selector: 'app-member-avatars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './member-avatars.component.html',
  styleUrls: ['./member-avatars.component.css'],
})
export class MemberAvatarsComponent {
  private readonly store = inject(Store);
  readonly members = toSignal(this.store.select(selectMembers), {
    initialValue: [],
  });
}
