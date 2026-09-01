import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import type z from "zod";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { MobEffectPredicate } from "#/services/models/data_component_predicates/mob-effect-predicate";
import { FieldGroup$OptionalIntBoundPredicate } from "./generics/optional-int-bound-predicate";

export const FieldGroup$MobEffectPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof MobEffectPredicate>,
  render: ({ group }) => {
    return (
      <FieldGroupSection title="Mob effect predicate">
        <group.AppField name="effect">
          {(field) => <field.PotionEffectSelector label="Effect" />}
        </group.AppField>
        <group.AppField name="ambient">
          {(field) => (
            <FormControl>
              <FormLabel>Ambient</FormLabel>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </FormControl>
          )}
        </group.AppField>
        <group.AppField name="visible">
          {(field) => (
            <FormControl>
              <FormLabel>Visible</FormLabel>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </FormControl>
          )}
        </group.AppField>
        <FormControl>
          <FormLabel>Duration</FormLabel>
          <FieldGroup$OptionalIntBoundPredicate
            fields="duration"
            form={group}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Amplifier</FormLabel>
          <FieldGroup$OptionalIntBoundPredicate
            fields="amplifier"
            form={group}
          />
        </FormControl>
      </FieldGroupSection>
    );
  },
});
