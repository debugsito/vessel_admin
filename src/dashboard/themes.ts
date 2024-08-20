export const darkTheme = {
  palette: {
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#FBBA72',
    },
    type: 'dark' as 'dark', // Switching the dark mode on is a single property value change.
  },
  overrides: {
    MuiAppBar: {
      colorSecondary: {
        color: '#ffffffb3',
        backgroundColor: '#616161e6',
      },
    },
    MuiButtonBase: {
      root: {
        '&:hover:active::after': {
          // recreate a static ripple color
          // use the currentColor to make it work both for outlined and contained buttons
          // but to dim the background without dimming the text,
          // put another element on top with a limited opacity
          content: '""',
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'currentColor',
          opacity: 0.3,
          borderRadius: 'inherit',
        },
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
};

export const lightTheme = {
  palette: {
    primary: {
      main: '#161514',
    },
    secondary: {
      light: '#f9f9f9',
      main: '#161514',
      dark: '#001064',
      contrastText: '#fff',
    },
    background: {
      default: '#fbf3eb',
    },
    type: 'light' as 'light',
  },
  shape: {
    borderRadius: 0,
  },
  overrides: {
    RaMenuItemLink: {
      root: {
        borderLeft: '3px solid #fff',
        '&:hover': {
          backgroundColor: '#fff',
        },
      },
      active: {
        borderLeft: '3px solid #fff',
        color: '#161514',
        backgroundColor: '#fff',
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: 'none',
      },
      root: {
        border: '1px solid #e0e0e3',
        backgroundClip: 'padding-box',
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: '#fff',
        color: '#4f3cc9',
        boxShadow: 'none',
      },
    },
    MuiButtonBase: {
      root: {
        '&:hover:active::after': {
          // recreate a static ripple color
          // use the currentColor to make it work both for outlined and contained buttons
          // but to dim the background without dimming the text,
          // put another element on top with a limited opacity
          content: '""',
          display: 'block',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: 'currentColor',
          opacity: 0.3,
          borderRadius: 'inherit',
        },
      },
    },
    MuiAppBar: {
      colorSecondary: {
        color: '#808080',
        backgroundColor: '#fbf3eb',
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: '#f5f5f5',
      },
      barColorPrimary: {
        backgroundColor: '#d7d7d7',
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: '#f9f9f9',
        '&$disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        '&:hover': {
          backgroundColor: '#fbf3eb',
        },
        '&.Mui-focused': {
          backgroundColor: '#fbf3eb',
        },
      },
    },
    MuiChip: {
      root: {
        backgroundColor: '#EAE5E2',
        '&.MuiChip-clickable:hover, &.MuiChip-clickable:focus': {
          backgroundColor: '#E7C4B1',
        },
      },
    },
    MuiSnackbarContent: {
      root: {
        border: 'none',
      },
    },
  },
  props: {
    MuiButtonBase: {
      // disable ripple for perf reasons
      disableRipple: true,
    },
  },
};
