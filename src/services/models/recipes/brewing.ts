import z from "zod";
import { MinecraftItem } from "#/services/enums/minecraft-item.enum";
import { PotionContentsPredicate } from "../data_component_predicates/potion_contents_predicate";
import { DataComponents } from "../data_components";

export const BrewingRecipe$OutputItem = z.object({
  item: z.enum(MinecraftItem),
  count: z.number().positive(),
  components: z.array(DataComponents),
});

export const BrewingRecipe$InputItem = z.object({
  item: z.enum(MinecraftItem),
  potionContentsPredicate: PotionContentsPredicate.optional(),
});

export const BrewingRecipe = z.object({
  inputItem: BrewingRecipe$InputItem,
  reagentItem: BrewingRecipe$InputItem,
  outputItem: BrewingRecipe$OutputItem,
});
