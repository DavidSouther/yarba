import { parseRecipe, Recipe } from "lib/models/recipe";
import { err } from "lib/models/repositories/recipe/recipe";
import { Repository } from "lib/models/repositories/repository";
import { Ok, isErr, Err, Result, RepositoryError } from "lib/result";

export const makeApiRecipeRepository = (): Repository<Recipe> => {
  return {
    async add(recipe: Recipe) {
      return fetch("/api/recipes/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
      }).then(async (response) => {
        const { ok, statusText } = response;
        const body = (await response.json()) as Result<Recipe, RepositoryError>;
        if (!ok && isErr(body)) {
          const error = Err(body);
          const name = error.name || statusText;
          const message = error.message || "Failed to save recipe";
          return err({ name, message });
        }
        return body;
      });
    },
    async get(id: string | number) {
      return fetch(`/api/recipes/${id}`).then(async (response) => {
        const { ok, statusText } = response;
        const body = await response.json();
        if (!ok) {
          const error = Err(body as Err<Error>);
          const name = error.name || statusText;
          const message = error.message || "Failed to save recipe";
          return err({ name, message });
        }
        const recipe = parseRecipe(body);
        return isErr(recipe) ? err(Err(recipe)) : recipe;
      });
    },
    async list() {
      return Ok([]);
    },
  };
};
