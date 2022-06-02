import { normalize, Tablespoon, Teaspoon } from "lib/models/measurement";

describe("Measurement", () => {
  describe("Volume conversion", () => {
    const one_tbsp = Tablespoon(1);
    const three_tsp = Teaspoon(3);
    expect(normalize(one_tbsp)).toEqual(normalize(three_tsp));
  });
});
