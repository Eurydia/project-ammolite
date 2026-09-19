import { type DataPackModel, freezeDataClass } from "#/models/model.ts";

export type EnchantmentGlintOverrideComponentType = Readonly<
  | {
    "!minecraft:enchantment_glint_override": Readonly<
      Record<PropertyKey, never>
    >;
  }
  | { "minecraft:enchantment_glint_override": boolean }
>;

export class EnchantmentGlintOverrideComponentData
  implements DataPackModel<EnchantmentGlintOverrideComponentType> {
  public readonly value?: boolean;
  public readonly negated: boolean;

  public constructor(value?: boolean, negated = false) {
    this.value = value;
    this.negated = negated;
    freezeDataClass(this);
  }

  public asJsonObject(): EnchantmentGlintOverrideComponentType {
    return this.negated
      ? Object.freeze({
        "!minecraft:enchantment_glint_override": Object.freeze({}),
      })
      : Object.freeze({
        "minecraft:enchantment_glint_override": this.value!,
      });
  }
}

export interface EnchantmentGlintOverrideComponentBuilderConfigurator {
  glint(
    value: boolean,
  ): EnchantmentGlintOverrideComponentBuilderConfigurator;
  negated(): NegatedEnchantmentGlintOverrideComponentBuilderConfigurator;
}

export interface NegatedEnchantmentGlintOverrideComponentBuilderConfigurator {
  build(): Readonly<EnchantmentGlintOverrideComponentData>;
}

export class EnchantmentGlintOverrideComponentBuilder
  implements EnchantmentGlintOverrideComponentBuilderConfigurator {
  private glintValue?: boolean;

  public glint(value: boolean): this {
    this.glintValue = value;
    return this;
  }

  public negated(): NegatedEnchantmentGlintOverrideComponentBuilderConfigurator {
    return new NegatedEnchantmentGlintOverrideComponentBuilder();
  }

  public build(): Readonly<EnchantmentGlintOverrideComponentData> {
    if (this.glintValue === undefined) {
      throw new Error("An enchantment-glint-override component needs a value.");
    }
    return freezeDataClass(
      new EnchantmentGlintOverrideComponentData(this.glintValue),
    );
  }
}

export class NegatedEnchantmentGlintOverrideComponentBuilder
  implements NegatedEnchantmentGlintOverrideComponentBuilderConfigurator {
  public build(): Readonly<EnchantmentGlintOverrideComponentData> {
    return freezeDataClass(
      new EnchantmentGlintOverrideComponentData(undefined, true),
    );
  }
}

export const EnchantmentGlintOverrideComponent = {
  builder(): EnchantmentGlintOverrideComponentBuilder {
    return new EnchantmentGlintOverrideComponentBuilder();
  },
  negatedBuilder(): NegatedEnchantmentGlintOverrideComponentBuilder {
    return new NegatedEnchantmentGlintOverrideComponentBuilder();
  },
  from(value: boolean): EnchantmentGlintOverrideComponentType {
    return Object.freeze({ "minecraft:enchantment_glint_override": value });
  },
  negated(): EnchantmentGlintOverrideComponentType {
    return Object.freeze({
      "!minecraft:enchantment_glint_override": Object.freeze({}),
    });
  },
};
