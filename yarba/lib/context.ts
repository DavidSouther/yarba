import { Result, Err, Ok, isResult } from "lib/result";

export const Enter = Symbol("Context Enter");
export const Exit = Symbol("Context Exit");

export interface Context {
  [Enter](): void;
  [Exit](): void;
}

export function using<C extends Context, T, E extends Error>(
  context: C | (() => C),
  operation: (c: C) => T | Result<T, E & Error>
): Result<T, E & Error> {
  context = typeof context == "function" ? context() : context;
  let result: Result<T, E & Error>;
  try {
    context[Enter]();
    const op = operation(context);
    result = isResult(op) ? op : Ok(op);
  } catch (e) {
    result = Err(e);
  } finally {
    context[Exit]();
  }
  return result;
}
