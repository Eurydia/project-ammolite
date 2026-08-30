import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.object({
  value: TextComponent.schema,
});

export const ItemName = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:item_name": TextComponent.toDataPackJSON(data.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>ITEM NAME</Typography>
          <TextComponent.fieldGroupComponent form={group} fields="value" />
        </Stack>
      </Paper>
    ),
  }),
} as const;
