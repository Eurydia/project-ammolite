import {
  ItemStack,
  type ItemStackBuilderConfigurator,
  ItemStackData,
  type ItemStackInput,
  type ItemStackType,
} from "#/models/data-components/common/item-stack.ts";
import type { DataComponentValue } from "#/models/data-components/data-component.ts";
import {
  type DataPackModel,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type UseRemainderComponentType = Readonly<
  | { "!minecraft:use_remainder": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:use_remainder": ItemStackType;
  }
>;

export class UseRemainderComponentData
  implements DataPackModel<UseRemainderComponentType> {
  public readonly itemStack?: ItemStackType | ItemStackData;
  public readonly negated: boolean;

  public constructor(
    itemStack?: ItemStackType | ItemStackData,
    negated = false,
  ) {
    this.itemStack = itemStack;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): UseRemainderComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:use_remainder": Object.freeze({}) })
      : Object.freeze({
        "minecraft:use_remainder": toDataPackObject(this.itemStack!),
      }) as UseRemainderComponentType;
  }
}

export interface UseRemainderComponentBuilderConfigurator {
  itemStack(
    value: ItemStackInput | ItemStackData,
  ): UseRemainderComponentBuilderConfigurator;
  item(
    id: string,
    configure?: (builder: ItemStackBuilderConfigurator) => void,
  ): UseRemainderComponentBuilderConfigurator;
  negated(): NegatedUseRemainderComponentBuilderConfigurator;
}

export interface NegatedUseRemainderComponentBuilderConfigurator {
  build(): Readonly<UseRemainderComponentData>;
}

export class UseRemainderComponentBuilder
  implements UseRemainderComponentBuilderConfigurator {
  private itemStackValue?: ItemStackType | ItemStackData;

  public itemStack(value: ItemStackInput | ItemStackData): this {
    this.itemStackValue = value instanceof ItemStackData
      ? value
      : ItemStack.from(value);
    return this;
  }

  public item(
    id: string,
    configure?: (builder: ItemStackBuilderConfigurator) => void,
  ): this {
    const builder = ItemStack.builder(id);
    configure?.(builder);
    this.itemStackValue = builder.build();
    return this;
  }

  public negated(): NegatedUseRemainderComponentBuilderConfigurator {
    return new NegatedUseRemainderComponentBuilder();
  }

  public build(): Readonly<UseRemainderComponentData> {
    if (this.itemStackValue === undefined) {
      throw new Error("A use-remainder component needs an item stack.");
    }
    return freezeDataClass(new UseRemainderComponentData(this.itemStackValue));
  }
}

export class NegatedUseRemainderComponentBuilder
  implements NegatedUseRemainderComponentBuilderConfigurator {
  public build(): Readonly<UseRemainderComponentData> {
    return freezeDataClass(new UseRemainderComponentData(undefined, true));
  }
}

export const UseRemainderComponent = {
  builder(): UseRemainderComponentBuilder {
    return new UseRemainderComponentBuilder();
  },
  negatedBuilder(): NegatedUseRemainderComponentBuilder {
    return new NegatedUseRemainderComponentBuilder();
  },
  from({
    id,
    count,
    components,
  }: {
    id: string;
    count?: number;
    components?: DataComponentValue;
  }): UseRemainderComponentType {
    return Object.freeze({
      "minecraft:use_remainder": ItemStack.__from({ id, count, components }),
    });
  },
  negated(): UseRemainderComponentType {
    return Object.freeze({ "!minecraft:use_remainder": Object.freeze({}) });
  },
};
