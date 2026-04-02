/**
 * Canonical city / beach names for travel tickets (matches backend seed).
 * Keep in sync with Backend `src/constants/travelSeedPlaces.ts`.
 */
export const SEED_CITY_NAMES = ["Yangon", "Mandalay", "Naypyitaw"] as const;

export const SEED_BEACH_NAMES = [
  "Chaung Thar",
  "Ngwe Saung",
  "Goyangyi",
  "Ngapali",
  "Sittwe",
  "Gwa",
  "Kyeintali",
  "Kantharyar",
  "Nabule",
  "Pa Nyint",
  "Grandfather Beach",
  "Maungmagan",
  "Boulder Bay Island",
  "Naung Oo Phee",
  "Paradise Beach",
] as const;

export const SEED_CITY_DROPDOWN_ITEMS = SEED_CITY_NAMES.map((name) => ({
  label: name,
  value: name,
}));

export const SEED_BEACH_DROPDOWN_ITEMS = SEED_BEACH_NAMES.map((name) => ({
  label: name,
  value: name,
}));
