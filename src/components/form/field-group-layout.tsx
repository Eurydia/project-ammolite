import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { PropsWithChildren, ReactNode } from "react";

type FieldGroupPanelProps = PropsWithChildren<{
  title: ReactNode;
}>;

export const FieldGroupPanel = ({ children, title }: FieldGroupPanelProps) => (
  <Paper component="section">
    <Stack spacing={2}>
      <Typography component="h2" variant="h6">
        {title}
      </Typography>
      {children}
    </Stack>
  </Paper>
);

type FieldGroupSectionProps = PropsWithChildren<{
  title?: ReactNode;
}>;

export const FieldGroupSection = ({
  children,
  title,
}: FieldGroupSectionProps) => (
  <Stack component="section" spacing={1.5}>
    {title !== undefined && (
      <Typography component="h3" variant="subtitle1">
        {title}
      </Typography>
    )}
    {children}
  </Stack>
);
