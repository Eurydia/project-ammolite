import { NumberBound, NumberBoundType } from "#/models/snbt/number-bound.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

export type MobEffectPredicateType = Readonly<{
  effect: string;
  amplifier?: NumberBoundType;
  duration?: NumberBoundType;
  ambient?: boolean;
  visible?: boolean;
}>;

export const MobEffectPredicate = {
  from({
    amplifier,
    duration,
    ...rest
  }: {
    amplifier?: number | { min?: number; max?: number };
    duration?: number | { min?: number; max?: number };
    effect: string;
    ambient?: boolean;
    visible?: boolean;
  }): MobEffectPredicateType {
    return Object.freeze({
      ...rest,
      amplifier: keepUndefinedOrTransform(amplifier, (val) =>
        NumberBound.byte(val),
      ),
      duration: keepUndefinedOrTransform(duration, (val) =>
        NumberBound.integer(val),
      ),
    });
  },
};
