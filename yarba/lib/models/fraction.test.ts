import {
  add,
  Fraction,
  Half,
  One,
  reduce,
  round,
  Sixteenth,
  Third,
} from "lib/models/fraction";

describe("Fraction", () => {
  describe("arithmetic", () => {
    it("adds whole numbers", () => {
      const one = One();
      const two = Fraction(2, 1);
      expect(add(one, two)).toEqual({ n: 3, d: 1 });
    });

    it("adds mixed numbers", () => {
      const one = One();
      const half = Half();

      expect(add(one, half)).toEqual({ n: 3, d: 2 });
    });

    it("reduces mixed numbers", () => {
      expect(reduce(Fraction(5, 15))).toEqual(Third());
    });

    it("rounds obtuse fractions", () => {
      const n = Fraction(1.1, 16);
      const rounded = round(n);
      expect(rounded).toEqual(Sixteenth());
    });
  });
});
