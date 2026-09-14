import type { DataComponentType } from "#/models/data-components/data-component.ts";

export type ItemStackInput = {
  id: string;
  count?: number;
  components?: DataComponentType;
};

export type ItemStackType = Readonly<ItemStackInput>;

export const ItemStack = {
  from({ id, count, components }: ItemStackInput): ItemStackType {
    return Object.freeze({ id, count, components });
  },
};
