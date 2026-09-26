import { z } from "zod/v4";

export const Schema$IntBoundPredicate = z.compile(
  z.union([
    z.int().min(-2_147_483_648).max(2_147_483_647),
    z
      .object({
        min: z.int().min(-2_147_483_648).max(2_147_483_647).optional(),
        max: z.int().min(-2_147_483_648).max(2_147_483_647).optional(),
      })
      .readonly()
      .refine(
        (arg) =>
          arg?.max !== undefined &&
          arg?.min !== undefined &&
          arg.max >= arg.min,
      ),
  ]),
);

export type Type$IntBoundPredicate = z.output<typeof Schema$IntBoundPredicate>;

interface __Configurator$IntBoundPredicate$Range {
  min(value: number): __Configurator$IntBoundPredicate$Range;
  max(value: number): __Configurator$IntBoundPredicate$Range;
}

class __Builder$IntBoundPredicate$Range implements __Configurator$IntBoundPredicate$Range {
  private minValue?: number;
  private maxValue?: number;

  min(value: number): this {
    this.minValue = value;
    return this;
  }

  max(value: number): this {
    this.maxValue = value;
    return this;
  }

  build() {
    return { min: this.minValue, max: this.maxValue };
  }
}

export interface Configurator$IntBoundPredicate {
  range(
    configure: (builder: __Configurator$IntBoundPredicate$Range) => void,
  ): void;
  exact(value: number): void;
}

export class Builder$IntBoundPredicate implements Configurator$IntBoundPredicate {
  private value?: Type$IntBoundPredicate;

  range(configure: (builder: __Configurator$IntBoundPredicate$Range) => void) {
    const rangeBuilder = new __Builder$IntBoundPredicate$Range();
    configure(rangeBuilder);
    const value = rangeBuilder.build();
    this.value = value;
  }

  exact(value: number) {
    this.value = value;
  }

  build() {
    return Schema$IntBoundPredicate.parse(this.value);
  }
}
