import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";

const PotionColor = z.object({
  red: z.number().int().min(0).max(255),
  green: z.number().int().min(0).max(255),
  blue: z.number().int().min(0).max(255),
});

const PotionEffect = z.object({
  effect: z.enum(PotionType),
  duration: z.number(),
  amplifier: z.number(),
  visible: z.boolean(),
  ambient: z.boolean(),
  showIcon: z.boolean(),
  showParticles: z.boolean(),
});

const PotionKind = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("single"),
    potion: z.enum(PotionType),
  }),
  z.object({
    kind: z.literal("multiple"),
    potios: z.array(z.enum(PotionType)),
  }),
  z.object({ kind: z.literal("tag"), tag: z.string() }),
]);

export const PotionContents = z.object({
  id: z.literal("minecraft:potion_contents"),
  potions: PotionKind,
  customColor: PotionColor,
  customName: z.string(),
  customEffects: z.array(PotionEffect),
});
