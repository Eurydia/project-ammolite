import z from "zod";
import {
  type Type$ConsumeEffect,
  Schema$ConsumeEffect,
} from "#/models/data-components/common/consume-effect.ts";

export const Schema$DeathProtectionComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:death_protection": z
          .object({
            death_effects: Schema$ConsumeEffect.array().readonly(),
          })
          .readonly(),
      })
      .readonly(),
    z
      .object({ "!minecraft:death_protection": z.object({}).readonly() })
      .readonly(),
  ]),
);

export type Type$DeathProtectionComponent = z.output<
  typeof Schema$DeathProtectionComponent
>;

export interface Configurator$DeathProtectionComponent {
  effects(...configureFns: Array<() => void>): void;
}

export class Builder$DeathProtectionComponent implements Configurator$DeathProtectionComponent {
  private value?: Type$DeathProtectionComponent;

  effects(
    ...configureFns: Array<
      (builder: Configurator$Consu) => void
    >
  ) {
    this.value = {
      "minecraft:death_protection": { death_effects: configureFns.map((configure) => {
        const 
      }) },
    };
  }

  disabled() {
    this.value = { "!minecraft:death_protection": {} };
  }

  build() {
    return Schema$DeathProtectionComponent.parse(this.value);
  }
}
