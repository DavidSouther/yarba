import { Recipe } from "lib/models/recipe";
import { Repository } from "lib/models/repositories/repository";
import { Result, RepositoryError, Err, Ok } from "lib/result";

export const makeFakeRecipeRepository = (
  seedRecipes: Recipe[]
): Repository<Recipe> => {
  let nextHighest = 0;
  const setId = (recipe: Recipe) => {
    recipe.id = recipe.id ?? nextHighest;
    nextHighest = Math.max(nextHighest, recipe.id) + 1;
    return recipe;
  };

  const recipes = new Map<number, Recipe>(
    seedRecipes.map(setId).map((recipe) => [recipe.id!, recipe])
  );

  const err = (e: Error): Result<never, RepositoryError> => {
    return Err({ repository: "FakeRecipeRepository", ...e });
  };

  return {
    async add(recipe: Recipe) {
      setId(recipe);
      if (recipes.has(recipe.id!)) {
        return err({
          name: "Duplicte recipe",
          message: `Recipe ${recipe.id} already in fake map`,
        });
      }
      recipes.set(recipe.id!, recipe);
      return Ok(recipe);
    },

    async get(id: number) {
      if (!recipes.has(id)) {
        return err({
          name: "Missing recipe",
          message: `Recipe ${id} not in database`,
        });
      }
      return Ok(recipes.get(id)!);
    },

    async list() {
      return Ok(Array.from(recipes.values()));
    },
  };
};
