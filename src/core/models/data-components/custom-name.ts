import type { TextComponentType } from "#/models/data-components/common/text.ts";

export type CustomNameComponentType = Readonly<
  | { "!minecraft:custom_name": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:custom_name": TextComponentType }
>;

export const CustomNameComponent = {
  from(text: TextComponentType): CustomNameComponentType {
    return Object.freeze({ "minecraft:custom_name": text });
  },
  negated(): CustomNameComponentType {
    return Object.freeze({ "!minecraft:custom_name": Object.freeze({}) });
  },
};
