export type DamageResistantComponentType = Readonly<
  | { "!minecraft:damage_resistant": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:damage_resistant": Readonly<{
      types: ReadonlyArray<string>;
    }>;
  }
>;

export const DamageResistantComponent = {
  from({
    types,
  }: {
    types: ReadonlyArray<string>;
  }): DamageResistantComponentType {
    return { "minecraft:damage_resistant": { types } };
  },
  negated(): DamageResistantComponentType {
    return { "!minecraft:damage_resistant": {} };
  },
};
