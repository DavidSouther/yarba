import { Recipe } from "models/recipe";
import { FC } from "react";
import Link from "next/link";

const RecipeList: FC<{ recipes: Recipe[] }> = ({ recipes }) => (
  <>
    {(recipes.length > 0 && (
      <ul>
        {recipes.map(({ id, recipeName, servingCount }) => (
          <li key={id}>
            <Link href={`/recipes/:${id}`}>
              <a className="no-underline hover:underline text-blue-700">
                {recipeName}
              </a>
            </Link>
            &nbsp;
            <i>makes {servingCount}</i>
          </li>
        ))}
      </ul>
    )) || <div>No Recipes</div>}
  </>
);

export default RecipeList;
