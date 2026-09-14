import type { TextComponentType } from "#/models/data-components/common/text.ts";

export type LoreComponentType = Readonly<
  | { "!minecraft:lore": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:lore": ReadonlyArray<TextComponentType> }
>;

export const LoreComponent = {
  from(...lines: Array<TextComponentType>): LoreComponentType {
    if (lines.length > 256) {
      throw new Error("Minecraft lore supports at most 256 lines.");
    }

    return Object.freeze({ "minecraft:lore": Object.freeze([...lines]) });
  },
  negated(): LoreComponentType {
    return Object.freeze({ "!minecraft:lore": Object.freeze({}) });
  },
};
