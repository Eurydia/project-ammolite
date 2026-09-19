import { assert, assertEquals } from "@std/assert";
import { MobEffectPredicate } from "#/models/predicates/common/mob-effect.ts";
import { PotionContentsPredicate } from "#/models/predicates/potion-contents.ts";
import { NumberBound } from "#/models/predicates/common/byte-bound.ts";

Deno.test("number bounds accept an in-range NBT range", () => {
  assertEquals(NumberBound.integer({ min: 20, max: 40 }), {
    min: 20,
    max: 40,
  });
});

Deno.test("potion predicates reuse nested factor values", () => {
  const duration = { min: 20, max: 40 };
  const effect = MobEffectPredicate.from({
    effect: "minecraft:speed",
    duration,
  });
  const predicate = PotionContentsPredicate.from({
    effects: {
      contains: [effect],
      size: { min: 1, max: 2 },
    },
  });

  assert(Object.isFrozen(predicate));
  assert(Object.isFrozen(predicate.effects));
  assert(Object.isFrozen(predicate.effects?.contains));
  assert(Object.isFrozen(predicate.effects?.contains?.[0]));
  assert(Object.isFrozen(effect.duration));
  assert(
    predicate.effects?.contains?.[0]?.["minecraft:speed"]?.duration ===
      effect.duration,
  );
  assert(Object.isFrozen(predicate.effects?.size));
  assertEquals(Object.isFrozen(duration), false);
  assertEquals(JSON.parse(JSON.stringify(predicate.effects?.contains)), [
    { "minecraft:speed": { duration: { min: 20, max: 40 } } },
  ]);
});
