import z from "zod";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.object({
  value: TextComponent.schema,
});

export const ItemName = {
  schema,
  toDataPackJSON: (data: z.output<typeof schema>) => {
    return {
      "minecraft:item_name": TextComponent.toDataPackJSON(data.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => (
      <FieldGroupPanel title="Item name">
        <TextComponent.fieldGroupComponent form={group} fields="value" />
      </FieldGroupPanel>
    ),
  }),
} as const;
