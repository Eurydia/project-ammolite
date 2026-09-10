import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { ConsumeEffect } from "#/models/data-components/common/consume-effect.ts";

export class DeathProtection implements DataComponent {
  private deathEffects: Array<ConsumeEffect> | false = [];

  asJsonObject(): [string, object] {
    if (this.deathEffects === false) {
      return ["!minecraft:death_protection", {}];
    }
    return [
      "minecraft:death_protection",
      { death_effects: this.deathEffects.map((eff) => eff.asJsonObject()) },
    ];
  }

  private constructor(eff: Array<ConsumeEffect> | false) {
    this.deathEffects = eff;
  }

  public static new(...eff: Array<ConsumeEffect>) {
    return new this(eff);
  }

  public static negated() {
    new this(false);
  }
}
