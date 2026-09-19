import {
  NumberBound,
  SNBT_FLOAT_MIN_POSITIVE,
} from "#/models/predicates/common/byte-bound.ts";
import { type DataPackModel, freezeDataClass } from "#/models/model.ts";

export type SoundEventType =
  | string
  | Readonly<{
      sound_id: string;
      range?: number;
    }>;

export class SoundEventData implements DataPackModel<SoundEventType> {
  public readonly soundId: string;
  public readonly range?: number;

  public constructor(soundId: string, range?: number) {
    this.soundId = soundId;
    this.range = range;
    freezeDataClass(this);
  }

  public asJsonObject(): SoundEventType {
    return this.range === undefined
      ? this.soundId
      : Object.freeze({ sound_id: this.soundId, range: this.range });
  }
}

export interface SoundEventBuilderConfigurator {
  range(value: number): SoundEventBuilderConfigurator;
}

export class SoundEventBuilder implements SoundEventBuilderConfigurator {
  private readonly soundId: string;
  private rangeValue?: number;

  public constructor(soundId: string) {
    this.soundId = soundId;
  }

  public range(value: number): this {
    this.rangeValue = NumberBound.float(value, SNBT_FLOAT_MIN_POSITIVE);
    return this;
  }

  public build(): Readonly<SoundEventData> {
    return freezeDataClass(new SoundEventData(this.soundId, this.rangeValue));
  }
}

export const SoundEvent = {
  builder(soundId: string): SoundEventBuilder {
    return new SoundEventBuilder(soundId);
  },
  from(soundId: string, range?: number): SoundEventType {
    return range === undefined
      ? soundId
      : Object.freeze({
          sound_id: soundId,
          range: NumberBound.float(range, SNBT_FLOAT_MIN_POSITIVE),
        });
  },
};
