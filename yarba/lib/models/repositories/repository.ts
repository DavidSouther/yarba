import { ObjectLiteral } from "typeorm";

export type None = null;
export type Some<T> = T;
export type Option<T> = Some<T> | None;
export type Err<E> = { err: E };
export type Ok<T> = { ok: T };
export type Result<T, E extends Error | unknown> = Ok<T> | Err<E>;

export const None = <T>(s: Option<T>): s is None => s != null;
export const Some = <T>(s: Option<T>): s is Some<T> => s != null;
export const isOk = <T>(t: Result<T, unknown>): t is Ok<T> =>
  (t as Ok<T>).ok !== undefined;
export const isErr = <E extends Error>(e: Result<unknown, E>): e is Err<E> =>
  (e as Err<E>).err !== undefined;
export const Ok = <T>(t: T): Result<T, never> => ({ ok: t });
export const Err = <E extends Error>(e: E): Result<never, E> => ({
  err: e,
});

export interface RepositoryError extends Error {
  repository: string;
}

export interface Repository<T extends ObjectLiteral> {
  add(t: T): Promise<Result<T, RepositoryError>>;
  get(id: string | number): Promise<Result<T, RepositoryError>>;
  list(): Promise<Result<T[], RepositoryError>>;
}
