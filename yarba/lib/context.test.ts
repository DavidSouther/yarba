import { Context, Enter, Exit, using } from "lib/context";
import { Err, isErr, isOk, Ok } from "lib/result";

describe("Context", () => {
  it("performs an operation using a context", () => {
    const context = TestContext();
    const result = using(context, () => Ok(5));
    expect(Ok(result)).toBe(5);
    expect(context.initialized).toBe(true);
    expect(context.completed).toBe(true);
  });

  it("reports the result of a thrown error", () => {
    const context = TestContext();

    const result = using(context, () => {
      throw new Error("Failed");
    });

    expect(isErr(result)).toBe(true);
    expect(Err(result as Err<Error>)).toMatchObject({ message: "Failed" });
  });

  it("passes the context to the operation", () => {
    const op = using(TestContext, ({ initialized, completed }) => ({
      initialized,
      completed,
    }));

    expect(isOk(op)).toBe(true);
    const { completed, initialized } = Ok(op as Ok<TestContext>);
    expect(initialized).toBe(true);
    expect(completed).toBe(false);
  });
});

interface TestContext {
  initialized: boolean;
  completed: boolean;
}

function TestContext(): Context & TestContext {
  const context: Context & TestContext = {
    [Enter]: () => {
      context.initialized = true;
    },
    [Exit]: () => {
      context.completed = true;
    },
    initialized: false,
    completed: false,
  };
  return context;
}
