import type { PotionEffect } from './enums/potion-effect.enum'

export type PotionInput = {
  item: string
  potion_contents?: {
    potion?: PotionEffect
  }
}
