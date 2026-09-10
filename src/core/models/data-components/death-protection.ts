import { DataComponent } from "#/models/data-components/data-component-base.ts";
import { MobEffect } from "#/models/data-components/common/mob-effect.ts";
import { SoundEvent } from "#/models/data-components/common/sound-event.ts";

// export enum ConsumeEffectType {
//   APPLY_EFFECTS = "minecraft:apply_effects",
//   REMOVE_EFFECTS = "minecraft:remove_effects",
//   CLEAR_ALL_EFFECTS = "minecraft:clear_all_effects",
//   TELEPORT_RANDOMLY = "minecraft:teleport_randomly",
//   PLAY_SOUND = "minecraft:play_sound",
// }

// const EFFECT_ID_KINDS = ["single", "list"] as const;
// const SOUND_KINDS = ["reference", "inline"] as const;
// const CONSUME_EFFECT_TYPES = Object.values(ConsumeEffectType);

// const _schema$ArbitraryIdentifier = z.string().trim().normalize().min(1);

// const _schema$OptionalFloatString = z
//   .string()
//   .trim()
//   .normalize()
//   .transform((value) => (value.length === 0 ? undefined : Number(value)))
//   .pipe(z.number().optional());

// const _schema$EffectIds = z.discriminatedUnion("kind", [
//   z.object({ kind: z.literal("single"), value: _schema$ArbitraryIdentifier }),
//   z.object({
//     kind: z.literal("list"),
//     values: _schema$ArbitraryIdentifier.array().min(1),
//   }),
// ]);

// const _schema$Sound = z.discriminatedUnion("kind", [
//   z.object({
//     kind: z.literal("reference"),
//     value: _schema$ArbitraryIdentifier,
//   }),
//   z.object({
//     kind: z.literal("inline"),
//     soundId: _schema$ArbitraryIdentifier,
//     range: _schema$OptionalFloatString,
//   }),
// ]);

// const schema = z.discriminatedUnion("type", [
//   z.object({
//     type: z.literal(ConsumeEffectType.APPLY_EFFECTS),
//     effectInstances: PotionContents$CustomEffects$Effect.array().min(1),
//     probability: _schema$OptionalFloatString.pipe(
//       z.number().min(0).max(1).optional(),
//     ),
//   }),
//   z.object({
//     type: z.literal(ConsumeEffectType.REMOVE_EFFECTS),
//     effectIds: _schema$EffectIds,
//   }),
//   z.object({ type: z.literal(ConsumeEffectType.CLEAR_ALL_EFFECTS) }),
//   z.object({
//     type: z.literal(ConsumeEffectType.TELEPORT_RANDOMLY),
//     diameter: _schema$OptionalFloatString,
//     directionalParticles: z.boolean().optional(),
//   }),
//   z.object({
//     type: z.literal(ConsumeEffectType.PLAY_SOUND),
//     sound: _schema$Sound,
//   }),
// ]);

// export const ConsumeEffect = {
//   schema,
//   toDataPackJSON: (data: z.output<typeof schema>) => {
//     switch (data.type) {
//       case ConsumeEffectType.APPLY_EFFECTS:
//         return {
//           type: data.type,
//           effects: data.effectInstances.map(
//             PotionContents$CustomEffects$Effect$AsDatapackJSON,
//           ),
//           probability: data.probability,
//         };
//       case ConsumeEffectType.REMOVE_EFFECTS:
//         return {
//           type: data.type,
//           effects:
//             data.effectIds.kind === "list"
//               ? data.effectIds.values
//               : data.effectIds.value,
//         };
//       case ConsumeEffectType.CLEAR_ALL_EFFECTS:
//         return { type: data.type };
//       case ConsumeEffectType.TELEPORT_RANDOMLY:
//         return {
//           type: data.type,
//           diameter: data.diameter,
//           directional_particles: data.directionalParticles,
//         };
//       case ConsumeEffectType.PLAY_SOUND:
//         return {
//           type: data.type,
//           sound:
//             data.sound.kind === "reference"
//               ? data.sound.value
//               : {
//                   sound_id: data.sound.soundId,
//                   range: data.sound.range,
//                 },
//         };
//     }
//   },
// } as const;

export abstract class ConsumeEffect {
  public static removeEffects() {
    return ConsumeEffect$RemoveEffects.new();
  }
  public static applyEffects() {
    return ConsumeEffect$ApplyEffects.new();
  }
  public static clearAllEffects() {
    return ConsumeEffect$ClearAllEffects.new();
  }
  public static teleportRandomly() {
    return ConsumeEffect$TeleportRandomly.new();
  }
  public static playSound(sound: string) {
    return ConsumeEffect$PlaySound.new(sound);
  }
  protected constructor() {}
  public abstract asJsonObject(): { type: string };
}

class ConsumeEffect$RemoveEffects extends ConsumeEffect {
  private effects: Array<string> = [];

  public static new() {
    return new this();
  }

  public withEffects(...effs: Array<string>) {
    this.effects = effs;
    return this;
  }

  public override asJsonObject() {
    return {
      type: "minecraft:remove_effects",
      effects: this.effects,
    };
  }
}

class ConsumeEffect$ApplyEffects extends ConsumeEffect {
  private effects: Array<MobEffect> = [];
  private probability?: number;

  public override asJsonObject() {
    return {
      type: "minecraft:apply_effects",
      effects: this.effects,
      probability: this.probability,
    };
  }
  public static new() {
    return new this();
  }
  public withEffects(...effs: Array<MobEffect>) {
    this.effects = effs;
    return this;
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
  protected constructor() {
    super();
  }

  public static new() {
    return new this();
  }

  public withDiameter(value: number) {
    this.diameter = value;
    return this;
  }

  public withDirectionalParticles(value: boolean) {
    this.particles = value;
    return this;
  }
}

class ConsumeEffect$PlaySound extends ConsumeEffect {
  private soundEvent: SoundEvent;
  public override asJsonObject() {
    return {
      type: "minecraft:play_sound",
      sound: this.soundEvent.asJsonObject(),
    };
  }

  private constructor(soundEvent: SoundEvent) {
    super();
    this.soundEvent = soundEvent;
  }
  public static new(sound: string) {
    return new this(SoundEvent.new(sound));
  }

  public withRange(value: number) {
    this.soundEvent.withRange(value);
    return this;
  }
}

export class DeathProtection implements DataComponent {
  private deathEffects: Array<ConsumeEffect> | false = [];

  asJsonObject(): [string, object] {
    if (this.deathEffects === false) {
      return ["!minecraft:death_protection", {}];
    }
    return [
      "minecraft:death_protection",
      { death_effects: this.deathEffects.map((eff) => eff.asJsonObject()) },
    ];
  }

  private constructor(eff: Array<ConsumeEffect> | false) {
    this.deathEffects = eff;
  }

  public static new(...eff: Array<ConsumeEffect>) {
    return new this(eff);
  }

  public static negated() {
    new this(false);
  }
}
