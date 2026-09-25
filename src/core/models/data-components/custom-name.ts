import z from "zod";
import {
  Builder$TextComponent,
  Configurator$TextComponent,
  Schema$TextComponent,
} from "#/models/data-components/common/text.ts";

export const Schema$CustomNameComponent = z.compile(
  z.union([
    z.object({ "minecraft:custom_name": Schema$TextComponent }).readonly(),
    z.object({ "!minecraft:custom_name": z.object({}).readonly() }).readonly(),
  ]),
);

export type Type$CustomNameComponent = z.output<
  typeof Schema$CustomNameComponent
>;

export interface Configurator$CustomNameComponent {
  text(configure: (builder: Configurator$TextComponent) => void): void;
  disabled(): void;
}

export class Builder$CustomNameComponent implements Configurator$CustomNameComponent {
  private value?: Type$CustomNameComponent;

  text(configure: (builder: Configurator$TextComponent) => void) {
    const builder = new Builder$TextComponent();
    configure(builder);
    const value = builder.build();
    this.value = { "minecraft:custom_name": value };
  }

  disabled() {
    this.value = { "!minecraft:custom_name": {} };
  }

  build() {
    return Schema$CustomNameComponent.parse(this.value);
  }
}
