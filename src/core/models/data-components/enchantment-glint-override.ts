import { DataComponent } from "#/models/data-components/data-component-base.ts";

export class EnchantmentGlintOverride implements DataComponent {
  private value: boolean | null;
  private constructor(value: boolean | null) {
    this.value = value;
  }
  public asJsonObject(): [string, object | boolean] {
    if (this.value === null) {
      return ["!minecraft:enchantment_glint_override", {}];
    }
    return ["minecraft:enchantment_glint_override", this.value];
  }

  public static alwaysShow() {
    return new this(true);
  }

  public static alwaysHide() {
    return new this(false);
  }

  public static negated() {
    return new this(null);
  }
}
