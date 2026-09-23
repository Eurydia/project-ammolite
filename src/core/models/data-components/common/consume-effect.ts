import z from "zod";
import type { MobEffectComponentType } from "#/models/data-components/common/mob-effect.ts";
import { Schema$MobEffectComponent } from "#/models/data-components/common/mob-effect.ts";
import {
  Schema$SoundEventComponent,
  SoundEvent,
  type Type$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";

export const Schema$ConsumeEffect = z.compile(z.discriminatedUnion("type", [
  z.object({
    type: z.literal("minecraft:remove_effects"),
    effects: z.string().array().readonly(),
  }).readonly(),
  z.object({
    type: z.literal("minecraft:apply_effects"),
    effects: Schema$MobEffectComponent.array().readonly(),
    probability: z.float32().min(0).max(1).optional(),
  }).readonly(),
  z.object({ type: z.literal("minecraft:clear_all_effects") }).readonly(),
  z.object({
    type: z.literal("minecraft:teleport_randomly"),
    diameter: z.float32().min(1.401298464324817e-45).optional(),
    directional_particles: z.boolean().optional(),
  }).readonly(),
  z.object({
    type: z.literal("minecraft:play_sound"),
    sound: Schema$SoundEventComponent,
  }).readonly(),
]));
export type ConsumeEffectType = z.output<typeof Schema$ConsumeEffect>;
export type Type$ConsumeEffect = ConsumeEffectType;
export type MobEffectComponentValue = MobEffectComponentType;
export type SoundEventValue = Type$SoundEventComponent;

export class Builder$ConsumeEffect {
  private value?: ConsumeEffectType;
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

export const ConsumeEffect = {
  builder: () => new Builder$ConsumeEffect(),
  removeEffects: (...effects: string[]) =>
    Schema$ConsumeEffect.parse({ type: "minecraft:remove_effects", effects }),
  applyEffects: (
    { effects, probability }: {
      effects: MobEffectComponentType[];
      probability?: number;
    },
  ) =>
    Schema$ConsumeEffect.parse({
      type: "minecraft:apply_effects",
      effects,
      probability,
    }),
  clearAllEffects: () =>
    Schema$ConsumeEffect.parse({ type: "minecraft:clear_all_effects" }),
  teleportRandomly: (
    { diameter, directionalParticles }: {
      diameter?: number;
      directionalParticles?: boolean;
    } = {},
  ) =>
    Schema$ConsumeEffect.parse({
      type: "minecraft:teleport_randomly",
      diameter,
      directional_particles: directionalParticles,
    }),
  playSound: ({ soundId, range }: { soundId: string; range?: number }) =>
    Schema$ConsumeEffect.parse({
      type: "minecraft:play_sound",
      sound: SoundEvent.from(soundId, range),
    }),
};
