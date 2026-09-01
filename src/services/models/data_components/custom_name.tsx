import z from "zod";
import { FieldGroupPanel } from "#/components/form/field-group-layout";
import { AppFormHook } from "#/lib/form/form-hooks";
import { TextComponent } from "./generic/text-component";

const schema = z.object({
  value: TextComponent.schema,
});

export const CustomName = {
  schema,
  toDataPackJSON: (dt: z.output<typeof schema>) => {
    return {
      "minecraft:custom_name": TextComponent.toDataPackJSON(dt.value),
    };
  },
  fieldGroupComponent: AppFormHook.withFieldGroup({
    defaultValues: {} as z.input<typeof schema>,
    render: ({ group }) => {
      return (
        <FieldGroupPanel title="Custom name">
          <TextComponent.fieldGroupComponent form={group} fields="value" />
        </FieldGroupPanel>
      );
    },
  }),
} as const;
