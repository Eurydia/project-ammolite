// import z from "zod";
// import { PotionType } from "#/services/enums/potion-effect.enum";
// import { IntString } from "../data_component_predicates/generics/int-string";
// import { OptionalIntString } from "../data_component_predicates/generics/optional-int-string";
// import { DATA_COMPONENT_MODE_OPTIONS } from "./data-component-mode";

import { DataComponent } from "#/models/data-components/data-component-base.ts";

// export const PotionContents$CustomColor = z.object({
//   red: IntString.pipe(z.int().min(0).max(255)),
//   green: IntString.pipe(z.int().min(0).max(255)),
//   blue: IntString.pipe(z.int().min(0).max(255)),
// });

// export const PotionContents$CustomColor$AsDatapackJSON = (
//   dt: z.output<typeof PotionContents$CustomColor>,
// ) => {
//   const red = dt.red * 256 * 256;
//   const green = dt.green * 256;
//   return red + green + dt.blue;
// };

// export const PotionContents$CustomEffects$Effect = z.object({
//   id: z.enum(PotionType),
//   duration: OptionalIntString,
//   amplifier: OptionalIntString,
//   visible: z.boolean().optional(),
//   ambient: z.boolean().optional(),
//   showIcon: z.boolean().optional(),
//   showParticles: z.boolean().optional(),
// });

// export const PotionContents$CustomEffects$Effect$AsDatapackJSON = (
//   dt: z.output<typeof PotionContents$CustomEffects$Effect>,
// ) => {
//   return {
//     id: dt.id,
//     amplifier: dt.amplifier,
//     duration: dt.duration,
//     show_particles: dt.showParticles,
//     show_icon: dt.showIcon,
//     ambient: dt.ambient,
//     visible: dt.visible,
//   };
// };

// export const PotionContents$CustomEffects = z.object({
//   values: PotionContents$CustomEffects$Effect.array(),
// });

// export const PotionContents$CustomEffects$AsDatapackJSON = (
//   dt: z.output<typeof PotionContents$CustomEffects>,
// ) => {
//   return dt.values.map((value) =>
//     PotionContents$CustomEffects$Effect$AsDatapackJSON(value)
//   );
// };

// export const PotionContents = z.discriminatedUnion("mode", [
//   z.object({
//     mode: z.literal(DATA_COMPONENT_MODE_OPTIONS[0]),
//     id: z.literal("minecraft:potion_contents"),
//     potion: z.enum(PotionType),
//     customName: z
//       .string()
//       .normalize()
//       .transform((arg) => arg || undefined)
//       .pipe(z.string().optional()),
//     customColor: PotionContents$CustomColor.optional(),
//     customEffects: PotionContents$CustomEffects.optional(),
//   }),
//   z.object({ mode: z.literal(DATA_COMPONENT_MODE_OPTIONS[1]) }),
// ]);

// export const PotionContents$AsDataPackJSON = (
//   dt: z.output<typeof PotionContents>,
// ) => {
//   if (dt.mode === "negated") {
//     return { "!minecraft:potion_contents": {} };
//   }

//   return {
//     "minecraft:potion_contents": {
//       potion: dt.potion,
//       custom_name: dt.customName,
//       custom_color: dt.customColor === undefined
//         ? undefined
//         : PotionContents$CustomColor$AsDatapackJSON(dt.customColor),
//       custom_effects: dt.customEffects === undefined
//         ? undefined
//         : PotionContents$CustomEffects$AsDatapackJSON(dt.customEffects),
//     },
//   };
// };

export class MobEffect {
  private id: string;
  private duration?: number;
  private amplifier?: number;
  private visible?: boolean;
  private ambient?: boolean;
  private showIcon?: boolean;
  private showParticles?: boolean;

  private constructor(id: string) {
    this.id = id;
  }

  public static new(id: string) {
    return new this(id);
  }

  public withDuration(ticks: number) {
    this.duration = ticks;
    return this;
  }

  public withAmplifier(amp: number) {
    this.amplifier = amp;
    return this;
  }

  public withAmbient(value: boolean) {
    this.ambient = value;
    return this;
  }
  public withVisible(value: boolean) {
    this.visible = value;
    return this;
  }
  public withShowIcon(value: boolean) {
    this.showIcon = value;
    return this;
  }
  public withShowParticles(value: boolean) {
    this.showParticles = value;
    return this;
  }

  public asJsonObject() {
    return {
      id: this.id,
      duration: this.duration,
      amplifier: this.amplifier,
      visible: this.visible,
      ambient: this.ambient,
      show_icon: this.showIcon,
      show_particles: this.showParticles,
    };
  }
}

export class PotionContents implements DataComponent {
  private potion: string;
  private customName?: string;
  private customColor?: number;
  private customEffects?: Array<MobEffect>;

  private constructor(potion: string) {
    this.potion = potion;
  }

  public static new(potion: string) {
    return new this(potion);
  }

  public withHexColor(hex: string) {
    this.customColor = Number.parseInt(hex.slice(1), 16);
    return this;
  }

  public withName(name: string) {
    this.customName = name;
    return this;
  }

  public withEffects(...effs: Array<MobEffect>) {
    this.customEffects = [...effs];
    return this;
  }

  public asJsonObject() {
    return {
      potion: this.potion,
      custom_name: this.customName,
      custom_color: this.customColor,
      custom_effects: this.customEffects,
      component: "minecraft:potion_contents",
    };
  }
}
