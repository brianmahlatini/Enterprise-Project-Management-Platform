import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import {
  CdkDrag,
  CdkDragHandle,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
} from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { CardItem } from '../../models/card.model';
import {
  addCard,
  addList,
  moveCard,
  openCardModal,
  selectBoard,
  updateSearch,
} from '../../state/app.actions';
import {
  selectActiveBoard,
  selectActivities,
  selectCards,
  selectListsForBoard,
  selectMembers,
  selectUi,
} from '../../state/app.selectors';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { InviteDialogComponent } from '../invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatDialogModule,
    ScrollingModule,
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);

  readonly board = toSignal(this.store.select(selectActiveBoard), {
    initialValue: null,
  });
  readonly lists = toSignal(this.store.select(selectListsForBoard), {
    initialValue: [],
  });
  readonly cards = toSignal(this.store.select(selectCards), {
    initialValue: [],
  });
  readonly members = toSignal(this.store.select(selectMembers), {
    initialValue: [],
  });
  readonly activities = toSignal(this.store.select(selectActivities), {
    initialValue: [],
  });
  readonly ui = toSignal(this.store.select(selectUi), { initialValue: null });
  readonly showActivity = signal(true);

  constructor() {
    this.route.paramMap.subscribe(params => {
      const boardId = params.get('boardId');
      if (boardId) {
        this.store.dispatch(selectBoard({ boardId }));
      }
    });
  }

  filteredCards(listId: string) {
    const query = this.ui()?.searchQuery?.toLowerCase() ?? '';
    return this.cards()
      .filter(card => card.listId === listId)
      .filter(card =>
        query
          ? [
              card.title,
              card.description,
              card.labels.join(' '),
              card.priority,
              this.members()
                .filter(member => card.assigneeIds.includes(member.id))
                .map(member => member.name)
                .join(' '),
            ]
              .join(' ')
              .toLowerCase()
              .includes(query)
          : true
      )
      .sort((a, b) => a.order - b.order);
  }

  listCards(listId: string) {
    return this.cards()
      .filter(card => card.listId === listId)
      .sort((a, b) => a.order - b.order);
  }

  isSearchActive() {
    return Boolean(this.ui()?.searchQuery?.trim());
  }

  trackByCardId(_: number, card: CardItem) {
    return card.id;
  }

  toggleActivity() {
    this.showActivity.update(value => !value);
  }

  addCard(listId: string) {
    const boardId = this.board()?.id;
    if (!boardId) return;
    const cardId = `card-${Math.random().toString(36).slice(2, 9)}`;
    this.store.dispatch(addCard({ listId, boardId, title: 'New task', cardId }));
  }

  addList() {
    const boardId = this.board()?.id;
    if (!boardId) return;
    this.store.dispatch(addList({ boardId, title: 'New list' }));
  }

  openCard(card: CardItem) {
    this.store.dispatch(openCardModal({ cardId: card.id }));
    this.dialog.open(TaskModalComponent, {
      data: card,
      width: '720px',
      maxWidth: '95vw',
    });
  }

  openInvite() {
    this.dialog.open(InviteDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
    });
  }

  drop(listId: string, event: CdkDragDrop<CardItem[]>) {
    if (!event.item?.data?.id) return;
    const cardId = event.item.data.id;
    const sourceListId = event.item.data.listId;
    const sameList = sourceListId === listId;

    const targetFull = this.listCards(listId);
    const targetVisible = this.filteredCards(listId);

    const fullWithoutMoved = sameList
      ? targetFull.filter(card => card.id !== cardId)
      : targetFull;

    const visibleWithoutMoved = sameList
      ? targetVisible.filter(card => card.id !== cardId)
      : targetVisible;

    const targetCard = visibleWithoutMoved[event.currentIndex];
    const insertIndex = targetCard
      ? Math.max(
          0,
          fullWithoutMoved.findIndex(card => card.id === targetCard.id)
        )
      : fullWithoutMoved.length;

    this.store.dispatch(
      moveCard({
        cardId,
        toListId: listId,
        toIndex: insertIndex,
      })
    );
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key.toLowerCase() === 'k') {
      event.preventDefault();
      this.store.dispatch(updateSearch({ query: '' }));
      const input = document.querySelector<HTMLInputElement>('.search');
      input?.focus();
    }

    if (event.key.toLowerCase() === 'n' && !event.ctrlKey) {
      const target = event.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA'].includes(target.tagName)) return;
      const firstList = this.lists()[0];
      if (firstList) {
        this.addCard(firstList.id);
      }
    }
  }
}
