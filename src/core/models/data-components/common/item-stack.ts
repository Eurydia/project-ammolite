import type { DataComponentType } from "#/models/data-components/data-component.ts";

export type ItemStackType = Readonly<{
  id: string;
  count?: number;
  components?: DataComponentType;
}>;

export const ItemStack = {
  __from<T, K>(
    picker: (data: T) => {
      id: string;
      count?: number;
      components?: DataComponentType;
    },
    transformer: (value: ItemStackType) => K,
  ) {
    return (data: T) => {
      const { id, components, count } = picker(data);
      return transformer(Object.freeze({ id, count, components }));
    };
  },
};
