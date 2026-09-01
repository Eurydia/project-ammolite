import z from "zod";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";

const schema = z.object({
  value: z
    .string()
    .trim()
    .normalize()
    .transform((arg) => Number.parseFloat(arg))
    .pipe(z.float32()),
});

export const PotionDurationScale = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    return { "minecraft:potion_duration_scale": dt.value };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Potion duration scale">
          <group.AppField name="value">
            {(field) => <field.FC$TextField label="Scale" />}
          </group.AppField>
        </FieldGroupPanel>
      );
    },
  }),
} as const;
