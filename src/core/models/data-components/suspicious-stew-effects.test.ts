import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { SuspiciousStewEffect } from "./common/suspicious-stew-effect.ts";
import { SuspiciousStewEffectsComponent } from "./suspicious-stew-effects.ts";

Deno.test("suspicious-stew effects serialize as Minecraft effect instances", () => {
  assertEquals(
    JSON.parse(JSON.stringify(SuspiciousStewEffectsComponent.from(
      SuspiciousStewEffect.from(MobEffects.NIGHT_VISION, 200),
    ))),
    {
      "minecraft:suspicious_stew_effects": [
        { id: "minecraft:night_vision", duration: 200 },
      ],
    },
  );
  assertEquals(SuspiciousStewEffectsComponent.negated(), {
    "!minecraft:suspicious_stew_effects": {},
  });
});

Deno.test("suspicious-stew effect builders separate positive and negated variants", () => {
  assertEquals(
    SuspiciousStewEffectsComponent.builder()
      .effect(
        SuspiciousStewEffect.builder(MobEffects.NIGHT_VISION).duration(200)
          .build(),
      )
      .build()
      .asJsonObject(),
    {
      "minecraft:suspicious_stew_effects": [
        { id: MobEffects.NIGHT_VISION, duration: 200 },
      ],
    },
  );
  assertEquals(
    SuspiciousStewEffectsComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:suspicious_stew_effects": {} },
  );
});
