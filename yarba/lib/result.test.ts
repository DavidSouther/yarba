import { Err, None, Ok, Option, Result, Some } from "lib/result";

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
    const a: Result<string> = Ok("a ok");
    const b: string = Ok(a);

    expect(b).toBe("a ok");
  });
});

export {};
