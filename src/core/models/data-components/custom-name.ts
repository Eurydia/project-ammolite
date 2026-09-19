import type {
  TextComponentType,
  TextComponentValue,
} from "#/models/data-components/common/text.ts";
import {
  type DataPackModel,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type CustomNameComponentType = Readonly<
  | { "!minecraft:custom_name": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:custom_name": TextComponentType }
>;

export class CustomNameComponentData
  implements DataPackModel<CustomNameComponentType> {
  public readonly text?: TextComponentValue;
  public readonly negated: boolean;

  public constructor(text?: TextComponentValue, negated = false) {
    this.text = text;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): CustomNameComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:custom_name": Object.freeze({}) })
      : Object.freeze({
        "minecraft:custom_name": toDataPackObject(this.text),
      }) as CustomNameComponentType;
  }
}

export interface CustomNameComponentBuilderConfigurator {
  text(value: TextComponentValue): CustomNameComponentBuilderConfigurator;
  negated(): NegatedCustomNameComponentBuilderConfigurator;
}

export interface NegatedCustomNameComponentBuilderConfigurator {
  build(): Readonly<CustomNameComponentData>;
}

export class CustomNameComponentBuilder
  implements CustomNameComponentBuilderConfigurator {
  private textValue?: TextComponentValue;

  public text(value: TextComponentValue): this {
    this.textValue = value;
    return this;
  }

  public negated(): NegatedCustomNameComponentBuilderConfigurator {
    return new NegatedCustomNameComponentBuilder();
  }

  public build(): Readonly<CustomNameComponentData> {
    if (this.textValue === undefined) {
      throw new Error("A custom-name component needs text.");
    }
    return freezeDataClass(
      new CustomNameComponentData(this.textValue),
    );
  }
}

export class NegatedCustomNameComponentBuilder
  implements NegatedCustomNameComponentBuilderConfigurator {
  public build(): Readonly<CustomNameComponentData> {
    return freezeDataClass(new CustomNameComponentData(undefined, true));
  }
}

export const CustomNameComponent = {
  builder(): CustomNameComponentBuilder {
    return new CustomNameComponentBuilder();
  },
  negatedBuilder(): NegatedCustomNameComponentBuilder {
    return new NegatedCustomNameComponentBuilder();
  },
  from(text: TextComponentType): CustomNameComponentType {
    return Object.freeze({ "minecraft:custom_name": text });
  },
  negated(): CustomNameComponentType {
    return Object.freeze({ "!minecraft:custom_name": Object.freeze({}) });
  },
};
