import { describe, expect, it } from 'vitest'
import { PotionType } from '../../enums/potion-effect.enum'
import { PotionContentPredicateFactory } from './potion-content.predicate'

describe('potion_content predicate factory', () => {
  describe('potion_content.potions', () => {
    it('accepts no args', () => {
      expect(PotionContentPredicateFactory.potionsFrom()).toHaveProperty(
        'potions',
        undefined,
      )
    })

    it('can be an arbitrary string', () => {
      expect(
        PotionContentPredicateFactory.potionsFrom('minecraft:hi'),
      ).toHaveProperty('potions', 'minecraft:hi')
    })

    it('can accept multiple args of potion types', () => {
      expect(
        PotionContentPredicateFactory.potionsFrom(
          PotionType.AWKWARD,
          PotionType.FIRE_RESISTANCE,
        ),
      ).toHaveProperty('potions', [
        PotionType.AWKWARD,
        PotionType.FIRE_RESISTANCE,
      ])
    })
  })

  describe('potion_contents.effects', () => {
    describe('effects.size', () => {
      describe('when accepting numeric values', () => {
        it('can be an integer', () => {
          expect(
            PotionContentPredicateFactory.effectsFrom({ size: 2 }),
          ).toHaveProperty('effects.size', 2)
        })

        it('rejects non-integer', () => {
          expect(() =>
            PotionContentPredicateFactory.effectsFrom({
              size: 0.2,
            }),
          ).toThrow()
        })
      })

      describe('when accepting object values', () => {
        it('can be an object with `min` property', () => {
          expect(
            PotionContentPredicateFactory.effectsFrom({
              size: { min: 1 },
            }),
          ).toHaveProperty('effects.size.min', 1)
        })

        it('reject non-integer `min` value', () => {
          expect(() =>
            PotionContentPredicateFactory.effectsFrom({
              size: { min: 0.2 },
            }),
          ).toThrow()
        })

        it('can be an object with `max` property', () => {
          expect(
            PotionContentPredicateFactory.effectsFrom({
              size: { max: 1 },
            }),
          ).toHaveProperty('effects.size.max', 1)
        })

        it('reject non-integer `max` value', () => {
          expect(() =>
            PotionContentPredicateFactory.effectsFrom({
              size: { max: 0.2 },
            }),
          ).toThrow()
        })

        it('can be an object with both `min` and `max` properties', () => {
          expect(
            PotionContentPredicateFactory.effectsFrom({
              size: { min: 1, max: 2 },
            }),
          ).toHaveProperty('effects.size', { min: 1, max: 2 })
        })
      })
    })
    describe('effects.count', () => {
      describe('effects.count.count', () => {
        describe('when accepting numeric values', () => {
          it('can be an integer', () => {
            expect(
              PotionContentPredicateFactory.effectsFrom({ size: 2 }),
            ).toHaveProperty('effects.size', 2)
          })

          it('rejects non-integer', () => {
            expect(() =>
              PotionContentPredicateFactory.effectsFrom({
                size: 0.2,
              }),
            ).toThrow()
          })
        })

        describe('when accepting object values', () => {
          it('can be an object with `min` property', () => {
            expect(
              PotionContentPredicateFactory.effectsFrom({
                size: { min: 1 },
              }),
            ).toHaveProperty('effects.size.min', 1)
          })

          it('reject non-integer `min` value', () => {
            expect(() =>
              PotionContentPredicateFactory.effectsFrom({
                size: { min: 0.2 },
              }),
            ).toThrow()
          })

          it('can be an object with `max` property', () => {
            expect(
              PotionContentPredicateFactory.effectsFrom({
                size: { max: 1 },
              }),
            ).toHaveProperty('effects.size.max', 1)
          })

          it('reject non-integer `max` value', () => {
            expect(() =>
              PotionContentPredicateFactory.effectsFrom({
                size: { max: 0.2 },
              }),
            ).toThrow()
          })

          it('can be an object with both `min` and `max` properties', () => {
            expect(
              PotionContentPredicateFactory.effectsFrom({
                size: { min: 1, max: 2 },
              }),
            ).toHaveProperty('effects.size', { min: 1, max: 2 })
          })
        })
      })

      describe('effects.count.test', () => {
        describe()
      })
    })
  })
})
