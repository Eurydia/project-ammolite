import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { SuspiciousStewEffect } from "./suspicious-stew-effect.ts";

Deno.test("suspicious-stew effects serialize as Minecraft effect instances", () => {
  assertEquals(
    JSON.parse(JSON.stringify(SuspiciousStewEffect.from(
      MobEffects.NIGHT_VISION,
      200,
    ))),
    { id: "minecraft:night_vision", duration: 200 },
  );
});

Deno.test("suspicious-stew effect builders convert duration data", () => {
  const data = SuspiciousStewEffect.builder(MobEffects.NIGHT_VISION)
    .duration(200)
    .build();

  assertEquals(data.asJsonObject(), {
    id: MobEffects.NIGHT_VISION,
    duration: 200,
  });
});
