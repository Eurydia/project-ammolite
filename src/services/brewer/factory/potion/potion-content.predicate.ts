import type { PotionType } from '../../enums/potion-effect.enum'
import { predicateIntValueOrRange } from '../predicates/integer-value-or-range'

export const PotionContentPredicateFactory = {
  effectsFrom: (options?: {
    count?: {
      count?:
        | number
        | { min: number; max: number }
        | { min: number; max?: number }
        | { min?: number; max: number }
    }
    size?:
      | number
      | { min: number; max: number }
      | { min: number; max?: number }
      | { min?: number; max: number }
  }) => {
    if (
      options?.size !== undefined &&
      !predicateIntValueOrRange(options.size)
    ) {
      throw Error('invalid range for size')
    }

    if (
      options?.count?.count !== undefined &&
      !predicateIntValueOrRange(options.count.count)
    ) {
      throw Error('invalid range for count.count')
    }

    return {
      effects: {
        size: options?.size,
        count: { count: options?.count?.count },
      },
    }
  },
  potionsFrom: (...args: (string | PotionType)[]) => {
    if (args.length < 2) {
      return { potions: args.at(0) }
    }
    return {
      potions: args,
    }
  },
}
