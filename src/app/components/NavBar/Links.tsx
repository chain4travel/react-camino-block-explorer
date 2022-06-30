import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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
  };

  return (
    <ul
      style={{
        cursor: 'pointer',
        width: '100%',
        height: '48px',
        padding: '0 8px',
        backgroundColor: 'primary.dark',
        boxShadow: `0px 1px 0px`,
        gap: '1rem',
        listStyle: 'none',
        alignItems: 'center',
      }}
    >
      <Tabs variant="fullWidth" value={value} onChange={handleChange}>
        <Tab className="tab" label="C-Chain" {...a11yProps(0)} />
        <Tab className="tab" label="X-Chain" {...a11yProps(1)} />
        <Tab className="tab" label="P-Chain" {...a11yProps(2)} />
        <Tab className="tab" label="Docs" {...a11yProps(3)} />
        <Tab className="tab" label="Wallet" {...a11yProps(4)} />
      </Tabs>
    </ul>
  );
}
