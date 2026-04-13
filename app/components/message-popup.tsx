import { useAppSelector } from '~/hooks/useAppHooks';

export default function MessagePopup() {
  const { isRunning, gameOver } = useAppSelector((state) => state.tetris);

  const showPopup = gameOver || !isRunning;

  const classes = `message-popup ${showPopup ? '' : 'hidden'}`;

  const popupTitle = gameOver ? 'Game Over!' : 'Paused';

  return (
    <div className={classes}>
      <div className="message-text">{popupTitle}</div>
    </div>
  );
}
