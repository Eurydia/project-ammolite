import { NumberBound } from "#/models/predicates/common/byte-bound.ts";
import { type DataPackModel, freezeDataClass } from "#/models/model.ts";

export type PotionDurationScaleComponentType = Readonly<
  | {
      "!minecraft:potion_duration_scale": Readonly<Record<PropertyKey, never>>;
    }
  | { "minecraft:potion_duration_scale": number }
>;

export class PotionDurationScaleComponentData implements DataPackModel<PotionDurationScaleComponentType> {
  public readonly value?: number;
  public readonly negated: boolean;

  public constructor(value?: number, negated = false) {
    this.value = value;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): PotionDurationScaleComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:potion_duration_scale": Object.freeze({}) })
      : Object.freeze({
          "minecraft:potion_duration_scale": NumberBound.float(this.value!),
        });
  }
}

export interface PotionDurationScaleComponentBuilderConfigurator {
  scale(value: number): PotionDurationScaleComponentBuilderConfigurator;
  negated(): NegatedPotionDurationScaleComponentBuilderConfigurator;
}

export interface NegatedPotionDurationScaleComponentBuilderConfigurator {
  build(): Readonly<PotionDurationScaleComponentData>;
}

export class PotionDurationScaleComponentBuilder implements PotionDurationScaleComponentBuilderConfigurator {
  private scaleValue?: number;

  public scale(value: number): this {
    this.scaleValue = value;
    return this;
  }

  public negated(): NegatedPotionDurationScaleComponentBuilderConfigurator {
    return new NegatedPotionDurationScaleComponentBuilder();
  }

  public build(): Readonly<PotionDurationScaleComponentData> {
    if (this.scaleValue === undefined) {
      throw new Error("A potion-duration-scale component needs a value.");
    }
    return freezeDataClass(
      new PotionDurationScaleComponentData(this.scaleValue),
    );
  }
}

export class NegatedPotionDurationScaleComponentBuilder implements NegatedPotionDurationScaleComponentBuilderConfigurator {
  public build(): Readonly<PotionDurationScaleComponentData> {
    return freezeDataClass(
      new PotionDurationScaleComponentData(undefined, true),
    );
  }
}

export const PotionDurationScaleComponent = {
  builder(): PotionDurationScaleComponentBuilder {
    return new PotionDurationScaleComponentBuilder();
  },
  negatedBuilder(): NegatedPotionDurationScaleComponentBuilder {
    return new NegatedPotionDurationScaleComponentBuilder();
  },
  from(value: number): PotionDurationScaleComponentType {
    return Object.freeze({
      "minecraft:potion_duration_scale": NumberBound.float(value, 0),
    });
  },
  negated(): PotionDurationScaleComponentType {
    return Object.freeze({
      "!minecraft:potion_duration_scale": Object.freeze({}),
    });
  },
};
