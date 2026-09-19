import { NumberBound } from "#/models/predicates/common/byte-bound.ts";
import { type DataPackModel, freezeDataClass } from "#/models/model.ts";
import { keepUndefinedOrTransform } from "#/utility/transform.ts";

export type MobEffectComponentType = Readonly<{
  id: string;
  duration?: number;
  amplifier?: number;
  visible?: boolean;
  ambient?: boolean;
  show_icon?: boolean;
  show_particles?: boolean;
}>;

export class MobEffectComponentData implements DataPackModel<MobEffectComponentType> {
  public readonly id: string;
  public readonly duration?: number;
  public readonly amplifier?: number;
  public readonly visible?: boolean;
  public readonly ambient?: boolean;
  public readonly showIcon?: boolean;
  public readonly showParticles?: boolean;

  public constructor({
    id,
    duration,
    amplifier,
    visible,
    ambient,
    showIcon,
    showParticles,
  }: {
    id: string;
    duration?: number;
    amplifier?: number;
    visible?: boolean;
    ambient?: boolean;
    showIcon?: boolean;
    showParticles?: boolean;
  }) {
    this.id = id;
    this.duration = duration;
    this.amplifier = amplifier;
    this.visible = visible;
    this.ambient = ambient;
    this.showIcon = showIcon;
    this.showParticles = showParticles;
    freezeDataClass(this);
  }

  public asJsonObject(): MobEffectComponentType {
    return Object.freeze({
      id: this.id,
      duration: this.duration,
      amplifier: this.amplifier,
      visible: this.visible,
      ambient: this.ambient,
      show_icon: this.showIcon,
      show_particles: this.showParticles,
    });
  }
}

export interface MobEffectComponentBuilderConfigurator {
  duration(value: number): MobEffectComponentBuilderConfigurator;
  amplifier(value: number): MobEffectComponentBuilderConfigurator;
  visible(value?: boolean): MobEffectComponentBuilderConfigurator;
  ambient(value?: boolean): MobEffectComponentBuilderConfigurator;
  showIcon(value?: boolean): MobEffectComponentBuilderConfigurator;
  showParticles(value?: boolean): MobEffectComponentBuilderConfigurator;
}

export class MobEffectComponentBuilder implements MobEffectComponentBuilderConfigurator {
  private readonly id: string;
  private durationValue?: number;
  private amplifierValue?: number;
  private visibleValue?: boolean;
  private ambientValue?: boolean;
  private showIconValue?: boolean;
  private showParticlesValue?: boolean;

  public constructor(id: string) {
    this.id = id;
  }

  public duration(value: number): this {
    this.durationValue = NumberBound.integer(value);
    return this;
  }

  public amplifier(value: number): this {
    this.amplifierValue = NumberBound.byte(value);
    return this;
  }

  public visible(value = true): this {
    this.visibleValue = value;
    return this;
  }

  public ambient(value = true): this {
    this.ambientValue = value;
    return this;
  }

  public showIcon(value = true): this {
    this.showIconValue = value;
    return this;
  }

  public showParticles(value = true): this {
    this.showParticlesValue = value;
    return this;
  }

  public build(): Readonly<MobEffectComponentData> {
    return freezeDataClass(
      new MobEffectComponentData({
        id: this.id,
        duration: this.durationValue,
        amplifier: this.amplifierValue,
        visible: this.visibleValue,
        ambient: this.ambientValue,
        showIcon: this.showIconValue,
        showParticles: this.showParticlesValue,
      }),
    );
  }
}

export const MobEffectComponent = {
  builder(id: string): MobEffectComponentBuilder {
    return new MobEffectComponentBuilder(id);
  },
  from({
    duration,
    amplifier,
    id,
    visible,
    ambient,
    showIcon,
    showParticles,
  }: {
    id: string;
    duration?: number;
    amplifier?: number;
    visible?: boolean;
    ambient?: boolean;
    showIcon?: boolean;
    showParticles?: boolean;
  }): MobEffectComponentType {
    return Object.freeze({
      id,
      duration: keepUndefinedOrTransform(duration, (val) =>
        NumberBound.integer(val),
      ),
      amplifier: keepUndefinedOrTransform(amplifier, (val) =>
        NumberBound.byte(val),
      ),
      visible,
      ambient,
      show_icon: showIcon,
      show_particles: showParticles,
    });
  },
};
