export type EnchantmentGlintOverrideComponentType = Readonly<
  | {
    "!minecraft:enchantment_glint_override": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | { "minecraft:enchantment_glint_override": boolean }
>;

export const EnchantmentGlintOverrideComponent = {
  from({ value }: { value: boolean }): EnchantmentGlintOverrideComponentType {
    return { "minecraft:enchantment_glint_override": value };
  },
  negated(): EnchantmentGlintOverrideComponentType {
    return { "!minecraft:enchantment_glint_override": {} };
  },
};
