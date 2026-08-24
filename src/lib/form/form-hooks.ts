import { createFormHook } from "@tanstack/react-form";
import { BooleanCheckbox } from "#/components/form/field-components/boolean-checkbox";
import { MinecraftItemSelector } from "#/components/form/field-components/minecratf-item-selector";
import { FC$TextField } from "#/components/form/field-components/number-field";
import { PotionEffectSelector } from "#/components/form/field-components/potion-effect-selector";
import { AppFormContext } from "./form-contexts";
import { FC$RadioGroup } from "#/components/form/field-components/radio-group";

export const AppFormHook = createFormHook({
  formContext: AppFormContext.formContext,
  fieldContext: AppFormContext.fieldContext,
  fieldComponents: {
    PotionEffectSelector,
    BooleanCheckbox,
    MinecraftItemSelector,
    FC$TextField,
    FC$RadioGroup,
  },
  formComponents: {},
});
