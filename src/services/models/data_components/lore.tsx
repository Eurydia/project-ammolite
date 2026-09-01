import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import {
  FieldGroupPanel,
  FieldGroupSection,
} from "#/components/form/field-group-layout";
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
      <FieldGroupPanel title="Lore">
        <group.AppField name="lines" mode="array">
          {(field) => (
            <Stack spacing={2}>
              <SortableList
                items={field.state.value}
                onMove={(fromIndex, toIndex) =>
                  field.moveValue(fromIndex, toIndex)
                }
                renderItem={(_, index) => (
                  <FieldGroupSection title={`Line ${index + 1}`}>
                    <Stack spacing={2}>
                      <TextComponent.fieldGroupComponent
                        form={group}
                        fields={`lines[${index}]`}
                      />
                      <Button onClick={() => field.removeValue(index)}>
                        REMOVE LINE
                      </Button>
                    </Stack>
                  </FieldGroupSection>
                )}
              />
              <Button
                disabled={field.state.value.length >= 256}
                onClick={() => field.pushValue({ kind: "string", value: "" })}
              >
                ADD LINE
              </Button>
            </Stack>
          )}
        </group.AppField>
      </FieldGroupPanel>
    ),
  }),
} as const;
