export class SoundEvent {
  private sound: string;
  private range?: number;
  public asJsonObject() {
    return this.range === undefined
      ? this.sound
      : {
          sound_id: this.sound,
          range: this.range,
        };
  }

  private constructor(sound: string) {
    this.sound = sound;
  }

  public static new(sound: string) {
    return new this(sound);
  }

  public withRange(value: number) {
    this.range = value;
    return this;
  }
}
