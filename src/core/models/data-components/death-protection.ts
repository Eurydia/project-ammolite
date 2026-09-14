import type { ConsumeEffectType } from "#/models/data-components/common/consume-effect.ts";

export type DeathProtectionComponentType = Readonly<
  | { "!minecraft:death_protection": Readonly<Record<PropertyKey, never>> }
  | {
    "minecraft:death_protection": Readonly<{
      death_effects: ReadonlyArray<ConsumeEffectType>;
    }>;
  }
>;

export const DeathProtectionComponent = {
  from({
    deathEffects,
  }: {
    deathEffects: ReadonlyArray<ConsumeEffectType>;
  }): DeathProtectionComponentType {
    return { "minecraft:death_protection": { death_effects: deathEffects } };
  },
  negated(): DeathProtectionComponentType {
    return { "!minecraft:death_protection": {} };
  },
};
