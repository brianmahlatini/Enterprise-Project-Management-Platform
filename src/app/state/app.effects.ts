import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, filter, map } from 'rxjs/operators';
import { addCard, markCardSynced, moveCard, updateCard } from './app.actions';

@Injectable()
export class AppEffects {
  private readonly actions$ = inject(Actions);

  syncCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addCard, updateCard, moveCard),
      map(action =>
        'cardId' in action ? action.cardId : (action as any).card?.id
      ),
      filter((cardId): cardId is string => Boolean(cardId)),
      delay(600),
      map(cardId => markCardSynced({ cardId }))
    )
  );
}
