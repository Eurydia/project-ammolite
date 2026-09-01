import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { ConsumeEffect, ConsumeEffectType } from "./generic/consume-effect";

const schema = z.object({
  deathEffects: ConsumeEffect.schema.array(),
});

export const DeathProtection = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:death_protection":
        data.deathEffects.length === 0
          ? {}
          : {
              death_effects: data.deathEffects.map(
                ConsumeEffect.toDataPackJSON,
              ),
            },
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Death protection">
        <group.AppField name="deathEffects" mode="array">
          {(field) => (
            <Stack spacing={2}>
              <SortableList
                items={field.state.value}
                onMove={(fromIndex, toIndex) =>
                  field.moveValue(fromIndex, toIndex)
                }
                renderItem={(_, index) => (
                  <Stack spacing={2}>
                    <ConsumeEffect.fieldGroupComponent
                      form={group}
                      fields={`deathEffects[${index}]`}
                    />
                    <Button onClick={() => field.removeValue(index)}>
                      REMOVE CONSUME EFFECT
                    </Button>
                  </Stack>
                )}
              />
              <Button
                onClick={() =>
                  field.pushValue({
                    type: ConsumeEffectType.CLEAR_ALL_EFFECTS,
                  })
                }
              >
                ADD CONSUME EFFECT
              </Button>
            </Stack>
          )}
        </group.AppField>
      </FieldGroupPanel>
    ),
  }),
} as const;
