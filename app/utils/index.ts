import type { AppState } from '~/store';
import { shapes } from '~/utils/shapes';
import pieceBag from '~/utils/randomBag';

export * from '~/utils/shapes';
export * from '~/utils/nextRotation';
export * from '~/utils/localStore';
export * from '~/utils/randomBag';

export const gridDefault = (rows: number = 18, cols: number = 10) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => {
      return 0;
    }),
  );
};

export const canMoveTo = (
  shape: number,
  grid: number[][],
  x: number,
  y: number,
  rotation: number,
) => {
  const currentShape = shapes[shape][rotation];
  const gridWidth = grid[0].length - 1;
  const gridHeight = grid.length - 1;

  // Loop through all rows and cols of the **shape**
  for (let row = 0; row < currentShape.length; row++) {
    for (let col = 0; col < currentShape[row].length; col++) {
      // If the value isn't 0 it's part of the shape
      if (currentShape[row][col] !== 0) {
        // Offset the square to map it to the larger grid
        const proposedX = col + x;
        const proposedY = row + y;
        // Get the possible row. This might be undefined if we're above the top
        const possibleRow = grid[proposedY];

        // Off the left or right side or off the bottom return false
        if (proposedX < 0 || proposedX > gridWidth || proposedY > gridHeight) {
          return false;
        } else if (possibleRow !== undefined) {
          // If the row is not undefined you're on the grid
          if (possibleRow[proposedX] !== 0) {
            // This square must be filled
            return false;
          }
        }
      }
    }
  }
  return true;
};

export const addBlockToGrid = (
  shape: number,
  rotation: number,
  grid: number[][],
  x: number,
  y: number,
) => {
  let blockOffGrid = false;
  const block = shapes[shape][rotation];
  const newGrid = [...grid];

  for (let row = 0; row < block.length; row++) {
    for (let col = 0; col < block[row].length; col++) {
      if (block[row][col]) {
        const yIndex = row + y;
        // If the yIndex is less than 0 part of the block
        // is off the top of the screen and the game is over
        if (yIndex < 0) {
          blockOffGrid = true;
        } else {
          newGrid[row + y][col + x] = shape;
        }
      }
    }
  }

  return { newGrid, blockOffGrid };
};

export const checkRows = (grid: number[][]) => {
  // Points increase for each row completed
  // i.e. 40 points for completing one row, 100 points for two rows
  const points = [0, 40, 100, 300, 1200];
  let completedRows = 0;
  for (let row = 0; row < grid.length; row++) {
    // No empty cells means it can't find a 0, so the row must be complete!
    if (grid[row].indexOf(0) === -1) {
      completedRows += 1;
      // Remove the row and add a new empty one at the top
      grid.splice(row, 1);
      grid.unshift(Array(10).fill(0));
    }
  }

  return points[completedRows];
};

export const defaultState = (): AppState => {
  return {
    tetris: {
      gameOver: false,
      grid: gridDefault(),
      isRunning: false,
      level: 1,
      nextShape: pieceBag.nextShape(),
      pieceStats: [0, 0, 0, 0, 0, 0, 0],
      rotation: 0,
      score: 0,
      shape: pieceBag.nextShape(),
      shouldSave: false,
      speed: 250,
      x: 4,
      y: -4,
    },
    tetrisHistory: {
      gameHistory: {},
      highScores: [],
      shouldSave: false,
    },
  };
};
