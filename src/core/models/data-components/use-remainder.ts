import z from "zod";
import {
  Builder$ItemStackComponent,
  Configurator$ItemStackComponent,
  Schema$ItemStackComponent,
} from "#/models/data-components/common/item-stack.ts";

export const Schema$UseRemainderComponent = z.compile(
  z.union([
    z
      .object({ "minecraft:use_remainder": Schema$ItemStackComponent })
      .readonly(),
    z
      .object({ "!minecraft:use_remainder": z.object({}).readonly() })
      .readonly(),
  ]),
);

export type Type$UseRemainderComponent = z.output<
  typeof Schema$UseRemainderComponent
>;

export interface Configurator$UseRemainderComponent {
  disabled(): void;
  item(configFn: (configurator: Configurator$ItemStackComponent) => void): void;
}

export class Builder$UseRemainderComponent implements Configurator$UseRemainderComponent {
  private value?: Type$UseRemainderComponent;
  item(configFn: (configurator: Configurator$ItemStackComponent) => void) {
    const builder = new Builder$ItemStackComponent();
    configFn(builder);
    this.value = {
      "minecraft:use_remainder": builder.build(),
    };
  }
  disabled() {
    this.value = { "!minecraft:use_remainder": {} };
  }
  build() {
    return Schema$UseRemainderComponent.parse(this.value);
  }
}
