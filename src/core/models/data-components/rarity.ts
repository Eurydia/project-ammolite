import { ItemRarity } from "#/enum/item-rarity.ts";

export type RarityComponentType = Readonly<
  | { "!minecraft:rarity": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:rarity": ItemRarity }
>;

export const RarityComponent = {
  from(rarity: ItemRarity): RarityComponentType {
    return Object.freeze({ "minecraft:rarity": rarity });
  },
  negated(): RarityComponentType {
    return Object.freeze({ "!minecraft:rarity": Object.freeze({}) });
  },
};
