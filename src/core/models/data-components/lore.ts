import z from "zod";
import {
  Schema$TextComponent,
  type Type$TextComponent,
} from "#/models/data-components/common/text.ts";

export const Schema$LoreComponent = z.compile(
  z.union([
    z
      .object({ "minecraft:lore": Schema$TextComponent.array().readonly() })
      .readonly(),
    z.object({ "!minecraft:lore": z.object({}).readonly() }).readonly(),
  ]),
);
export type Type$LoreComponent = z.output<typeof Schema$LoreComponent>;

export interface Configurator$LoreComponent {
  line(value: Type$TextComponent): Configurator$LoreComponent;
}

class __Builder$LoreComponent$Lines implements Configurator$LoreComponent {
  private readonly lines: Type$TextComponent[] = [];
  line(value: Type$TextComponent) {
    this.lines.push(value);
    return this;
  }
  build() {
    if (this.lines.length > 256) {
      throw new Error("Minecraft lore supports at most 256 lines.");
    }
    return Schema$LoreComponent.parse({ "minecraft:lore": this.lines });
  }
}

export class Builder$LoreComponent {
  private value?: Type$LoreComponent;
  lines(configure: (builder: Configurator$LoreComponent) => void) {
    const builder = new __Builder$LoreComponent$Lines();
    configure(builder);
    this.value = builder.build();
  }
  disabled() {
    this.value = { "!minecraft:lore": {} };
  }
  build() {
    return Schema$LoreComponent.parse(this.value);
  }
}
