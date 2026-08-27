import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ItemRarity } from "#/services/enums/item-rarity";

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
        <Paper>
          <Stack spacing={3}>
            <Typography sx={{ fontWeight: 700 }}>RARITY</Typography>
            <group.AppField name="value">
              {(f) => <f.FC$RadioGroup options={Object.values(ItemRarity)} />}
            </group.AppField>
          </Stack>
        </Paper>
      );
    },
  }),
} as const;
