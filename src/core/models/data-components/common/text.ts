import z from "zod";

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
export type TextComponentValue = TextComponentType;
export type Type$TextComponent = TextComponentType;

export const Schema$TextComponent: z.ZodType<TextComponentType> = z.compile(
  z.lazy((): z.ZodType<TextComponentType> =>
    z.object({
      type: z.literal("text"),
      text: z.string(),
      color: z.string().optional(),
      font: z.string().optional(),
      bold: z.boolean().optional(),
      italic: z.boolean().optional(),
      underlined: z.boolean().optional(),
      strikethrough: z.boolean().optional(),
      obfuscated: z.boolean().optional(),
      extra: z.lazy((): z.ZodType<ReadonlyArray<TextComponentType>> =>
        Schema$TextComponent.array().readonly()
      ).optional(),
    }).readonly()
  ) as z.ZodType<TextComponentType>,
);

export interface Configurator$TextComponent {
  color(value: string): Configurator$TextComponent;
  font(value: string): Configurator$TextComponent;
  bold(value?: boolean): Configurator$TextComponent;
  italic(value?: boolean): Configurator$TextComponent;
  underlined(value?: boolean): Configurator$TextComponent;
  strikethrough(value?: boolean): Configurator$TextComponent;
  obfuscated(value?: boolean): Configurator$TextComponent;
  extra(...values: TextComponentType[]): Configurator$TextComponent;
}

export class Builder$TextComponent implements Configurator$TextComponent {
  private readonly value: { text: string } & Record<string, unknown>;
  private readonly extraValues: TextComponentType[] = [];
  constructor(text: string) {
    this.value = { text };
  }
  color(value: string) {
    this.value.color = value;
    return this;
  }
  font(value: string) {
    this.value.font = value;
    return this;
  }
  bold(value = true) {
    this.value.bold = value;
    return this;
  }
  italic(value = true) {
    this.value.italic = value;
    return this;
  }
  underlined(value = true) {
    this.value.underlined = value;
    return this;
  }
  strikethrough(value = true) {
    this.value.strikethrough = value;
    return this;
  }
  obfuscated(value = true) {
    this.value.obfuscated = value;
    return this;
  }
  extra(...values: TextComponentType[]) {
    this.extraValues.push(...values);
    return this;
  }
  build() {
    return Schema$TextComponent.parse({
      type: "text",
      ...this.value,
      extra: this.extraValues.length === 0 ? undefined : this.extraValues,
    });
  }
}

export const TextComponent = {
  builder: (text: string) => new Builder$TextComponent(text),
  from(value: Omit<TextComponentType, "type">) {
    return Schema$TextComponent.parse({ type: "text", ...value });
  },
};
