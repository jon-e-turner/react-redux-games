import { describe, it, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import TetrisBlockStats from '~/tetris/components/tetris-block-stats';
import { shapes } from '~/utils';

describe('TetrisBlockStats', async () => {
  it('renders each block with 0 count by default', async () => {
    const screen = await render(<TetrisBlockStats />);

    for (let idx = 1; idx < shapes.length; idx++) {
      expect(screen.getByLabelText(`small-${idx}`, { exact: true })).toBeInTheDocument();
      expect(screen.getByLabelText(`small-${idx}-count-0`, { exact: true })).toBeInTheDocument();
    }
  });

  it('renders each block with the appropriate count', async () => {
    const stats = [3, 4, 5, 6, 7, 8, 9];
    const screen = await render(<TetrisBlockStats stats={stats} />);

    stats.map((count, idx) => {
      expect(screen.getByLabelText(`small-${idx + 1}`, { exact: true })).toBeInTheDocument();
      expect(screen.getByLabelText(`small-${idx + 1}-count-${count}`, { exact: true })).toBeInTheDocument();
    });
  });
});
