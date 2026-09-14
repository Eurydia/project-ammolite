import { MobEffects } from "#/enum/mob-effects.ts";

export type SuspiciousStewEffectType = Readonly<{
  id: MobEffects;
  duration?: number;
}>;

export const SuspiciousStewEffect = {
  from(id: MobEffects, duration?: number): SuspiciousStewEffectType {
    return Object.freeze({ id, duration });
  },
};
