import {createTheme, ThemeProvider as MuiThemeProvider, ThemeOptions} from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export const theme = createTheme({
    palette: {
      primary: {
        main: '#37196D',
        contrastText: '#fff',
        light: '#6f3f8e',
        dark: '#090036',
      },
      secondary: {
        main: '#f9f9f9',
        contrastText: '#ffffff',
        light: '#7C66BA',
        dark: '#382971',
      },
      text: {
        secondary: 'rgba(255,255,255,0.9)',
        disabled: '#ffffff',
        primary: '#ffffff',
      },
      background: {
        default: '#1F1E1E',
        paper:'#4d4b62',
      },
      divider: 'rgba(16,15,15,0.39)',
      error: {
        main: '#c50505',
        light: '#7b161b',
      },
      warning: {
        main: '#ff9500',
      },
      success: {
        main: '#2a962b',
      },
    },
    shape: {
      borderRadius: 4,
    },
    spacing: 8,
    typography: {
      "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
      "fontSize": 14,
      "fontWeightLight": 300,
      "fontWeightRegular": 400,
      "fontWeightMedium": 500
     }
});

export const ThemeProvider = (props: PropsWithChildren<unknown>) => {
    return <MuiThemeProvider theme={theme}>
        {props.children}
    </MuiThemeProvider>;
}