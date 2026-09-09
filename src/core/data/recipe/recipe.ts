export interface Recipe {
  asJsonObject(): {
    type: string;
  };
}

export class IllegalRecipeNameError extends Error {}
