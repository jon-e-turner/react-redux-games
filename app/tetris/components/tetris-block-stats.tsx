import { shapes } from '~/utils';
import TetrisBlock from './tetris-block';

const emptyStats = [0, 0, 0, 0, 0, 0, 0];
export default function TetrisBlockStats({
  stats = emptyStats,
}: {
  stats: number[];
}) {
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
          <div key={`small-${shape}`} className="flex flex-row">
            <div className="small-block ps-1">{grid}</div>
            <div className="piece-hist">
              <progress
                className="stat-bar pe-1 ps-1 self-center"
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
