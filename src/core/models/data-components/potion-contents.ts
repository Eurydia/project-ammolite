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

class __Builder$PotionContentsComponent$Active implements __Configurator$PotionContentsComponent$Active {
  private potionValue?: string;
  private customNameValue?: string;
  private customColorValue?: number;
  private customEffectValue?: Array<Type$MobEffectComponent>;

  potion(value: string) {
    this.potionValue = value;
    return this;
  }
  customName(value: string) {
    this.customNameValue = value;
    return this;
  }
  customColor(value: number) {
    this.customColorValue = value;
    return this;
  }
  customEffects(
    ...configureFns: Array<(builder: Configurator$MobEffectComponent) => void>
  ) {
    this.customEffectValue = configureFns.map((configure) => {
      const builder = new Builder$MobEffectComponent();
      configure(builder);
      return builder.build();
    });
    return this;
  }
  build() {
    return {
      potion: this.potionValue,
      custom_name: this.customNameValue,
      custom_color: this.customColorValue,
      custom_effects: this.customEffectValue,
    };
  }
}

export interface Configurator$PotionContentsComponent {
  content(
    configure: (builder: __Configurator$PotionContentsComponent$Active) => void,
  ): void;
  disabled(): void;
}

export class Builder$PotionContentsComponent implements Configurator$PotionContentsComponent {
  private value?: Type$PotionContentsComponent;

  content(
    configure: (builder: __Configurator$PotionContentsComponent$Active) => void,
  ) {
    const builder = new __Builder$PotionContentsComponent$Active();
    configure(builder);
    this.value = { "minecraft:potion_contents": builder.build() };
  }

  disabled() {
    this.value = { "!minecraft:potion_contents": {} };
  }

  build() {
    return Schema$PotionContentsComponent.parse(this.value);
  }
}
