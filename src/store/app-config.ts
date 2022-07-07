import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/configureStore';

const getNetworkFromLocalStorage = () => {
  let activeNetwork = localStorage.getItem('activeNetwork');
  if (activeNetwork) return JSON.parse(activeNetwork);
  return 'camino-testnet';
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
  },
});

export const getActiveNetwork = (state: RootState) =>
  state.networks.activeNetwork;
export const getNetworks = (state: RootState) => state.networks.networks;
export const { changeNetwork } = networkSlice.actions;
export default networkSlice.reducer;
