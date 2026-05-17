# CLAUDE.md — Auto-read by Claude Code

## Dự án: Automotive Media Website Vietnam

Đây là dự án xây dựng **website tin tức & đánh giá ô tô hàng đầu Việt Nam**, song ngữ Việt–Anh, kết hợp phong cách editorial của TopGear.com với hệ thống dữ liệu xe chuyên sâu của MotorTrend.com.

## Đọc tài liệu trước khi làm bất cứ gì

Trước khi viết code hoặc đưa ra đề xuất, **BẮT BUỘC** đọc các file sau theo thứ tự:

1. **`docs/PROJECT_BRIEF.md`** — Tổng hợp toàn bộ trao đổi giữa owner và AI, bao gồm phân tích thị trường, quyết định thiết kế, và định hướng sản phẩm
2. **`docs/CLAUDE_CODE_INSTRUCTIONS.md`** — Quy tắc code, tech stack, conventions, thứ tự ưu tiên phát triển
3. **`docs/de-xuat-website-automotive.md`** — Bản đề xuất chi tiết: sitemap, features, database schema, đội ngũ, ngân sách, roadmap
4. **`docs/homepage-wireframe.html`** — Wireframe trang chủ (mở bằng browser để xem)

## Tech Stack (tóm tắt)

- **Frontend**: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion
- **CMS**: Strapi v5 (Headless CMS) + PostgreSQL
- **Search**: Meilisearch
- **Cache**: Redis
- **Media**: Cloudinary + AWS S3
- **i18n**: next-intl (Tiếng Việt mặc định, English phụ)
- **Hosting**: Vercel (frontend) + DigitalOcean/AWS (backend)

## Cấu trúc thư mục dự kiến

```
├── CLAUDE.md                    # File này
├── docs/                        # Tài liệu dự án
│   ├── PROJECT_BRIEF.md
│   ├── CLAUDE_CODE_INSTRUCTIONS.md
│   ├── de-xuat-website-automotive.md
│   └── homepage-wireframe.html
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/[locale]/        # App Router + i18n routes
│   │   ├── components/          # React components
│   │   ├── lib/                 # Utilities, API clients
│   │   ├── styles/              # Global styles, design tokens
│   │   ├── types/               # TypeScript types
│   │   └── messages/            # i18n translation files (vi.json, en.json)
│   ├── public/                  # Static assets
│   ├── next.config.ts
│   ├── tailwind.config.ts
│   ├── tsconfig.json
│   └── package.json
├── backend/                     # Strapi CMS
│   ├── src/
│   │   ├── api/                 # Content types (article, car-brand, car-model, etc.)
│   │   └── plugins/             # Custom plugins
│   ├── config/
│   └── package.json
├── shared/                      # Shared types, constants
│   └── types/
├── docker-compose.yml           # Local dev (PostgreSQL, Redis, Meilisearch)
└── README.md
```

## Ngôn ngữ giao tiếp

- Code: **English** (variable names, comments, commit messages)
- Tài liệu dự án: **Tiếng Việt** (trừ khi owner yêu cầu khác)
- Nội dung website: **Song ngữ Việt–Anh**
