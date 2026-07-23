import z from 'zod/v4'
import { PotionType } from './enums/potion-effect.enum'
import { MinecraftItem } from './enums/minecraft-item.enum'
import { _isoDuration } from 'zod/v4/core'
import { ssrExportAllKey } from 'vite/module-runner'

export const Schema$NumberRange = z.discriminatedUnion('mode', [
  z.object({ mode: z.literal('exact'), value: z.number().optional() }),
  z.object({
    mode: z.literal('range'),
    value: z
      .object({
        valueMin: z.number().optional(),
        valueMax: z.number().optional(),
      })
      .optional(),
  }),
])

export type Type$NumberRange$In = z.input<typeof Schema$NumberRange>

export const Schema$MobEffect = z.object({
  effect: z.enum(PotionType).optional(),
  duration: Schema$NumberRange.optional(),
  amplifier: Schema$NumberRange.optional(),
  visible: z.boolean().optional(),
  ambient: z.boolean().optional(),
})

export type Type$MobEffect = z.input<typeof Schema$MobEffect>

export const Schema$PotionContents = z.object({
  potions: z.union([(z.enum(PotionType).array(), z.string())]).optional(),
  effects: z
    .object({
      contains: Schema$MobEffect.array().optional(),
      count: z
        .object({
          count: Schema$NumberRange,
          test: Schema$MobEffect.array(),
        })
        .array()
        .optional(),
      size: Schema$NumberRange.optional(),
    })
    .partial()
    .optional(),
})

export const Schema$BrewingRecipe = z.object({
  inputItem: z.object({
    item: z.union([z.enum(MinecraftItem), z.string()]),
    potionContents: Schema$PotionContents.optional(),
  }),
  reagentItem: z.object({
    item: z.union([z.enum(MinecraftItem), z.string()]),
    potionContents: Schema$PotionContents.optional(),
  }),
  outputItem: z.object(),
})
