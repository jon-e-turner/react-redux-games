/* eslint-disable @eslint-react/component-hook-factories */
import React, { type PropsWithChildren } from 'react';
import { render } from 'vitest-browser-react';
import type { RenderOptions } from 'vitest-browser-react';
import { Provider } from 'react-redux';
import configureAppStore, { type AppState } from '~/store';
import type { EnhancedStore } from '@reduxjs/toolkit';
import { defaultState } from '~/utils';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries' | 'wrapper'> {
  preloadedState?: AppState;
  store?: EnhancedStore;
}

export async function renderWithProviders(ui: React.ReactElement, extendedRenderOptions: ExtendedRenderOptions = {}) {
  const {
    preloadedState = defaultState(),
    // Automatically create a store instance if no store was passed in
    store = configureAppStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>;
  const screen = await render(ui, { wrapper: Wrapper, ...renderOptions });

  return {
    store,
    screen,
  };
}
