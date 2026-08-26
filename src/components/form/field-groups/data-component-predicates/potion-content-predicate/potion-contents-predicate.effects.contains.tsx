import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
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
        <Paper>
          <Toolbar>
            <Button
              onClick={() =>
                group.pushFieldValue("values", {
                  effect: PotionType.AWKWARD,
                  ambient: "unset",
                  visible: "unset",
                  amplifier: { kind: "exact", value: "" },
                  duration: { kind: "exact", value: "" },
                })
              }
            >
              Add
            </Button>
          </Toolbar>
          <Stack spacing={3}>
            <group.AppField name="values" mode="array">
              {(f) =>
                f.state.value.map((_, i) => {
                  return (
                    <Paper key={i}>
                      <Toolbar>
                        <Button onClick={() => f.removeValue(i)}>REMOVE</Button>
                      </Toolbar>
                      <FieldGroup$MobEffectPredicate
                        fields={`values[${i}]`}
                        form={group}
                      />
                    </Paper>
                  );
                })
              }
            </group.AppField>
          </Stack>
        </Paper>
      );
    },
  });
