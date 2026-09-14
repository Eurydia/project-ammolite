import type { ConsumeEffectType } from "#/models/data-components/common/consume-effect.ts";
import type { SoundEventType } from "#/models/data-components/common/sound-event.ts";

export enum ConsumeAnimations {
  NONE = "none",
  EAT = "eat",
  DRINK = "drink",
  BLOCK = "block",
  BOW = "bow",
  SPEAR = "spear",
  CROSSBOW = "crossbow",
  SPYGLASS = "spyglass",
  TOOT_HORN = "toot_horn",
  BRUSH = "brush",
  BUNDLE = "bundle",
  TRIDENT = "trident",
}

export type ConsumableComponentType = Readonly<
  | { "!minecraft:consumable": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:consumable": Readonly<{
      consume_seconds?: number;
      animation?: string;
      sound?: SoundEventType;
      has_consume_particles?: boolean;
      on_consume_effects?: ReadonlyArray<ConsumeEffectType>;
    }>;
  }
>;

export const ConsumableComponent = {
  from({
    consumeSeconds,
    animation,
    sound,
    hasConsumeParticles,
    onConsumeEffects,
  }: {
    consumeSeconds?: number;
    animation?: string | ConsumeAnimations;
    sound?: SoundEventType;
    hasConsumeParticles?: boolean;
    onConsumeEffects?: ReadonlyArray<ConsumeEffectType>;
  }): ConsumableComponentType {
    return {
      "minecraft:consumable": {
        consume_seconds: consumeSeconds,
        animation,
        sound,
        has_consume_particles: hasConsumeParticles,
        on_consume_effects: onConsumeEffects,
      },
    };
  },
  negated(): ConsumableComponentType {
    return { "!minecraft:consumable": {} };
  },
};
