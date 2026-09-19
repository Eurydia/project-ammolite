import { assertEquals } from "@std/assert";
import { MinecraftItem } from "#/enum/minecraft-item.ts";
import { DataComponent } from "./data-component.ts";
import { EnchantmentGlintOverrideComponent } from "./enchantment-glint-override.ts";
import { UseRemainderComponent } from "./use-remainder.ts";

Deno.test("use-remainder components serialize as an item stack", () => {
  assertEquals(
    UseRemainderComponent.from({
      id: MinecraftItem.GLASS_BOTTLE,
      count: 1,
      components: DataComponent.from(
        EnchantmentGlintOverrideComponent.from(false),
      ),
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

  assertEquals(JSON.parse(JSON.stringify(data.asJsonObject())), {
    "minecraft:use_remainder": {
      id: "minecraft:glass_bottle",
      count: 1,
    },
  });
  assertEquals(
    UseRemainderComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:use_remainder": {} },
  );
});
