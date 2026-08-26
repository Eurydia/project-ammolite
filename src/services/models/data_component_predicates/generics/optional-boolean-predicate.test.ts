import { expect, it } from "vitest";
import { OptionalBooleanPredicate } from "./optional-boolean-predicate";

it("parses 'yes' string into true", () => {
  expect(OptionalBooleanPredicate.parse("yes")).toBe(true);
});
it("parses 'no' string into false", () => {
  expect(OptionalBooleanPredicate.parse("no")).toBe(false);
});

it("parses 'unset' string into undefined", () => {
  expect(OptionalBooleanPredicate.parse("unset")).toBe(undefined);
});
