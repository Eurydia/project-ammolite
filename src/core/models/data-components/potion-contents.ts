import z from "zod";
import {
  Builder$MobEffectComponent,
  Configurator$MobEffectComponent,
  Schema$MobEffectComponent,
  Type$MobEffectComponent,
} from "#/models/data-components/common/mob-effect.ts";

export const Schema$PotionContentsComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:potion_contents": z
          .object({
            potion: z.string().optional(),
            custom_name: z.string().optional(),
            custom_color: z.int().optional(),
            custom_effects: Schema$MobEffectComponent.array()
              .readonly()
              .optional(),
          })
          .readonly(),
      })
      .readonly(),
    z
      .object({ "!minecraft:potion_contents": z.object({}).readonly() })
      .readonly(),
  ]),
);

export type Type$PotionContentsComponent = z.output<
  typeof Schema$PotionContentsComponent
>;

interface __Configurator$PotionContentsComponent$Active {
  potion(value: string): __Configurator$PotionContentsComponent$Active;
  customName(value: string): __Configurator$PotionContentsComponent$Active;
  customColor(value: number): __Configurator$PotionContentsComponent$Active;
  customEffects(
    ...configureFns: Array<(builder: Configurator$MobEffectComponent) => void>
  ): __Configurator$PotionContentsComponent$Active;
}

export interface Configurator$PotionContentsComponent extends __Configurator$PotionContentsComponent$Active {
  disabled(): void;
}

export class Builder$PotionContentsComponent implements Configurator$PotionContentsComponent {
  private value?:
    | { "!minecraft:potion_contents": Record<PropertyKey, never> }
    | {
        "minecraft:potion_contents": {
          potion?: string;
          custom_name?: string;
          custom_color?: number;
          custom_effects?: Array<Type$MobEffectComponent>;
        };
      };

  private get activeValue() {
    if (!this.value || !("minecraft:potion_contents" in this.value)) {
      this.value = {
        "minecraft:potion_contents": {},
      };
    }
    return this.value["minecraft:potion_contents"];
  }

  potion(value: string) {
    this.activeValue.potion = value;
    return this;
  }
  customName(value: string) {
    this.activeValue.custom_name = value;
    return this;
  }
  customColor(value: number) {
    this.activeValue.custom_color = value;
    return this;
  }
  customEffects(
    ...configureFns: Array<(builder: Configurator$MobEffectComponent) => void>
  ) {
    this.activeValue.custom_effects = configureFns.map((configure) => {
      const builder = new Builder$MobEffectComponent();
      configure(builder);
      return builder.build();
    });
    return this;
  }

  disabled() {
    this.value = { "!minecraft:potion_contents": {} };
  }

  build() {
    return Schema$PotionContentsComponent.parse(this.value);
  }
}
