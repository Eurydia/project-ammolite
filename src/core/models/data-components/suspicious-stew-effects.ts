import z from "zod";

export const Schema$SuspiciousStewEffectsComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:suspicious_stew_effects": z
          .object({ id: z.string().normalize(), duration: z.int().optional() })
          .readonly()
          .array()
          .readonly(),
      })
      .readonly(),
    z
      .object({
        "!minecraft:suspicious_stew_effects": z.object({}).readonly(),
      })
      .readonly(),
  ]),
);

export type Type$SuspiciousStewEffectsComponent = z.output<
  typeof Schema$SuspiciousStewEffectsComponent
>;

interface __Configurator$SuspiciousStewEffectsComponent$Active {
  effect(
    id: string,
    duration?: number,
  ): __Configurator$SuspiciousStewEffectsComponent$Active;
}

class __Builder$SuspiciousStewEffectsComponent$Active implements __Configurator$SuspiciousStewEffectsComponent$Active {
  private values: Array<{ id: string; duration?: number }> = [];

  effect(id: string, duration?: number): this {
    this.values.push({
      id,
      duration,
    });
    return this;
  }

  build() {
    return this.values;
  }
}

export class Builder$SuspiciousStewEffectsComponent {
  private value?: Type$SuspiciousStewEffectsComponent;

  effects(
    configure: (
      builder: __Configurator$SuspiciousStewEffectsComponent$Active,
    ) => void,
  ) {
    const builder = new __Builder$SuspiciousStewEffectsComponent$Active();
    configure(builder);
    this.value = {
      "minecraft:suspicious_stew_effects": builder.build(),
    };
  }

  disabled() {
    this.value = { "!minecraft:suspicious_stew_effects": {} };
  }

  build() {
    return Schema$SuspiciousStewEffectsComponent.parse(this.value);
  }
}
