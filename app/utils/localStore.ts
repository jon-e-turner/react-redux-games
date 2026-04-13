import type { AppState } from '~/store';
import { defaultState } from '.';

const STATE_KEY = 'reduxGamesState';

export function loadState(): AppState | undefined {
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) return defaultState();
    return { ...defaultState(), ...JSON.parse(serializedState) };
  } catch (err) {
    console.error('Could not parse serializedState', err);
    return undefined;
  }
}

export async function saveState(state: AppState): Promise<void> {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.error(`Could not save state with key: ${STATE_KEY}`, err);
  }
}
