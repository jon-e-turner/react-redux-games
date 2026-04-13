import { useState } from 'react';
import GameBoardSpace from '~/components/game-board-space';
import GameTile from '~/components/game-tile';

const generateGameBoard = (rows: number, columns: number = rows) => {
  return Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, colIndex) => {
      return (
        <GameBoardSpace key={`${rowIndex}-${colIndex}`}>{<></>}</GameBoardSpace>
      );
    }),
  );
};

export default function GameBoard({
  gridRows,
  gridCols = gridRows,
  initialTiles,
}: {
  gridRows: number;
  gridCols?: number;
  initialTiles?: React.ReactNode[];
}) {
  const board = generateGameBoard(gridRows, gridCols);
  var [tiles, setTiles] = useState(initialTiles ?? []);
  var [selected, setSelected] = useState<{ row?: number; col?: number }>({});

  const handleCellClick = (row: number, col: number) => {
    if (selected.row === row && selected.col === col) {
      setSelected({});
    } else {
      setSelected({ row, col });
    }
  };

  return (
    <div className="board">
      {board.map((row) =>
        // rowTiles = tiles.filter()
        row.map((space) => {
          return <>{space}</>;
        }),
      )}
    </div>
  );
}
