import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntBoundPredicate } from "./generics/int-bound-predicate";
import { MobEffectPredicate } from "./mob-effect-predicate";

export const PotionContentsPredicate$Potions = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("list"),
    value: z.array(z.enum(PotionType)),
  }),
  z.object({ kind: z.literal("tag"), value: z.string() }),
]);

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
  size: IntBoundPredicate.optional(),
});

export const PotionContentsPredicate = z.object({
  potions: PotionContentsPredicate$Potions.optional(),
  effects: PotionContentsPredicate$Effects.optional(),
});
