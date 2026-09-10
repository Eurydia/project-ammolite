import { MobEffect } from "#/models/data-components/common/mob-effect.ts";
import { SoundEvent } from "#/models/data-components/common/sound-event.ts";

export abstract class ConsumeEffect {
  public static removeEffects(...effs: Array<string>) {
    return ConsumeEffect$RemoveEffects.new(...effs);
  }
  public static applyEffects(...effs: Array<MobEffect>) {
    return ConsumeEffect$ApplyEffects.new(...effs);
  }
  public static clearAllEffects() {
    return ConsumeEffect$ClearAllEffects.new();
  }
  public static teleportRandomly(diameter?: number, particles?: boolean) {
    return ConsumeEffect$TeleportRandomly.new(diameter, particles);
  }
  public static playSound(sound: string, range?: number) {
    return ConsumeEffect$PlaySound.new(sound, range);
  }
  protected constructor() {}
  public abstract asJsonObject(): { type: string };
}

class ConsumeEffect$RemoveEffects extends ConsumeEffect {
  private effects: Array<string>;

  private constructor(effs: Array<string>) {
    super();
    this.effects = effs;
  }
  public static new(...effs: Array<string>) {
    return new this(effs);
  }

  public override asJsonObject() {
    return {
      type: "minecraft:remove_effects",
      effects: this.effects,
    };
  }
}

class ConsumeEffect$ApplyEffects extends ConsumeEffect {
  private effects: Array<MobEffect>;
  private probability?: number;
  private constructor(effs: Array<MobEffect>) {
    super();
    this.effects = effs;
  }

  public override asJsonObject() {
    return {
      type: "minecraft:apply_effects",
      effects: this.effects,
      probability: this.probability,
    };
  }
  public static new(...effs: Array<MobEffect>) {
    return new this(effs);
  }
  public withProbability(value: number) {
    this.probability = value;
    return this;
  }
}

class ConsumeEffect$ClearAllEffects extends ConsumeEffect {
  public override asJsonObject(): { type: string } {
    return { type: "minecraft:clear_all_effects" };
  }
  public static new() {
    return new this();
  }
}

class ConsumeEffect$TeleportRandomly extends ConsumeEffect {
  private diameter?: number;
  private particles?: boolean;
  public override asJsonObject() {
    return {
      type: "minecraft:teleport_randomly",
      diameter: this.diameter,
      directional_particles: this.particles,
    };
  }
  private constructor(diameter?: number, particles?: boolean) {
    super();
    this.diameter = diameter;
    this.particles = particles;
  }

  public static new(diameter?: number, particles?: boolean) {
    return new this(diameter, particles);
  }
}

class ConsumeEffect$PlaySound extends ConsumeEffect {
  private sound: SoundEvent;
  public override asJsonObject() {
    return {
      type: "minecraft:play_sound",
      sound: this.sound.asJsonObject(),
    };
  }

  private constructor(soundEvent: SoundEvent) {
    super();
    this.sound = soundEvent;
  }
  public static new(sound: string, range?: number) {
    return new this(SoundEvent.new(sound, range));
  }
}
