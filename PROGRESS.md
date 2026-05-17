# TechDrive — Project Progress & Plan

> **Mục đích file này**: Mỗi phiên làm việc mới, Claude Code đọc file này trước để nắm toàn bộ context, tiến độ, và task tiếp theo — không cần hỏi lại từ đầu.

---

## Tổng quan dự án

**Website tin tức & đánh giá ô tô hàng đầu Việt Nam**
- Song ngữ Việt–Anh (vi mặc định, en phụ)
- Phong cách: TopGear editorial + MotorTrend data depth
- Domain mục tiêu: techdrive.vn (chưa mua)

**Tech Stack:**
- Frontend: Next.js 15 (App Router) + TypeScript + Tailwind CSS
- CMS: Strapi v5 + PostgreSQL
- i18n: next-intl
- Search: Meilisearch (chưa triển khai)
- Cache: Redis (chưa triển khai)
- Hosting: Vercel (frontend) + Railway (backend, mục tiêu)

---

## Kiến trúc quan trọng — Ghi nhớ kỹ

### Strapi v5 với JavaScript (không dùng TypeScript)
Backend đã được chuyển sang **JavaScript thuần** vì:
- `strapi develop` dọn sạch `dist/` rồi chạy `tsc`
- TypeScript compiler **không copy** `.json` files → `schema.json` không đến được `dist/`
- Crash: `TypeError: Cannot read properties of undefined (reading 'kind')`
- Fix: xóa `tsconfig.json` → Strapi dùng `distDir=''` → đọc trực tiếp từ `src/api/`

### Strapi v5 API Format
- **Flat response** (không có `attributes` wrapper như v4)
- Pagination: `{page, pageSize, pageCount, total}` — page-based, không dùng `start/limit`
- Public permissions phải bật thủ công: Settings → Users & Permissions → Roles → Public

### Enum quan trọng
- Drivetrain `four_wd` (không phải `4wd` vì không được bắt đầu bằng số trong Strapi v5)

---

## Cấu trúc file quan trọng

```
d:\TechDrive\
├── backend/
│   ├── src/
│   │   ├── index.js              # Bootstrap + seeder
│   │   ├── seeds/seed-data.js    # Sample data: authors, brands, models, articles
│   │   └── api/
│   │       ├── article/          # Content type: article
│   │       ├── author/           # Content type: author
│   │       ├── car-brand/        # Content type: car-brand
│   │       ├── car-model/        # Content type: car-model
│   │       └── car-variant/      # Content type: car-variant
│   └── config/
│       ├── database.js           # PostgreSQL config
│       └── middlewares.js        # CORS config
├── frontend/
│   ├── src/
│   │   ├── app/[locale]/
│   │   │   ├── page.tsx          # Trang chủ
│   │   │   ├── tin-tuc/          # Tin tức (list + detail)
│   │   │   ├── danh-gia/         # Đánh giá xe (list + detail)
│   │   │   ├── tim-xe/           # Tìm xe — CHỜ TRIỂN KHAI
│   │   │   └── bang-gia/         # Bảng giá — CHỜ TRIỂN KHAI
│   │   ├── components/
│   │   │   ├── articles/         # ArticleCard, ScoreBreakdown, ProsCons, etc.
│   │   │   └── cars/             # PriceCard (brand card), etc.
│   │   ├── lib/api/
│   │   │   ├── strapi.ts         # Base Strapi client (fetchStrapi, mediaUrl)
│   │   │   ├── articles.ts       # API functions: getArticles, getFeatured, etc.
│   │   │   └── cars.ts           # API functions: getBrands, getCarModels, etc.
│   │   └── types/
│   │       ├── article.ts        # ArticleCard, Article types
│   │       └── car.ts            # Brand, CarModel, CarVariant types
│   └── .env.local                # NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
└── docs/
    ├── PROJECT_BRIEF.md
    ├── CLAUDE_CODE_INSTRUCTIONS.md
    └── de-xuat-website-automotive.md
```

---

## Tiến độ hiện tại

### ✅ Hoàn thành

#### Phase 0 — Setup & Infrastructure
- [x] Next.js 15 project setup + Tailwind CSS + TypeScript
- [x] next-intl i18n (vi/en routing)
- [x] Design system: dark theme, CSS variables, typography
- [x] Strapi v5 backend setup (converted TS → JS)
- [x] PostgreSQL database (local: `techdrive_db`)
- [x] Docker Compose (postgres, redis, meilisearch)

