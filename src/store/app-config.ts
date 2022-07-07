import { createSlice } from '@reduxjs/toolkit';

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
      protocol: 'http',
      host: 'columbus.camino.foundation',
      magellanAddress: 'https://magellan.columbus.camino.foundation',
      port: 9650,
      predefined: true,
    },
    {
      id: 'mainnet-testnet',
      displayName: 'Mainnet',
      protocol: 'http',
      host: 'columbus.camino.foundation',
      magellanAddress: 'https://magellan.columbus.camino.foundation/mainnet',
      port: 9650,
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

export const getActiveNetwork = state => state.networks.activeNetwork;
export const getNetworks = state => state.networks.networks;
export const { changeNetwork } = networkSlice.actions;
export default networkSlice.reducer;
