import { Result, Err, Ok } from "lib/result";

export interface Recipe {
  id?: number;
  recipeName: string;
  servingCount: number;
  instructions: string[];
}

export interface Ingredient {
  name: string;
  recipe: Recipe;
  measurement: Measurement;
}

export enum MeasurementBasis {
  Volume,
  Weight,
  Count,
}

export interface Measurement {
  amount: number;
  basis: MeasurementBasis;
}

export function parseRecipe(
  body: Record<string, string>
): Result<Recipe, Error> {
  const recipeName = body["recipeName"] ?? "";
  const servingCount = Number(body["servingCount"]);

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
  if (body["instructions"].length <= 0) {
    return Err({
      name: "INSTRUCTIONS_REQUIRED",
      message:
        "Lists of ingredients are fine, but how do we put them together?",
    });
  }
  const instructions = parseInstructions(body["instructions"]);

  return Ok({ recipeName, servingCount, instructions });
}

function parseInstructions(instructions: string | string[]): string[] {
  return (
    typeof instructions == "string" ? instructions.split("\n") : instructions
  ).filter((step) => step.trim().length > 0);
}
