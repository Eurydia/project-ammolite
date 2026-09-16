import {
  ItemStack,
  type ItemStackType,
} from "#/models/data-components/common/item-stack.ts";
import { DataComponentType } from "#/models/data-components/data-component.ts";

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
  }: {
    id: string;
    count?: number;
    components?: DataComponentType;
  }): UseRemainderComponentType {
    return Object.freeze({
      "minecraft:use_remainder": ItemStack.__from({ id, count, components }),
    });
  },
  negated(): UseRemainderComponentType {
    return Object.freeze({ "!minecraft:use_remainder": Object.freeze({}) });
  },
};
