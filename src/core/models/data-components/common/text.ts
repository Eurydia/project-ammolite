import { keepUndefinedOrTransform } from "#/utility/transform.ts";

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

export const TextComponent = {
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
