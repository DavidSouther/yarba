import {
  add,
  Eighth,
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
      let n = Fraction(1.1, 16);
      let rounded = round(n);
      expect(rounded).toEqual(Sixteenth());

      n = Fraction(2.4, 16);
      rounded = round(n);
      expect(rounded).toEqual(Eighth());

      n = Fraction(2.9, 16);
      rounded = round(n);
      expect(rounded).toEqual(Fraction(3, 16));
    });
  });
});
