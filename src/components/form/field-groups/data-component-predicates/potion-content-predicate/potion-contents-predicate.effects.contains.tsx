import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type z from "zod";
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
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>CONTAINS</Typography>
          <group.AppField name="values" mode="array">
            {(field) => (
              <Stack spacing={2}>
                {field.state.value.map((_, index) => (
                  <Paper key={index} variant="outlined">
                    <Stack spacing={2}>
                      <FieldGroup$MobEffectPredicate
                        fields={`values[${index}]`}
                        form={group}
                      />
                      <Button onClick={() => field.removeValue(index)}>
                        REMOVE EFFECT
                      </Button>
                    </Stack>
                  </Paper>
                ))}
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
        </Stack>
      );
    },
  });
