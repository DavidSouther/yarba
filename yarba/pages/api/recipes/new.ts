import { parseRecipe, Recipe } from "lib/models/recipe";
import { getRepository } from "lib/models/repositories/recipe";
import { Result, isErr, Ok } from "lib/result";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Recipe, Error>>
) {
  const recipe = parseRecipe(req.body);
  if (isErr(recipe)) {
    res.status(400).json(recipe);
  } else {
    // Save to the database
    const saved = await getRepository().add(Ok(recipe));
    res.status(200).json(saved);
  }
}
