import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { PotionContentsPredicate$Effects } from "#/services/models/data_component_predicates/potion_contents_predicate";
import { FieldGroup$OptionalIntBoundPredicate } from "../generics/optional-int-bound-predicate";
import { _FieldGroup$PotionContentPredicate$Effects$Contains } from "./potion-contents-predicate.effects.contains";
import { _FieldGroup$PotionContentPredicate$Effects$Count } from "./potion-contents-predicate.effects.count";

export const _FieldGroup$PotionContentPredicate$Effects =
  AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof PotionContentsPredicate$Effects>,
    render: ({ group }) => {
      return (
        <FieldGroupSection title="Effects">
          <group.Subscribe
            selector={({ values }) => values.contains !== undefined}
          >
            {(active) => (
              <FieldGroupSection>
                <Stack spacing={2}>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "contains",
                        active ? undefined : { values: [] },
                      )
                    }
                  >
                    {active ? "REMOVE CONTAINS" : "ADD CONTAINS"}
                  </Button>
                  {active && (
                    <_FieldGroup$PotionContentPredicate$Effects$Contains
                      fields="contains"
                      form={group}
                    />
                  )}
                </Stack>
              </FieldGroupSection>
            )}
          </group.Subscribe>
          <group.Subscribe
            selector={({ values }) => values.count !== undefined}
          >
            {(active) => (
              <FieldGroupSection>
                <Stack spacing={2}>
                  <Button
                    onClick={() =>
                      group.setFieldValue(
                        "count",
                        active ? undefined : { values: [] },
                      )
                    }
                  >
                    {active ? "REMOVE COUNT" : "ADD COUNT"}
                  </Button>
                  {active && (
                    <_FieldGroup$PotionContentPredicate$Effects$Count
                      fields="count"
                      form={group}
                    />
                  )}
                </Stack>
              </FieldGroupSection>
            )}
          </group.Subscribe>
          <FieldGroupSection title="Effect list size">
            <FormControl>
              <FormLabel>Size rule</FormLabel>
              <FieldGroup$OptionalIntBoundPredicate
                fields="size"
                form={group}
              />
            </FormControl>
          </FieldGroupSection>
        </FieldGroupSection>
      );
    },
  });
