import type { ConsumeEffectType } from "#/models/data-components/common/consume-effect.ts";
import type { SoundEventType } from "#/models/data-components/common/sound-event.ts";
import { NumberBound } from "#/models/snbt/number-bound.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

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
    animation?: string;
    sound?: SoundEventType;
    hasConsumeParticles?: boolean;
    onConsumeEffects?: Array<ConsumeEffectType>;
  }): ConsumableComponentType {
    return Object.freeze({
      "minecraft:consumable": Object.freeze({
        consume_seconds: keepUndefinedOrTransform(consumeSeconds, (value) =>
          NumberBound.float(value, 0),
        ),
        animation,
        sound,
        has_consume_particles: hasConsumeParticles,
        on_consume_effects: keepUndefinedOrTransform(
          onConsumeEffects,
          (value) => Object.freeze([...value]),
        ),
      }),
    });
  },
  negated(): ConsumableComponentType {
    return Object.freeze({ "!minecraft:consumable": Object.freeze({}) });
  },
};
