import { MinecraftItem } from "#/services/enums/minecraft-item.enum";
import z from "zod";
import { DataComponents } from "../data_components";
import { PotionContentsPredicate } from "../data_component_predicates/potion_contents_predicate";

export const BrewingRecipe$OutputItem = z.object({
  item: z.enum(MinecraftItem),
  count: z.number().positive(),
  components: z.array(DataComponents),
});

export const BrewingRecipe$InputItem = z.object({
  item: z.enum(MinecraftItem),
  potionContentsPredicate: PotionContentsPredicate,
});

export const BrewingRecipe = z.object({
  inputItem: BrewingRecipe$InputItem,
  reagentItem: BrewingRecipe$InputItem,
  outputItem: BrewingRecipe$OutputItem,
});
