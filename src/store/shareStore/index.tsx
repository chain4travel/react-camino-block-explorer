import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../App'
import { changeNetwork, changeTheme, selectedTheme, updateNetworks } from '../app-config'
import { resetCChainReducer } from '../cchainSlice'
import { useAppDispatch, useAppSelector } from '../configureStore'
import { resetValidatorsReducer } from '../validatorsSlice'
import { resetXPChainReducer } from '../xchainSlice'

export const useStore = () => {
    const state = useAppSelector(state => state)
    const selectedThemeExplorer = useAppSelector(selectedTheme)
    const dispatch = useAppDispatch()

    function switchNetwork(network: string) {
        dispatch(resetCChainReducer())
        dispatch(resetValidatorsReducer())
        dispatch(resetXPChainReducer())
        dispatch(changeNetwork(network))
    }

    return {
        state,
        selectedThemeExplorer,
        changeTheme: (theme: string) => {
            dispatch(changeTheme(theme))
        },
        updateNetworks: (networks: string) => {
            dispatch(updateNetworks(networks))
        },
        changeNetworkExplorer: (network: string) => switchNetwork(network),
    }
}

export function ExplorerStoreProvider({ children }: { children: React.ReactElement }) {
    return <Provider store={store}>{children}</Provider>
}
