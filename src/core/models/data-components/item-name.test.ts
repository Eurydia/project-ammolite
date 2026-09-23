import { assertEquals } from "@std/assert";
import { TextComponent } from "./common/text.ts";
import { ItemNameComponent } from "./item-name.ts";

Deno.test("item-name components serialize as Minecraft text", () => {
  assertEquals(
    JSON.parse(JSON.stringify(ItemNameComponent.from(
      TextComponent.from({ text: "Swift" }),
    ))),
    { "minecraft:item_name": { type: "text", text: "Swift" } },
  );
  assertEquals(ItemNameComponent.negated(), { "!minecraft:item_name": {} });
});

Deno.test("item-name builder returns a schema value", () => {
  const builder = ItemNameComponent.builder();
  builder.text(TextComponent.builder("Swift").build());
  assertEquals(builder.build(), {
    "minecraft:item_name": { type: "text", text: "Swift" },
  });
  assertEquals(ItemNameComponent.negated(), { "!minecraft:item_name": {} });
});
