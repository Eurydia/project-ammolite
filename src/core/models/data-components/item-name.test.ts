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

Deno.test("item-name builders separate positive and negated variants", () => {
  assertEquals(
    JSON.parse(
      JSON.stringify(
        ItemNameComponent.builder()
          .text(TextComponent.builder("Swift").build())
          .build()
          .asJsonObject(),
      ),
    ),
    { "minecraft:item_name": { type: "text", text: "Swift" } },
  );
  assertEquals(
    ItemNameComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:item_name": {} },
  );
});
