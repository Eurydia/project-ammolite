import { createTheme } from "@mui/material/styles";

export const APP_THEME = createTheme({
  palette: {
    mode: "dark",
    primary: {
      contrastText: "#1e1e1e",
      main: "#f7a41d",
    },
    background: {
      default: "#181818",
      paper: "#252526",
    },
    divider: "#3c3c3c",
    text: {
      primary: "#d4d4d4",
      secondary: "#9d9d9d",
    },
  },
  shape: {
    borderRadius: 2,
  },
  typography: {
    button: {
      fontFamily: "monospace",
      fontSize: "0.75rem",
      fontWeight: 700,
      letterSpacing: 0.4,
    },
    fontFamily:
      'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        size: "small",
      },
    },
    MuiButton: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.secondary,
          fontFamily: "monospace",
          fontSize: theme.typography.caption.fontSize,
        }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          borderRadius: 0,
        }),
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundImage: "none",
          padding: theme.spacing(2),
        }),
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
  },
});
