import { ItemRarity } from "#/enum/item-rarity.ts";
import { type DataPackModel, freezeDataClass } from "#/models/model.ts";

export type RarityComponentType = Readonly<
  | { "!minecraft:rarity": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:rarity": ItemRarity }
>;

export class RarityComponentData implements DataPackModel<RarityComponentType> {
  public readonly rarity?: ItemRarity;
  public readonly negated: boolean;

  public constructor(rarity?: ItemRarity, negated = false) {
    this.rarity = rarity;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): RarityComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:rarity": Object.freeze({}) })
      : Object.freeze({ "minecraft:rarity": this.rarity! });
  }
}

export interface RarityComponentBuilderConfigurator {
  rarity(value: ItemRarity): RarityComponentBuilderConfigurator;
  negated(): NegatedRarityComponentBuilderConfigurator;
}

export interface NegatedRarityComponentBuilderConfigurator {
  build(): Readonly<RarityComponentData>;
}

export class RarityComponentBuilder
  implements RarityComponentBuilderConfigurator {
  private rarityValue?: ItemRarity;

  public rarity(value: ItemRarity): this {
    this.rarityValue = value;
    return this;
  }

  public negated(): NegatedRarityComponentBuilderConfigurator {
    return new NegatedRarityComponentBuilder();
  }

  public build(): Readonly<RarityComponentData> {
    if (this.rarityValue === undefined) {
      throw new Error("A rarity component needs a rarity.");
    }
    return freezeDataClass(
      new RarityComponentData(this.rarityValue),
    );
  }
}

export class NegatedRarityComponentBuilder
  implements NegatedRarityComponentBuilderConfigurator {
  public build(): Readonly<RarityComponentData> {
    return freezeDataClass(new RarityComponentData(undefined, true));
  }
}

export const RarityComponent = {
  builder(): RarityComponentBuilder {
    return new RarityComponentBuilder();
  },
  negatedBuilder(): NegatedRarityComponentBuilder {
    return new NegatedRarityComponentBuilder();
  },
  from(rarity: ItemRarity): RarityComponentType {
    return Object.freeze({ "minecraft:rarity": rarity });
  },
  negated(): RarityComponentType {
    return Object.freeze({ "!minecraft:rarity": Object.freeze({}) });
  },
};
