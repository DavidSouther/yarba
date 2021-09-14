import { IsBrowser } from "lib/is_browser";
import { Recipe } from "lib/models/recipe";
import { makeApiRecipeRepository } from "lib/models/repositories/recipe/api";
import { makeFakeRecipeRepository } from "lib/models/repositories/recipe/fake";
import { makeTypeOrmRecipeRepository } from "lib/models/repositories/recipe/typeorm";
import { Repository } from "lib/models/repositories/repository";

const REAL_REPOSITORY = IsBrowser
  ? makeApiRecipeRepository()
  : makeTypeOrmRecipeRepository();
let fakeRepository: Repository<Recipe>;
export function useFakeRepository(recipes: Recipe[]) {
  fakeRepository = makeFakeRecipeRepository(recipes);
}
export function getRepository() {
  return fakeRepository ?? REAL_REPOSITORY;
}
