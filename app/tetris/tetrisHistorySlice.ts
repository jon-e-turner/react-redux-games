import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { movedDown } from './tetrisSlice';
import type { AppState } from '~/store';

export type TetrisGameRecord = {
  player: string;
  grid: number[][];
  score: number;
  level: number;
  timestamp: string;
};

export type TetrisGameHistoryState = {
  gameHistory: {
    [key: string]: TetrisGameRecord[];
  };
  highScores: TetrisGameRecord[];
  shouldSave: boolean;
};

const initialState: TetrisGameHistoryState = {
  gameHistory: {},
  highScores: [],
  shouldSave: false,
};

const tetrisHistorySlice = createSlice({
  name: 'tetrisHistory',
  initialState: initialState,
  reducers: {
    gameSaved: (state, action: PayloadAction<TetrisGameRecord>) => {
      const gameRecord: TetrisGameRecord = action.payload;
      const player = gameRecord.player;
      // const highScores = selectHighScores({ tetrisHistory: { ...state } });

      if (!state.gameHistory[player]) {
        state.gameHistory[player] = [];
      }

      if (state.gameHistory[player].push(gameRecord) > 200) {
        state.gameHistory[player].shift();
      }

      // if (highScores.push({ game: gameRecord }) > 10) {
      //   highScores.sort((a, b) => a.game.score - b.game.score).pop();
      // }

      // state.highScores = { ...highScores };
      state.shouldSave = true;
    },
  },
  selectors: {},
  extraReducers: (builder) => {
    builder.addCase(movedDown, (state) => {
      state.shouldSave = false;
    });
  },
});

const selectGameHistoryByPlayer = (state: AppState, player: string) => state.tetrisHistory.gameHistory[player];

const selectHighScores = (state: AppState) => state.tetrisHistory.highScores;

export const selectOrderedGameHistoryByPlayer = createSelector([selectGameHistoryByPlayer], (gameHistory) => {
  return gameHistory.slice().sort((a, b) => b.timestamp.localeCompare(a.timestamp));
});

export const selectOrderedHighScores = createSelector([selectHighScores], (scores) => {
  return scores.slice().sort((a, b) => a.score - b.score);
});

export const { gameSaved } = tetrisHistorySlice.actions;

export default tetrisHistorySlice.reducer;
