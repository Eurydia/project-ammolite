import z from "zod";
import type { ConsumeEffectType } from "#/models/data-components/common/consume-effect.ts";
import { Schema$ConsumeEffect } from "#/models/data-components/common/consume-effect.ts";
import {
  Schema$SoundEventComponent,
  type Type$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";

const Schema$ConsumableActive = z.compile(
  z.object({
    "minecraft:consumable": z.object({
      consume_seconds: z.float32().min(0).optional(),
      animation: z.string().optional(),
      sound: Schema$SoundEventComponent.optional(),
      has_consume_particles: z.boolean().optional(),
      on_consume_effects: Schema$ConsumeEffect.array().readonly().optional(),
    }).readonly(),
  }).readonly(),
);
const Schema$ConsumableDisabled = z.compile(
  z.object({ "!minecraft:consumable": z.object({}).readonly() }).readonly(),
);
export const Schema$ConsumableComponent = z.compile(
  z.union([Schema$ConsumableActive, Schema$ConsumableDisabled]),
);
export type ConsumableComponentType = z.output<
  typeof Schema$ConsumableComponent
>;
export type Type$ConsumableComponent = ConsumableComponentType;

export interface Configurator$ConsumableComponent {
  consumeSeconds(value: number): Configurator$ConsumableComponent;
  animation(value: string): Configurator$ConsumableComponent;
  sound(value: Type$SoundEventComponent): Configurator$ConsumableComponent;
  consumeEffect(value: ConsumeEffectType): Configurator$ConsumableComponent;
  consumeParticles(value?: boolean): Configurator$ConsumableComponent;
}

export class Builder$ConsumableComponent
  implements Configurator$ConsumableComponent {
  private readonly value: Record<string, unknown> = {};
  private readonly effects: ConsumeEffectType[] = [];
  private isDisabled = false;
  consumeSeconds(value: number) {
    this.value.consume_seconds = value;
    return this;
  }
  animation(value: string) {
    this.value.animation = value;
    return this;
  }
  sound(value: Type$SoundEventComponent) {
    this.value.sound = value;
    return this;
  }
  consumeEffect(value: ConsumeEffectType) {
    this.effects.push(value);
    return this;
  }
  consumeParticles(value = true) {
    this.value.has_consume_particles = value;
    return this;
  }
  disabled() {
    this.isDisabled = true;
  }
  build() {
    if (this.isDisabled) {
      return Schema$ConsumableComponent.parse({ "!minecraft:consumable": {} });
    }
    return Schema$ConsumableComponent.parse({
      "minecraft:consumable": {
        ...this.value,
        on_consume_effects: this.effects.length ? this.effects : undefined,
      },
    });
  }
}

export const ConsumableComponent = {
  builder: () => new Builder$ConsumableComponent(),
  from(
    { consumeSeconds, animation, sound, hasConsumeParticles, onConsumeEffects }:
      {
        consumeSeconds?: number;
        animation?: string;
        sound?: Type$SoundEventComponent;
        hasConsumeParticles?: boolean;
        onConsumeEffects?: ConsumeEffectType[];
      },
  ) {
    return Schema$ConsumableComponent.parse({
      "minecraft:consumable": {
        consume_seconds: consumeSeconds,
        animation,
        sound,
        has_consume_particles: hasConsumeParticles,
        on_consume_effects: onConsumeEffects,
      },
    });
  },
  negated: () =>
    Schema$ConsumableComponent.parse({ "!minecraft:consumable": {} }),
};
