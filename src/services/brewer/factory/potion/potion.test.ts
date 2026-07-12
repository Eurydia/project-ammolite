import { assert, describe, expect, it } from 'vitest'
import { createPotion } from './potion'
import { PotionType } from '../../enums/potion-effect.enum'
import { MinecraftItem } from '../../enums/minecraft-item.enum'

describe('Potion input factory function', () => {
  it('should have item id by default', () => {
    const potion = createPotion()
    assert.propertyVal(potion, 'item', MinecraftItem.POTION)
  })
  it('has no potion_contents property by default', () => {
    const potion = createPotion()
    assert.propertyVal(potion, 'potion_contents', undefined)
  })

  it('can accept item id', () => {
    const potion = createPotion(MinecraftItem.POTION)
    assert.propertyVal(potion, 'item', MinecraftItem.POTION)
  })

  describe('potion content options', () => {
    it('can accept potion_content.potion', () => {
      const potion = createPotion(MinecraftItem.POTION, {
        potion: PotionType.AWKWARD,
      })
      expect(potion).toHaveProperty(
        'potion_contents.potion',
        PotionType.AWKWARD,
      )
    })

    it('accept potion_content.custom_color', () => {
      const potion = createPotion(MinecraftItem.POTION, {
        customColor: 0,
      })
      expect(potion).toHaveProperty('potion_contents.custom_color', 0)
    })

    it('accept potion_content.custom_name', () => {
      const potion = createPotion(MinecraftItem.POTION, {
        customName: 'item.minecraft.x.effect.y',
      })
      expect(potion).toHaveProperty(
        'potion_contents.custom_name',
        'item.minecraft.x.effect.y',
      )
    })

    describe('potion_contents.custom_effects array', () => {
      it('accept empty potion_content.custom_effects array', () => {
        const potion = createPotion(MinecraftItem.POTION, {
          customEffects: [],
        })

        expect(potion).toHaveProperty(
          'potion_contents.custom_effects.length',
          0,
        )
      })

      it('accept one-element potion_content.custom_effects array', () => {
        const potion = createPotion(MinecraftItem.POTION, {
          customEffects: [{ id: PotionType.AWKWARD }],
        })
        expect(potion).toHaveProperty(
          'potion_contents.custom_effects.length',
          1,
        )
      })

      it('accept many-element potion_content.custom_effects array', () => {
        const potion = createPotion(MinecraftItem.POTION, {
          customEffects: [
            { id: PotionType.FIRE_RESISTANCE },
            { id: PotionType.HARMING },
          ],
        })
        expect(potion).toHaveProperty(
          'potion_contents.custom_effects.length',
          2,
        )
      })
    })

    describe('potion_contents.custom_effects additional options', () => {
      describe('potion_contents.custom_effects[index].amplifier', () => {
        it('default amplifier is 0', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.amplifier',
            0,
          )
        })

        it('accept amplifier', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, amplifier: 1 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.amplifier',
            1,
          )
        })

        it('reject negative amplifier', () => {
          expect(() =>
            createPotion(MinecraftItem.POTION, {
              customEffects: [{ id: PotionType.SWIFTNESS, amplifier: -1 }],
            }),
          ).toThrow('amplifier must be non-negative')
        })

        it('reject non-integer amplifier', () => {
          expect(() => {
            createPotion(MinecraftItem.POTION, {
              customEffects: [{ id: PotionType.SWIFTNESS, amplifier: 0.2 }],
            })
          }).toThrow('amplifier must be an integer')
        })
      })

      describe('potion_contents.custom_effects[index].duration', () => {
        it('default duration is 1', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            1,
          )
        })

        it('accept duration', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, duration: 10 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            10,
          )
        })

        it('duration 0 is treated as 1', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, duration: 0 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            1,
          )
        })

        it('duration -2 is treated as 1', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, duration: -2 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            1,
          )
        })

        it('duration -1 is kept', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, duration: -1 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            -1,
          )
        })

        it('duration less than -2 is treated as 1', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, duration: -3 }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.duration',
            1,
          )
        })

        it('reject non-integer duration', () => {
          expect(() => {
            createPotion(MinecraftItem.POTION, {
              customEffects: [{ id: PotionType.SWIFTNESS, duration: -0.2 }],
            })
          }).toThrow('duration must be an integer')
        })
      })

      describe('potion_contents.custom_effects[index].ambient', () => {
        it('defaults to `false` when not provided', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.ambient',
            false,
          )
        })

        it('accept ambient', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, ambient: true }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.ambient',
            true,
          )
        })

        it('accept explicit false', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, ambient: false }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.ambient',
            false,
          )
        })
      })

      describe('potion_contents.custom_effects[index].show_particles', () => {
        it('defaults to `true` when not provided', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_particles',
            true,
          )
        })

        it('accept explicit true', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, showParticles: true }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_particles',
            true,
          )
        })

        it('accept explicit false', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, showParticles: false }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_particles',
            false,
          )
        })
      })

      describe('potion_contents.custom_effects[index].show_icon', () => {
        it('defaults to `true` when not provided', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_icon',
            true,
          )
        })

        it('accept explicit true', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, showIcon: true }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_icon',
            true,
          )
        })

        it('accept explicit false', () => {
          const potion = createPotion(MinecraftItem.POTION, {
            customEffects: [{ id: PotionType.SWIFTNESS, showIcon: false }],
          })
          expect(potion).toHaveProperty(
            'potion_contents.custom_effects.0.show_icon',
            false,
          )
        })
      })
    })
  })
})
