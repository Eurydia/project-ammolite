import { assertEquals } from "@std/assert";
import { TextComponent } from "./text.ts";

Deno.test("text components serialize as Minecraft text components", () => {
  const text = TextComponent.from({
    text: "Lingering",
    color: "blue",
    italic: false,
    extra: [TextComponent.from({ text: " Potion", bold: true })],
  });

  assertEquals(JSON.parse(JSON.stringify(text)), {
    type: "text",
    text: "Lingering",
    color: "blue",
    italic: false,
    extra: [{ type: "text", text: " Potion", bold: true }],
  });
});
