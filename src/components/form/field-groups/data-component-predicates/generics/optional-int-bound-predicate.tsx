import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { OptionalIntBoundPredicate } from "#/services/models/data_component_predicates/generics/optional-int-bound-predicate";

export const FieldGroup$OptionalIntBoundPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof OptionalIntBoundPredicate>,
  render: ({ group }) => {
    return (
      <Stack>
        <group.AppField
          name="kind"
          listeners={{
            onChange: ({ value }) => {
              if (value !== "unset") {
                group.setFieldValue(
                  "value",
                  value === "exact"
                    ? ""
                    : {
                        maxValue: "",
                        minValue: "",
                      },
                );
              }
            },
          }}
        >
          {(f) => <f.FC$RadioGroup options={["exact", "range", "unset"]} />}
        </group.AppField>
        <group.Subscribe
          selector={({ values: { kind } }) => {
            return kind;
          }}
        >
          {(kind) =>
            kind === "unset" ? null : kind === "exact" ? (
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
