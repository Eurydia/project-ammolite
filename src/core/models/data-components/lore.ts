import z from "zod";
import {
  Schema$TextComponent,
  type TextComponentType,
} from "#/models/data-components/common/text.ts";

export const Schema$LoreComponent = z.compile(
  z.union([
    z.object({ "minecraft:lore": Schema$TextComponent.array().readonly() })
      .readonly(),
    z.object({ "!minecraft:lore": z.object({}).readonly() }).readonly(),
  ]),
);
export type LoreComponentType = z.output<typeof Schema$LoreComponent>;
export type Type$LoreComponent = LoreComponentType;

export interface Configurator$LoreComponent {
  line(value: TextComponentType): Configurator$LoreComponent;
}

class Builder$LoreLines implements Configurator$LoreComponent {
  private readonly lines: TextComponentType[] = [];
  line(value: TextComponentType) {
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
  private value?: LoreComponentType;
  lines(configure: (builder: Configurator$LoreComponent) => void) {
    const builder = new Builder$LoreLines();
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

export const LoreComponent = {
  builder: () => new Builder$LoreComponent(),
  from(...lines: TextComponentType[]) {
    if (lines.length > 256) {
      throw new Error("Minecraft lore supports at most 256 lines.");
    }
    return Schema$LoreComponent.parse({ "minecraft:lore": lines });
  },
  negated() {
    return Schema$LoreComponent.parse({ "!minecraft:lore": {} });
  },
};
