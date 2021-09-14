import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "pages/api/recipes/[id]";
import { useFakeRepository } from "lib/models/repositories/recipe";
import { Chicken, Potatoes } from "__mocks__/recipes";

describe("Get Recipe", () => {
  it("returns the recipe when found", async () => {
    useFakeRepository([Chicken, Potatoes]);
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      path: "/api/recipes/1",
      query: { id: 1 },
    });

    await handler(req, res);

    expect(res).toRespond({
      status: 200,
      body: {
        ok: { ...Potatoes, id: 1 },
      },
    });
  });
});
