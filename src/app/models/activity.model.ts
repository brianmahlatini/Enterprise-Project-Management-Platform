export type ActivityType =
  | 'created'
  | 'moved'
  | 'commented'
  | 'updated'
  | 'assigned';

export interface ActivityItem {
  id: string;
  cardId?: string;
  actorId: string;
  message: string;
  type: ActivityType;
  createdAt: string;
}
