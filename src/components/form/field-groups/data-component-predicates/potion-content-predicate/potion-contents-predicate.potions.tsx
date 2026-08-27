import Autocomplete from "@mui/material/Autocomplete";
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
          <group.AppField name="values" mode="array">
            {(f) => (
              <Autocomplete
                multiple
                value={f.state.value as PotionType[]}
                onChange={(_, value) => f.handleChange(value)}
                options={Object.values(PotionType)}
                renderInput={(inputProps) => <TextField {...inputProps} />}
              />
            )}
          </group.AppField>
        </Stack>
      );
    },
  });
