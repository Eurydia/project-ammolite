import type { ConsumableComponentType } from "#/models/data-components/consumable.ts";
import type { CustomNameComponentType } from "#/models/data-components/custom-name.ts";
import type { DamageResistantComponentType } from "#/models/data-components/damage-resistant.ts";
import type { DeathProtectionComponentType } from "#/models/data-components/death-protection.ts";
import type { Type$EnchantmentGlintOverrideComponent } from "#/models/data-components/enchantment-glint-override.ts";
import type { ItemNameComponentType } from "#/models/data-components/item-name.ts";
import type { LoreComponentType } from "#/models/data-components/lore.ts";
import type { PotionContentsComponentType } from "#/models/data-components/potion-contents.ts";
import type { Type$PotionDurationScaleComponent } from "#/models/data-components/potion-duration-scale.ts";
import type { Type$RarityComponent } from "#/models/data-components/rarity.ts";
import type { Type$SuspiciousStewEffectsComponent } from "#/models/data-components/suspicious-stew-effects.ts";
import type { UseRemainderComponentType } from "#/models/data-components/use-remainder.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

type UnionToIntersection<T> = (
  T extends unknown ? (value: T) => void : never
) extends (value: infer Intersection) => void
  ? Intersection
  : never;

type IndividualDataComponentType =
  | ConsumableComponentType
  | CustomNameComponentType
  | DamageResistantComponentType
  | DeathProtectionComponentType
  | Type$EnchantmentGlintOverrideComponent
  | ItemNameComponentType
  | LoreComponentType
  | PotionContentsComponentType
  | Type$PotionDurationScaleComponent
  | Type$RarityComponent
  | Type$SuspiciousStewEffectsComponent
  | UseRemainderComponentType;

export type DataComponentType = Readonly<
  Partial<UnionToIntersection<IndividualDataComponentType>>
>;

export type DataComponentInput =
  | DataComponentType
  | DataPackModel<DataComponentType>;
export type DataComponentValue = DataComponentInput;

export class DataComponentData implements DataPackModel<DataComponentType> {
  public readonly components: ReadonlyArray<DataComponentInput>;

  public constructor(components: ReadonlyArray<DataComponentInput>) {
    this.components = freezeArray(components);
    freezeDataClass(this);
  }

  public asJsonObject(): DataComponentType {
    return Object.freeze(
      Object.assign(
        {},
        ...this.components.map((component) => toDataPackObject(component)),
      ),
    );
  }
}

export interface DataComponentBuilderConfigurator {
  component(value: DataComponentInput): DataComponentBuilderConfigurator;
}

export class DataComponentBuilder implements DataComponentBuilderConfigurator {
  private readonly componentValues: Array<DataComponentInput> = [];

  public component(value: DataComponentInput): this {
    this.componentValues.push(value);
    return this;
  }

  public build(): Readonly<DataComponentData> {
    return freezeDataClass(new DataComponentData(this.componentValues));
  }
}

export const DataComponent = {
  builder(): DataComponentBuilder {
    return new DataComponentBuilder();
  },
  from(...components: Array<DataComponentInput>): DataComponentType {
    return Object.freeze(
      Object.assign(
        {},
        ...components.map((component) => toDataPackObject(component)),
      ),
    );
  },
};
