import { AppFormContext } from '#/lib/form/form-contexts'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import type { FC, ReactNode } from 'react'

export const FieldComponent$BooleanCheckbox: FC<{ label?: ReactNode }> = (
  props,
) => {
  const field = AppFormContext.useFieldContext<boolean>()
  return (
    <FormControlLabel
      checked={field.state.value}
      control={<Checkbox disableRipple />}
      label={props.label}
      onChange={(_, v) => field.handleChange(v)}
      onBlur={field.handleBlur}
    />
  )
}
