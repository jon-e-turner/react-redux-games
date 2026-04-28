import { describe, expect, it } from 'vitest';
import { addBlockToGrid, checkRows, defaultState, gridDefault, nextRotation, shapes } from '~/utils';

describe('util functions', () => {
  describe('gridDefault()', () => {
    it('should return an 18 x 10 grid by default', () => {
      const grid = gridDefault();

      expect(grid.length).toBe(18);

      grid.map((row) => {
        expect(row.length).toBe(10);
      });
    });

    it('should return a correctly sized grid based on inputs', () => {
      const grid = gridDefault(5, 2);

      expect(grid.length).toBe(5);

      grid.map((row) => {
        expect(row.length).toBe(2);
      });
    });
  });

  describe('addBlockToGrid()', () => {
    const tShape = 2;
    const grid = gridDefault();

    const leftCol = 0;
    const topRow = 0;
    const bottomRow = 17;

    it('adds a block to the bottom of an empty grid', () => {
      const { newGrid, blockOffGrid } = addBlockToGrid(tShape, 0, grid, leftCol + 4, bottomRow - 2);

      expect(blockOffGrid).toBeFalsy();
      expect(newGrid[16].indexOf(tShape)).toBe(4);
      expect(newGrid[16].lastIndexOf(tShape)).toBe(6);
      expect(newGrid[17].indexOf(tShape)).toBe(5);
    });

    it('adds a block to the top of a grid', () => {
      const { newGrid, blockOffGrid } = addBlockToGrid(tShape, 0, grid, leftCol + 4, topRow - 1);

      expect(blockOffGrid).toBeFalsy();
      expect(newGrid[0].indexOf(tShape)).toBe(4);
      expect(newGrid[0].lastIndexOf(tShape)).toBe(6);
      expect(newGrid[1].indexOf(tShape)).toBe(5);
    });

    it('identifies when the block is off the grid and does not add it', () => {
      const { newGrid, blockOffGrid } = addBlockToGrid(tShape, 0, grid, leftCol + 4, topRow - 2);

      expect(blockOffGrid).toBeTruthy();
      expect(newGrid).toEqual(grid);
    });
  });

  describe('checkRows()', () => {
    it('should return 0 points for an empty grid', () => {
      const grid = gridDefault();

      expect(checkRows(grid)).toBe(0);
    });

    it('should return 40 points for a single complete row', () => {
      const grid = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
      ];

      expect(checkRows(grid)).toBe(40);
    });

    it('should return 100 points for two complete rows', () => {
      const grid = [
        [0, 0, 0],
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
      ];

      expect(checkRows(grid)).toBe(100);
    });

    it('should return 300 points for three complete rows', () => {
      const grid = [
        [0, 1, 0],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      expect(checkRows(grid)).toBe(300);
    });

    it('should return 1200 points for four complete rows', () => {
      const grid = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
      ];

      expect(checkRows(grid)).toBe(1200);
    });
  });

  describe('defaultState()', () => {
    const state = defaultState();

    it('should be defined', () => {
      expect(state).toBeDefined();
      expect(state.tetris).toBeDefined();
      expect(state.tetrisHistory).toBeDefined();
    });

    it('should have the correct default tetris game slice', () => {
      expect(state.tetris.gameOver).toBeFalsy();
      expect(state.tetris.grid).toEqual(gridDefault());
      expect(state.tetris.isRunning).toBeFalsy();
      expect(state.tetris.level).toBe(1);
      expect(state.tetris.nextShape).toBeTruthy();
      expect(state.tetris.pieceStats).toEqual([0, 0, 0, 0, 0, 0, 0]);
      expect(state.tetris.rotation).toBe(0);
      expect(state.tetris.score).toBe(0);
      expect(state.tetris.shape).toBeTruthy();
      expect(state.tetris.shouldSave).toBeFalsy();
      expect(state.tetris.speed).toBe(250);
      expect(state.tetris.x).toBe(4);
      expect(state.tetris.y).toBe(-4);
    });

    it('should have an empty tetris history slice', () => {
      expect(state.tetrisHistory.gameHistory).toMatchObject({});
      expect(state.tetrisHistory.highScores).toEqual([]);
      expect(state.tetrisHistory.shouldSave).toBeFalsy();
    });
  });

  describe('nextRotation()', () => {
    it('returns a valid index rotating clockwise', () => {
      shapes.map((shape, idx) => {
        if (idx === 0) return;
        for (let i = 0; i < shape.length; i++) {
          const rotation = nextRotation(idx, i, false);

          expect(rotation).toBe((i + 1) % shape.length);
        }
      });
    });

    it('returns a valid index rotating counter-clockwise', () => {
      shapes.map((shape, idx) => {
        if (idx === 0) return;
        for (let i = 0; i < shape.length; i++) {
          const rotation = nextRotation(idx, i, true);
          const expectedRotation = (i - 1) % shape.length;

          expect(rotation).toBe(expectedRotation >= 0 ? expectedRotation : shape.length - 1);
        }
      });
    });
  });
});
