import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }
  *, *::after, *::before{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #root {
    min-height: 100%;
    min-width: 100%;
    display: flex;
    flex-direction: column;
  }
`
