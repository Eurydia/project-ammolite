import { FieldGroup$MobEffect } from '#/components/form/field-groups/mob-effect.field-group'
import { AppFormHook } from '#/lib/form/form-hooks'
import { PotionType } from '#/services/brewer/enums/potion-effect.enum'
import type {
  Type$MobEffect,
  Type$NumberRange$In,
} from '#/services/brewer/schema'
import type { private_excludeVariablesFromRoot } from '@mui/material/styles'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const form = AppFormHook.useAppForm({
    defaultValues: {
      inputItem: {
        item: '',
        potionContents: {
          potions: { mode: 'string', value: '' },
          effects: {},
        } as {
          potions:
            | {
                mode: 'list'
                value: Array<PotionType>
              }
            | { mode: 'string'; value: string }
          effects?: {
            contains: Array<Type$MobEffect>
            count: Array<{
              test?: Array<Type$MobEffect>
              count?: Type$NumberRange$In
            }>
            size: Type$NumberRange$In
          }
        },
      },
    },
  })
  return <FieldGroup$MobEffect form={form} fields={''} />
}
