import { EntitySchema } from "typeorm";
import { Recipe } from "../recipe";

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
      type: String,
    },
  },
});
