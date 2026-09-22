import { z } from "zod/v4";

export const INT_BOUND_SCHEMA = z.compile(
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

export type IntBoundType = z.output<typeof INT_BOUND_SCHEMA>;

interface IntBoundRangeConfigurator {
  min(value: number): IntBoundRangeConfigurator;
  max(value: number): IntBoundRangeConfigurator;
}

class IntBoundRangeBuilder implements IntBoundRangeConfigurator {
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
    return { min: this.minValue, max: this.maxValue };
  }
}

export interface IntBoundConfigurator {
  range(
    configure: (builder: IntBoundRangeConfigurator) => void,
  ): IntBoundConfigurator;
  exact(value: number): IntBoundConfigurator;
}

export class IntBoundBuilder implements IntBoundConfigurator {
  private value?: number | { min?: number; max?: number };

  range(configure: (builder: IntBoundRangeConfigurator) => void): this {
    const rangeBuilder = new IntBoundRangeBuilder();
    configure(rangeBuilder);
    const value = rangeBuilder.build();
    this.value = value;
    return this;
  }

  exact(value: number): this {
    this.value = value;
    return this;
  }

  build() {
    return INT_BOUND_SCHEMA.parse(this.value);
  }
}
