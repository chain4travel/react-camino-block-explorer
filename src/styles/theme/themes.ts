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

interface PaletteWithCustomColors extends Palette {
  overviewCard: {
    background: string;
    border: string;
    title: string;
    subValue: string;
    contrastText: string;
  };
  icon: {
    background: string;
    color: string;
  };
  link: {
    color: string;
    hover: string;
    active: string;
  };
}

export const LightThemePalette: Partial<PaletteWithCustomColors> = {
  mode: 'light',
  primary: {
    main: '#F5F6FA',
    dark: '#F8FAFC',
    light: '#E2E8F0',
    contrastText: '#0F172A',
  },
  secondary: {
    main: '#149EED',
    light: '#B440FC',
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
  overviewCard: {
    background: '#F8FAFC',
    border: '#CBD5E1',
    title: '#0F172A',
    subValue: '#334155',
    contrastText: '#0F172A',
  },
  icon: {
    background: '#E2E8F0',
    color: '#2E3134',
  },
};

export const DarkThemePalette: Partial<PaletteWithCustomColors> = {
  mode: 'dark',
  primary: {
    main: '#0F172A',
    dark: '#0F172A',
    light: '#1E293B',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#149EED',
    light: '#B440FC',
    dark: '#7E2DB0',
    contrastText: '#0F172A',
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
  overviewCard: {
    background: '#0F172A',
    border: '#1E293B',
    title: '#64748B',
    subValue: '#64748B',
    contrastText: '#FFFFFF',
  },
  icon: {
    background: '#1E293B',
    color: '#FFFFFF',
  },
};

const defaultTheme = {
  typography: {
    fontSize: 16,
    h1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '96px',
      lineHeight: '96px',
      letterSpacing: '-2px',
      fontWeight: '400',
    },
    h2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '60px',
      lineHeight: '60px',
      letterSpacing: '-0.5px',
      fontWeight: '400',
    },
    h3: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '48px',
      lineHeight: '50px',
      fontWeight: '400',
    },
    h4: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontSize: '34px',
      lineHeight: '40px',
      fontWeight: '400',
    },
    h5: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '24px',
      lineHeight: '32px',
    },
    h6: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '18px',
      lineHeight: '150%',
    },
    subtitle1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '28px',
    },
    subtitle2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '22px',
    },
    body1: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
    },
    body2: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '-0.528px',
    },
    caption: {
      fontFamily: 'Plus Jakarta Sans',
      fontStyle: 'normal',
      fontWeight: 400,
      fontSize: '12px',
      lineHeight: '16px',
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
      },
    },
  },
  MuiTab: {
    styleOverrides: {
      root: {
        padding: '0rem',
        textTransform: 'capitalize' as const,
      },
      indicator: {
        backgroundColor: 'transparent',
      },
    },
  },
  // MuiContainer: {
  //   styleOverrides: {
  //     root: {
  //       display: 'flex',
  //       flexDirection: 'column' as const,
  //     },
  //   },
  // },
};

export const lightTheme = createTheme({
  palette: LightThemePalette,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#E2E8F0',
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
