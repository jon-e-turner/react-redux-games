import { type TetrisGameRecord } from '~/tetris/tetrisHistorySlice';
import TetrisGameHistoryEntry from './tetris-game-history-entry';
import { useState } from 'react';

export default function TetrisGameHistory({
  data,
  title,
  isVisible,
  onRequestClose,
}: {
  data: TetrisGameRecord[];
  title: string;
  isVisible: boolean;
  onRequestClose: () => void;
}) {
  const [expandedEntries, setExpandedEntries] = useState<number[]>([]);

  const handleEntryExpandCollapse = (index: number) => {
    if (expandedEntries.includes(index)) {
      setExpandedEntries(expandedEntries.filter((val) => val !== index));
    } else {
      setExpandedEntries([...expandedEntries, index]);
    }
  };

  const classes = `full-screen-overlay ${isVisible ? '' : 'hidden'}`;

  return (
    <div className={classes}>
      <div className="full-screen-overlay-content">
        <div className="overlay-header">
          <div className="self-center">{title}</div>
          <button
            type="button"
            className="nav-button ms-auto"
            onClick={onRequestClose}
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        <div className="history-list">
          {data?.map((value, index) => {
            return (
              <TetrisGameHistoryEntry
                handleExpandClick={() => handleEntryExpandCollapse(index)}
                isExpanded={expandedEntries.includes(index)}
                key={index}
                gameRecord={value}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
