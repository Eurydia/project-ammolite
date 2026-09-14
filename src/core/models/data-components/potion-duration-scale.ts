import { NumberBound } from "#/models/snbt/number-bound.ts";

export type PotionDurationScaleComponentType = Readonly<
  | {
    "!minecraft:potion_duration_scale": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | { "minecraft:potion_duration_scale": number }
>;

export const PotionDurationScaleComponent = {
  from(value: number): PotionDurationScaleComponentType {
    return Object.freeze({
      "minecraft:potion_duration_scale": NumberBound.float(value, 0),
    });
  },
  negated(): PotionDurationScaleComponentType {
    return Object.freeze({
      "!minecraft:potion_duration_scale": Object.freeze({}),
    });
  },
};
