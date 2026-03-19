import { createReducer, on } from '@ngrx/store';
import {
  addCard,
  addList,
  addComment,
  closeCardModal,
  markCardSynced,
  markNotificationRead,
  moveCard,
  openCardModal,
  selectBoard,
  updateCard,
  updateSearch,
} from './app.actions';
import { initialState } from './app.state';
import { CardItem } from '../models/card.model';
import { ActivityItem } from '../models/activity.model';
import { NotificationItem } from '../models/notification.model';

const newId = (prefix: string) =>
  `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const addActivity = (state: typeof initialState, activity: ActivityItem) => ({
  ...state,
  activities: [activity, ...state.activities],
});

const addNotification = (
  state: typeof initialState,
  notification: NotificationItem
) => ({
  ...state,
  notifications: [notification, ...state.notifications],
});

export const appReducer = createReducer(
  initialState,
  on(selectBoard, (state, { boardId }) => ({
    ...state,
    ui: {
      ...state.ui,
      activeBoardId: boardId,
    },
  })),
  on(updateSearch, (state, { query }) => ({
    ...state,
    ui: {
      ...state.ui,
      searchQuery: query,
    },
  })),
  on(openCardModal, (state, { cardId }) => ({
    ...state,
    ui: {
      ...state.ui,
      selectedCardId: cardId,
      isModalOpen: true,
    },
  })),
  on(closeCardModal, state => ({
    ...state,
    ui: {
      ...state.ui,
      selectedCardId: undefined,
      isModalOpen: false,
    },
  })),
  on(addCard, (state, { listId, boardId, title, cardId }) => {
    const now = new Date().toISOString();
    const order = state.cards.filter(card => card.listId === listId).length;
    const card: CardItem = {
      id: cardId,
      boardId,
      listId,
      order,
      title,
      description: '',
      assigneeIds: [],
      labels: [],
      priority: 'medium',
      createdAt: now,
      updatedAt: now,
      isSyncing: true,
    };

    const activity: ActivityItem = {
      id: newId('act'),
      cardId: card.id,
      actorId: state.members[0]?.id ?? 'mem-1',
      message: `Created "${title}"`,
      type: 'created',
      createdAt: now,
    };

    const notification: NotificationItem = {
      id: newId('notif'),
      message: `New task created: ${title}`,
      createdAt: now,
      read: false,
    };

    let nextState = {
      ...state,
      cards: [...state.cards, card],
    };
    nextState = addActivity(nextState, activity);
    nextState = addNotification(nextState, notification);
    return nextState;
  }),
  on(addList, (state, { boardId, title }) => {
    const newListId = newId('list');
    const order = state.lists.filter(list => list.boardId === boardId).length;
    const newList = { id: newListId, boardId, title, order };

    const boards = state.boards.map(board =>
      board.id === boardId
        ? { ...board, listOrder: [...board.listOrder, newListId] }
        : board
    );

    const activity: ActivityItem = {
      id: newId('act'),
      actorId: state.members[0]?.id ?? 'mem-1',
      message: `Added list "${title}"`,
      type: 'updated',
      createdAt: new Date().toISOString(),
    };

    return addActivity(
      {
        ...state,
        boards,
        lists: [...state.lists, newList],
      },
      activity
    );
  }),
  on(updateCard, (state, { card }) => {
    const now = new Date().toISOString();
    const updatedCards = state.cards.map(item =>
      item.id === card.id
        ? {
            ...card,
            updatedAt: now,
            isSyncing: true,
          }
        : item
    );

    const activity: ActivityItem = {
      id: newId('act'),
      cardId: card.id,
      actorId: state.members[0]?.id ?? 'mem-1',
      message: `Updated "${card.title}"`,
      type: 'updated',
      createdAt: now,
    };

    return addActivity(
      {
        ...state,
        cards: updatedCards,
      },
      activity
    );
  }),
  on(moveCard, (state, { cardId, toListId, toIndex }) => {
    const now = new Date().toISOString();
    const card = state.cards.find(item => item.id === cardId);
    if (!card) return state;

    const remaining = state.cards.filter(item => item.id !== cardId);
    const sourceListCards = remaining
      .filter(item => item.listId === card.listId)
      .sort((a, b) => a.order - b.order)
      .map((item, index) => ({ ...item, order: index }));

    const targetListCards = remaining
      .filter(item => item.listId === toListId)
      .sort((a, b) => a.order - b.order);

    targetListCards.splice(toIndex, 0, {
      ...card,
      listId: toListId,
      updatedAt: now,
      isSyncing: true,
    });

    const updatedTarget = targetListCards.map((item, index) => ({
      ...item,
      order: index,
    }));

    const updatedCards = [
      ...remaining.filter(
        item => item.listId !== toListId && item.listId !== card.listId
      ),
      ...sourceListCards,
      ...updatedTarget,
    ];

    const targetList = state.lists.find(list => list.id === toListId);
    const activity: ActivityItem = {
      id: newId('act'),
      cardId,
      actorId: state.members[0]?.id ?? 'mem-1',
      message: `Moved "${card.title}" to ${targetList?.title ?? 'another list'}`,
      type: 'moved',
      createdAt: now,
    };

    return addActivity(
      {
        ...state,
        cards: updatedCards,
      },
      activity
    );
  }),
  on(markCardSynced, (state, { cardId }) => ({
    ...state,
    cards: state.cards.map(card =>
      card.id === cardId ? { ...card, isSyncing: false } : card
    ),
  })),
  on(addComment, (state, { comment }) => {
    const activity: ActivityItem = {
      id: newId('act'),
      cardId: comment.cardId,
      actorId: comment.authorId,
      message: 'Added a comment.',
      type: 'commented',
      createdAt: comment.createdAt,
    };

    return addActivity(
      {
        ...state,
        comments: [comment, ...state.comments],
      },
      activity
    );
  }),
  on(markNotificationRead, (state, { notificationId }) => ({
    ...state,
    notifications: state.notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ),
  }))
);
