import z from "zod";
import {
  type ConsumeEffectType,
  Schema$ConsumeEffect,
} from "#/models/data-components/common/consume-effect.ts";

export const Schema$DeathProtectionComponent = z.compile(
  z.union([
    z.object({
      "minecraft:death_protection": z.object({
        death_effects: Schema$ConsumeEffect.array().readonly(),
      }).readonly(),
    }).readonly(),
    z.object({ "!minecraft:death_protection": z.object({}).readonly() })
      .readonly(),
  ]),
);
export type DeathProtectionComponentType = z.output<
  typeof Schema$DeathProtectionComponent
>;
export type Type$DeathProtectionComponent = DeathProtectionComponentType;

export interface Configurator$DeathProtectionComponent {
  effect(value: ConsumeEffectType): Configurator$DeathProtectionComponent;
}

class Builder$DeathEffects implements Configurator$DeathProtectionComponent {
  private readonly values: ConsumeEffectType[] = [];
  effect(value: ConsumeEffectType) {
    this.values.push(value);
    return this;
  }
  build() {
    return this.values;
  }
}

export class Builder$DeathProtectionComponent {
  private value?: DeathProtectionComponentType;
  effects(configure: (builder: Configurator$DeathProtectionComponent) => void) {
    const builder = new Builder$DeathEffects();
    configure(builder);
    this.value = Schema$DeathProtectionComponent.parse({
      "minecraft:death_protection": { death_effects: builder.build() },
    });
  }
  disabled() {
    this.value = { "!minecraft:death_protection": {} };
  }
  build() {
    return Schema$DeathProtectionComponent.parse(this.value);
  }
}

export const DeathProtectionComponent = {
  builder: () => new Builder$DeathProtectionComponent(),
  from(...deathEffects: ConsumeEffectType[]) {
    return Schema$DeathProtectionComponent.parse({
      "minecraft:death_protection": { death_effects: deathEffects },
    });
  },
  negated() {
    return Schema$DeathProtectionComponent.parse({
      "!minecraft:death_protection": {},
    });
  },
};
