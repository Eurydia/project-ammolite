import { createFormHook } from '@tanstack/react-form'
import { AppFormContext } from './form-contexts'
import { FieldComponent$PotionEffectSelector } from '#/components/form/potion-effect-selector.field-component'
import { FieldComponent$BooleanCheckbox } from '#/components/form/boolean-checkbox.field-component'
import { FieldComponent$TextField } from '#/components/form/integer-range.field-component'

export const AppFormHook = createFormHook({
  formContext: AppFormContext.formContext,
  fieldContext: AppFormContext.fieldContext,
  fieldComponents: {
    FieldComponent$PotionEffectSelector,
    FieldComponent$BooleanCheckbox,
    FieldComponent$TextField,
  },
  formComponents: {},
})
