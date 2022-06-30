import { Palette } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';

const grey = {
  50: '#FAFAFA',
  100: '#F5F5F5',
  200: '#EEEEEE',
  300: '#E0E0E0',
  400: '#BDBDBD',
  500: '#9E9E9E',
  600: '#757575',
  700: '#616161',
  800: '#424242',
  900: '#212121',
  A100: '#F5F5F5',
  A200: '#EEEEEE',
  A400: '#DBDBDB',
  A700: '#616161',
};

export const LightThemePalette: Partial<Palette> = {
  mode: 'light',
  primary: {
    main: '#F5F6FA',
    dark: '#FFFFFF',
    light: '#E2E8F0',
    contrastText: '#0F172A',
  },
  secondary: {
    light: '#149EED',
    main: '#B440FC',
    dark: '#7E2DB0',
    contrastText: '#0F172A',
  },
  error: {
    light: '#DD5E56',
    dark: '#B63831',
    main: '#C23F38',
    contrastText: '#0F172A',
  },
  warning: {
    light: '#F19D38',
    dark: '#D55C26',
    main: '#DD742D',
    contrastText: '#0F172A',
  },
  info: {
    light: '#4BA6EE',
    main: '#3B86CB',
    dark: '#235696',
    contrastText: '#0F172A',
  },
  success: {
    light: '#67AD5B',
    main: '#457B3B',
    dark: '#2F5D28',
    contrastText: '#0F172A',
  },
  grey: grey,
};

export const DarkThemePalette: Partial<Palette> = {
  mode: 'dark',
  primary: {
    // main: '#242729',
    main: '#0F172A',
    dark: '#0F172A',
    light: '#1E293B',
    contrastText: '#FFFFFF',
  },
  secondary: {
    light: '#149EED',
    main: '#B440FC',
    dark: '#7E2DB0',
    contrastText: '#FFFFFF',
  },
  error: {
    light: '#DD5E56',
    dark: '#B63831',
    main: '#C23F38',
    contrastText: '#FFFFFF',
  },
  warning: {
    light: '#F19D38',
    dark: '#D55C26',
    main: '#DD742D',
    contrastText: '#FFFFFF',
  },
  info: {
    light: '#4BA6EE',
    main: '#3B86CB',
    dark: '#235696',
    contrastText: '#FFFFFF',
  },
  success: {
    light: '#67AD5B',
    main: '#457B3B',
    dark: '#2F5D28',
    contrastText: '#FFFFFF',
  },
  grey: grey,
};

const defaultTheme = {
  typography: {
    fontSize: 16,
    h1: {
      // fontFamily: 'DM Sans, serif',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '2.75rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
      letterSpacing: '0.04em',
    },
    h2: {
      // fontFamily: 'DM Sans, serif',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '2rem',
      '@media (min-width:600px)': {
        fontSize: '2.75rem',
      },
    },
    h3: {
      // fontFamily: 'DM Sans, serif',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '1.5rem',
      '@media (min-width:600px)': {
        fontSize: '2.25rem',
      },
    },
    h4: {
      // fontFamily: "'DM Sans'",
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '22px',
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
      lineHeight: '26px',
      letterSpacing: '-0.726px',
    },
    h5: {
      // fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: '700',
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '1.2px',
    },
    h6: {
      // fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      '@media (min-width:600px)': {
        fontSize: '1.25rem',
      },
      lineHeight: '21px',
    },
    body1: {
      // fontFamily: "'DM Sans'",
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1.25rem',
      lineHeight: '2.125rem',
      letterSpacing: '-0.66px',
    },
    body2: {
      // fontFamily: "'DM Sans'",
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '1.75rem',
      letterSpacing: '-0.528px',
    },
    subtitle1: {
      // fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '1rem',
      lineHeight: '175%',
      letterSpacing: '-0.5px',
    },
  },
};

const defaultComponents = {
  MuiSelect: {
    styleOverrides: {
      select: {
        padding: '0.5rem 0rem',
        fontSize: '1rem',
        lineheight: '1.5rem',
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '0.5rem',
      },
    },
  },
  MuiList: {
    styleOverrides: {
      root: {
        padding: '0rem 0.5rem',
        width: 'max-content',
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: '0.5rem 0rem',
      },
    },
  },
};

export const lightTheme = createTheme({
  palette: LightThemePalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#F5F6FA',
        },
      },
    },
    ...defaultComponents,
  },
  ...defaultTheme,
});

export const darkTheme = createTheme({
  palette: DarkThemePalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#0F172A',
        },
      },
    },
    ...defaultComponents,
  },
  ...defaultTheme,
});
