import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import z from "zod";
import { SortableList } from "#/components/form/field-components/sortable-list";
import { FieldGroupSection } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { OptionalBooleanPredicate } from "#/services/models/data_component_predicates/generics/optional-boolean-predicate";
import { OptionalIntString } from "#/services/models/data_component_predicates/generics/optional-int-string";

const TEXT_COMPONENT_KINDS = ["string", "list", "object"] as const;

const TEXT_COLORS = [
  "black",
  "dark_blue",
  "dark_green",
  "dark_aqua",
  "dark_red",
  "dark_purple",
  "gold",
  "gray",
  "dark_gray",
  "blue",
  "green",
  "aqua",
  "red",
  "light_purple",
  "yellow",
  "white",
] as const;

const _schema$OptionalString = z
  .string()
  .normalize()
  .transform((value) => value || undefined)
  .pipe(z.string().optional());

const _schema$OptionalStringList = z
  .string()
  .array()
  .transform((values) => (values.length === 0 ? undefined : values))
  .pipe(z.string().array().optional());

const _schema$Color = z
  .string()
  .normalize()
  .transform((value) => value || undefined)
  .pipe(
    z
      .union([z.enum(TEXT_COLORS), z.string().regex(/^#[0-9a-fA-F]{6}$/)])
      .optional(),
  );

const _schema$Object$Base = {
  color: _schema$Color,
  font: _schema$OptionalString,
  bold: OptionalBooleanPredicate,
  italic: OptionalBooleanPredicate,
  underlined: OptionalBooleanPredicate,
  strikethrough: OptionalBooleanPredicate,
  obfuscated: OptionalBooleanPredicate,
  shadowColor: OptionalIntString,
  extra: _schema$OptionalStringList,
};

const _schema$Object$Variant$Text = z.object({
  ..._schema$Object$Base,
  type: z.literal("text"),
  text: z.string(),
});

const _schema$Object = z.union([_schema$Object$Variant$Text]);

const schema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("string"), value: z.string() }),
  z.object({
    kind: z.literal("list"),
    values: z.union([z.string(), _schema$Object]).array().min(1),
  }),
  z.object({ kind: z.literal("object"), value: _schema$Object }),
]);

const _FieldGroup$Object = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof _schema$Object>,
  render: ({ group }) => (
    <Stack spacing={2}>
      <FieldGroupSection title="Content">
        <group.AppField name="text">
          {(field) => <field.FC$TextField label="Text" />}
        </group.AppField>
      </FieldGroupSection>
      <FieldGroupSection title="Formatting">
        <group.AppField name="color">
          {(field) => (
            <Autocomplete
              freeSolo
              inputValue={field.state.value}
              options={TEXT_COLORS}
              onBlur={field.handleBlur}
              onInputChange={(_, value) => field.handleChange(value)}
              renderInput={(inputProps) => (
                <TextField
                  {...inputProps}
                  error={field.state.meta.errors.length > 0}
                  label="Color (optional)"
                />
              )}
            />
          )}
        </group.AppField>
        <group.AppField name="font">
          {(field) => <field.FC$TextField label="Font (optional)" />}
        </group.AppField>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: { sm: "repeat(2, 1fr)", xs: "1fr" },
          }}
        >
          <group.AppField name="bold">
            {(field) => (
              <FormControl>
                <FormLabel>Bold</FormLabel>
                <field.FC$RadioGroup options={["yes", "no", "unset"]} />
              </FormControl>
            )}
          </group.AppField>
          <group.AppField name="italic">
            {(field) => (
              <FormControl>
                <FormLabel>Italic</FormLabel>
                <field.FC$RadioGroup options={["yes", "no", "unset"]} />
              </FormControl>
            )}
          </group.AppField>
          <group.AppField name="underlined">
            {(field) => (
              <FormControl>
                <FormLabel>Underlined</FormLabel>
                <field.FC$RadioGroup options={["yes", "no", "unset"]} />
              </FormControl>
            )}
          </group.AppField>
          <group.AppField name="strikethrough">
            {(field) => (
              <FormControl>
                <FormLabel>Strikethrough</FormLabel>
                <field.FC$RadioGroup options={["yes", "no", "unset"]} />
              </FormControl>
            )}
          </group.AppField>
          <group.AppField name="obfuscated">
            {(field) => (
              <FormControl>
                <FormLabel>Obfuscated</FormLabel>
                <field.FC$RadioGroup options={["yes", "no", "unset"]} />
              </FormControl>
            )}
          </group.AppField>
        </Box>
        <group.AppField name="shadowColor">
          {(field) => (
            <field.FC$TextField label="Shadow color (ARGB int, optional)" />
          )}
        </group.AppField>
        <group.AppField name="extra" mode="array">
          {(field) => (
            <Stack spacing={2}>
              <SortableList
                items={field.state.value}
                onMove={(fromIndex, toIndex) =>
                  field.moveValue(fromIndex, toIndex)
                }
                renderItem={(_, index) => (
                  <Stack direction="row" spacing={2}>
                    <group.AppField name={`extra[${index}]`}>
                      {(extra) => <extra.FC$TextField label="Extra text" />}
                    </group.AppField>
                    <Button onClick={() => field.removeValue(index)}>
                      REMOVE EXTRA
                    </Button>
                  </Stack>
                )}
              />
              <Button onClick={() => field.pushValue("")}>ADD EXTRA</Button>
            </Stack>
          )}
        </group.AppField>
      </FieldGroupSection>
    </Stack>
  ),
});

