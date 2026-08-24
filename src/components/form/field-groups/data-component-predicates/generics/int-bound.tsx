import { AppFormHook } from "#/lib/form/form-hooks";
import type { IntBoundPredicate } from "#/services/models/data_component_predicates/potion_contents_predicate";
import Stack from "@mui/material/Stack";
import type z from "zod";

export const FG$IntBoundPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof IntBoundPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField
          name="kind"
          listeners={{
            onChange: ({ value }) => {
              group.setFieldValue(
                "value",
                value === "exact" ? "" : { maxValue: "", minValue: "" },
              );
            },
          }}
        >
          {(f) => <f.FC$RadioGroup options={["exact", "range"]} />}
        </group.AppField>
        <group.Subscribe
          selector={({ values: { kind } }) => {
            return kind;
          }}
        >
          {(kind) =>
            kind === "exact" ? (
              <group.AppField name="value">
                {(f) => <f.FC$TextField />}
              </group.AppField>
            ) : (
              <>
                <group.AppField name="value.minValue">
                  {(f) => <f.FC$TextField />}
                </group.AppField>
                <group.AppField name="value.maxValue">
                  {(f) => <f.FC$TextField />}
                </group.AppField>
              </>
            )
          }
        </group.Subscribe>
      </Stack>
    );
  },
});
