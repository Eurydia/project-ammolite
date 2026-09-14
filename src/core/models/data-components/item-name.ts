import type { TextComponentType } from "#/models/data-components/common/text.ts";

export type ItemNameComponentType = Readonly<
  | { "!minecraft:item_name": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:item_name": TextComponentType }
>;

export const ItemNameComponent = {
  from({ text }: { text: TextComponentType }): ItemNameComponentType {
    return { "minecraft:item_name": text };
  },
  negated(): ItemNameComponentType {
    return { "!minecraft:item_name": {} };
  },
};
