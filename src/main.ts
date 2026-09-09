import { BrewingRecipe } from "./core/data/recipe/brewing.ts";
import { DataPack } from "#/models/data_pack.ts";
import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { PackBuilder } from "./pack-builder/builder.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";
import {
  MobEffect,
  PotionContents,
} from "#/models/data-components/potion-contents.ts";

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
      PotionContentsPredicate.new().wherePotions(
        MobEffects.FIRE_RESISTANCE,
        MobEffects.INVISIBILITY,
      ),
    )
    .withOutputAmount(2)
    .withOutputComponents(
      PotionContents.new(MobEffects.LONG_SLOWNESS)
        .withHexColor("#339bcf")
        .withEffects(
          MobEffect.new(MobEffects.FIRE_RESISTANCE).withDuration(2000),
        ),
    ),
);

PackBuilder.buildDataPack(pack);
