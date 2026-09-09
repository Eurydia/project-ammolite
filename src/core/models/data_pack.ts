import { BrewingRecipe } from "../data/recipe/brewing.ts";

export class MissingNamespaceError extends Error {}

export class DataPack {
  private name: string;
  private desc?: string;

  private readonly namespaceRecipeRegistry: Map<string, Array<BrewingRecipe>> =
    new Map();

  constructor(name: string, desc?: string) {
    this.name = name;
    this.desc = desc;
  }

  public getDesc() {
    return this.desc;
  }

  public addNamespace(name: string) {
    this.namespaceRecipeRegistry.set(name, []);
  }

  public listNamespaces() {
    return [
      ...this.namespaceRecipeRegistry
        .entries()
        .map(([namespaceIden, recipes]) => ({
          namespace: namespaceIden,
          recipes,
        })),
    ];
  }

  public addBrewingRecipe(namespace: string, recipe: BrewingRecipe) {
    const recipes = this.namespaceRecipeRegistry.get(namespace);
    if (recipes === undefined) {
      throw new MissingNamespaceError();
    }
    recipes.push(recipe);
    return recipes.length;
  }
  public getName() {
    return this.name;
  }
}
