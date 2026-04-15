import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { addBlockToGrid, canMoveTo, checkRows, defaultState, nextRotation } from '~/utils';
import pieceBag from '~/utils/randomBag';
import { gameSaved } from './tetrisHistorySlice';

export type TetrisGameState = {
  gameOver: boolean;
  grid: number[][];
  isRunning: boolean;
  level: number;
  nextShape: number;
  pieceStats: number[];
  rotation: number;
  score: number;
  shape: number;
  shouldSave: boolean;
  speed: number;
  x: number;
  y: number;
};

const initialState = defaultState().tetris;

const tetrisSlice = createSlice({
  name: 'tetris',
  initialState,
  reducers: {
    movedDown: (state) => {
      const { shape, grid, x, y, rotation, nextShape, score, level } = state;

      if (canMoveTo(shape, grid, x, y + 1, rotation)) {
        state.y = y + 1;
        state.shouldSave = false;
      } else {
        const { newGrid, blockOffGrid } = addBlockToGrid(shape, rotation, grid, x, y);

        state.shouldSave = true;
        state.grid = newGrid;

        if (blockOffGrid) {
          state.shape = 0;
          state.isRunning = false;
          state.gameOver = true;
        } else {
          const newNextShape = pieceBag.nextShape();
          const newScore = score + checkRows(newGrid);

          state.shape = nextShape;
          state.pieceStats[nextShape - 1]++;
          state.nextShape = newNextShape;
          state.score = newScore;
          state.x = 4;
          state.y = -4;
          state.rotation = 0;
          state.level = newScore > 0 && newScore % 500 === 0 ? level + 1 : level;

          if (!canMoveTo(newNextShape, newGrid, 4, 0, 0)) {
            state.shape = 0;
            state.isRunning = false;
            state.gameOver = true;
          }
        }
      }
    },
    movedLeft: (state) => {
      const { shape, grid, x, y, rotation } = state;

      if (canMoveTo(shape, grid, x - 1, y, rotation)) {
        state.x = x - 1;
      }
    },
    movedRight: (state) => {
      const { shape, grid, x, y, rotation } = state;

      if (canMoveTo(shape, grid, x + 1, y, rotation)) {
        state.x = x + 1;
      }
    },
    rotated: (state, actions: PayloadAction<boolean>) => {
      const { shape, rotation, grid, x, y } = state;
      const newRotation = nextRotation(shape, rotation, actions.payload);

      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
    },
    rotatedRight: (state) => {
      const { shape, rotation, grid, x, y } = state;
      const newRotation = nextRotation(shape, rotation, false);

      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
    },
    rotatedLeft: (state) => {
      const { shape, rotation, grid, x, y } = state;
      const newRotation = nextRotation(shape, rotation, true);

      if (canMoveTo(shape, grid, x, y, newRotation)) {
        state.rotation = newRotation;
      }
    },
    paused: (state) => {
      const { gameOver, isRunning } = state;

      if (!gameOver) {
        state.isRunning = !isRunning;
      }
    },
    gameEnded: (state) => {
      state.shape = 0;
      state.isRunning = false;
      state.gameOver = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(gameSaved, (state) => {
      const newState = defaultState().tetris;
      const startingStats = newState.pieceStats.slice();
      startingStats[newState.shape - 1]++;
      return {
        ...state,
        ...newState,
        isRunning: true,
        pieceStats: startingStats,
      };
    });
  },
});

export const { movedDown, movedLeft, movedRight, rotated, rotatedRight, rotatedLeft, paused, gameEnded } =
  tetrisSlice.actions;

export default tetrisSlice.reducer;
