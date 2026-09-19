import {
  MobEffectComponentData,
  type MobEffectComponentType,
} from "#/models/data-components/common/mob-effect.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

export type PotionContentsComponentType = Readonly<
  | {
    "!minecraft:potion_contents": Readonly<Record<PropertyKey, never>>;
  }
  | {
    "minecraft:potion_contents": Readonly<{
      potion?: string;
      custom_name?: string;
      custom_color?: number;
      custom_effects?: ReadonlyArray<MobEffectComponentType>;
    }>;
  }
>;
export type MobEffectComponentValue =
  | MobEffectComponentType
  | MobEffectComponentData;

export class PotionContentsComponentData
  implements DataPackModel<PotionContentsComponentType> {
  public readonly potion?: string;
  public readonly customName?: string;
  public readonly customColor?: string;
  public readonly customEffects?: ReadonlyArray<MobEffectComponentValue>;
  public readonly negated: boolean;

  public constructor({
    potion,
    customName,
    customColor,
    customEffects,
    negated = false,
  }: {
    potion?: string;
    customName?: string;
    customColor?: string;
    customEffects?: ReadonlyArray<MobEffectComponentValue>;
    negated?: boolean;
  }) {
    this.potion = potion;
    this.customName = customName;
    this.customColor = customColor;
    this.customEffects = customEffects === undefined
      ? undefined
      : freezeArray(customEffects);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): PotionContentsComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:potion_contents": Object.freeze({}) })
      : Object.freeze({
        "minecraft:potion_contents": Object.freeze({
          potion: this.potion,
          custom_name: this.customName,
          custom_effects: this.customEffects === undefined
            ? undefined
            : Object.freeze(
              this.customEffects.map((effect) => toDataPackObject(effect)),
            ),
          custom_color: this.customColor === undefined
            ? undefined
            : Number.parseInt(this.customColor.slice(1), 16),
        }),
      });
  }
}

export interface PotionContentsComponentBuilderConfigurator {
  potion(value: string): PotionContentsComponentBuilderConfigurator;
  customName(value: string): PotionContentsComponentBuilderConfigurator;
  customColor(value: string): PotionContentsComponentBuilderConfigurator;
  customEffect(
    value: MobEffectComponentValue,
  ): PotionContentsComponentBuilderConfigurator;
  negated(): NegatedPotionContentsComponentBuilderConfigurator;
}

export interface NegatedPotionContentsComponentBuilderConfigurator {
  build(): Readonly<PotionContentsComponentData>;
}

export class PotionContentsComponentBuilder
  implements PotionContentsComponentBuilderConfigurator {
  private potionValue?: string;
  private customNameValue?: string;
  private customColorValue?: string;
  private readonly effectValues: Array<MobEffectComponentValue> = [];

  public potion(value: string): this {
    this.potionValue = value;
    return this;
  }

  public customName(value: string): this {
    this.customNameValue = value;
    return this;
  }

  public customColor(value: string): this {
    this.customColorValue = value;
    return this;
  }

  public customEffect(value: MobEffectComponentValue): this {
    this.effectValues.push(value);
    return this;
  }

  public negated(): NegatedPotionContentsComponentBuilderConfigurator {
    return new NegatedPotionContentsComponentBuilder();
  }

  public build(): Readonly<PotionContentsComponentData> {
    return freezeDataClass(
      new PotionContentsComponentData({
        potion: this.potionValue,
        customName: this.customNameValue,
        customColor: this.customColorValue,
        customEffects: this.effectValues,
      }),
    );
  }
}

export class NegatedPotionContentsComponentBuilder
  implements NegatedPotionContentsComponentBuilderConfigurator {
  public build(): Readonly<PotionContentsComponentData> {
    return freezeDataClass(
      new PotionContentsComponentData({ negated: true }),
    );
  }
}

export const PotionContentsComponent = {
  builder(): PotionContentsComponentBuilder {
    return new PotionContentsComponentBuilder();
  },
  negatedBuilder(): NegatedPotionContentsComponentBuilder {
    return new NegatedPotionContentsComponentBuilder();
  },
  from({
    customColor,
    customEffects,
    customName,
    potion,
  }: {
    potion?: string;
    customName?: string;
    customColor?: string;
    customEffects?: Array<MobEffectComponentType>;
  }): PotionContentsComponentType {
    return Object.freeze({
      "minecraft:potion_contents": Object.freeze({
        potion,
        custom_name: customName,
        custom_effects: keepUndefinedOrTransform(
          customEffects,
          (value) => Object.freeze([...value]),
        ),
        custom_color: keepUndefinedOrTransform(customColor, (val) => {
          return Number.parseInt(val.slice(1), 16);
        }),
      }),
    });
  },
  negated(): PotionContentsComponentType {
    return Object.freeze({
      "!minecraft:potion_contents": Object.freeze({}),
    });
  },
};
