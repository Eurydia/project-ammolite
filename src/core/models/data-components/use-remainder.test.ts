import { assertEquals } from "@std/assert";
import { MinecraftItem } from "#/enum/minecraft-item.ts";
import { DataComponent } from "./data-component.ts";
import { Builder$EnchantmentGlintOverrideComponent } from "./enchantment-glint-override.ts";
import { UseRemainderComponent } from "./use-remainder.ts";

Deno.test("use-remainder components serialize as an item stack", () => {
  const glint = new Builder$EnchantmentGlintOverrideComponent();
  glint.glint(false);
  assertEquals(
    UseRemainderComponent.from({
      id: MinecraftItem.GLASS_BOTTLE,
      count: 1,
      components: DataComponent.from(glint.build()),
    }),
    {
      "minecraft:use_remainder": {
        id: "minecraft:glass_bottle",
        count: 1,
        components: { "minecraft:enchantment_glint_override": false },
      },
    },
  );
  assertEquals(UseRemainderComponent.negated(), {
    "!minecraft:use_remainder": {},
  });
});

Deno.test("use-remainder builders expose an item-stack configurator", () => {
  const data = UseRemainderComponent.builder()
    .item(MinecraftItem.GLASS_BOTTLE, (item) => item.count(1))
    .build();

  assertEquals(JSON.parse(JSON.stringify(data)), {
    "minecraft:use_remainder": {
      id: "minecraft:glass_bottle",
      count: 1,
    },
  });
  const disabled = UseRemainderComponent.builder();
  disabled.disabled();
  assertEquals(disabled.build(), { "!minecraft:use_remainder": {} });
});
