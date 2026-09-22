import {
  BYTE_BOUND_SCHEMA,
  ByteBoundBuilder,
  ByteBoundConfigurator,
  ByteBoundType,
} from "#/models/predicates/common/byte-bound.ts";
import {
  INT_BOUND_SCHEMA,
  IntBoundBuilder,
  IntBoundConfigurator,
  IntBoundType,
} from "#/models/predicates/common/int-bound.ts";
import { z } from "zod";

export const MOB_EFFECT_PREDICATE_SCHEMA = z.compile(
  z
    .object({
      effect: z.string().normalize(),
      amplifier: BYTE_BOUND_SCHEMA.optional(),
      duration: INT_BOUND_SCHEMA.optional(),
      ambient: z.boolean().optional(),
      visible: z.boolean().optional(),
    })
    .readonly(),
);

export type MobEffectPredicateType = z.output<
  typeof MOB_EFFECT_PREDICATE_SCHEMA
>;

export interface MobEffectPredicateConfigurator {
  effect(value: string): MobEffectPredicateConfigurator;
  amplifier(
    configure: (builder: ByteBoundConfigurator) => void,
  ): MobEffectPredicateConfigurator;
  duration(
    configure: (builder: IntBoundConfigurator) => void,
  ): MobEffectPredicateConfigurator;
  ambient(value?: boolean): MobEffectPredicateConfigurator;
  visible(value?: boolean): MobEffectPredicateConfigurator;
}

export class MobEffectPredicateBuilder implements MobEffectPredicateConfigurator {
  private effectValue?: string;
  private amplifierValue?: ByteBoundType;
  private durationValue?: IntBoundType;
  private ambientValue?: boolean;
  private visibleValue?: boolean;

  effect(value: string): this {
    this.effectValue = value;
    return this;
  }

  amplifier(configure: (builder: ByteBoundConfigurator) => void): this {
    const builder = new ByteBoundBuilder();
    configure(builder);
    this.amplifierValue = builder.build();
    return this;
  }

  duration(configure: (builder: IntBoundConfigurator) => void): this {
    const builder = new IntBoundBuilder();
    configure(builder);
    this.durationValue = builder.build();
    return this;
  }

  ambient(value = true): this {
    this.ambientValue = value;
    return this;
  }

  visible(value = true): this {
    this.visibleValue = value;
    return this;
  }

  public build() {
    return MOB_EFFECT_PREDICATE_SCHEMA.parse({
      effect: this.effectValue,
      amplifier: this.amplifierValue,
      duration: this.durationValue,
      ambient: this.ambientValue,
      visible: this.visibleValue,
    });
  }
}
