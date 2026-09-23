import z from "zod";

export const Schema$SoundEventComponent = z.compile(
  z.union([
    z.string(),
    z
      .object({ sound_id: z.string(), range: z.float32().optional() })
      .readonly(),
  ]),
);

export type Type$SoundEventComponent = z.output<
  typeof Schema$SoundEventComponent
>;

export interface Configurator$SoundEventComponent {
  range(value: number): Configurator$SoundEventComponent;
  soundId(value: string): Configurator$SoundEventComponent;
}

export class SoundEventBuilder implements Configurator$SoundEventComponent {
  private soundIdValue?: string;
  private rangeValue?: number;

  soundId(id: string) {
    this.soundIdValue = id;
    return this;
  }

  range(value: number) {
    this.rangeValue = value;
    return this;
  }

  build() {
    return Schema$SoundEventComponent.parse({
      sound_id: this.soundIdValue,
      range: this.rangeValue,
    });
  }
}
