export type Tiers = {
  tier: number;
  min: number;
  max: number;
};

export const TIERS: Tiers[] = [
  {
    tier: 1,
    min: 0,
    max: 535,
  },
  {
    tier: 2,
    min: 536,
    max: 8576,
  },
  {
    tier: 3,
    min: 8577,
    max: 43422,
  },
  {
    tier: 4,
    min: 43423,
    max: 137238,
  },
  {
    tier: 5,
    min: 137239,
    max: 335055,
  },
  {
    tier: 6,
    min: 335056,
    max: 694770,
  },
  {
    tier: 7,
    min: 694771,
    max: 1287149,
  },
  {
    tier: 8,
    min: 1287150,
    max: 2195819,
  },
  {
    tier: 9,
    min: 2195820,
    max: 3517278,
  },
  {
    tier: 10,
    min: 3517279,
    max: 5360888,
  },
  {
    tier: 11,
    min: 5360889,
    max: 7848877,
  },
  {
    tier: 12,
    min: 7848878,
    max: Number.MAX_SAFE_INTEGER,
  },
];
