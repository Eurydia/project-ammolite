import type { MobEffectComponentType } from "#/models/data-components/common/mob-effect.ts";
import {
  SoundEvent,
  type SoundEventType,
} from "#/models/data-components/common/sound-event.ts";
import {
  NumberBound,
  SNBT_FLOAT_MIN_POSITIVE,
} from "#/models/snbt/number-bound.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

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
  removeEffects(effects: Array<string>): ConsumeEffectType {
    return Object.freeze({
      type: "minecraft:remove_effects",
      effects: Object.freeze([...effects]),
    });
  },
  applyEffects({
    effects,
    probability,
  }: {
    effects: Array<MobEffectComponentType>;
    probability?: number;
  }): ConsumeEffectType {
    return Object.freeze({
      type: "minecraft:apply_effects",
      effects: Object.freeze([...effects]),
      probability: keepUndefinedOrTransform(
        probability,
        (value) => NumberBound.float(value, 0, 1),
      ),
    });
  },
  clearAllEffects(): ConsumeEffectType {
    return Object.freeze({ type: "minecraft:clear_all_effects" });
  },
  teleportRandomly({
    diameter,
    directionalParticles,
  }: {
    diameter?: number;
    directionalParticles?: boolean;
  } = {}): ConsumeEffectType {
    return Object.freeze({
      type: "minecraft:teleport_randomly",
      diameter: keepUndefinedOrTransform(
        diameter,
        (value) => NumberBound.float(value, SNBT_FLOAT_MIN_POSITIVE),
      ),
      directional_particles: directionalParticles,
    });
  },
  playSound({
    soundId,
    range,
  }: {
    soundId: string;
    range?: number;
  }): ConsumeEffectType {
    return Object.freeze({
      type: "minecraft:play_sound",
      sound: SoundEvent.from(soundId, range),
    });
  },
};
