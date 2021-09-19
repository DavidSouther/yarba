import { Result, RepositoryError } from "lib/result";
import { ObjectLiteral } from "typeorm";

export interface Repository<T extends ObjectLiteral> {
  add(t: T): Promise<Result<T, RepositoryError>>;
  get(id: string | number): Promise<Result<T, RepositoryError>>;
  list(): Promise<Result<T[], RepositoryError>>;
}

export interface Transaction {
  rollback(): void;
  commit(): void;
}
