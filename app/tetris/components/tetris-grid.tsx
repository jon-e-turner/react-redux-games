import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { movedDown } from '~/tetris/tetrisSlice';
import { shapes } from '~/utils';
import TetrisBlock from '~/tetris/components/tetris-block';
import type { AppState } from '~/store';

export default function TetrisGrid({
  initialGrid,
}: {
  initialGrid?: number[][];
}) {
  const requestRef = useRef(0);
  const lastUpdateTimeRef = useRef(0);
  const progressTimeRef = useRef(0);
  const dispatch = useDispatch();

  const { grid, shape, rotation, x, y, isRunning, speed } = useSelector(
    (state: AppState) => state.tetris,
  );

  const block = shapes[shape][rotation];
  const blockColor = shape;

  const gridSquares = grid.map((rowArray, row) => {
    // map columns
    return rowArray.map((square, col) => {
      // Find the block x and y on the shape grid
      // By subtracting the x and y from the col and the row we get the position of the upper left corner of the block array as if it was superimposed over the main grid
      const blockX = col - x;
      const blockY = row - y;
      let color = square;
      // Map current falling block to grid.
      // For any squares that fall on the grid we need to look at the block array and see if there is a 1 in this case we use the block color.
      if (
        blockX >= 0 &&
        blockX < block.length &&
        blockY >= 0 &&
        blockY < block.length
      ) {
        color = block[blockY][blockX] === 0 ? color : blockColor;
      }
      // Generate a unique key for every block
      const k = row * grid[0].length + col;
      // Generate a grid square
      return <TetrisBlock key={k} color={color} />;
    });
  });

  const update = (time: number) => {
    requestRef.current = requestAnimationFrame(update);

    if (!isRunning) {
      return;
    }

    if (!lastUpdateTimeRef.current) {
      lastUpdateTimeRef.current = time;
    }

    const deltaTime = time - lastUpdateTimeRef.current;
    progressTimeRef.current += deltaTime;

    if (progressTimeRef.current > speed) {
      dispatch(movedDown());
      progressTimeRef.current = 0;
    }

    lastUpdateTimeRef.current = time;
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [isRunning]);

  return <div className="tetris-board">{gridSquares}</div>;
}
