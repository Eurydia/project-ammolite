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

Deno.test("text builders convert nested text components", () => {
  const data = TextComponent.builder("Swift")
    .color("blue")
    .extra(TextComponent.builder(" Potion").bold().build())
    .build();

  assertEquals(JSON.parse(JSON.stringify(data.asJsonObject())), {
    type: "text",
    text: "Swift",
    color: "blue",
    extra: [{ type: "text", text: " Potion", bold: true }],
  });
});
