import { assertEquals } from "@std/assert";
import {
  MobEffectPredicate,
  PotionContentsPredicate,
} from "./potion-contents.ts";
import { MobEffects } from "#/enum/mob-effects.ts";

Deno.test("create factory", () => {
  PotionContentsPredicate.new();
});

Deno.test("has json serializer", () => {
  const pred = PotionContentsPredicate.new();
  assertEquals(pred.toJSON(), JSON.stringify({}));
});

Deno.test("builder factory for potions", () => {
  const pred = PotionContentsPredicate.new();
  pred.wherePotions(MobEffects.AWKWARD, MobEffects.FIRE_RESISTANCE);
  assertEquals(
    pred.toJSON(),
    JSON.stringify({
      potions: [MobEffects.AWKWARD, MobEffects.FIRE_RESISTANCE],
    }),
  );
});

Deno.test("can pass effects.size as nunber to effects builder", () => {
  const pred = PotionContentsPredicate.new();
  pred.whereEffects({ size: 1 });
  assertEquals(pred.toJSON(), JSON.stringify({ effects: { size: 1 } }));
});

Deno.test("can pass effects.size as range to effects builder", () => {
  const pred = PotionContentsPredicate.new();
  const eff = { size: { max: 1, min: 1 } };
  pred.whereEffects(eff);
  assertEquals(pred.toJSON(), JSON.stringify({ effects: eff }));
});

Deno.test("can pass effects.contains as range to effects builder", () => {
  const pred = PotionContentsPredicate.new();
  const eff = {
    contains: [
      MobEffectPredicate.new(MobEffects.FIRE_RESISTANCE).whereDuration(2),
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

Deno.test("can pass effects.count as range to effects builder", () => {
  const pred = PotionContentsPredicate.new();
  const eff = {
    count: [
      {
        count: 1,
        test: [
          MobEffectPredicate.new(MobEffects.FIRE_RESISTANCE).whereDuration(2),
        ],
      },
      {
        count: 1,
        test: [
          MobEffectPredicate.new(MobEffects.REGENERATION)
            .whereDuration(2)
            .whereAmbient(true),
        ],
      },
    ],
  };
  pred.whereEffects(eff);
  assertEquals(
    pred.toJSON(),
    JSON.stringify({
      effects: {
        count: [
          { count: 1, test: { "minecraft:fire_resistance": { duration: 2 } } },
          {
            count: 1,
            test: { "minecraft:regeneration": { duration: 2, ambient: true } },
          },
        ],
      },
    }),
  );
});
