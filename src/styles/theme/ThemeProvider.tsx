import React from 'react';
import { PaletteMode } from '@mui/material';

import { lightTheme, darkTheme } from './themes';
import { ThemeOptions } from '@mui/material/styles';
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from '@mui/material/styles';

const getDesignTokens = (mode: PaletteMode): ThemeOptions => ({
  ...(mode === 'light' ? lightTheme : darkTheme),
});

export const ColorModeContext = React.createContext<{
  toggleColorMode?: () => void;
}>({});

export const ThemeProvider = (props: { children: React.ReactChild }) => {
  const [mode, setMode] = React.useState<PaletteMode>('light'); // light or dark default mode is light

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light',
        );
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        {React.Children.only(props.children)}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
};
