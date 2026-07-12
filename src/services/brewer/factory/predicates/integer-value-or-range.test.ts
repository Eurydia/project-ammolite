import { describe, it, expect } from 'vitest'
import { predicateIntValueOrRange } from './integer-value-or-range'

describe('predicate integer range', () => {
  describe('when accepting numeric values', () => {
    it('can be an integer', () => {
      expect(predicateIntValueOrRange(2)).toBe(true)
    })

    it('rejects non-integer', () => {
      expect(predicateIntValueOrRange(0.2)).toBe(false)
    })
  })

  describe('when accepting object values', () => {
    it('can be an object with `min` property', () => {
      expect(
        predicateIntValueOrRange({
          min: 1,
        }),
      ).toBe(true)
    })

    it('reject non-integer `min` value', () => {
      expect(
        predicateIntValueOrRange({
          min: 0.2,
        }),
      ).toBe(false)
    })

    it('can be an object with `max` property', () => {
      expect(
        predicateIntValueOrRange({
          max: 1,
        }),
      ).toBe(true)
    })

    it('reject non-integer `max` value', () => {
      expect(
        predicateIntValueOrRange({
          max: 0.2,
        }),
      ).toBe(false)
    })

    it('can be an object with both `min` and `max` properties', () => {
      expect(
        predicateIntValueOrRange({
          min: 1,
          max: 2,
        }),
      ).toBe(true)
    })
  })
})
