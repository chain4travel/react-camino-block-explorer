import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  activeNetwork: 'camino-testnet',
  activeNetworkName: 'Columbus Network',
  networks: [
    {
      id: 'camino-testnet',
      displayName: 'Columbus Network',
      protocol: 'http',
      host: 'localhost',
      magellanAddress: 'http://localhost:8080',
      port: 9650,
      predefined: true,
    },
    {
      id: 'mainnet-testnet',
      displayName: 'Mainnet Network',
      predefined: true,
    },
  ],
};

const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {},
});

export default networkSlice.reducer;
