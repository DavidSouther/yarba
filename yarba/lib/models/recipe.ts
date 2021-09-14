import { Err, Ok, Result } from "lib/models/repositories/repository";

export interface Recipe {
  id?: number;
  recipeName: string;
  servingCount: number;
  instructions: string;
}

export function parseRecipe(
  body: Record<string, string>
): Result<Recipe, Error> {
  const recipeName = body["recipeName"] ?? "";
  const servingCount = Number(body["servingCount"]);
  const instructions = body["instructions"] ?? "";

  if (recipeName.length <= 0) {
    return Err({
      name: "RECIPE_NAME_REQUIRED",
      message: "A name is required for a recipe",
    });
  }
  if (recipeName.length > 55) {
    return Err({
      name: "RECIPE_NAME_TOO_LONG",
      message: "Recipe names should be short and savory",
    });
  }
  if (!isFinite(servingCount)) {
    return Err({
      name: "SERVING_COUNT_NOT_FINITE",
      message: "We only deal with normal numbers of people",
    });
  }
  if (instructions.length <= 0) {
    return Err({
      name: "INSTRUCTIONS_REQUIRED",
      message:
        "Lists of ingredients are fine, but how do we put them together?",
    });
  }

  return Ok({ recipeName, servingCount, instructions });
}
