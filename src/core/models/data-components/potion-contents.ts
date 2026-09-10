import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";

export class PotionContents implements DataComponent {
  private potion: string | false;
  private customName?: string;
  private customColor?: number;
  private customEffects?: Array<MobEffect>;

  private constructor(potion: string | false) {
    this.potion = potion;
  }

  public static negated() {
    return new this(false);
  }

  public static new(potion: string) {
    return new this(potion);
  }

  private validateNegated() {
    if (this.potion === false) {
      throw new Error();
    }
  }

  public withHexColor(hex: string) {
    this.validateNegated();
    this.customColor = Number.parseInt(hex.slice(1), 16);
    return this;
  }

  public withName(name: string) {
    this.validateNegated();
    this.customName = name;
    return this;
  }

  public withEffects(...effs: Array<MobEffect>) {
    this.validateNegated();
    this.customEffects = [...effs];
    return this;
  }

  public asJsonObject(): [string, object] {
    if (this.potion === false) {
      return ["!minecraft:potion_contents", {}];
    }
    return [
      "minecraft:potion_contents",
      {
        potion: this.potion,
        custom_name: this.customName,
        custom_color: this.customColor,
        custom_effects: this.customEffects,
      },
    ];
  }
}
