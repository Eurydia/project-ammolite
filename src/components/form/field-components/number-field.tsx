import { AppFormContext } from "#/lib/form/form-contexts";
import type { FC, ReactNode } from "react";
import TextField from "@mui/material/TextField";

export const NumberField: FC<{
  label?: ReactNode;
}> = (props) => {
  const f = AppFormContext.useFieldContext<string>();

  return (
    <TextField
      label={props.label}
      fullWidth
      value={f.state.value}
      error={f.state.meta.errors.length > 0}
      onChange={(e) => f.handleChange(e.target.value)}
      onBlur={f.handleBlur}
    />
  );
};
