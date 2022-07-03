import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Links() {
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue !== 3 && newValue !== 4) setValue(newValue);
    if (newValue === 0) navigate('/c-chain');
    else if (newValue === 1) navigate('/x-chain');
    else if (newValue === 2) navigate('p-chain');
  };
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
