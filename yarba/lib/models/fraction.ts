export interface Fraction {
  n: number;
  d: number;
}
export const Fraction = (n: number, d = 1): Fraction => ({ n, d });

export const isWhole = ({ d }: Fraction) => d === 1;
export const One = () => Fraction(1, 1);
export const Half = () => Fraction(1, 2);
export const Third = () => Fraction(1, 3);
export const Quarter = () => Fraction(1, 4);
export const Sixth = () => Fraction(1, 6);
export const Eighth = () => Fraction(1, 8);
export const Sixteenth = () => Fraction(1, 16);

function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b > 0) [a, b] = [b, a % b];
  return a;
}

export function reduce(a: Fraction): Fraction {
  const c = gcd(a.n, a.d);
  return { n: a.n / c, d: a.d / c };
}

export function add(a: Fraction, b: Fraction): Fraction {
  const lcm = Math.abs(a.d * b.d) / gcd(a.d, b.d);
  const an = a.n * (lcm / a.d);
  const bn = b.n * (lcm / b.d);
  let result = { n: an + bn, d: lcm };
  return reduce(result);
}

export function neg(a: Fraction): Fraction {
  return { n: -a.n, d: a.d };
}

export function sub(a: Fraction, b: Fraction): Fraction {
  return add(a, neg(b));
}

export function mul(a: Fraction, b: Fraction): Fraction {
  return reduce(Fraction(a.n * b.n, a.d * b.d));
}

export function div(a: Fraction, b: Fraction): Fraction {
  return mul(a, Fraction(b.d, b.n));
}

export function scale(a: Fraction, b: number): Fraction {
  return mul(a, Fraction(b));
}

export function round(a: Fraction): Fraction {
  // normalize to 1
  let m: number, d: number;
  const x = a.n / a.d;
  if (x < 3 / 16) m = 16;
  else if (x < 3 / 8) m = 8;
  // else if (x < 1/3) m = 6;
  else if (x < 3 / 4) m = 4;
  else if (x < 3) m = 2;
  else m = 1;
  return reduce(Fraction(Math.round(x * m), m));
}
