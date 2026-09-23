import { assertEquals } from "@std/assert";
import { TextComponent } from "./common/text.ts";
import { LoreComponent } from "./lore.ts";

Deno.test("lore components serialize as a list of Minecraft text", () => {
  assertEquals(
    JSON.parse(JSON.stringify(LoreComponent.from(
      TextComponent.from({ text: "Brewed" }),
    ))),
    { "minecraft:lore": [{ type: "text", text: "Brewed" }] },
  );
  assertEquals(LoreComponent.negated(), { "!minecraft:lore": {} });
});

Deno.test("lore builder returns a schema value", () => {
  const builder = LoreComponent.builder();
  builder.lines((lines) => lines.line(TextComponent.builder("Brewed").build()));
  assertEquals(builder.build(), {
    "minecraft:lore": [{ type: "text", text: "Brewed" }],
  });
  const disabled = LoreComponent.builder();
  disabled.disabled();
  assertEquals(disabled.build(), { "!minecraft:lore": {} });
});
