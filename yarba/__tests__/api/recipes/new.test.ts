import { createMocks } from "node-mocks-http";
import { NextApiRequest, NextApiResponse } from "next";
import handler from "pages/api/recipes/new";

describe("New Recipe", () => {
  it("returns the recipe on success", () => {
    const { req, res } = createMocks<NextApiRequest, NextApiResponse>({
      body: {
        recipeName: "Chicken",
        servingCount: 2,
        instructions: "Pat the chicken dry and cut into chucks. ...",
      },
    });

    // handler(req, res);

    expect(res).toRespond({ status: 200, body: {} });
  });
});
