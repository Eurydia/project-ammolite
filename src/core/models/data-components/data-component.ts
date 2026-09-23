import type { Type$ConsumableComponent } from "#/models/data-components/consumable.ts";
import type { Type$CustomNameComponent } from "#/models/data-components/custom-name.ts";
import type { Type$DamageResistantComponent } from "#/models/data-components/damage-resistant.ts";
import type { Type$DeathProtectionComponent } from "#/models/data-components/death-protection.ts";
import type { Type$EnchantmentGlintOverrideComponent } from "#/models/data-components/enchantment-glint-override.ts";
import type { Type$ItemNameComponent } from "#/models/data-components/item-name.ts";
import type { Type$LoreComponent } from "#/models/data-components/lore.ts";
import type { Type$PotionContentsComponent } from "#/models/data-components/potion-contents.ts";
import type { Type$PotionDurationScaleComponent } from "#/models/data-components/potion-duration-scale.ts";
import type { Type$RarityComponent } from "#/models/data-components/rarity.ts";
import type { Type$SuspiciousStewEffectsComponent } from "#/models/data-components/suspicious-stew-effects.ts";
import type { Type$UseRemainderComponent } from "#/models/data-components/use-remainder.ts";

type UnionToIntersection<T> = (
  T extends unknown ? (value: T) => void : never
) extends (value: infer Intersection) => void ? Intersection
  : never;

type IndividualDataComponentType =
  | Type$ConsumableComponent
  | Type$CustomNameComponent
  | Type$DamageResistantComponent
  | Type$DeathProtectionComponent
  | Type$EnchantmentGlintOverrideComponent
  | Type$ItemNameComponent
  | Type$LoreComponent
  | Type$PotionContentsComponent
  | Type$PotionDurationScaleComponent
  | Type$RarityComponent
  | Type$SuspiciousStewEffectsComponent
  | Type$UseRemainderComponent;

export type DataComponentType = Readonly<
  Partial<UnionToIntersection<IndividualDataComponentType>>
>;

export type DataComponentInput = DataComponentType;
export type DataComponentValue = DataComponentInput;

export interface Configurator$DataComponent {
  component(value: DataComponentInput): Configurator$DataComponent;
}

export class Builder$DataComponent implements Configurator$DataComponent {
  private readonly componentValues: Array<DataComponentInput> = [];

  public component(value: DataComponentInput): this {
    this.componentValues.push(value);
    return this;
  }

  public build(): DataComponentType {
    return DataComponent.from(...this.componentValues);
  }
}

export const DataComponent = {
  builder(): Builder$DataComponent {
    return new Builder$DataComponent();
  },
  from(...components: Array<DataComponentInput>): DataComponentType {
    return Object.freeze(
      Object.assign({}, ...components),
    );
  },
};
