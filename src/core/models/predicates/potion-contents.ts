import { MobEffects } from "#/enum/mob-effects.ts";
import { MinecraftPotions } from "#/enum/minecraft-potions.ts";

type NumberBound = number | { max?: number; min?: number };

export class MobEffectPredicate {
  private effect: string | MobEffects;
  private amplifier?: NumberBound;
  private duration?: NumberBound;
  private ambient?: boolean;
  private visible?: boolean;

  private constructor(effect: string | MobEffects) {
    this.effect = effect;
  }

  public static new(effect: string | MobEffects) {
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
      effect: this.effect,
      amplifier: this.amplifier,
      duration: this.duration,
      visible: this.visible,
      ambient: this.ambient,
    };
  }
}

export class Effects {
  contains?: Array<MobEffectPredicate>;
  count?: Array<{ count: NumberBound; test: Array<MobEffectPredicate> }>;
  size?: NumberBound;
}

export class PotionContentsPredicate {
  private potions?: (string | MinecraftPotions)[];
  private effects?: Effects;

  private constructor() {}

  public static new() {
    return new this();
  }

  public asJsonObject() {
    return {
      potions: this.potions,
      effects:
        this.effects === undefined
          ? undefined
          : {
              contains: this.effects.contains?.map((mobEff) => {
                const { effect, ...rest } = mobEff.asJSONObject();
                return {
                  [effect]: rest,
                };
              }),
              size: this.effects.size,
              count: this.effects.count?.map(({ count, test }) => ({
                count,
                test: test.reduce((prev, curr) => {
                  const { effect, ...rest } = curr.asJSONObject();
                  return Object.assign(prev, { [effect]: rest });
                }, {}),
              })),
            },
    };
  }

  public wherePotions(
    potion: string | MinecraftPotions,
    ...rest: (string | MinecraftPotions)[]
  ) {
    this.potions = [potion, ...rest];
    return this;
  }

  public whereEffects(effects: Effects) {
    this.effects = effects;
    return this;
  }
}
