import * as React from 'react';
import Box from '@mui/material/Box';
import Logo from './Logo';
import SearchInput from './SearchInput';
import ThemeSwitcherButton from './ThemeSwitcherButton';
import NetworkSelect from './NetworkSelect';
import { useMediaQuery } from '@mui/material';
import Links from './Links';

export function NavBar() {
  const isMobile = useMediaQuery('@media (max-width:1024px)');

  return (
    <header>
      <Box
        sx={{
          display: 'flex',
          height: 'auto',
          backgroundColor: 'primary.dark',
          p: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <Logo />
        <Box
          sx={{
            display: 'flex',
            marginLeft: isMobile ? 'auto' : '0',
          }}
        >
          <SearchInput />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <NetworkSelect />
          <ThemeSwitcherButton />
        </Box>
      </Box>
      <Links />
    </header>
  );
}
