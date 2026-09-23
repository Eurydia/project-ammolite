import {
  Builder$ByteBoundPredicate,
  Configurator$ByteBoundPredicate,
  Schema$ByteBoundPredicate,
  Type$ByteBoundPredicate,
} from "#/models/predicates/common/byte-bound.ts";
import {
  Builder$IntBoundPredicate,
  Configurator$IntBoundPredicate,
  Schema$IntBoundPredicate,
  Type$IntBoundPredicate,
} from "#/models/predicates/common/int-bound.ts";
import { z } from "zod";

export const Schema$MobEffectPredicate = z.compile(
  z
    .object({
      effect: z.string().normalize(),
      amplifier: Schema$ByteBoundPredicate.optional(),
      duration: Schema$IntBoundPredicate.optional(),
      ambient: z.boolean().optional(),
      visible: z.boolean().optional(),
    })
    .readonly(),
);

export type Type$MobEffectPredicate = z.output<
  typeof Schema$MobEffectPredicate
>;

export interface Configurator$MobEffectPredicate {
  effect(value: string): Configurator$MobEffectPredicate;
  amplifier(
    configure: (builder: Configurator$ByteBoundPredicate) => void,
  ): Configurator$MobEffectPredicate;
  duration(
    configure: (builder: Configurator$IntBoundPredicate) => void,
  ): Configurator$MobEffectPredicate;
  ambient(value: boolean): Configurator$MobEffectPredicate;
  visible(value: boolean): Configurator$MobEffectPredicate;
}

export class Builder$MobEffectPredicate
  implements Configurator$MobEffectPredicate {
  private effectValue?: string;
  private amplifierValue?: Type$ByteBoundPredicate;
  private durationValue?: Type$IntBoundPredicate;
  private ambientValue?: boolean;
  private visibleValue?: boolean;

  effect(value: string): this {
    this.effectValue = value;
    return this;
  }

  amplifier(
    configure: (builder: Configurator$ByteBoundPredicate) => void,
  ): this {
    const builder = new Builder$ByteBoundPredicate();
    configure(builder);
    this.amplifierValue = builder.build();
    return this;
  }

  duration(configure: (builder: Configurator$IntBoundPredicate) => void): this {
    const builder = new Builder$IntBoundPredicate();
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

  build() {
    return Schema$MobEffectPredicate.parse({
      effect: this.effectValue,
      amplifier: this.amplifierValue,
      duration: this.durationValue,
      ambient: this.ambientValue,
      visible: this.visibleValue,
    });
  }
}
