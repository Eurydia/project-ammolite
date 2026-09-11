import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";
import { MinecraftPotions } from "#/enum/minecraft-potions.ts";

export class PotionContents implements DataComponent {
  private potion?: string | MinecraftPotions | false;
  private customName?: string;
  private customColor?: number;
  private customEffects?: Array<MobEffect>;

  private constructor(potion?: string | false) {
    this.potion = potion;
  }

  public static negated() {
    return new this(false);
  }

  public static new(potion?: string | MinecraftPotions) {
    return new this(potion);
  }

  public withHexColor(hex: string) {
    this.customColor = Number.parseInt(hex.slice(1), 16);
    return this;
  }

  public withName(name: string) {
    this.customName = name;
    return this;
  }

  public withEffects(...effs: Array<MobEffect>) {
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
