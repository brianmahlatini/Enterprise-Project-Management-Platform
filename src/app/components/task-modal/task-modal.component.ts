import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardItem } from '../../models/card.model';
import { addComment, closeCardModal, updateCard } from '../../state/app.actions';
import { selectActivities, selectComments, selectMembers } from '../../state/app.selectors';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  private readonly store = inject(Store);
  readonly members = toSignal(this.store.select(selectMembers), { initialValue: [] });
  readonly comments = toSignal(this.store.select(selectComments), { initialValue: [] });
  readonly activities = toSignal(this.store.select(selectActivities), { initialValue: [] });
  newComment = '';

  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public card: CardItem
  ) {
    this.card = { ...card };
  }

  save() {
    this.store.dispatch(updateCard({ card: this.card }));
    this.store.dispatch(closeCardModal());
    this.dialogRef.close();
  }

  close() {
    this.store.dispatch(closeCardModal());
    this.dialogRef.close();
  }

  addComment() {
    if (!this.newComment.trim()) return;
    const comment: Comment = {
      id: `com-${Math.random().toString(36).slice(2, 9)}`,
      cardId: this.card.id,
      authorId: this.members()[0]?.id ?? 'mem-1',
      content: this.newComment.trim(),
      createdAt: new Date().toISOString(),
    };
    this.store.dispatch(addComment({ comment }));
    this.newComment = '';
  }
}
