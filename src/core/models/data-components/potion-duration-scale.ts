import z from "zod";

const Schema$PotionDurationScaleComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:potion_duration_scale": z.float32(),
      })
      .readonly(),
    z
      .object({
        "!minecraft:potion_duration_scale": z.object({}).readonly(),
      })
      .readonly(),
  ]),
);

export type Type$PotionDurationScaleComponent = z.output<
  typeof Schema$PotionDurationScaleComponent
>;

export interface Configurator$PotionDurationScaleComponent {
  scale(value: number): void;
  disabled(): void;
}

export class Builder$PotionDurationScaleComponent implements Configurator$PotionDurationScaleComponent {
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
