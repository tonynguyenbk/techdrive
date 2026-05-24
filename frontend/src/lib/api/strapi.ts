const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: { page: number; pageSize: number; pageCount: number; total: number };
  };
}

export interface StrapiSingleResponse<T> {
  data: T | null;
  meta: Record<string, unknown>;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string | null;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export function mediaUrl(media: StrapiMedia | null | undefined): string {
  if (!media?.url) return "";
  return media.url.startsWith("http") ? media.url : `${STRAPI_URL}${media.url}`;
}

export async function fetchStrapi<T>(
  path: string,
  init?: RequestInit & { next?: { revalidate?: number; tags?: string[] } }
): Promise<T> {
  const res = await fetch(`${STRAPI_URL}/api${path}`, {
    headers: { "Content-Type": "application/json" },
    next: { revalidate: 600 },
    ...init,
  });
  if (!res.ok) throw new Error(`Strapi ${res.status}: ${path}`);
  return res.json();
}
