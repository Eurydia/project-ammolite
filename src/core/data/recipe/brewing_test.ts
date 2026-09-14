import { assertEquals } from "@std/assert";
import { MinecraftItem } from "#/enum/minecraft-item.ts";
import { DataComponent } from "#/models/data-components/data-component.ts";
import { EnchantmentGlintOverrideComponent } from "#/models/data-components/enchantment-glint-override.ts";
import { BrewingRecipe } from "./brewing.ts";

Deno.test("brewing output uses the common item stack factory", () => {
  const output = {
    id: MinecraftItem.POTION,
    count: 2,
    components: DataComponent.from(
      EnchantmentGlintOverrideComponent.from(true),
    ),
  };
  const recipe = BrewingRecipe.from(
    { item: MinecraftItem.POTION },
    { item: MinecraftItem.NETHER_WART },
    output,
  );

  assertEquals(JSON.parse(JSON.stringify(recipe)), {
    type: "minecraft:brewing",
    input: { item: "minecraft:potion" },
    reagent: { item: "minecraft:nether_wart" },
    output: {
      id: "minecraft:potion",
      count: 2,
      components: { "minecraft:enchantment_glint_override": true },
    },
  });
  assertEquals(recipe.output, output);
  assertEquals(Object.isFrozen(output), false);
});
