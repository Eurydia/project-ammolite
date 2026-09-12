import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { MobEffects } from "#/enum/mob-effects.ts";

export class SuspiciousStewEffects implements DataComponent {
  private effects: Array<{ id: MobEffects; duration?: number }> | false;

  private constructor(
    effs: Array<{ id: MobEffects; duration?: number }> | false,
  ) {
    this.effects = effs;
  }

  public static from(...effs: Array<{ id: MobEffects; duration?: number }>) {
    return new this(effs);
  }
  public static negated() {
    return new this(false);
  }

  asJsonObject(): [string, object | string | number | undefined | boolean] {
    if (this.effects === false) {
      return ["!minecraft:suspicious_stew_effects", {}];
    }
    return ["minecraft:suspicious_stew_effects", this.effects];
  }
}
