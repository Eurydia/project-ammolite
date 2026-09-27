import {
  Builder$ConsumableComponent,
  Configurator$ConsumableComponent,
  Schema$ConsumableComponent,
} from "#/models/data-components/consumable.ts";
import {
  Builder$CustomNameComponent,
  Configurator$CustomNameComponent,
  Schema$CustomNameComponent,
} from "#/models/data-components/custom-name.ts";
import {
  Builder$DamageResistantComponent,
  Configurator$DamageResistantComponent,
  Schema$DamageResistantComponent,
} from "#/models/data-components/damage-resistant.ts";
import {
  Builder$DeathProtectionComponent,
  Configurator$DeathProtectionComponent,
  Schema$DeathProtectionComponent,
} from "#/models/data-components/death-protection.ts";
import {
  Builder$EnchantmentGlintOverrideComponent,
  Configurator$EnchantmentGlintOverrideComponent,
  Schema$EnchantmentGlintOverrideComponent,
} from "#/models/data-components/enchantment-glint-override.ts";
import {
  Builder$ItemNameComponent,
  Configurator$ItemNameComponent,
  Schema$ItemNameComponent,
} from "#/models/data-components/item-name.ts";
import {
  Builder$LoreComponent,
  Configurator$LoreComponent,
  Schema$LoreComponent,
} from "#/models/data-components/lore.ts";
import {
  Builder$PotionContentsComponent,
  Configurator$PotionContentsComponent,
  Schema$PotionContentsComponent,
} from "#/models/data-components/potion-contents.ts";
import {
  Builder$PotionDurationScaleComponent,
  Configurator$PotionDurationScaleComponent,
  Schema$PotionDurationScaleComponent,
} from "#/models/data-components/potion-duration-scale.ts";
import {
  Builder$RarityComponent,
  Configurator$RarityComponent,
  Schema$RarityComponent,
} from "#/models/data-components/rarity.ts";
import {
  Builder$SuspiciousStewEffectsComponent,
  Configurator$SuspiciousStewEffectsComponent,
  Schema$SuspiciousStewEffectsComponent,
} from "#/models/data-components/suspicious-stew-effects.ts";
import {
  Builder$UseRemainderComponent,
  Configurator$UseRemainderComponent,
  Schema$UseRemainderComponent,
} from "#/models/data-components/use-remainder.ts";
import z from "zod";

type ComponentSchema<
  A extends z.ZodRawShape,
  B extends z.ZodRawShape,
> = z.ZodUnion<
  readonly [z.ZodReadonly<z.ZodObject<A>>, z.ZodReadonly<z.ZodObject<B>>]
>;

function optionalComponent<
  const A extends z.ZodRawShape,
  const B extends z.ZodRawShape,
>(component: ComponentSchema<A, B>) {
  const [active, removed] = component.options;

  return active.unwrap().extend(removed.unwrap().shape).exactPartial();
}

export const Schema$DataComponent = z.compile(
  optionalComponent(Schema$ConsumableComponent)
    .and(optionalComponent(Schema$CustomNameComponent))
    .and(optionalComponent(Schema$DamageResistantComponent))
    .and(optionalComponent(Schema$DeathProtectionComponent))
    .and(optionalComponent(Schema$EnchantmentGlintOverrideComponent))
    .and(optionalComponent(Schema$ItemNameComponent))
    .and(optionalComponent(Schema$LoreComponent))
    .and(optionalComponent(Schema$PotionContentsComponent))
    .and(optionalComponent(Schema$PotionDurationScaleComponent))
    .and(optionalComponent(Schema$RarityComponent))
    .and(optionalComponent(Schema$SuspiciousStewEffectsComponent))
    .and(optionalComponent(Schema$UseRemainderComponent))
    .readonly(),
);

export type Type$DataComponent = z.output<typeof Schema$DataComponent>;
export interface Configurator$DataComponent {
  consumable(
    configFn: (configurator: Configurator$ConsumableComponent) => void,
  ): Configurator$DataComponent;

  customName(
    configFn: (configurator: Configurator$CustomNameComponent) => void,
  ): Configurator$DataComponent;

  damageResistant(
    configFn: (configurator: Configurator$DamageResistantComponent) => void,
  ): Configurator$DataComponent;

  deathProtection(
    configFn: (configurator: Configurator$DeathProtectionComponent) => void,
  ): Configurator$DataComponent;

  enchantmentGlintOverride(
    configFn: (
      configurator: Configurator$EnchantmentGlintOverrideComponent,
    ) => void,
  ): Configurator$DataComponent;

  itemName(
    configFn: (configurator: Configurator$ItemNameComponent) => void,
  ): Configurator$DataComponent;

  lore(
    configFn: (configurator: Configurator$LoreComponent) => void,
  ): Configurator$DataComponent;

  potionContents(
    configFn: (configurator: Configurator$PotionContentsComponent) => void,
  ): Configurator$DataComponent;

  potionDurationScale(
    configFn: (configurator: Configurator$PotionDurationScaleComponent) => void,
  ): Configurator$DataComponent;

  rarity(
    configFn: (configurator: Configurator$RarityComponent) => void,
  ): Configurator$DataComponent;

  suspiciousStewEffects(
    configFn: (
      configurator: Configurator$SuspiciousStewEffectsComponent,
    ) => void,
  ): Configurator$DataComponent;

  useRemainder(
    configFn: (configurator: Configurator$UseRemainderComponent) => void,
  ): Configurator$DataComponent;
}

export class Builder$DataComponent implements Configurator$DataComponent {
  private value: z.input<typeof Schema$DataComponent> = {};

  consumable(
    configFn: (configurator: Configurator$ConsumableComponent) => void,
  ) {
    const builder = new Builder$ConsumableComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  customName(
    configFn: (configurator: Configurator$CustomNameComponent) => void,
  ) {
    const builder = new Builder$CustomNameComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  damageResistant(
    configFn: (configurator: Configurator$DamageResistantComponent) => void,
  ) {
    const builder = new Builder$DamageResistantComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  deathProtection(
    configFn: (configurator: Configurator$DeathProtectionComponent) => void,
  ) {
    const builder = new Builder$DeathProtectionComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  enchantmentGlintOverride(
    configFn: (
      configurator: Configurator$EnchantmentGlintOverrideComponent,
    ) => void,
  ) {
    const builder = new Builder$EnchantmentGlintOverrideComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  itemName(configFn: (configurator: Configurator$ItemNameComponent) => void) {
    const builder = new Builder$ItemNameComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  lore(configFn: (configurator: Configurator$LoreComponent) => void) {
    const builder = new Builder$LoreComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  potionContents(
    configFn: (configurator: Configurator$PotionContentsComponent) => void,
  ) {
    const builder = new Builder$PotionContentsComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  potionDurationScale(
    configFn: (configurator: Configurator$PotionDurationScaleComponent) => void,
  ) {
    const builder = new Builder$PotionDurationScaleComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  rarity(configFn: (configurator: Configurator$RarityComponent) => void) {
    const builder = new Builder$RarityComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  suspiciousStewEffects(
    configFn: (
      configurator: Configurator$SuspiciousStewEffectsComponent,
    ) => void,
  ) {
    const builder = new Builder$SuspiciousStewEffectsComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  useRemainder(
    configFn: (configurator: Configurator$UseRemainderComponent) => void,
  ) {
    const builder = new Builder$UseRemainderComponent();
    configFn(builder);
    Object.assign(this.value, builder.build());

    return this;
  }

  build() {
    return Schema$DataComponent.parse(this.value);
  }
}
