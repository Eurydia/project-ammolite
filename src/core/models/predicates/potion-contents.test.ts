import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { MobEffectPredicate } from "./common/mob-effect.ts";
import { PotionContentsPredicate } from "./potion-contents.ts";

Deno.test(
  "potion-content predicates serialize in Minecraft predicate format",
  () => {
    const predicate = PotionContentsPredicate.from({
      potions: ["minecraft:swiftness"],
      effects: {
        contains: [
          MobEffectPredicate.from({
            effect: MobEffects.SPEED,
            amplifier: { min: 1, max: 2 },
            duration: 200,
            ambient: false,
            visible: true,
          }),
        ],
        count: [
          {
            count: { min: 1 },
            test: [MobEffectPredicate.from({ effect: MobEffects.SPEED })],
          },
        ],
        size: { min: 1, max: 2 },
      },
    });

    assertEquals(JSON.parse(JSON.stringify(predicate)), {
      potions: ["minecraft:swiftness"],
      effects: {
        contains: [
          {
            "minecraft:speed": {
              amplifier: { min: 1, max: 2 },
              duration: 200,
              ambient: false,
              visible: true,
            },
          },
        ],
        count: [
          {
            count: { min: 1 },
            test: { "minecraft:speed": {} },
          },
        ],
        size: { min: 1, max: 2 },
      },
    });
  },
);

Deno.test("potion-content predicate builders serialize nested effects", () => {
  const data = PotionContentsPredicate.builder()
    .potion("minecraft:swiftness")
    .effects((effects) =>
      effects
        .contains("minecraft:speed", (effect) => effect.duration(200))
        .size({ min: 1, max: 2 })
    )
    .build();

  assertEquals(JSON.parse(JSON.stringify(data.asJsonObject())), {
    potions: "minecraft:swiftness",
    effects: {
      contains: [{ "minecraft:speed": { duration: 200 } }],
      size: { min: 1, max: 2 },
    },
  });
});
