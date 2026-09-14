export type DamageResistantComponentType = Readonly<
  | { "!minecraft:damage_resistant": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:damage_resistant": Readonly<{
      types: string | ReadonlyArray<string>;
    }>;
  }
>;

export const DamageResistantComponent = {
  from(...types: Array<string>): DamageResistantComponentType {
    return Object.freeze({
      "minecraft:damage_resistant": Object.freeze({
        types: Object.freeze(types),
      }),
    });
  },
  negated(): DamageResistantComponentType {
    return Object.freeze({
      "!minecraft:damage_resistant": Object.freeze({}),
    });
  },
};
