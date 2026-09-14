import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { ConsumeEffect } from "./consume-effect.ts";
import { MobEffectComponent } from "./mob-effect.ts";

Deno.test("consume effects serialize with Minecraft effect discriminators", () => {
  const effects = [
    ConsumeEffect.removeEffects([MobEffects.POISON]),
    ConsumeEffect.applyEffects({
      effects: [
        MobEffectComponent.from({ id: MobEffects.SPEED, duration: 200 }),
      ],
      probability: 0.5,
    }),
    ConsumeEffect.clearAllEffects(),
    ConsumeEffect.teleportRandomly({
      diameter: 8,
      directionalParticles: true,
    }),
    ConsumeEffect.playSound({
      soundId: "minecraft:entity.generic.drink",
      range: 16,
    }),
  ];

  assertEquals(JSON.parse(JSON.stringify(effects)), [
    { type: "minecraft:remove_effects", effects: ["minecraft:poison"] },
    {
      type: "minecraft:apply_effects",
      effects: [{ id: "minecraft:speed", duration: 200 }],
      probability: 0.5,
    },
    { type: "minecraft:clear_all_effects" },
    {
      type: "minecraft:teleport_randomly",
      diameter: 8,
      directional_particles: true,
    },
    {
      type: "minecraft:play_sound",
      sound: { sound_id: "minecraft:entity.generic.drink", range: 16 },
    },
  ]);
});
