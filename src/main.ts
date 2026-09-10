import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import { PotionContents } from "#/models/data-components/potion-contents.ts";
import { Rarity } from "#/models/data-components/rarity.ts";
import { DeathProtection } from "#/models/data-components/death-protection.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";
import { ConsumeEffect } from "#/models/data-components/common/consume-effect.ts";
import { Lore } from "#/models/data-components/lore.ts";
import { Text } from "#/models/data-components/common/text.ts";

const pack = new DataPack("TEST");
pack.addBrewingRecipe(
  BrewingRecipe.new(
    MinecraftItem.POTION,
    MinecraftItem.TOTEM_OF_UNDYING,
    MinecraftItem.POTION,
  )
    .whereInputPredicate(
      PotionContentsPredicate.new().wherePotions(MobEffects.STRONG_SWIFTNESS),
    )
    .withOutputComponents(
      PotionContents.new().withEffects(
        MobEffect.new(MobEffects.REGENERATION)
          .withDuration(2000)
          .withAmplifier(3),
        MobEffect.new(MobEffects.FIRE_RESISTANCE).withDuration(2000),
        MobEffect.new("minecraft:absorption").withDuration(2000),
        MobEffect.new(MobEffects.STRONG_SWIFTNESS).withDuration(2000),
      ),
      Rarity.epic(),
      DeathProtection.new(
        ConsumeEffect.applyEffects(
          MobEffect.new(MobEffects.REGENERATION)
            .withDuration(2000)
            .withAmplifier(3),
          MobEffect.new(MobEffects.FIRE_RESISTANCE).withDuration(2000),
          MobEffect.new("minecraft:absorption").withDuration(2000),
          MobEffect.new(MobEffects.STRONG_SWIFTNESS).withDuration(2000),
        ).withProbability(1),
      ),
      Lore.new(Text.Str("Protects you upon death")),
    ),
);

PackBuilder.buildDataPack(pack);
