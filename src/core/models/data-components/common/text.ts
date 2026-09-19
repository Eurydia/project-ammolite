import { keepUndefinedOrTransform } from "#/utility/transform.ts";
import {
  type DataPackModel,
  freezeArray,
  freezeDataClass,
  toDataPackObject,
} from "#/models/model.ts";

export type TextComponentType = Readonly<{
  type: "text";
  text: string;
  color?: string;
  font?: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  extra?: ReadonlyArray<TextComponentType>;
}>;
export type TextComponentValue = TextComponentType | TextComponentData;

export class TextComponentData implements DataPackModel<TextComponentType> {
  public readonly text: string;
  public readonly color?: string;
  public readonly font?: string;
  public readonly bold?: boolean;
  public readonly italic?: boolean;
  public readonly underlined?: boolean;
  public readonly strikethrough?: boolean;
  public readonly obfuscated?: boolean;
  public readonly extra?: ReadonlyArray<TextComponentValue>;

  public constructor({
    text,
    color,
    font,
    bold,
    italic,
    underlined,
    strikethrough,
    obfuscated,
    extra,
  }: {
    text: string;
    color?: string;
    font?: string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    extra?: ReadonlyArray<TextComponentValue>;
  }) {
    this.text = text;
    this.color = color;
    this.font = font;
    this.bold = bold;
    this.italic = italic;
    this.underlined = underlined;
    this.strikethrough = strikethrough;
    this.obfuscated = obfuscated;
    this.extra = extra === undefined ? undefined : freezeArray(extra);
    freezeDataClass(this);
  }

  public asJsonObject(): TextComponentType {
    return Object.freeze({
      type: "text",
      text: this.text,
      color: this.color,
      font: this.font,
      bold: this.bold,
      italic: this.italic,
      underlined: this.underlined,
      strikethrough: this.strikethrough,
      obfuscated: this.obfuscated,
      extra: this.extra === undefined ? undefined : Object.freeze(
        this.extra.map((value) => toDataPackObject(value) as TextComponentType),
      ),
    });
  }
}

export interface TextComponentBuilderConfigurator {
  color(value: string): TextComponentBuilderConfigurator;
  font(value: string): TextComponentBuilderConfigurator;
  bold(value?: boolean): TextComponentBuilderConfigurator;
  italic(value?: boolean): TextComponentBuilderConfigurator;
  underlined(value?: boolean): TextComponentBuilderConfigurator;
  strikethrough(value?: boolean): TextComponentBuilderConfigurator;
  obfuscated(value?: boolean): TextComponentBuilderConfigurator;
  extra(
    ...values: Array<TextComponentValue>
  ): TextComponentBuilderConfigurator;
}

export class TextComponentBuilder implements TextComponentBuilderConfigurator {
  private readonly text: string;
  private colorValue?: string;
  private fontValue?: string;
  private boldValue?: boolean;
  private italicValue?: boolean;
  private underlinedValue?: boolean;
  private strikethroughValue?: boolean;
  private obfuscatedValue?: boolean;
  private extraValues: Array<TextComponentValue> = [];

  public constructor(text: string) {
    this.text = text;
  }

  public color(value: string): this {
    this.colorValue = value;
    return this;
  }

  public font(value: string): this {
    this.fontValue = value;
    return this;
  }

  public bold(value = true): this {
    this.boldValue = value;
    return this;
  }

  public italic(value = true): this {
    this.italicValue = value;
    return this;
  }

  public underlined(value = true): this {
    this.underlinedValue = value;
    return this;
  }

  public strikethrough(value = true): this {
    this.strikethroughValue = value;
    return this;
  }

  public obfuscated(value = true): this {
    this.obfuscatedValue = value;
    return this;
  }

  public extra(...values: Array<TextComponentValue>): this {
    this.extraValues.push(...values);
    return this;
  }

  public build(): Readonly<TextComponentData> {
    return freezeDataClass(
      new TextComponentData({
        text: this.text,
        color: this.colorValue,
        font: this.fontValue,
        bold: this.boldValue,
        italic: this.italicValue,
        underlined: this.underlinedValue,
        strikethrough: this.strikethroughValue,
        obfuscated: this.obfuscatedValue,
        extra: this.extraValues.length === 0 ? undefined : this.extraValues,
      }),
    );
  }
}

export const TextComponent = {
  builder(text: string): TextComponentBuilder {
    return new TextComponentBuilder(text);
  },
  from({
    text,
    color,
    font,
    bold,
    italic,
    underlined,
    strikethrough,
    obfuscated,
    extra,
  }: {
    text: string;
    color?: string;
    font?: string;
    bold?: boolean;
    italic?: boolean;
    underlined?: boolean;
    strikethrough?: boolean;
    obfuscated?: boolean;
    extra?: Array<TextComponentType>;
  }): TextComponentType {
    return Object.freeze({
      type: "text",
      text,
      color,
      font,
      bold,
      italic,
      underlined,
      strikethrough,
      obfuscated,
      extra: keepUndefinedOrTransform(
        extra,
        (value) => Object.freeze([...value]),
      ),
    });
  },
};
