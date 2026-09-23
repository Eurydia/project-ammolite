import { assertEquals } from "@std/assert";
import { DataComponent } from "./data-component.ts";
import { Builder$EnchantmentGlintOverrideComponent } from "./enchantment-glint-override.ts";
import { Builder$RarityComponent } from "./rarity.ts";

Deno.test("data-component patches merge keyed component values", () => {
  const glint = new Builder$EnchantmentGlintOverrideComponent();
  glint.glint(true);
  const rarity = new Builder$RarityComponent();
  rarity.rare();
  const patch = DataComponent.from(glint.build(), rarity.build());

  assertEquals(JSON.parse(JSON.stringify(patch)), {
    "minecraft:enchantment_glint_override": true,
    "minecraft:rarity": "rare",
  });
});

Deno.test("data-component builder merges schema values", () => {
  const glint = new Builder$EnchantmentGlintOverrideComponent();
  glint.glint(true);
  const rarity = new Builder$RarityComponent();
  rarity.rare();
  const data = DataComponent.builder().component(glint.build()).component(
    rarity.build(),
  ).build();

  assertEquals(JSON.parse(JSON.stringify(data)), {
    "minecraft:enchantment_glint_override": true,
    "minecraft:rarity": "rare",
  });
});
