import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { Text } from "#/models/data-components/common/text.ts";

export class Lore implements DataComponent {
  private lines: Array<Text> | false;
  asJsonObject(): [string, Array<unknown> | object] {
    if (this.lines === false) {
      return ["!minecraft:lore", {}];
    }
    return ["minecraft:lore", this.lines.map((l) => l.asJsonObject())];
  }

  private constructor(lines: Array<Text> | false) {
    this.lines = lines;
  }
  public static new(...lines: Array<Text>) {
    if (lines.length > 256) {
      throw new Error();
    }
    return new this(lines);
  }

  public static negated() {
    return new this(false);
  }
}
