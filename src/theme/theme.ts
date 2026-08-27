import { createTheme } from "@mui/material/styles";

export const APP_THEME = createTheme({
  components: {
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: { root: ({ theme }) => ({ padding: theme.spacing(2) }) },
    },
  },
});
