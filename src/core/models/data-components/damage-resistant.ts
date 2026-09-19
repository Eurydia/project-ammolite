import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
} from "#/models/model.ts";

export type DamageResistantComponentType = Readonly<
  | { "!minecraft:damage_resistant": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:damage_resistant": Readonly<{
      types: string | ReadonlyArray<string>;
    }>;
  }
>;

export class DamageResistantComponentData
  implements DataPackModel<DamageResistantComponentType> {
  public readonly types: ReadonlyArray<string>;
  public readonly negated: boolean;

  public constructor(types: ReadonlyArray<string>, negated = false) {
    this.types = freezeArray(types);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): DamageResistantComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:damage_resistant": Object.freeze({}) })
      : Object.freeze({
        "minecraft:damage_resistant": Object.freeze({ types: this.types }),
      });
  }
}

export interface DamageResistantComponentBuilderConfigurator {
  type(value: string): DamageResistantComponentBuilderConfigurator;
  negated(): NegatedDamageResistantComponentBuilderConfigurator;
}

export interface NegatedDamageResistantComponentBuilderConfigurator {
  build(): Readonly<DamageResistantComponentData>;
}

export class DamageResistantComponentBuilder
  implements DamageResistantComponentBuilderConfigurator {
  private readonly typeValues: Array<string> = [];

  public type(value: string): this {
    this.typeValues.push(value);
    return this;
  }

  public negated(): NegatedDamageResistantComponentBuilderConfigurator {
    return new NegatedDamageResistantComponentBuilder();
  }

  public build(): Readonly<DamageResistantComponentData> {
    if (this.typeValues.length === 0) {
      throw new Error("A damage-resistant component needs at least one type.");
    }
    return freezeDataClass(
      new DamageResistantComponentData(this.typeValues),
    );
  }
}

export class NegatedDamageResistantComponentBuilder
  implements NegatedDamageResistantComponentBuilderConfigurator {
  public build(): Readonly<DamageResistantComponentData> {
    return freezeDataClass(new DamageResistantComponentData([], true));
  }
}

export const DamageResistantComponent = {
  builder(): DamageResistantComponentBuilder {
    return new DamageResistantComponentBuilder();
  },
  negatedBuilder(): NegatedDamageResistantComponentBuilder {
    return new NegatedDamageResistantComponentBuilder();
  },
  from(...types: Array<string>): DamageResistantComponentType {
    return Object.freeze({
      "minecraft:damage_resistant": Object.freeze({
        types: Object.freeze(types),
      }),
    });
  },
  negated(): DamageResistantComponentType {
    return Object.freeze({
      "!minecraft:damage_resistant": Object.freeze({}),
    });
  },
};
