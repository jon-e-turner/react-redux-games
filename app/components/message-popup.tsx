import { useAppSelector } from '~/hooks/useAppHooks';

export default function MessagePopup() {
  const { isRunning, gameOver } = useAppSelector((state) => state.tetris);

  const showPopup = gameOver || !isRunning;

  const popupTitle = gameOver ? 'Game Over!' : 'Paused';

  return (
    <div
      className="message-popup"
      style={{ visibility: showPopup ? 'visible' : 'hidden' }}
    >
      <div className="message-text">{popupTitle}</div>
    </div>
  );
}
