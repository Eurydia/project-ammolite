import z from "zod";
import {
  type MobEffectComponentType,
  Schema$MobEffectComponent,
} from "#/models/data-components/common/mob-effect.ts";

export const Schema$PotionContentsComponent = z.compile(
  z.union([
    z.object({
      "minecraft:potion_contents": z.object({
        potion: z.string().optional(),
        custom_name: z.string().optional(),
        custom_color: z.int().optional(),
        custom_effects: Schema$MobEffectComponent.array().readonly().optional(),
      }).readonly(),
    }).readonly(),
    z.object({ "!minecraft:potion_contents": z.object({}).readonly() })
      .readonly(),
  ]),
);
export type PotionContentsComponentType = z.output<
  typeof Schema$PotionContentsComponent
>;
export type Type$PotionContentsComponent = PotionContentsComponentType;
export interface PotionContentsComponentInput {
  potion?: string;
  customName?: string;
  customColor?: string;
  customEffects?: readonly MobEffectComponentType[];
}

export interface Configurator$PotionContentsComponent {
  potion(value: string): Configurator$PotionContentsComponent;
  customName(value: string): Configurator$PotionContentsComponent;
  customColor(value: string): Configurator$PotionContentsComponent;
  customEffect(
    value: MobEffectComponentType,
  ): Configurator$PotionContentsComponent;
}

export class Builder$PotionContentsComponent
  implements Configurator$PotionContentsComponent {
  private readonly values: PotionContentsComponentInput = {};
  private readonly effects: MobEffectComponentType[] = [];
  private isDisabled = false;

  potion(value: string) {
    Object.assign(this.values, { potion: value });
    return this;
  }
  customName(value: string) {
    Object.assign(this.values, { customName: value });
    return this;
  }
  customColor(value: string) {
    Object.assign(this.values, { customColor: value });
    return this;
  }
  customEffect(value: MobEffectComponentType) {
    this.effects.push(value);
    return this;
  }
  disabled() {
    this.isDisabled = true;
  }

  build() {
    return this.isDisabled
      ? Schema$PotionContentsComponent.parse({
        "!minecraft:potion_contents": {},
      })
      : PotionContentsComponent.from({
        ...this.values,
        customEffects: this.effects,
      });
  }
}

export const PotionContentsComponent = {
  builder: () => new Builder$PotionContentsComponent(),
  from(
    { potion, customName, customColor, customEffects }:
      PotionContentsComponentInput,
  ) {
    return Schema$PotionContentsComponent.parse({
      "minecraft:potion_contents": {
        potion,
        custom_name: customName,
        custom_color: customColor === undefined
          ? undefined
          : Number.parseInt(customColor.slice(1), 16),
        custom_effects: customEffects,
      },
    });
  },
  negated() {
    return Schema$PotionContentsComponent.parse({
      "!minecraft:potion_contents": {},
    });
  },
};
