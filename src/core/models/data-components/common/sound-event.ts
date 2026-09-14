export type SoundEventType =
  | string
  | Readonly<{
    sound_id: string;
    range?: number;
  }>;

export const SoundEvent = {
  from(
    { soundId, range }: { soundId: string; range?: number },
  ): SoundEventType {
    return range === undefined ? soundId : { sound_id: soundId, range };
  },
};
