import { assertEquals } from "@std/assert";
import { EnchantmentGlintOverrideComponent } from "./enchantment-glint-override.ts";

Deno.test("glint overrides serialize as a boolean", () => {
  assertEquals(EnchantmentGlintOverrideComponent.from(true), {
    "minecraft:enchantment_glint_override": true,
  });
  assertEquals(EnchantmentGlintOverrideComponent.negated(), {
    "!minecraft:enchantment_glint_override": {},
  });
});
