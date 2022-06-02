import { Fraction, round, scale } from "lib/models/fraction";

export enum MeasurementDimension {
  Volume,
  Weight,
  Count,
}

export enum MeasurementBasis {
  Count,
  Liter,
  Milliliter,
  Gallon,
  Quart,
  Pint,
  Cup,
  Tablespoon,
  Teaspoon,
  Gram,
  Kilogram,
  Pound,
  Ounce,
}

export type VolumeBases =
  | MeasurementBasis.Liter
  | MeasurementBasis.Milliliter
  | MeasurementBasis.Gallon
  | MeasurementBasis.Quart
  | MeasurementBasis.Pint
  | MeasurementBasis.Cup
  | MeasurementBasis.Tablespoon
  | MeasurementBasis.Teaspoon;

export type WeightBases =
  | MeasurementBasis.Gram
  | MeasurementBasis.Kilogram
  | MeasurementBasis.Pound
  | MeasurementBasis.Ounce;

export type CountBases = MeasurementBasis.Count;

export interface VolumeMeasurement {
  amount: Fraction;
  type: MeasurementDimension.Volume;
  basis: VolumeBases;
}

export interface WeightMeasurement {
  amount: Fraction;
  type: MeasurementDimension.Weight;
  basis: WeightBases;
}

export interface CountMeasurement {
  amount: Fraction;
  type: MeasurementDimension.Count;
  basis: CountBases;
}

export function Liter(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Liter,
  };
}

export function Milliliter(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Milliliter,
  };
}

export function Gallon(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Gallon,
  };
}

export function Quart(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Quart,
  };
}

export function Pint(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Pint,
  };
}

export function Cup(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Cup,
  };
}

export function Tablespoon(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Tablespoon,
  };
}

export function Teaspoon(n: number, d = 1): VolumeMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Volume,
    basis: MeasurementBasis.Teaspoon,
  };
}

export function Gram(n: number, d = 1): WeightMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Weight,
    basis: MeasurementBasis.Gram,
  };
}

export function Kilogram(n: number, d = 1): WeightMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Weight,
    basis: MeasurementBasis.Gram,
  };
}

export function Ounce(n: number, d = 1): WeightMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Weight,
    basis: MeasurementBasis.Gram,
  };
}

export function Pound(n: number, d = 1): WeightMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Weight,
    basis: MeasurementBasis.Gram,
  };
}

export function Count(n: number, d = 1): CountMeasurement {
  return {
    amount: Fraction(n, d),
    type: MeasurementDimension.Count,
    basis: MeasurementBasis.Count,
  };
}

export type Measurement =
  | CountMeasurement
  | VolumeMeasurement
  | WeightMeasurement;

export function normalize(m: CountMeasurement): CountMeasurement;
export function normalize(m: WeightMeasurement): WeightMeasurement;
export function normalize(m: VolumeMeasurement): VolumeMeasurement;
export function normalize(m: Measurement): Measurement {
  switch (m.type) {
    case MeasurementDimension.Count:
      return m;
    case MeasurementDimension.Volume:
      return normalizeVolume(m);
    case MeasurementDimension.Weight:
      return normalizeWeight(m);
  }
}

export function project<B extends CountBases>(
  m: CountMeasurement & { basis: MeasurementBasis.Count }
): CountMeasurement & { basis: B };
export function project<B extends WeightBases>(
  m: WeightMeasurement & { basis: MeasurementBasis.Milliliter }
): WeightMeasurement & { basis: B };
export function project<B extends VolumeBases>(
  m: VolumeMeasurement & { basis: MeasurementBasis.Gram }
): VolumeMeasurement & { basis: B };
export function project<B extends MeasurementBasis>(
  m: Measurement,
  b: B
): Measurement {
  switch (m.type) {
    case MeasurementDimension.Count:
      return m;
    case MeasurementDimension.Volume:
      return projectVolume(
        m as VolumeMeasurement & { basis: MeasurementBasis.Milliliter },
        b as VolumeBases
      );
    case MeasurementDimension.Weight:
      return projectWeight(
        m as WeightMeasurement & { basis: MeasurementBasis.Gram },
        b as WeightBases
      );
  }
}

const volumeScales: Record<VolumeBases, number> = {
  [MeasurementBasis.Liter]: 1000,
  [MeasurementBasis.Milliliter]: 1,
  [MeasurementBasis.Gallon]: 3785.41,
  [MeasurementBasis.Quart]: 946.353,
  [MeasurementBasis.Pint]: 473.176,
  [MeasurementBasis.Cup]: 236.588,
  [MeasurementBasis.Tablespoon]: 14.7868,
  [MeasurementBasis.Teaspoon]: 4.92892,
};

function normalizeVolume(m: VolumeMeasurement): VolumeMeasurement {
  return {
    amount: scale(m.amount, volumeScales[m.basis]),
    basis: MeasurementBasis.Milliliter,
    type: MeasurementDimension.Volume,
  };
}

function projectVolume<B extends VolumeBases>(
  m: VolumeMeasurement & { basis: MeasurementBasis.Milliliter },
  to: B
): VolumeMeasurement & { basis: B } {
  return {
    amount: round(scale(m.amount, 1 / volumeScales[to])),
    basis: to,
    type: MeasurementDimension.Volume,
  };
}

const weightScales: Record<WeightBases, number> = {
  [MeasurementBasis.Gram]: 1,
  [MeasurementBasis.Kilogram]: 1000,
  [MeasurementBasis.Pound]: 453.592,
  [MeasurementBasis.Ounce]: 28.3495,
};

function normalizeWeight(m: WeightMeasurement): WeightMeasurement {
  return {
    amount: scale(m.amount, weightScales[m.basis]),
    basis: MeasurementBasis.Gram,
    type: MeasurementDimension.Weight,
  };
}

function projectWeight<B extends WeightBases>(
  m: WeightMeasurement & { basis: MeasurementBasis.Gram },
  to: B
): WeightMeasurement & { basis: B } {
  return {
    amount: round(scale(m.amount, 1 / weightScales[to])),
    basis: to,
    type: MeasurementDimension.Weight,
  };
}
