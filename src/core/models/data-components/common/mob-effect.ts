import { NumberBound } from "#/models/snbt/number-bound.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

export type MobEffectComponentType = Readonly<{
  id: string;
  duration?: number;
  amplifier?: number;
  visible?: boolean;
  ambient?: boolean;
  show_icon?: boolean;
  show_particles?: boolean;
}>;

export const MobEffectComponent = {
  from({
    duration,
    amplifier,
    id,
    visible,
    ambient,
    showIcon,
    showParticles,
  }: {
    id: string;
    duration?: number;
    amplifier?: number;
    visible?: boolean;
    ambient?: boolean;
    showIcon?: boolean;
    showParticles?: boolean;
  }): MobEffectComponentType {
    return Object.freeze({
      id,
      duration: keepUndefinedOrTransform(
        duration,
        (val) => NumberBound.integer(val),
      ),
      amplifier: keepUndefinedOrTransform(
        amplifier,
        (val) => NumberBound.byte(val),
      ),
      visible,
      ambient,
      show_icon: showIcon,
      show_particles: showParticles,
    });
  },
};
