import {
  MobEffectComponentData,
  type MobEffectComponentType,
} from "#/models/data-components/common/mob-effect.ts";
import {
  SoundEvent,
  SoundEventData,
  type Type$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";
import {
  NumberBound,
  SNBT_FLOAT_MIN_POSITIVE,
} from "#/models/predicates/common/byte-bound.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

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
      sound: Type$SoundEventComponent;
    }
>;
export type MobEffectComponentValue =
  | MobEffectComponentType
  | MobEffectComponentData;
export type SoundEventValue = Type$SoundEventComponent | SoundEventData;

export class ConsumeEffectData implements DataPackModel<ConsumeEffectType> {
  public readonly type: ConsumeEffectType["type"];
  public readonly effects?: ReadonlyArray<string | MobEffectComponentValue>;
  public readonly probability?: number;
  public readonly diameter?: number;
  public readonly directionalParticles?: boolean;
  public readonly sound?: SoundEventValue;

  public constructor({
    type,
    effects,
    probability,
    diameter,
    directionalParticles,
    sound,
  }: {
    type: ConsumeEffectType["type"];
    effects?: ReadonlyArray<string | MobEffectComponentValue>;
    probability?: number;
    diameter?: number;
    directionalParticles?: boolean;
    sound?: SoundEventValue;
  }) {
    this.type = type;
    this.effects = effects === undefined ? undefined : freezeArray(effects);
    this.probability = probability;
    this.diameter = diameter;
    this.directionalParticles = directionalParticles;
    this.sound = sound;
    freezeDataClass(this);
  }

  public asJsonObject(): ConsumeEffectType {
    switch (this.type) {
      case "minecraft:remove_effects":
        return Object.freeze({
          type: this.type,
          effects: Object.freeze(
            (this.effects ?? []).map((effect) => String(effect)),
          ),
        });
      case "minecraft:apply_effects":
        return Object.freeze({
          type: this.type,
          effects: Object.freeze(
            (this.effects ?? []).map(
              (effect) => toDataPackObject(effect) as MobEffectComponentType,
            ),
          ),
          probability: this.probability,
        });
      case "minecraft:clear_all_effects":
        return Object.freeze({ type: this.type });
      case "minecraft:teleport_randomly":
        return Object.freeze({
          type: this.type,
          diameter: this.diameter,
          directional_particles: this.directionalParticles,
        });
      case "minecraft:play_sound":
        return Object.freeze({
          type: this.type,
          sound: toDataPackObject(this.sound) as Type$SoundEventComponent,
        });
    }
  }
}

export interface ConsumeEffectBuilderConfigurator {
  removeEffects(...effects: Array<string>): ConsumeEffectBuilderConfigurator;
  applyEffects(
    effects: Array<MobEffectComponentValue>,
    probability?: number,
  ): ConsumeEffectBuilderConfigurator;
  clearAllEffects(): ConsumeEffectBuilderConfigurator;
  teleportRandomly(
    diameter?: number,
    directionalParticles?: boolean,
  ): ConsumeEffectBuilderConfigurator;
  playSound(sound: SoundEventValue): ConsumeEffectBuilderConfigurator;
}

export class ConsumeEffectBuilder implements ConsumeEffectBuilderConfigurator {
  private value?: ConsumeEffectData;

  public removeEffects(...effects: Array<string>): this {
    this.value = new ConsumeEffectData({
      type: "minecraft:remove_effects",
      effects,
    });
    return this;
  }

  public applyEffects(
    effects: Array<MobEffectComponentValue>,
    probability?: number,
  ): this {
    this.value = new ConsumeEffectData({
      type: "minecraft:apply_effects",
      effects,
      probability:
        probability === undefined
          ? undefined
          : NumberBound.float(probability, 0, 1),
    });
    return this;
  }

  public clearAllEffects(): this {
    this.value = new ConsumeEffectData({
      type: "minecraft:clear_all_effects",
    });
    return this;
  }

  public teleportRandomly(
    diameter?: number,
    directionalParticles?: boolean,
  ): this {
    this.value = new ConsumeEffectData({
      type: "minecraft:teleport_randomly",
      diameter:
        diameter === undefined
          ? undefined
          : NumberBound.float(diameter, SNBT_FLOAT_MIN_POSITIVE),
      directionalParticles,
    });
    return this;
  }

  public playSound(sound: SoundEventValue): this {
    this.value = new ConsumeEffectData({
      type: "minecraft:play_sound",
      sound,
    });
    return this;
  }

  public build(): Readonly<ConsumeEffectData> {
    if (this.value === undefined) {
      throw new Error("A consume effect variant must be configured.");
    }
    return freezeDataClass(this.value);
  }
}

export const ConsumeEffect = {
  builder(): ConsumeEffectBuilder {
    return new ConsumeEffectBuilder();
  },
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
      probability: keepUndefinedOrTransform(probability, (value) =>
        NumberBound.float(value, 0, 1),
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
      diameter: keepUndefinedOrTransform(diameter, (value) =>
        NumberBound.float(value, SNBT_FLOAT_MIN_POSITIVE),
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
