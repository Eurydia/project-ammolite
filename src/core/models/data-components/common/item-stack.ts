import type { DataComponentType } from "#/models/data-components/data-component.ts";

export type ItemStackType = Readonly<{
  id: string;
  count?: number;
  components?: DataComponentType;
}>;

export const ItemStack = {
  from({
    id,
    count,
    components,
  }: {
    id: string;
    count?: number;
    components?: DataComponentType;
  }): ItemStackType {
    return Object.freeze({ id, count, components });
  },
};
