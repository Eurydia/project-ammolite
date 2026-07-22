import { FieldGroup$MobEffect } from '#/components/form/field-groups/mob-effect.field-group'
import { AppFormHook } from '#/lib/form/form-hooks'
import { PotionType } from '#/services/brewer/enums/potion-effect.enum'
import type { Type$MobEffect } from '#/services/brewer/schema'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  const form = AppFormHook.useAppForm({
    defaultValues: {
      effect: {
        effect: PotionType.AWKWARD,
        ambient: true,
        amplifier: 1,
        duration: 1,
        visible: false,
      },
    },
  })
  return <FieldGroup$MobEffect form={form} fields={'effect'} />
}
