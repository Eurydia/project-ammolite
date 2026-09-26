import z from "zod";

export const Schema$MobEffectComponent = z.compile(
  z
    .object({
      id: z.string(),
      duration: z.int().optional(),
      amplifier: z.int().min(0).max(255).optional(),
      visible: z.boolean().optional(),
      ambient: z.boolean().optional(),
      show_icon: z.boolean().optional(),
      show_particles: z.boolean().optional(),
    })
    .readonly(),
);

export type Type$MobEffectComponent = z.output<
  typeof Schema$MobEffectComponent
>;

export interface Configurator$MobEffectComponent {
  id(value: string): Configurator$MobEffectComponent;
  duration(value: number): Configurator$MobEffectComponent;
  amplifier(value: number): Configurator$MobEffectComponent;
  visible(value?: boolean): Configurator$MobEffectComponent;
  ambient(value?: boolean): Configurator$MobEffectComponent;
  showIcon(value?: boolean): Configurator$MobEffectComponent;
  showParticles(value?: boolean): Configurator$MobEffectComponent;
}

export class Builder$MobEffectComponent implements Configurator$MobEffectComponent {
  private idValue?: string;
  private durationValue?: number;
  private amplifierValue?: number;
  private visibleValue?: boolean;
  private ambientValue?: boolean;
  private showIconValue?: boolean;
  private showParticlesValue?: boolean;

  id(value: string) {
    this.idValue = value;
    return this;
  }

  duration(value: number) {
    this.durationValue = value;
    return this;
  }
  amplifier(value: number) {
    this.amplifierValue = value;
    return this;
  }
  visible(value = true) {
    this.visibleValue = value;
    return this;
  }
  ambient(value = true) {
    this.ambientValue = value;
    return this;
  }
  showIcon(value = true) {
    this.showIconValue = value;
    return this;
  }
  showParticles(value = true) {
    this.showParticlesValue = value;
    return this;
  }

  build() {
    return Schema$MobEffectComponent.parse({
      id: this.idValue,
      duration: this.durationValue,
      amplifier: this.amplifierValue,
      visible: this.visibleValue,
      ambient: this.ambientValue,
      show_icon: this.showIconValue,
      show_particles: this.showParticlesValue,
    });
  }
}
