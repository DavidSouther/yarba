import { Result, RepositoryError, Err } from "lib/result";

export const err = (e: Error): Result<never, RepositoryError> => {
  return Err({ repository: "TypeOrmRecipeRepository", ...e });
};
