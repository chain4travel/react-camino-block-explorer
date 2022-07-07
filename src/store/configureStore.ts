/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';

import blocksSlice from './cchainSlice';
import xchainSlice from './xchainSlice';
import networks from './app-config';
import { store } from 'index';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

export function configureAppStore() {
  // const middlewares = [sagaMiddleware];

  const enhancers = [] as StoreEnhancer[];

  const store = configureStore({
    reducer: {
      cchain: blocksSlice,
      xchain: xchainSlice,
      networks,
    },
    // middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}

export type RootState = ReturnType<typeof store.getState>;
// export const store = configureAppStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
