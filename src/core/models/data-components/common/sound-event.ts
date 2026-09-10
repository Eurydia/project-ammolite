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

  private constructor(sound: string, range?: number) {
    this.sound = sound;
    this.range = range;
  }

  public static new(sound: string, range?: number) {
    return new this(sound, range);
  }
}
