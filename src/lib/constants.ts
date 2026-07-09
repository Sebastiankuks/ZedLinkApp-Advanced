export const LOCATIONS = [
  "Lusaka",
  "Copperbelt",
  "Kitwe",
  "Ndola",
  "Livingstone",
  "Chipata",
  "Kabwe",
  "Solwezi",
  "Chingola",
  "Mufulira",
  "Kasama",
  "Mansa",
  "Mongu",
  "Senanga",
  "Mazabuka",
];

export const CATEGORIES = [
  "Vehicles",
  "Property",
  "Jobs",
  "Electronics",
  "Fashion",
  "Services",
  "Furniture",
  "Sports",
  "Books",
  "Other",
];

export const PRICE_RANGES = [
  { label: "Any price", min: 0, max: Infinity },
  { label: "Under K5,000", min: 0, max: 5000 },
  { label: "K5,000 - K20,000", min: 5000, max: 20000 },
  { label: "K20,000 - K50,000", min: 20000, max: 50000 },
  { label: "K50,000 - K100,000", min: 50000, max: 100000 },
  { label: "Over K100,000", min: 100000, max: Infinity },
];

export const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Viewed", value: "views" },
  { label: "Most Favorited", value: "favorites" },
];

export const AD_STATUSES = ["active", "sold", "archived", "pending"] as const;

export const FREE_ADS_LIMIT = 3;
export const PREMIUM_PRICE = 100; // ZMW
export const PREMIUM_DURATION_DAYS = 30;

export const MAX_IMAGES_PER_AD = 5;
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export const MAX_AD_TITLE_LENGTH = 100;
export const MAX_AD_DESCRIPTION_LENGTH = 2000;

export const DEBOUNCE_DELAY = 300; // ms
export const SEARCH_LIMIT = 50;

export const PAYMENT_METHODS = [
  { name: "Airtel Money", number: "0773309345" },
  { name: "MTN MoMo", number: "0962205287" },
];
