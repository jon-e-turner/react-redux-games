import { describe, it, expect } from 'vitest';
import { canMoveTo, gridDefault, shapes } from '~/utils';

describe('canMoveTo()', () => {
  const tShape = 2;
  const emptyGrid = gridDefault();
  const emptyGridMaxX = emptyGrid[0].length - 1;
  const emptyGridMidX = Math.ceil(emptyGridMaxX / 2);
  const emptyGridMaxY = emptyGrid.length - 1;
  const emptyGridMidY = Math.ceil(emptyGridMaxY / 2);

  describe('when piece is above grid', () => {
    const y = -4;

    it('cannot move off the right side of the grid', () => {
      const canMove = canMoveTo(tShape, emptyGrid, emptyGridMaxX + 1, y, 0);

      expect(canMove).toBeFalsy();
    });

    it('cannot move off the left side of the grid', () => {
      const canMove = canMoveTo(tShape, emptyGrid, -1, y, 0);

      expect(canMove).toBeFalsy();
    });

    it('can rotate', () => {
      const maxRotations = shapes[tShape].length - 1;
      for (let idx = 0; idx <= maxRotations; idx++) {
        const canMove = canMoveTo(tShape, emptyGrid, emptyGridMidX, y, idx);

        expect(canMove).toBeTruthy();
      }
    });

    it('can move down into an empty space', () => {
      const canMove = canMoveTo(tShape, emptyGrid, emptyGridMidX, 0, 0);

      expect(canMove).toBeTruthy();
    });
  });

  describe('when piece is on the grid', () => {
    const halfFilledGrid = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 0, 1, 1],
      [0, 0, 0, 0, 0, 1, 1, 1],
      [1, 0, 0, 0, 1, 1, 1, 1],
      [1, 0, 0, 1, 1, 1, 1, 1],
      [1, 0, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1],
    ];

    it('cannot move off the right side of the grid', () => {
      const canMove = canMoveTo(tShape, emptyGrid, emptyGridMaxX + 1, emptyGridMidY, 0);

      expect(canMove).toBeFalsy();
    });

    it('cannot move off the left side of the grid', () => {
      const canMove = canMoveTo(tShape, emptyGrid, -1, emptyGridMidY, 0);

      expect(canMove).toBeFalsy();
    });

    it('can move down into an empty space', () => {
      const canMove = canMoveTo(tShape, halfFilledGrid, 2, 2, 0);

      expect(canMove).toBeTruthy();
    });

    it('cannot move into an occupied space', () => {
      const canMove = canMoveTo(tShape, halfFilledGrid, 4, 4, 0);

      expect(canMove).toBeFalsy();
    });

    it('cannot move down off the bottom of the grid', () => {
      const canMove = canMoveTo(tShape, emptyGrid, emptyGridMidX, emptyGridMaxY + 1, 0);

      expect(canMove).toBeFalsy();
    });

    it('can rotate', () => {
      const maxRotations = shapes[tShape].length - 1;
      for (let idx = 0; idx <= maxRotations; idx++) {
        const canMove = canMoveTo(tShape, emptyGrid, emptyGridMidX, emptyGridMidY, idx);

        expect(canMove).toBeTruthy();
      }
    });

    it('cannot rotate off the grid', () => {
      /**
       * Trying to rotate this piece counter-clockwise should fail.
       *
       * [0, |1, 0, 0], 0, ...| => [0, |1, 0, 0], 0 ...|
       * [0, |1, 1, 0], 0, ...| => [1, |1, 1, 0], 0 ...|
       * [0, |1, 0, 0], 0, ...| => [0, |0, 0, 0], 0 ...|
       * [0, |0, 0, 0], 0, ...| => [0, |0, 0, 0], 0 ...|
       * ^   ^ grid left edge ^ grid right edge
       * | piece boundary
       */
      const initialPosition = canMoveTo(tShape, emptyGrid, -1, emptyGridMidY, 3);
      const rotatedPosition = canMoveTo(tShape, emptyGrid, -1, emptyGridMidY, 0);

      expect(initialPosition).toBeTruthy();
      expect(rotatedPosition).toBeFalsy();
    });

    it('cannot rotate into an occupied space', () => {
      const initialPosition = canMoveTo(tShape, halfFilledGrid, 0, 4, 3);
      const rotatedPosition = canMoveTo(tShape, halfFilledGrid, 0, 4, 0);
      const rotatedAcwPosition = canMoveTo(tShape, halfFilledGrid, 0, 4, 2);

      expect(initialPosition).toBeTruthy();
      expect(rotatedPosition).toBeFalsy();
      expect(rotatedAcwPosition).toBeFalsy();
    });
  });
});
