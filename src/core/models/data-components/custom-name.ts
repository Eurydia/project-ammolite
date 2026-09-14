import type { TextComponentType } from "#/models/data-components/common/text.ts";

export type CustomNameComponentType = Readonly<
  | { "!minecraft:custom_name": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:custom_name": TextComponentType }
>;

export const CustomNameComponent = {
  from({ text }: { text: TextComponentType }): CustomNameComponentType {
    return { "minecraft:custom_name": text };
  },
  negated(): CustomNameComponentType {
    return { "!minecraft:custom_name": {} };
  },
};
