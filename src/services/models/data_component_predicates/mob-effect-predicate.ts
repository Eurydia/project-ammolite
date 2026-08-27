import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { OptionalBooleanPredicate } from "./generics/optional-boolean-predicate";
import { OptionalIntBoundPredicate } from "./generics/optional-int-bound-predicate";

export const MobEffectPredicate = z.object({
  effect: z.enum(PotionType),
  amplifier: OptionalIntBoundPredicate,
  duration: OptionalIntBoundPredicate,
  ambient: OptionalBooleanPredicate,
  visible: OptionalBooleanPredicate,
});

export const MobEffectPredicate$AsDataPackJSON = (
  dt: z.output<typeof MobEffectPredicate>,
) => {
  return {
    [dt.effect]: {
      duration: dt.duration,
      amplifier: dt.amplifier,
      ambient: dt.ambient,
      visible: dt.visible,
    },
  };
};
