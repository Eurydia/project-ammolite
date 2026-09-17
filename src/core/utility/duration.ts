export const MinecraftTick = {
  fromSeconds(sec: number, tickRate: number = 20) {
    return Math.floor(sec * tickRate);
  },
};
