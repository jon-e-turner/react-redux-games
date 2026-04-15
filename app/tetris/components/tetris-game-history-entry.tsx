import { type TetrisGameRecord } from '~/tetris/tetrisHistorySlice';
import TetrisBlock from './tetris-block';

export default function TetrisGameHistoryEntry({
  gameRecord,
  isExpanded = false,
  handleExpandClick,
  handleCollapseClick = handleExpandClick,
}: {
  gameRecord: TetrisGameRecord;
  isExpanded: boolean;
  handleExpandClick: () => void;
  handleCollapseClick?: () => void;
}) {
  if (isExpanded) {
    return (
      <div className="tetris-history-entry items-stretch">
        <div className="tetris-board">
          {gameRecord.grid.map((rowArray, row) => {
            return rowArray.map((square, col) => {
              const k = row * gameRecord.grid[0].length + col;
              return (
                <TetrisBlock
                  key={k}
                  color={square}
                />
              );
            });
          })}
        </div>
        <div className="flex flex-auto flex-col content-stretch justify-between pl-4">
          <button
            type="button"
            aria-label="collapse details"
            className="nav-button mb-auto self-end"
            onClick={handleCollapseClick}
          >
            <div className="material-symbols-rounded flex-1 pr-2 pb-1">collapse_content</div>
          </button>
          <label htmlFor="score">Score: </label>
          <div
            id="score"
            className=""
          >
            {gameRecord.score}
          </div>
          <label htmlFor="level">Level: </label>
          <div
            id="level"
            className=""
          >
            {gameRecord.level}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="tetris-history-entry items-center">
        <div className="flex-1 text-left">Score:</div>
        <div className="flex-3 pr-4 text-right">{gameRecord.score}</div>
        <div className="flex-1 text-left">Level:</div>
        <div className="flex-1 pr-2 text-right">{gameRecord.level}</div>
        <button
          type="button"
          aria-label="expand details"
          className="nav-button"
          onClick={handleExpandClick}
        >
          <div className="material-symbols-rounded flex-1 pr-2">expand_content</div>
        </button>
      </div>
    );
  }
}
