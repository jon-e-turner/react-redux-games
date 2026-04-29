import { describe, it, expect } from 'vitest';
import { renderWithProviders } from '../test-utils';
import TopNavigation from '~/components/top-navigation';
import { BrowserRouter } from 'react-router';

describe('TopNavigation', async () => {
  it('renders a back button', async () => {
    const screen = await renderWithProviders(
      <BrowserRouter>
        <TopNavigation>
          <div></div>
        </TopNavigation>
      </BrowserRouter>,
    );

    expect(screen.getByLabelText('navigate back')).toBeInTheDocument();
  });
});
