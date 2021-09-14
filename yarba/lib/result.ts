export type None = null;
export type Some<T> = T;
export type Option<T> = Some<T> | None;
export type Err<E> = { err: E };
export type Ok<T> = { ok: T };
export type Result<T, E extends Error = Error> = Ok<T> | Err<E>;

export const isNone = <T>(s: Option<T>): s is None => s != null;
export const isSome = <T>(s: Option<T>): s is Some<T> => s != null;

export function None<T = unknown>(): None;
export function None<T = unknown>(s: Option<T>): None;
export function None<T = unknown>(s?: Option<T>) {
  return null;
}
// Beware: Order matters for correct inference.
export function Some<T>(s: Option<T>): T;
export function Some<T>(t: T): Option<T>;
export function Some<T>(t: T | Option<T>) {
  return t ? t : None();
}

export const isOk = <T, E extends Error = Error>(t: Result<T, E>): t is Ok<T> =>
  (t as Ok<T>).ok !== undefined;
export const isErr = <E extends Error>(e: Result<unknown, E>): e is Err<E> =>
  (e as Err<E>).err !== undefined;

// Beware: Order matters for correct inference.
export function Ok<T, E extends Error = Error>(ok: Result<T, E>): T;
export function Ok<T, E extends Error = Error>(t: T): Result<T, E>;
export function Ok<T, E extends Error = Error>(t: T | Result<T, E>) {
  return (t as Ok<T>).ok ?? { ok: t };
}
// Beware: Order matters for correct inference.
export function Err<E extends Error>(e: E): Err<E>;
export function Err<E extends Error>(err: Err<E>): E;
export function Err<E extends Error>(e: Err<E> | E) {
  return (e as Err<E>).err ?? { err: e };
}

export interface RepositoryError extends Error {
  repository: string;
}
