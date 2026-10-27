import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { PropsWithChildren, ReactElement } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '@app/store';

type ExtendedRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  store?: AppStore;
};

function StoreProvider({ children, store }: PropsWithChildren<{ store: AppStore }>) {
  return <Provider store={store}>{children}</Provider>;
}

function renderWithProviders(ui: ReactElement, options: ExtendedRenderOptions = {}) {
  const { store = makeStore(), ...renderOptions } = options;
  const user = userEvent.setup();

  return {
    user,
    store,
    ...render(ui, {
      wrapper: ({ children }) => <StoreProvider store={store}>{children}</StoreProvider>,
      ...renderOptions,
    }),
  };
}

export * from '@testing-library/react';
export { renderWithProviders };
