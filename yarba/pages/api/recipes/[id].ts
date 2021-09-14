import { Recipe } from "lib/models/recipe";
import { getRepository } from "lib/models/repositories/recipe";
import { Err, Result } from "lib/result";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result<Recipe, Error>>
) {
  const qid = req.query["id"];
  if (qid == null) {
    res.status(400).json(Err("Missing query id"));
  }
  const id = Number(qid);
  if (!isFinite(id)) {
    res.status(400).json(Err(`Invalid recipe id ${qid}`));
    return;
  }
  const recipe = await getRepository().get(id);
  if (recipe === undefined) {
    res.status(404).json(Err(`Recipe not found: ${id}`));
    return;
  }
  res.status(200).json(recipe);
}
