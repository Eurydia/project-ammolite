import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { Text } from "#/models/data-components/common/text.ts";

export class CustomName implements DataComponent {
  private text: Text | false;
  private constructor(text: Text | false) {
    this.text = text;
  }
  public asJsonObject(): [string, object | string] {
    if (this.text === false) {
      return ["!minecraft:custom_name", {}];
    }
    return ["minecraft:custom_name", this.text.asJsonObject()];
  }

  public static negate() {
    return new this(false);
  }

  public static from(text: Text) {
    return new this(text);
  }
}
