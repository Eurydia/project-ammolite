import { assertEquals, assertThrows } from "@std/assert";
import {
  NumberBound,
  SNBT_FLOAT_MAX,
  SNBT_FLOAT_MIN,
} from "#/models/snbt/number-bound.ts";

Deno.test("float number bounds accept only scalar SNBT floats", () => {
  assertEquals(NumberBound.float(1.5), 1.5);
  assertEquals(NumberBound.float(SNBT_FLOAT_MIN), SNBT_FLOAT_MIN);
  assertEquals(NumberBound.float(SNBT_FLOAT_MAX), SNBT_FLOAT_MAX);
  assertThrows(() => NumberBound.float(Number.POSITIVE_INFINITY));
  assertThrows(() => NumberBound.float({ min: 0 } as unknown as number));
});

Deno.test("number bounds serialize as a scalar or range", () => {
  assertEquals(NumberBound.integer(20), 20);
  assertEquals(NumberBound.integer({ min: 20, max: 40 }), {
    min: 20,
    max: 40,
  });
});
