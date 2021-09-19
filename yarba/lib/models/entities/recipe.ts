import { Ingredient, Recipe } from "lib/models/recipe";
import { EntitySchema } from "typeorm";

export const RecipeEntity = new EntitySchema<Recipe>({
  name: "recipe",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    recipeName: {
      type: String,
    },
    servingCount: {
      type: Number,
    },
    instructions: {
      type: "simple-array",
    },
  },
});

export const IngredientEntity = new EntitySchema<Ingredient>({
  name: "ingredient",
  columns: {
    name: {
      type: String,
    },
    measurement: {
      type: "simple-json",
    },
  },
  relations: {
    recipe: {
      target: "recipe",
      type: "many-to-one",
    },
  },
});
