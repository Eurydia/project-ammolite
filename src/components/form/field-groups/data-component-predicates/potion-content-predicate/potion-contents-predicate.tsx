import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { _FieldGroup$PotionContentPredicate$Effects } from "./potion-contents-predicate.effects";
import { _FieldGroup$PotionContentPredicate$Potions } from "./potion-contents-predicate.potions";

export const FieldGroup$PotionContentsPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof PotionContentsPredicate>,
  render: ({ group }) => {
    return (
      <FieldGroupSection title="Potion contents predicate">
        <group.Subscribe
          selector={({ values }) => values.potions !== undefined}
        >
          {(active) => (
            <FieldGroupSection>
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
            </FieldGroupSection>
          )}
        </group.Subscribe>
        <group.Subscribe
          selector={({ values }) => values.effects !== undefined}
        >
          {(active) => (
            <FieldGroupSection>
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
            </FieldGroupSection>
          )}
        </group.Subscribe>
      </FieldGroupSection>
    );
  },
});
