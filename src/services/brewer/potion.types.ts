import type { PotionEffect } from './enums/potion-effects.enum'

export type PotionInput = {
  item: string
  potion_contents?: {
    potion?: PotionEffect
  }
}
