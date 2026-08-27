import z from "zod";
import { PotionType } from "#/services/enums/potion-effect.enum";
import { IntString } from "../data_component_predicates/generics/int-string";
import { OptionalIntString } from "../data_component_predicates/generics/optional-int-string";

export const PotionContents$CustomColor = z.object({
  red: IntString.pipe(z.int().min(0).max(255)),
  green: IntString.pipe(z.int().min(0).max(255)),
  blue: IntString.pipe(z.int().min(0).max(255)),
});

export const PotionContents$CustomColor$AsDatapackJSON = (
  dt: z.output<typeof PotionContents$CustomColor>,
) => {
  const red = dt.red * 256 * 256;
  const green = dt.green * 256;
  const sum = red + green + dt.blue;
  return `#${sum.toString().padStart(6, "0")}`;
};

export const PotionContents$CustomEffects$Effect = z.object({
  effect: z.enum(PotionType),
  duration: OptionalIntString,
  amplifier: OptionalIntString,
  visible: z.boolean().optional(),
  ambient: z.boolean().optional(),
  showIcon: z.boolean().optional(),
  showParticles: z.boolean().optional(),
});

export const PotionContents$CustomEffects$Effect$AsDatapackJSON = (
  dt: z.output<typeof PotionContents$CustomEffects$Effect>,
) => {
  return {
    effect: dt.effect,
    amplifier: dt.amplifier,
    duration: dt.duration,
    show_particles: dt.showParticles,
    show_icon: dt.showIcon,
    ambient: dt.ambient,
    visible: dt.visible,
  };
};

export const PotionContents$CustomEffects = z.object({
  values: PotionContents$CustomEffects$Effect.array(),
});

export const PotionContents$CustomEffects$AsDatapackJSON = (
  dt: z.output<typeof PotionContents$CustomEffects>,
) => {
  return dt.values.map((value) =>
    PotionContents$CustomEffects$Effect$AsDatapackJSON(value),
  );
};

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

export const PotionContents$AsDataPackJSON = (
  dt: z.output<typeof PotionContents>,
) => {
  return {
    "minecraft:potion_contents": {
      potion: dt.potion,
      custom_name: dt.customName,
      custom_color:
        dt.customColor === undefined
          ? undefined
          : PotionContents$CustomColor$AsDatapackJSON(dt.customColor),
      custom_effects:
        dt.customEffects === undefined
          ? undefined
          : PotionContents$CustomEffects$AsDatapackJSON(dt.customEffects),
    },
  };
};
