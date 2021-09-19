import { RepositoryError, Err } from "lib/result";

export const err = (e: unknown | any | Error): Err<RepositoryError> => {
  return Err({ repository: "TypeOrmRecipeRepository", ...e });
};
