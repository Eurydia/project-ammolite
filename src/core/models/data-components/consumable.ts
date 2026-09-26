import type {
  Configurator$ConsumeEffectComponent,
  Type$ConsumeEffectComponent,
} from "#/models/data-components/common/consume-effect.ts";
import {
  Builder$ConsumeEffectComponent,
  Schema$ConsumeEffectComponent,
} from "#/models/data-components/common/consume-effect.ts";
import {
  Schema$SoundEventComponent,
  type Type$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";
import z from "zod";

export const Schema$ConsumableComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:consumable": z
          .object({
            consume_seconds: z.float32().min(0).optional(),
            animation: z.string().optional(),
            sound: Schema$SoundEventComponent.optional(),
            has_consume_particles: z.boolean().optional(),
            on_consume_effects: Schema$ConsumeEffectComponent.array()
              .readonly()
              .optional(),
          })
          .readonly(),
      })
      .readonly(),
    z.object({ "!minecraft:consumable": z.object({}).readonly() }).readonly(),
  ]),
);

export type Type$ConsumableComponent = z.output<
  typeof Schema$ConsumableComponent
>;

interface __Configurator$ConsumableComponent$Active {
  consumeSeconds(value: number): __Configurator$ConsumableComponent$Active;
  animation(value: string): __Configurator$ConsumableComponent$Active;
  sound(
    value: Type$SoundEventComponent,
  ): __Configurator$ConsumableComponent$Active;
  consumeEffects(
    ...configureFns: Array<
      (builder: Configurator$ConsumeEffectComponent) => void
    >
  ): __Configurator$ConsumableComponent$Active;
  consumeParticles(value?: boolean): __Configurator$ConsumableComponent$Active;
}

interface __Configurator$ConsumableComponent$Disabled {
  disabled(): void;
}

export interface Configurator$ConsumableComponent
  extends
    __Configurator$ConsumableComponent$Active,
    __Configurator$ConsumableComponent$Disabled {}

export class Builder$ConsumableComponent implements Configurator$ConsumableComponent {
  private value?:
    | { "!minecraft:consumable": Record<PropertyKey, never> }
    | {
        "minecraft:consumable": {
          consume_seconds?: number;
          animation?: string;
          sound?: Type$SoundEventComponent;
          has_consume_particles?: boolean;
          on_consume_effects?: Array<Type$ConsumeEffectComponent>;
        };
      };

  private get activeValue() {
    if (!this.value || !("minecraft:consumable" in this.value)) {
      this.value = {
        "minecraft:consumable": {},
      };
    }
    return this.value["minecraft:consumable"];
  }
  consumeSeconds(value: number) {
    this.activeValue.consume_seconds = value;
    return this;
  }
  animation(value: string) {
    this.activeValue.animation = value;
    return this;
  }
  sound(value: Type$SoundEventComponent) {
    this.activeValue.sound = value;
    return this;
  }
  consumeEffects(
    ...configureFns: Array<
      (builer: Configurator$ConsumeEffectComponent) => void
    >
  ) {
    this.activeValue.on_consume_effects = configureFns.map((configure) => {
      const builer = new Builder$ConsumeEffectComponent();
      configure(builer);
      return builer.build();
    });
    return this;
  }
  consumeParticles(value = true) {
    this.activeValue.has_consume_particles = value;
    return this;
  }
  disabled() {
    this.value = { "!minecraft:consumable": {} };
  }
  build() {
    return Schema$ConsumableComponent.parse(this.value);
  }
}
