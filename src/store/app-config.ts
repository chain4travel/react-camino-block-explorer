import { createSlice } from '@reduxjs/toolkit';
import { getChains } from 'api';
import { RootState } from 'store/configureStore';
import { Chain, Network } from 'types/store';

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

interface initialStateAppConfigType {
  activeNetwork?: string;
  networks: Network[];
  chains?: any;
}

let initialState: initialStateAppConfigType = {
  activeNetwork: getNetworkFromLocalStorage(),
  networks: [
    {
      id: 'camino-testnet',
      displayName: 'Columbus',
      protocol: 'http',
      host: 'localhost',
      magellanAddress: 'https://magellan.columbus.camino.foundation',
      port: 9650,
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
  chains: [],
};

const appConfigSlice = createSlice({
  name: 'appConfig',
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
  extraReducers(builder) {
    builder
      .addCase(getChains.pending, (state, action) => {})
      .addCase(getChains.fulfilled, (state, { payload }) => {
        state.chains = Object.entries(payload.chains).map(([key, value]) => {
          let v = value as Chain;
          return { alias: v.chainAlias, chainID: v.chainID };
        });
      })
      .addCase(getChains.rejected, (state, action) => {});
  },
});

export const getActiveNetwork = (state: RootState) =>
  state.appConfig.activeNetwork;
export const getNetworks = (state: RootState) => state.appConfig.networks;
export const { changeNetwork, addCustomNetwork } = appConfigSlice.actions;
export default appConfigSlice.reducer;
