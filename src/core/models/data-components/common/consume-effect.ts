import z from "zod";
import { Schema$MobEffectComponent } from "#/models/data-components/common/mob-effect.ts";
import {
  Schema$SoundEventComponent,
  type Type$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";

export const Schema$ConsumeEffect = z.compile(
  z.discriminatedUnion("type", [
    z
      .object({
        type: z.literal("minecraft:remove_effects"),
        effects: z.string().array().readonly(),
      })
      .readonly(),
    z
      .object({
        type: z.literal("minecraft:apply_effects"),
        effects: Schema$MobEffectComponent.array().readonly(),
        probability: z.float32().min(0).max(1).optional(),
      })
      .readonly(),
    z.object({ type: z.literal("minecraft:clear_all_effects") }).readonly(),
    z
      .object({
        type: z.literal("minecraft:teleport_randomly"),
        diameter: z.float32().min(1.401298464324817e-45).optional(),
        directional_particles: z.boolean().optional(),
      })
      .readonly(),
    z
      .object({
        type: z.literal("minecraft:play_sound"),
        sound: Schema$SoundEventComponent,
      })
      .readonly(),
  ]),
);
export type Type$ConsumeEffect = z.output<typeof Schema$ConsumeEffect>;

export class Builder$ConsumeEffect {
  private value?: Type$ConsumeEffect;

  removeEffects(...effects: string[]) {
    this.value = { type: "minecraft:remove_effects", effects };
    return this;
  }

  applyEffects(effects: MobEffectComponentType[], probability?: number) {
    this.value = { type: "minecraft:apply_effects", effects, probability };
    return this;
  }
  clearAllEffects() {
    this.value = { type: "minecraft:clear_all_effects" };
    return this;
  }
  teleportRandomly(diameter?: number, directionalParticles?: boolean) {
    this.value = {
      type: "minecraft:teleport_randomly",
      diameter,
      directional_particles: directionalParticles,
    };
    return this;
  }
  playSound(sound: Type$SoundEventComponent) {
    this.value = { type: "minecraft:play_sound", sound };
    return this;
  }
  build() {
    return Schema$ConsumeEffect.parse(this.value);
  }
}
