import type { MobEffectComponentType } from "#/models/data-components/common/mob-effect.ts";
import {
  SoundEvent,
  type SoundEventType,
} from "#/models/data-components/common/sound-event.ts";

export type ConsumeEffectType = Readonly<
  | {
    type: "minecraft:remove_effects";
    effects: ReadonlyArray<string>;
  }
  | {
    type: "minecraft:apply_effects";
    effects: ReadonlyArray<MobEffectComponentType>;
    probability?: number;
  }
  | { type: "minecraft:clear_all_effects" }
  | {
    type: "minecraft:teleport_randomly";
    diameter?: number;
    directional_particles?: boolean;
  }
  | {
    type: "minecraft:play_sound";
    sound: SoundEventType;
  }
>;

export const ConsumeEffect = {
  removeEffects(effects: ReadonlyArray<string>): ConsumeEffectType {
    return { type: "minecraft:remove_effects", effects };
  },
  applyEffects({
    effects,
    probability,
  }: {
    effects: ReadonlyArray<MobEffectComponentType>;
    probability?: number;
  }): ConsumeEffectType {
    return { type: "minecraft:apply_effects", effects, probability };
  },
  clearAllEffects(): ConsumeEffectType {
    return { type: "minecraft:clear_all_effects" };
  },
  teleportRandomly({
    diameter,
    directionalParticles,
  }: {
    diameter?: number;
    directionalParticles?: boolean;
  } = {}): ConsumeEffectType {
    return {
      type: "minecraft:teleport_randomly",
      diameter,
      directional_particles: directionalParticles,
    };
  },
  playSound({
    soundId,
    range,
  }: {
    soundId: string;
    range?: number;
  }): ConsumeEffectType {
    return {
      type: "minecraft:play_sound",
      sound: SoundEvent.from({ soundId, range }),
    };
  },
};
