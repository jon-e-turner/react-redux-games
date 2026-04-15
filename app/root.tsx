import { isRouteErrorResponse, Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from 'react-router';

import type { Route } from './+types/root';
import '~/app.css';
import { Provider } from 'react-redux';
import configureAppStore, { type AppState } from '~/store';
import { loadState, saveState } from '~/utils';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@40,700,0,0&icon_names=add_2,arrow_back,arrow_downward,arrow_forward,block,close,collapse_content,delete,expand_content,history_2,home,pause,play_arrow,rotate_auto,rotate_left,rotate_right,social_leaderboard&display=block',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function HydrateFallback() {
  return <div>Skeleton for server-side rendering</div>;
}

export async function clientLoader({}: Route.ClientLoaderArgs) {
  const clientData = loadState();
  return clientData;
}

export default function App() {
  const savedState = useLoaderData<AppState>();
  const store = configureAppStore(savedState);

  store.subscribe(() => {
    const state = store.getState();

    if (state.tetris.shouldSave || state.tetrisHistory.shouldSave) {
      saveState({
        tetris: { ...state.tetris, isRunning: false },
        tetrisHistory: { ...state.tetrisHistory },
      });
    }
  });

  return (
    <>
      <Provider store={store}>
        <Outlet />
      </Provider>
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
