import { assertEquals } from "@std/assert";
import { TextComponent } from "./common/text.ts";
import { CustomNameComponent } from "./custom-name.ts";

Deno.test("custom-name components serialize as Minecraft text", () => {
  assertEquals(
    JSON.parse(JSON.stringify(CustomNameComponent.from(
      TextComponent.from({ text: "Swift", italic: false }),
    ))),
    { "minecraft:custom_name": { type: "text", text: "Swift", italic: false } },
  );
  assertEquals(CustomNameComponent.negated(), { "!minecraft:custom_name": {} });
});

Deno.test("custom-name builder returns a schema value", () => {
  const builder = CustomNameComponent.builder();
  builder.text(TextComponent.from({ text: "Swift" }));
  assertEquals(builder.build(), {
    "minecraft:custom_name": { type: "text", text: "Swift" },
  });
  assertEquals(CustomNameComponent.negated(), { "!minecraft:custom_name": {} });
});
