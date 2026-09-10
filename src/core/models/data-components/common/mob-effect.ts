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
