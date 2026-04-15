import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { paused } from '~/tetris/tetrisSlice';
import { gameSaved } from '~/tetris/tetrisHistorySlice';
import { useAppSelector } from '~/hooks/useAppHooks';

export default function TetrisScoreBoard() {
  const dispatch = useDispatch();
  const { score, isRunning, level, gameOver, grid } = useAppSelector((state) => state.tetris);

  const saveAndRestart = () => {
    dispatch(
      gameSaved({
        grid: grid,
        score: score,
        player: 'me',
        level: level,
        timestamp: new Date().toISOString(),
      }),
    );
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.altKey || e.metaKey || e.ctrlKey) {
      return;
    }

    switch (e.key) {
      case 'Escape':
        saveAndRestart();
        break;
      case ' ':
        dispatch(paused());
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  });

  return (
    <div className="score-board">
      <div>Score:{score}</div>
      <div>Level: {level}</div>
      <button
        type="button"
        className="score-board-button"
        onClick={() => {
          if (gameOver) {
            return;
          }

          dispatch(paused());
        }}
      >
        {isRunning ? (
          <span
            aria-label="pause game"
            className="material-symbols-rounded"
          >
            pause
          </span>
        ) : (
          <span
            aria-label="resume game"
            className="material-symbols-rounded"
          >
            play_arrow
          </span>
        )}
      </button>
      <button
        type="button"
        className="score-board-button"
        onClick={() => {
          saveAndRestart();
        }}
      >
        <span
          aria-label="new game"
          className="material-symbols-rounded"
        >
          add_2
        </span>
      </button>
    </div>
  );
}
