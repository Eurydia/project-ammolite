import { AppFormHook } from '#/lib/form/form-hooks'
import type { Type$MobEffect } from '#/services/brewer/schema'
import Stack from '@mui/material/Stack'

export const FieldGroup$MobEffect = AppFormHook.withFieldGroup({
  defaultValues: {} as Type$MobEffect,
  render: ({ group, ...props }) => {
    return (
      <Stack>
        <group.AppField name="effect">
          {(f) => <f.FieldComponent$PotionEffectSelector />}
        </group.AppField>
        <group.AppField name="ambient">
          {(f) => <f.FieldComponent$BooleanCheckbox label={`Ambient`} />}
        </group.AppField>
        <group.AppField name="visible">
          {(f) => <f.FieldComponent$BooleanCheckbox label={`Visible`} />}
        </group.AppField>
        <group.AppField name="duration">
          {(f) => <f.FieldComponent$BooleanCheckbox label={`Visible`} />}
        </group.AppField>
      </Stack>
    )
  },
})
