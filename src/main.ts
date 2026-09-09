import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { PotionContents } from "#/models/predicates/potion-contents.ts";
import { MobEffect } from "#/enum/mob-effects.ts";

const pack = new DataPack("TEST");
pack.addNamespace("EURYDIA_POTIONS");
pack.addBrewingRecipe(
  "EURYDIA_POTIONS",
  BrewingRecipe.new(
    MinecraftItem.NETHER_WART_BLOCK,
    MinecraftItem.POTENT_SULFUR,
    MinecraftItem.POTION,
  )
    .withRecipeName("HI")
    .whereInputPredicate(
      PotionContents.new().wherePotions(
        MobEffect.FIRE_RESISTANCE,
        MobEffect.INVISIBILITY,
      ),
    )
    .withOutputAmount(2),
);

PackBuilder.buildDataPack(pack);
