import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { PotionContentsPredicate$Potions } from "#/services/models/data_component_predicates/potion_contents_predicate";

const POTION_OPTIONS = Object.values(PotionType);

export const _FieldGroup$PotionContentPredicate$Potions =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Potions>,
    render: ({ group }) => {
      return (
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>POTIONS</Typography>
          <group.AppField name="values" mode="array">
            {(field) => (
              <Autocomplete
                multiple
                options={POTION_OPTIONS}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(_, value) => field.handleChange(value)}
                renderInput={(inputProps) => (
                  <TextField
                    {...inputProps}
                    error={field.state.meta.errors.length > 0}
                    label="Potions"
                  />
                )}
              />
            )}
          </group.AppField>
        </Stack>
      );
    },
  });
