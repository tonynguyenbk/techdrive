import type { Brand, CarModel, CarVariant } from "@/types/car";
import { fetchStrapi, mediaUrl, type StrapiListResponse, type StrapiMedia } from "./strapi";

// ── Strapi raw shapes ────────────────────────────────────────────────────────

interface StrapiBrand {
  id: number;
  documentId: string;
  name_vi: string;
  name_en: string;
  slug: string;
  logo?: StrapiMedia | null;
  flag_emoji?: string;
  country_of_origin?: string;
  description_vi?: string;
  description_en?: string;
  is_active?: boolean;
  display_order?: number;
}

interface StrapiCarModel {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  segment: string;
  body_type?: string;
  year_from?: number;
  year_to?: number | null;
  price_from?: number;
  price_to?: number;
  status: "on_sale" | "discontinued" | "upcoming";
  description_vi?: string;
  description_en?: string;
  our_rating?: number | null;
  brand?: StrapiBrand | null;
  gallery?: StrapiMedia[] | null;
}

interface StrapiVariant {
  id: number;
  name: string;
  slug: string;
  year: number;
  price: number;
  fuel_type: string;
  transmission: string;
  drivetrain: string;
  displacement_cc?: number | null;
  cylinders?: number | null;
  horsepower: number;
  torque_nm: number;
  fuel_consumption_combined?: number | null;
  acceleration_0_100?: number | null;
  top_speed_kmh?: number | null;
  battery_capacity_kwh?: number | null;
  length_mm: number;
  width_mm: number;
  height_mm: number;
  wheelbase_mm: number;
  ground_clearance_mm?: number | null;
  trunk_volume_liters?: number | null;
  fuel_tank_liters?: number | null;
  curb_weight_kg: number;
  seating_capacity: number;
  safety_features?: string[];
  comfort_features?: string[];
  tech_features?: string[];
  colors?: Array<{ name: string; hex: string }>;
}

// ── Transformers ─────────────────────────────────────────────────────────────

function toBrand(raw: StrapiBrand): Brand {
  return {
    id: String(raw.id),
    name_vi: raw.name_vi,
    name_en: raw.name_en,
    slug: raw.slug,
    logo_url: mediaUrl(raw.logo),
    flag_emoji: raw.flag_emoji,
    country_of_origin: raw.country_of_origin ?? "",
    description_vi: raw.description_vi ?? "",
    description_en: raw.description_en ?? "",
    is_active: raw.is_active ?? true,
    display_order: raw.display_order ?? 0,
  };
}

function toCarModel(raw: StrapiCarModel): CarModel {
  return {
    id: String(raw.id),
    brand_id: raw.brand ? String(raw.brand.id) : "",
    brand: raw.brand ? toBrand(raw.brand) : fallbackBrand,
    name: raw.name,
    slug: raw.slug,
    segment: raw.segment as CarModel["segment"],
    body_type: raw.body_type ?? "",
    generation: null,
    year_from: raw.year_from ?? new Date().getFullYear(),
    year_to: raw.year_to ?? null,
    price_from: raw.price_from ?? 0,
    price_to: raw.price_to ?? 0,
    status: raw.status,
    description_vi: raw.description_vi ?? "",
    description_en: raw.description_en ?? "",
    thumbnail_url: raw.gallery?.[0] ? mediaUrl(raw.gallery[0]) : "",
    gallery_urls: (raw.gallery ?? []).map(mediaUrl),
    our_rating: raw.our_rating ?? null,
  };
}

