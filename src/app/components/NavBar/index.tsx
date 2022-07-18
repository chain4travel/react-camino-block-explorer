import * as React from 'react';
import { useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Logo from './Logo';
import SearchInput from './SearchInput';
import ThemeSwitcherButton from './ThemeSwitcherButton';
import NetworkSelect from './NetworkSelect';
import Links from './Links';
import AppBar from '@mui/material/AppBar';
import Drawer from './Drawer';
import Toolbar from '@mui/material/Toolbar';
import useWidth from 'app/hooks/useWidth';
import { CCHAIN } from 'types/constants';

/*
 * ToDo
 * Change the position for the navbar to fixed position
 * Add suppot for the Toolbar component
 * Change the structure of the component
 */

export function NavBar() {
  const theme = useTheme();
  const { isDesktop } = useWidth();
  const themeMode = theme.palette.mode === 'light' ? true : false;

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        transition: 'box-shadow 0s',
        boxShadow: `0px 1px 3px ${themeMode ? '#eeeeee' : '#424242'}`,
      }}
    >
      <Toolbar
        sx={{
          display: 'flex',
          height: 'auto',
          backgroundColor: 'primary.dark',
          p: '1rem',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          minHeight: 'auto',
          [theme.breakpoints.down('md')]: {
            padding: '1rem 0.2rem',
          },
        }}
      >
        <Box sx={{ display: 'flex' }}>
          {!isDesktop && <Drawer />}
          <Link to={CCHAIN}>
            <Logo />
          </Link>
        </Box>
        <Box sx={{ display: 'flex', marginLeft: !isDesktop ? 'auto' : '0' }}>
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
      </Toolbar>
      {isDesktop && <Links />}
    </AppBar>
  );
}
