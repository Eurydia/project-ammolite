import { SuspiciousStewEffectType } from "#/models/data-components/common/suspicious-stew-effect.ts";

export type SuspiciousStewEffectsComponentType = Readonly<
  | {
    "!minecraft:suspicious_stew_effects": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | {
    "minecraft:suspicious_stew_effects": ReadonlyArray<
      SuspiciousStewEffectType
    >;
  }
>;

export const SuspiciousStewEffectsComponent = {
  from(
    ...effects: Array<SuspiciousStewEffectType>
  ): SuspiciousStewEffectsComponentType {
    return Object.freeze({
      "minecraft:suspicious_stew_effects": Object.freeze([...effects]),
    });
  },
  negated(): SuspiciousStewEffectsComponentType {
    return Object.freeze({
      "!minecraft:suspicious_stew_effects": Object.freeze({}),
    });
  },
};
