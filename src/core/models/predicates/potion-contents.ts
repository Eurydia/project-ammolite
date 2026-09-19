import { MobEffectPredicateType } from "#/models/predicates/common/mob-effect.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";
import {
  NumberBound,
  NumberBoundData,
  type NumberBoundType,
  type NumberBoundValue,
} from "#/models/predicates/common/byte-bound.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
} from "#/models/model.ts";
import {
  MobEffectPredicateBuilder,
  type MobEffectPredicateConfigurator,
  MobEffectPredicateData,
  type MobEffectPredicateInput,
} from "#/models/predicates/common/mob-effect.ts";
import { toDataPackObject } from "#/models/model.ts";

export type PotionContentsPredicateType = Readonly<{
  potions?: string | ReadonlyArray<string>;
  effects?: {
    contains?: ReadonlyArray<
      Readonly<{
        [k: string]: Readonly<{
          amplifier?: NumberBoundType;
          duration?: NumberBoundType;
          ambient?: boolean;
          visible?: boolean;
        }>;
      }>
    >;
    count?: ReadonlyArray<{
      count: NumberBoundType;
      test: Readonly<{
        [k: string]: Readonly<{
          amplifier?: NumberBoundType;
          duration?: NumberBoundType;
          ambient?: boolean;
          visible?: boolean;
        }>;
      }>;
    }>;
    size?: NumberBoundType;
  };
}>;

type PotionContentsPredicateInput = {
  potions?: string | ReadonlyArray<string>;
  effects?: {
    contains?: ReadonlyArray<MobEffectPredicateType>;
    count?: ReadonlyArray<{
      count: NumberBoundType;
      test: ReadonlyArray<MobEffectPredicateType>;
    }>;
    size?: NumberBoundType;
  };
};

const toNumberBound = (value: NumberBoundValue): NumberBoundType =>
  value instanceof NumberBoundData ? value.asJsonObject() : value;
export type MobEffectPredicateValue =
  | MobEffectPredicateInput
  | MobEffectPredicateData;

type PotionCountPredicateInput = {
  count: NumberBoundType;
  test: ReadonlyArray<MobEffectPredicateType>;
};

export class PotionCountPredicateData implements DataPackModel<PotionCountPredicateInput> {
  public readonly count: NumberBoundType;
  public readonly test: ReadonlyArray<MobEffectPredicateType>;

  public constructor({ count, test }: PotionCountPredicateInput) {
    this.count = count;
    this.test = freezeArray(test);
    freezeDataClass(this);
  }

  public asJsonObject(): PotionCountPredicateInput {
    return Object.freeze({
      count: this.count,
      test: Object.freeze(this.test),
    });
  }
}

export class PotionEffectsPredicateData implements DataPackModel<
  NonNullable<PotionContentsPredicateType["effects"]>
> {
  public readonly contains: ReadonlyArray<MobEffectPredicateType>;
  public readonly count: ReadonlyArray<PotionCountPredicateData>;
  public readonly size?: NumberBoundType;

  public constructor({
    contains,
    count,
    size,
  }: {
    contains: ReadonlyArray<MobEffectPredicateType>;
    count: ReadonlyArray<PotionCountPredicateData>;
    size?: NumberBoundType;
  }) {
    this.contains = freezeArray(contains);
    this.count = freezeArray(count);
    this.size = size;
    freezeDataClass(this);
  }

  public asJsonObject(): NonNullable<PotionContentsPredicateType["effects"]> {
    return PotionContentsPredicate.from({
      effects: {
        contains: this.contains.length === 0 ? undefined : this.contains,
        count: this.count.length === 0 ? undefined : this.count,
        size: this.size,
      },
    }).effects!;
  }
}

export class PotionContentsPredicateData implements DataPackModel<PotionContentsPredicateType> {
  public readonly potions?: string | ReadonlyArray<string>;
  public readonly effects?:
    | PotionContentsPredicateInput["effects"]
    | PotionEffectsPredicateData;

