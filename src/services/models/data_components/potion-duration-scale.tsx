import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
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
  fieldGroup: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <Paper>
          <Stack spacing={3}>
            <Typography>Component: potion_duration_scale</Typography>
            <group.AppField name="value">
              {(f) => <f.FC$TextField label={"value (float)"} />}
            </group.AppField>
          </Stack>
        </Paper>
      );
    },
  }),
} as const;
