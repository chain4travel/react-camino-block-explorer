/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit';

import blocksSlice from './cchainSlice';
import networks from './app-config';
import { store } from 'index';
import { useDispatch } from 'react-redux';

export function configureAppStore() {
  // const middlewares = [sagaMiddleware];

  const enhancers = [] as StoreEnhancer[];

  const store = configureStore({
    reducer: {
      cchain: blocksSlice,
      networks,
    },
    // middleware: [...getDefaultMiddleware(), ...middlewares],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  return store;
}

// export const store = configureAppStore();
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
