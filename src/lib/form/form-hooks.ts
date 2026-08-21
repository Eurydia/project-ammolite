import { createFormHook } from "@tanstack/react-form";
import { AppFormContext } from "./form-contexts";
import { PotionEffectSelector } from "#/components/form/field-components/potion-effect-selector";
import { BooleanCheckbox } from "#/components/form/field-components/boolean-checkbox";
import { NumberField } from "#/components/form/field-components/number-field";
import { MinecraftItemSelector } from "#/components/form/field-components/minecratf-item-selector";

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
