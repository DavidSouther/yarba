import { Recipe } from "models/recipe";
import { FC } from "react";

export const RecipeView: FC<{ recipe: Recipe }> = ({ recipe }) => (
  <>
    <h3>{recipe.recipeName}</h3>
    <p>Serves {recipe.servingCount}</p>
    <p>
      <pre>{recipe.instructions}</pre>
    </p>
  </>
);

export default RecipeView;
