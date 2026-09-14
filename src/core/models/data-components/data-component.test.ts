import { assertEquals } from "@std/assert";
import { ItemRarity } from "#/enum/item-rarity.ts";
import { DataComponent } from "./data-component.ts";
import { EnchantmentGlintOverrideComponent } from "./enchantment-glint-override.ts";
import { RarityComponent } from "./rarity.ts";

Deno.test("data-component patches merge keyed component values", () => {
  const patch = DataComponent.from(
    EnchantmentGlintOverrideComponent.from(true),
    RarityComponent.from(ItemRarity.RARE),
  );

  assertEquals(JSON.parse(JSON.stringify(patch)), {
    "minecraft:enchantment_glint_override": true,
    "minecraft:rarity": "rare",
  });
});
