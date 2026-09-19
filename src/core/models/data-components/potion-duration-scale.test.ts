import { assertEquals } from "@std/assert";
import { PotionDurationScaleComponent } from "./potion-duration-scale.ts";

Deno.test("potion-duration-scale components serialize as a float", () => {
  assertEquals(PotionDurationScaleComponent.from(1.5), {
    "minecraft:potion_duration_scale": 1.5,
  });
  assertEquals(PotionDurationScaleComponent.negated(), {
    "!minecraft:potion_duration_scale": {},
  });
});

Deno.test("potion-duration-scale builders separate positive and negated variants", () => {
  assertEquals(
    PotionDurationScaleComponent.builder()
      .scale(1.5)
      .build()
      .asJsonObject(),
    { "minecraft:potion_duration_scale": 1.5 },
  );
  assertEquals(
    PotionDurationScaleComponent.builder().negated().build().asJsonObject(),
    { "!minecraft:potion_duration_scale": {} },
  );
});
