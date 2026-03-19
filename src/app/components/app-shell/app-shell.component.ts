import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { markNotificationRead, updateSearch } from '../../state/app.actions';
import {
  selectNotifications,
  selectUi,
} from '../../state/app.selectors';
import { NotificationCenterComponent } from '../notification-center/notification-center.component';
import { MemberAvatarsComponent } from '../member-avatars/member-avatars.component';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NotificationCenterComponent,
    MemberAvatarsComponent,
  ],
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.css'],
})
export class AppShellComponent {
  private readonly store = inject(Store);

  readonly ui = toSignal(this.store.select(selectUi), { initialValue: null });
  readonly notifications = toSignal(this.store.select(selectNotifications), {
    initialValue: [],
  });
  readonly showNotifications = signal(false);

  toggleNotifications() {
    this.showNotifications.update(value => !value);
  }

  markRead(id: string) {
    this.store.dispatch(markNotificationRead({ notificationId: id }));
  }

  updateSearch(query: string) {
    this.store.dispatch(updateSearch({ query }));
  }

  clearSearch() {
    this.updateSearch('');
  }
}
