import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import z from "zod";
import { AppFormHook } from "#/lib/form/form-hooks";
import { OptionalBooleanPredicate } from "#/services/models/data_component_predicates/generics/optional-boolean-predicate";
import { OptionalIntString } from "#/services/models/data_component_predicates/generics/optional-int-string";

const TEXT_COMPONENT_KINDS = ["string", "list", "object"] as const;
const TEXT_CONTENT_TYPES = [
  "text",
  "translatable",
  "score",
  "selector",
  "keybind",
  "nbt",
  "object",
] as const;

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
    <Paper variant="outlined">
      <Stack spacing={3}>
        <Typography sx={{ fontWeight: 700 }}>CONTENT</Typography>
        <group.AppField
          name="type"
          listeners={{
            onChange: ({ value }) => {
              switch (value) {
                case "text":
                  group.setFieldValue("text", "");
                  break;
              }
            },
          }}
        >
          {(field) => <field.FC$RadioGroup options={TEXT_CONTENT_TYPES} />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.type}>
          {(type) => {
            switch (type) {
              case "text":
                return (
                  <group.AppField name="text">
                    {(field) => <field.FC$TextField label="Text" />}
                  </group.AppField>
                );
            }
          }}
        </group.Subscribe>
        <Typography sx={{ fontWeight: 700 }}>FORMATTING</Typography>
        <group.AppField name="color">
          {(field) => <field.FC$TextField label="Color" />}
        </group.AppField>
        <group.AppField name="font">
          {(field) => <field.FC$TextField label="Font" />}
        </group.AppField>
        <group.AppField name="bold">
          {(field) => (
            <Stack direction="row" spacing={2}>
              <Typography>Bold</Typography>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </Stack>
          )}
        </group.AppField>
        <group.AppField name="italic">
          {(field) => (
            <Stack direction="row" spacing={2}>
              <Typography>Italic</Typography>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </Stack>
          )}
        </group.AppField>
        <group.AppField name="underlined">
          {(field) => (
            <Stack direction="row" spacing={2}>
              <Typography>Underlined</Typography>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </Stack>
          )}
        </group.AppField>
        <group.AppField name="strikethrough">
          {(field) => (
            <Stack direction="row" spacing={2}>
              <Typography>Strikethrough</Typography>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </Stack>
          )}
        </group.AppField>
        <group.AppField name="obfuscated">
          {(field) => (
            <Stack direction="row" spacing={2}>
              <Typography>Obfuscated</Typography>
              <field.FC$RadioGroup options={["yes", "no", "unset"]} />
            </Stack>
          )}
        </group.AppField>
        <group.AppField name="shadowColor">
          {(field) => <field.FC$TextField label="Shadow color (ARGB int)" />}
        </group.AppField>
        <group.AppField name="extra" mode="array">
          {(field) => (
            <Stack spacing={2}>
              {field.state.value.map((_, index) => (
                <Stack direction="row" spacing={2} key={index}>
                  <group.AppField name={`extra[${index}]`}>
                    {(extra) => <extra.FC$TextField label="Extra text" />}
                  </group.AppField>
                  <Button onClick={() => field.removeValue(index)}>
                    REMOVE
                  </Button>
                </Stack>
              ))}
              <Button onClick={() => field.pushValue("")}>ADD EXTRA</Button>
            </Stack>
          )}
        </group.AppField>
      </Stack>
    </Paper>
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
        {(field) => <field.FC$RadioGroup options={TEXT_COMPONENT_KINDS} />}
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
                      {field.state.value.map((value, index) => (
                        <Paper variant="outlined" key={index}>
                          <Stack spacing={2}>
                            {typeof value === "string" ? (
                              <group.AppField name={`values[${index}]`}>
                                {(entry) => <entry.FC$TextField label="Text" />}
                              </group.AppField>
                            ) : (
                              <_FieldGroup$Object
                                form={group}
                                fields={"value"}
                              />
                            )}
                            <Button
                              disabled={field.state.value.length === 1}
                              onClick={() => field.removeValue(index)}
                            >
                              REMOVE
                            </Button>
                          </Stack>
                        </Paper>
                      ))}
                      <Stack direction="row" spacing={2}>
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
                      </Stack>
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
