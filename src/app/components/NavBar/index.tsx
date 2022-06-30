import * as React from 'react';
import Box from '@mui/material/Box';
import Logo from './Logo';
import SearchInput from './SearchInput';
import ThemeSwitcherButton from './ThemeSwitcherButton';
import NetworkSelect from './NetworkSelect';
import { useTheme, useMediaQuery } from '@mui/material';
import Links from './Links';
import AppBar from '@mui/material/AppBar';
import Drawer from './Drawer';

/*
 * ToDo
 * Change the position for the navbar to fixed position
 * Add suppot for the Toolbar component
 * Change the structure of the component
 */

export function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery('@media (max-width:1024px)');
  const themeMode = theme.palette.mode === 'light' ? true : false;

  return (
    <AppBar
      position="static"
      sx={{
        transition: 'box-shadow 0s',
        boxShadow: `0px 1px 0px ${themeMode ? '#eeeeee' : '#424242'}`,
        marginBottom: '16px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          height: 'auto',
          backgroundColor: 'primary.dark',
          p: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          [theme.breakpoints.down('md')]: {
            padding: '1rem 0.2rem',
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {isMobile && <Drawer />}
          <Logo />
        </Box>
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
            [theme.breakpoints.down('md')]: {
              gap: '0.5rem',
            },
          }}
        >
          <NetworkSelect />
          <ThemeSwitcherButton />
        </Box>
      </Box>
      {!isMobile && <Links />}
    </AppBar>
  );
}
