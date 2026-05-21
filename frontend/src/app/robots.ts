import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = "https://techdrive.vn";
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // AI crawlers — explicitly allowed for indexing and training
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
