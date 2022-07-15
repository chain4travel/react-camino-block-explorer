import React, { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from 'react-router-dom';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const activeTab = (path: string): number => {
  switch (path) {
    case 'c-chain':
      return 0;
    case 'x-chain':
      return 1;
    case 'p-chain':
      return 2;
  }
  return 0;
};

export default function Links() {
  const location = useLocation();
  const [value, setValue] = useState(
    activeTab(location.pathname.split('/')[1]),
  );
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (location.pathname !== '/mainnet') {
      if (newValue === 3) window.open('https://docs.camino.foundation/');
      else if (newValue === 4) window.open('https://wallet.camino.foundation/');
      else if (newValue === 0) navigate('c-chain');
      else if (newValue === 1) navigate('x-chain');
      else if (newValue === 2) navigate('p-chain');
      if (newValue !== 3 && newValue !== 4) setValue(newValue);
    }
  };
  useEffect(() => {
    if (location.pathname === '/mainnet') setValue(0);
  }, [location]);

  let navigate = useNavigate();
  return (
    <Box
      sx={{
        display: 'flex',
        cursor: 'pointer',
        width: '100%',
        height: '48px',
        padding: '0 8px',
        backgroundColor: 'primary.dark',
      }}
    >
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab className="tab" disableRipple label="C-Chain" {...a11yProps(0)} />
        <Tab className="tab" disableRipple label="X-Chain" {...a11yProps(1)} />
        <Tab className="tab" disableRipple label="P-Chain" {...a11yProps(2)} />
        <Tab className="tab" disableRipple label="Docs" {...a11yProps(3)} />
        <Tab className="tab" disableRipple label="Wallet" {...a11yProps(4)} />
      </Tabs>
    </Box>
  );
}
