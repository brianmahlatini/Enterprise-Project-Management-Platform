import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectBoards = createSelector(
  selectAppState,
  state => state.boards
);

export const selectLists = createSelector(
  selectAppState,
  state => state.lists
);

export const selectCards = createSelector(
  selectAppState,
  state => state.cards
);

export const selectMembers = createSelector(
  selectAppState,
  state => state.members
);

export const selectNotifications = createSelector(
  selectAppState,
  state => state.notifications
);

export const selectActivities = createSelector(
  selectAppState,
  state => state.activities
);

export const selectComments = createSelector(
  selectAppState,
  state => state.comments
);

export const selectUi = createSelector(selectAppState, state => state.ui);

export const selectActiveBoard = createSelector(
  selectBoards,
  selectUi,
  (boards, ui) => boards.find(board => board.id === ui.activeBoardId)
);

export const selectListsForBoard = createSelector(
  selectLists,
  selectUi,
  (lists, ui) =>
    lists
      .filter(list => list.boardId === ui.activeBoardId)
      .sort((a, b) => a.order - b.order)
);

export const selectCardsByList = (listId: string) =>
  createSelector(selectCards, cards =>
    cards
      .filter(card => card.listId === listId)
      .sort((a, b) => a.order - b.order)
  );

export const selectSelectedCard = createSelector(
  selectCards,
  selectUi,
  (cards, ui) => cards.find(card => card.id === ui.selectedCardId)
);

export const selectCommentsForSelectedCard = createSelector(
  selectComments,
  selectUi,
  (comments, ui) =>
    comments.filter(comment => comment.cardId === ui.selectedCardId)
);

export const selectFilteredCards = createSelector(
  selectCards,
  selectUi,
  (cards, ui) => {
    const q = ui.searchQuery.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(card =>
      [card.title, card.description, card.labels.join(' ')]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }
);
