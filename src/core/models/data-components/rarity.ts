import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { ItemRarity } from "#/enum/item-rarity.ts";

class Rarity implements DataComponent {
  private readonly rarity: ItemRarity | false;
  public constructor(value: ItemRarity | false) {
    this.rarity = value;
  }

  public asJsonObject(): [string, string | object] {
    if (this.rarity === false) {
      return ["!minecraft:rarity", {}];
    }
    return ["minecraft:rarity", this.rarity];
  }
}

export class RarityDataComponent {
  private constructor() {}

  public static negated() {
    return new Rarity(false);
  }
  public static common() {
    return new Rarity(ItemRarity.COMMON);
  }

  public static rare() {
    return new Rarity(ItemRarity.RARE);
  }

  public static epic() {
    return new Rarity(ItemRarity.EPIC);
  }

  public static uncommon() {
    return new Rarity(ItemRarity.UNCOMMON);
  }
}
