import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
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
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>
            ENCHANTMENT GLINT OVERRIDE
          </Typography>
          <group.AppField name="value">
            {(field) => (
              <field.BooleanCheckbox label="Show enchantment glint" />
            )}
          </group.AppField>
        </Stack>
      </Paper>
    ),
  }),
} as const;
