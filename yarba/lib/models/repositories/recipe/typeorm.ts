import { getConnection } from "lib/connection";
import { asyncUsing, Context, Enter, Exit } from "lib/context";
import { RecipeEntity } from "lib/models/entities/recipe";
import { Recipe } from "lib/models/recipe";
import { err } from "lib/models/repositories/recipe/recipe";
import { Repository } from "lib/models/repositories/repository";
import { getRepository } from "typeorm";
import { Repository as TypeOrmRepository } from "typeorm";

export function makeTypeOrmRecipeRepository() {
  return TypeOrmRecipeRepository;
}

async function getRecipeRepository(): Promise<TypeOrmRepository<Recipe>> {
  await getConnection();
  return getRepository<Recipe>(RecipeEntity);
}

async function RecipeRepository(): Promise<
  Context & { recipes: TypeOrmRepository<Recipe> }
> {
  return {
    [Enter]() {},
    [Exit]() {},
    recipes: await getRecipeRepository(),
  };
}

export const TypeOrmRecipeRepository: Repository<Recipe> = {
  add: async (recipe: Recipe) =>
    asyncUsing(
      RecipeRepository,
      async ({ recipes }) => {
        try {
          return recipes.save(recipe);
        } catch (e) {
          // TypeORM errors are weird
          throw { ...(e as Error), name: "TypeORM", message: `${e}` };
        }
      },
      err
    ),

  get: async (id: number) =>
    asyncUsing(
      RecipeRepository,
      async ({ recipes }) =>
        (await recipes.findOne(id)) ??
        err({
          name: `Missing recipe`,
          message: `Recipe ${id} not in database`,
        }),
      err
    ),

  list: async () =>
    asyncUsing(
      RecipeRepository,
      async ({ recipes }) => await recipes.find(),
      err
    ),
};
