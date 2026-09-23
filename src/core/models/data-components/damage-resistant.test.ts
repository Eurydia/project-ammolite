import { assertEquals } from "@std/assert";
import {
  Builder$DamageResistantComponent,
  DamageResistantComponent,
} from "./damage-resistant.ts";

Deno.test("damage-resistant components serialize their tag list", () => {
  assertEquals(
    DamageResistantComponent.from("minecraft:is_fire"),
    { "minecraft:damage_resistant": { types: ["minecraft:is_fire"] } },
  );
  assertEquals(DamageResistantComponent.negated(), {
    "!minecraft:damage_resistant": {},
  });
});

Deno.test("damage-resistant builder returns a schema value", () => {
  const builder = new Builder$DamageResistantComponent();
  builder.types((types) => types.type("minecraft:is_fire"));
  assertEquals(builder.build(), {
    "minecraft:damage_resistant": { types: ["minecraft:is_fire"] },
  });
  assertEquals(DamageResistantComponent.negated(), {
    "!minecraft:damage_resistant": {},
  });
});