  public constructor({
    potions,
    effects,
  }: {
    potions?: string | ReadonlyArray<string>;
    effects?:
      | PotionContentsPredicateInput["effects"]
      | PotionEffectsPredicateData;
  }) {
    this.potions =
      typeof potions === "string"
        ? potions
        : potions === undefined
          ? undefined
          : freezeArray(potions);
    this.effects = effects;
    freezeDataClass(this);
  }

  public asJsonObject(): PotionContentsPredicateType {
    if (this.effects instanceof PotionEffectsPredicateData) {
      return Object.freeze({
        potions: this.potions,
        effects: this.effects.asJsonObject(),
      });
    }

    return PotionContentsPredicate.from({
      potions:
        this.potions === undefined || typeof this.potions === "string"
          ? this.potions
          : [...this.potions],
      effects: this.effects,
    });
  }
}

export interface PotionContentsPredicateBuilderConfigurator {
  potion(value: string): PotionContentsPredicateBuilderConfigurator;
  potions(...values: Array<string>): PotionContentsPredicateBuilderConfigurator;
  effects(
    configure: (builder: PotionEffectsPredicateBuilderConfigurator) => void,
  ): PotionContentsPredicateBuilderConfigurator;
}

export interface PotionEffectsPredicateBuilderConfigurator {
  contains(
    value: MobEffectPredicateValue,
  ): PotionEffectsPredicateBuilderConfigurator;
  contains(
    effect: string,
    configure: (builder: MobEffectPredicateConfigurator) => void,
  ): PotionEffectsPredicateBuilderConfigurator;
  count(
    value: NumberBoundValue,
    configure: (builder: PotionCountPredicateBuilderConfigurator) => void,
  ): PotionEffectsPredicateBuilderConfigurator;
  size(value: NumberBoundValue): PotionEffectsPredicateBuilderConfigurator;
}

export interface PotionCountPredicateBuilderConfigurator {
  test(value: MobEffectPredicateValue): PotionCountPredicateBuilderConfigurator;
  test(
    effect: string,
    configure: (builder: MobEffectPredicateConfigurator) => void,
  ): PotionCountPredicateBuilderConfigurator;
}

export class PotionCountPredicateBuilder implements PotionCountPredicateBuilderConfigurator {
  private readonly countValue: NumberBoundType;
  private readonly tests: Array<MobEffectPredicateType> = [];

  public constructor(count: NumberBoundValue) {
    this.countValue = toNumberBound(count);
  }

  public test(value: MobEffectPredicateValue): this;
  public test(
    effect: string,
    configure: (builder: MobEffectPredicateConfigurator) => void,
  ): this;
  public test(
    value: MobEffectPredicateValue | string,
    configure?: (builder: MobEffectPredicateConfigurator) => void,
  ): this {
    if (typeof value !== "string") {
      this.tests.push(toDataPackObject(value) as MobEffectPredicateType);
      return this;
    }

    const builder = new MobEffectPredicateBuilder(value);
    configure?.(builder);
    this.tests.push(builder.build().asJsonObject());
    return this;
  }

  public build(): Readonly<PotionCountPredicateData> {
    return freezeDataClass(
      new PotionCountPredicateData({
        count: this.countValue,
        test: freezeArray(this.tests),
      }),
    );
  }
}

export class PotionEffectsPredicateBuilder implements PotionEffectsPredicateBuilderConfigurator {
  private readonly containsValues: Array<MobEffectPredicateType> = [];
  private readonly countValues: Array<{
    count: NumberBoundType;
    test: ReadonlyArray<MobEffectPredicateType>;
  }> = [];
  private sizeValue?: NumberBoundType;

  public contains(value: MobEffectPredicateValue): this;
  public contains(
    effect: string,
    configure: (builder: MobEffectPredicateConfigurator) => void,
  ): this;
  public contains(
    value: MobEffectPredicateValue | string,
    configure?: (builder: MobEffectPredicateConfigurator) => void,
  ): this {
    if (typeof value === "string") {
      const builder = new MobEffectPredicateBuilder(value);
      configure?.(builder);
      this.containsValues.push(builder.build().asJsonObject());
    } else {
      this.containsValues.push(
        toDataPackObject(value) as MobEffectPredicateType,
      );
    }
    return this;
  }

