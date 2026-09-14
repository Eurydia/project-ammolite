import { MobEffectComponentType } from "#/models/data-components/common/mob-effect.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

export type PotionContentsComponentType = Readonly<
  | {
    "!minecraft:potion_contents": Readonly<Record<PropertyKey, never>>;
  }
  | {
    "minecraft:potion_contents": Readonly<{
      potion?: string;
      custom_name?: string;
      custom_color?: number;
      custom_effects?: ReadonlyArray<MobEffectComponentType>;
    }>;
  }
>;

export const PotionContentsComponent = {
  from({
    customColor,
    customEffects,
    customName,
    potion,
  }: {
    potion?: string;
    customName?: string;
    customColor?: string;
    customEffects?: ReadonlyArray<MobEffectComponentType>;
  }): PotionContentsComponentType {
    return {
      "minecraft:potion_contents": {
        potion,
        custom_name: customName,
        custom_effects: customEffects,
        custom_color: keepUndefinedOrTransform(customColor, (val) => {
          return Number.parseInt(val.slice(1), 16);
        }),
      },
    };
  },
  negated(): PotionContentsComponentType {
    return { "!minecraft:potion_contents": {} };
  },
};
