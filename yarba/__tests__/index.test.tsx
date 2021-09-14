/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/index";

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home recipes={[]} />);

    const heading = screen.getByRole("heading", {
      name: /Recipes/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
