import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("normal"), value: TextComponent.schema }),
  z.object({ mode: z.literal("negated") }),
]);

export const CustomName = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    if (dt.mode === "negated") {
      return { "!minecraft:custom_name": {} };
    }

    return {
      "minecraft:custom_name": TextComponent.toDataPackJSON(dt.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Custom name">
          <group.AppField name="mode">
            {() => <DataComponentModeField />}
          </group.AppField>
          <group.Subscribe selector={({ values }) => values.mode}>
            {(mode) =>
              mode === "normal" ? (
                <TextComponent.fieldGroupComponent
                  form={group}
                  fields="value"
                />
              ) : null
            }
          </group.Subscribe>
        </FieldGroupPanel>
      );
    },
  }),
} as const;
