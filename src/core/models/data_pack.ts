import type { BrewingRecipeType } from "#/models/data/recipe/brewing.ts";

export class DataPack {
  private name: string;
  private desc: string;

  private readonly recipes: Array<BrewingRecipeType> = [];

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

  public addBrewingRecipe(recipe: BrewingRecipeType) {
    this.recipes.push(recipe);
  }
  public getName() {
    return this.name;
  }
}
