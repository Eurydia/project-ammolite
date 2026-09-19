import { assertEquals } from "@std/assert";
import { DamageResistantComponent } from "./damage-resistant.ts";

Deno.test("damage-resistant components serialize their tag list", () => {
  assertEquals(
    DamageResistantComponent.from("minecraft:is_fire"),
    { "minecraft:damage_resistant": { types: ["minecraft:is_fire"] } },
  );
  assertEquals(DamageResistantComponent.negated(), {
    "!minecraft:damage_resistant": {},
  });
});

Deno.test("damage-resistant builders separate positive and negated variants", () => {
  assertEquals(
    DamageResistantComponent.builder()
      .type("minecraft:is_fire")
      .build()
      .asJsonObject(),
    { "minecraft:damage_resistant": { types: ["minecraft:is_fire"] } },
  );
  assertEquals(
    DamageResistantComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:damage_resistant": {} },
  );
});
