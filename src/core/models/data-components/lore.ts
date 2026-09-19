import type {
  TextComponentType,
  TextComponentValue,
} from "#/models/data-components/common/text.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type LoreComponentType = Readonly<
  | { "!minecraft:lore": Readonly<Record<PropertyKey, never>> }
  | { "minecraft:lore": ReadonlyArray<TextComponentType> }
>;

export class LoreComponentData implements DataPackModel<LoreComponentType> {
  public readonly lines: ReadonlyArray<TextComponentValue>;
  public readonly negated: boolean;

  public constructor(
    lines: ReadonlyArray<TextComponentValue>,
    negated = false,
  ) {
    this.lines = freezeArray(lines);
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): LoreComponentType {
    return this.negated
      ? Object.freeze({ "!minecraft:lore": Object.freeze({}) })
      : Object.freeze({
        "minecraft:lore": Object.freeze(
          this.lines.map((line) => toDataPackObject(line) as TextComponentType),
        ),
      });
  }
}

export interface LoreComponentBuilderConfigurator {
  line(value: TextComponentValue): LoreComponentBuilderConfigurator;
  negated(): NegatedLoreComponentBuilderConfigurator;
}

export interface NegatedLoreComponentBuilderConfigurator {
  build(): Readonly<LoreComponentData>;
}

export class LoreComponentBuilder implements LoreComponentBuilderConfigurator {
  private readonly lineValues: Array<TextComponentValue> = [];

  public line(value: TextComponentValue): this {
    this.lineValues.push(value);
    return this;
  }

  public negated(): NegatedLoreComponentBuilderConfigurator {
    return new NegatedLoreComponentBuilder();
  }

  public build(): Readonly<LoreComponentData> {
    if (this.lineValues.length > 256) {
      throw new Error("Minecraft lore supports at most 256 lines.");
    }
    return freezeDataClass(new LoreComponentData(this.lineValues));
  }
}

export class NegatedLoreComponentBuilder
  implements NegatedLoreComponentBuilderConfigurator {
  public build(): Readonly<LoreComponentData> {
    return freezeDataClass(new LoreComponentData([], true));
  }
}

export const LoreComponent = {
  builder(): LoreComponentBuilder {
    return new LoreComponentBuilder();
  },
  negatedBuilder(): NegatedLoreComponentBuilder {
    return new NegatedLoreComponentBuilder();
  },
  from(...lines: Array<TextComponentType>): LoreComponentType {
    if (lines.length > 256) {
      throw new Error("Minecraft lore supports at most 256 lines.");
    }

    return Object.freeze({ "minecraft:lore": Object.freeze([...lines]) });
  },
  negated(): LoreComponentType {
    return Object.freeze({ "!minecraft:lore": Object.freeze({}) });
  },
};
