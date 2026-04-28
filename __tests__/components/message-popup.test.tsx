import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../test-utils';
import MessagePopup from '~/components/message-popup';
import { defaultState } from '~/utils';
import configureAppStore from '~/store';

describe('MessagePopup component', async () => {
  it('should render `Paused` with default state', async () => {
    const screen = await renderWithProviders(<MessagePopup />);

    expect(screen.getByText(/paused/i)).toBeInTheDocument();
    expect(screen.getByText(/paused/i)).toBeVisible();
  });

  it('should render `Game Over!` when boolean is set', async () => {
    const state = defaultState();
    const testStore = configureAppStore({ ...state, tetris: { ...state.tetris, gameOver: true } });
    const screen = await renderWithProviders(<MessagePopup />, { store: testStore });

    expect(screen.getByText(/game over!/i)).toBeInTheDocument();
    expect(screen.getByText(/game over!/i)).toBeVisible();
  });

  it('should not render when game is running', async () => {
    const state = defaultState();
    const testStore = configureAppStore({ ...state, tetris: { ...state.tetris, isRunning: true } });
    const screen = await renderWithProviders(<MessagePopup />, { store: testStore });

    expect(screen.getByText(/game over!/i)).not.toBeInTheDocument();
    expect(screen.getByText(/paused/i)).toBeInTheDocument();
    expect(screen.getByText(/paused/i)).not.toBeVisible();
  });
});
