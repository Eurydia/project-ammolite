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
    extra?: ReadonlyArray<TextComponentType>;
  }): TextComponentType {
    return {
      type: "text",
      text,
      color,
      font,
      bold,
      italic,
      underlined,
      strikethrough,
      obfuscated,
      extra,
    };
  },
};
