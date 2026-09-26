import z from "zod";
import {
  Builder$MobEffectComponent,
  Configurator$MobEffectComponent,
  Schema$MobEffectComponent,
  Type$MobEffectComponent,
} from "#/models/data-components/common/mob-effect.ts";
import {
  Builder$SoundEventComponent,
  Configurator$SoundEventComponent,
  Schema$SoundEventComponent,
} from "#/models/data-components/common/sound-event.ts";

export const Schema$ConsumeEffectComponent = z.compile(
  z.discriminatedUnion("type", [
    z
      .object({
        type: z.literal("minecraft:remove_effects"),
        effects: z.string().array().readonly(),
      })
      .readonly(),
    z
      .object({
        type: z.literal("minecraft:apply_effects"),
        effects: Schema$MobEffectComponent.array().readonly(),
        probability: z.float32().min(0).max(1).optional(),
      })
      .readonly(),
    z.object({ type: z.literal("minecraft:clear_all_effects") }).readonly(),
    z
      .object({
        type: z.literal("minecraft:teleport_randomly"),
        diameter: z.float32().min(1.401298464324817e-45).optional(),
        directional_particles: z.boolean().optional(),
      })
      .readonly(),
    z
      .object({
        type: z.literal("minecraft:play_sound"),
        sound: Schema$SoundEventComponent,
      })
      .readonly(),
  ]),
);
export type Type$ConsumeEffectComponent = z.output<
  typeof Schema$ConsumeEffectComponent
>;

interface __Configurator$ConsumeEffectComponent$ApplyEffects {
  effects(
    ...configureFn: Array<(builder: Configurator$MobEffectComponent) => void>
  ): __Configurator$ConsumeEffectComponent$ApplyEffects;
  probability(
    value: number,
  ): __Configurator$ConsumeEffectComponent$ApplyEffects;
}

interface __Configurator$ConsumeEffectComponent$TeleportRandomly {
  diameter(
    value: number,
  ): __Configurator$ConsumeEffectComponent$TeleportRandomly;
  directionalParticles(
    value: boolean,
  ): __Configurator$ConsumeEffectComponent$TeleportRandomly;
}

export interface Configurator$ConsumeEffectComponent {
  removeEffects(...effects: string[]): void;
  applyEffects(
    configure: (
      builder: __Configurator$ConsumeEffectComponent$ApplyEffects,
    ) => void,
  ): void;
  clearAllEffects(): void;
  teleportRandomly(
    configure: (
      builder: __Configurator$ConsumeEffectComponent$TeleportRandomly,
    ) => void,
  ): void;
  playSound(
    configure: (builder: Configurator$SoundEventComponent) => void,
  ): void;
}

class __Builder$ConsumeEffectComponent$ApplyEffects implements __Configurator$ConsumeEffectComponent$ApplyEffects {
  private probabilityValue?: number;
  private effectsValue: Array<Type$MobEffectComponent> = [];

  effects(
    ...configureFn: Array<(builder: Configurator$MobEffectComponent) => void>
  ) {
    this.effectsValue.push(
      ...configureFn.map((configure) => {
        const builder = new Builder$MobEffectComponent();
        configure(builder);
        return builder.build();
      }),
    );
    return this;
  }
  probability(value: number) {
    this.probabilityValue = value;
    return this;
  }
  build() {
    return {
      effects: this.effectsValue,
      probability: this.probabilityValue,
    };
  }
}

class __Builder$ConsumeEffectComponent$TeleportRandomly implements __Configurator$ConsumeEffectComponent$TeleportRandomly {
  private diameterValue?: number;
  private directionalParticlesValue?: boolean;

  diameter(value: number) {
    this.diameterValue = value;
    return this;
  }
  directionalParticles(value: boolean = false) {
    this.directionalParticlesValue = value;
    return this;
  }
  build() {
    return {
      diameter: this.diameterValue,
      directional_particles: this.directionalParticlesValue,
    };
  }
}

export class Builder$ConsumeEffectComponent implements Configurator$ConsumeEffectComponent {
  private value?: Type$ConsumeEffectComponent;

  removeEffects(...effects: string[]) {
    this.value = { type: "minecraft:remove_effects", effects };
    return this;
  }

  applyEffects(
    configure: (
      builder: __Configurator$ConsumeEffectComponent$ApplyEffects,
    ) => void,
  ) {
    const builder = new __Builder$ConsumeEffectComponent$ApplyEffects();
    configure(builder);
    this.value = { type: "minecraft:apply_effects", ...builder.build() };
    return this;
  }
  clearAllEffects() {
    this.value = { type: "minecraft:clear_all_effects" };
    return this;
  }

  teleportRandomly(
    configure: (
      builder: __Configurator$ConsumeEffectComponent$TeleportRandomly,
    ) => void,
  ) {
    const builder = new __Builder$ConsumeEffectComponent$TeleportRandomly();
    configure(builder);
    this.value = {
      type: "minecraft:teleport_randomly",
      ...builder.build(),
    };
    return this;
  }
  playSound(configure: (builder: Configurator$SoundEventComponent) => void) {
    const builder = new Builder$SoundEventComponent();
    configure(builder);
    this.value = { type: "minecraft:play_sound", sound: builder.build() };
  }
  build() {
    return Schema$ConsumeEffectComponent.parse(this.value);
  }
}
