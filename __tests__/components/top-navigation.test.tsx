import { describe, it, expect } from 'vitest';
import TopNavigation from '~/components/top-navigation';
import { BrowserRouter } from 'react-router';
import { render } from 'vitest-browser-react';

describe('TopNavigation', async () => {
  it('renders a back button', async () => {
    const screen = await render(
      <BrowserRouter>
        <TopNavigation>
          <div></div>
        </TopNavigation>
      </BrowserRouter>,
    );

    expect(screen.getByLabelText('navigate back')).toBeInTheDocument();
  });
});
