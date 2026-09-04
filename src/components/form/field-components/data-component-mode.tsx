import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { AppFormContext } from "#/lib/form/form-contexts";

export function DataComponentModeField() {
  const field = AppFormContext.useFieldContext<"normal" | "negated">();

  return (
    <FormControlLabel
      checked={field.state.value === "negated"}
      control={<Checkbox disableRipple />}
      label="Negated"
      onBlur={field.handleBlur}
      onChange={(_, checked) =>
        field.handleChange(checked ? "negated" : "normal")
      }
    />
  );
}
