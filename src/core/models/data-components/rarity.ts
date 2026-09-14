import { ItemRarity } from "#/enum/item-rarity.ts";

export type RarityComponentType = Readonly<
  | { "!minecraft:rarity": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:rarity": ItemRarity }
>;

export const RarityComponent = {
  from({ rarity }: { rarity: ItemRarity }): RarityComponentType {
    return { "minecraft:rarity": rarity };
  },
  negated(): RarityComponentType {
    return { "!minecraft:rarity": {} };
  },
};
