import React from 'react';
import TetrisBlock from '~/tetris/components/tetris-block';
import { shapes } from '~/utils';
import TetrisBlockStats from './tetris-block-stats';
import { useAppSelector } from '~/hooks/useAppHooks';

export function HydrateFallback() {
  return <div>Hydration Skeleton</div>;
}

export default function TetrisNextBlock() {
  const { nextShape, pieceStats } = useAppSelector((state) => state.tetris);

  const box = shapes[nextShape][0];

  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return (
        <TetrisBlock
          key={`${row}${col}`}
          color={square === 0 ? 0 : nextShape}
        />
      );
    });
  });

  return (
    <div>
      <div className="next-label">Next:</div>
      <div className="next-block">{grid}</div>
      <div>
        <TetrisBlockStats stats={pieceStats} />
      </div>
    </div>
  );
}
