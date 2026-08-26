import { createTheme } from "@mui/material/styles";

export const APP_THEME = createTheme({
  components: { MuiPaper: { styleOverrides: { root: { padding: 2 } } } },
});
