import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  body {
    background-color: ${p => p.theme.grey900};
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }
  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #root {
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }

  input, select {
    font-family: inherit;
    font-size: inherit;
  }
`;
