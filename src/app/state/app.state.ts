import { Board } from '../models/board.model';
import { CardItem } from '../models/card.model';
import { ActivityItem } from '../models/activity.model';
import { Comment } from '../models/comment.model';
import { ListColumn } from '../models/list.model';
import { Member } from '../models/member.model';
import { NotificationItem } from '../models/notification.model';
import { Workspace } from '../models/workspace.model';

export interface AppState {
  workspaces: Workspace[];
  boards: Board[];
  lists: ListColumn[];
  cards: CardItem[];
  comments: Comment[];
  activities: ActivityItem[];
  members: Member[];
  notifications: NotificationItem[];
  ui: {
    activeWorkspaceId: string;
    activeBoardId: string;
    selectedCardId?: string;
    isModalOpen: boolean;
    searchQuery: string;
  };
}

export interface RootState {
  app: AppState;
}

const now = new Date().toISOString();

export const initialState: AppState = {
  workspaces: [
    {
      id: 'ws-1',
      name: 'Enterprise Program Office',
      description: 'Portfolio delivery across product lines',
    },
  ],
  boards: [
    {
      id: 'board-1',
      workspaceId: 'ws-1',
      title: 'Platform Delivery',
      description: 'Roadmap execution and cross-team programs',
      listOrder: ['list-1', 'list-2', 'list-3', 'list-4'],
    },
  ],
  lists: [
    { id: 'list-1', boardId: 'board-1', title: 'Intake', order: 0 },
    { id: 'list-2', boardId: 'board-1', title: 'In Progress', order: 1 },
    { id: 'list-3', boardId: 'board-1', title: 'Review', order: 2 },
    { id: 'list-4', boardId: 'board-1', title: 'Done', order: 3 },
  ],
  cards: [
    {
      id: 'card-1',
      boardId: 'board-1',
      listId: 'list-1',
      order: 0,
      title: 'Consolidate risk register',
      description: 'Merge program-level risks and map to Q2 OKRs.',
      assigneeIds: ['mem-1', 'mem-3'],
      labels: ['risk', 'portfolio'],
      priority: 'high',
      dueDate: now,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'card-2',
      boardId: 'board-1',
      listId: 'list-2',
      order: 0,
      title: 'Migrate legacy reporting pipelines',
      description: 'Move daily exports into the unified data lake.',
      assigneeIds: ['mem-2'],
      labels: ['data', 'migration'],
      priority: 'urgent',
      createdAt: now,
      updatedAt: now,
    },
    {
      id: 'card-3',
      boardId: 'board-1',
      listId: 'list-3',
      order: 0,
      title: 'Finalize vendor security review',
      description: 'Close remaining items for SOC2 readiness.',
      assigneeIds: ['mem-4'],
      labels: ['security'],
      priority: 'medium',
      createdAt: now,
      updatedAt: now,
    },
  ],
  comments: [
    {
      id: 'com-1',
      cardId: 'card-1',
      authorId: 'mem-1',
      content: 'Need Finance input on top 5 risks.',
      createdAt: now,
    },
  ],
  activities: [
    {
      id: 'act-1',
      cardId: 'card-1',
      actorId: 'mem-1',
      message: 'Created task and added portfolio label.',
      type: 'created',
      createdAt: now,
    },
  ],
  members: [
    {
      id: 'mem-1',
      name: 'Ava Carter',
      initials: 'AC',
      avatarColor: '#f97316',
      role: 'manager',
    },
    {
      id: 'mem-2',
      name: 'Kai Moreno',
      initials: 'KM',
      avatarColor: '#0ea5e9',
      role: 'contributor',
    },
    {
      id: 'mem-3',
      name: 'Leila Zhang',
      initials: 'LZ',
      avatarColor: '#22c55e',
      role: 'admin',
    },
    {
      id: 'mem-4',
      name: 'Jamal Rios',
      initials: 'JR',
      avatarColor: '#a855f7',
      role: 'contributor',
    },
  ],
  notifications: [
    {
      id: 'notif-1',
      message: 'New governance checklist assigned to you.',
      createdAt: now,
      read: false,
    },
    {
      id: 'notif-2',
      message: 'Board "Platform Delivery" moved to Q2 focus.',
      createdAt: now,
      read: false,
    },
  ],
  ui: {
    activeWorkspaceId: 'ws-1',
    activeBoardId: 'board-1',
    selectedCardId: undefined,
    isModalOpen: false,
    searchQuery: '',
  },
};
