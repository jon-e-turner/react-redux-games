import { configureStore, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit';
import tetrisReducer, { type TetrisGameState } from '~/tetris/tetrisSlice';
import tetrisHistoryReducer, { type TetrisGameHistoryState } from '~/tetris/tetrisHistorySlice';

export type AppState = {
  tetris: TetrisGameState;
  tetrisHistory: TetrisGameHistoryState;
};

export type AppDispatch = ThunkDispatch<
  {
    tetris: TetrisGameState;
    tetrisHistory: TetrisGameHistoryState;
  },
  undefined,
  UnknownAction
>;

export default function configureAppStore(preloadedState: AppState) {
  return configureStore({
    reducer: {
      tetris: tetrisReducer,
      tetrisHistory: tetrisHistoryReducer,
    },
    preloadedState: preloadedState,
  });
}
