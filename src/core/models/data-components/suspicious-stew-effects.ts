import { MobEffects } from "#/enum/mob-effects.ts";

export type SuspiciousStewEffectsComponentType = Readonly<
  | {
    "!minecraft:suspicious_stew_effects": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | {
    "minecraft:suspicious_stew_effects": ReadonlyArray<
      Readonly<{ id: MobEffects; duration?: number }>
    >;
  }
>;

export const SuspiciousStewEffectsComponent = {
  from({
    effects,
  }: {
    effects: ReadonlyArray<Readonly<{ id: MobEffects; duration?: number }>>;
  }): SuspiciousStewEffectsComponentType {
    return { "minecraft:suspicious_stew_effects": effects };
  },
  negated(): SuspiciousStewEffectsComponentType {
    return { "!minecraft:suspicious_stew_effects": {} };
  },
};
