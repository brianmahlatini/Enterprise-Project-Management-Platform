import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { appReducer } from './state/app.reducer';
import { AppEffects } from './state/app.effects';
import { loadFromStorage, storageMetaReducer } from './state/local-storage.meta-reducer';
import { initialState } from './state/app.state';

const storedState = typeof window !== 'undefined' ? loadFromStorage() : null;

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideAnimations(),
    provideStore(
      { app: appReducer },
      {
        metaReducers: [storageMetaReducer],
        initialState: { app: storedState ?? initialState },
      }
    ),
    provideEffects([AppEffects]),
  ],
};
