export abstract class Text {
  public static Str(body: string) {
    return Text$Str.new(body);
  }
  protected constructor() {}
  public abstract asJsonObject(): string | { type: string };
}

class Text$Str extends Text {
  private body: string;
  private constructor(body: string) {
    super();
    this.body = body;
  }
  public override asJsonObject() {
    return this.body;
  }
  public static new(body: string) {
    return new this(body);
  }
}
