import { useState } from 'react';
import { Link } from 'react-router';
import TetrisGameHistory from '~/tetris/components/tetris-game-history';
import { useAppSelector } from '~/hooks/useAppHooks';
import { selectOrderedGameHistoryByPlayer, selectOrderedHighScores } from '~/tetris/tetrisHistorySlice';

export default function TopNavigation() {
  const player = 'me';
  const [isHighScoreVisible, setIsHighScoreVisible] = useState(false);
  const [isGameHistoryVisible, setIsGameHistoryVisible] = useState(false);

  const history = useAppSelector((state) => selectOrderedGameHistoryByPlayer(state, player));
  const highScores = useAppSelector((state) => selectOrderedHighScores(state));

  return (
    <div className="navigation">
      <Link to="/">
        <button
          type="button"
          className="navigate-back-button control-button nav-button"
        >
          <span
            aria-label="navigate back"
            className="material-symbols-rounded"
          >
            home
          </span>
        </button>
      </Link>
      <button
        type="button"
        className="game-history-button control-button nav-button"
        onClick={() => {
          setIsGameHistoryVisible(!isGameHistoryVisible);
          setIsHighScoreVisible(false);
        }}
      >
        <span
          aria-label="show game history"
          className="material-symbols-rounded"
        >
          history_2
        </span>
      </button>
      <button
        type="button"
        className="top-score-button control-button nav-button"
        onClick={() => {
          setIsHighScoreVisible(!isHighScoreVisible);
          setIsGameHistoryVisible(false);
        }}
      >
        <span
          aria-label="show top scores"
          className="material-symbols-rounded"
        >
          social_leaderboard
        </span>
      </button>
      <TetrisGameHistory
        key="history"
        isVisible={isGameHistoryVisible}
        data={history}
        title={`Game History -- ${player}`}
        onRequestClose={() => setIsGameHistoryVisible(false)}
      />
      <TetrisGameHistory
        key="highScores"
        isVisible={isHighScoreVisible}
        data={highScores}
        title="High Scores"
        onRequestClose={() => setIsHighScoreVisible(false)}
      />
    </div>
  );
}
