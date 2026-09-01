import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { PotionContentsPredicate$Effects$Contains } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FieldGroup$MobEffectPredicate } from "../mob-effect.field-group";

export const _FieldGroup$PotionContentPredicate$Effects$Contains =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<
      typeof PotionContentsPredicate$Effects$Contains
    >,
    render: ({ group }) => {
      return (
        <FieldGroupSection title="Contains">
          <group.AppField name="values" mode="array">
            {(field) => (
              <Stack spacing={2}>
                <SortableList
                  items={field.state.value}
                  onMove={(fromIndex, toIndex) =>
                    field.moveValue(fromIndex, toIndex)
                  }
                  renderItem={(_, index) => (
                    <FieldGroupSection title={`Effect ${index + 1}`}>
                      <Stack spacing={2}>
                        <FieldGroup$MobEffectPredicate
                          fields={`values[${index}]`}
                          form={group}
                        />
                        <Button onClick={() => field.removeValue(index)}>
                          REMOVE EFFECT
                        </Button>
                      </Stack>
                    </FieldGroupSection>
                  )}
                />
                <Button
                  onClick={() =>
                    field.pushValue({
                      effect: PotionType.REGENERATION,
                      amplifier: { kind: "unset" },
                      duration: { kind: "unset" },
                      ambient: "unset",
                      visible: "unset",
                    })
                  }
                >
                  ADD EFFECT
                </Button>
              </Stack>
            )}
          </group.AppField>
        </FieldGroupSection>
      );
    },
  });
