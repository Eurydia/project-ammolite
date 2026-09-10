import { DataComponent } from "#/models/data-components/data-component-base.ts";

export class DamageResistant implements DataComponent {
  private types: Array<string> | false;
  asJsonObject(): [string, object | string | number | undefined | boolean] {
    if (this.types === false) {
      return ["!minecraft:damage_resistant", {}];
    }
    return [
      "minecraft:damage_resistant",
      {
        types: this.types,
      },
    ];
  }

  private constructor(types: Array<string> | false) {
    this.types = types;
  }

  public static new(...types: Array<string>) {
    return new this(types);
  }

  public static negated() {
    return new this(false);
  }
}
