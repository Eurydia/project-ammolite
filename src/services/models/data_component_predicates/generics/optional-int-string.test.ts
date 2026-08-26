import { expect, it } from "vitest";
import { OptionalIntString } from "./optional-int-string";

it("parses int string into int", () => {
  expect(OptionalIntString.parse("2")).toBe(2);
});

it("parses empty string into undefined", () => {
  expect(OptionalIntString.parse("")).toBe(undefined);
});
