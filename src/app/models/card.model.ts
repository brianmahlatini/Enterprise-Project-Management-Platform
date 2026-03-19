export type CardPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface CardItem {
  id: string;
  boardId: string;
  listId: string;
  order: number;
  title: string;
  description: string;
  assigneeIds: string[];
  labels: string[];
  priority: CardPriority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  isSyncing?: boolean;
}
