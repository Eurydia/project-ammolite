import { MinecraftItem } from "#/enum/minecraft-item.enum.ts";
import { BrewingRecipe } from "./brewing.ts";

Deno.test("can create brewing recipe", () => {
  BrewingRecipe.new(MinecraftItem.ACACIA_BOAT, MinecraftItem.BLAZE_POWDER);
});
