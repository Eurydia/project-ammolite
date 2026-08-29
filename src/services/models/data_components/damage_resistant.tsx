import Autocomplete from "@mui/material/Autocomplete";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { DamageType } from "#/services/enums/damage-type";

const TYPES_KINDS = ["single", "list"] as const;
const DAMAGE_TYPE_OPTIONS = Object.values(DamageType);

const _schema$ArbitraryDamageType = z.string().trim().normalize().min(1);

const _schema$DamageType = z.union([
  z.enum(DamageType),
  _schema$ArbitraryDamageType,
]);

const _schema$Types = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("single"), value: _schema$DamageType }),
  z.object({
    kind: z.literal("list"),
    values: _schema$DamageType.array().min(1),
  }),
]);

const schema = z.object({
  types: _schema$Types,
});

const _FieldGroup$Types = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof _schema$Types>,
  render: ({ group }) => (
    <Stack spacing={3}>
      <group.AppField
        name="kind"
        listeners={{
          onChange: ({ value }) => {
            if (value === "list") {
              group.setFieldValue("values", []);
            } else {
              group.setFieldValue("value", "");
            }
          },
        }}
      >
        {(field) => <field.FC$RadioGroup options={TYPES_KINDS} />}
      </group.AppField>
      <group.Subscribe selector={({ values }) => values.kind}>
        {(kind) => {
          switch (kind) {
            case "single":
              return (
                <group.AppField name="value">
                  {(field) => (
                    <Autocomplete
                      freeSolo
                      inputValue={field.state.value}
                      options={DAMAGE_TYPE_OPTIONS}
                      onBlur={field.handleBlur}
                      onInputChange={(_, value) => field.handleChange(value)}
                      renderInput={(inputProps) => (
                        <TextField
                          {...inputProps}
                          error={field.state.meta.errors.length > 0}
                          label="Damage type ID or tag"
                        />
                      )}
                    />
                  )}
                </group.AppField>
              );
            case "list":
              return (
                <group.AppField name="values" mode="array">
                  {(field) => (
                    <Autocomplete
                      freeSolo
                      multiple
                      options={DAMAGE_TYPE_OPTIONS}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(_, value) => {
                        if (value.length > 0) {
                          field.handleChange(value);
                        }
                      }}
                      renderInput={(inputProps) => (
                        <TextField
                          {...inputProps}
                          error={field.state.meta.errors.length > 0}
                          label="Damage type IDs"
                        />
                      )}
                    />
                  )}
                </group.AppField>
              );
          }
        }}
      </group.Subscribe>
    </Stack>
  ),
});

export const DamageResistant = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:damage_resistant": {
        types:
          data.types.kind === "list" ? data.types.values : data.types.value,
      },
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <Paper>
        <Stack spacing={3}>
          <Typography sx={{ fontWeight: 700 }}>DAMAGE RESISTANT</Typography>
          <_FieldGroup$Types form={group} fields="types" />
        </Stack>
      </Paper>
    ),
  }),
} as const;
