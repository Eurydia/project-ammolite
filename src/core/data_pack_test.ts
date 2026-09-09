import { assertEquals } from "@std/assert";
import { DataPack } from "./data_pack.ts";

let pack: DataPack;

Deno.test.beforeEach(() => {
  pack = new DataPack("Hello");
  Deno.test("can create a data pack", () => {
    new DataPack();
  });

  Deno.test("can pass description when creating data pack", () => {
    assertEquals(pack.getDesc(), "Hello");
  });

  Deno.test("accept custom recipes", () => {
    pack.registerNamespace("TEST");
  });

  Deno.test("can register custom namespaces", () => {
    pack.registerNamespace("TEST");
  });

  Deno.test("can list namespaces", () => {
    pack.registerNamespace("TEST");
    assertEquals(pack.listNamespaces(), ["TEST"]);
  });

  Deno.test("can register brewing recipe to a namespace", () => {
    pack.registerNamespace("TEST");
    pack.registerBrewingRecipe("TEST", {});
  });
});
