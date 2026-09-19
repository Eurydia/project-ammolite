import type {
  TextComponentType,
  TextComponentValue,
} from "#/models/data-components/common/text.ts";
import {
  type DataPackModel,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type ItemNameComponentType = Readonly<
  | { "!minecraft:item_name": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:item_name": TextComponentType }
>;

export class ItemNameComponentData
  implements DataPackModel<ItemNameComponentType> {
  public readonly text?: TextComponentValue;
  public readonly negated: boolean;

  public constructor(text?: TextComponentValue, negated = false) {
    this.text = text;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): ItemNameComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:item_name": Object.freeze({}) })
      : Object.freeze({
        "minecraft:item_name": toDataPackObject(this.text),
      }) as ItemNameComponentType;
  }
}

export interface ItemNameComponentBuilderConfigurator {
  text(value: TextComponentValue): ItemNameComponentBuilderConfigurator;
  negated(): NegatedItemNameComponentBuilderConfigurator;
}

export interface NegatedItemNameComponentBuilderConfigurator {
  build(): Readonly<ItemNameComponentData>;
}

export class ItemNameComponentBuilder
  implements ItemNameComponentBuilderConfigurator {
  private textValue?: TextComponentValue;

  public text(value: TextComponentValue): this {
    this.textValue = value;
    return this;
  }

  public negated(): NegatedItemNameComponentBuilderConfigurator {
    return new NegatedItemNameComponentBuilder();
  }

  public build(): Readonly<ItemNameComponentData> {
    if (this.textValue === undefined) {
      throw new Error("An item-name component needs text.");
    }
    return freezeDataClass(
      new ItemNameComponentData(this.textValue),
    );
  }
}

export class NegatedItemNameComponentBuilder
  implements NegatedItemNameComponentBuilderConfigurator {
  public build(): Readonly<ItemNameComponentData> {
    return freezeDataClass(new ItemNameComponentData(undefined, true));
  }
}

export const ItemNameComponent = {
  builder(): ItemNameComponentBuilder {
    return new ItemNameComponentBuilder();
  },
  negatedBuilder(): NegatedItemNameComponentBuilder {
    return new NegatedItemNameComponentBuilder();
  },
  from(text: TextComponentType): ItemNameComponentType {
    return Object.freeze({ "minecraft:item_name": text });
  },
  negated(): ItemNameComponentType {
    return Object.freeze({ "!minecraft:item_name": Object.freeze({}) });
  },
};
