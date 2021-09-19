import { Result, Err, Ok, isResult } from "lib/result";

export const Enter = Symbol("Context Enter");
export const Exit = Symbol("Context Exit");

export interface Context {
  [Enter](): void;
  [Exit](): void;
}

export function using<C extends Context, T>(
  context: C | (() => C),
  operation: (c: C) => T | Result<T, Error>
): Result<T, Error> {
  context = typeof context == "function" ? context() : context;
  let result: Result<T, Error>;
  try {
    context[Enter]();
    const op = operation(context);
    result = isResult(op) ? op : Ok(op);
  } catch (e) {
    result = Err(e as Error);
  } finally {
    context[Exit]();
  }
  return result;
}

export async function asyncUsing<C extends Context, T, E extends Error>(
  context: C | (() => Promise<C>),
  operation: (c: C) => Promise<T | Result<T, E>>,
  normalizeError: (e: Error | unknown | any) => Err<E> = (e) => Err(e as E)
): Promise<Result<T, E>> {
  context = typeof context == "function" ? await context() : context;
  let result: Result<T, E>;
  try {
    context[Enter]();
    const op = await operation(context);
    result = isResult(op) ? op : Ok(op);
  } catch (e) {
    result = normalizeError(e);
  } finally {
    context[Exit]();
  }
  return result;
}
