import { assertEquals } from "@std/assert";
import { ConsumeEffect } from "./common/consume-effect.ts";
import { DeathProtectionComponent } from "./death-protection.ts";

Deno.test("death-protection components serialize their effect list", () => {
  assertEquals(
    DeathProtectionComponent.from(ConsumeEffect.clearAllEffects()),
    {
      "minecraft:death_protection": {
        death_effects: [{ type: "minecraft:clear_all_effects" }],
      },
    },
  );
  assertEquals(DeathProtectionComponent.negated(), {
    "!minecraft:death_protection": {},
  });
});

Deno.test("death-protection builder returns a schema value", () => {
  const builder = DeathProtectionComponent.builder();
  builder.effects((effects) => effects.effect(ConsumeEffect.clearAllEffects()));
  assertEquals(builder.build(), {
    "minecraft:death_protection": {
      death_effects: [{ type: "minecraft:clear_all_effects" }],
    },
  });
  assertEquals(DeathProtectionComponent.negated(), {
    "!minecraft:death_protection": {},
  });
});
