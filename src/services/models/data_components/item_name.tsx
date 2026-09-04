import z from "zod";
import { DataComponentModeField } from "#/components/form/field-components/data-component-mode";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.discriminatedUnion("mode", [
  z.object({ mode: z.literal("normal"), value: TextComponent.schema }),
  z.object({ mode: z.literal("negated") }),
]);

export const ItemName = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    if (data.mode === "negated") {
      return { "!minecraft:item_name": {} };
    }

    return {
      "minecraft:item_name": TextComponent.toDataPackJSON(data.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Item name">
        <group.AppField name="mode">
          {() => <DataComponentModeField />}
        </group.AppField>
        <group.Subscribe selector={({ values }) => values.mode}>
          {(mode) =>
            mode === "normal" ? (
              <TextComponent.fieldGroupComponent form={group} fields="value" />
            ) : null
          }
        </group.Subscribe>
      </FieldGroupPanel>
    ),
  }),
} as const;
