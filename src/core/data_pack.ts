export class DataPack {
  private readonly desc?: string;

  private readonly namespaceRegistry: Map<string, Object> = new Map();

  constructor(desc?: string) {
    this.desc = desc;
  }
  public getDesc() {
    return this.desc;
  }

  public registerNamespace(name: string) {
    this.namespaceRegistry.set(name, {});
  }

  public listNamespaces() {
    return [...this.namespaceRegistry.keys()];
  }

  public registerBrewingRecipe(namespace: string, recipe: Object) {}
}
