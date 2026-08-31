import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import type z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import type { OptionalIntBoundPredicate } from "#/services/models/data_component_predicates/generics/optional-int-bound-predicate";

export const FieldGroup$OptionalIntBoundPredicate = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof OptionalIntBoundPredicate>,
  render: ({ group }) => {
    return (
      <Stack spacing={3}>
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
          {(field) => (
            <field.FC$RadioGroup options={["exact", "range", "unset"]} />
          )}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.kind}>
          {(kind) =>
            kind === "unset" ? null : kind === "exact" ? (
              <group.AppField name="value">
                {(field) => <field.FC$TextField label="Exact value" />}
              </group.AppField>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { sm: "repeat(2, 1fr)", xs: "1fr" },
                }}
              >
                <group.AppField name="value.minValue">
                  {(field) => <field.FC$TextField label="Minimum" />}
                </group.AppField>
                <group.AppField name="value.maxValue">
                  {(field) => <field.FC$TextField label="Maximum" />}
                </group.AppField>
              </Box>
            )
          }
        </group.Subscribe>
      </Stack>
    );
  },
});
