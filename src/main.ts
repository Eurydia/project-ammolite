import { DataPack } from "#/models/data_pack.ts";
import { ConsumeAnimations } from "#/enum/consume-animations.ts";
import { MinecraftColor } from "#/enum/minecraft-colors.ts";
import { MinecraftPotions } from "#/enum/minecraft-potions.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import { MinecraftTick } from "#/utility/duration.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { MinecraftItem } from "#/enum/minecraft-item.ts";

const pack = new DataPack("eurydia_long_lasting_potions");
// const tagLore = TextComponent.from({
//   text: "✦Eurydia's Long Lasting Potions",
//   italic: false,
//   color: MinecraftColor.GOLD,
// });

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
  pack.addBrewingRecipe((builder) => {
    builder
      .input(MinecraftItem.POTION, (pred) => {
        pred.potions(preset);
      })
      .reagent(MinecraftItem.REDSTONE_BLOCK)
      .output((output) => {
        output.id(MinecraftItem.POTION).component((comp) =>
          comp
            .potionContents((content) => {
              content.potion(eff);
            })
            .potionDurationScale((scale) => scale.scale(1.5))
            .customName((cName) => {
              cName.text((txt) => {
                txt
                  .italic(false)
                  .text("Long Lasting ")
                  .color(MinecraftColor.GOLD)
                  .extra((extraTxt) => {
                    extraTxt.color(MinecraftColor.WHITE).text(name);
                  });
              });
            }),
        );
      });
  });
}

// for (const [flowers, eff] of [
//   [[MinecraftItems.ALLIUM], MobEffects.FIRE_RESISTANCE],
//   [
//     [MinecraftItems.AZURE_BLUET, MinecraftItems.OPEN_EYEBLOSSOM],
//     MobEffects.BLINDNESS,
//   ],
//   [
//     [MinecraftItems.BLUE_ORCHID, MinecraftItems.DANDELION],
//     MobEffects.SATURATION,
//   ],
//   [[MinecraftItems.CLOSED_EYEBLOSSOM], MobEffects.NAUSEA],
//   [[MinecraftItems.CORNFLOWER], MobEffects.JUMP_BOOST],
//   [[MinecraftItems.LILY_OF_THE_VALLEY], MobEffects.POISON],
//   [[MinecraftItems.OXEYE_DAISY], MobEffects.REGENERATION],
//   [[MinecraftItems.POPPY, MinecraftItems.TORCHFLOWER], MobEffects.NIGHT_VISION],
//   [
//     [
//       MinecraftItems.RED_TULIP,
//       MinecraftItems.ORANGE_TULIP,
//       MinecraftItems.WHITE_TULIP,
//       MinecraftItems.PINK_TULIP,
//     ],
//     MobEffects.WEAKNESS,
//   ],
//   [[MinecraftItems.WITHER_ROSE], MobEffects.WITHER],
// ] as const) {
//   for (const f of flowers) {
//     pack.addBrewingRecipe(
//       BrewingRecipe.from({
//         input: { item: MinecraftItems.MUSHROOM_STEW },
//       })({ reagent: { item: f } })({
//         output: {
//           id: MinecraftItems.SUSPICIOUS_STEW,
//           components: DataComponent.from(
//             stewEffects(eff),
//             LoreComponent.from(tagLore),
//           ),
//         },
//       }),
//     );
//   }
// }

// const lastUse = ItemStack.__from({
//   id: MinecraftItems.POTION,
//   components: DataComponent.from(
//     CustomNameComponent.from(
//       TextComponent.from({
//         text: "Sippable Potion of Swiftness",
//         italic: false,
//       }),
//     ),
//     ConsumableComponent.from({
//       consumeSeconds: 1.6 / 3,
//       animation: ConsumeAnimations.DRINK,
//       hasConsumeParticles: false,
//     }),
//     PotionContentsComponent.from({
//       customEffects: [
//         MobEffectComponent.from({
//           duration: MinecraftTick.fromSeconds(60),
//           id: MobEffects.SPEED,
//         }),
//       ],
//     }),
//     LoreComponent.from(
//       TextComponent.from({
//         text: '"Save some for later" (last drink!)',
//       }),
//       TextComponent.from({
//         text: "",
//       }),
//       tagLore,
//     ),
//     UseRemainderComponent.from({
//       id: MinecraftItems.GLASS_BOTTLE,
//     }),
//   ),
// });

// const secondUse = ItemStack.__from({
//   id: MinecraftItems.POTION,
//   components: DataComponent.from(
//     CustomNameComponent.from(
//       TextComponent.from({
//         text: "Sippable Potion of Swiftness",
//         italic: false,
//       }),
//     ),
//     ConsumableComponent.from({
//       consumeSeconds: 1.6 / 3,
//       animation: ConsumeAnimations.DRINK,
//       hasConsumeParticles: false,
//     }),
//     PotionContentsComponent.from({
//       customEffects: [
//         MobEffectComponent.from({
//           duration: MinecraftTick.fromSeconds(60),
//           id: MobEffects.SPEED,
//         }),
//       ],
//     }),
//     LoreComponent.from(
//       TextComponent.from({
//         text: '"Save some for later" (2 drinks left)',
//       }),
//       TextComponent.from({
//         text: "",
//       }),
//       tagLore,
//     ),
//     UseRemainderComponent.from(lastUse),
//   ),
// });
// pack.addBrewingRecipe(
//   BrewingRecipe.from({
//     input: {
//       item: MinecraftItems.POTION,
//       potion_contents: PotionContentsPredicate.from({
//         potions: MinecraftPotions.SWIFTNESS,
//       }),
//     },
//     reagent: { item: MinecraftItems.ICE },
//     output: ItemStack.__from({
//       id: MinecraftItems.POTION,
//       components: DataComponent.from(
//         CustomNameComponent.from(
//           TextComponent.from({
//             text: "Sippable Potion of Swiftness",
//             italic: false,
//           }),
//         ),
//         ConsumableComponent.from({
//           consumeSeconds: 1.6 / 3,
//           animation: ConsumeAnimations.DRINK,
//           hasConsumeParticles: false,
//         }),
//         PotionContentsComponent.from({
//           customEffects: [
//             MobEffectComponent.from({
//               duration: MinecraftTick.fromSeconds(60),
//               id: MobEffects.SPEED,
//             }),
//           ],
//         }),
//         LoreComponent.from(
//           TextComponent.from({
//             text: '"Save some for later" (3 drinks left)',
//           }),
//           TextComponent.from({
//             text: "",
//           }),
//           tagLore,
//         ),
//         UseRemainderComponent.from(secondUse),
//       ),
//     }),
//   }),
// );

PackBuilder.buildDataPack(pack);
