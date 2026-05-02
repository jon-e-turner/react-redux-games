import { describe, it, expect, beforeEach } from 'vitest';
import { renderWithProviders } from '../test-utils';
import TetrisControls from '~/tetris/components/tetris-controls';
import configureAppStore, { type AppState } from '~/store';
import { defaultState } from '~/utils';
import { userEvent } from 'vitest/browser';
import type { EnhancedStore } from '@reduxjs/toolkit';

describe('TetrisControls', async () => {
  it('renders all five buttons', async () => {
    const { screen } = await renderWithProviders(<TetrisControls />);

    expect(screen.getByLabelText('move left')).toBeInTheDocument();
    expect(screen.getByLabelText('move right')).toBeInTheDocument();
    expect(screen.getByLabelText('move down')).toBeInTheDocument();
    expect(screen.getByLabelText('rotate clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('rotate counterclockwise')).toBeInTheDocument();
  });

  describe('keyboard bindings', async () => {
    const state = defaultState();
    let testStore: EnhancedStore;

    beforeEach(async () => {
      testStore = configureAppStore({
        ...state,
        tetris: {
          ...state.tetris,
          isRunning: true,
          shape: 2, // T
          rotation: 0,
          x: 4,
          y: 4,
        },
      });
    });

    describe('rotation', () => {
      it('rotates the piece right on arrow key up', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowUp}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(1);
      });

      it('rotates the piece left on shift + arrow key up', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(3);
      });

      it('rotates the piece right on `w`', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('W');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(1);
      });

      it('rotates the piece left on shift + `w`', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}W{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(3);
      });
    });

    describe('move right', () => {
      it('moves the piece right on right arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowRight}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
      });

      it('moves the piece right on d', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('D');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
      });

      it('moves the piece right on shift + d', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}D{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
      });
    });
  });
});
