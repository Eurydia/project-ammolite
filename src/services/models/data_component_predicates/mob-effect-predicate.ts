import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntBoundPredicate } from "./generics/int-bound-predicate";
import { OptionalBooleanPredicate } from "./generics/optional-boolean-predicate";

export const MobEffectPredicate = z.object({
  effect: z.enum(PotionType),
  amplifier: IntBoundPredicate,
  duration: IntBoundPredicate,
  ambient: OptionalBooleanPredicate,
  visible: OptionalBooleanPredicate,
});