#### Phase 1 — Content Types & CMS
- [x] Content type: `article` (bilingual slug, score, pros/cons, review_badge)
- [x] Content type: `author` (bilingual bio)
- [x] Content type: `car-brand` (flag_emoji, logo, country)
- [x] Content type: `car-model` (specs, gallery, price range)
- [x] Content type: `car-variant` (full engine + dimensions + features)
- [x] Seed data: 2 authors, 6 car brands, 6 car models, 1 article
- [x] Public API permissions enabled (car-brand: find/findOne, car-model: find/findOne, article: find/findOne)

#### Phase 2 — Frontend Pages (Connected to Real API)
- [x] Trang chủ (`/`) — featured article, news grid, reviews, most viewed, brand cards
- [x] Danh sách tin tức (`/tin-tuc`) — paginated, filter by category
- [x] Chi tiết tin tức (`/tin-tuc/[slug]`)
- [x] Danh sách đánh giá (`/danh-gia`) — filter by badge (Best Buy, Editor's Choice...)
- [x] Chi tiết đánh giá (`/danh-gia/[slug]`) — score breakdown, pros/cons, verdict
- [x] API client layer: `strapi.ts`, `articles.ts`, `cars.ts`
- [x] Components: ArticleCard, MostViewedSidebar, ScoreBreakdown, ProsCons, ArticleBadge, PriceCard

#### Phase 3 — Version Control
- [x] Git repository initialized
- [x] .gitignore configured
- [ ] Push to GitHub remote
- [ ] Branching strategy: `main` (stable) → `develop` (active dev)

---

## 🔜 Việc cần làm tiếp theo

### Ưu tiên cao (P0) — Làm ngay
1. **Push to GitHub** — tạo remote repo, push code
2. **Seed thêm content** — 15-20 bài viết, 20 xe phổ biến tại VN
3. **Trang `/tim-xe`** — danh sách xe với filters (brand, segment, price, fuel type)
4. **Trang `/bang-gia`** — bảng giá xe theo brand (dữ liệu từ car-model)

### Ưu tiên cao (P1) — Tuần này
5. **Deploy**: Frontend → Vercel, Backend → Railway
6. **Image integration** — Cloudinary hoặc Unsplash placeholder
7. **SEO** — metadata, sitemap, OG tags

### Ưu tiên trung (P2) — Sau đó
8. **Trang `/so-sanh`** — so sánh 2-3 xe cùng phân khúc
9. **Trang `/xe/[brand]/[slug]`** — detail page từng xe với specs đầy đủ
10. **Search** — Meilisearch integration, search bar
11. **Auto-configure public permissions** — trong Strapi bootstrap (hiện tại phải làm thủ công)

### Ưu tiên thấp (P3) — Tương lai
12. **Comment system** — Giscus hoặc custom
13. **Newsletter** — subscribe form
14. **Analytics** — Google Analytics 4
15. **Redis caching** — cho API responses
16. **Admin dashboard** — custom Strapi plugin

---

## Lệnh chạy local

```bash
# Khởi động PostgreSQL, Redis, Meilisearch
cd d:\TechDrive && docker-compose up -d

# Khởi động Strapi backend (port 1337)
cd d:\TechDrive\backend && npm run develop

# Khởi động Next.js frontend (port 3000)
cd d:\TechDrive\frontend && npm run dev
```

**Strapi Admin**: http://localhost:1337/admin
**Frontend**: http://localhost:3000

---

## Biến môi trường

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Backend (`backend/.env`)
```
DATABASE_CLIENT=postgres
DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_NAME=techdrive_db
DATABASE_USERNAME=techdrive
DATABASE_PASSWORD=techdrive_dev
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
JWT_SECRET=...
```

---

## Quyết định thiết kế quan trọng

| Vấn đề | Quyết định | Lý do |
|--------|------------|-------|
| Strapi TypeScript | Chuyển sang JS | TS compiler không copy schema.json → crash |
| Drivetrain enum | `four_wd` thay `4wd` | Strapi v5 không cho enum bắt đầu bằng số |
| API pagination | Page-based (`page/pageSize`) | Strapi v5 mặc định |
| Frontend caching | ISR 60s (`revalidate: 60`) | Balance giữa fresh data và performance |
| Brand display | `flag_emoji ?? logo_url` | Flag nhanh hơn, logo đẹp hơn nếu có |
| Public permissions | Manual trong admin | Chưa auto-config trong bootstrap |

---

## Git Commit History (planned)

```
feat: initial project setup — Next.js + Strapi + design system
feat: content types — article, author, car-brand, car-model, car-variant  
feat: API client layer — strapi.ts, articles.ts, cars.ts
feat: frontend pages — home, news, reviews (list + detail)
feat: seed data — authors, brands, models, articles
```

---

*Cập nhật lần cuối: 2026-05-17*
