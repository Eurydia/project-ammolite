import { assertEquals } from "@std/assert";
import {
  Builder$EnchantmentGlintOverrideComponent,
  Schema$EnchantmentGlintOverrideComponent,
} from "./enchantment-glint-override.ts";

Deno.test("glint overrides serialize as a boolean", () => {
  assertEquals(
    Schema$EnchantmentGlintOverrideComponent.parse({
      "minecraft:enchantment_glint_override": true,
    }),
    {
      "minecraft:enchantment_glint_override": true,
    },
  );
  assertEquals(
    Schema$EnchantmentGlintOverrideComponent.parse({
      "!minecraft:enchantment_glint_override": {},
    }),
    {
      "!minecraft:enchantment_glint_override": {},
    },
  );
});

Deno.test("glint override builders separate positive and negated variants", () => {
  const enabled = new Builder$EnchantmentGlintOverrideComponent();
  enabled.glint(true);
  assertEquals(enabled.build(), {
    "minecraft:enchantment_glint_override": true,
  });
  const disabled = new Builder$EnchantmentGlintOverrideComponent();
  disabled.disabled();
  assertEquals(disabled.build(), {
    "!minecraft:enchantment_glint_override": {},
  });
});
