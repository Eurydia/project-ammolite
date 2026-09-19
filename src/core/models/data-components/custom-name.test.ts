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

Deno.test("custom-name negated builders expose only build", () => {
  const builder = CustomNameComponent.builder().negated();
  if (false) {
    // @ts-expect-error A negated component cannot be configured as positive.
    builder.text(TextComponent.from({ text: "invalid" }));
  }

  assertEquals(builder.build().asJsonObject(), {
    "!minecraft:custom_name": {},
  });
  assertEquals(CustomNameComponent.negatedBuilder().build().asJsonObject(), {
    "!minecraft:custom_name": {},
  });
});
