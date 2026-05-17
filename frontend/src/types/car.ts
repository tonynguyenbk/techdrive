export type FuelType = "gasoline" | "diesel" | "electric" | "hybrid" | "phev";
export type Transmission = "manual" | "automatic" | "cvt" | "dct";
export type Drivetrain = "fwd" | "rwd" | "awd" | "four_wd";
export type CarSegment =
  | "sedan"
  | "suv"
  | "mpv"
  | "hatchback"
  | "pickup"
  | "coupe"
  | "van"
  | "truck";
export type CarStatus = "on_sale" | "discontinued" | "upcoming";

export type Brand = {
  id: string;
  name_vi: string;
  name_en: string;
  slug: string;
  logo_url: string;
  flag_emoji?: string;
  country_of_origin: string;
  description_vi: string;
  description_en: string;
  is_active: boolean;
  display_order: number;
};

export type CarModel = {
  id: string;
  brand_id: string;
  brand: Brand;
  name: string;
  slug: string;
  segment: CarSegment;
  body_type: string;
  generation: string | null;
  year_from: number;
  year_to: number | null;
  price_from: number;
  price_to: number;
  status: CarStatus;
  description_vi: string;
  description_en: string;
  thumbnail_url: string;
  gallery_urls: string[];
  our_rating: number | null;
  variants?: CarVariant[];
};

export type CarVariant = {
  id: string;
  model_id: string;
  name: string;
  slug: string;
  year: number;
  price: number;
  engine: {
    fuel_type: FuelType;
    displacement_cc: number | null;
    cylinders: number | null;
    horsepower: number;
    torque_nm: number;
    transmission: Transmission;
    drivetrain: Drivetrain;
    fuel_consumption_combined: number;
    acceleration_0_100: number | null;
    top_speed_kmh: number | null;
  };
  dimensions: {
    length_mm: number;
    width_mm: number;
    height_mm: number;
    wheelbase_mm: number;
    ground_clearance_mm: number | null;
    trunk_volume_liters: number | null;
    fuel_tank_liters: number | null;
    battery_capacity_kwh: number | null;
    curb_weight_kg: number;
    seating_capacity: number;
  };
  features: {
    safety_features: string[];
    comfort_features: string[];
    tech_features: string[];
    exterior_features: string[];
  };
  colors: Array<{ name: string; hex: string }>;
  images: string[];
};
