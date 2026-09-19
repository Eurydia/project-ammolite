import { MobEffects } from "#/enum/mob-effects.ts";
import { type DataPackModel, freezeDataClass } from "#/models/model.ts";

export type SuspiciousStewEffectType = Readonly<{
  id: MobEffects;
  duration?: number;
}>;

export class SuspiciousStewEffectData
  implements DataPackModel<SuspiciousStewEffectType> {
  public readonly id: MobEffects;
  public readonly duration?: number;

  public constructor(id: MobEffects, duration?: number) {
    this.id = id;
    this.duration = duration;
    freezeDataClass(this);
  }

  public asJsonObject(): SuspiciousStewEffectType {
    return Object.freeze({ id: this.id, duration: this.duration });
  }
}

export interface SuspiciousStewEffectBuilderConfigurator {
  duration(value: number): SuspiciousStewEffectBuilderConfigurator;
}

export class SuspiciousStewEffectBuilder
  implements SuspiciousStewEffectBuilderConfigurator {
  private readonly id: MobEffects;
  private durationValue?: number;

  public constructor(id: MobEffects) {
    this.id = id;
  }

  public duration(value: number): this {
    this.durationValue = value;
    return this;
  }

  public build(): Readonly<SuspiciousStewEffectData> {
    return freezeDataClass(
      new SuspiciousStewEffectData(this.id, this.durationValue),
    );
  }
}

export const SuspiciousStewEffect = {
  builder(id: MobEffects): SuspiciousStewEffectBuilder {
    return new SuspiciousStewEffectBuilder(id);
  },
  from(id: MobEffects, duration?: number): SuspiciousStewEffectType {
    return Object.freeze({ id, duration });
  },
};
