import { createSlice } from '@reduxjs/toolkit';
import { getChains } from 'api';
import { RootState } from 'store/configureStore';
import { Chain, Network } from 'types/store';

const getNetworkFromLocalStorage = () => {
  let activeNetwork = localStorage.getItem('activeNetwork');
  if (activeNetwork === 'undefined') {
    localStorage.setItem('activeNetwork', JSON.stringify('camino-testnet'));
    return 'camino-testnet';
  }
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

interface chainArgs {
  alias: string;
  chainID: string;
}
interface initialStateAppConfigType {
  activeNetwork?: string;
  networks: Network[];
  chains: chainArgs[];
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
    removeCustomNetwork: (state, action) => {
      state.networks = state.networks.filter(
        item => item.id !== action.payload,
      );
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

// Select Active Network
export const getActiveNetwork = (state: RootState) =>
  state.appConfig.activeNetwork;
// Select magellanAddress
export const selectMagellanAddress = (state: RootState) => {
  // state.appConfig.networks.filter()
  let networks = state.appConfig;
  let activeNetwork = networks.networks.find(
    element => element.id === networks.activeNetwork,
  );
  return activeNetwork?.magellanAddress;
};

// Select All networks
export const getNetworks = (state: RootState) => state.appConfig.networks;
// Select All chains
export const selectAllChains = (state: RootState) => state.appConfig.chains;
// Select All chain
// export const selectChain = (state: RootState, location: string) => {
//   return state.appConfig.chains;
// };

export const { changeNetwork, addCustomNetwork, removeCustomNetwork } =
  appConfigSlice.actions;
export default appConfigSlice.reducer;
