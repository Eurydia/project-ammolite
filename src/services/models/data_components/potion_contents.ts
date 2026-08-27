import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntString } from "../data_component_predicates/generics/int-string";
import { OptionalIntString } from "../data_component_predicates/generics/optional-int-string";

export const PotionContents$CustomColor = z.object({
  red: IntString.pipe(z.int().min(0).max(255)),
  green: IntString.pipe(z.int().min(0).max(255)),
  blue: IntString.pipe(z.int().min(0).max(255)),
});

export const PotionContents$CustomEffects$Effect = z.object({
  effect: z.enum(PotionType),
  duration: OptionalIntString,
  amplifier: OptionalIntString,
  visible: z.boolean(),
  ambient: z.boolean(),
  showIcon: z.boolean(),
  showParticles: z.boolean(),
});

export const PotionContents$CustomEffects = z.object({
  values: PotionContents$CustomEffects$Effect.array(),
});

export const PotionContents = z.object({
  id: z.literal("minecraft:potion_contents"),
  potion: z.enum(PotionType),
  customName: z
    .string()
    .normalize()
    .transform((arg) => arg || undefined)
    .pipe(z.string().optional()),
  customColor: PotionContents$CustomColor.optional(),
  customEffects: PotionContents$CustomEffects.optional(),
});
