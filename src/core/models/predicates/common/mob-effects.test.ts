import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { MobEffectPredicate } from "./mob-effect.ts";

Deno.test("mob-effect predicates serialize in Minecraft predicate format", () => {
  assertEquals(
    MobEffectPredicate.from({
      effect: MobEffects.SPEED,
      amplifier: { min: 1, max: 2 },
      duration: 200,
      ambient: false,
      visible: true,
    }),
    {
      effect: "minecraft:speed",
      amplifier: { min: 1, max: 2 },
      duration: 200,
      ambient: false,
      visible: true,
    },
  );
});
