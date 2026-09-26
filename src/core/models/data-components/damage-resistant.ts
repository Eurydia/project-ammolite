import z from "zod";

export const Schema$DamageResistantComponent = z.compile(
  z.union([
    z
      .object({
        "minecraft:damage_resistant": z
          .object({
            types: z.union([z.string(), z.string().array().readonly()]),
          })
          .readonly(),
      })
      .readonly(),
    z
      .object({ "!minecraft:damage_resistant": z.object({}).readonly() })
      .readonly(),
  ]),
);

export type Type$DamageResistantComponent = z.output<
  typeof Schema$DamageResistantComponent
>;
export interface Configurator$DamageResistantComponent {
  type(value: string): Configurator$DamageResistantComponent;
}

class Builder$DamageResistantActive implements Configurator$DamageResistantComponent {
  private readonly values: string[] = [];

  type(value: string) {
    this.values.push(value);
    return this;
  }

  build() {
    return this.values;
  }
}

export class Builder$DamageResistantComponent {
  private value?: Type$DamageResistantComponent;

  types(configure: (builder: Configurator$DamageResistantComponent) => void) {
    const builder = new Builder$DamageResistantActive();
    configure(builder);
    this.value = { "minecraft:damage_resistant": { types: builder.build() } };
  }

  disabled() {
    this.value = { "!minecraft:damage_resistant": {} };
  }

  build() {
    return Schema$DamageResistantComponent.parse(this.value);
  }
}
