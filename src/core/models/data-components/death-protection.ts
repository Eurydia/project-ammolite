import z from "zod";
import {
  Builder$ConsumeEffectComponent,
  Configurator$ConsumeEffectComponent,
  Schema$ConsumeEffectComponent,
} from "#/models/data-components/common/consume-effect.ts";

export const Schema$DeathProtectionComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:death_protection": z
          .object({
            death_effects: Schema$ConsumeEffectComponent.array().readonly(),
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
  effects(
    ...configureFns: Array<
      (builder: Configurator$ConsumeEffectComponent) => void
    >
  ): void;
  disabled(): void;
}

export class Builder$DeathProtectionComponent implements Configurator$DeathProtectionComponent {
  private value?: Type$DeathProtectionComponent;

  effects(
    ...configureFns: Array<
      (builder: Configurator$ConsumeEffectComponent) => void
    >
  ) {
    this.value = {
      "minecraft:death_protection": {
        death_effects: configureFns.map((configure) => {
          const builder = new Builder$ConsumeEffectComponent();
          configure(builder);
          return builder.build();
        }),
      },
    };
  }

  disabled() {
    this.value = { "!minecraft:death_protection": {} };
  }

  build() {
    return Schema$DeathProtectionComponent.parse(this.value);
  }
}
