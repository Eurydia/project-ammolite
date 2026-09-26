import z from "zod";
import {
  Builder$TextComponent,
  Configurator$TextComponent,
  Schema$TextComponent,
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
  lines(
    ...configureFns: Array<(builder: Configurator$TextComponent) => void>
  ): void;
  disabled(): void;
}

export class Builder$LoreComponent implements Configurator$LoreComponent {
  private value?: Type$LoreComponent;
  lines(...configureFns: Array<(builder: Configurator$TextComponent) => void>) {
    this.value = {
      "minecraft:lore": configureFns.map((configure) => {
        const builder = new Builder$TextComponent();
        configure(builder);
        return builder.build();
      }),
    };
  }
  disabled() {
    this.value = { "!minecraft:lore": {} };
  }
  build() {
    return Schema$LoreComponent.parse(this.value);
  }
}
