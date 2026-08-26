import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { PotionContentsPredicate$Potions } from "#/services/models/data_component_predicates/potion_contents_predicate";

export const _FieldGroup$PotionContentPredicate$Potions =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Potions>,
    render: ({ group }) => {
      return (
        <Stack>
          <group.AppField name="kind">
            {(f) => {
              return (
                <RadioGroup
                  row
                  value={f.state.value}
                  onChange={(_, value) => {
                    const _v = value as "tag" | "list";
                    f.handleChange(_v);
                  }}
                  onBlur={f.handleBlur}
                >
                  <FormControlLabel
                    value="tag"
                    control={<Radio />}
                    label="tag"
                  />
                  <FormControlLabel
                    value="list"
                    control={<Radio />}
                    label="List"
                  />
                </RadioGroup>
              );
            }}
          </group.AppField>
          <group.Subscribe
            selector={({ values: { kind } }) => {
              return kind;
            }}
          >
            {(kind) =>
              kind === "tag" ? (
                <group.AppField name="value">
                  {(f) => (
                    <TextField
                      value={f.state.value as string}
                      onChange={(e) => f.handleChange(e.target.value)}
                      onBlur={f.handleBlur}
                    />
                  )}
                </group.AppField>
              ) : (
                <group.AppField name="value" mode="array">
                  {(f) => (
                    <Autocomplete
                      multiple
                      value={f.state.value as PotionType[]}
                      onChange={(_, value) => f.handleChange(value)}
                      options={Object.values(PotionType)}
                      renderInput={(inputProps) => (
                        <TextField {...inputProps} />
                      )}
                    />
                  )}
                </group.AppField>
              )
            }
          </group.Subscribe>
        </Stack>
      );
    },
  });
