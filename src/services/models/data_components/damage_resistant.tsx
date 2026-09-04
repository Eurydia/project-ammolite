import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
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

const schema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("normal"), types: _schema$Types }),
  z.object({ mode: z.literal("negated") }),
]);

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
        {(field) => (
          <FormControl>
            <FormLabel>Damage type format</FormLabel>
            <field.FC$RadioGroup options={TYPES_KINDS} />
          </FormControl>
        )}
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
                    <Stack spacing={2}>
                      <SortableList
                        items={field.state.value}
                        onMove={(fromIndex, toIndex) =>
                          field.moveValue(fromIndex, toIndex)
                        }
                        renderItem={(_, index) => (
                          <Stack direction="row" spacing={2}>
                            <group.AppField name={`values[${index}]`}>
                              {(entry) => (
                                <Autocomplete
                                  freeSolo
                                  inputValue={entry.state.value}
                                  options={DAMAGE_TYPE_OPTIONS}
                                  onBlur={entry.handleBlur}
                                  onChange={(_, value) =>
                                    entry.handleChange(value ?? "")
                                  }
                                  onInputChange={(_, value) =>
                                    entry.handleChange(value)
                                  }
                                  renderInput={(inputProps) => (
                                    <TextField
                                      {...inputProps}
                                      error={entry.state.meta.errors.length > 0}
                                      label="Damage type ID or tag"
                                    />
                                  )}
                                />
                              )}
                            </group.AppField>
                            <Button
                              disabled={field.state.value.length === 1}
                              onClick={() => field.removeValue(index)}
                            >
                              REMOVE
                            </Button>
                          </Stack>
                        )}
                      />
                      <Button onClick={() => field.pushValue("")}>
                        ADD DAMAGE TYPE
                      </Button>
                    </Stack>
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
    if (data.mode === "negated") {
      return { "!minecraft:damage_resistant": {} };
    }

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
      <FieldGroupPanel title="Damage resistant">
        <group.AppField name="mode">
          {() => <DataComponentModeField />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.mode}>
          {(mode) =>
            mode === "normal" ? (
              <_FieldGroup$Types form={group} fields="types" />
            ) : null
          }
        </group.Subscribe>
      </FieldGroupPanel>
    ),
  }),
} as const;
