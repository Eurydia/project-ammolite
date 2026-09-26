import z from "zod";

export const Schema$EnchantmentGlintOverrideComponent = z.compile(
  z.union([
    z
      .object({ "minecraft:enchantment_glint_override": z.boolean() })
      .readonly(),
    z
      .object({
        "!minecraft:enchantment_glint_override": z.object({}).readonly(),
      })
      .readonly(),
  ]),
);

export type Type$EnchantmentGlintOverrideComponent = z.output<
  typeof Schema$EnchantmentGlintOverrideComponent
>;

export interface Configurator$EnchantmentGlintOverrideComponent {
  glint(value: boolean): void;
  disabled(): void;
}

export class Builder$EnchantmentGlintOverrideComponent implements Configurator$EnchantmentGlintOverrideComponent {
  private value?: Type$EnchantmentGlintOverrideComponent;

  glint(showGlint: boolean = true) {
    this.value = { "minecraft:enchantment_glint_override": showGlint };
  }

  disabled() {
    this.value = { "!minecraft:enchantment_glint_override": {} };
  }

  build() {
    return Schema$EnchantmentGlintOverrideComponent.parse(this.value);
  }
}
