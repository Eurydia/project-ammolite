import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { AppThemeProvider } from "#/theme/provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <AppThemeProvider>
        <Outlet />
      </AppThemeProvider>
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
