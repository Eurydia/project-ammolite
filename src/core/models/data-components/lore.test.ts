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

Deno.test("lore builders separate positive and negated variants", () => {
  assertEquals(
    JSON.parse(
      JSON.stringify(
        LoreComponent.builder()
          .line(TextComponent.builder("Brewed").build())
          .build()
          .asJsonObject(),
      ),
    ),
    { "minecraft:lore": [{ type: "text", text: "Brewed" }] },
  );
  assertEquals(
    LoreComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:lore": {} },
  );
});
