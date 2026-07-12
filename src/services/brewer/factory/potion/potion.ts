import { MinecraftItem } from '../../enums/minecraft-item.enum'
import type { PotionType } from '../../enums/potion-effect.enum'

export const createPotion = (
  item: MinecraftItem = MinecraftItem.POTION,
  potionContents?: Readonly<
    Partial<{
      potion: PotionType
      customColor: number
      customName: string
      customEffects: ReadonlyArray<{
        id: PotionType
        amplifier?: number
        duration?: number
        ambient?: boolean
        showParticles?: boolean
        showIcon?: boolean
      }>
    }>
  >,
) => {
  return {
    item,
    potion_contents:
      potionContents !== undefined
        ? {
            potion: potionContents.potion,
            custom_color: potionContents.customColor,
            custom_name: potionContents.customName,
            custom_effects: potionContents.customEffects?.map((eff) => {
              if (eff.amplifier !== undefined) {
                if (!Number.isInteger(eff.amplifier)) {
                  throw Error('amplifier must be an integer')
                }
                if (eff.amplifier < 0) {
                  throw Error('amplifier must be non-negative')
                }
              }

              if (
                eff.duration !== undefined &&
                !Number.isInteger(eff.duration)
              ) {
                throw Error('duration must be an integer')
              }

              return {
                id: eff.id,
                amplifier: eff.amplifier ?? 0,
                duration:
                  eff.duration === undefined ||
                  eff.duration === 0 ||
                  eff.duration <= -2
                    ? 1
                    : eff.duration,
                ambient: Boolean(eff.ambient),
                show_particles: Boolean(eff.showParticles ?? true),
                show_icon: Boolean(eff.showIcon ?? true),
              }
            }),
          }
        : undefined,
  }
}
