import { assertEquals } from "@std/assert";
import { MobEffectPredicate, PotionContents } from "./potion-contents.ts";
import { MobEffect } from "#/enum/mob-effects.ts";

Deno.test("create factory", () => {
  PotionContents.new();
});

Deno.test("has json serializer", () => {
  const pred = PotionContents.new();
  assertEquals(pred.toJSON(), JSON.stringify({}));
});

Deno.test("builder factory for potions", () => {
  const pred = PotionContents.new();
  pred.wherePotions(MobEffect.AWKWARD, MobEffect.FIRE_RESISTANCE);
  assertEquals(
    pred.toJSON(),
    JSON.stringify({ potions: [MobEffect.AWKWARD, MobEffect.FIRE_RESISTANCE] }),
  );
});

Deno.test("can pass effects.size as nunber to effects builder", () => {
  const pred = PotionContents.new();
  pred.whereEffects({ size: 1 });
  assertEquals(pred.toJSON(), JSON.stringify({ effects: { size: 1 } }));
});

Deno.test("can pass effects.size as range to effects builder", () => {
  const pred = PotionContents.new();
  const eff = { size: { max: 1, min: 1 } };
  pred.whereEffects(eff);
  assertEquals(pred.toJSON(), JSON.stringify({ effects: eff }));
});

Deno.test("can pass effects.contains as range to effects builder", () => {
  const pred = PotionContents.new();
  const eff = {
    contains: [
      MobEffectPredicate.new(MobEffect.FIRE_RESISTANCE).whereDuration(2),
    ],
  };
  pred.whereEffects(eff);
  assertEquals(
    pred.toJSON(),
    JSON.stringify({
      effects: { contains: [{ "minecraft:fire_resistance": { duration: 2 } }] },
    }),
  );
});
