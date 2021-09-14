import {
  Result,
  RepositoryError,
  Err,
} from "lib/models/repositories/repository";

export const err = (e: Error): Result<never, RepositoryError> => {
  return Err({ repository: "TypeOrmRecipeRepository", ...e });
};