const fieldGroupComponent = AppFormHook.withFieldGroup({
  defaultValues: {} as z.input<typeof schema>,
  render: ({ group }) => (
    <Stack spacing={3}>
      <group.AppField
        name="kind"
        listeners={{
          onChange: ({ value }) => {
            if (value === "string") {
              group.setFieldValue("value", "");
            } else if (value === "list") {
              group.setFieldValue("values", [""]);
            } else {
              group.setFieldValue("value", {
                type: "text",
                text: "",
                underlined: "unset",
                bold: "unset",
                extra: [],
                color: "",
                font: "",
                italic: "unset",
                obfuscated: "unset",
                shadowColor: "",
                strikethrough: "unset",
              });
            }
          },
        }}
      >
        {(field) => (
          <FormControl>
            <FormLabel>Text component format</FormLabel>
            <field.FC$RadioGroup options={TEXT_COMPONENT_KINDS} />
          </FormControl>
        )}
      </group.AppField>
      <group.Subscribe selector={({ values }) => values.kind}>
        {(kind) => {
          switch (kind) {
            case "string":
              return (
                <group.AppField name="value">
                  {(field) => <field.FC$TextField label="Text" />}
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
                        renderItem={(value, index) => (
                          <FieldGroupSection title={`Entry ${index + 1}`}>
                            <Stack spacing={2}>
                              {typeof value === "string" ? (
                                <group.AppField name={`values[${index}]`}>
                                  {(entry) => (
                                    <entry.FC$TextField label="Text" />
                                  )}
                                </group.AppField>
                              ) : (
                                <_FieldGroup$Object
                                  form={group}
                                  fields={{
                                    type: `values[${index}].type`,
                                    text: `values[${index}].text`,
                                    color: `values[${index}].color`,
                                    font: `values[${index}].font`,
                                    bold: `values[${index}].bold`,
                                    italic: `values[${index}].italic`,
                                    underlined: `values[${index}].underlined`,
                                    strikethrough: `values[${index}].strikethrough`,
                                    obfuscated: `values[${index}].obfuscated`,
                                    shadowColor: `values[${index}].shadowColor`,
                                    extra: `values[${index}].extra`,
                                  }}
                                />
                              )}
                              <Button
                                disabled={field.state.value.length === 1}
                                onClick={() => field.removeValue(index)}
                              >
                                REMOVE ENTRY
                              </Button>
                            </Stack>
                          </FieldGroupSection>
                        )}
                      />
                      <Box
                        sx={{
                          display: "grid",
                          gap: 2,
                          gridTemplateColumns: {
                            sm: "repeat(2, 1fr)",
                            xs: "1fr",
                          },
                        }}
                      >
                        <Button onClick={() => field.pushValue("")}>
                          ADD TEXT
                        </Button>
                        <Button
                          onClick={() =>
                            field.pushValue({
                              type: "text",
                              text: "",
                              underlined: "unset",
                              bold: "unset",
                              extra: [],
                              color: "",
                              font: "",
                              italic: "unset",
                              obfuscated: "unset",
                              shadowColor: "",
                              strikethrough: "unset",
                            })
                          }
                        >
                          ADD OBJECT
                        </Button>
                      </Box>
                    </Stack>
                  )}
                </group.AppField>
              );
            case "object":
              return <_FieldGroup$Object form={group} fields="value" />;
          }
        }}
      </group.Subscribe>
    </Stack>
  ),
});

export const TextComponent = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    switch (data.kind) {
      case "string":
        return data.value;
      case "object":
        return data.value;
      case "list":
        return data.values;
    }
  },
  fieldGroupComponent,
} as const;
