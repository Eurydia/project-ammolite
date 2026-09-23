import z from "zod";
import type {
  DataComponentType,
  DataComponentValue,
} from "#/models/data-components/data-component.ts";

export const Schema$ItemStack = z.compile(
  z.object({
    id: z.string(),
    count: z.int().optional(),
    components: z.record(z.string(), z.unknown()).readonly().optional(),
  }).readonly(),
);

export type Type$ItemStack = z.output<typeof Schema$ItemStack>;
export type ItemStackType = Type$ItemStack;
export type ItemStackInput = {
  id: string;
  count?: number;
  components?: DataComponentValue;
};

export interface Configurator$ItemStack {
  id(value: string): Configurator$ItemStack;
  count(value: number): Configurator$ItemStack;
  component(value: DataComponentValue): Configurator$ItemStack;
  components(...values: Array<DataComponentValue>): Configurator$ItemStack;
}

export class Builder$ItemStack implements Configurator$ItemStack {
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

  components(...values: Array<DataComponentValue>): this {
    this.componentValues.push(...values);
    return this;
  }

  build(): ItemStackType {
    const components = this.componentValues.length === 0
      ? undefined
      : Object.assign(
        {},
        ...this.componentValues,
      ) as DataComponentType;

    return Schema$ItemStack.parse({
      id: this.idValue,
      count: this.countValue,
      components,
    });
  }
}

const itemStackFrom = (data: ItemStackInput): ItemStackType =>
  Schema$ItemStack.parse({
    ...data,
  });

export const ItemStack = {
  builder(): Builder$ItemStack {
    return new Builder$ItemStack();
  },
  from: itemStackFrom,
  __from: itemStackFrom,
};
