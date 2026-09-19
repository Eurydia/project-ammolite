import { assertEquals } from "@std/assert";
import { ItemRarity } from "#/enum/item-rarity.ts";
import { RarityComponent } from "./rarity.ts";

Deno.test("rarity components serialize as a Minecraft rarity", () => {
  assertEquals(
    JSON.parse(JSON.stringify(RarityComponent.from(ItemRarity.RARE))),
    { "minecraft:rarity": "rare" },
  );
  assertEquals(RarityComponent.negated(), { "!minecraft:rarity": {} });
});

Deno.test("rarity builders separate positive and negated variants", () => {
  assertEquals(
    RarityComponent.builder()
      .rarity(ItemRarity.RARE)
      .build()
      .asJsonObject(),
    { "minecraft:rarity": ItemRarity.RARE },
  );
  assertEquals(
    RarityComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:rarity": {} },
  );
});
