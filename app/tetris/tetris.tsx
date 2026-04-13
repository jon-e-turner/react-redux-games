import MessagePopup from '~/components/message-popup';
import TetrisControls from '~/tetris/components/tetris-controls';
import TetrisGrid from '~/tetris/components/tetris-grid';
import TetrisNextBlock from '~/tetris/components/tetris-next-block';
import TetrisScoreBoard from '~/tetris/components/tetris-score-board';
import TopNavigation from '~/components/top-navigation';
import { RandomBag, shapes } from '~/utils';

export default function Tetris() {
  return (
    <>
      <TopNavigation />
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Tetris Redux</h1>
        </header>
        <TetrisGrid />
        <TetrisNextBlock />
        <TetrisScoreBoard />
        <TetrisControls />
        <MessagePopup />
      </div>
    </>
  );
}
