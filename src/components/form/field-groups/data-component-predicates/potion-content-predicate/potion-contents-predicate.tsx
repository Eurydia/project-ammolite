import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { _FieldGroup$PotionContentPredicate$Effects } from "./potion-contents-predicate.effects";
import { _FieldGroup$PotionContentPredicate$Potions } from "./potion-contents-predicate.potions";

export const FieldGroup$PotionContentsPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
        <Typography sx={{ fontWeight: 700 }}>
          POTION CONTENTS PREDICATE
        </Typography>
        <group.Subscribe
          selector={({ values }) => values.potions !== undefined}
        >
          {(active) => (
            <Paper variant="outlined">
              <Stack spacing={2}>
                <Button
                  onClick={() =>
                    group.setFieldValue(
                      "potions",
                      active ? undefined : { values: [] },
                    )
                  }
                >
                  {active ? "REMOVE POTIONS" : "ADD POTIONS"}
                </Button>
                {active && (
                  <_FieldGroup$PotionContentPredicate$Potions
                    fields="potions"
                    form={group}
                  />
                )}
              </Stack>
            </Paper>
          )}
        </group.Subscribe>
        <group.Subscribe
          selector={({ values }) => values.effects !== undefined}
        >
          {(active) => (
            <Paper variant="outlined">
              <Stack spacing={2}>
                <Button
                  onClick={() =>
                    group.setFieldValue(
                      "effects",
                      active ? undefined : { size: { kind: "unset" } },
                    )
                  }
                >
                  {active ? "REMOVE EFFECTS" : "ADD EFFECTS"}
                </Button>
                {active && (
                  <_FieldGroup$PotionContentPredicate$Effects
                    fields="effects"
                    form={group}
                  />
                )}
              </Stack>
            </Paper>
          )}
        </group.Subscribe>
      </Stack>
    );
  },
});
