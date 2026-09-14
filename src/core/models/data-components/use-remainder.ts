import {
  ItemStack,
  type ItemStackInput,
  type ItemStackType,
} from "#/models/data-components/common/item-stack.ts";

export type UseRemainderComponentType = Readonly<
  | { "!minecraft:use_remainder": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:use_remainder": ItemStackType;
  }
>;

export const UseRemainderComponent = {
  from({
    id,
    count,
    components,
  }: ItemStackInput): UseRemainderComponentType {
    return Object.freeze({
      "minecraft:use_remainder": ItemStack.from({ id, count, components }),
    });
  },
  negated(): UseRemainderComponentType {
    return Object.freeze({ "!minecraft:use_remainder": Object.freeze({}) });
  },
};
