import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
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
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>COUNT</Typography>
          <group.AppField name="values" mode="array">
            {(field) => (
              <Stack spacing={2}>
                {field.state.value.map((_, index) => (
                  <Paper key={index} variant="outlined">
                    <Stack spacing={3}>
                      <Typography sx={{ fontWeight: 700 }}>
                        COUNT RULE {index + 1}
                      </Typography>
                      <group.AppField
                        name={`values[${index}].test`}
                        mode="array"
                      >
                        {(testField) => (
                          <Stack spacing={2}>
                            {testField.state.value.map((_, testIndex) => (
                              <Paper key={testIndex} variant="outlined">
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
                              </Paper>
                            ))}
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
                  </Paper>
                ))}
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
        </Stack>
      );
    },
  });
