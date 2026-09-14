import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem as MinecraftItems } from "#/enum/minecraft-item.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import { LoreComponent } from "#/models/data-components/lore.ts";
import { TextComponent } from "#/models/data-components/common/text.ts";
import { MinecraftColor } from "#/enum/minecraft-colors.ts";
import { CustomNameComponent } from "#/models/data-components/custom-name.ts";
import { MinecraftTick } from "./core/utility/duration.ts";
import { MinecraftPotions } from "#/enum/minecraft-potions.ts";
import { SuspiciousStewEffectsComponent } from "#/models/data-components/suspicious-stew-effects.ts";
import { SuspiciousStewEffect } from "#/models/data-components/common/suspicious-stew-effect.ts";
import { DataComponent } from "#/models/data-components/data-component.ts";
import { PotionContentsComponent } from "#/models/data-components/potion-contents.ts";
import { MobEffectComponent } from "#/models/data-components/common/mob-effect.ts";

const pack = new DataPack("eurydia_long_lasting_potions");
const tagLore = LoreComponent.from(
  TextComponent.from({
    text: "✦Eurydia's Long Lasting Potions",
    italic: false,
  }),
);

for (
  const [preset, eff, duration, name] of [
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
  ] as const
) {
  pack.addBrewingRecipe(
    BrewingRecipe.from(
      {
        item: MinecraftItems.POTION,
        potion_contents: PotionContentsPredicate.from({ potions: preset }),
      },
      { item: MinecraftItems.REDSTONE_BLOCK },
      {
        id: MinecraftItems.POTION,
        components: DataComponent.from(
          PotionContentsComponent.from({
            customEffects: [
              MobEffectComponent.from({
                id: eff,
                duration: MinecraftTick.fromSeconds(duration * 1.5),
              }),
            ],
          }),
          CustomNameComponent.from(
            TextComponent.from({
              text: "Long Lasting",
              italic: false,
              color: MinecraftColor.GOLD,
              extra: [
                TextComponent.from({
                  text: ` Potion of ${name}`,
                  bold: false,
                  underlined: false,
                  color: MinecraftColor.WHITE,
                }),
              ],
            }),
          ),
          tagLore,
        ),
      },
    ),
  );
}

for (
  const [flowers, eff] of [
    [[MinecraftItems.ALLIUM], MobEffects.FIRE_RESISTANCE],
    [
      [MinecraftItems.AZURE_BLUET, MinecraftItems.OPEN_EYEBLOSSOM],
      MobEffects.BLINDNESS,
    ],
    [
      [MinecraftItems.BLUE_ORCHID, MinecraftItems.DANDELION],
      MobEffects.SATURATION,
    ],
    [[MinecraftItems.CLOSED_EYEBLOSSOM], MobEffects.NAUSEA],
    [[MinecraftItems.CORNFLOWER], MobEffects.JUMP_BOOST],
    [[MinecraftItems.LILY_OF_THE_VALLEY], MobEffects.POISON],
    [[MinecraftItems.OXEYE_DAISY], MobEffects.REGENERATION],
    [
      [MinecraftItems.POPPY, MinecraftItems.TORCHFLOWER],
      MobEffects.NIGHT_VISION,
    ],
    [
      [
        MinecraftItems.RED_TULIP,
        MinecraftItems.ORANGE_TULIP,
        MinecraftItems.WHITE_TULIP,
        MinecraftItems.PINK_TULIP,
      ],
      MobEffects.WEAKNESS,
    ],
    [[MinecraftItems.WITHER_ROSE], MobEffects.WITHER],
  ] as const
) {
  for (const f of flowers) {
    pack.addBrewingRecipe(
      BrewingRecipe.from(
        { item: MinecraftItems.MUSHROOM_STEW },
        { item: f },
        {
          id: MinecraftItems.SUSPICIOUS_STEW,
          components: DataComponent.from(
            SuspiciousStewEffectsComponent.from(
              SuspiciousStewEffect.from(eff),
            ),
          ),
        },
      ),
    );
  }
}

PackBuilder.buildDataPack(pack);
