import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.object({
  lines: TextComponent.schema.array().max(256),
});

export const Lore = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:lore": data.lines.map(TextComponent.toDataPackJSON),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>LORE</Typography>
          <group.AppField name="lines" mode="array">
            {(field) => (
              <Stack spacing={2}>
                {field.state.value.map((_, index) => (
                  <Paper variant="outlined" key={index}>
                    <Stack spacing={2}>
                      <TextComponent.fieldGroupComponent
                        form={group}
                        fields={`lines[${index}]`}
                      />
                      <Button onClick={() => field.removeValue(index)}>
                        REMOVE LINE
                      </Button>
                    </Stack>
                  </Paper>
                ))}
                <Button
                  disabled={field.state.value.length >= 256}
                  onClick={() => field.pushValue({ kind: "string", value: "" })}
                >
                  ADD LINE
                </Button>
              </Stack>
            )}
          </group.AppField>
        </Stack>
      </Paper>
    ),
  }),
} as const;
