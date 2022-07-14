import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

export interface Network {
  id: string;
  displayName: string;
  protocol: string;
  host: string;
  port: number;
  predefined?: boolean;
  magellanAddress: string;
}

const getNetworkFromLocalStorage = () => {
  let activeNetwork = localStorage.getItem('activeNetwork');
  if (activeNetwork) return JSON.parse(activeNetwork);
  else {
    localStorage.setItem('activeNetwork', JSON.stringify('camino-testnet'));
    return 'camino-testnet';
  }
};

const getCustomNetworksFromLocalStorage = () => {
  let customNetworks = localStorage.getItem('customNetworks');
  if (customNetworks) {
    return JSON.parse(customNetworks);
  }
  return [];
};

let initialState = {
  activeNetwork: getNetworkFromLocalStorage(),
  networks: [
    {
      id: 'camino-testnet',
      displayName: 'Columbus',
      protocol: 'https',
      host: 'columbus.camino.foundation',
      magellanAddress: 'https://magellan.columbus.camino.foundation',
      port: 443,
      predefined: true,
    },
    {
      id: 'mainnet-testnet',
      displayName: 'Mainnet',
      protocol: 'https',
      host: 'columbus.camino.foundation',
      magellanAddress: 'https://magellan.columbus.camino.foundation',
      port: 443,
      predefined: true,
    },
    ...(getCustomNetworksFromLocalStorage() as Network[]),
  ],
};

const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    changeNetwork: (state, action) => {
      let active = state.networks.find(
        item => item.displayName === action.payload,
      );
      state.activeNetwork = active?.id;
      localStorage.setItem('activeNetwork', JSON.stringify(active?.id));
    },
    addCustomNetwork: (state, action) => {
      state.networks = [...state.networks, action.payload];
    },
  },
});

export const getActiveNetwork = (state: RootState) =>
  state.networks.activeNetwork;
export const getNetworks = (state: RootState) => state.networks.networks;
export const { changeNetwork, addCustomNetwork } = networkSlice.actions;
export default networkSlice.reducer;
