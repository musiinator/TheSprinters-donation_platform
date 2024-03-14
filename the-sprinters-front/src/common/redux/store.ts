import { useMemo } from 'react';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducers from './reducers/index';

let store: any;

const initStore = (initialState: any) => {
  return createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};

export const wrapper = createWrapper<any>(initStore);

export const initializeStore = (preloadedState: any) => {
  let _store = store ?? initStore(preloadedState);

  /** After navigating to a page with an initial Redux state,
   * merge that state with the current state in the store,
   * and create a new store */
  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });
    /** Reset the current store */
    store = undefined;
  }

  /** For SSG and SSR always create a new store */
  if (typeof window === 'undefined') return _store;
  /** Create the store once in the client */
  if (!store) store = _store;

  return _store;
};

export const useStore = (initialState: any) => {
  return useMemo(() => initializeStore(initialState), [initialState]);
};

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
