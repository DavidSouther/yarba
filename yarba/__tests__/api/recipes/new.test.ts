import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "pages/api/recipes/new";
import { useFakeRepository } from "lib/models/repositories/recipe";
import { Chicken } from "__mocks__/recipes";

describe("New Recipe", () => {
  it("returns the recipe on success", async () => {
    useFakeRepository([]);
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      body: { ...Chicken },
    });

    await handler(req, res);

    expect(res).toRespond({ status: 200, body: { ok: { ...Chicken, id: 0 } } });
  });
});
