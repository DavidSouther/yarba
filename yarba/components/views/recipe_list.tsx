import URLs from "lib/urls";
import { Recipe } from "lib/models/recipe";
import { FC } from "react";
import Link from "components/link";

const RecipeList: FC<{ recipes: Recipe[] }> = ({ recipes }) => (
  <>
    {(recipes.length > 0 && (
      <ul>
        {recipes.map(({ id, recipeName, servingCount }) => (
          <li key={id}>
            <Link path={URLs.recipe(id!)}>{recipeName}</Link>
            &nbsp;
            <i>makes {servingCount}</i>
          </li>
        ))}
      </ul>
    )) || <div>No Recipes</div>}
  </>
);

export default RecipeList;
