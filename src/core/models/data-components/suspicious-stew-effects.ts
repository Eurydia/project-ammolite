import {
  SuspiciousStewEffectData,
  type SuspiciousStewEffectType,
} from "#/models/data-components/common/suspicious-stew-effect.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type SuspiciousStewEffectsComponentType = Readonly<
  | {
    "!minecraft:suspicious_stew_effects": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | {
    "minecraft:suspicious_stew_effects": ReadonlyArray<
      SuspiciousStewEffectType
    >;
  }
>;
export type SuspiciousStewEffectValue =
  | SuspiciousStewEffectType
  | SuspiciousStewEffectData;

export class SuspiciousStewEffectsComponentData
  implements DataPackModel<SuspiciousStewEffectsComponentType> {
  public readonly effects: ReadonlyArray<SuspiciousStewEffectValue>;
  public readonly negated: boolean;

  public constructor(
    effects: ReadonlyArray<SuspiciousStewEffectValue>,
    negated = false,
  ) {
    this.effects = freezeArray(effects);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): SuspiciousStewEffectsComponentType {
    return this.negated
      ? Object.freeze({
        "!minecraft:suspicious_stew_effects": Object.freeze({}),
      })
      : Object.freeze({
        "minecraft:suspicious_stew_effects": Object.freeze(
          this.effects.map((effect) => toDataPackObject(effect)),
        ),
      });
  }
}

export interface SuspiciousStewEffectsComponentBuilderConfigurator {
  effect(
    value: SuspiciousStewEffectValue,
  ): SuspiciousStewEffectsComponentBuilderConfigurator;
  negated(): NegatedSuspiciousStewEffectsComponentBuilderConfigurator;
}

export interface NegatedSuspiciousStewEffectsComponentBuilderConfigurator {
  build(): Readonly<SuspiciousStewEffectsComponentData>;
}

export class SuspiciousStewEffectsComponentBuilder
  implements SuspiciousStewEffectsComponentBuilderConfigurator {
  private readonly effectValues: Array<SuspiciousStewEffectValue> = [];

  public effect(value: SuspiciousStewEffectValue): this {
    this.effectValues.push(value);
    return this;
  }

  public negated(): NegatedSuspiciousStewEffectsComponentBuilderConfigurator {
    return new NegatedSuspiciousStewEffectsComponentBuilder();
  }

  public build(): Readonly<SuspiciousStewEffectsComponentData> {
    return freezeDataClass(
      new SuspiciousStewEffectsComponentData(this.effectValues),
    );
  }
}

export class NegatedSuspiciousStewEffectsComponentBuilder
  implements NegatedSuspiciousStewEffectsComponentBuilderConfigurator {
  public build(): Readonly<SuspiciousStewEffectsComponentData> {
    return freezeDataClass(
      new SuspiciousStewEffectsComponentData([], true),
    );
  }
}

export const SuspiciousStewEffectsComponent = {
  builder(): SuspiciousStewEffectsComponentBuilder {
    return new SuspiciousStewEffectsComponentBuilder();
  },
  negatedBuilder(): NegatedSuspiciousStewEffectsComponentBuilder {
    return new NegatedSuspiciousStewEffectsComponentBuilder();
  },
  from(
    ...effects: Array<SuspiciousStewEffectType>
  ): SuspiciousStewEffectsComponentType {
    return Object.freeze({
      "minecraft:suspicious_stew_effects": Object.freeze([...effects]),
    });
  },
  negated(): SuspiciousStewEffectsComponentType {
    return Object.freeze({
      "!minecraft:suspicious_stew_effects": Object.freeze({}),
    });
  },
};
