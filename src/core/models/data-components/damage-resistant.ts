import z from "zod";

const Schema$DamageResistantActive = z.compile(
  z.object({
    "minecraft:damage_resistant": z.object({
      types: z.union([z.string(), z.string().array().readonly()]),
    }).readonly(),
  }).readonly(),
);
const Schema$DamageResistantDisabled = z.compile(
  z.object({ "!minecraft:damage_resistant": z.object({}).readonly() })
    .readonly(),
);
export const Schema$DamageResistantComponent = z.compile(
  z.union([Schema$DamageResistantActive, Schema$DamageResistantDisabled]),
);

export type DamageResistantComponentType = z.output<
  typeof Schema$DamageResistantComponent
>;
export type Type$DamageResistantComponent = DamageResistantComponentType;
export interface Configurator$DamageResistantComponent {
  type(value: string): Configurator$DamageResistantComponent;
}

class Builder$DamageResistantActive
  implements Configurator$DamageResistantComponent {
  private readonly values: string[] = [];

  type(value: string) {
    this.values.push(value);
    return this;
  }

  build() {
    if (this.values.length === 0) {
      throw new Error("A damage-resistant component needs a type.");
    }
    return Schema$DamageResistantActive.parse({
      "minecraft:damage_resistant": { types: this.values },
    });
  }
}

export class Builder$DamageResistantComponent {
  private value?: DamageResistantComponentType;

  types(configure: (builder: Configurator$DamageResistantComponent) => void) {
    const builder = new Builder$DamageResistantActive();
    configure(builder);
    this.value = builder.build();
  }

  disabled() {
    this.value = { "!minecraft:damage_resistant": {} };
  }

  build() {
    return Schema$DamageResistantComponent.parse(this.value);
  }
}

export const DamageResistantComponent = {
  builder: () => new Builder$DamageResistantComponent(),
  from(...types: string[]) {
    return Schema$DamageResistantComponent.parse({
      "minecraft:damage_resistant": { types },
    });
  },
  negated() {
    return Schema$DamageResistantComponent.parse({
      "!minecraft:damage_resistant": {},
    });
  },
};
