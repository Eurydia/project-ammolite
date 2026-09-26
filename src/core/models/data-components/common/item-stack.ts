import z from "zod";
import type {
  DataComponentType,
  DataComponentValue,
} from "#/models/data-components/data-component.ts";

export const Schema$ItemStackComponent = z.compile(
  z
    .object({
      id: z.string(),
      count: z.int().optional(),
      components: z.record(z.string(), z.unknown()).readonly().optional(),
    })
    .readonly(),
);

export type Type$ItemStackComponent = z.output<
  typeof Schema$ItemStackComponent
>;

export interface Configurator$ItemStackComponent {
  id(value: string): Configurator$ItemStackComponent;
  count(value: number): Configurator$ItemStackComponent;
  component(value: DataComponentValue): Configurator$ItemStackComponent;
}

export class Builder$ItemStackComponent implements Configurator$ItemStackComponent {
  private idValue?: string;
  private countValue?: number;
  private componentValues: Array<DataComponentValue> = [];

  id(value: string): this {
    this.idValue = value;
    return this;
  }

  count(value: number): this {
    this.countValue = value;
    return this;
  }

  component(value: DataComponentValue): this {
    this.componentValues = [value];
    return this;
  }

  build() {
    const components =
      this.componentValues.length === 0
        ? undefined
        : (Object.assign({}, ...this.componentValues) as DataComponentType);

    return Schema$ItemStackComponent.parse({
      id: this.idValue,
      count: this.countValue,
      components,
    });
  }
}
