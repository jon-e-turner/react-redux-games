import { describe, it, expect, beforeEach } from 'vitest';
import { renderWithProviders } from '../test-utils';
import TetrisControls from '~/tetris/components/tetris-controls';
import configureAppStore, { type AppState } from '~/store';
import { defaultState } from '~/utils';
import { userEvent } from 'vitest/browser';
import type { EnhancedStore } from '@reduxjs/toolkit';
import { gameEnded, paused } from '~/tetris/tetrisSlice';

describe('TetrisControls', async () => {
  const state = defaultState();
  let testStore: EnhancedStore;

  // Ensure each test runs from the same initial state.
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

  it('renders all five buttons', async () => {
    const { screen } = await renderWithProviders(<TetrisControls />);

    expect(screen.getByLabelText('move left')).toBeInTheDocument();
    expect(screen.getByLabelText('move right')).toBeInTheDocument();
    expect(screen.getByLabelText('move down')).toBeInTheDocument();
    expect(screen.getByLabelText('rotate clockwise')).toBeInTheDocument();
    expect(screen.getByLabelText('rotate counterclockwise')).toBeInTheDocument();
  });

  describe('button clicks', async () => {
    describe('rotate left', async () => {
      it('rotates the piece counter-clockwise', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await screen.getByLabelText('rotate counterclockwise', { exact: true }).click();
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(3);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is paused', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await screen.getByLabelText('rotate counterclockwise', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is over', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await screen.getByLabelText('rotate counterclockwise', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('rotate right', async () => {
      it('rotates the piece clockwise', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await screen.getByLabelText('rotate clockwise', { exact: true }).click();
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(1);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is paused', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await screen.getByLabelText('rotate clockwise', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is over', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await screen.getByLabelText('rotate clockwise', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('left arrow', async () => {
      it('moves the piece left', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await screen.getByLabelText('move left', { exact: true }).click();
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(3);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is paused', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await screen.getByLabelText('move left', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is over', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await screen.getByLabelText('move left', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('right arrow', async () => {
      it('moves the piece right', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await screen.getByLabelText('move right', { exact: true }).click();
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(5);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is paused', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await screen.getByLabelText('move right', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is over', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await screen.getByLabelText('move right', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('down arrow', async () => {
      it('moves the piece down', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await screen.getByLabelText('move down', { exact: true }).click();
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(5);
      });

      it('is disabled if the game is paused', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await screen.getByLabelText('move down', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('is disabled if the game is over', async () => {
        const { store, screen } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await screen.getByLabelText('move down', { exact: true }).click({ force: true });
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });
  });

  describe('keyboard bindings', async () => {
    describe('ignored', async () => {
      it('does nothing if ALT is pressed', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Alt>}{ArrowLeft}{/Alt}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('does nothing if Meta key is pressed', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Meta>}{ArrowLeft}{/Meta}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('does nothing if CTRL is pressed', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Control>}{ArrowLeft}{/Control}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('does nothing if game is paused', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(paused());
        await userEvent.keyboard('{ArrowLeft}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('does nothing if game is over', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        store.dispatch(gameEnded());
        await userEvent.keyboard('{ArrowLeft}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(0);
        expect(newState.tetris.rotation).toBe(0);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('rotation', async () => {
      it('rotates the piece right on arrow key up', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowUp}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(1);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('rotates the piece left on shift + arrow key up', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}{ArrowUp}{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(3);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('rotates the piece right on `w`', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('W');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(1);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });

      it('rotates the piece left on shift + `w`', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}W{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.rotation).toBe(3);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('move left', async () => {
      it('moves the piece left on left arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowLeft}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(3);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece left on shift + left arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}{ArrowLeft}{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(3);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece left on a', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('A');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(3);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece left on shift + a', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}A{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(3);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('move right', async () => {
      it('moves the piece right on right arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowRight}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece right on shift + right arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}{ArrowRight}{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece right on d', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('D');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
        expect(newState.tetris.y).toBe(4);
      });

      it('moves the piece right on shift + d', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}D{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(5);
        expect(newState.tetris.y).toBe(4);
      });
    });

    describe('move down', async () => {
      it('moves the piece down on down arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{ArrowDown}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(5);
      });

      it('moves the piece down on shift + down arrow key', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}{ArrowDown}{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(5);
      });

      it('moves the piece down on s', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('S');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(5);
      });

      it('moves the piece down on shift + s', async () => {
        const { store } = await renderWithProviders(<TetrisControls />, { store: testStore });

        await userEvent.keyboard('{Shift>}S{/Shift}');
        const newState: AppState = store.getState();

        expect(newState.tetris.shape).toBe(2);
        expect(newState.tetris.x).toBe(4);
        expect(newState.tetris.y).toBe(5);
      });
    });
  });
});
