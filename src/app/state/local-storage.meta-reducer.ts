import { ActionReducer } from '@ngrx/store';
import { AppState, RootState, initialState } from './app.state';

const STORAGE_KEY = 'enterprise-pm-state-v1';

export const loadFromStorage = (): AppState | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AppState;
  } catch {
    return null;
  }
};

export const persistToStorage = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
};

export const storageMetaReducer =
  (reducer: ActionReducer<RootState>): ActionReducer<RootState> =>
  (state, action) => {
    const nextState = reducer(state ?? { app: initialState }, action);
    persistToStorage(nextState.app);
    return nextState;
  };
