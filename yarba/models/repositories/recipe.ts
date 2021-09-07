import { getRepository, Repository } from "typeorm";
import { getConnection } from "../../connection";
import { RecipeEntity } from "../entities/recipe";
import { Recipe } from "../recipe";

async function getRecipeRepository(): Promise<Repository<Recipe>> {
  await getConnection();
  return getRepository<Recipe>(RecipeEntity);
}

export async function getRecipe(
  id: string | number
): Promise<Recipe | undefined> {
  return (await getRecipeRepository()).findOne(id);
}

export async function saveRecipe(recipe: Recipe): Promise<Recipe> {
  return (await getRecipeRepository()).save(recipe);
}

export async function listRecipes(): Promise<Recipe[]> {
  return (await getRecipeRepository()).find();
}
