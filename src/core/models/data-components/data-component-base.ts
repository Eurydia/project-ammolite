export interface DataComponent {
  asJsonObject(): [string, object | string | number | undefined | boolean];
}
