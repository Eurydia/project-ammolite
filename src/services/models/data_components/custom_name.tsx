import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.object({
  value: TextComponent.schema,
});

export const CustomName = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    return {
      "minecraft:custom_name": TextComponent.toDataPackJSON(dt.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <Paper>
          <Stack spacing={3}>
            <Typography sx={{ fontWeight: 700 }}>CUSTOM NAME</Typography>
            <TextComponent.fieldGroupComponent form={group} fields="value" />
          </Stack>
        </Paper>
      );
    },
  }),
} as const;
