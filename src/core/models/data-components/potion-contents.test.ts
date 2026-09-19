import { assertEquals } from "@std/assert";
import { MobEffects } from "#/enum/mob-effects.ts";
import { MobEffectComponent } from "./common/mob-effect.ts";
import { PotionContentsComponent } from "./potion-contents.ts";

Deno.test("potion-content components serialize with Minecraft field names", () => {
  assertEquals(
    JSON.parse(JSON.stringify(PotionContentsComponent.from({
      potion: "minecraft:swiftness",
      customName: "Swift",
      customColor: "#123456",
      customEffects: [MobEffectComponent.from({ id: MobEffects.SPEED })],
    }))),
    {
      "minecraft:potion_contents": {
        potion: "minecraft:swiftness",
        custom_name: "Swift",
        custom_effects: [{ id: "minecraft:speed" }],
        custom_color: 1_193_046,
      },
    },
  );
  assertEquals(PotionContentsComponent.negated(), {
    "!minecraft:potion_contents": {},
  });
});

Deno.test("potion-content builders serialize snake-case fields", () => {
  const data = PotionContentsComponent.builder()
    .potion("minecraft:swiftness")
    .customName("Swift")
    .customColor("#123456")
    .customEffect(MobEffectComponent.builder(MobEffects.SPEED).build())
    .build();

  assertEquals(JSON.parse(JSON.stringify(data.asJsonObject())), {
    "minecraft:potion_contents": {
      potion: "minecraft:swiftness",
      custom_name: "Swift",
      custom_effects: [{ id: "minecraft:speed" }],
      custom_color: 1_193_046,
    },
  });
  assertEquals(
    PotionContentsComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:potion_contents": {} },
  );
});
