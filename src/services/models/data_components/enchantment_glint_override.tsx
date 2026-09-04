import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";

const schema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("normal"), value: z.boolean() }),
  z.object({ mode: z.literal("negated") }),
]);

export const EnchantmentGlintOverride = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    if (data.mode === "negated") {
      return { "!minecraft:enchantment_glint_override": {} };
    }

    return {
      "minecraft:enchantment_glint_override": data.value,
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Enchantment glint override">
        <group.AppField name="mode">
          {() => <DataComponentModeField />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.mode}>
          {(mode) =>
            mode === "normal" ? (
              <group.AppField name="value">
                {(field) => (
                  <field.BooleanCheckbox label="Show enchantment glint" />
                )}
              </group.AppField>
            ) : null
          }
        </group.Subscribe>
      </FieldGroupPanel>
    ),
  }),
} as const;
