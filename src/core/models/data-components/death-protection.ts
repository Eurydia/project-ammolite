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
  from(
    ...deathEffects: Array<ConsumeEffectType>
  ): DeathProtectionComponentType {
    return Object.freeze({
      "minecraft:death_protection": Object.freeze({
        death_effects: Object.freeze([...deathEffects]),
      }),
    });
  },
  negated(): DeathProtectionComponentType {
    return Object.freeze({
      "!minecraft:death_protection": Object.freeze({}),
    });
  },
};
