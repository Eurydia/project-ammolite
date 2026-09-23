import z from "zod";

const __Schema$EnchantmentGlintOverrideComponent$Active = z.compile(
  z.object({ "minecraft:enchantment_glint_override": z.boolean() }).readonly(),
);

const __Schema$EnchantmentGlintOverrideComponent$Disabled = z.compile(
  z
    .object({
      "!minecraft:enchantment_glint_override": z.object({}).readonly(),
    })
    .readonly(),
);

export const Schema$EnchantmentGlintOverrideComponent = z.compile(
  z.union([
    __Schema$EnchantmentGlintOverrideComponent$Active,
    __Schema$EnchantmentGlintOverrideComponent$Disabled,
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

  glint(showGlint: boolean) {
    this.value = { "minecraft:enchantment_glint_override": showGlint };
  }

  disabled() {
    this.value = { "!minecraft:enchantment_glint_override": {} };
  }

  build() {
    return Schema$EnchantmentGlintOverrideComponent.parse(this.value);
  }
}
