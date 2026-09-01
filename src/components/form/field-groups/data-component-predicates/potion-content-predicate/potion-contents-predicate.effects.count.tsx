import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { PotionType } from "#/services/enums/potion-effect.enum";
import type { PotionContentsPredicate$Effects$Count } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FieldGroup$IntBoundPredicate } from "../generics/int-bound-predicate";
import { FieldGroup$MobEffectPredicate } from "../mob-effect.field-group";

export const _FieldGroup$PotionContentPredicate$Effects$Count =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Effects$Count>,
    render: ({ group }) => {
      return (
        <FieldGroupSection title="Count">
          <group.AppField name="values" mode="array">
            {(field) => (
              <Stack spacing={2}>
                <SortableList
                  items={field.state.value}
                  onMove={(fromIndex, toIndex) =>
                    field.moveValue(fromIndex, toIndex)
                  }
                  renderItem={(_, index) => (
                    <FieldGroupSection title={`Count rule ${index + 1}`}>
                      <Stack spacing={3}>
                        <group.AppField
                          name={`values[${index}].test`}
                          mode="array"
                        >
                          {(testField) => (
                            <Stack spacing={2}>
                              <SortableList
                                items={testField.state.value}
                                onMove={(fromIndex, toIndex) =>
                                  testField.moveValue(fromIndex, toIndex)
                                }
                                renderItem={(_, testIndex) => (
                                  <FieldGroupSection
                                    title={`Effect ${testIndex + 1}`}
                                  >
                                    <Stack spacing={2}>
                                      <FieldGroup$MobEffectPredicate
                                        form={group}
                                        fields={`values[${index}].test[${testIndex}]`}
                                      />
                                      <Button
                                        onClick={() =>
                                          testField.removeValue(testIndex)
                                        }
                                      >
                                        REMOVE EFFECT
                                      </Button>
                                    </Stack>
                                  </FieldGroupSection>
                                )}
                              />
                              <Button
                                onClick={() =>
                                  testField.pushValue({
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
                        <FormControl>
                          <FormLabel>Matching effect count</FormLabel>
                          <FieldGroup$IntBoundPredicate
                            form={group}
                            fields={`values[${index}].count`}
                          />
                        </FormControl>
                        <Button onClick={() => field.removeValue(index)}>
                          REMOVE COUNT RULE
                        </Button>
                      </Stack>
                    </FieldGroupSection>
                  )}
                />
                <Button
                  onClick={() =>
                    field.pushValue({
                      count: { kind: "exact", value: "" },
                      test: [],
                    })
                  }
                >
                  ADD COUNT RULE
                </Button>
              </Stack>
            )}
          </group.AppField>
        </FieldGroupSection>
      );
    },
  });
