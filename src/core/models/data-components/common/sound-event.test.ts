import { assertEquals } from "@std/assert";
import { SoundEvent } from "./sound-event.ts";

Deno.test("sound events serialize in both Minecraft formats", () => {
  assertEquals(
    SoundEvent.from("minecraft:entity.generic.drink"),
    "minecraft:entity.generic.drink",
  );
  assertEquals(
    SoundEvent.from("minecraft:entity.generic.drink", 16),
    { sound_id: "minecraft:entity.generic.drink", range: 16 },
  );
});
