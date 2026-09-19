import {
  ConsumeEffectData,
  type ConsumeEffectType,
} from "#/models/data-components/common/consume-effect.ts";
import {
  SoundEventData,
  type SoundEventType,
} from "#/models/data-components/common/sound-event.ts";
import { NumberBound } from "#/models/predicates/common/byte-bound.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";
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
export type ConsumeEffectValue = ConsumeEffectType | ConsumeEffectData;
export type SoundEventValue = SoundEventType | SoundEventData;

export class ConsumableComponentData implements DataPackModel<ConsumableComponentType> {
  public readonly consumeSeconds?: number;
  public readonly animation?: string;
  public readonly sound?: SoundEventValue;
  public readonly hasConsumeParticles?: boolean;
  public readonly onConsumeEffects?: ReadonlyArray<ConsumeEffectValue>;
  public readonly negated: boolean;

  public constructor({
    consumeSeconds,
    animation,
    sound,
    hasConsumeParticles,
    onConsumeEffects,
    negated = false,
  }: {
    consumeSeconds?: number;
    animation?: string;
    sound?: SoundEventValue;
    hasConsumeParticles?: boolean;
    onConsumeEffects?: ReadonlyArray<ConsumeEffectValue>;
    negated?: boolean;
  }) {
    this.consumeSeconds = consumeSeconds;
    this.animation = animation;
    this.sound = sound;
    this.hasConsumeParticles = hasConsumeParticles;
    this.onConsumeEffects =
      onConsumeEffects === undefined
        ? undefined
        : freezeArray(onConsumeEffects);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): ConsumableComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:consumable": Object.freeze({}) })
      : (Object.freeze({
          "minecraft:consumable": Object.freeze({
            consume_seconds: this.consumeSeconds,
            animation: this.animation,
            sound: toDataPackObject(this.sound) as SoundEventType | undefined,
            has_consume_particles: this.hasConsumeParticles,
            on_consume_effects:
              this.onConsumeEffects === undefined
                ? undefined
                : Object.freeze(
                    this.onConsumeEffects.map(
                      (effect) => toDataPackObject(effect) as ConsumeEffectType,
                    ),
                  ),
          }),
        }) as ConsumableComponentType);
  }
}

export interface ConsumableComponentBuilderConfigurator {
  consumeSeconds(value: number): ConsumableComponentBuilderConfigurator;
  animation(value: string): ConsumableComponentBuilderConfigurator;
  sound(value: SoundEventValue): ConsumableComponentBuilderConfigurator;
  consumeEffect(
    value: ConsumeEffectValue,
  ): ConsumableComponentBuilderConfigurator;
  consumeParticles(value?: boolean): ConsumableComponentBuilderConfigurator;
  negated(): NegatedConsumableComponentBuilderConfigurator;
}

export interface NegatedConsumableComponentBuilderConfigurator {
  build(): Readonly<ConsumableComponentData>;
}

export class ConsumableComponentBuilder implements ConsumableComponentBuilderConfigurator {
  private consumeSecondsValue?: number;
  private animationValue?: string;
  private soundValue?: SoundEventValue;
  private consumeParticlesValue?: boolean;
  private readonly effectValues: Array<ConsumeEffectValue> = [];

  public consumeSeconds(value: number): this {
    this.consumeSecondsValue = NumberBound.float(value, 0);
    return this;
  }

  public animation(value: string): this {
    this.animationValue = value;
    return this;
  }

  public sound(value: SoundEventValue): this {
    this.soundValue = value;
    return this;
  }

  public consumeEffect(value: ConsumeEffectValue): this {
    this.effectValues.push(value);
    return this;
  }

  public consumeParticles(value = true): this {
    this.consumeParticlesValue = value;
    return this;
  }

  public negated(): NegatedConsumableComponentBuilderConfigurator {
    return new NegatedConsumableComponentBuilder();
  }

  public build(): Readonly<ConsumableComponentData> {
    return freezeDataClass(
      new ConsumableComponentData({
        consumeSeconds: this.consumeSecondsValue,
        animation: this.animationValue,
        sound: this.soundValue,
        hasConsumeParticles: this.consumeParticlesValue,
        onConsumeEffects: this.effectValues,
      }),
    );
  }
}

export class NegatedConsumableComponentBuilder implements NegatedConsumableComponentBuilderConfigurator {
  public build(): Readonly<ConsumableComponentData> {
    return freezeDataClass(new ConsumableComponentData({ negated: true }));
  }
}

export const ConsumableComponent = {
  builder(): ConsumableComponentBuilder {
    return new ConsumableComponentBuilder();
  },
  negatedBuilder(): NegatedConsumableComponentBuilder {
    return new NegatedConsumableComponentBuilder();
  },
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
