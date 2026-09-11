import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem as MinecraftItems } from "#/enum/minecraft-item.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import {
  Effects,
  MobEffectPredicate,
  PotionContentsPredicate,
} from "#/models/predicates/potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import { PotionContents } from "#/models/data-components/potion-contents.ts";
import { Rarity } from "#/models/data-components/rarity.ts";
import { DeathProtection } from "#/models/data-components/death-protection.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";
import { ConsumeEffect } from "#/models/data-components/common/consume-effect.ts";
import { Lore } from "#/models/data-components/lore.ts";
import { Text } from "#/models/data-components/common/text.ts";
import { MinecraftColor } from "#/enum/minecraft-colors.ts";
import { CustomName } from "#/models/data-components/custom-name.ts";
import { MinecraftTick } from "./core/utility/duration.ts";
import { MinecraftPotions } from "#/enum/minecraft-potions.ts";
import { DamageResistant } from "#/models/data-components/damage-resistant.ts";

const pack = new DataPack("eurydia_long_lasting_potions");

for (const [preset, eff, duration, name] of [
  [
    MinecraftPotions.LONG_NIGHT_VISION,
    MobEffects.NIGHT_VISION,
    8 * 60,
    "Night Vision",
  ],
  [
    MinecraftPotions.LONG_INVISIBILITY,
    MobEffects.INVISIBILITY,
    8 * 60,
    "Invisibility",
  ],
  [MinecraftPotions.LONG_LEAPING, MobEffects.JUMP_BOOST, 8 * 60, "Leaping"],
  [
    MinecraftPotions.LONG_FIRE_RESISTANCE,
    MobEffects.FIRE_RESISTANCE,
    8 * 60,
    "Fire resistance",
  ],
  [MinecraftPotions.LONG_SWIFTNESS, MobEffects.SPEED, 8 * 60, "Swiftness"],
  [MinecraftPotions.LONG_SLOWNESS, MobEffects.SLOWNESS, 3 * 60, "Slowness"],
  [
    MinecraftPotions.LONG_WATER_BREATHING,
    MobEffects.WATER_BREATHING,
    8 * 60,
    "Water Breathing",
  ],
  [MinecraftPotions.LONG_POISON, MobEffects.POISON, 90, "Poison"],
  [
    MinecraftPotions.LONG_REGENERATION,
    MobEffects.REGENERATION,
    90,
    " Regeneration",
  ],
  [MinecraftPotions.LONG_STRENGTH, MobEffects.STRENGTH, 8 * 60, "Strength"],
  [MinecraftPotions.LONG_WEAKNESS, MobEffects.WEAKNESS, 3 * 60, "Weakness"],
  [
    MinecraftPotions.LONG_SLOW_FALLING,
    MobEffects.SLOW_FALLING,
    3 * 60,
    "Slow Falling",
  ],
] as const) {
  pack.addBrewingRecipe(
    BrewingRecipe.new(
      MinecraftItems.POTION,
      MinecraftItems.REDSTONE_BLOCK,
      MinecraftItems.POTION,
    )
      .whereInputPredicate(PotionContentsPredicate.new().wherePotions(preset))
      .withOutputComponents(
        PotionContents.new().withEffects(
          MobEffect.new(eff).withDuration(
            MinecraftTick.fromSeconds(duration * 1.5),
          ),
        ),
        CustomName.from(
          Text.Text("Long Lasting")
            .withBold()
            .withUnderlined()
            .withItalic(false)
            .withColor(MinecraftColor.LIGHT_PURPLE)
            .withExtra(
              Text.Text(` Potion of ${name}`)
                .withBold(false)
                .withUnderlined(false),
            ),
        ),
        Lore.new(
          Text.Text("✦Eurydia's Long Lasting Potions").withItalic(false),
        ),
      ),
  );
}

pack.addBrewingRecipe(
  BrewingRecipe.new(
    MinecraftItems.POTION,
    MinecraftItems.REDSTONE_BLOCK,
    MinecraftItems.POTION,
  )
    .whereInputPredicate(
      PotionContentsPredicate.new().wherePotions(
        MinecraftPotions.LONG_TURTLE_MASTER,
      ),
    )
    .withOutputComponents(
      PotionContents.new(MinecraftPotions.LONG_TURTLE_MASTER).withEffects(
        MobEffect.new(MobEffects.SLOWNESS)
          .withDuration(MinecraftTick.fromSeconds(60))
          .withAmplifier(3),
        MobEffect.new(MobEffects.RESISTANCE)
          .withDuration(MinecraftTick.fromSeconds(60))
          .withAmplifier(2),
      ),
      CustomName.from(
        Text.Text("Long Lasting")
          .withBold()
          .withUnderlined()
          .withItalic(false)
          .withColor(MinecraftColor.LIGHT_PURPLE)
          .withExtra(
            Text.Text(` Potion of Turtle Master`)
              .withBold(false)
              .withUnderlined(false),
          ),
      ),
      Lore.new(Text.Text("✦Eurydia's Long Lasting Potions").withItalic(false)),
    ),
);

PackBuilder.buildDataPack(pack);
