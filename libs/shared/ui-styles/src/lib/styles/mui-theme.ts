import type {} from '@mui/x-date-pickers/themeAugmentation';

import { Theme } from '@mui/material';
import { createTheme } from '@mui/material';
import { Palette, PaletteOptions, ThemeOptions } from '@mui/material/styles';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { dashItemBorderRadius, dashItemPadding, dashSectionBorder } from './dash-styles';
import { themeColors } from './theme-colors';

const palette: PaletteOptions = {
  mode: 'dark',
  primary: themeColors.primary,
  secondary: themeColors.secondary,
  background: {
    default: themeColors.background,
    paper: themeColors.background,
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

const themeOptions: ThemeOptions = {
  palette,
  typography,
  components: {
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: themeColors.background,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          borderBottom: '1px solid',
          borderColor: themeColors.primary.dark,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: themeColors.primary.main,
        },
        input: {
          paddingTop: 7.5,
          paddingBottom: 7.5,
        },
      },
    },
    MuiDatePicker: {
      styleOverrides: {
        root: {
          color: themeColors.primary.main,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          '&:not(:first-of-type)': {
            marginTop: dashItemPadding,
          },
          '&.Mui-expanded': {
            marginBottom: 0,
          },
          '&::before': {
            backgroundColor: 'transparent',
          },
          color: themeColors.primary.main,
          ...dashSectionBorder,
          '&:first-of-type, :last-of-type': {
            borderRadius: dashItemBorderRadius,
          },
          borderColor: themeColors.borderDark,
          backgroundImage: 'none',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        expandIconWrapper: {
          color: themeColors.primary.dark,
        },
      },
    },
  },
};

export const uiTheme: Theme = createTheme(themeOptions);
