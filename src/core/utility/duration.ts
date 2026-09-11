export class MinecraftTick {
  public static fromSeconds(sec: number, tickRate: number = 20) {
    return Math.floor(sec * tickRate);
  }
}
