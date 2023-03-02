/**
 * Create the store with dynamic reducers
 */

import { configureStore, StoreEnhancer } from '@reduxjs/toolkit'

import blocksReducer from './cchainSlice'
import xchainReducer from './xchainSlice'
import appConfigReducer from './app-config'
import co2emissionsReducer from './co2emissionsSlice'
import { store } from 'index'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import validatorsSlice from './validatorsSlice'
import blockchainDatachartsReducer from './blockchainDatachartsSlice'

export function configureAppStore() {
    const enhancers = [] as StoreEnhancer[]

    const store = configureStore({
        reducer: {
            cchain: blocksReducer,
            xchain: xchainReducer,
            validators: validatorsSlice,
            appConfig: appConfigReducer,
            co2emissions: co2emissionsReducer,
            blockchainDataCharts: blockchainDatachartsReducer,
        },
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
        devTools: process.env.NODE_ENV !== 'production',
        enhancers,
    })

    return store
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
