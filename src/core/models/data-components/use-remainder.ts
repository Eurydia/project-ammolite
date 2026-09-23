import z from "zod";
import {
  ItemStack,
  type ItemStackInput,
  type ItemStackType,
  Schema$ItemStack,
} from "#/models/data-components/common/item-stack.ts";

export const Schema$UseRemainderComponent = z.compile(
  z.union([
    z.object({ "minecraft:use_remainder": Schema$ItemStack }).readonly(),
    z.object({ "!minecraft:use_remainder": z.object({}).readonly() })
      .readonly(),
  ]),
);
export type UseRemainderComponentType = z.output<
  typeof Schema$UseRemainderComponent
>;
export type Type$UseRemainderComponent = UseRemainderComponentType;

export class Builder$UseRemainderComponent {
  private stack?: ItemStackType;
  private isDisabled = false;
  itemStack(value: ItemStackInput) {
    this.stack = ItemStack.from(value);
    return this;
  }
  item(
    id: string,
    configure?: (builder: ReturnType<typeof ItemStack.builder>) => void,
  ) {
    const builder = ItemStack.builder().id(id);
    configure?.(builder);
    this.stack = builder.build();
    return this;
  }
  disabled() {
    this.isDisabled = true;
  }
  build() {
    return this.isDisabled
      ? Schema$UseRemainderComponent.parse({ "!minecraft:use_remainder": {} })
      : Schema$UseRemainderComponent.parse({
        "minecraft:use_remainder": this.stack,
      });
  }
}

export const UseRemainderComponent = {
  builder: () => new Builder$UseRemainderComponent(),
  from(value: ItemStackInput) {
    return Schema$UseRemainderComponent.parse({
      "minecraft:use_remainder": ItemStack.from(value),
    });
  },
  negated() {
    return Schema$UseRemainderComponent.parse({
      "!minecraft:use_remainder": {},
    });
  },
};
