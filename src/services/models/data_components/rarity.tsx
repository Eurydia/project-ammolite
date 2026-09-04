import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ItemRarity } from "#/services/enums/item-rarity";

const RARITY_OPTIONS = Object.values(ItemRarity);

const schema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("normal"), value: z.enum(ItemRarity) }),
  z.object({ mode: z.literal("negated") }),
]);

export const Rarity = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    if (dt.mode === "negated") {
      return { "!minecraft:rarity": {} };
    }

    return {
      "minecraft:rarity": dt.value,
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Rarity">
          <group.AppField name="mode">
            {() => <DataComponentModeField />}
          </group.AppField>
          <group.Subscribe selector={({ values }) => values.mode}>
            {(mode) =>
              mode === "normal" ? (
                <group.AppField name="value">
                  {(field) => (
                    <FormControl>
                      <FormLabel>Rarity</FormLabel>
                      <field.FC$RadioGroup options={RARITY_OPTIONS} />
                    </FormControl>
                  )}
                </group.AppField>
              ) : null
            }
          </group.Subscribe>
        </FieldGroupPanel>
      );
    },
  }),
} as const;
