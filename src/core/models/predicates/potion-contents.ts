import { NumberBound } from "#/models/snbt/number-bound.ts";

export class MobEffectPredicate {
  public readonly effect: string;
  public readonly amplifier?: NumberBound;
  public readonly duration?: NumberBound;
  public readonly ambient?: boolean;
  public readonly visible?: boolean;

  private constructor(
    effect: string,
    amplifier?: number,
    duration?: number,
    ambient?: boolean,
    visible?: boolean,
  ) {
    this.effect = effect;

    if (amplifier !== undefined) {
      this.amplifier = NumberBound.byte(amplifier);
    }

    if (duration !== undefined) {
      this.duration = NumberBound.integer(duration);
    }

    this.ambient = ambient;
    this.visible = visible;
  }

  public static from(obj: {
    effect: string;
    amplifier?: number;
    duration?: number;
    ambient?: boolean;
    visible?: boolean;
  }) {
    return new this(
      obj.effect,
      obj.amplifier,
      obj.duration,
      obj.ambient,
      obj.visible,
    );
  }

  public asJsonObject(): Readonly<{
    effect: string;
    amplifier?: number | Readonly<{ min?: number; max?: number }>;
    duration?: number | Readonly<{ min?: number; max?: number }>;
    visible?: boolean;
    ambient?: boolean;
  }> {
    return Object.freeze({
      effect: this.effect,
      amplifier: this.amplifier?.valueOf(),
      duration: this.duration?.valueOf(),
      visible: this.visible,
      ambient: this.ambient,
    });
  }
}

export class Effects {
  contains?: Array<MobEffectPredicate>;
  count?: Array<{ count: NumberBound; test: Array<MobEffectPredicate> }>;
  size?: NumberBound;
}

export class PotionContentsPredicate {
  private readonly potions?: string | Array<string>;
  private readonly effects?: Effects;

  public constructor(potions?: string | Array<string>, effects?: Effects) {
    this.effects = effects;
    this.potions = potions;
  }

  public static fromObject(obj: {
    potions?: string | Array<string>;
    effects?: Effects;
  }) {
    return new this(obj.potions, obj.effects);
  }

  public asJsonObject() {
    return {
      potions: this.potions,
      effects:
        this.effects === undefined
          ? undefined
          : {
              contains: this.effects.contains?.map((mobEff) => {
                const { effect, ...rest } = mobEff.asJsonObject();
                return {
                  [effect]: rest,
                };
              }),
              size: this.effects.size,
              count: this.effects.count?.map(({ count, test }) => ({
                count,
                test: test.reduce((prev, curr) => {
                  const { effect, ...rest } = curr.asJsonObject();
                  return Object.assign(prev, { [effect]: rest });
                }, {}),
              })),
            },
    };
  }
}
