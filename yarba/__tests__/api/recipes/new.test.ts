import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "pages/api/recipes/new";
import { useFakeRepository } from "lib/models/repositories/recipe";

const chicken = {
  recipeName: "Chicken",
  servingCount: 2,
  instructions: "Pat the chicken dry and cut into chucks. ...",
};

describe("New Recipe", () => {
  it("returns the recipe on success", async () => {
    useFakeRepository([]);
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      body: { ...chicken },
    });

    await handler(req, res);

    expect(res).toRespond({ status: 200, body: { ok: { ...chicken, id: 0 } } });
  });
});
