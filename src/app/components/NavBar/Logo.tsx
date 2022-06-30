import * as React from 'react';
import Box from '@mui/material/Box';
import { ReactComponent as LogoLight } from './assets/LightModeLogo.svg';
import { ReactComponent as LogoDark } from './assets/DarkModeLogo.svg';
import { ReactComponent as LogoCamino } from './assets/CaminoLogo.svg';
import { useTheme, useMediaQuery } from '@mui/material';

export default function Logo() {
  const theme = useTheme();
  const isMobile = useMediaQuery('@media (max-width:1024px)');
  const themeMode = theme.palette.mode === 'light' ? true : false;

  return (
    <Box>
      {isMobile ? (
        <LogoCamino style={{ width: '32px', height: '32px' }} />
      ) : themeMode ? (
        <LogoLight />
      ) : (
        <LogoDark />
      )}
    </Box>
  );
}
