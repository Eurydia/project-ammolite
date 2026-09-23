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

export type ByteBoundType = z.output<typeof Schema$ByteBoundPredicate>;

interface ByteBoundRangeConfigurator {
  min(value: number): ByteBoundRangeConfigurator;
  max(value: number): ByteBoundRangeConfigurator;
}

class ByteBoundRangeBuilder implements ByteBoundRangeConfigurator {
  private minValue?: number;
  private maxValue?: number;

  public min(value: number): this {
    this.minValue = value;
    return this;
  }

  public max(value: number): this {
    this.maxValue = value;
    return this;
  }

  public build() {
    return Object.freeze({ min: this.minValue, max: this.maxValue });
  }
}

export interface ByteBoundConfigurator {
  range(
    configure: (builder: ByteBoundRangeConfigurator) => void,
  ): ByteBoundConfigurator;
  exact(value: number): ByteBoundConfigurator;
}

export class ByteBoundBuilder implements ByteBoundConfigurator {
  private value?: ByteBoundType;

  public range(configure: (builder: ByteBoundRangeConfigurator) => void): this {
    const rangeBuilder = new ByteBoundRangeBuilder();
    configure(rangeBuilder);
    const value = rangeBuilder.build();
    this.value = value;
    return this;
  }

  public exact(value: number): this {
    this.value = value;
    return this;
  }

  public build() {
    return Schema$ByteBoundPredicate.parse(this.value);
  }
}