  public count(
    value: NumberBoundValue,
    configure: (builder: PotionCountPredicateBuilderConfigurator) => void,
  ): this {
    const builder = new PotionCountPredicateBuilder(value);
    configure(builder);
    const result = builder.build();
    this.countValues.push({
      count: result.count,
      test: result.test,
    });
    return this;
  }

  public size(value: NumberBoundValue): this {
    this.sizeValue = toNumberBound(value);
    return this;
  }

  public build(): Readonly<PotionEffectsPredicateData> {
    return freezeDataClass(
      new PotionEffectsPredicateData({
        contains: freezeArray(this.containsValues),
        count: freezeArray(
          this.countValues.map((value) => new PotionCountPredicateData(value)),
        ),
        size: this.sizeValue,
      }),
    );
  }
}

export class PotionContentsPredicateBuilder implements PotionContentsPredicateBuilderConfigurator {
  private potionsValue?: string | Array<string>;
  private effectsValue?: PotionEffectsPredicateData;

  public potion(value: string): this {
    this.potionsValue = value;
    return this;
  }

  public potions(...values: Array<string>): this {
    this.potionsValue = values;
    return this;
  }

  public effects(
    configure: (builder: PotionEffectsPredicateBuilderConfigurator) => void,
  ): this {
    const builder = new PotionEffectsPredicateBuilder();
    configure(builder);
    this.effectsValue = builder.build();
    return this;
  }

  public build(): Readonly<PotionContentsPredicateData> {
    return freezeDataClass(
      new PotionContentsPredicateData({
        potions: this.potionsValue,
        effects: this.effectsValue,
      }),
    );
  }
}

export const PotionContentsPredicate = {
  builder(): PotionContentsPredicateBuilder {
    return new PotionContentsPredicateBuilder();
  },
  from({
    potions,
    effects,
  }: {
    potions?: string | ReadonlyArray<string>;
    effects?: {
      contains?: ReadonlyArray<MobEffectPredicateType>;
      count?: ReadonlyArray<{
        count: NumberBoundType;
        test: ReadonlyArray<MobEffectPredicateType>;
      }>;
      size?: NumberBoundType;
    };
  }) {
    return Object.freeze({
      potions: keepUndefinedOrTransform(potions, (val) => {
        return typeof val === "string" ? val : Object.freeze([...val]);
      }),
      effects: keepUndefinedOrTransform(
        effects,
        ({ contains, count, size }) => {
          return Object.freeze({
            size:
              size === undefined
                ? undefined
                : NumberBound.integer(size, 0, 2_147_483_647),
            contains: keepUndefinedOrTransform(contains, (vals) => {
              return Object.freeze(
                vals.map(
                  ({ effect, ...rest }) =>
                    Object.freeze({
                      [effect]: makeEffectPredicateValue(rest),
                    }) as Readonly<{
                      [K: string]: Readonly<{
                        amplifier?: NumberBoundType;
                        duration?: NumberBoundType;
                        ambient?: boolean;
                        visible?: boolean;
                      }>;
                    }>,
                ),
              );
            }),
            count: keepUndefinedOrTransform(count, (vals) => {
              return Object.freeze(
                vals.map(({ count, test }) => {
                  return Object.freeze({
                    count: NumberBound.integer(count, 0, 2_147_483_647),
                    test: Object.freeze(
                      test.reduce((prev, { effect, ...rest }) => {
                        return Object.assign(prev, {
                          [effect]: makeEffectPredicateValue(rest),
                        });
                      }, {}) as {
                        [K: string]: {
                          amplifier?: NumberBoundType;
                          duration?: NumberBoundType;
                          ambient?: boolean;
                          visible?: boolean;
                        };
                      },
                    ),
                  });
                }),
              );
            }),
          });
        },
      ),
    });
  },
};
