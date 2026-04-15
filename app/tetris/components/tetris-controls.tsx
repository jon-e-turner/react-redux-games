import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks/useAppHooks';
import { movedDown, movedLeft, movedRight, rotated } from '~/tetris/tetrisSlice';

export default function TetrisControls() {
  const dispatch = useAppDispatch();
  const { isRunning, gameOver } = useAppSelector((state) => state.tetris);

  const shouldDispatch = isRunning && !gameOver;

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!shouldDispatch) {
      return;
    }

    if (e.altKey || e.metaKey || e.ctrlKey) {
      return;
    }

    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        dispatch(rotated(e.shiftKey));
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        dispatch(movedLeft());
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        dispatch(movedRight());
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        dispatch(movedDown());
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
    <div className="controls">
      {/* left */}
      <button
        type="button"
        aria-label="move left"
        className="control-button control-button-a"
        disabled={!shouldDispatch}
        onClick={() => {
          if (shouldDispatch) {
            dispatch(movedLeft());
          }
        }}
      >
        <span className="material-symbols-rounded">arrow_back</span>
      </button>

      {/* right */}
      <button
        type="button"
        aria-label="move right"
        className="control-button control-button-d move-right"
        disabled={!shouldDispatch}
        onClick={() => {
          if (shouldDispatch) {
            dispatch(movedRight());
          }
        }}
      >
        <span className="material-symbols-rounded">arrow_forward</span>
      </button>

      {/* rotate left */}
      <button
        type="button"
        aria-label="rotate counterclockwise"
        className="control-button control-button-w-left rotate-block"
        disabled={!shouldDispatch}
        onClick={() => {
          if (shouldDispatch) {
            dispatch(rotated(true));
          }
        }}
      >
        <span className="material-symbols-rounded">rotate_left</span>
      </button>

      {/* rotate */}
      <button
        type="button"
        aria-label="rotate clockwise"
        className="control-button control-button-w rotate-block"
        disabled={!shouldDispatch}
        onClick={() => {
          if (shouldDispatch) {
            dispatch(rotated(false));
          }
        }}
      >
        <span className="material-symbols-rounded">rotate_right</span>
      </button>

      {/* down */}
      <button
        type="button"
        aria-label="move down"
        className="control-button control-button-s move-down"
        disabled={!shouldDispatch}
        onClick={() => {
          if (shouldDispatch) {
            dispatch(movedDown());
          }
        }}
      >
        <span className="material-symbols-rounded">arrow_downward</span>
      </button>
    </div>
  );
}
