import z from "zod";

type TextComponentOutput = Readonly<{
  type: "text";
  text: string;
  color?: string;
  font?: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  extra?: readonly TextComponentOutput[];
}>;

const __Schema$TextComponent: z.ZodType<TextComponentOutput> = z.lazy(() =>
  z
    .object({
      type: z.literal("text"),
      text: z.string(),
      color: z.string().optional(),
      font: z.string().optional(),
      bold: z.boolean().optional(),
      italic: z.boolean().optional(),
      underlined: z.boolean().optional(),
      strikethrough: z.boolean().optional(),
      obfuscated: z.boolean().optional(),
      extra: z.lazy(() => __Schema$TextComponent.array().readonly()).optional(),
    })
    .readonly(),
);

export const Schema$TextComponent = z.compile(__Schema$TextComponent);
export type Type$TextComponent = z.output<typeof Schema$TextComponent>;

export interface Configurator$TextComponent {
  text(value: string): Configurator$TextComponent;
  color(value: string): Configurator$TextComponent;
  font(value: string): Configurator$TextComponent;
  bold(value?: boolean): Configurator$TextComponent;
  italic(value?: boolean): Configurator$TextComponent;
  underlined(value?: boolean): Configurator$TextComponent;
  strikethrough(value?: boolean): Configurator$TextComponent;
  obfuscated(value?: boolean): Configurator$TextComponent;
  extra(
    ...values: ((builder: Configurator$TextComponent) => void)[]
  ): Configurator$TextComponent;
}

export class Builder$TextComponent implements Configurator$TextComponent {
  private textValue?: string;
  private colorValue?: string;
  private fontValue?: string;
  private boldValue?: boolean;
  private italicValue?: boolean;
  private underlinedValue?: boolean;
  private strikethroughValue?: boolean;
  private obfuscatedValue?: boolean;
  private extraValues?: Type$TextComponent[];

  text(value: string) {
    this.textValue = value;
    return this;
  }
  color(value: string) {
    this.colorValue = value;
    return this;
  }
  font(value: string) {
    this.fontValue = value;
    return this;
  }
  bold(value = true) {
    this.boldValue = value;
    return this;
  }
  italic(value = true) {
    this.italicValue = value;
    return this;
  }
  underlined(value = true) {
    this.underlinedValue = value;
    return this;
  }
  strikethrough(value = true) {
    this.strikethroughValue = value;
    return this;
  }
  obfuscated(value = true) {
    this.obfuscatedValue = value;
    return this;
  }
  extra(...configureFns: ((builder: Configurator$TextComponent) => void)[]) {
    this.extraValues ??= [];
    this.extraValues.push(
      configureFns.map((config) => {
        const builder = new Builder$TextComponent();
        config(builder);
        return builder.build();
      }),
    );
    return this;
  }
  build() {
    return __Schema$TextComponent.parse({
      type: "text",
      text: this.textValue,
      color: this.colorValue,
      font: this.fontValue,
      bold: this.boldValue,
      italic: this.italicValue,
      underlined: this.underlinedValue,
      strikethrough: this.strikethroughValue,
      obfuscated: this.obfuscatedValue,
      extra: this.extraValues,
    });
  }
}
