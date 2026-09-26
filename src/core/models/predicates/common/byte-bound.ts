import { z } from "zod/v4";

export const Schema$ByteBoundPredicate = z.compile(
  z.union([
    z.int().min(-128).max(127),
    z
      .object({
        min: z.int().min(-128).max(127).optional(),
        max: z.int().min(-128).max(127).optional(),
      })
      .readonly()
      .refine(
        (arg) =>
          arg.max !== undefined && arg.min !== undefined && arg.max >= arg.min,
      ),
  ]),
);

export type Type$ByteBoundPredicate = z.output<
  typeof Schema$ByteBoundPredicate
>;

interface __Configurator$ByteBoundPredicate$Range {
  min(value: number): __Configurator$ByteBoundPredicate$Range;
  max(value: number): __Configurator$ByteBoundPredicate$Range;
}

class __Builder$ByteBoundPredicate$Range implements __Configurator$ByteBoundPredicate$Range {
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

export interface Configurator$ByteBoundPredicate {
  range(
    configure: (builder: __Configurator$ByteBoundPredicate$Range) => void,
  ): void;
  exact(value: number): void;
}

export class Builder$ByteBoundPredicate implements Configurator$ByteBoundPredicate {
  private value?: Type$ByteBoundPredicate;

  public range(
    configure: (builder: __Configurator$ByteBoundPredicate$Range) => void,
  ) {
    const rangeBuilder = new __Builder$ByteBoundPredicate$Range();
    configure(rangeBuilder);
    const value = rangeBuilder.build();
    this.value = value;
  }

  public exact(value: number) {
    this.value = value;
  }

  public build() {
    return Schema$ByteBoundPredicate.parse(this.value);
  }
}
