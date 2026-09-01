import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PropsWithChildren, ReactNode } from "react";

type FieldGroupPanelProps = PropsWithChildren<{
  title: ReactNode;
}>;

export const FieldGroupPanel = ({ children, title }: FieldGroupPanelProps) => (
  <Box
    component="section"
    sx={{
      bgcolor: "background.paper",
      border: 1,
      borderColor: "divider",
      minWidth: 0,
    }}
  >
    <Stack
      direction="row"
      spacing={1}
      sx={{
        alignItems: "center",
        bgcolor: "action.hover",
        borderBottom: 1,
        borderColor: "divider",
        minHeight: 36,
        px: 1.5,
        py: 0.75,
      }}
    >
      <Box
        sx={{
          alignSelf: "stretch",
          bgcolor: "primary.main",
          width: 3,
        }}
      />
      <Typography
        component="h2"
        variant="subtitle2"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    </Stack>
    <Stack spacing={2} sx={{ p: 2 }}>
      {children}
    </Stack>
  </Box>
);

type FieldGroupSectionProps = PropsWithChildren<{
  title?: ReactNode;
}>;

export const FieldGroupSection = ({
  children,
  title,
}: FieldGroupSectionProps) => (
  <Stack
    component="section"
    spacing={1.5}
    sx={{
      borderColor: "divider",
      borderLeft: 2,
      minWidth: 0,
      pl: 2,
    }}
  >
    {title !== undefined && (
      <Typography
        color="text.secondary"
        component="h3"
        variant="caption"
        sx={{
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: 0.6,
          textTransform: "uppercase",
        }}
      >
        {title}
      </Typography>
    )}
    {children}
  </Stack>
);
