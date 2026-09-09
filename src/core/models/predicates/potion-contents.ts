import { MobEffect } from "#/enum/mob-effects.ts";

type NumberBound = number | { max?: number; min?: number };

export class MobEffectPredicate {
  private effect: string | MobEffect;
  private amplifier?: NumberBound;
  private duration?: NumberBound;
  private ambient?: boolean;
  private visible?: boolean;

  private constructor(effect: string | MobEffect) {
    this.effect = effect;
  }

  public static new(effect: string | MobEffect) {
    return new this(effect);
  }

  public whereAmplifier(bound: NumberBound) {
    this.amplifier = bound;
    return this;
  }

  public whereDuration(bound: NumberBound) {
    this.duration = bound;
    return this;
  }

  public whereAmbient(value: boolean) {
    this.ambient = value;
    return this;
  }

  public whereVisible(value: boolean) {
    this.visible = value;
    return this;
  }

  public asJSONObject() {
    return {
      [this.effect]: {
        amplifier: this.amplifier,
        duration: this.duration,
        visible: this.visible,
        ambient: this.ambient,
      },
    };
  }
}

type Effects = {
  contains?: Array<MobEffectPredicate>;
  size?: NumberBound;
};

export class PotionContents {
  private potions?: MobEffect[];
  private effects?: Effects;

  private constructor() {}

  public static new() {
    return new this();
  }

  public toJSON() {
    return JSON.stringify({
      potions: this.potions,
      effects:
        this.effects === undefined
          ? undefined
          : {
              contains: this.effects.contains?.map((mobEff) =>
                mobEff.asJSONObject(),
              ),
              size: this.effects.size,
            },
    });
  }

  public wherePotions(...potions: MobEffect[]) {
    this.potions = [...potions];
  }

  public whereEffects(effects: Effects) {
    this.effects = effects;
  }
}
