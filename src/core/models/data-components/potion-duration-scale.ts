import z from "zod";

const __Schema$PotionDurationScaleComponent$Active = z.compile(
  z
    .object({
      "minecraft:potion_duration_scale": z.float32(),
    })
    .readonly(),
);

const __Schema$PotionDurationScaleComponent$Disabled = z.compile(
  z
    .object({
      "!minecraft:potion_duration_scale": z.object({}).readonly(),
    })
    .readonly(),
);

const Schema$PotionDurationScaleComponent = z.compile(
  z.union([
    __Schema$PotionDurationScaleComponent$Active,
    __Schema$PotionDurationScaleComponent$Disabled,
  ]),
);

export type Type$PotionDurationScaleComponent = z.output<
  typeof Schema$PotionDurationScaleComponent
>;

export interface Configurator$PotionDurationScaleComponent {
  scale(value: number): void;
  disabled(): void;
}

export class Builder$PotionDurationScaleComponent
  implements Configurator$PotionDurationScaleComponent {
  private value?: Type$PotionDurationScaleComponent;

  scale(scaleValue: number) {
    this.value = { "minecraft:potion_duration_scale": scaleValue };
  }

  disabled() {
    this.value = { "!minecraft:potion_duration_scale": {} };
  }

  build() {
    return Schema$PotionDurationScaleComponent.parse(this.value);
  }
}
