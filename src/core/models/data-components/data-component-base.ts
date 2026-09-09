export interface DataComponent {
  asJsonObject<T extends object>(): {
    component: string;
  } & Omit<T, "component">;
}
