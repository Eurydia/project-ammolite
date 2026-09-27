import z from "zod";
import {
  type Type$DataComponent,
  Builder$DataComponent,
  Configurator$DataComponent,
  Schema$DataComponent,
} from "#/models/data-components/data-component.ts";

export const Schema$ItemStackComponent = z.lazy(() =>
  z.object({
    id: z.string(),
    count: z.int().optional(),
    get components() {
      return Schema$DataComponent.optional();
    },
  }),
);

export type Type$ItemStackComponent = z.output<
  typeof Schema$ItemStackComponent
>;

export interface Configurator$ItemStackComponent {
  id(value: string): Configurator$ItemStackComponent;
  count(value: number): Configurator$ItemStackComponent;
  component(
    configFn: (configurator: Configurator$DataComponent) => void,
  ): Configurator$ItemStackComponent;
}

export class Builder$ItemStackComponent implements Configurator$ItemStackComponent {
  private idValue?: string;
  private countValue?: number;
  private componentValues?: Type$DataComponent;

  id(value: string) {
    this.idValue = value;
    return this;
  }

  component(configFn: (configurator: Configurator$DataComponent) => void) {
    const builder = new Builder$DataComponent();
    configFn(builder);
    this.componentValues = builder.build();

    return this;
  }

  count(value: number) {
    this.countValue = value;
    return this;
  }

  build() {
    return Schema$ItemStackComponent.parse({
      id: this.idValue,
      count: this.countValue,
      components: this.componentValues,
    });
  }
}
