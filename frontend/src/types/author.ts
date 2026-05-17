export type AuthorRole = "editor" | "journalist" | "contributor";

export type Author = {
  id: string;
  name: string;
  slug: string;
  avatar: string | null;
  bio_vi: string;
  bio_en: string;
  role: AuthorRole;
  social_links: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
  };
};
