import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";

const schema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("normal"),
    value: z
      .string()
      .trim()
      .normalize()
      .transform((arg) => Number.parseFloat(arg))
      .pipe(z.float32()),
  }),
  z.object({ mode: z.literal("negated") }),
]);

export const PotionDurationScale = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    if (dt.mode === "negated") {
      return { "!minecraft:potion_duration_scale": {} };
    }

    return { "minecraft:potion_duration_scale": dt.value };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Potion duration scale">
          <group.AppField name="mode">
            {() => <DataComponentModeField />}
          </group.AppField>
          <group.Subscribe selector={({ values }) => values.mode}>
            {(mode) =>
              mode === "normal" ? (
                <group.AppField name="value">
                  {(field) => <field.FC$TextField label="Scale" />}
                </group.AppField>
              ) : null
            }
          </group.Subscribe>
        </FieldGroupPanel>
      );
    },
  }),
} as const;
