import TextField from "@mui/material/TextField";
import type { FC, ReactNode } from "react";
import { AppFormContext } from "#/lib/form/form-contexts";

export const FC$TextField: FC<{
  label?: ReactNode;
}> = (props) => {
  const f = AppFormContext.useFieldContext<string>();

  return (
    <TextField
      fullWidth
      label={props.label}
      value={f.state.value}
      error={f.state.meta.errors.length > 0}
      onChange={(e) => f.handleChange(e.target.value)}
      onBlur={f.handleBlur}
    />
  );
};
