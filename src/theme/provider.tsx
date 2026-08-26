import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { FC, PropsWithChildren } from "react";
import { APP_THEME } from "./theme";

export const AppThemeProvider: FC<PropsWithChildren> = (props) => {
  <ThemeProvider theme={APP_THEME}>
    <CssBaseline />
    {props.children}
  </ThemeProvider>;
};
