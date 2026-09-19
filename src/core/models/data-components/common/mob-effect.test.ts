import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { MobEffectComponent } from "./mob-effect.ts";

Deno.test("mob effects serialize as Minecraft effect instances", () => {
  assertEquals(
    MobEffectComponent.from({
      id: MobEffects.SPEED,
      duration: 200,
      amplifier: 1,
      visible: true,
      ambient: false,
      showIcon: true,
      showParticles: false,
    }),
    {
      id: "minecraft:speed",
      duration: 200,
      amplifier: 1,
      visible: true,
      ambient: false,
      show_icon: true,
      show_particles: false,
    },
  );
});

Deno.test("mob-effect builders serialize snake-case fields", () => {
  const data = MobEffectComponent.builder(MobEffects.SPEED)
    .duration(200)
    .amplifier(1)
    .visible(true)
    .ambient(false)
    .showIcon(true)
    .showParticles(false)
    .build();

  assertEquals(data.asJsonObject(), {
    id: "minecraft:speed",
    duration: 200,
    amplifier: 1,
    visible: true,
    ambient: false,
    show_icon: true,
    show_particles: false,
  });
});
