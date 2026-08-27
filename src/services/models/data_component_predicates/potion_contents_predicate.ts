import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntBoundPredicate } from "./generics/int-bound-predicate";
import { OptionalIntBoundPredicate } from "./generics/optional-int-bound-predicate";
import { MobEffectPredicate } from "./mob-effect-predicate";

export const PotionContentsPredicate$Potions = z.object({
  values: z.enum(PotionType).array(),
});

export const PotionContentsPredicate$Effects$Contains = z.object({
  values: MobEffectPredicate.array(),
});

export const PotionContentsPredicate$Effects$Count = z.object({
  values: z
    .object({
      test: z.array(MobEffectPredicate),
      count: IntBoundPredicate,
    })
    .array(),
});

export const PotionContentsPredicate$Effects = z.object({
  contains: PotionContentsPredicate$Effects$Contains.optional(),
  count: PotionContentsPredicate$Effects$Count.optional(),
  size: OptionalIntBoundPredicate,
});

export const PotionContentsPredicate = z.object({
  potions: PotionContentsPredicate$Potions.optional(),
  effects: PotionContentsPredicate$Effects.optional(),
});
