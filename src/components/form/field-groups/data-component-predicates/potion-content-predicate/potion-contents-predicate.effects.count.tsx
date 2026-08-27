import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import type z from "zod";
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
        <Paper>
          <Stack spacing={3}>
            <group.AppField name="values" mode="array">
              {(f) =>
                f.state.value.map((_, i) => {
                  return (
                    <Paper key={i}>
                      <Toolbar>
                        <Button onClick={() => f.removeValue(i)}>REMOVE</Button>
                      </Toolbar>
                      <group.AppField name={`values[${i}].test`} mode="array">
                        {(subf) => (
                          <>
                            {subf.state.value.map((_, subfI) => (
                              <Paper key={`${i}-${subfI}`}>
                                <Toolbar>
                                  <Button
                                    onClick={() => subf.removeValue(subfI)}
                                  >
                                    remove
                                  </Button>
                                </Toolbar>
                                <FieldGroup$MobEffectPredicate
                                  form={group}
                                  fields={`values[${i}].test[${subfI}]`}
                                />
                              </Paper>
                            ))}
                            <Toolbar>
                              <Button
                                onClick={() =>
                                  subf.pushValue({
                                    effect: PotionType.AWKWARD,
                                    ambient: "unset",
                                    visible: "unset",
                                    amplifier: { kind: "unset" },
                                    duration: { kind: "unset" },
                                  })
                                }
                              >
                                ADD
                              </Button>
                            </Toolbar>
                          </>
                        )}
                      </group.AppField>
                      <FieldGroup$IntBoundPredicate
                        form={group}
                        fields={`values[${i}].count`}
                      />
                    </Paper>
                  );
                })
              }
            </group.AppField>
            <Toolbar>
              <Button
                onClick={() =>
                  group.pushFieldValue("values", {
                    count: { kind: "exact", value: "" },
                    test: [],
                  })
                }
              >
                Add
              </Button>
            </Toolbar>
          </Stack>
        </Paper>
      );
    },
  });
