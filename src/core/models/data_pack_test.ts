import { assertEquals } from "@std/assert";
import { DataPack } from "#/models/data_pack.ts";

let pack: DataPack;

Deno.test.beforeEach(() => {
  pack = new DataPack("Hello");

  Deno.test("can pass description when creating data pack", () => {
    assertEquals(pack.getDesc(), "Hello");
  });
});
