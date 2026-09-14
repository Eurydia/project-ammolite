import {
  NumberBound,
  SNBT_FLOAT_MIN_POSITIVE,
} from "#/models/snbt/number-bound.ts";

export type SoundEventType =
  | string
  | Readonly<{
    sound_id: string;
    range?: number;
  }>;

export const SoundEvent = {
  from(soundId: string, range?: number): SoundEventType {
    return range === undefined ? soundId : Object.freeze({
      sound_id: soundId,
      range: NumberBound.float(range, SNBT_FLOAT_MIN_POSITIVE),
    });
  },
};
