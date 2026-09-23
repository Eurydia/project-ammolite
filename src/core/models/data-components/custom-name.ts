import z from "zod";
import {
  Schema$TextComponent,
  type TextComponentType,
} from "#/models/data-components/common/text.ts";

export const Schema$CustomNameComponent = z.compile(
  z.union([
    z.object({ "minecraft:custom_name": Schema$TextComponent }).readonly(),
    z.object({ "!minecraft:custom_name": z.object({}).readonly() }).readonly(),
  ]),
);

export type CustomNameComponentType = z.output<
  typeof Schema$CustomNameComponent
>;
export type Type$CustomNameComponent = CustomNameComponentType;
export interface Configurator$CustomNameComponent {
  text(value: TextComponentType): void;
  disabled(): void;
}

export class Builder$CustomNameComponent
  implements Configurator$CustomNameComponent {
  private value?: CustomNameComponentType;

  text(value: TextComponentType) {
    this.value = { "minecraft:custom_name": value };
  }

  disabled() {
    this.value = { "!minecraft:custom_name": {} };
  }

  build() {
    return Schema$CustomNameComponent.parse(this.value);
  }
}

export const CustomNameComponent = {
  builder: () => new Builder$CustomNameComponent(),
  from(text: TextComponentType) {
    return Schema$CustomNameComponent.parse({ "minecraft:custom_name": text });
  },
  negated() {
    return Schema$CustomNameComponent.parse({ "!minecraft:custom_name": {} });
  },
};
