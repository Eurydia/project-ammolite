import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import { PotionContents } from "#/models/data-components/potion-contents.ts";
import { Rarity } from "#/models/data-components/rarity.ts";
import {
  ConsumeEffect,
  DeathProtection,
} from "#/models/data-components/death-protection.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";

const pack = new DataPack("TEST");
pack.addBrewingRecipe(
  BrewingRecipe.new(
    MinecraftItem.NETHER_WART_BLOCK,
    MinecraftItem.POTENT_SULFUR,
    MinecraftItem.POTION,
  )
    .whereInputPredicate(
      PotionContentsPredicate.new().wherePotions(
        MobEffects.FIRE_RESISTANCE,
        MobEffects.INVISIBILITY,
      ),
    )
    .withOutputComponents(
      PotionContents.new(MobEffects.LONG_SLOWNESS)
        .withHexColor("#339bcf")
        .withEffects(
          MobEffect.new(MobEffects.FIRE_RESISTANCE).withDuration(2000),
        ),
      Rarity.negated(),
      DeathProtection.new().withDeathEffects(
        ConsumeEffect.playSound("??").withRange(12),
        ConsumeEffect.applyEffects()
          .withEffects(MobEffect.new(MobEffects.AWKWARD))
          .withProbability(1),
      ),
    ),
);

PackBuilder.buildDataPack(pack);
