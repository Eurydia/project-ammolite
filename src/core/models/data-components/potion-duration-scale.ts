export type PotionDurationScaleComponentType = Readonly<
  | {
    "!minecraft:potion_duration_scale": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | { "minecraft:potion_duration_scale": number }
>;

export const PotionDurationScaleComponent = {
  from({ value }: { value: number }): PotionDurationScaleComponentType {
    return { "minecraft:potion_duration_scale": value };
  },
  negated(): PotionDurationScaleComponentType {
    return { "!minecraft:potion_duration_scale": {} };
  },
};
