import { DataComponent } from "#/models/data-components/data-component-base.ts";

export class PotionDurationScale implements DataComponent {
  private scale: number | false;

  private constructor(scale: number | false) {
    this.scale = scale;
  }

  public static new(value: number) {
    return new this(value);
  }

  public static negated() {
    return new this(false);
  }

  public asJsonObject(): [string, number | object] {
    if (this.scale === false) {
      return ["!minecraft:potion_duration_scale", {}];
    }
    return ["minecraft:potion_duration_scale", this.scale];
  }
}
