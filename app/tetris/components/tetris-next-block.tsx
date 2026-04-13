import { useIsClient } from '~/hooks/useIsClient';
import TetrisBlock from '~/tetris/components/tetris-block';
import { shapes } from '~/utils';
import TetrisBlockStats from './tetris-block-stats';
import { useAppSelector } from '~/hooks/useAppHooks';

export default function TetrisNextBlock() {
  const isClient = useIsClient();
  const { nextShape, pieceStats } = useAppSelector((state) => state.tetris);

  // Stop SSR since the input is random.
  if (!isClient) return null;

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
