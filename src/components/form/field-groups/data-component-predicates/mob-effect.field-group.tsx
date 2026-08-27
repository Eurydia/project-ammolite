import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { MobEffectPredicate } from "#/services/models/data_component_predicates/mob-effect-predicate";
import { FieldGroup$OptionalIntBoundPredicate } from "./generics/optional-int-bound-predicate";

export const FieldGroup$MobEffectPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof MobEffectPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField name="effect">
          {(f) => <f.PotionEffectSelector />}
        </group.AppField>
        <group.AppField name="ambient">
          {(f) => <f.FC$RadioGroup options={["yes", "no", "unset"]} />}
        </group.AppField>
        <group.AppField name="visible">
          {(f) => <f.FC$RadioGroup options={["yes", "no", "unset"]} />}
        </group.AppField>
        <FieldGroup$OptionalIntBoundPredicate
          fields={"duration"}
          form={group}
        />
        <FieldGroup$OptionalIntBoundPredicate
          fields={"amplifier"}
          form={group}
        />
      </Stack>
    );
  },
});
