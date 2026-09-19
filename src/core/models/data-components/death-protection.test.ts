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

Deno.test("death-protection builders separate positive and negated variants", () => {
  assertEquals(
    DeathProtectionComponent.builder()
      .deathEffect(ConsumeEffect.builder().clearAllEffects().build())
      .build()
      .asJsonObject(),
    {
      "minecraft:death_protection": {
        death_effects: [{ type: "minecraft:clear_all_effects" }],
      },
    },
  );
  assertEquals(
    DeathProtectionComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:death_protection": {} },
  );
});
