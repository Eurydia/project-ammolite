import { assertEquals } from "@std/assert";
import { ConsumeEffect } from "./common/consume-effect.ts";
import { SoundEvent } from "./common/sound-event.ts";
import { ConsumableComponent } from "./consumable.ts";
import { ConsumeAnimations } from "#/enum/consume-animations.ts";

Deno.test("consumable components serialize with Minecraft field names", () => {
  assertEquals(
    JSON.parse(
      JSON.stringify(
        ConsumableComponent.from({
          consumeSeconds: 1.6,
          animation: ConsumeAnimations.DRINK,
          sound: SoundEvent.from("minecraft:entity.generic.drink", 16),
          hasConsumeParticles: false,
          onConsumeEffects: [ConsumeEffect.clearAllEffects()],
        }),
      ),
    ),
    {
      "minecraft:consumable": {
        consume_seconds: 1.6,
        animation: "drink",
        sound: { sound_id: "minecraft:entity.generic.drink", range: 16 },
        has_consume_particles: false,
        on_consume_effects: [{ type: "minecraft:clear_all_effects" }],
      },
    },
  );
  assertEquals(ConsumableComponent.negated(), { "!minecraft:consumable": {} });
});
