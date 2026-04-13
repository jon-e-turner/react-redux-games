import { useSelector } from 'react-redux';
import { useIsClient } from '~/hooks/useIsClient';
import TetrisBlock from '~/tetris/components/tetris-block';
import { shapes } from '~/utils';
import type { AppState } from '~/store';

export default function TetrisNextBlock() {
  const isClient = useIsClient();
  const nextShape = useSelector((state: AppState) => state.tetris.nextShape);

  if (!isClient) return null;

  const box = shapes[nextShape][0];

  const grid = box.map((rowArray, row) => {
    return rowArray.map((square, col) => {
      return (
        <TetrisBlock
          key={`${row}${col}`}
          // replace the blank squares with an invisible box
          color={square === 0 ? 0 : nextShape}
        />
      );
    });
  });

  return (
    <div>
      <div className="next-label">Next:</div>
      <div className="next-block">{grid}</div>
    </div>
  );
}
