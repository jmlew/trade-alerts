// import { Theme } from '@emotion/react';
import { Theme } from '@mui/material';
import { createTheme } from '@mui/material';
import { Palette, PaletteOptions, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

const colors = {
  primary: {
    main: '#90CAF9',
    light: '#BAE0FF',
    dark: '#4479A4',
  },
  secondary: {
    main: '#ffa726',
    light: '#ffd95b',
    dark: '#c77800',
  },
  background: '#061521',
};

const palette: PaletteOptions = {
  mode: 'dark',
  primary: colors.primary,
  secondary: colors.secondary,
  background: {
    default: colors.background,
    paper: colors.background,
  },
};

function typography(palette: Palette): TypographyOptions {
  // Refer to the loaded @fontsource weights in src/main.tsx.
  return {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    fontWeightLight: '300',
    fontWeightRegular: '400',
    fontWeightMedium: '500',
    fontWeightBold: '700',
  };
}

export const themeOptions: ThemeOptions = {
  palette,
  typography,
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.background,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: colors.primary.dark,
        },
      },
    },
  },
};

export const uiTheme: Theme = createTheme(themeOptions);
