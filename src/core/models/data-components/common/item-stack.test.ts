import { assertEquals } from "@std/assert";
import { MinecraftItem } from "#/enum/minecraft-item.ts";
import { DataComponent } from "../data-component.ts";
import { EnchantmentGlintOverrideComponent } from "../enchantment-glint-override.ts";
import { ItemStack } from "./item-stack.ts";

Deno.test("item stacks serialize with id, count, and components", () => {
  const itemStack = ItemStack.__from({
    id: MinecraftItem.POTION,
    count: 2,
    components: DataComponent.from(
      EnchantmentGlintOverrideComponent.from(true),
    ),
  });

  assertEquals(itemStack, {
    id: "minecraft:potion",
    count: 2,
    components: { "minecraft:enchantment_glint_override": true },
  });
});

Deno.test("item-stack builders convert data components", () => {
  const data = ItemStack.builder(MinecraftItem.POTION)
    .count(2)
    .components(
      EnchantmentGlintOverrideComponent.builder().glint(true).build(),
    )
    .build();

  assertEquals(data.asJsonObject(), {
    id: "minecraft:potion",
    count: 2,
    components: { "minecraft:enchantment_glint_override": true },
  });
});
