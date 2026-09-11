export abstract class Text {
  protected color?: string;
  protected font?: string;
  protected bold?: boolean;
  protected italic?: boolean;
  protected underlined?: boolean;
  protected strikethrough?: boolean;
  protected obfuscated?: boolean;
  protected variant: string;

  public static Text(body: string) {
    return Text$Text.new(body);
  }
  protected constructor(variant: string) {
    this.variant = variant;
  }
  public asJsonObject() {
    return {
      type: this.variant,
      color: this.color,
      font: this.font,
      bold: this.bold,
      italic: this.italic,
      underlined: this.underlined,
      strikethrough: this.strikethrough,
      obfuscated: this.obfuscated,
    };
  }

  public withColor(color: string) {
    this.color = color;
    return this;
  }
  public withFont(font: string) {
    this.font = font;
    return this;
  }
  public withBold(bold: boolean = true) {
    this.bold = bold;
    return this;
  }
  public withItalic(italic: boolean = true) {
    this.italic = italic;
    return this;
  }
  public withUnderlined(underline: boolean = true) {
    this.underlined = underline;
    return this;
  }
  public withStrikethrough(strikethrough: boolean = true) {
    this.strikethrough = strikethrough;
    return this;
  }

  public withObfuscated(value: boolean = true) {
    this.obfuscated = value;
    return this;
  }
}

class Text$Text extends Text {
  private body: string;
  private constructor(body: string) {
    super("text");
    this.body = body;
  }
  public static new(body: string) {
    return new this(body);
  }
}
