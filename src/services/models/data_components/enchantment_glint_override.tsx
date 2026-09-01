import z from "zod";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";

const schema = z.object({
  value: z.boolean(),
});

export const EnchantmentGlintOverride = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:enchantment_glint_override": data.value,
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Enchantment glint override">
        <group.AppField name="value">
          {(field) => <field.BooleanCheckbox label="Show enchantment glint" />}
        </group.AppField>
      </FieldGroupPanel>
    ),
  }),
} as const;
