import z from "zod";
import {
  Builder$TextComponent,
  Configurator$TextComponent,
  Schema$TextComponent,
} from "#/models/data-components/common/text.ts";

export const Schema$ItemNameComponent = z.compile(
  z.union([
    z.object({ "minecraft:item_name": Schema$TextComponent }).readonly(),
    z.object({ "!minecraft:item_name": z.object({}).readonly() }).readonly(),
  ]),
);

export type Type$ItemNameComponent = z.output<typeof Schema$ItemNameComponent>;

export interface Configurator$ItemNameComponent {
  text(configure: (builder: Configurator$TextComponent) => void): void;
  disabled(): void;
}

export class Builder$ItemNameComponent implements Configurator$ItemNameComponent {
  private value?: Type$ItemNameComponent;

  text(configure: (builder: Configurator$TextComponent) => void) {
    const builder = new Builder$TextComponent();
    configure(builder);
    this.value = { "minecraft:item_name": builder.build() };
  }

  disabled() {
    this.value = { "!minecraft:item_name": {} };
  }

  build() {
    return Schema$ItemNameComponent.parse(this.value);
  }
}
