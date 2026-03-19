import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NotificationItem } from '../../models/notification.model';

@Component({
  selector: 'app-notification-center',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-center.component.html',
  styleUrls: ['./notification-center.component.css'],
})
export class NotificationCenterComponent {
  @Input() notifications: NotificationItem[] = [];
  @Output() close = new EventEmitter<void>();
  @Output() markRead = new EventEmitter<string>();
}
