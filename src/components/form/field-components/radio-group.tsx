import { AppFormContext } from "#/lib/form/form-contexts";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";

export function FC$RadioGroup<const T extends readonly string[]>(props: {
  options: T;
}) {
  const f = AppFormContext.useFieldContext<T[number]>();

  return (
    <RadioGroup
      row
      value={f.state.value}
      onChange={(_, value) => {
        const _v = value as T[number];
        f.handleChange(_v);
      }}
      onBlur={f.handleBlur}
    >
      {props.options.map((opt) => (
        <FormControlLabel
          key={opt}
          value={opt}
          control={<Radio />}
          label={opt}
        />
      ))}
    </RadioGroup>
  );
}
