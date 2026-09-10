import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { ItemRarity } from "#/enum/item-rarity.ts";

export class Rarity implements DataComponent {
  private rarity: ItemRarity | false = false;
  private constructor(value: ItemRarity | false) {
    this.rarity = value;
  }

  public static negated() {
    return new this(false);
  }
  public static common() {
    return new this(ItemRarity.COMMON);
  }

  public static rare() {
    return new this(ItemRarity.RARE);
  }

  public static epic() {
    return new this(ItemRarity.EPIC);
  }

  public static uncommon() {
    return new this(ItemRarity.UNCOMMON);
  }

  public asJsonObject(): [string, string | object] {
    if (this.rarity === false) {
      return ["!minecraft:rarity", {}];
    }
    return ["minecraft:rarity", this.rarity];
  }
}
