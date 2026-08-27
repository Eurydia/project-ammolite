import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { APP_THEME } from "#/theme/theme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        <Outlet />
      </ThemeProvider>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "TanStack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
