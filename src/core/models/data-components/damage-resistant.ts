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

export interface Configurator$DamageResistantComponent {
  types(...values: Array<string>): void;
  disabled(): void;
}

export type Type$DamageResistantComponent = z.output<
  typeof Schema$DamageResistantComponent
>;

export class Builder$DamageResistantComponent implements Configurator$DamageResistantComponent {
  private value?: Type$DamageResistantComponent;

  types(...values: Array<string>) {
    this.value = { "minecraft:damage_resistant": { types: values } };
  }

  disabled() {
    this.value = { "!minecraft:damage_resistant": {} };
  }

  build() {
    return Schema$DamageResistantComponent.parse(this.value);
  }
}
