import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import z from "zod";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ItemRarity } from "#/services/enums/item-rarity";

const RARITY_OPTIONS = Object.values(ItemRarity);

const schema = z.object({
  value: z.enum(ItemRarity),
});

export const Rarity = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    return {
      "minecraft:rarity": dt.value,
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Rarity">
          <group.AppField name="value">
            {(field) => (
              <FormControl>
                <FormLabel>Rarity</FormLabel>
                <field.FC$RadioGroup options={RARITY_OPTIONS} />
              </FormControl>
            )}
          </group.AppField>
        </FieldGroupPanel>
      );
    },
  }),
} as const;
