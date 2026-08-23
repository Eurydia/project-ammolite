import { createFormHook } from "@tanstack/react-form";
import { BooleanCheckbox } from "#/components/form/field-components/boolean-checkbox";
import { MinecraftItemSelector } from "#/components/form/field-components/minecratf-item-selector";
import { NumberField } from "#/components/form/field-components/number-field";
import { PotionEffectSelector } from "#/components/form/field-components/potion-effect-selector";
import { AppFormContext } from "./form-contexts";

export const AppFormHook = createFormHook({
  formContext: AppFormContext.formContext,
  fieldContext: AppFormContext.fieldContext,
  fieldComponents: {
    PotionEffectSelector,
    NumberField,
    BooleanCheckbox,
    MinecraftItemSelector,
  },
  formComponents: {},
});
