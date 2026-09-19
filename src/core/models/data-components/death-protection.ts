import {
  ConsumeEffectData,
  type ConsumeEffectType,
} from "#/models/data-components/common/consume-effect.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type DeathProtectionComponentType = Readonly<
  | { "!minecraft:death_protection": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:death_protection": Readonly<{
      death_effects: ReadonlyArray<ConsumeEffectType>;
    }>;
  }
>;
export type ConsumeEffectValue = ConsumeEffectType | ConsumeEffectData;

export class DeathProtectionComponentData
  implements DataPackModel<DeathProtectionComponentType> {
  public readonly deathEffects: ReadonlyArray<ConsumeEffectValue>;
  public readonly negated: boolean;

  public constructor(
    deathEffects: ReadonlyArray<ConsumeEffectValue>,
    negated = false,
  ) {
    this.deathEffects = freezeArray(deathEffects);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): DeathProtectionComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:death_protection": Object.freeze({}) })
      : Object.freeze({
        "minecraft:death_protection": Object.freeze({
          death_effects: Object.freeze(
            this.deathEffects.map((effect) =>
              toDataPackObject(effect) as ConsumeEffectType
            ),
          ),
        }),
      }) as DeathProtectionComponentType;
  }
}

export interface DeathProtectionComponentBuilderConfigurator {
  deathEffect(
    value: ConsumeEffectValue,
  ): DeathProtectionComponentBuilderConfigurator;
  negated(): NegatedDeathProtectionComponentBuilderConfigurator;
}

export interface NegatedDeathProtectionComponentBuilderConfigurator {
  build(): Readonly<DeathProtectionComponentData>;
}

export class DeathProtectionComponentBuilder
  implements DeathProtectionComponentBuilderConfigurator {
  private readonly effectValues: Array<ConsumeEffectValue> = [];

  public deathEffect(value: ConsumeEffectValue): this {
    this.effectValues.push(value);
    return this;
  }

  public negated(): NegatedDeathProtectionComponentBuilderConfigurator {
    return new NegatedDeathProtectionComponentBuilder();
  }

  public build(): Readonly<DeathProtectionComponentData> {
    return freezeDataClass(
      new DeathProtectionComponentData(this.effectValues),
    );
  }
}

export class NegatedDeathProtectionComponentBuilder
  implements NegatedDeathProtectionComponentBuilderConfigurator {
  public build(): Readonly<DeathProtectionComponentData> {
    return freezeDataClass(new DeathProtectionComponentData([], true));
  }
}

export const DeathProtectionComponent = {
  builder(): DeathProtectionComponentBuilder {
    return new DeathProtectionComponentBuilder();
  },
  negatedBuilder(): NegatedDeathProtectionComponentBuilder {
    return new NegatedDeathProtectionComponentBuilder();
  },
  from(
    ...deathEffects: Array<ConsumeEffectType>
  ): DeathProtectionComponentType {
    return Object.freeze({
      "minecraft:death_protection": Object.freeze({
        death_effects: Object.freeze([...deathEffects]),
      }),
    });
  },
  negated(): DeathProtectionComponentType {
    return Object.freeze({
      "!minecraft:death_protection": Object.freeze({}),
    });
  },
};
