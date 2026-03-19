import { createAction, props } from '@ngrx/store';
import { CardItem } from '../models/card.model';
import { Comment } from '../models/comment.model';

export const selectBoard = createAction(
  '[UI] Select Board',
  props<{ boardId: string }>()
);

export const updateSearch = createAction(
  '[UI] Update Search',
  props<{ query: string }>()
);

export const openCardModal = createAction(
  '[UI] Open Card Modal',
  props<{ cardId: string }>()
);

export const closeCardModal = createAction('[UI] Close Card Modal');

export const addCard = createAction(
  '[Cards] Add Card',
  props<{ listId: string; boardId: string; title: string; cardId: string }>()
);

export const addList = createAction(
  '[Lists] Add List',
  props<{ boardId: string; title: string }>()
);

export const updateCard = createAction(
  '[Cards] Update Card',
  props<{ card: CardItem }>()
);

export const moveCard = createAction(
  '[Cards] Move Card',
  props<{ cardId: string; toListId: string; toIndex: number }>()
);

export const markCardSynced = createAction(
  '[Cards] Mark Synced',
  props<{ cardId: string }>()
);

export const addComment = createAction(
  '[Comments] Add Comment',
  props<{ comment: Comment }>()
);

export const markNotificationRead = createAction(
  '[Notifications] Mark Read',
  props<{ notificationId: string }>()
);
