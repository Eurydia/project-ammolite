import {
  Builder$MobEffectPredicate,
  Configurator$MobEffectPredicate,
  Type$MobEffectPredicate,
} from "#/models/predicates/common/mob-effect.ts";
import z from "zod";
import { Schema$ByteBoundPredicate } from "#/models/predicates/common/byte-bound.ts";
import {
  Builder$IntBoundPredicate,
  Configurator$IntBoundPredicate,
  Schema$IntBoundPredicate,
  Type$IntBoundPredicate,
} from "#/models/predicates/common/int-bound.ts";

const __Schema$MobEffectPredicateRecord = z.record(
  z.string().normalize(),
  z
    .object({
      amplifier: Schema$ByteBoundPredicate.optional(),
      duration: Schema$IntBoundPredicate.optional(),
      ambient: z.boolean().optional(),
      visible: z.boolean().optional(),
    })
    .readonly(),
);

const __Schema$PotionContentsPredicate$Effects$Count = z
  .object({
    test: __Schema$MobEffectPredicateRecord.optional(),
    count: Schema$IntBoundPredicate,
  })
  .readonly();

const __Schema$PotionContentsPredicate$Effects = z
  .object({
    contains: __Schema$MobEffectPredicateRecord.array().readonly().optional(),
    count: __Schema$PotionContentsPredicate$Effects$Count
      .array()
      .readonly()
      .optional(),
    size: Schema$IntBoundPredicate.optional(),
  })
  .readonly();

type __PotionContentPredicateType$Effects = z.output<
  typeof __Schema$PotionContentsPredicate$Effects
>;

export const Schema$PotionContentsPredicate = z.compile(
  z.object({
    potions: z
      .union([
        z.string().normalize(),
        z.string().normalize().array().readonly(),
      ])
      .optional(),
    effects: __Schema$PotionContentsPredicate$Effects.optional(),
  }),
);

export type Type$PotionContentsPredicate = z.output<
  typeof Schema$PotionContentsPredicate
>;

interface __Configurator$PotionContentsPredicate$Effects$Count {
  test(
    configure: (builder: Configurator$MobEffectPredicate) => void,
  ): __Configurator$PotionContentsPredicate$Effects$Count;
}

class __Builder$PotionContentsPredicate$Effects$Count implements __Configurator$PotionContentsPredicate$Effects$Count {
  private countValue?: Type$IntBoundPredicate;
  private testValues?: Array<Type$MobEffectPredicate>;

  count(configure: (builder: Configurator$IntBoundPredicate) => void): this {
    const builder = new Builder$IntBoundPredicate();
    configure(builder);
    this.countValue = builder.build();
    return this;
  }

  test(configure: (builder: Configurator$MobEffectPredicate) => void): this {
    this.testValues ??= [];
    const builder = new Builder$MobEffectPredicate();
    configure(builder);
    this.testValues.push(builder.build());
    return this;
  }

  build() {
    return __Schema$PotionContentsPredicate$Effects$Count.parse({
      count: this.countValue,
      test: this.testValues?.reduce((prev, { effect, ...rest }) => {
        return Object.assign(prev, { [effect]: rest });
      }, {}),
    });
  }
}

interface __Configurator$PotionContentsPredicate$Effects {
  contains(
    configure: (builder: Configurator$MobEffectPredicate) => void,
  ): __Configurator$PotionContentsPredicate$Effects;
  count(
    configure: (
      builder: __Configurator$PotionContentsPredicate$Effects$Count,
    ) => void,
  ): __Configurator$PotionContentsPredicate$Effects;
  size(
    configure: (builder: Configurator$IntBoundPredicate) => void,
  ): __Configurator$PotionContentsPredicate$Effects;
}

class __Builder$PotionContentsPredicate$Effects implements __Configurator$PotionContentsPredicate$Effects {
  private containsValues?: Array<Type$MobEffectPredicate>;
  private countValues?: Array<
    z.output<typeof __Schema$PotionContentsPredicate$Effects$Count>
  >;
  private sizeValue?: Type$IntBoundPredicate;

  public contains(
    configure: (builder: Configurator$MobEffectPredicate) => void,
  ): this {
    this.containsValues ??= [];
    const builder = new Builder$MobEffectPredicate();
    configure(builder);
    this.containsValues.push(builder.build());
    return this;
  }

  public count(
    configure: (
      builder: __Configurator$PotionContentsPredicate$Effects$Count,
    ) => void,
  ): this {
    this.countValues ??= [];
    const builder = new __Builder$PotionContentsPredicate$Effects$Count();
    configure(builder);
    const result = builder.build();
    this.countValues.push(result);
    return this;
  }

  public size(config: (builder: Configurator$IntBoundPredicate) => void): this {
    const builder = new Builder$IntBoundPredicate();
    config(builder);
    this.sizeValue = builder.build();
    return this;
  }

  public build() {
    return __Schema$PotionContentsPredicate$Effects.parse({
      count: this.countValues,
      size: this.sizeValue,
      contains: this.containsValues,
    });
  }
}

export interface Configurator$PotionContentsPredicate {
  potions(...values: Array<string>): Configurator$PotionContentsPredicate;
  effects(
    configure: (
      builder: __Configurator$PotionContentsPredicate$Effects,
    ) => void,
  ): Configurator$PotionContentsPredicate;
}

export class Builder$PotionContentsPredicate implements Configurator$PotionContentsPredicate {
  private potionsValue?: string | Array<string>;
  private effectsValue?: __PotionContentPredicateType$Effects;

  potions(...values: Array<string>) {
    this.potionsValue = values.length === 1 ? values.at(0) : values;
    return this;
  }

  effects(
    configure: (
      builder: __Configurator$PotionContentsPredicate$Effects,
    ) => void,
  ) {
    const builder = new __Builder$PotionContentsPredicate$Effects();
    configure(builder);
    this.effectsValue = builder.build();
    return this;
  }

  public build() {
    return Schema$PotionContentsPredicate.parse({
      potions: this.potionsValue,
      effects: this.effectsValue,
    });
  }
}
