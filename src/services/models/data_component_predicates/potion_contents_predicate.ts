import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";

const OptionalIntString = z
  .string()
  .trim()
  .normalize()
  .transform((arg) => (arg.length === 0 ? undefined : Number.parseInt(arg, 10)))
  .pipe(z.int().optional());

export const IntBoundPredicate = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("exact"),
    value: OptionalIntString,
  }),
  z.object({
    kind: z.literal("range"),
    value: z.object({
      minValue: OptionalIntString,
      maxValue: OptionalIntString,
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
  contains: MobEffectPredicate.array().optional(),
  count: EffectsCountPredicate.array().optional(),
  size: IntBoundPredicate.optional(),
});

export const PotionContentsPredicate = z.object({
  potions: PotionKindPredicate.optional(),
  effects: EffectsPredicate.optional(),
});
