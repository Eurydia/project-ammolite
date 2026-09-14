import type { ConsumableComponentType } from "#/models/data-components/consumable.ts";
import type { CustomNameComponentType } from "#/models/data-components/custom-name.ts";
import type { DamageResistantComponentType } from "#/models/data-components/damage-resistant.ts";
import type { DeathProtectionComponentType } from "#/models/data-components/death-protection.ts";
import type { EnchantmentGlintOverrideComponentType } from "#/models/data-components/enchantment-glint-override.ts";
import type { ItemNameComponentType } from "#/models/data-components/item-name.ts";
import type { LoreComponentType } from "#/models/data-components/lore.ts";
import type { PotionContentsComponentType } from "#/models/data-components/potion-contents.ts";
import type { PotionDurationScaleComponentType } from "#/models/data-components/potion-duration-scale.ts";
import type { RarityComponentType } from "#/models/data-components/rarity.ts";
import type { SuspiciousStewEffectsComponentType } from "#/models/data-components/suspicious-stew-effects.ts";

type UnionToIntersection<T> = (
  T extends unknown ? (value: T) => void : never
) extends (value: infer Intersection) => void ? Intersection : never;

type IndividualDataComponentType =
  | ConsumableComponentType
  | CustomNameComponentType
  | DamageResistantComponentType
  | DeathProtectionComponentType
  | EnchantmentGlintOverrideComponentType
  | ItemNameComponentType
  | LoreComponentType
  | PotionContentsComponentType
  | PotionDurationScaleComponentType
  | RarityComponentType
  | SuspiciousStewEffectsComponentType;

export type DataComponentType = Readonly<
  Partial<UnionToIntersection<IndividualDataComponentType>>
>;

export const DataComponent = {
  from(...components: ReadonlyArray<DataComponentType>): DataComponentType {
    return Object.assign({}, ...components);
  },
};
