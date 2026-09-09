import { BrewingRecipe } from "../data/recipe/brewing.ts";

export class MissingNamespaceError extends Error {}
export class IllegalNamespaceName extends Error {}

export class DataPack {
  private name: string;
  private desc: string;

  private readonly recipes: Array<BrewingRecipe> = [];

  constructor(name: string, desc?: string) {
    this.name = name;
    this.desc = desc ?? "";
  }

  public getDesc() {
    return this.desc;
  }

  public getRecipes() {
    return [...this.recipes];
  }

  public addBrewingRecipe(recipe: BrewingRecipe) {
    this.recipes.push(recipe);
  }
  public getName() {
    return this.name;
  }
}
