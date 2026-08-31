import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { FC, ReactNode } from "react";

export const JsonDisplay: FC<{
  emptyMessage: ReactNode;
  title: ReactNode;
  value: unknown | undefined;
}> = ({ emptyMessage, title, value }) => {
  const json = value === undefined ? undefined : JSON.stringify(value, null, 2);

  return (
    <Paper>
      <Stack spacing={2}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Typography sx={{ fontWeight: 700 }}>{title}</Typography>
          <Button
            disabled={json === undefined}
            startIcon={<ContentCopyIcon />}
            onClick={() => {
              if (json !== undefined) {
                navigator.clipboard.writeText(json);
              }
            }}
          >
            COPY
          </Button>
        </Stack>
        <Box
          component="pre"
          sx={{
            m: 0,
            overflowWrap: "anywhere",
            overflowX: "auto",
            whiteSpace: "pre-wrap",
          }}
        >
          {json ?? emptyMessage}
        </Box>
      </Stack>
    </Paper>
  );
};
