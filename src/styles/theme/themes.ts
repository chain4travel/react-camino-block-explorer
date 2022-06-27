const grey = {
  grey50: '#FAFAFA',
  grey100: '#F5F5F5',
  grey200: '#EEEEEE',
  grey300: '#E0E0E0',
  grey400: '#BDBDBD',
  grey500: '#9E9E9E',
  grey600: '#757575',
  grey700: '#616161',
  grey800: '#424242',
  grey900: '#212121',
};
const lightTheme = {
  primary: '#5ABBF2',
  Secondary: '#CA79FD',
  error: '#DD5E56',
  warning: '#F19D38',
  info: '#4BA6EE',
  success: '#67AD5B',
  ...grey,
};

const darkTheme = {
  primary: '#0E6FA6',
  Secondary: '#7E2DB1',
  error: '#B63831',
  warning: '#D55C26',
  info: '#235696',
  success: '#2F5D28',
  ...grey,
};

// const mainTheme = {
//   primary: '#4BA6EE',
//   Secondary: '#B440FC',
//   error: '#C23F38',
//   warning: '#DD742D',
//   info: '#3B86CB',
//   success: '#457B3B',
//   ...grey,
// };

export type Theme = typeof lightTheme;

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};
