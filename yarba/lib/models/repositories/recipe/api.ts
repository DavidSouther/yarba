import { parseRecipe, Recipe } from "lib/models/recipe";
import { err } from "lib/models/repositories/recipe/recipe";
import { isErr, Ok, Repository } from "lib/models/repositories/repository";

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
        const body = await response.json();
        if (!ok) {
          const name = body.error["name"] ?? statusText;
          const message = body.error["message"] ?? "Failed to save recipe";
          return err({ name, message });
        }
        return Ok(body);
      });
    },
    async get(id: string | number) {
      return fetch(`/api/recipes/${id}`).then(async (response) => {
        const { ok, statusText } = response;
        const body = await response.json();
        if (!ok) {
          const name = body.error["name"] ?? statusText;
          const message = body.error["message"] ?? "Failed to save recipe";
          return err({ name, message });
        }
        const recipe = parseRecipe(body);
        return isErr(recipe) ? err(recipe.err) : recipe;
      });
    },
    async list() {
      return Ok([]);
    },
  };
};
