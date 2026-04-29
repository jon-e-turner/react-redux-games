import React from 'react';
import { shapes } from '~/utils';
import TetrisBlock from './tetris-block';

const emptyStats = [0, 0, 0, 0, 0, 0, 0];
export default function TetrisBlockStats({ stats = emptyStats }: { stats?: number[] }) {
  const highestCount = stats.slice().sort((a, b) => b - a)[0];

  return (
    <div className="piece-stats">
      {stats.map((count, idx) => {
        const shape = idx + 1;

        const grid = shapes[shape][0].map((rowArray, row) => {
          return rowArray.map((square, col) => {
            return (
              <TetrisBlock
                key={`${row}${col}`}
                color={square === 0 ? 0 : shape}
              />
            );
          });
        });

        return (
          <div
            key={`small-${shape}`}
            className="flex flex-row"
          >
            <div
              aria-label={`small-${shape}`}
              className="small-block ps-1"
            >
              {grid}
            </div>
            <div
              aria-label={`small-${shape}-count-${count}`}
              className="piece-hist"
            >
              <progress
                className="stat-bar self-center ps-1 pe-1"
                value={count}
                max={highestCount + 1}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
