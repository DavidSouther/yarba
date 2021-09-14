import { parseRecipe } from "lib/models/recipe";
import { saveRecipe } from "lib/models/repositories/recipe";
import type { NextApiRequest, NextApiResponse } from "next";

function isError(err: unknown): err is Error {
  return (
    (err as Error).name !== undefined && (err as Error).message !== undefined
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{}>
) {
  const recipe = parseRecipe(req.body);
  if (isError(recipe)) {
    res.status(400).json({ error: recipe });
  } else {
    // Save to the database
    await saveRecipe(recipe);
    res.status(200).json({ data: recipe });
  }
}
