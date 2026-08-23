import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";

export const IntBoundPredicate = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("exact"), value: z.number().int() }),
  z.object({
    kind: z.literal("range"),
    value: z.object({
      minValue: z.number().int(),
      maxValue: z.number().int(),
    }),
  }),
]);

export const MobEffectPredicate = z.object({
  effect: z.enum(PotionType),
  amplifier: IntBoundPredicate,
  duration: IntBoundPredicate,
  ambient: z.boolean(),
  visible: z.boolean(),
});

export const PotionKindPredicate = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("list"),
    value: z.array(z.enum(PotionType)),
  }),
  z.object({ kind: z.literal("tag"), value: z.string() }),
]);

export const EffectsCountPredicate = z.object({
  test: z.array(MobEffectPredicate),
  count: IntBoundPredicate,
});

export const EffectsPredicate = z.object({
  contains: MobEffectPredicate.array(),
  count: EffectsCountPredicate.array(),
  size: IntBoundPredicate,
});

export const PotionContentsPredicate = z.object({
  potions: PotionKindPredicate.optional(),
  effects: EffectsPredicate.optional(),
});