function toCarVariant(raw: StrapiVariant): CarVariant {
  return {
    id: String(raw.id),
    model_id: "",
    name: raw.name,
    slug: raw.slug,
    year: raw.year,
    price: Number(raw.price),
    engine: {
      fuel_type: raw.fuel_type as CarVariant["engine"]["fuel_type"],
      displacement_cc: raw.displacement_cc ?? null,
      cylinders: raw.cylinders ?? null,
      horsepower: raw.horsepower,
      torque_nm: raw.torque_nm,
      transmission: raw.transmission as CarVariant["engine"]["transmission"],
      drivetrain: raw.drivetrain as CarVariant["engine"]["drivetrain"],
      fuel_consumption_combined: raw.fuel_consumption_combined ?? 0,
      acceleration_0_100: raw.acceleration_0_100 ?? null,
      top_speed_kmh: raw.top_speed_kmh ?? null,
    },
    dimensions: {
      length_mm: raw.length_mm,
      width_mm: raw.width_mm,
      height_mm: raw.height_mm,
      wheelbase_mm: raw.wheelbase_mm,
      ground_clearance_mm: raw.ground_clearance_mm ?? null,
      trunk_volume_liters: raw.trunk_volume_liters ?? null,
      fuel_tank_liters: raw.fuel_tank_liters ?? null,
      battery_capacity_kwh: raw.battery_capacity_kwh ?? null,
      curb_weight_kg: raw.curb_weight_kg,
      seating_capacity: raw.seating_capacity,
    },
    features: {
      safety_features: raw.safety_features ?? [],
      comfort_features: raw.comfort_features ?? [],
      tech_features: raw.tech_features ?? [],
      exterior_features: [],
    },
    colors: raw.colors ?? [],
    images: [],
  };
}

const fallbackBrand: Brand = {
  id: "0",
  name_vi: "",
  name_en: "",
  slug: "",
  logo_url: "",
  country_of_origin: "",
  description_vi: "",
  description_en: "",
  is_active: true,
  display_order: 0,
};

// ── Public API ────────────────────────────────────────────────────────────────

export async function getBrands(limit = 20): Promise<Brand[]> {
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiBrand>>(
      `/car-brands?filters[is_active][$eq]=true&sort=display_order:asc&pagination[limit]=${limit}&fields[0]=name_vi&fields[1]=name_en&fields[2]=slug&fields[3]=flag_emoji&fields[4]=country_of_origin&fields[5]=display_order&populate[logo][fields][0]=url`
    );
    return res.data.map(toBrand);
  } catch {
    return [];
  }
}

export async function getCarModels(options: {
  page?: number;
  pageSize?: number;
  brandSlug?: string;
  segment?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
} = {}): Promise<{ models: CarModel[]; total: number; pageCount: number }> {
  const { page = 1, pageSize = 12, brandSlug, segment, status = "on_sale", minPrice, maxPrice, sort = "price_from:asc" } = options;
  const filters: string[] = [];
  if (status) filters.push(`filters[status][$eq]=${status}`);
  if (brandSlug) filters.push(`filters[brand][slug][$eq]=${brandSlug}`);
  if (segment) filters.push(`filters[segment][$eq]=${segment}`);
  if (minPrice) filters.push(`filters[price_from][$gte]=${minPrice}`);
  if (maxPrice) filters.push(`filters[price_from][$lte]=${maxPrice}`);
  const qs = [
    ...filters,
    `pagination[page]=${page}`,
    `pagination[pageSize]=${pageSize}`,
    `sort=${sort}`,
    "populate[brand][fields][0]=name_vi&populate[brand][fields][1]=name_en&populate[brand][fields][2]=slug",
    "populate[gallery][fields][0]=url",
  ].join("&");
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiCarModel>>(`/car-models?${qs}`);
    return {
      models: res.data.map(toCarModel),
      total: res.meta.pagination.total,
      pageCount: res.meta.pagination.pageCount,
    };
  } catch {
    return { models: [], total: 0, pageCount: 0 };
  }
}

export async function getCarModelBySlug(slug: string): Promise<CarModel | null> {
  const qs = [
    `filters[slug][$eq]=${slug}`,
    "populate[brand][fields][0]=name_vi&populate[brand][fields][1]=name_en&populate[brand][fields][2]=slug&populate[brand][fields][3]=flag_emoji&populate[brand][fields][4]=country_of_origin",
    "populate[gallery][fields][0]=url",
    "populate[variants]=*",
  ].join("&");
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiCarModel & {
      variants?: StrapiVariant[];
    }>>(`/car-models?${qs}`);
    if (!res.data.length) return null;
    const raw = res.data[0];
    const model = toCarModel(raw);
    if (raw.variants?.length) {
      model.variants = raw.variants.map(toCarVariant);
    }
    return model;
  } catch {
    return null;
  }
}

export async function getPriceBrands(limit = 8): Promise<Brand[]> {
  return getBrands(limit);
}

export async function getCarModelsBySlug(slugs: string[]): Promise<CarModel[]> {
  if (!slugs.length) return [];
  const results = await Promise.all(slugs.map((s) => getCarModelBySlug(s)));
  return results.filter(Boolean) as CarModel[];
}
