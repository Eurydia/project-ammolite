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
