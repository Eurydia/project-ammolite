import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { MobEffectPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";

export const FieldGroup$MobEffect = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof MobEffectPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="effect">
          {(f) => <f.PotionEffectSelector />}
        </group.AppField>
        <group.AppField name="ambient">
          {(f) => <f.BooleanCheckbox label={`Ambient`} />}
        </group.AppField>
        <group.AppField name="visible">
          {(f) => <f.BooleanCheckbox label={`Visible`} />}
        </group.AppField>
        <group.AppField name="duration">
          {(f) => <f.BooleanCheckbox label={`Visible`} />}
        </group.AppField>
      </Stack>
    );
  },
});
