import Link from "next/link";
import { fetchStrapi, type StrapiListResponse } from "@/lib/api/strapi";

interface TickerArticle {
  id: number;
  title_vi: string;
  slug_vi: string;
  publishedAt: string;
}

interface StrapiTickerItem {
  id: number;
  title_vi: string;
  slug_vi: string;
  publishedAt: string;
}

async function getTickerArticles(): Promise<TickerArticle[]> {
  try {
    const res = await fetchStrapi<StrapiListResponse<StrapiTickerItem>>(
      "/articles?fields[0]=title_vi&fields[1]=slug_vi&fields[2]=publishedAt&sort=publishedAt:desc&pagination[limit]=12&status=published",
      { next: { revalidate: 300, tags: ["articles"] } }
    );
    return res.data.map((item) => ({
      id: item.id,
      title_vi: item.title_vi,
      slug_vi: item.slug_vi,
      publishedAt: item.publishedAt,
    }));
  } catch {
    return [];
  }
}

export async function NewsTicker() {
  const articles = await getTickerArticles();
  if (!articles.length) return null;

  // Duplicate items for seamless loop
  const items = [...articles, ...articles];

  return (
    <div className="bg-surface-elevated border-b border-surface-border overflow-hidden">
      <div className="max-w-screen-2xl mx-auto flex items-stretch">
        {/* Label */}
        <div className="flex-shrink-0 flex items-center gap-1.5 bg-primary px-3 py-2 z-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-white text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            Tin mới
          </span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 overflow-hidden relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-surface-elevated to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface-elevated to-transparent z-10 pointer-events-none" />

          <div className="flex animate-ticker whitespace-nowrap py-2">
            {items.map((article, idx) => (
              <Link
                key={`${article.id}-${idx}`}
                href={`/tin-tuc/${article.slug_vi}`}
                className="inline-flex items-center gap-3 px-4 text-sm text-text-secondary hover:text-primary transition-colors group"
              >
                <span className="text-primary/50 font-bold select-none">◆</span>
                <span className="group-hover:underline underline-offset-2">
                  {article.title_vi}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
