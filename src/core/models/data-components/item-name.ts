import z from "zod";
import {
  Schema$TextComponent,
  type TextComponentType,
} from "#/models/data-components/common/text.ts";

export const Schema$ItemNameComponent = z.compile(
  z.union([
    z.object({ "minecraft:item_name": Schema$TextComponent }).readonly(),
    z.object({ "!minecraft:item_name": z.object({}).readonly() }).readonly(),
  ]),
);

export type ItemNameComponentType = z.output<typeof Schema$ItemNameComponent>;
export type Type$ItemNameComponent = ItemNameComponentType;
export interface Configurator$ItemNameComponent {
  text(value: TextComponentType): void;
  disabled(): void;
}

export class Builder$ItemNameComponent
  implements Configurator$ItemNameComponent {
  private value?: ItemNameComponentType;

  text(value: TextComponentType) {
    this.value = { "minecraft:item_name": value };
  }

  disabled() {
    this.value = { "!minecraft:item_name": {} };
  }

  build() {
    return Schema$ItemNameComponent.parse(this.value);
  }
}

export const ItemNameComponent = {
  builder: () => new Builder$ItemNameComponent(),
  from(text: TextComponentType) {
    return Schema$ItemNameComponent.parse({ "minecraft:item_name": text });
  },
  negated() {
    return Schema$ItemNameComponent.parse({ "!minecraft:item_name": {} });
  },
};
