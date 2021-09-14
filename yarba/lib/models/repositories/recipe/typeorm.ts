import { getConnection } from "lib/connection";
import { RecipeEntity } from "lib/models/entities/recipe";
import { Recipe } from "lib/models/recipe";
import { err } from "lib/models/repositories/recipe/recipe";
import { Repository } from "lib/models/repositories/repository";
import { Ok } from "lib/result";
import { getRepository } from "typeorm";
import { Repository as TypeOrmRepository } from "typeorm";

export function makeTypeOrmRecipeRepository() {
  return TypeOrmRecipeRepository;
}

async function getRecipeRepository(): Promise<TypeOrmRepository<Recipe>> {
  await getConnection();
  return getRepository<Recipe>(RecipeEntity);
}

export const TypeOrmRecipeRepository: Repository<Recipe> = {
  async add(recipe: Recipe) {
    try {
      return Ok(await (await getRecipeRepository()).save(recipe));
    } catch (e) {
      return err(e as Error);
    }
  },

  async get(id: number) {
    try {
      const recipe = await (await getRecipeRepository()).findOne(id);
      if (recipe) {
        return Ok(recipe);
      } else {
        return err({
          name: `Missing recipe`,
          message: `Recipe ${id} not in database`,
        });
      }
    } catch (e) {
      return err(e as Error);
    }
  },

  async list() {
    try {
      return Ok(await (await getRecipeRepository()).find());
    } catch (e) {
      return err(e as Error);
    }
  },
};
