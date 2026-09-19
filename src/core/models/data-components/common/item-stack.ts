import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";
import type {
  DataComponentType,
  DataComponentValue,
} from "#/models/data-components/data-component.ts";

export type ItemStackInput = {
  id: string;
  count?: number;
  components?: DataComponentValue;
};

export type ItemStackType = Readonly<ItemStackInput>;

export class ItemStackData implements DataPackModel<ItemStackType> {
  public readonly id: string;
  public readonly count?: number;
  public readonly components?: DataComponentValue;

  public constructor({ id, count, components }: ItemStackInput) {
    this.id = id;
    this.count = count;
    this.components = components;
    freezeDataClass(this);
  }

  public asJsonObject(): ItemStackType {
    return Object.freeze({
      id: this.id,
      count: this.count,
      components: toDataPackObject(this.components),
    });
  }
}

export interface ItemStackBuilderConfigurator {
  count(value: number): ItemStackBuilderConfigurator;
  component(value: DataComponentValue): ItemStackBuilderConfigurator;
  components(
    ...values: Array<DataComponentValue>
  ): ItemStackBuilderConfigurator;
}

export class ItemStackBuilder implements ItemStackBuilderConfigurator {
  private readonly id: string;
  private countValue?: number;
  private componentValues: Array<DataComponentValue> = [];

  public constructor(id: string) {
    this.id = id;
  }

  public count(value: number): this {
    this.countValue = value;
    return this;
  }

  public component(value: DataComponentValue): this {
    this.componentValues = [value];
    return this;
  }

  public components(...values: Array<DataComponentValue>): this {
    this.componentValues.push(...values);
    return this;
  }

  public build(): Readonly<ItemStackData> {
    const components = this.componentValues.length === 0
      ? undefined
      : Object.freeze(
        Object.assign(
          {},
          ...this.componentValues.map((component) =>
            toDataPackObject(component)
          ),
        ),
      );

    return freezeDataClass(
      new ItemStackData({
        id: this.id,
        count: this.countValue,
        components,
      }),
    );
  }
}

function itemStackFrom(data: ItemStackInput): ItemStackType {
  return Object.freeze({ ...data });
}

function itemStackInternalFrom(data: ItemStackInput): ItemStackType;
function itemStackInternalFrom<T, K>(
  data: (data: T) => ItemStackInput,
  transformer: (value: ItemStackType) => K,
): (data: T) => K;
function itemStackInternalFrom<T, K>(
  data: ItemStackInput | ((data: T) => ItemStackInput),
  transformer?: (value: ItemStackType) => K,
): ItemStackType | ((data: T) => K) {
  if (typeof data !== "function") {
    return itemStackFrom(data);
  }

  return (value: T) => {
    const itemStack = data(value);
    return transformer!(Object.freeze({ ...itemStack }));
  };
}

export const ItemStack = {
  builder(id: string): ItemStackBuilder {
    return new ItemStackBuilder(id);
  },
  from: itemStackFrom,
  __from: itemStackInternalFrom,
};

export const freezeItemStackList = (values: ReadonlyArray<ItemStackType>) =>
  freezeArray(values);
