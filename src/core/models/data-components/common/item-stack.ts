import z from "zod";

export type ItemStackType = Readonly<ItemStackInput>;

export interface ItemStackBuilderConfigurator {
  count(value: number): ItemStackBuilderConfigurator;
  component(value: DataComponentValue): ItemStackBuilderConfigurator;
  components(
    ...values: Array<DataComponentValue>
  ): ItemStackBuilderConfigurator;
}

export class ItemStackBuilder implements ItemStackBuilderConfigurator {
  private  id?: string;
  private countValue?: number;
  private componentValues: Array<DataComponentValue> = [];


  public count(value: number): this {
    this.countValue = value;
    return this;
  }

  public component(value: DataComponentValue): this {
    this.componentValues = [value];
    return this;
  }

  public components(...values: Array<DataComponentValue>): this {
    this.componentValues.push(...values);
    return this;
  }

  public build(): Readonly<ItemStackData> {
    const components =
      this.componentValues.length === 0
        ? undefined
        : Object.freeze(
            Object.assign(
              {},
              ...this.componentValues.map((component) =>
                toDataPackObject(component),
              ),
            ),
          );

    return freezeDataClass(
      new ItemStackData({
        id: this.id,
        count: this.countValue,
        components,
      }),
    );
  }
}

}
