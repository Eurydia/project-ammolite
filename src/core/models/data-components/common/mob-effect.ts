import z from "zod";

export const Schema$MobEffectComponent = z.compile(
  z.object({
    id: z.string(),
    duration: z.int().optional(),
    amplifier: z.int().min(0).max(255).optional(),
    visible: z.boolean().optional(),
    ambient: z.boolean().optional(),
    show_icon: z.boolean().optional(),
    show_particles: z.boolean().optional(),
  }).readonly(),
);
export type MobEffectComponentType = z.output<typeof Schema$MobEffectComponent>;
export type Type$MobEffectComponent = MobEffectComponentType;
export interface Configurator$MobEffectComponent {
  duration(value: number): Configurator$MobEffectComponent;
  amplifier(value: number): Configurator$MobEffectComponent;
  visible(value?: boolean): Configurator$MobEffectComponent;
  ambient(value?: boolean): Configurator$MobEffectComponent;
  showIcon(value?: boolean): Configurator$MobEffectComponent;
  showParticles(value?: boolean): Configurator$MobEffectComponent;
}

export class Builder$MobEffectComponent
  implements Configurator$MobEffectComponent {
  private readonly value: Record<string, unknown>;
  constructor(id: string) {
    this.value = { id };
  }
  duration(value: number) {
    this.value.duration = value;
    return this;
  }
  amplifier(value: number) {
    this.value.amplifier = value;
    return this;
  }
  visible(value = true) {
    this.value.visible = value;
    return this;
  }
  ambient(value = true) {
    this.value.ambient = value;
    return this;
  }
  showIcon(value = true) {
    this.value.show_icon = value;
    return this;
  }
  showParticles(value = true) {
    this.value.show_particles = value;
    return this;
  }
  build() {
    return Schema$MobEffectComponent.parse(this.value);
  }
}

export const MobEffectComponent = {
  builder: (id: string) => new Builder$MobEffectComponent(id),
  from({ id, duration, amplifier, visible, ambient, showIcon, showParticles }: {
    id: string;
    duration?: number;
    amplifier?: number;
    visible?: boolean;
    ambient?: boolean;
    showIcon?: boolean;
    showParticles?: boolean;
  }) {
    return Schema$MobEffectComponent.parse({
      id,
      duration,
      amplifier,
      visible,
      ambient,
      show_icon: showIcon,
      show_particles: showParticles,
    });
  },
};
