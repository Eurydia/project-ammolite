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
