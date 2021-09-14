import { Err, None, Ok, Option, Result, Some, unwrap } from "lib/result";

describe("Result", () => {
  it("converts Nones", () => {
    const a: Option<string> = None();
    expect(a).toBeNull();

    const b: Option<string> = None("b");
    expect(b).toBeNull();

    const c: Option<string> = Some(a);
    expect(c).toBeNull();

    const d: Option<string> = Some(b);
    expect(c).toBeNull();
  });

  it("converts Somes", () => {
    const a: Option<string> = Some("a");
    expect(a).toBe("a");

    const b: Option<string> = Some(a);
    expect(b).toBe("a");
  });

  it("converts Errs", () => {
    const a: Result<string> = Err(new Error("a error"));

    const b: Error = Err(a);
    expect(b).toMatchObject({ message: "a error" });
  });

  it("converts Oks", () => {
    const a: Ok<string> = Ok("a ok");
    const b: string = Ok(a);

    expect(b).toBe("a ok");
  });

  it("unwraps", () => {
    const a = Some("some");
    const b = None();
    const c = Ok("ok");
    const d = Err(new Error("err"));
    const e = "else";

    expect(unwrap(a)).toBe("some");
    expect(unwrap(c)).toBe("ok");
    expect(() => unwrap(b)).toThrow("Attempted to unwrap None");
    expect(() => unwrap(d)).toThrow("err");
    expect(unwrap(e)).toBe("else");
  });
});

export {};
