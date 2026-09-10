import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { SoundEvent } from "#/models/data-components/common/sound-event.ts";
import { ConsumeEffect } from "#/models/data-components/death-protection.ts";

export enum ConsumeAnimations {
  NONE = "none",
  EAT = "eat",
  DRINK = "drink",
  BLOCK = "block",
  BOW = "bow",
  SPEAR = "spear",
  CROSSBOW = "crossbow",
  SPYGLASS = "spyglass",
  TOOT_HORN = "toot_horn",
  BRUSH = "brush",
  BUNDLE = "bundle",
  TRIDENT = "trident",
}

export class Consumable implements DataComponent {
  private consumeSeconds?: number;
  private animation?: string;
  private sound?: SoundEvent;
  private particles?: boolean;
  private effects?: Array<ConsumeEffect>;

  private negated: boolean;

  private constructor(negated: boolean) {
    this.negated = negated;
  }

  public static negated() {
    return new this(true);
  }

  private throwIfNegated() {
    if (this.negated) {
      throw new Error();
    }
  }

  public withComsumeSeconds(sec: number) {
    this.throwIfNegated();
    this.consumeSeconds = sec;
    return this;
  }

  public withanimation(anim: string | ConsumeAnimations) {
    this.throwIfNegated();
    this.animation = anim;
    return this;
  }
  public withSound(sound: string, range?: number) {
    this.throwIfNegated();
    this.sound = SoundEvent.new(sound);
    if (range !== undefined) {
      this.sound.withRange(range);
    }
    return this;
  }
  public withEffects(...effs: Array<ConsumeEffect>) {
    this.throwIfNegated();
    this.effects = effs;
    return this;
  }

  public static new() {
    return new this(true);
  }

  public asJsonObject(): [string, object] {
    if (this.negated) {
      return ["!minecraft:consumable", {}];
    }
    return [
      "minecraft:consumable",
      {
        consume_seconds: this.consumeSeconds,
        animation: this.animation,
        sound: this.sound?.asJsonObject(),
        has_consume_particles: this.particles,
        on_consume_effects: this.effects?.map((eff) => eff.asJsonObject()),
      },
    ];
  }
}
